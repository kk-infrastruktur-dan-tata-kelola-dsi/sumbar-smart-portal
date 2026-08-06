import { BarChart3 } from "lucide-react";

import { ContentCard } from "@/components/content";
import { PageHeader, PageShell, Section, StatusBadge } from "@/components/ui";
import { infographics } from "@/config/content-data";

export default function InfografisPage() {
  return (
    <PageShell as="main">
      <PageHeader
        eyebrow="Visual data"
        title="Infografis"
        description="Ringkasan visual dan statistik publik Pemerintah Provinsi Sumatera Barat."
        metadata={
          <>
            <StatusBadge variant="information">{infographics.length} infografis</StatusBadge>
            <StatusBadge variant="draft">Aset perlu final</StatusBadge>
          </>
        }
      />

      <Section
        title="Daftar infografis"
        description="Infografis memakai struktur poster agar judul, tanggal, dan status tetap konsisten."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {infographics.map((item) => (
            <ContentCard
              key={item.id}
              title={item.title}
              date={item.date}
              image={item.image}
              aspect="portrait"
              status="Infografis"
              statusVariant="information"
            />
          ))}
        </div>
        <div className="mt-8 flex items-start gap-3 rounded-civic-lg border border-civic-line bg-civic-stone/70 p-4 text-sm leading-6 text-civic-textMuted">
          <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-semantic-primary" aria-hidden />
          <p>
            Data visual perlu menyertakan sumber angka pada aset final. Hindari
            infografis tanpa rujukan data.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
