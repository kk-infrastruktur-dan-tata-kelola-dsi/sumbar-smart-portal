"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  FileText,
  Search,
  UsersRound,
} from "lucide-react";

import {
  ActionCard,
  DocumentCard,
  PageHeader,
  PageShell,
  Section,
  StatusBadge,
} from "@/components/ui";

const surveyFormUrl = "https://forms.gle/AhScbDbK5g8551C59";
const manualBookUrl = "/file/SEPAKAT - Manual Book.pdf";

const periodeOptions = [
  "Bulan Lalu",
  "Periode 1 (Jan-Apr)",
  "Periode 2 (May-Aug)",
  "Periode 3 (Sep-Dec)",
  "Semester 1 (Jan-Jun)",
  "Semester 2 (Jul-Dec)",
  "Tahun Ini",
  "Tahun Lalu",
];

const nilaiData: Record<string, { nilai: string; tingkat: string; responden: string }> = {
  "Bulan Lalu": { nilai: "4.69", tingkat: "93%", responden: "1.2K" },
  "Periode 1 (Jan-Apr)": { nilai: "4.65", tingkat: "91%", responden: "4.5K" },
  "Periode 2 (May-Aug)": { nilai: "4.72", tingkat: "94%", responden: "5.1K" },
  "Periode 3 (Sep-Dec)": { nilai: "4.68", tingkat: "92%", responden: "5.4K" },
  "Semester 1 (Jan-Jun)": { nilai: "4.70", tingkat: "93%", responden: "7.8K" },
  "Semester 2 (Jul-Dec)": { nilai: "4.71", tingkat: "93%", responden: "7.2K" },
  "Tahun Ini": { nilai: "4.69", tingkat: "93%", responden: "15K" },
  "Tahun Lalu": { nilai: "4.63", tingkat: "90%", responden: "14.2K" },
};

const flowSteps = [
  "Pilih layanan yang pernah digunakan.",
  "Isi penilaian dan masukan secara jujur.",
  "Kirim survei untuk membantu evaluasi pelayanan.",
];

