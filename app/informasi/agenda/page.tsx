import { CalendarDays, MapPin } from "lucide-react";

import { ContentCard } from "@/components/content";
import { PageHeader, PageShell, Section, StatusBadge } from "@/components/ui";
import { agendas } from "@/config/content-data";

export default function AgendaPage() {
  return (
    <PageShell as="main">
      <PageHeader
        description="Jadwal kegiatan dan forum Pemerintah Provinsi Sumatera Barat yang dapat diikuti atau dipantau masyarakat."
        eyebrow="Kalender publik"
        metadata={
          <>
            <StatusBadge variant="information">
              {agendas.length} agenda
            </StatusBadge>
            <StatusBadge variant="official">Waktu WIB</StatusBadge>
          </>
        }
        title="Agenda"
      />

      <Section
        description="Setiap agenda menampilkan tanggal dan lokasi agar mudah dipindai di perangkat mobile."
        title="Agenda kegiatan"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {agendas.map((agenda) => (
            <ContentCard
              key={agenda.id}
              aspect="portrait"
              className="min-h-full"
              date={agenda.date}
              description={
                <>
                  <span className="mb-1 inline-flex items-center gap-1.5 font-semibold text-civic-text">
                    <MapPin aria-hidden className="h-3.5 w-3.5" />
                    {agenda.location}
                  </span>
                  <span className="block">{agenda.description}</span>
                </>
              }
              eyebrow="Kegiatan"
              image={agenda.image}
              status="Agenda"
              statusVariant="official"
              title={agenda.title}
            />
          ))}
        </div>
        <div className="mt-8 flex items-start gap-3 rounded-civic-lg border border-civic-line bg-civic-stone/70 p-4 text-sm leading-6 text-civic-textMuted">
          <CalendarDays
            aria-hidden
            className="mt-0.5 h-4 w-4 shrink-0 text-semantic-primary"
          />
          <p>
            Agenda saat ini berasal dari dataset statis. Untuk produksi, jadwal
            perlu ditarik dari kalender resmi perangkat daerah.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
