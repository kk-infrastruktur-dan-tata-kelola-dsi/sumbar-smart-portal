/**
 * AI Context Data - Semua data project untuk AI Assistant
 * File ini berisi data lengkap dari project yang bisa diakses oleh AI
 */

// ============================================
// KEUANGAN DAERAH DATA
// ============================================

export const keuanganData = {
  statisticsByYear: {
    "2025": [
      {
        value: "12,5 T",
        label: "Per April 2025",
        description: "Anggaran Pendapatan & Belanja Daerah",
      },
      {
        value: "35,8%",
        label: "Realisasi hingga Q1 2025",
        description: "Tingkat Realisasi",
      },
      {
        value: "WTP",
        label: "Target Opini BPK 2025",
        description: "Wajar Tanpa Pengecualian",
      },
    ],
    "2024": [
      {
        value: "11,8 T",
        label: "Tahun Anggaran 2024",
        description: "Anggaran Pendapatan & Belanja Daerah",
      },
      {
        value: "94,2%",
        label: "Realisasi 2024",
        description: "Tingkat Realisasi",
      },
      {
        value: "WTP",
        label: "Opini BPK 2024",
        description: "Wajar Tanpa Pengecualian",
      },
    ],
    "2023": [
      {
        value: "10,9 T",
        label: "Tahun Anggaran 2023",
        description: "Anggaran Pendapatan & Belanja Daerah",
      },
      {
        value: "92,5%",
        label: "Realisasi 2023",
        description: "Tingkat Realisasi",
      },
      {
        value: "WTP",
        label: "Opini BPK 2023",
        description: "Wajar Tanpa Pengecualian",
      },
    ],
    "2022": [
      {
        value: "10,2 T",
        label: "Tahun Anggaran 2022",
        description: "Anggaran Pendapatan & Belanja Daerah",
      },
      {
        value: "91,3%",
        label: "Realisasi 2022",
        description: "Tingkat Realisasi",
      },
      {
        value: "WTP",
        label: "Opini BPK 2022",
        description: "Wajar Tanpa Pengecualian",
      },
    ],
    "2021": [
      {
        value: "9,5 T",
        label: "Tahun Anggaran 2021",
        description: "Anggaran Pendapatan & Belanja Daerah",
      },
      {
        value: "89,7%",
        label: "Realisasi 2021",
        description: "Tingkat Realisasi",
      },
      {
        value: "WTP",
        label: "Opini BPK 2021",
        description: "Wajar Tanpa Pengecualian",
      },
    ],
  },

  laporanKeuangan: [
    // 2025
    {
      title: "APBD Tahun Anggaran 2025",
      size: "4.8 MB",
      date: "1 Nov 2024",
      year: "2025",
    },
    {
      title: "Rencana Kerja Anggaran (RKA) 2025",
      size: "5.2 MB",
      date: "15 Oct 2024",
      year: "2025",
    },
    {
      title: "Laporan Realisasi Anggaran Q1 2025",
      size: "3.1 MB",
      date: "15 Apr 2025",
      year: "2025",
    },
    // 2024
    {
      title: "Laporan Keuangan Pemprov 2024 (Audited)",
      size: "3.5 MB",
      date: "28 Jan 2025",
      year: "2024",
    },
    {
      title: "APBD Tahun Anggaran 2024",
      size: "4.3 MB",
      date: "7 Nov 2023",
      year: "2024",
    },
    {
      title: "Laporan Realisasi Anggaran 2024",
      size: "3.2 MB",
      date: "15 Jan 2025",
      year: "2024",
    },
    {
      title: "Neraca Daerah 2024",
      size: "2.8 MB",
      date: "15 Jan 2025",
      year: "2024",
    },
    {
      title: "Catatan Atas Laporan Keuangan 2024",
      size: "4.1 MB",
      date: "28 Jan 2025",
      year: "2024",
    },
    // 2023
    {
      title: "Laporan Keuangan Pemprov 2023 (Audited)",
      size: "3.4 MB",
      date: "15 Feb 2024",
      year: "2023",
    },
    {
      title: "APBD Tahun Anggaran 2023",
      size: "4.0 MB",
      date: "10 Nov 2022",
      year: "2023",
    },
    {
      title: "Laporan Realisasi Anggaran 2023",
      size: "3.0 MB",
      date: "20 Jan 2024",
      year: "2023",
    },
    {
      title: "Neraca Daerah 2023",
      size: "2.6 MB",
      date: "20 Jan 2024",
      year: "2023",
    },
    // 2022
    {
      title: "Laporan Keuangan Pemprov 2022 (Audited)",
      size: "3.3 MB",
      date: "10 Feb 2023",
      year: "2022",
    },
    {
      title: "APBD Tahun Anggaran 2022",
      size: "3.9 MB",
      date: "5 Nov 2021",
      year: "2022",
    },
    {
      title: "Laporan Realisasi Anggaran 2022",
      size: "2.9 MB",
      date: "15 Jan 2023",
      year: "2022",
    },
    // 2021
    {
      title: "Laporan Keuangan Pemprov 2021 (Audited)",
      size: "3.1 MB",
      date: "5 Feb 2022",
      year: "2021",
    },
    {
      title: "APBD Tahun Anggaran 2021",
      size: "3.7 MB",
      date: "1 Nov 2020",
      year: "2021",
    },
    {
      title: "Laporan Realisasi Anggaran 2021",
      size: "2.7 MB",
      date: "10 Jan 2022",
      year: "2021",
    },
  ],

  realisasiBelanja: {
    "2025": [
      { category: "Belanja Pegawai", percentage: 45 },
      { category: "Belanja Barang & Jasa", percentage: 28 },
      { category: "Belanja Modal", percentage: 20 },
      { category: "Belanja Lainnya", percentage: 7 },
    ],
    "2024": [
      { category: "Belanja Pegawai", percentage: 72 },
      { category: "Belanja Barang & Jasa", percentage: 83 },
      { category: "Belanja Modal", percentage: 33 },
      { category: "Belanja Lainnya", percentage: 7 },
    ],
    "2023": [
      { category: "Belanja Pegawai", percentage: 70 },
      { category: "Belanja Barang & Jasa", percentage: 80 },
      { category: "Belanja Modal", percentage: 30 },
      { category: "Belanja Lainnya", percentage: 8 },
    ],
    "2022": [
      { category: "Belanja Pegawai", percentage: 68 },
      { category: "Belanja Barang & Jasa", percentage: 78 },
      { category: "Belanja Modal", percentage: 28 },
      { category: "Belanja Lainnya", percentage: 9 },
    ],
    "2021": [
      { category: "Belanja Pegawai", percentage: 65 },
      { category: "Belanja Barang & Jasa", percentage: 75 },
      { category: "Belanja Modal", percentage: 25 },
      { category: "Belanja Lainnya", percentage: 10 },
    ],
  },

  trendAnggaran: [
    {
      year: "2021",
      anggaran: "9.5 T",
      realisasi: "8.5 T",
      persentase: "89.7%",
    },
    {
      year: "2022",
      anggaran: "10.2 T",
      realisasi: "9.3 T",
      persentase: "91.3%",
    },
    {
      year: "2023",
      anggaran: "10.9 T",
      realisasi: "10.1 T",
      persentase: "92.5%",
    },
    {
      year: "2024",
      anggaran: "11.8 T",
      realisasi: "11.1 T",
      persentase: "94.2%",
    },
    {
      year: "2025",
      anggaran: "12.5 T",
      realisasi: "4.5 T",
      persentase: "35.8%",
    },
  ],
};

