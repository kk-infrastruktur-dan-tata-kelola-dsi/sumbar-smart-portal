import placeholderHorizontal from "@/public/images/placeholder-horizontal.jpg";
import placeholderVertical from "@/public/images/placholder-vertical.jpg";

export const newsItems = [
  {
    id: "1",
    title: "BPBD: kerugian sementara bencana Sumbar mencapai Rp108,38 miliar",
    date: "20 Mei 2024, 09.23 WIB",
    summary:
      "BPBD Sumatera Barat menyampaikan hitung cepat kerugian sementara akibat banjir dan banjir bandang di sejumlah wilayah.",
    image: placeholderHorizontal,
    source: "BPBD Sumbar",
  },
  {
    id: "2",
    title: "Pemprov Sumbar salurkan bantuan beras untuk dapur umum Pasa Gadang",
    date: "10 Oktober 2023, 21.11 WIB",
    summary:
      "Pemerintah Provinsi Sumatera Barat merespons kebakaran di Pasa Gadang dengan dukungan logistik bagi warga terdampak.",
    image: placeholderHorizontal,
    source: "Biro Adpim",
  },
  {
    id: "3",
    title: "Banjir bandang di Sumatera Barat, data korban terus diperbarui",
    date: "12 Mei 2024, 20.15 WIB",
    summary:
      "Pemerintah daerah bersama tim gabungan memperbarui data korban, pengungsi, dan kebutuhan penanganan darurat.",
    image: placeholderHorizontal,
    source: "Posko Tanggap Darurat",
  },
  {
    id: "4",
    title: "Gubernur lepas kontingen Sumbar menuju Pornas Korpri XVII",
    date: "28 September 2023, 10.14 WIB",
    summary:
      "Kontingen KORPRI Sumatera Barat mengikuti agenda olahraga nasional dengan membawa perwakilan lintas perangkat daerah.",
    image: placeholderHorizontal,
    source: "Diskominfotik",
  },
];

export const newsArticle = {
  id: "1",
  title: "BPBD: kerugian sementara bencana Sumbar mencapai Rp108,38 miliar",
  date: "20 Mei 2024, 09.23 WIB",
  image: placeholderHorizontal,
  source: "BPBD Sumbar",
  author: "Tim Redaksi Sumbar Smart Portal",
  content: [
    "Badan Penanggulangan Bencana Daerah Sumatera Barat menyampaikan kerugian sementara akibat banjir dan banjir bandang di sejumlah wilayah berdasarkan hitung cepat diperkirakan mencapai Rp108,38 miliar.",
    "Data tersebut masih dapat berubah karena proses pendataan lapangan terus dilakukan bersama pemerintah kabupaten/kota, relawan, dan instansi teknis.",
    "Komponen kerugian sementara mencakup permukiman warga, infrastruktur dasar, fasilitas pendidikan, fasilitas kesehatan, tempat ibadah, jalan, dan jembatan.",
    "Pemerintah daerah meminta masyarakat mengikuti informasi resmi dan menghindari penyebaran data korban atau kerusakan yang belum terverifikasi.",
    "Penanganan darurat tetap diprioritaskan pada pencarian korban, pemenuhan kebutuhan pengungsi, pembukaan akses jalan, serta pemulihan layanan dasar di wilayah terdampak.",
  ],
};

