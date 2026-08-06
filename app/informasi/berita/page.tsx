import { Newspaper } from "lucide-react";

import { ContentCard } from "@/components/content";
import { EmptyState, PageHeader, PageShell, Section, StatusBadge } from "@/components/ui";
import { newsItems } from "@/config/content-data";

export default function BeritaPage() {
  return (
    <PageShell as="main">
      <PageHeader
        eyebrow="Kabar pemerintah"
        title="Berita"
        description="Berita resmi dan pembaruan kegiatan Pemerintah Provinsi Sumatera Barat."
        metadata={
          <>
            <StatusBadge variant="information">{newsItems.length} berita</StatusBadge>
            <StatusBadge variant="official">Diperbarui berkala</StatusBadge>
          </>
        }
      />

      <Section
        title="Berita terbaru"
        description="Setiap kartu menampilkan sumber dan waktu publikasi agar warga dapat memindai informasi dengan cepat."
      >
        {newsItems.length === 0 ? (
          <EmptyState
            icon={<Newspaper className="h-7 w-7" aria-hidden />}
            title="Belum ada berita"
            description="Berita resmi akan ditampilkan setelah data tersedia."
            tone="information"
          />
        ) : (
          <div className="space-y-5">
            {newsItems.map((news, index) => (
              <ContentCard
                key={news.id}
                title={news.title}
                description={news.summary}
                date={news.date}
                source={news.source}
                image={news.image}
                imageAlt={news.title}
                href={`/informasi/berita/${news.id}`}
                layout="list"
                status={index === 0 ? "Terbaru" : "Berita"}
                statusVariant={index === 0 ? "official" : "information"}
                priority={index === 0}
              />
            ))}
          </div>
        )}
      </Section>
    </PageShell>
  );
}
