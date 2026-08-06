import {
  ArrowRight,
  Building2,
  CalendarDays,
  FileText,
  HelpCircle,
  Landmark,
  Map,
  Megaphone,
  Newspaper,
  Search,
  ShieldAlert,
  WalletCards,
} from "lucide-react";
import Link from "next/link";

import { ImmersiveMedia, RumahGadangHeroArt } from "@/components/landing";
import {
  ActionCard,
  DocumentCard,
  PageShell,
  Section,
  StatusBadge,
} from "@/components/ui";

const priorityServices = [
  {
    title: "Pengumuman resmi",
    description: "Cek informasi dan keputusan terbaru dari Pemprov Sumbar.",
    href: "/pengumuman",
    icon: <Megaphone className="h-5 w-5" />,
    status: "Resmi",
  },
  {
    title: "PPID dan informasi publik",
    description: "Akses pedoman, dokumen, dan kanal informasi publik.",
    href: "/informasi#pedoman-teknis",
    icon: <FileText className="h-5 w-5" />,
    status: "Dokumen",
  },
  {
    title: "Keuangan daerah",
    description: "Lihat ringkasan APBD, realisasi, dan laporan daerah.",
    href: "/keuangan",
    icon: <WalletCards className="h-5 w-5" />,
    status: "Transparansi",
  },
  {
    title: "Anti Hoax",
    description: "Klarifikasi informasi sebelum dibagikan ke publik.",
    href: "/anti_hoax",
    icon: <ShieldAlert className="h-5 w-5" />,
    status: "Waspada",
    statusVariant: "urgent" as const,
  },
  {
    title: "Survey kepuasan masyarakat",
    description: "Nilai layanan dan baca panduan penggunaan sistem SKM.",
    href: "/informasi-layanan",
    icon: <HelpCircle className="h-5 w-5" />,
    status: "Layanan",
  },
  {
    title: "Direktori OPD",
    description: "Temukan perangkat daerah dan kategori organisasi provinsi.",
    href: "/opd",
    icon: <Building2 className="h-5 w-5" />,
    status: "Direktori",
  },
];

const officialUpdates = [
  {
    title: "Pengumuman Seleksi CPNS Provinsi Sumbar 2024",
    date: "1 November 2024",
    href: "/pengumuman",
    label: "Pengumuman",
  },
  {
    title: "Pembukaan Pendaftaran Beasiswa Sumbar Cerdas",
    date: "3 November 2024",
    href: "/pengumuman",
    label: "Pengumuman",
  },
  {
    title: "Jadwal Pemeliharaan Sistem Informasi",
    date: "5 November 2024",
    href: "/pengumuman",
    label: "Informasi",
  },
];

const newsItems = [
  {
    title: "Gubernur Sumbar resmikan program digitalisasi pelayanan publik",
    source: "Humas Pemprov Sumbar",
    date: "28 Oktober 2024",
    href: "/informasi/berita",
  },
  {
    title: "Sumbar raih penghargaan pengelolaan keuangan daerah",
    source: "Biro Keuangan",
    date: "25 Oktober 2024",
    href: "/informasi/berita",
  },
];

const cultureLinks = [
  { label: "Budaya Sumbar", href: "/budaya", icon: <Map className="h-4 w-4" /> },
  {
    label: "Foto daerah",
    href: "/informasi/foto",
    icon: <Newspaper className="h-4 w-4" />,
  },
  {
    label: "Agenda kegiatan",
    href: "/informasi/agenda",
    icon: <CalendarDays className="h-4 w-4" />,
  },
];

