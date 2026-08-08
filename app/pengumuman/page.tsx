import { Bell, FileText } from "lucide-react";

import { ContentCard } from "@/components/content";
import {
  EmptyState,
  PageHeader,
  PageShell,
  Section,
  StatusBadge,
} from "@/components/ui";
import { getPengumuman } from "@/utils/pengumuman-queries";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function getOfficialFileUrl(fileUrl?: string | null) {
  if (!fileUrl || fileUrl.includes("example.com")) {
    return undefined;
  }

  return fileUrl;
}

export default async function PengumumanPage() {
  const pengumumanData = await getPengumuman();
  const importantCount = pengumumanData.filter(
    (item) => item.status.toLowerCase() === "penting",
  ).length;

  return (
    <PageShell as="main">
      <PageHeader
        description="Kumpulan pengumuman Pemerintah Provinsi Sumatera Barat dengan tanggal, status, dan catatan ketersediaan dokumen."
        eyebrow="Informasi resmi"
        metadata={
          <>
            <StatusBadge variant="official">
              {pengumumanData.length} pengumuman
            </StatusBadge>
            <StatusBadge variant={importantCount > 0 ? "urgent" : "neutral"}>
              {importantCount} penting
            </StatusBadge>
          </>
        }
        title="Pengumuman"
      />

      <Section
        description="Dokumen dengan tautan contoh tidak dibuat sebagai unduhan aktif sampai sumber resmi tersedia."
        title="Daftar pengumuman resmi"
      >
        {pengumumanData.length === 0 ? (
          <EmptyState
            description="Pengumuman resmi akan ditampilkan setelah data tersedia."
            icon={<Bell aria-hidden className="h-7 w-7" />}
            title="Belum ada pengumuman"
            tone="information"
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {pengumumanData.map((item) => {
              const isImportant = item.status.toLowerCase() === "penting";
              const officialFileUrl = getOfficialFileUrl(item.file_url);

              return (
                <ContentCard
                  key={item.id}
                  actionLabel="Lihat dokumen"
                  date={formatDate(item.created_at)}
                  description={item.deskripsi}
                  eyebrow={isImportant ? "Perlu perhatian" : "Informasi"}
                  href={officialFileUrl}
                  source="Pemprov Sumbar"
                  status={isImportant ? "Penting" : "Info"}
                  statusVariant={isImportant ? "urgent" : "information"}
                  title={item.judul}
                />
              );
            })}
          </div>
        )}

        <div className="mt-8 flex items-start gap-3 rounded-civic-lg border border-civic-line bg-civic-stone/70 p-4 text-sm leading-6 text-civic-textMuted">
          <FileText
            aria-hidden
            className="mt-0.5 h-4 w-4 shrink-0 text-semantic-primary"
          />
          <p>
            Beberapa item di dataset saat ini masih memakai URL contoh. Tautan
            tersebut perlu diganti dengan dokumen resmi sebelum fitur unduhan
            dibuka untuk warga.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
