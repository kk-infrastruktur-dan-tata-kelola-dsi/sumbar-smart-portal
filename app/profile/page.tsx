import Image from "next/image";
import { Eye, Megaphone, Target, Users2 } from "lucide-react";

import { ImmersiveMedia } from "@/components/landing";
import { PageHeader, PageShell, Section, StatusBadge } from "@/components/ui";
import struktur from "@/public/images/struktur.png";

const vision =
  "Terwujudnya Masyarakat Sumatera Barat yang Agamis, Berkualitas, Berdaulat, dan Sejahtera";

const missionPoints = [
  "Meningkatkan kualitas sumber daya manusia yang sehat, berpendidikan, terampil, dan saling menghormati.",
  "Meningkatkan tata kelola sosial kemasyarakatan berdasarkan falsafah Adat Basandi Syarak, Syarak Basandi Kitabullah.",
  "Mengembangkan nilai tambah produk dan jasa melalui inovasi, pertumbuhan, dan perkembangan.",
  "Meningkatkan usaha perekonomian, industri kecil menengah, dan ekonomi berbasis digital.",
  "Meningkatkan kualitas dan daya saing masyarakat yang mandiri dan kompetitif.",
  "Meningkatkan kemandirian energi terbarukan dan efisiensi penggunaan sumber daya.",
  "Mewujudkan tata kelola pemerintahan dan pelayanan publik yang bersih, akuntabel, dan berkelanjutan.",
];

export default function ProfilePage() {
  return (
    <PageShell as="main">
      <PageHeader
        eyebrow="Profil daerah"
        title="Visi dan misi"
        description="Arah pembangunan Pemerintah Provinsi Sumatera Barat disajikan dalam struktur yang mudah dibaca dan ditelusuri."
        metadata={
          <>
            <StatusBadge variant="official">Dokumen profil</StatusBadge>
            <StatusBadge variant="information">Struktur organisasi</StatusBadge>
          </>
        }
      />

      <section
        id="visi-misi"
        className="sumbar-grain relative left-1/2 min-h-[72vh] w-screen -translate-x-1/2 overflow-hidden py-16 text-civic-inverse md:py-20"
      >
        <ImmersiveMedia
          image="ngarai-sianok"
          imgClassName="max-md:[object-position:48%_center] md:[object-position:center_center]"
          priority
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-civic-footer/94 via-civic-footer/72 to-civic-footer/14" />
        <div className="relative z-10 mx-auto max-w-civic-wide px-6 sm:px-8 lg:px-10">
          <div className="max-w-civic-prose landing-reveal">
            <h2 className="text-2xl font-bold leading-tight text-civic-inverse md:text-3xl">
              Arah pembangunan
            </h2>
            <p className="mt-2 text-sm leading-6 text-civic-inverse/78 md:text-base">
              Visi dan misi ditampilkan tanpa efek dekoratif agar tetap terbaca sebagai dokumen pemerintah.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <article className="border-l border-brand-gold-300/70 pl-5 landing-reveal">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-civic-lg bg-civic-inverse/12 text-brand-gold-200">
                <Eye className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="text-2xl font-bold text-civic-inverse">Visi</h3>
              <p className="mt-4 text-lg font-semibold leading-8 text-civic-inverse">
                “{vision}”
              </p>
            </article>

            <article className="border-l border-brand-rantau-200/70 pl-5 landing-reveal">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-civic-lg bg-civic-inverse/12 text-brand-rantau-100">
                <Target className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="text-2xl font-bold text-civic-inverse">Misi</h3>
              <ol className="mt-5 space-y-3">
                {missionPoints.map((point, index) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-civic-inverse/78">
                    <span className="civic-tabular mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-civic-inverse/12 text-xs font-extrabold text-brand-gold-100">
                      {index + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </div>
      </section>

      <Section
        id="struktur"
        title="Struktur organisasi"
        description="Bagan struktur organisasi digunakan sebagai referensi visual. Versi teks dan tautan OPD dapat dilengkapi pada tahap data berikutnya."
      >
        <div className="rounded-civic-xl border border-civic-line bg-civic-cloud p-5 shadow-civic-xs">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-civic-textMuted">
            <Users2 className="h-4 w-4 text-semantic-primary" aria-hidden />
            <span>Pemerintah Provinsi Sumatera Barat</span>
            <Megaphone className="h-4 w-4 text-semantic-primary" aria-hidden />
            <span>Bagan organisasi</span>
          </div>
          <Image
            src={struktur}
            alt="Struktur Organisasi Pemerintah Provinsi Sumatera Barat"
            width={1200}
            height={800}
            priority
            className="h-auto w-full rounded-civic-lg border border-civic-line"
          />
        </div>
      </Section>
    </PageShell>
  );
}
