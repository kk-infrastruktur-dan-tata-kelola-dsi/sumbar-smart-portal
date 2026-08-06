export type NavigationItem = {
  name: string;
  href: string;
  description?: string;
};

export type NavigationGroup = {
  name: string;
  href?: string;
  items?: NavigationItem[];
};

export const navigationGroups: NavigationGroup[] = [
  {
    name: "Beranda",
    href: "/",
  },
  {
    name: "Layanan",
    items: [
      {
        name: "Survey Kepuasan Masyarakat",
        href: "/informasi-layanan",
        description: "Nilai dan panduan layanan SKM.",
      },
      {
        name: "Inovasi",
        href: "/inovasi",
        description: "Program dan inovasi pelayanan daerah.",
      },
      {
        name: "PPID",
        href: "/informasi#pedoman-teknis",
        description: "Akses informasi publik dan pedoman teknis.",
      },
    ],
  },
  {
    name: "Informasi",
    items: [
      { name: "Informasi", href: "/informasi" },
      { name: "Berita", href: "/informasi/berita" },
      { name: "Pengumuman", href: "/pengumuman" },
      { name: "Agenda", href: "/informasi/agenda" },
      { name: "Foto", href: "/informasi/foto" },
      { name: "Video", href: "/informasi/video" },
      { name: "Infografis", href: "/informasi/infografis" },
      { name: "Anti Hoax", href: "/anti_hoax" },
    ],
  },
  {
    name: "Transparansi",
    items: [
      { name: "Keuangan Daerah", href: "/keuangan" },
      { name: "Profil Provinsi", href: "/profile" },
      { name: "Struktur Organisasi", href: "/profile#struktur" },
    ],
  },
  {
    name: "Budaya",
    href: "/budaya",
  },
  {
    name: "OPD",
    href: "/opd",
  },
];

export const priorityMobileLinks: NavigationItem[] = [
  { name: "Pengumuman resmi", href: "/pengumuman" },
  { name: "Keuangan daerah", href: "/keuangan" },
  { name: "Anti Hoax", href: "/anti_hoax" },
  { name: "Survey layanan", href: "/informasi-layanan" },
];
