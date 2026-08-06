import { CalendarDays, MapPin } from "lucide-react";

import { ContentCard } from "@/components/content";
import { PageHeader, PageShell, Section, StatusBadge } from "@/components/ui";
import { agendas } from "@/config/content-data";

export default function AgendaPage() {
  return (
    <PageShell as="main">
      <PageHeader
        eyebrow="Kalender publik"
        title="Agenda"
        description="Jadwal kegiatan dan forum Pemerintah Provinsi Sumatera Barat yang dapat diikuti atau dipantau masyarakat."
        metadata={
          <>
            <StatusBadge variant="information">{agendas.length} agenda</StatusBadge>
            <StatusBadge variant="official">Waktu WIB</StatusBadge>
          </>
        }
      />

      <Section
        title="Agenda kegiatan"
        description="Setiap agenda menampilkan tanggal dan lokasi agar mudah dipindai di perangkat mobile."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {agendas.map((agenda) => (
            <ContentCard
              key={agenda.id}
              title={agenda.title}
              description={
                <>
                  <span className="mb-1 inline-flex items-center gap-1.5 font-semibold text-civic-text">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {agenda.location}
                  </span>
                  <span className="block">{agenda.description}</span>
                </>
              }
              date={agenda.date}
              image={agenda.image}
              aspect="portrait"
              status="Agenda"
              statusVariant="official"
              eyebrow="Kegiatan"
              className="min-h-full"
            />
          ))}
        </div>
        <div className="mt-8 flex items-start gap-3 rounded-civic-lg border border-civic-line bg-civic-stone/70 p-4 text-sm leading-6 text-civic-textMuted">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-semantic-primary" aria-hidden />
          <p>
            Agenda saat ini berasal dari dataset statis. Untuk produksi, jadwal
            perlu ditarik dari kalender resmi perangkat daerah.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
