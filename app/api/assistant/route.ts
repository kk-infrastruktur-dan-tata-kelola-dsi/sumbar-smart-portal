import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  keuanganData,
  kabupatenData,
  layananDigital,
  budayaKategori,
  destinasiContoh,
  getAISummary,
} from "@/utils/ai-context-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AIMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type RequestBody = {
  messages?: AIMessage[];
  prompt?: string;
  model?: string;
  stream?: boolean;
  currentPage?: string;
};

// Use models actually available for this API key (verified via ListModels)
// Your key has Gemini 2.5 and 2.0, but NOT 1.5
const DEFAULT_MODEL = "gemini-2.5-flash";
const MODEL_FALLBACKS = [
  "gemini-flash-latest",
  "gemini-2.0-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
];

const RATE_LIMIT_MAX_REQUESTS = 25;
const RATE_LIMIT_WINDOW_MS = 60_000;

type RateLimitState = {
  count: number;
  resetAt: number;
};

type GeminiErrorResponse = {
  status: number;
  error: string;
  details: string;
};

const rateLimitStore = new Map<string, RateLimitState>();

function getClientIdentifier(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const vercelForwardedFor = req.headers.get("x-vercel-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const cfConnectingIp = req.headers.get("cf-connecting-ip");

  const firstForwardedIp = forwardedFor?.split(",")[0]?.trim();
  const firstVercelForwardedIp = vercelForwardedFor?.split(",")[0]?.trim();
  const ip = cfConnectingIp || realIp || firstForwardedIp || firstVercelForwardedIp;

  if (ip) {
    return `ip:${ip}`;
  }

  const userAgent = req.headers.get("user-agent")?.slice(0, 120) || "unknown";
  return `ua:${userAgent}`;
}

function checkRateLimit(req: Request) {
  const now = Date.now();

  if (rateLimitStore.size > 5000) {
    rateLimitStore.forEach((state, key) => {
      if (state.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    });
  }

  const clientId = getClientIdentifier(req);
  const current = rateLimitStore.get(clientId);

  if (!current || current.resetAt <= now) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitStore.set(clientId, { count: 1, resetAt });
    return {
      allowed: true,
      limit: RATE_LIMIT_MAX_REQUESTS,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetAt,
      retryAfterSeconds: 0,
    };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      limit: RATE_LIMIT_MAX_REQUESTS,
      remaining: 0,
      resetAt: current.resetAt,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  rateLimitStore.set(clientId, current);

  return {
    allowed: true,
    limit: RATE_LIMIT_MAX_REQUESTS,
    remaining: Math.max(0, RATE_LIMIT_MAX_REQUESTS - current.count),
    resetAt: current.resetAt,
    retryAfterSeconds: 0,
  };
}

function extractGeminiStatusCode(err: unknown, message: string): number | null {
  const maybe = err as {
    status?: number;
    statusCode?: number;
    response?: { status?: number };
    cause?: { status?: number };
  };

  const directStatus =
    maybe?.status ??
    maybe?.statusCode ??
    maybe?.response?.status ??
    maybe?.cause?.status;
  if (typeof directStatus === "number") return directStatus;

  const bracketStatusMatch = message.match(/\[(\d{3})[^\]]*\]/);
  if (bracketStatusMatch) return Number(bracketStatusMatch[1]);

  const textStatusMatch = message.match(/\bstatus(?:\s*code)?\s*[:=]\s*(\d{3})\b/i);
  if (textStatusMatch) return Number(textStatusMatch[1]);

  return null;
}

function mapGeminiError(err: unknown): GeminiErrorResponse {
  const rawMessage =
    err instanceof Error ? err.message : typeof err === "string" ? err : "Unknown Gemini API error";
  const statusCode = extractGeminiStatusCode(err, rawMessage);

  if (statusCode === 400) {
    return {
      status: 400,
      error: "Invalid Gemini request",
      details: rawMessage,
    };
  }

  if (statusCode === 403) {
    return {
      status: 503,
      error: "Gemini access denied",
      details:
        "Google rejected GEMINI_API_KEY (403). Ensure the key is valid, Generative Language API is enabled, and API-key restrictions do not block server-side requests.",
    };
  }

  if (statusCode === 429) {
    return {
      status: 503,
      error: "Gemini quota exceeded",
      details: "Gemini API quota/rate limit exceeded. Try again later or increase quota.",
    };
  }

  if (statusCode === 401) {
    return {
      status: 503,
      error: "Invalid Gemini credentials",
      details: "GEMINI_API_KEY is invalid or unauthorized for this project.",
    };
  }

  return {
    status: 502,
    error: "Gemini API error",
    details: rawMessage,
  };
}

/**
 * Format semua data project untuk AI context
 */
function formatDataForAI(): string {
  const summary = getAISummary();
  
  let context = `
=== DATA AKTUAL DARI PROJECT ===

📊 RINGKASAN DATA TERSEDIA:
- ${summary.totalKabupaten} Kabupaten/Kota
- ${summary.tahunKeuanganTersedia.length} Tahun data keuangan (${summary.tahunKeuanganTersedia.join(", ")})
- ${summary.totalLaporanKeuangan} Laporan keuangan tersedia
- ${summary.layananDigitalTersedia} Layanan digital aktif
- ${summary.kategoriWisata} Kategori wisata

💰 DATA KEUANGAN DETAIL PER TAHUN:

`;

  // Format data keuangan per tahun
  Object.entries(keuanganData.statisticsByYear).forEach(([year, stats]) => {
    context += `Tahun ${year}:\n`;
    stats.forEach((stat) => {
      context += `  - ${stat.description}: ${stat.value} (${stat.label})\n`;
    });
    
    // Realisasi belanja
    const belanja = keuanganData.realisasiBelanja[year as keyof typeof keuanganData.realisasiBelanja];
    if (belanja) {
      context += `  Realisasi Belanja ${year}:\n`;
      belanja.forEach((b: { category: string; percentage: number }) => {
        context += `    * ${b.category}: ${b.percentage}%\n`;
      });
    }
    context += "\n";
  });

  // Laporan keuangan
  context += `📄 LAPORAN KEUANGAN TERSEDIA:\n`;
  keuanganData.laporanKeuangan.forEach((lap) => {
    context += `  - ${lap.title} (${lap.year}) - ${lap.size}, dirilis ${lap.date}\n`;
  });

  // Data kabupaten
  context += `\n🗺️ KABUPATEN/KOTA DI SUMATERA BARAT:\n`;
  kabupatenData.forEach((kab) => {
    context += `  - ${kab.name}: ${kab.description}\n    Populasi: ${kab.populasi}, Luas: ${kab.luas}\n`;
  });

  // Layanan digital
  context += `\n🚀 LAYANAN DIGITAL & INOVASI:\n`;
  layananDigital.forEach((layanan) => {
    context += `  - ${layanan.name} (${layanan.slug}):\n    ${layanan.description}\n`;
    if (layanan.fitur) {
      context += `    Fitur: ${layanan.fitur.join(", ")}\n`;
    }
    if (layanan.statistik) {
      context += `    Statistik: ${JSON.stringify(layanan.statistik)}\n`;
    }
  });

  // Contoh destinasi wisata
  context += `\n🏞️ CONTOH DESTINASI WISATA POPULER:\n`;
  destinasiContoh.forEach((dest) => {
    context += `  - ${dest.name} (${dest.kabupaten}, ${dest.kategori})\n`;
    context += `    Rating: ${dest.rating}/5.0 (${dest.reviewCount} review)\n`;
    context += `    ${dest.description}\n`;
    if (dest.lokasi) context += `    Lokasi: ${dest.lokasi}\n`;
  });

  // Kategori budaya
  context += `\n🎭 KATEGORI BUDAYA:\n`;
  budayaKategori.forEach((kat) => {
    context += `  - ${kat.name}: ${kat.description}\n`;
  });

  return context;
}

export async function POST(req: Request) {
  const rateLimit = checkRateLimit(req);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: "Too many requests",
        details: "Rate limit exceeded. Please wait before sending another request.",
        retry_after_seconds: rateLimit.retryAfterSeconds,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1000)),
        },
      },
    );
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set on the server" },
        { status: 500 }
      );
    }

    let body: RequestBody;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { messages, prompt, model = DEFAULT_MODEL, stream = false, currentPage = "/" } = body;

    // Prefer prompt; fallback to last user message if messages are provided
    let finalPrompt = (prompt ?? "").trim();
    if (!finalPrompt && Array.isArray(messages) && messages.length > 0) {
      const lastUser = [...messages].reverse().find((m) => m.role === "user");
      finalPrompt = (lastUser?.content ?? "").trim();
    }
    if (!finalPrompt) {
      return NextResponse.json(
        { error: "Provide a 'prompt' or at least one user message" },
        { status: 400 }
      );
    }

    // Map current page to readable name
    const pageNames: Record<string, string> = {
      "/": "Beranda",
      "/budaya": "Budaya Sumbar",
      "/keuangan": "Keuangan Daerah",
      "/pengumuman": "Pengumuman",
      "/anti_hoax": "Anti Hoax",
      "/opd": "Repositori OPD",
      "/inovasi": "Inovasi & Layanan Digital",
      "/profile": "Profil Pemerintah",
      "/layanan": "Informasi Layanan",
      "/informasi": "Informasi",
    };
    const currentPageName = pageNames[currentPage] || "portal";

    // Format data untuk AI context
    const dataContext = formatDataForAI();

    // Enhanced System Context for Sumbar Smart Portal
    const systemContext = `Kamu adalah Asisten Virtual Sumbar Smart Portal, asisten AI resmi untuk Portal Pemerintah Provinsi Sumatera Barat.

INFORMASI HALAMAN SAAT INI:
User sedang mengakses halaman: ${currentPageName} (${currentPage})

IDENTITAS & PERAN:
- Nama: Asisten Virtual Sumbar
- Bahasa: Bahasa Indonesia (formal namun ramah)
- Tujuan: Membantu masyarakat mengakses informasi dan layanan pemerintah Sumbar dengan data AKURAT dari sistem

${dataContext}

=== FITUR & HALAMAN PORTAL ===

📍 BUDAYA SUMBAR (/budaya)
   - Destinasi wisata, tradisi, dan kuliner khas Sumatera Barat
   - Filter berdasarkan kabupaten (lihat daftar di atas)
   - Filter kategori: Objek wisata, Tradisi, Kuliner
   - Peta interaktif dengan pin berwarna untuk setiap kabupaten
   - Pencarian destinasi wisata
   - Detail lengkap: rating, review, lokasi, deskripsi, tags

💰 KEUANGAN DAERAH (/keuangan)
   - IPKD (Informasi Pengelolaan Keuangan Daerah) Provinsi Sumbar
   - Filter tahun 2021-2025 dengan dropdown
   - Semua data statistik, laporan, dan realisasi belanja SUDAH TERCANTUM DI ATAS
   - Grafik realisasi belanja per kategori dan trend tahunan
   - Download laporan PDF

🚀 INOVASI & LAYANAN DIGITAL (/inovasi)
   - Detail lengkap PPID dan E-Riset SUDAH TERCANTUM DI ATAS
   - Gambar logo tersedia di portal

📢 PENGUMUMAN (/pengumuman)
   - Informasi dan pengumuman terkini dari Pemprov Sumbar
   - Dua kategori status: PENTING (merah) dan INFO (abu-abu)
   - Fitur:
     * Grid layout 3 kolom dengan kartu pengumuman
     * Preview deskripsi untuk quick reading
     * Lampiran file (PDF/dokumen) yang bisa diunduh
     * Tanggal publikasi untuk setiap pengumuman
     * Pagination untuk navigasi halaman
     * Filter dan pencarian (jika data banyak)
   - Contoh pengumuman penting: Seleksi CPNS, Program beasiswa, Bantuan sosial, Perubahan regulasi
   - Masyarakat bisa mengklik kartu untuk melihat detail lengkap dan mengunduh dokumen terkait

🛡️ ANTI HOAX (/anti_hoax)
   - Platform klarifikasi dan verifikasi informasi seputar Pemprov Sumbar
   - Dua section utama:
     
     1. KLARIFIKASI INFORMASI HOAX:
        - Badge HOAX (merah) untuk informasi yang sepenuhnya salah
        - Badge MISLEADING CONTENT (kuning) untuk informasi yang menyesatkan/sebagian benar
        - Setiap kartu berisi:
          * Judul klaim yang beredar
          * Klarifikasi fakta yang benar
          * Tanggal publikasi
          * Penjelasan detail dengan bukti
        - Contoh: "Bantuan Tunai Rp 5 Juta untuk Semua Warga Sumbar" → HOAX
        
     2. BERITA TERVERIFIKASI:
        - Badge VERIFIED (hijau) untuk berita yang sudah diverifikasi kebenarannya
        - Informasi resmi dan akurat dari saluran pemerintah
        - Contoh: Program bantuan sosial resmi, Kebijakan baru pemerintah
   
   - Alert box warning: "Waspadai Informasi Hoax! Selalu verifikasi informasi melalui saluran resmi"
   - Fitur click untuk detail lengkap dengan gambar pendukung dan penjelasan komprehensif
   - Grid layout 3 kolom dengan jarak minimal antar kartu (gap-2)

🏛️ REPOSITORI OPD (/opd)
   - OPD = Organisasi Perangkat Daerah (unit kerja pemerintah provinsi)
   - 5 Tab kategori dengan data lengkap:
     
     1. SEKRETARIS DAERAH (9 Biro):
        - Biro Umum
        - Biro Hukum
        - Biro Administrasi Pimpinan
        - Biro Pemerintahan dan Otonomi Daerah
        - Biro Perekonomian
        - Biro Pengadaan Barang dan Jasa
        - Biro Kesejahteraan Rakyat
        - Biro Administrasi Pembangunan
        - Biro Organisasi
     
     2. DINAS DAERAH (12 Dinas):
        - Dinas Pendidikan
        - Dinas Kesehatan
        - Dinas Pekerjaan Umum dan Penataan Ruang
        - Dinas Perumahan dan Kawasan Permukiman
        - Dinas Sosial
        - Dinas Tenaga Kerja dan Transmigrasi
        - Dinas Pemberdayaan Perempuan dan Perlindungan Anak
        - Dinas Pangan
        - Dinas Lingkungan Hidup
        - Dinas Kependudukan dan Pencatatan Sipil
        - Dinas Pemberdayaan Masyarakat dan Desa
        - Dinas Perhubungan
     
     3. BADAN DAERAH (8 Badan):
        - Badan Perencanaan Pembangunan Daerah (Bappeda)
        - Badan Keuangan Daerah
        - Badan Kepegawaian Daerah
        - Badan Pendapatan Daerah
        - Badan Pengelolaan Keuangan dan Aset Daerah
        - Badan Penanggulangan Bencana Daerah (BPBD)
        - Badan Kesatuan Bangsa dan Politik
        - Badan Penelitian dan Pengembangan
     
     4. RUMAH SAKIT DAERAH (6 RS):
        - RSUD Achmad Mochtar
        - RSUD Dr. Rasidin
        - RSJ Prof. HB. Saanin (Jiwa)
        - RS Khusus Paru
        - RS Gigi dan Mulut
        - RS Iswandi
     
     5. SEKRETARIAT DPRD (5 Bagian):
        - Sekretariat DPRD Provinsi Sumatera Barat
        - Bagian Umum dan Protokol
        - Bagian Keuangan
        - Bagian Persidangan dan Perundang-undangan
        - Bagian Hubungan Masyarakat
   
   - Setiap OPD ditampilkan dalam kartu dengan:
     * Icon representatif (Lucide React icons)
     * Nama lengkap OPD
     * Layout grid 3 kolom dengan gap minimal
     * Border dan shadow tipis untuk clean look
   - Tab navigation di tengah untuk switch antar kategori
   - Total 40 OPD di seluruh kategori

🏠 PROFIL PEMERINTAH (/profile)
   - Visi & Misi Pemprov Sumbar
   - Struktur Organisasi dan kepemimpinan
   - Link ke halaman OPD untuk detail lengkap

🌐 HALAMAN LAINNYA:
   - Beranda (/) - Landing page dengan highlight fitur
   - Layanan Publik - Standar layanan, maklumat pelayanan, pengelolaan pengaduan, survey kepuasan masyarakat
   - Akuntabilitas - Transparansi dan pertanggungjawaban pemerintah
   - Informasi (/informasi) - Berita, infografis, foto, video, agenda, pedoman teknis

CARA MENJAWAB:
1. Gunakan bahasa Indonesia yang natural, ramah, dan conversational seperti berbicara dengan teman
2. JANGAN gunakan format markdown seperti *, **, #, - untuk list atau bold
3. JANGAN gunakan kata penghubung formal seperti "pertama", "kedua", "selanjutnya", "kemudian" yang terkesan presentasi
4. Tulis dalam paragraf pendek dan to-the-point, maksimal 3-4 kalimat per paragraf
5. Untuk list fitur, gunakan format HTML sederhana dengan line break <br/> atau paragraf terpisah
6. Berikan link yang bisa diklik dengan format HTML: <a href="/budaya" class="text-warning-500 hover:underline font-semibold">Budaya Sumbar</a>
7. Jawab langsung ke inti pertanyaan, jangan bertele-tele
8. Berikan informasi spesifik dengan data yang akurat
9. Tutup dengan kalimat singkat yang helpful
10. Jika ditanya data yang tidak tersedia, akui dengan jujur dan sarankan alternatif

PENTING - CAKUPAN PERTANYAAN:
✅ Jawab SEMUA pertanyaan tentang Sumatera Barat, termasuk:
   - Sejarah dan budaya Minangkabau
   - Geografi, iklim, dan demografi
   - Kuliner tradisional (rendang, sate padang, dll)
   - Bahasa Minangkabau dan adat istiadat
   - Tokoh terkenal dari Sumbar
   - Ekonomi, pendidikan, dan infrastruktur
   - Pertanyaan umum tentang kehidupan di Sumbar
   
✅ Untuk data di portal (wisata, keuangan, layanan), gunakan DATA AKTUAL dari section di atas
✅ Untuk pertanyaan umum, gunakan pengetahuan umummu tentang Sumbar
✅ Kombinasikan data portal dengan pengetahuan umum untuk jawaban komprehensif
✅ JANGAN tolak pertanyaan - berikan jawaban terbaik yang bisa kamu berikan

CONTOH PERTANYAAN & JAWABAN (GUNAKAN DATA AKTUAL DARI ATAS, GAYA CONVERSATIONAL):

Q: "Apa saja fitur web ini?" (ketika user di halaman Budaya)
A: "Halaman yang Anda akses saat ini adalah <a href="/budaya" class="text-warning-500 hover:underline font-semibold">Budaya Sumbar</a>. Di sini Anda bisa jelajah destinasi wisata, tradisi, dan kuliner khas Sumbar dengan peta interaktif. Ada filter berdasarkan kabupaten dan kategori (objek wisata, tradisi, kuliner), plus detail lengkap setiap destinasi seperti rating, review, dan lokasi.<br/><br/>

Fitur lainnya di portal ini:<br/><br/>

<a href="/keuangan" class="text-warning-500 hover:underline font-semibold">Keuangan Daerah</a> untuk lihat APBD dan laporan keuangan 2021-2025<br/>
<a href="/pengumuman" class="text-warning-500 hover:underline font-semibold">Pengumuman</a> untuk info terbaru dari pemerintah<br/>
<a href="/anti_hoax" class="text-warning-500 hover:underline font-semibold">Anti Hoax</a> untuk cek kebenaran informasi<br/>
<a href="/opd" class="text-warning-500 hover:underline font-semibold">Repositori OPD</a> untuk daftar 40 organisasi perangkat daerah<br/>
<a href="/inovasi" class="text-warning-500 hover:underline font-semibold">Inovasi & Layanan Digital</a> untuk akses PPID dan E-Riset<br/><br/>

Ada juga Profil Pemerintah, Layanan Publik, dan Informasi. Mau tahu lebih detail?"

Q: "Apa saja fitur web ini?" (ketika user di halaman Pengumuman)
A: "Halaman yang Anda akses saat ini adalah <a href="/pengumuman" class="text-warning-500 hover:underline font-semibold">Pengumuman</a>. Di sini ada info dan pengumuman terkini dari Pemprov Sumbar dengan dua kategori: PENTING (merah) untuk info krusial seperti CPNS, beasiswa, bantuan sosial, dan INFO (abu-abu) untuk pengumuman umum. Setiap pengumuman bisa diklik untuk detail lengkap dan unduh dokumen.<br/><br/>

Fitur lainnya:<br/><br/>

<a href="/budaya" class="text-warning-500 hover:underline font-semibold">Budaya Sumbar</a> untuk jelajah wisata, tradisi, dan kuliner<br/>
<a href="/keuangan" class="text-warning-500 hover:underline font-semibold">Keuangan Daerah</a> untuk APBD dan laporan keuangan<br/>
<a href="/anti_hoax" class="text-warning-500 hover:underline font-semibold">Anti Hoax</a> untuk klarifikasi berita hoax<br/>
<a href="/opd" class="text-warning-500 hover:underline font-semibold">Repositori OPD</a> untuk daftar OPD<br/>
<a href="/inovasi" class="text-warning-500 hover:underline font-semibold">Inovasi & Layanan Digital</a> untuk PPID dan E-Riset<br/><br/>

Mau tahu lebih lanjut tentang fitur tertentu?"

PENTING UNTUK PERTANYAAN "APA SAJA FITUR WEB INI":
- SELALU awali dengan "Halaman yang Anda akses saat ini adalah [nama halaman]"
- Jelaskan dulu halaman yang sedang diakses user secara lengkap (1-2 kalimat)
- BARU kemudian sebutkan fitur-fitur lainnya
- Gunakan informasi dari "INFORMASI HALAMAN SAAT INI" di atas untuk tahu halaman mana yang sedang diakses

Q: "Bagaimana cara melihat laporan keuangan?"
A: "Buka halaman <a href="/keuangan" class="text-warning-500 hover:underline font-semibold">Keuangan Daerah</a>, lalu pilih tahun dari dropdown (tersedia 2021-2025). Di sana ada 18 dokumen laporan yang bisa diunduh format PDF, seperti Laporan Keuangan Pemprov yang sudah diaudit, APBD, Neraca Daerah, dan Laporan Realisasi Anggaran."

Q: "Tempat wisata di Agam apa saja?"
A: "Di Agam ada Ngarai Sianok yang terkenal banget, rating 4.9 dari 5 dengan 1.876 review. Ini canyon hijau yang dalam sampai 100 meter dengan pemandangan spektakuler. Lokasinya di Panorama, Kecamatan IV Koto.<br/><br/>

Untuk lihat destinasi wisata lainnya di Agam, buka <a href="/budaya" class="text-warning-500 hover:underline font-semibold">Budaya Sumbar</a> dan pilih pin hijau di peta atau filter kabupaten Agam."

Q: "Berapa anggaran Sumbar 2025?"
A: "APBD Sumbar tahun 2025 sebesar 12,5 Triliun. Per April 2025, realisasinya sudah 35,8 persen. Ini lebih tinggi dari tahun 2024 yang anggarannya 11,8 Triliun dengan realisasi 94,2 persen.<br/><br/>

Detail lengkap realisasi belanja per kategori dan trend sejak 2021 bisa dilihat di <a href="/keuangan" class="text-warning-500 hover:underline font-semibold">Keuangan Daerah</a>."

Q: "Apa itu PPID?"
A: "PPID (Pejabat Pengelola Informasi dan Dokumentasi) adalah platform untuk akses informasi publik sesuai UU Keterbukaan Informasi. Masyarakat bisa akses dokumen publik dan ajukan permintaan informasi dengan respons maksimal 24 jam.<br/><br/>

Fiturnya ada akses dokumen publik, permintaan informasi, dan tracking status. Bisa diakses di <a href="/inovasi" class="text-warning-500 hover:underline font-semibold">Inovasi & Layanan Digital</a>."

Q: "Dimana saya bisa lihat pengumuman penting dari pemerintah?"
A: "Lihat di halaman <a href="/pengumuman" class="text-warning-500 hover:underline font-semibold">Pengumuman</a>. Ada dua jenis: bertanda PENTING untuk info krusial seperti seleksi CPNS, beasiswa, atau bantuan sosial, dan bertanda INFO untuk pengumuman umum.<br/><br/>

Tiap pengumuman ada deskripsi singkat, tanggal publikasi, dan file dokumen yang bisa diunduh. Tinggal klik kartunya untuk detail lengkap."

Q: "Bagaimana cara mengecek berita hoax tentang Sumbar?"
A: "Buka halaman <a href="/anti_hoax" class="text-warning-500 hover:underline font-semibold">Anti Hoax</a>. Di sana ada dua section:<br/><br/>

Klarifikasi Informasi Hoax dengan badge HOAX (merah) untuk info salah atau MISLEADING CONTENT (kuning) untuk info menyesatkan.<br/><br/>

Berita Terverifikasi dengan badge VERIFIED (hijau) untuk info resmi yang sudah diverifikasi.<br/><br/>

Klik kartunya untuk lihat penjelasan lengkap dengan bukti dan sumber. Selalu cek dulu sebelum share informasi ya."

Q: "Apa saja OPD yang ada di Sumbar?"
A: "Ada 40 OPD (Organisasi Perangkat Daerah) di Sumbar yang terbagi jadi 5 kategori:<br/><br/>

Sekretaris Daerah (9 Biro) seperti Biro Hukum dan Biro Perekonomian<br/>
Dinas Daerah (12 Dinas) dari Pendidikan, Kesehatan, sampai Perhubungan<br/>
Badan Daerah (8 Badan) termasuk Bappeda dan BPBD<br/>
Rumah Sakit Daerah (6 RS) seperti RSUD Achmad Mochtar dan RSJ Prof. HB. Saanin<br/>
Sekretariat DPRD (5 Bagian)<br/><br/>

Daftar lengkapnya ada di <a href="/opd" class="text-warning-500 hover:underline font-semibold">Repositori OPD</a>."

Q: "Siapa yang mengelola rumah sakit daerah di Sumbar?"
A: "Rumah sakit daerah dikelola langsung oleh Pemprov Sumbar sebagai bagian dari OPD. Ada 6 RS: RSUD Achmad Mochtar, RSUD Dr. Rasidin, RSJ Prof. HB. Saanin (kesehatan jiwa), RS Khusus Paru, RS Gigi dan Mulut, dan RS Iswandi.<br/><br/>

Tiap RS punya kepala yang bertanggung jawab langsung ke Gubernur. Detail struktur organisasinya bisa dilihat di <a href="/opd" class="text-warning-500 hover:underline font-semibold">Repositori OPD</a> tab Rumah Sakit Daerah."

Q: "Bagaimana cara melaporkan berita hoax?"
A: "Kalau nemu info mencurigakan tentang Pemprov Sumbar, cek dulu di <a href="/anti_hoax" class="text-warning-500 hover:underline font-semibold">Anti Hoax</a> apakah sudah pernah diklarifikasi.<br/><br/>

Kalau belum ada, hubungi Tim Humas Pemprov Sumbar lewat kontak resmi atau medsos resmi untuk minta konfirmasi. Jangan langsung share informasi yang belum jelas ya.<br/><br/>

Pengumuman resmi selalu dipublikasi di <a href="/pengumuman" class="text-warning-500 hover:underline font-semibold">Pengumuman</a> dan saluran resmi."

CONTOH PERTANYAAN UMUM (gunakan pengetahuan umummu):

Q: "Apa filosofi rumah gadang?"
A: "Rumah Gadang adalah rumah adat Minangkabau yang memiliki filosofi mendalam. Atapnya yang melengkung seperti tanduk kerbau (gonjong) melambangkan kemenangan dalam pertarungan antara kerbau Minangkabau melawan kerbau Majapahit. Struktur rumahnya yang panggung melambangkan sifat rendah hati, sementara tiang-tiangnya yang kokoh melambangkan kekuatan dan ketahanan masyarakat Minangkabau. Rumah Gadang juga menerapkan sistem matrilineal dimana harta pusaka diwariskan melalui garis ibu."

Q: "Bagaimana filosofi merantau orang Minang?"
A: "Filosofi merantau dalam budaya Minangkabau sangat kuat dan dikenal dengan istilah 'marantau'. Bagi pemuda Minang, merantau adalah bagian dari proses pendewasaan untuk mencari ilmu, pengalaman, dan rezeki. Pepatah Minang mengatakan 'karatau madang di hulu, babuah babungo balun, marantau bujang dahulu, di rumah paguno balun' yang artinya kecuali sudah merantau, belum pantas disebut pemuda yang berguna. Merantau bukan berarti meninggalkan kampung halaman, tapi membawa nama baik kampung dan keluarga ke tempat rantau."

Q: "Kenapa rendang terkenal di dunia?"
A: "Rendang dari Sumatera Barat terkenal di dunia karena beberapa alasan. Pertama, rasanya yang kompleks dari kombinasi santan dan 13 rempah yang dimasak berjam-jam hingga bumbu meresap sempurna. Kedua, CNN International pernah menobatkan rendang sebagai makanan terlezat di dunia pada tahun 2011. Ketiga, rendang punya daya tahan lama tanpa kulkas karena proses memasaknya yang membuat air menguap total. Keempat, rendang bukan sekadar makanan tapi bagian dari upacara adat Minangkabau yang menunjukkan kesabaran dan kerja keras dalam prosesnya."

PENTING: 
- Untuk data portal: Gunakan DATA SPESIFIK dari section DATA AKTUAL DARI PROJECT
- Untuk pertanyaan umum: Gunakan pengetahuan umummu tentang Sumbar, budaya Minang, sejarah, dll
- Kombinasikan keduanya untuk jawaban yang komprehensif
- JANGAN tolak pertanyaan apapun tentang Sumbar - selalu berikan jawaban terbaik

Sekarang jawab pertanyaan user dengan konteks di atas: "${finalPrompt}"`;

    // Use official Google Generative AI SDK
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try requested model with fallbacks
    const modelsToTry = uniqueModels([model, ...MODEL_FALLBACKS]);
    let geminiModel = null;
    let lastError: Error | null = null;

    for (const m of modelsToTry) {
      try {
        geminiModel = genAI.getGenerativeModel({ model: m });
        break; // SDK will throw on generate if model not found
      } catch (e: any) {
        lastError = e;
        continue;
      }
    }

    if (!geminiModel) {
      return NextResponse.json(
        {
          error: "Gemini API error",
          details: lastError?.message || "No compatible model found",
        },
        { status: 404 }
      );
    }

    // Streaming mode
    if (stream) {
      try {
        // Build the model content request with system context
        const result = await geminiModel.generateContentStream(systemContext);
        const encoder = new TextEncoder();
        
        const streamBody = new ReadableStream<Uint8Array>({
          async start(controller) {
            try {
              for await (const chunk of result.stream) {
                const text = chunk.text();
                if (text) {
                  controller.enqueue(encoder.encode(text));
                }
              }
              controller.close();
            } catch (err: any) {
              controller.error(err);
            }
          },
        });

        return new Response(streamBody, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
          },
        });
      } catch (err: any) {
        const providerError = mapGeminiError(err);
        return NextResponse.json(
          { error: providerError.error, details: providerError.details },
          { status: providerError.status }
        );
      }
    }

    // Non-streaming mode
    try {
      const result = await geminiModel.generateContent(systemContext);
      const response = await result.response;
      const text = response.text();

      return new Response(text || "(no response)", {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    } catch (err: any) {
      const providerError = mapGeminiError(err);
      return NextResponse.json(
        { error: providerError.error, details: providerError.details },
        { status: providerError.status }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: "Unexpected server error", details: String(err?.message || err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}

// Helper: deduplicate model list
function uniqueModels(models: (string | undefined)[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const m of models) {
    if (!m) continue;
    const v = m.trim();
    if (!v || seen.has(v)) continue;
    seen.add(v);
    out.push(v);
  }
  return out;
}
