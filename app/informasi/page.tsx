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
    description:
      "Kabar kegiatan dan kebijakan Pemerintah Provinsi Sumatera Barat.",
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
        description="Satu pintu untuk berita, pengumuman, agenda, dokumentasi, infografis, dan klarifikasi informasi Pemerintah Provinsi Sumatera Barat."
        eyebrow="Pusat informasi publik"
        metadata={
          <>
            <StatusBadge variant="information">Konten publik</StatusBadge>
            <StatusBadge variant="official">Rute resmi</StatusBadge>
          </>
        }
        title="Informasi"
      />

      <Section
        description="Kanal dikelompokkan berdasarkan kebutuhan warga, bukan berdasarkan komponen visual yang berbeda-beda."
        title="Pilih kanal informasi"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {informationRoutes.map((item) => {
            const Icon = item.icon;

            return (
              <ActionCard
                key={item.href}
                actionLabel="Buka kanal"
                description={item.description}
                href={item.href}
                icon={<Icon aria-hidden className="h-5 w-5" />}
                status={item.status}
                statusVariant={
                  item.href === "/anti_hoax" ? "urgent" : "information"
                }
                title={item.title}
              />
            );
          })}
        </div>
      </Section>

      <Section
        description="Ringkasan berita resmi yang dapat dibuka ke halaman detail."
        title="Berita terbaru"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {newsItems.slice(0, 2).map((news, index) => (
            <ContentCard
              key={news.id}
              date={news.date}
              description={news.summary}
              href={`/informasi/berita/${news.id}`}
              image={news.image}
              layout="list"
              priority={index === 0}
              source={news.source}
              status={index === 0 ? "Terbaru" : "Berita"}
              statusVariant={index === 0 ? "official" : "information"}
              title={news.title}
            />
          ))}
        </div>
      </Section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Section
          className="mb-0"
          description="Cuplikan foto, infografis, dan video dari kanal informasi."
          title="Media publik"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <ContentCard
              aspect="portrait"
              date={infographics[0].date}
              href="/informasi/infografis"
              image={infographics[0].image}
              status="Infografis"
              statusVariant="information"
              title={infographics[0].title}
            />
            <ContentCard
              aspect="portrait"
              date={photos[0].date}
              href="/informasi/foto"
              image={photos[0].image}
              status="Foto"
              statusVariant="information"
              title={photos[0].title}
            />
          </div>
          <div className="mt-5">
            <VideoCard {...videos[0]} />
          </div>
        </Section>

        <Section
          className="mb-0"
          description="Dokumen pendukung perlu ditautkan ke berkas resmi sebelum dibuka sebagai unduhan."
          title="Pedoman teknis"
        >
          <div className="space-y-4">
            {[
              "Aplikasi Web versi 1.0",
              "Standar publikasi konten",
              "Pengelolaan media daerah",
            ].map((title) => (
              <DocumentCard
                key={title}
                description="Metadata tersedia pada prototipe, berkas final belum ditautkan."
                fileType="PDF"
                icon={<FileText aria-hidden className="h-5 w-5" />}
                size="2.5 MB"
                source="Diskominfotik"
                status="Butuh tautan"
                statusVariant="draft"
                title={`Pedoman teknis ${title}`}
              />
            ))}
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