export default function Home() {
  return (
    <PageShell width="wide" className="bg-civic-paper" innerClassName="py-0!">
      <section className="relative left-1/2 isolate min-h-[calc(92dvh-4rem)] w-screen -translate-x-1/2 overflow-hidden bg-civic-paper">
        <RumahGadangHeroArt />
        <div className="absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-civic-paper via-civic-paper/92 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[calc(92dvh-4rem)] max-w-civic-wide items-center px-6 pb-24 pt-16 sm:px-8 lg:px-10">
          <div className="max-w-3xl landing-reveal lg:max-w-[46rem]">
            <StatusBadge variant="official">Portal resmi Provinsi Sumatera Barat</StatusBadge>
            <h1 className="mt-5 max-w-4xl text-balance text-4xl font-extrabold leading-[1.04] text-civic-text md:text-6xl">
              Akses layanan dan informasi publik Sumatera Barat
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-civic-textMuted">
              Temukan layanan, pengumuman, dokumen transparansi, klarifikasi
              informasi, dan data perangkat daerah dalam satu pintu.
            </p>

            <form
              action="/informasi"
              className="mt-8 flex max-w-2xl flex-col gap-3 rounded-civic-xl border border-civic-line bg-civic-cloud/96 p-2 shadow-civic-sm sm:flex-row"
            >
              <label className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Search className="h-5 w-5 shrink-0 text-civic-textSubtle" />
                <span className="sr-only">Cari layanan atau informasi</span>
                <input
                  name="q"
                  type="search"
                  placeholder="Cari layanan, pengumuman, dokumen..."
                  className="w-full bg-transparent py-3 text-sm text-civic-text outline-none placeholder:text-civic-textSubtle"
                />
              </label>
              <button
                type="submit"
                className="civic-focus-ring inline-flex items-center justify-center gap-2 rounded-civic-lg bg-semantic-primary px-5 py-3 text-sm font-bold text-white transition duration-civic hover:bg-brand-gold-600"
              >
                Cari <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/pengumuman"
                className="civic-focus-ring rounded-civic border border-civic-line bg-civic-cloud/96 px-4 py-2 text-sm font-semibold text-civic-text hover:border-brand-gold-300 hover:bg-brand-gold-50"
              >
                Pengumuman resmi
              </Link>
              <Link
                href="/keuangan"
                className="civic-focus-ring rounded-civic border border-civic-line bg-civic-cloud/96 px-4 py-2 text-sm font-semibold text-civic-text hover:border-brand-gold-300 hover:bg-brand-gold-50"
              >
                Keuangan daerah
              </Link>
              <Link
                href="/anti_hoax"
                className="civic-focus-ring rounded-civic border border-brand-gold-300 bg-brand-gold-50 px-4 py-2 text-sm font-bold text-brand-gold-800 hover:bg-brand-gold-100"
              >
                Anti Hoax
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sumbar-grain relative left-1/2 -mt-14 min-h-[74vh] w-screen -translate-x-1/2 overflow-hidden pb-16 pt-28 text-civic-inverse md:pb-20 md:pt-32">
        <ImmersiveMedia
          image="green-valley"
          imgClassName="max-md:[object-position:52%_center] md:[object-position:center_center]"
          priority
        />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(248,245,237,0.94)_0%,rgba(23,35,49,0.92)_20%,rgba(23,35,49,0.88)_60%,rgba(23,35,49,0.82)_100%)]" />
        <div className="absolute inset-x-0 top-0 z-[2] h-32 bg-gradient-to-b from-civic-paper via-civic-paper/60 to-transparent" />
        <div className="relative z-10 mx-auto max-w-civic-wide px-6 sm:px-8 lg:px-10">
          <div className="mb-8 max-w-civic-prose landing-reveal">
            <h2 className="text-2xl font-extrabold leading-tight tracking-[-0.01em] text-civic-inverse md:text-3xl">
              Layanan prioritas
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#B8C0CB] md:text-base">
              Akses yang paling sering dibutuhkan warga ditempatkan di depan, dengan rute langsung dan label yang jelas.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {priorityServices.map((service) => (
              <ActionCard
                key={service.href}
                title={service.title}
                description={service.description}
                href={service.href}
                icon={service.icon}
                status={service.status}
                statusVariant={service.statusVariant ?? "official"}
                actionLabel="Buka"
                className="bg-civic-cloud/98 shadow-[0_4px_16px_rgba(0,0,0,0.15)] backdrop-blur-sm"
              />
            ))}
          </div>
        </div>
      </section>

      <Section
        title="Informasi resmi"
        description="Pengumuman dan berita ditampilkan sebagai jalur resmi, bukan kartu promosi."
        className="py-6"
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col rounded-civic-xl border border-civic-line bg-civic-cloud p-5 shadow-civic-xs">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-semantic-primary">
                  Pengumuman
                </p>
                <h3 className="mt-1 text-xl font-bold text-civic-text">
                  Kabar resmi terbaru
                </h3>
              </div>
              <Link
                href="/pengumuman"
                className="civic-focus-ring rounded-civic px-2 py-1 text-sm font-bold text-semantic-primary hover:bg-brand-gold-50"
              >
                Lihat semua
              </Link>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {officialUpdates.map((item) => (
                <Link
                  href={item.href}
                  key={item.title}
                  className="civic-focus-ring flex flex-1 flex-col justify-center rounded-civic-lg border border-civic-line bg-civic-paper p-4 transition duration-civic hover:border-brand-gold-300 hover:bg-brand-gold-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-bold leading-snug text-civic-text">
                      {item.title}
                    </h4>
                    <StatusBadge variant="official">{item.label}</StatusBadge>
                  </div>
                  <p className="mt-2 text-sm text-civic-textSubtle">{item.date}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col rounded-civic-xl border border-civic-line bg-civic-cloud p-5 shadow-civic-xs">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-semantic-info">
                  Berita
                </p>
                <h3 className="mt-1 text-xl font-bold text-civic-text">
                  Informasi pembangunan
                </h3>
              </div>
              <Link
                href="/informasi/berita"
                className="civic-focus-ring rounded-civic px-2 py-1 text-sm font-bold text-semantic-primary hover:bg-brand-gold-50"
              >
                Semua berita
              </Link>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {newsItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.title}
                  className="civic-focus-ring flex flex-1 flex-col justify-center rounded-civic-lg border border-civic-line bg-civic-paper p-4 transition duration-civic hover:border-brand-rantau-200 hover:bg-brand-rantau-50"
                >
                  <p className="text-sm font-semibold text-semantic-info">
                    {item.source}
                  </p>
                  <h4 className="mt-2 text-lg font-bold leading-snug text-civic-text">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-civic-textSubtle">{item.date}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <section className="relative left-1/2 min-h-[78vh] w-screen -translate-x-1/2 overflow-hidden bg-civic-paper py-16 md:py-20">
        <ImmersiveMedia
          image="rice-terraces"
          className="opacity-80"
          imgClassName="max-md:[object-position:64%_center] md:[object-position:58%_center]"
        />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(248,245,237,0.98)_0%,rgba(248,245,237,0.94)_40%,rgba(248,245,237,0.52)_68%,rgba(248,245,237,0.22)_100%)]" />
        <div className="absolute inset-x-0 top-0 z-[2] h-28 bg-gradient-to-b from-civic-paper via-civic-paper/72 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-civic-paper via-civic-paper/55 to-transparent" />
        <div className="relative z-10 mx-auto max-w-civic-wide px-6 sm:px-8 lg:px-10">
          <div className="max-w-civic-prose landing-reveal">
            <h2 className="text-2xl font-extrabold leading-tight tracking-[-0.01em] text-civic-text md:text-3xl">
              Transparansi dan dokumen
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#6B7280] md:text-base">
              Akses dokumen dan laporan penting dengan konteks sumber yang jelas.
            </p>
          </div>
          <div className="mt-8 grid max-w-5xl gap-4 lg:grid-cols-3">
            <DocumentCard
              title="Keuangan Daerah"
              description="Ringkasan APBD, realisasi, laporan, dan tren anggaran."
              href="/keuangan"
              fileType="Dashboard"
              source="Pemprov Sumbar"
              icon={<Landmark className="h-5 w-5" />}
              actionLabel="Lihat"
              status="Transparansi"
              className="bg-civic-cloud/96 shadow-[0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur-sm"
            />
            <DocumentCard
              title="Pedoman teknis"
              description="Dokumen panduan dan informasi teknis layanan publik."
              href="/informasi#pedoman-teknis"
              fileType="Dokumen"
              source="Pemprov Sumbar"
              actionLabel="Buka"
              status="PPID"
              className="bg-civic-cloud/96 shadow-[0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur-sm"
            />
            <DocumentCard
              title="Manual SKM"
              description="Panduan penggunaan Survey Kepuasan Masyarakat."
              href="/file/SEPAKAT - Manual Book.pdf"
              fileType="PDF"
              source="SEPAKAT"
              actionLabel="Unduh"
              status="Layanan"
              className="bg-civic-cloud/96 shadow-[0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      <section className="sumbar-grain relative left-1/2 -mt-10 min-h-[78vh] w-screen -translate-x-1/2 overflow-hidden pb-16 pt-24 text-civic-inverse md:pb-20 md:pt-28">
        <ImmersiveMedia
          image="mountain-road"
          imgClassName="max-md:[object-position:42%_center] md:[object-position:center_center]"
        />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(23,35,49,0.94)_0%,rgba(23,35,49,0.86)_42%,rgba(23,35,49,0.54)_100%)]" />
        <div className="absolute inset-x-0 top-0 z-[2] h-24 bg-gradient-to-b from-civic-paper via-civic-paper/20 to-transparent" />
        <div className="relative z-10 mx-auto max-w-civic-wide px-6 sm:px-8 lg:px-10">
          <div className="max-w-civic-prose landing-reveal">
            <h2 className="text-2xl font-extrabold leading-tight tracking-[-0.01em] text-civic-inverse md:text-3xl">
              Budaya dan wilayah
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#B8C0CB] md:text-base">
              Konteks lokal ditampilkan sebagai pengetahuan daerah yang dapat dijelajahi, bukan sekadar ornamen.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cultureLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="civic-focus-ring group rounded-civic-xl border border-white/12 bg-white/[0.08] p-6 backdrop-blur-sm transition duration-civic hover:border-brand-gold-400/40 hover:bg-white/[0.14]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-civic-lg bg-brand-gold-500/20 text-brand-gold-300 transition duration-civic group-hover:bg-brand-gold-500/30 group-hover:text-brand-gold-200">
                  {item.icon}
                </span>
                <h3 className="mt-4 text-lg font-bold text-civic-inverse">
                  {item.label}
                </h3>
                <p className="mt-1 text-sm leading-6 text-[#B8C0CB]">
                  Jelajahi informasi lengkap
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gold-300 transition duration-civic group-hover:text-brand-gold-200">
                  Selengkapnya <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