// ============================================
// KABUPATEN & WILAYAH DATA
// ============================================

export const kabupatenData = [
  {
    name: "Kota Padang",
    slug: "padang",
    color: "#ef4444", // red
    description: "Ibu kota Provinsi Sumatera Barat",
    populasi: "939.112 jiwa",
    luas: "694,96 km²",
  },
  {
    name: "Kabupaten Agam",
    slug: "agam",
    color: "#22c55e", // green
    description: "Terkenal dengan Ngarai Sianok dan Jam Gadang",
    populasi: "500.000 jiwa",
    luas: "2.232,30 km²",
  },
  {
    name: "Kabupaten Tanah Datar",
    slug: "tanah-datar",
    color: "#3b82f6", // blue
    description: "Pusat kebudayaan Minangkabau",
    populasi: "374.000 jiwa",
    luas: "1.336,00 km²",
  },
  {
    name: "Kabupaten Lima Puluh Kota",
    slug: "lima-puluh-kota",
    color: "#f59e0b", // amber
    description: "Daerah pertanian dan perkebunan",
    populasi: "380.000 jiwa",
    luas: "3.354,30 km²",
  },
  {
    name: "Kabupaten Pesisir Selatan",
    slug: "pesisir-selatan",
    color: "#8b5cf6", // violet
    description: "Pantai barat dengan keindahan alam laut",
    populasi: "476.000 jiwa",
    luas: "5.794,95 km²",
  },
  {
    name: "Kabupaten Solok",
    slug: "solok",
    color: "#ec4899", // pink
    description: "Daerah pegunungan dengan udara sejuk",
    populasi: "368.000 jiwa",
    luas: "3.738,00 km²",
  },
  {
    name: "Kabupaten Padang Pariaman",
    slug: "padang-pariaman",
    color: "#14b8a6", // teal
    description: "Daerah pesisir dengan budaya melayu",
    populasi: "465.000 jiwa",
    luas: "1.328,79 km²",
  },
  {
    name: "Kota Bukittinggi",
    slug: "bukittinggi",
    color: "#06b6d4", // cyan
    description: "Kota wisata dengan sejuta kenangan",
    populasi: "124.000 jiwa",
    luas: "25,24 km²",
  },
];