export const agendas = [
  {
    id: "agenda-umkm",
    title: "Pelatihan UMKM digital Sumatera Barat",
    date: "30 Oktober 2024",
    location: "Hotel Pangeran, Padang",
    description:
      "Pelatihan pemasaran digital dan pengelolaan katalog produk untuk pelaku UMKM lintas kabupaten/kota.",
    image: placeholderVertical,
  },
  {
    id: "agenda-kuliner",
    title: "Festival kuliner tradisional Minangkabau",
    date: "2 November 2024",
    location: "Taman Budaya, Padang",
    description:
      "Pameran kuliner daerah dengan kurasi pelaku usaha pangan tradisional dan komunitas budaya.",
    image: placeholderVertical,
  },
  {
    id: "agenda-smart-city",
    title: "Seminar tata kelola kota cerdas",
    date: "5 November 2024",
    location: "Auditorium Gubernuran",
    description:
      "Forum koordinasi untuk membahas layanan digital, data publik, dan prioritas integrasi antarperangkat daerah.",
    image: placeholderVertical,
  },
  {
    id: "agenda-pariwisata",
    title: "Lokakarya pengembangan destinasi pariwisata",
    date: "8 November 2024",
    location: "Hotel Mercure, Padang",
    description:
      "Peningkatan kualitas layanan destinasi, promosi berbasis nagari, dan pelindungan nilai budaya lokal.",
    image: placeholderVertical,
  },
  {
    id: "agenda-investasi",
    title: "Forum investasi daerah",
    date: "12 November 2024",
    location: "Ballroom Hotel Axana",
    description:
      "Paparan peluang investasi sektor unggulan daerah dengan perangkat daerah teknis dan pelaku usaha.",
    image: placeholderVertical,
  },
  {
    id: "agenda-pendidikan",
    title: "Konferensi peningkatan mutu pendidikan",
    date: "15 November 2024",
    location: "Universitas Andalas",
    description:
      "Diskusi peningkatan kualitas sumber daya manusia dan kolaborasi pendidikan tinggi dengan pemerintah daerah.",
    image: placeholderVertical,
  },
];

export const photos = [
  {
    id: "foto-1",
    title: "Kunjungan kerja Gubernur",
    date: "28 Oktober 2024",
    image: placeholderVertical,
    aspect: "portrait" as const,
  },
  {
    id: "foto-2",
    title: "Rapat koordinasi daerah",
    date: "27 Oktober 2024",
    image: placeholderHorizontal,
    aspect: "landscape" as const,
  },
  {
    id: "foto-3",
    title: "Peresmian gedung layanan publik",
    date: "26 Oktober 2024",
    image: placeholderVertical,
    aspect: "portrait" as const,
  },
  {
    id: "foto-4",
    title: "Forum pembangunan daerah",
    date: "25 Oktober 2024",
    image: placeholderHorizontal,
    aspect: "landscape" as const,
  },
  {
    id: "foto-5",
    title: "Kunjungan ke sentra UMKM",
    date: "24 Oktober 2024",
    image: placeholderVertical,
    aspect: "portrait" as const,
  },
  {
    id: "foto-6",
    title: "Pembukaan festival budaya",
    date: "23 Oktober 2024",
    image: placeholderHorizontal,
    aspect: "landscape" as const,
  },
  {
    id: "foto-7",
    title: "Pelatihan pemasaran digital",
    date: "22 Oktober 2024",
    image: placeholderVertical,
    aspect: "portrait" as const,
  },
  {
    id: "foto-8",
    title: "Seminar ekonomi kreatif",
    date: "21 Oktober 2024",
    image: placeholderHorizontal,
    aspect: "landscape" as const,
  },
];

export const infographics = [
  {
    id: "info-1",
    title: "Pertumbuhan ekonomi Sumbar 2024",
    date: "28 Oktober 2024",
    image: placeholderVertical,
  },
  {
    id: "info-2",
    title: "Perkembangan UMKM digital",
    date: "25 Oktober 2024",
    image: placeholderVertical,
  },
  {
    id: "info-3",
    title: "Capaian pembangunan infrastruktur",
    date: "22 Oktober 2024",
    image: placeholderVertical,
  },
  {
    id: "info-4",
    title: "Indeks pembangunan manusia",
    date: "20 Oktober 2024",
    image: placeholderVertical,
  },
  {
    id: "info-5",
    title: "Peta potensi pariwisata daerah",
    date: "18 Oktober 2024",
    image: placeholderVertical,
  },
  {
    id: "info-6",
    title: "Statistik pendidikan Sumbar",
    date: "15 Oktober 2024",
    image: placeholderVertical,
  },
];

export const videos = [
  {
    id: "6U_Fi8FzFYQ",
    title: "Pembangunan infrastruktur Sumbar",
    date: "28 Oktober 2024",
  },
  {
    id: "DtxIaAY7Qto",
    title: "Program digitalisasi UMKM",
    date: "25 Oktober 2024",
  },
  {
    id: "nZgRsT0t9lk",
    title: "Festival budaya Minangkabau",
    date: "20 Oktober 2024",
  },
];
