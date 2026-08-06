import { Video } from "lucide-react";

import { VideoCard } from "@/components/content";
import { PageHeader, PageShell, Section, StatusBadge } from "@/components/ui";
import { videos } from "@/config/content-data";

export default function VideoPage() {
  return (
    <PageShell as="main">
      <PageHeader
        eyebrow="Media publik"
        title="Video"
        description="Dokumentasi video kegiatan, program, dan informasi Pemerintah Provinsi Sumatera Barat."
        metadata={
          <>
            <StatusBadge variant="information">{videos.length} video</StatusBadge>
            <StatusBadge variant="official">Embed YouTube</StatusBadge>
          </>
        }
      />

      <Section
        title="Video kegiatan"
        description="Video disajikan dalam kartu yang konsisten dengan metadata tanggal dan sumber."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
        <div className="mt-8 flex items-start gap-3 rounded-civic-lg border border-civic-line bg-civic-stone/70 p-4 text-sm leading-6 text-civic-textMuted">
          <Video className="mt-0.5 h-4 w-4 shrink-0 text-semantic-primary" aria-hidden />
          <p>
            Pastikan ID video berasal dari kanal resmi pemerintah sebelum
            halaman ini dipakai untuk produksi.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