export function SkmServiceFlow() {
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");

  const yearlyMetric = nilaiData["Tahun Ini"];
  const selectedMetric = useMemo(
    () => (selectedPeriode ? nilaiData[selectedPeriode] : null),
    [selectedPeriode],
  );

  function handleShowResult() {
    if (!selectedPeriode) {
      setShowResult(false);
      setError("Pilih periode terlebih dahulu untuk melihat nilai SKM.");
      return;
    }

    setError("");
    setShowResult(true);
  }

  return (
    <PageShell as="main">
      <PageHeader
        eyebrow="Layanan publik"
        title="Survey Kepuasan Masyarakat"
        description="SKM membantu pemerintah daerah membaca kualitas pelayanan publik berdasarkan masukan warga. Data pada halaman ini masih bersifat statis sampai terhubung ke sumber resmi."
        metadata={
          <>
            <StatusBadge variant="official">SEPAKAT</StatusBadge>
            <StatusBadge variant="draft">Data statis</StatusBadge>
          </>
        }
        actions={
          <Link
            href={surveyFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="civic-focus-ring inline-flex items-center justify-center gap-2 rounded-civic-lg bg-brand-gold-500 px-5 py-3 text-sm font-bold text-white shadow-civic-sm transition duration-civic hover:bg-brand-gold-600"
          >
            Isi survei
            <ExternalLink className="h-4 w-4" aria-hidden />
          </Link>
        }
      />

      <Section
        title="Ringkasan tahun berjalan"
        description="Angka ditampilkan sebagai ringkasan mock/static saat ini. Jangan pakai sebagai publikasi final sebelum integrasi data resmi."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Rata-rata kepuasan", value: yearlyMetric.nilai, icon: ClipboardCheck },
            { label: "Tingkat kepuasan", value: yearlyMetric.tingkat, icon: BarChart3 },
            { label: "Total responden", value: yearlyMetric.responden, icon: UsersRound },
          ].map((metric) => {
            const Icon = metric.icon;

            return (
              <article
                key={metric.label}
                className="rounded-civic-xl border border-civic-line bg-civic-cloud p-6 shadow-civic-xs"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-civic-lg bg-brand-gold-100 text-brand-marawa-700">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <p className="civic-tabular text-4xl font-extrabold leading-none text-civic-text">
                  {metric.value}
                </p>
                <p className="mt-3 text-sm font-semibold text-civic-text">
                  {metric.label}
                </p>
              </article>
            );
          })}
        </div>
      </Section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <Section
          title="Alur pengisian"
          description="Warga dapat mengisi survei melalui formulir resmi dan membaca panduan sebelum mengirim masukan."
          className="mb-0"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {flowSteps.map((step, index) => (
              <article
                key={step}
                className="rounded-civic-xl border border-civic-line bg-civic-cloud p-5 shadow-civic-xs"
              >
                <span className="civic-tabular text-sm font-extrabold text-semantic-primary">
                  0{index + 1}
                </span>
                <p className="mt-3 text-sm font-semibold leading-6 text-civic-text">
                  {step}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <ActionCard
              title="Isi Survey Kepuasan Masyarakat"
              description="Buka formulir SKM untuk memberi penilaian layanan yang pernah digunakan."
              href={surveyFormUrl}
              icon={<ClipboardCheck className="h-5 w-5" aria-hidden />}
              status="Formulir"
              statusVariant="official"
              actionLabel="Buka formulir"
            />
            <DocumentCard
              title="Manual Book SEPAKAT"
              description="Panduan penggunaan layanan SKM dan pembacaan hasil survei."
              href={manualBookUrl}
              fileType="PDF"
              size="993 KB"
              source="Diskominfotik"
              icon={<BookOpen className="h-5 w-5" aria-hidden />}
              actionLabel="Buka PDF"
            />
          </div>
        </Section>

        <Section
          title="Cek nilai SKM"
          description="Pilih periode untuk melihat ringkasan nilai pada dataset saat ini."
          className="mb-0"
        >
          <div className="rounded-civic-xl border border-civic-line bg-civic-cloud p-5 shadow-civic-xs">
            <label
              htmlFor="skm-period"
              className="mb-2 block text-sm font-semibold text-civic-text"
            >
              Periode penilaian
            </label>
            <select
              id="skm-period"
              value={selectedPeriode}
              onChange={(event) => {
                setSelectedPeriode(event.target.value);
                setShowResult(false);
                setError("");
              }}
              className="civic-focus-ring w-full rounded-civic-lg border border-civic-line bg-civic-cloud px-3 py-3 text-sm font-semibold text-civic-text"
              aria-describedby={error ? "skm-period-error" : undefined}
            >
              <option value="">Pilih periode</option>
              {periodeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {error && (
              <p id="skm-period-error" className="mt-2 text-sm font-semibold text-semantic-danger">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleShowResult}
              className="civic-focus-ring mt-4 inline-flex w-full items-center justify-center gap-2 rounded-civic-lg border border-brand-gold-300 bg-brand-gold-50 px-4 py-3 text-sm font-bold text-brand-gold-700 transition duration-civic hover:bg-brand-gold-100"
            >
              <Search className="h-4 w-4" aria-hidden />
              Lihat nilai
            </button>

            {showResult && selectedMetric && (
              <div
                role="status"
                className="mt-5 rounded-civic-xl border border-brand-gold-200 bg-brand-gold-50 p-5"
              >
                <p className="text-sm font-semibold text-civic-textMuted">
                  Nilai SKM {selectedPeriode}
                </p>
                <p className="civic-tabular mt-2 text-5xl font-extrabold leading-none text-brand-gold-700">
                  {selectedMetric.nilai}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-civic-textSubtle">Kepuasan</p>
                    <p className="civic-tabular text-xl font-bold text-civic-text">
                      {selectedMetric.tingkat}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-civic-textSubtle">Responden</p>
                    <p className="civic-tabular text-xl font-bold text-civic-text">
                      {selectedMetric.responden}
                    </p>
                  </div>
                </div>
                <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-civic-textMuted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-semantic-success" aria-hidden />
                  Kategori sementara: Sangat Baik.
                </p>
              </div>
            )}
          </div>
        </Section>
      </div>

      <Section title="Catatan data" surface="stone">
        <div className="flex items-start gap-3 text-sm leading-6 text-civic-textMuted">
          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-semantic-primary" aria-hidden />
          <p>
            Nilai SKM pada halaman ini masih mengikuti data statis proyek.
            Integrasi API, periode resmi, dan unit layanan perlu ditambahkan
            sebelum digunakan sebagai publikasi kinerja pelayanan.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
