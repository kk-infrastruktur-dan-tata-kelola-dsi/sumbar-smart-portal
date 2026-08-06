import { Bell, FileText } from "lucide-react";

import { ContentCard } from "@/components/content";
import { EmptyState, PageHeader, PageShell, Section, StatusBadge } from "@/components/ui";
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
        eyebrow="Informasi resmi"
        title="Pengumuman"
        description="Kumpulan pengumuman Pemerintah Provinsi Sumatera Barat dengan tanggal, status, dan catatan ketersediaan dokumen."
        metadata={
          <>
            <StatusBadge variant="official">{pengumumanData.length} pengumuman</StatusBadge>
            <StatusBadge variant={importantCount > 0 ? "urgent" : "neutral"}>
              {importantCount} penting
            </StatusBadge>
          </>
        }
      />

      <Section
        title="Daftar pengumuman resmi"
        description="Dokumen dengan tautan contoh tidak dibuat sebagai unduhan aktif sampai sumber resmi tersedia."
      >
        {pengumumanData.length === 0 ? (
          <EmptyState
            icon={<Bell className="h-7 w-7" aria-hidden />}
            title="Belum ada pengumuman"
            description="Pengumuman resmi akan ditampilkan setelah data tersedia."
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
                  title={item.judul}
                  description={item.deskripsi}
                  date={formatDate(item.created_at)}
                  source="Pemprov Sumbar"
                  eyebrow={isImportant ? "Perlu perhatian" : "Informasi"}
                  status={isImportant ? "Penting" : "Info"}
                  statusVariant={isImportant ? "urgent" : "information"}
                  href={officialFileUrl}
                  actionLabel="Lihat dokumen"
                />
              );
            })}
          </div>
        )}

        <div className="mt-8 flex items-start gap-3 rounded-civic-lg border border-civic-line bg-civic-stone/70 p-4 text-sm leading-6 text-civic-textMuted">
          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-semantic-primary" aria-hidden />
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