// ============================================
// INOVASI & LAYANAN DIGITAL
// ============================================

export const layananDigital = [
  {
    name: "PPID (Pejabat Pengelola Informasi dan Dokumentasi)",
    slug: "ppid",
    description:
      "Platform akses informasi publik sesuai UU Keterbukaan Informasi Publik. Masyarakat dapat mengakses dokumen publik dan mengajukan permintaan informasi.",
    fitur: [
      "Akses dokumen publik",
      "Permintaan informasi",
      "Tracking status permintaan",
      "Waktu respons maksimal 24 jam",
    ],
    url: "/inovasi",
    image: "/images/ppid.png",
  },
  {
    name: "Aplikasi E-Riset",
    slug: "e-riset",
    description:
      "Platform penelitian elektronik yang menyediakan database hasil penelitian dari berbagai perguruan tinggi, lembaga penelitian, dan OPD. Memfasilitasi kolaborasi antara peneliti dan institusi.",
    fitur: [
      "Database 500+ hasil penelitian",
      "120+ peneliti aktif terdaftar",
      "25+ institusi partner",
      "Kolaborasi penelitian",
      "Publikasi hasil penelitian",
    ],
    statistik: {
      penelitian: "500+",
      peneliti: "120+",
      institusi: "25+",
    },
    url: "/inovasi",
    image: "/images/e-riset.png",
  },
];

// ============================================
// KATEGORI BUDAYA
// ============================================

export const budayaKategori = [
  {
    name: "Objek Wisata",
    slug: "objek-wisata",
    description: "Destinasi wisata alam, budaya, dan sejarah",
    icon: "🏞️",
  },
  {
    name: "Tradisi",
    slug: "tradisi",
    description: "Adat istiadat dan upacara tradisional",
    icon: "🎭",
  },
  {
    name: "Kuliner",
    slug: "kuliner",
    description: "Makanan dan minuman khas Minangkabau",
    icon: "🍜",
  },
];

// ============================================
// CONTOH DESTINASI WISATA (Sample Data)
// ============================================

