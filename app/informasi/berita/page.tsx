import { Newspaper } from "lucide-react";

import { ContentCard } from "@/components/content";
import {
  EmptyState,
  PageHeader,
  PageShell,
  Section,
  StatusBadge,
} from "@/components/ui";
import { newsItems } from "@/config/content-data";

export default function BeritaPage() {
  return (
    <PageShell as="main">
      <PageHeader
        description="Berita resmi dan pembaruan kegiatan Pemerintah Provinsi Sumatera Barat."
        eyebrow="Kabar pemerintah"
        metadata={
          <>
            <StatusBadge variant="information">
              {newsItems.length} berita
            </StatusBadge>
            <StatusBadge variant="official">Diperbarui berkala</StatusBadge>
          </>
        }
        title="Berita"
      />

      <Section
        description="Setiap kartu menampilkan sumber dan waktu publikasi agar warga dapat memindai informasi dengan cepat."
        title="Berita terbaru"
      >
        {newsItems.length === 0 ? (
          <EmptyState
            description="Berita resmi akan ditampilkan setelah data tersedia."
            icon={<Newspaper aria-hidden className="h-7 w-7" />}
            title="Belum ada berita"
            tone="information"
          />
        ) : (
          <div className="space-y-5">
            {newsItems.map((news, index) => (
              <ContentCard
                key={news.id}
                date={news.date}
                description={news.summary}
                href={`/informasi/berita/${news.id}`}
                image={news.image}
                imageAlt={news.title}
                layout="list"
                priority={index === 0}
                source={news.source}
                status={index === 0 ? "Terbaru" : "Berita"}
                statusVariant={index === 0 ? "official" : "information"}
                title={news.title}
              />
            ))}
          </div>
        )}
      </Section>
    </PageShell>
  );
}
