import { Images } from "lucide-react";

import { ContentCard } from "@/components/content";
import { PageHeader, PageShell, Section, StatusBadge } from "@/components/ui";
import { photos } from "@/config/content-data";

export default function PhotoPage() {
  return (
    <PageShell as="main">
      <PageHeader
        description="Dokumentasi visual kegiatan dan layanan Pemerintah Provinsi Sumatera Barat."
        eyebrow="Dokumentasi"
        metadata={
          <>
            <StatusBadge variant="information">
              {photos.length} foto
            </StatusBadge>
            <StatusBadge variant="draft">Placeholder aset</StatusBadge>
          </>
        }
        title="Galeri foto"
      />

      <Section
        description="Galeri memakai metadata yang konsisten. Ganti placeholder dengan foto resmi saat aset tersedia."
        title="Dokumentasi kegiatan"
      >
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
          {photos.map((photo) => (
            <div key={photo.id} className="mb-5 break-inside-avoid">
              <ContentCard
                aspect={photo.aspect}
                className="inline-block w-full"
                date={photo.date}
                image={photo.image}
                status="Foto"
                statusVariant="information"
                title={photo.title}
              />
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-start gap-3 rounded-civic-lg border border-civic-line bg-civic-stone/70 p-4 text-sm leading-6 text-civic-textMuted">
          <Images
            aria-hidden
            className="mt-0.5 h-4 w-4 shrink-0 text-semantic-primary"
          />
          <p>
            Aset visual masih memakai placeholder proyek. Foto resmi perlu
            diberi deskripsi alt yang spesifik sebelum publikasi.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