export const destinasiContoh = [
  {
    name: "Jam Gadang",
    kabupaten: "Kota Bukittinggi",
    kategori: "Objek Wisata",
    rating: 4.8,
    reviewCount: 2450,
    description:
      "Ikon kota Bukittinggi yang menjadi landmark terkenal. Menara jam bergaya Belanda dengan atap khas Minangkabau.",
    lokasi: "Jl. Jam Gadang, Benteng Ps. Atas, Guguk Panjang, Kota Bukittinggi",
    tags: ["Landmark", "Sejarah", "Fotografi"],
  },
  {
    name: "Ngarai Sianok",
    kabupaten: "Kabupaten Agam",
    kategori: "Objek Wisata",
    rating: 4.9,
    reviewCount: 1876,
    description:
      "Lembah curam dengan pemandangan spektakuler. Canyon hijau dengan kedalaman hingga 100 meter.",
    lokasi: "Panorama, Kecamatan IV Koto, Kabupaten Agam",
    tags: ["Alam", "Pemandangan", "Adventure"],
  },
  {
    name: "Istana Pagaruyung",
    kabupaten: "Kabupaten Tanah Datar",
    kategori: "Objek Wisata",
    rating: 4.7,
    reviewCount: 1653,
    description:
      "Istana kerajaan Minangkabau yang megah dengan arsitektur rumah gadang khas.",
    lokasi: "Batusangkar, Kabupaten Tanah Datar",
    tags: ["Budaya", "Sejarah", "Arsitektur"],
  },
  {
    name: "Pantai Carocok",
    kabupaten: "Kabupaten Pesisir Selatan",
    kategori: "Objek Wisata",
    rating: 4.6,
    reviewCount: 1234,
    description:
      "Pantai indah dengan pulau kecil dan jembatan gantung. Cocok untuk keluarga.",
    lokasi: "Painan, Kabupaten Pesisir Selatan",
    tags: ["Pantai", "Keluarga", "Sunset"],
  },
  {
    name: "Rendang",
    kabupaten: "Seluruh Sumbar",
    kategori: "Kuliner",
    rating: 5.0,
    reviewCount: 3892,
    description:
      "Masakan daging sapi berbumbu rempah yang dimasak berjam-jam hingga bumbu meresap.",
    tags: ["Makanan Utama", "Pedas", "Santan"],
  },
  {
    name: "Sate Padang",
    kabupaten: "Kota Padang",
    kategori: "Kuliner",
    rating: 4.9,
    reviewCount: 2765,
    description: "Sate dengan kuah kental berbumbu kunyit yang khas dan pedas.",
    tags: ["Street Food", "Pedas", "Khas Padang"],
  },
];

// ============================================
// FUNGSI HELPER
// ============================================

export function getKeuanganByYear(year: string) {
  const yearKey = year as keyof typeof keuanganData.statisticsByYear;

  return {
    statistik:
      keuanganData.statisticsByYear[yearKey] ||
      keuanganData.statisticsByYear["2025"],
    laporan: keuanganData.laporanKeuangan.filter((l) => l.year === year),
    belanja:
      keuanganData.realisasiBelanja[yearKey] ||
      keuanganData.realisasiBelanja["2025"],
  };
}

export function getKabupatenByName(name: string) {
  return kabupatenData.find(
    (k) =>
      k.name.toLowerCase().includes(name.toLowerCase()) ||
      k.slug.includes(name.toLowerCase()),
  );
}

export function getLayananBySlug(slug: string) {
  return layananDigital.find((l) => l.slug === slug);
}

// ============================================
// SUMMARY DATA UNTUK AI
// ============================================

export function getAISummary() {
  return {
    totalKabupaten: kabupatenData.length,
    tahunKeuanganTersedia: Object.keys(keuanganData.statisticsByYear),
    totalLaporanKeuangan: keuanganData.laporanKeuangan.length,
    layananDigitalTersedia: layananDigital.length,
    kategoriWisata: budayaKategori.length,
  };
}
