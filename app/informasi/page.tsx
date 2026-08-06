import {
  CalendarDays,
  FileText,
  Images,
  Megaphone,
  Newspaper,
  ShieldAlert,
  Video,
} from "lucide-react";

import { ContentCard, VideoCard } from "@/components/content";
import {
  ActionCard,
  DocumentCard,
  PageHeader,
  PageShell,
  Section,
  StatusBadge,
} from "@/components/ui";
import { infographics, newsItems, photos, videos } from "@/config/content-data";

const informationRoutes = [
  {
    title: "Berita",
    description: "Kabar kegiatan dan kebijakan Pemerintah Provinsi Sumatera Barat.",
    href: "/informasi/berita",
    icon: Newspaper,
    status: "Berita resmi",
  },
  {
    title: "Pengumuman",
    description: "Informasi resmi, jadwal, seleksi, dan pemberitahuan publik.",
    href: "/pengumuman",
    icon: Megaphone,
    status: "Prioritas",
  },
  {
    title: "Agenda",
    description: "Jadwal kegiatan pemerintah daerah dan forum publik.",
    href: "/informasi/agenda",
    icon: CalendarDays,
    status: "Terjadwal",
  },
  {
    title: "Foto",
    description: "Dokumentasi visual kegiatan dan layanan pemerintah daerah.",
    href: "/informasi/foto",
    icon: Images,
    status: "Galeri",
  },
  {
    title: "Video",
    description: "Dokumentasi video program dan kegiatan pemerintah daerah.",
    href: "/informasi/video",
    icon: Video,
    status: "Media",
  },
  {
    title: "Anti Hoax",
    description: "Klarifikasi informasi publik sebelum dibagikan ulang.",
    href: "/anti_hoax",
    icon: ShieldAlert,
    status: "Klarifikasi",
  },
];

export default function InformasiPage() {
  return (
    <PageShell as="main">
      <PageHeader
        eyebrow="Pusat informasi publik"
        title="Informasi"
        description="Satu pintu untuk berita, pengumuman, agenda, dokumentasi, infografis, dan klarifikasi informasi Pemerintah Provinsi Sumatera Barat."
        metadata={
          <>
            <StatusBadge variant="information">Konten publik</StatusBadge>
            <StatusBadge variant="official">Rute resmi</StatusBadge>
          </>
        }
      />

      <Section
        title="Pilih kanal informasi"
        description="Kanal dikelompokkan berdasarkan kebutuhan warga, bukan berdasarkan komponen visual yang berbeda-beda."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {informationRoutes.map((item) => {
            const Icon = item.icon;

            return (
              <ActionCard
                key={item.href}
                title={item.title}
                description={item.description}
                href={item.href}
                icon={<Icon className="h-5 w-5" aria-hidden />}
                status={item.status}
                statusVariant={item.href === "/anti_hoax" ? "urgent" : "information"}
                actionLabel="Buka kanal"
              />
            );
          })}
        </div>
      </Section>

      <Section
        title="Berita terbaru"
        description="Ringkasan berita resmi yang dapat dibuka ke halaman detail."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {newsItems.slice(0, 2).map((news, index) => (
            <ContentCard
              key={news.id}
              title={news.title}
              description={news.summary}
              date={news.date}
              source={news.source}
              image={news.image}
              href={`/informasi/berita/${news.id}`}
              layout="list"
              status={index === 0 ? "Terbaru" : "Berita"}
              statusVariant={index === 0 ? "official" : "information"}
              priority={index === 0}
            />
          ))}
        </div>
      </Section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Section
          title="Media publik"
          description="Cuplikan foto, infografis, dan video dari kanal informasi."
          className="mb-0"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <ContentCard
              title={infographics[0].title}
              date={infographics[0].date}
              image={infographics[0].image}
              href="/informasi/infografis"
              aspect="portrait"
              status="Infografis"
              statusVariant="information"
            />
            <ContentCard
              title={photos[0].title}
              date={photos[0].date}
              image={photos[0].image}
              href="/informasi/foto"
              aspect="portrait"
              status="Foto"
              statusVariant="information"
            />
          </div>
          <div className="mt-5">
            <VideoCard {...videos[0]} />
          </div>
        </Section>

        <Section
          title="Pedoman teknis"
          description="Dokumen pendukung perlu ditautkan ke berkas resmi sebelum dibuka sebagai unduhan."
          className="mb-0"
        >
          <div className="space-y-4">
            {["Aplikasi Web versi 1.0", "Standar publikasi konten", "Pengelolaan media daerah"].map((title) => (
              <DocumentCard
                key={title}
                title={`Pedoman teknis ${title}`}
                description="Metadata tersedia pada prototipe, berkas final belum ditautkan."
                fileType="PDF"
                size="2.5 MB"
                source="Diskominfotik"
                status="Butuh tautan"
                statusVariant="draft"
                icon={<FileText className="h-5 w-5" aria-hidden />}
              />
            ))}
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
