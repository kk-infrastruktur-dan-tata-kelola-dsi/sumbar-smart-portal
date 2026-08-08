/* eslint-disable */
"use client";

import React from "react";
import { Select, SelectItem } from "@heroui/select";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart3,
  CalendarDays,
  Database,
  FileText,
  Landmark,
  PieChart,
  TrendingUp,
  WalletCards,
} from "lucide-react";

import {
  DocumentCard,
  PageHeader,
  PageShell,
  Section,
  StatusBadge,
} from "@/components/ui";

type Statistic = {
  value: string;
  label: string;
  description: string;
};

type Report = {
  title: string;
  size: string;
  date: string;
  year: string;
};

type Expenditure = {
  category: string;
  percentage: number;
  label: string;
};

const years = ["2025", "2024", "2023", "2022", "2021"];

const statisticsByYear: Record<string, Statistic[]> = {
  "2025": [
    {
      value: "12,5 T",
      label: "Per April 2025",
      description: "Anggaran Pendapatan & Belanja Daerah",
    },
    {
      value: "35,8%",
      label: "Realisasi hingga Q1 2025",
      description: "Tingkat Realisasi",
    },
    {
      value: "WTP",
      label: "Target Opini BPK 2025",
      description: "Wajar Tanpa Pengecualian",
    },
  ],
  "2024": [
    {
      value: "11,8 T",
      label: "Tahun Anggaran 2024",
      description: "Anggaran Pendapatan & Belanja Daerah",
    },
    {
      value: "94,2%",
      label: "Realisasi 2024",
      description: "Tingkat Realisasi",
    },
    {
      value: "WTP",
      label: "Opini BPK 2024",
      description: "Wajar Tanpa Pengecualian",
    },
  ],
  "2023": [
    {
      value: "10,9 T",
      label: "Tahun Anggaran 2023",
      description: "Anggaran Pendapatan & Belanja Daerah",
    },
    {
      value: "92,5%",
      label: "Realisasi 2023",
      description: "Tingkat Realisasi",
    },
    {
      value: "WTP",
      label: "Opini BPK 2023",
      description: "Wajar Tanpa Pengecualian",
    },
  ],
  "2022": [
    {
      value: "10,2 T",
      label: "Tahun Anggaran 2022",
      description: "Anggaran Pendapatan & Belanja Daerah",
    },
    {
      value: "91,3%",
      label: "Realisasi 2022",
      description: "Tingkat Realisasi",
    },
    {
      value: "WTP",
      label: "Opini BPK 2022",
      description: "Wajar Tanpa Pengecualian",
    },
  ],
  "2021": [
    {
      value: "9,5 T",
      label: "Tahun Anggaran 2021",
      description: "Anggaran Pendapatan & Belanja Daerah",
    },
    {
      value: "89,7%",
      label: "Realisasi 2021",
      description: "Tingkat Realisasi",
    },
    {
      value: "WTP",
      label: "Opini BPK 2021",
      description: "Wajar Tanpa Pengecualian",
    },
  ],
};

const allReports: Report[] = [
  {
    title: "APBD Tahun Anggaran 2025",
    size: "4.8 MB",
    date: "1 Nov 2024",
    year: "2025",
  },
  {
    title: "Rencana Kerja Anggaran (RKA) 2025",
    size: "5.2 MB",
    date: "15 Oct 2024",
    year: "2025",
  },
  {
    title: "Laporan Realisasi Anggaran Q1 2025",
    size: "3.1 MB",
    date: "15 Apr 2025",
    year: "2025",
  },
  {
    title: "Laporan Keuangan Pemprov 2024 (Audited)",
    size: "3.5 MB",
    date: "28 Jan 2025",
    year: "2024",
  },
  {
    title: "APBD Tahun Anggaran 2024",
    size: "4.3 MB",
    date: "7 Nov 2023",
    year: "2024",
  },
  {
    title: "Laporan Realisasi Anggaran 2024",
    size: "3.2 MB",
    date: "15 Jan 2025",
    year: "2024",
  },
  {
    title: "Neraca Daerah 2024",
    size: "2.8 MB",
    date: "15 Jan 2025",
    year: "2024",
  },
  {
    title: "Catatan Atas Laporan Keuangan 2024",
    size: "4.1 MB",
    date: "28 Jan 2025",
    year: "2024",
  },
  {
    title: "Laporan Keuangan Pemprov 2023 (Audited)",
    size: "3.4 MB",
    date: "15 Feb 2024",
    year: "2023",
  },
  {
    title: "APBD Tahun Anggaran 2023",
    size: "4.0 MB",
    date: "10 Nov 2022",
    year: "2023",
  },
  {
    title: "Laporan Realisasi Anggaran 2023",
    size: "3.0 MB",
    date: "20 Jan 2024",
    year: "2023",
  },
  {
    title: "Neraca Daerah 2023",
    size: "2.6 MB",
    date: "20 Jan 2024",
    year: "2023",
  },
  {
    title: "Laporan Keuangan Pemprov 2022 (Audited)",
    size: "3.3 MB",
    date: "10 Feb 2023",
    year: "2022",
  },
  {
    title: "APBD Tahun Anggaran 2022",
    size: "3.9 MB",
    date: "5 Nov 2021",
    year: "2022",
  },
  {
    title: "Laporan Realisasi Anggaran 2022",
    size: "2.9 MB",
    date: "15 Jan 2023",
    year: "2022",
  },
  {
    title: "Laporan Keuangan Pemprov 2021 (Audited)",
    size: "3.1 MB",
    date: "5 Feb 2022",
    year: "2021",
  },
  {
    title: "APBD Tahun Anggaran 2021",
    size: "3.7 MB",
    date: "1 Nov 2020",
    year: "2021",
  },
  {
    title: "Laporan Realisasi Anggaran 2021",
    size: "2.7 MB",
    date: "10 Jan 2022",
    year: "2021",
  },
];

const expendituresByYear: Record<string, Expenditure[]> = {
  "2025": [
    {
      category: "Belanja Pegawai",
      percentage: 45,
      label: "45% dari total belanja",
    },
    {
      category: "Barang & Jasa",
      percentage: 28,
      label: "28% dari total belanja",
    },
    {
      category: "Belanja Modal",
      percentage: 20,
      label: "20% dari total belanja",
    },
    {
      category: "Belanja Lainnya",
      percentage: 7,
      label: "7% dari total belanja",
    },
  ],
  "2024": [
    {
      category: "Belanja Pegawai",
      percentage: 72,
      label: "72% dari total belanja",
    },
    {
      category: "Barang & Jasa",
      percentage: 83,
      label: "83% dari total belanja",
    },
    {
      category: "Belanja Modal",
      percentage: 33,
      label: "33% dari total belanja",
    },
    {
      category: "Belanja Lainnya",
      percentage: 7,
      label: "7% dari total belanja",
    },
  ],
  "2023": [
    {
      category: "Belanja Pegawai",
      percentage: 70,
      label: "70% dari total belanja",
    },
    {
      category: "Barang & Jasa",
      percentage: 80,
      label: "80% dari total belanja",
    },
    {
      category: "Belanja Modal",
      percentage: 30,
      label: "30% dari total belanja",
    },
    {
      category: "Belanja Lainnya",
      percentage: 8,
      label: "8% dari total belanja",
    },
  ],
  "2022": [
    {
      category: "Belanja Pegawai",
      percentage: 68,
      label: "68% dari total belanja",
    },
    {
      category: "Barang & Jasa",
      percentage: 78,
      label: "78% dari total belanja",
    },
    {
      category: "Belanja Modal",
      percentage: 28,
      label: "28% dari total belanja",
    },
    {
      category: "Belanja Lainnya",
      percentage: 9,
      label: "9% dari total belanja",
    },
  ],
  "2021": [
    {
      category: "Belanja Pegawai",
      percentage: 65,
      label: "65% dari total belanja",
    },
    {
      category: "Barang & Jasa",
      percentage: 75,
      label: "75% dari total belanja",
    },
    {
      category: "Belanja Modal",
      percentage: 25,
      label: "25% dari total belanja",
    },
    {
      category: "Belanja Lainnya",
      percentage: 10,
      label: "10% dari total belanja",
    },
  ],
};

const trendData = [
  { year: "2021", anggaran: 9.5, realisasi: 8.5 },
  { year: "2022", anggaran: 10.2, realisasi: 9.3 },
  { year: "2023", anggaran: 10.9, realisasi: 10.1 },
  { year: "2024", anggaran: 11.8, realisasi: 11.1 },
  { year: "2025", anggaran: 12.5, realisasi: 4.5 },
];

const chartColors = {
  grid: "var(--color-civic-line)",
  budget: "var(--color-civic-info)",
  realization: "var(--color-civic-success)",
  expenditure: "var(--color-civic-primary)",
  tooltipBorder: "var(--color-civic-line)",
  tick: "var(--color-civic-text-muted)",
};

const metricIcons = [WalletCards, TrendingUp, Landmark];

function SourceNote() {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-civic-lg border border-civic-line bg-civic-stone/70 p-4 text-sm leading-6 text-civic-textMuted">
      <Database
        aria-hidden
        className="mt-0.5 h-4 w-4 shrink-0 text-semantic-primary"
      />
      <p>
        Data pada halaman ini berasal dari dataset statis proyek saat ini. Untuk
        produksi, tautkan angka dan dokumen ke sumber resmi perangkat daerah
        sebelum dipublikasikan sebagai informasi final.
      </p>
    </div>
  );
}

function ChartHydrationFrame() {
  return (
    <div className="flex h-full min-h-72 items-center justify-center rounded-civic-lg border border-dashed border-civic-line bg-civic-stone/60 text-sm font-semibold text-civic-textMuted">
      Menyiapkan grafik
    </div>
  );
}

export default function KeuanganDaerahPage() {
  const [selectedYear, setSelectedYear] = React.useState("2025");
  const [chartsReady, setChartsReady] = React.useState(false);

  React.useEffect(() => {
    setChartsReady(true);
  }, []);

  const statisticCards =
    statisticsByYear[selectedYear] ?? statisticsByYear["2025"];
  const reports = allReports.filter((report) => report.year === selectedYear);
  const expenditures =
    expendituresByYear[selectedYear] ?? expendituresByYear["2025"];
  const expendituresChart = expenditures.map((item) => ({
    name: item.category,
    nilai: item.percentage,
  }));

  return (
    <PageShell>
      <PageHeader
        actions={
          <div className="min-w-44">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-civic-textMuted">
              <CalendarDays aria-hidden className="h-4 w-4" />
              Tahun anggaran
            </label>
            <Select
              aria-label="Pilih tahun anggaran"
              classNames={{
                trigger:
                  "rounded-civic-lg border border-civic-line bg-civic-cloud shadow-civic-xs data-[hover=true]:border-brand-rantau-300 data-[hover=true]:bg-brand-gold-50",
                value: "font-semibold text-civic-text",
              }}
              selectedKeys={[selectedYear]}
              size="sm"
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0]?.toString();

                if (selected) {
                  setSelectedYear(selected);
                }
              }}
            >
              {years.map((year) => (
                <SelectItem key={year}>{year}</SelectItem>
              ))}
            </Select>
          </div>
        }
        description="Informasi Pengelolaan Keuangan Daerah Provinsi Sumatera Barat disusun untuk membantu warga membaca ringkasan APBD, realisasi, opini audit, dan dokumen pendukung per tahun anggaran."
        eyebrow="Transparansi daerah"
        metadata={
          <>
            <StatusBadge variant="information">IPKD Sumatera Barat</StatusBadge>
            <StatusBadge variant="draft">
              Dokumen perlu sumber final
            </StatusBadge>
          </>
        }
        title="Keuangan Daerah"
      />

      <Section
        description="Angka ditampilkan dengan gaya tabular agar mudah dipindai dan dibandingkan antarperiode."
        eyebrow={`Ringkasan ${selectedYear}`}
        title="Indikator utama"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {statisticCards.map((stat, index) => {
            const Icon = metricIcons[index] ?? WalletCards;

            return (
              <article
                key={stat.description}
                className="rounded-civic-xl border border-civic-line bg-civic-cloud p-6 shadow-civic-xs"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-civic-lg bg-brand-gold-100 text-brand-marawa-700">
                    <Icon aria-hidden className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-civic-textSubtle">
                    {selectedYear}
                  </span>
                </div>
                <p className="civic-tabular text-4xl font-extrabold leading-none text-civic-text">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm font-semibold text-civic-text">
                  {stat.label}
                </p>
                <p className="mt-1 text-sm leading-6 text-civic-textMuted">
                  {stat.description}
                </p>
              </article>
            );
          })}
        </div>
      </Section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)]">
        <Section
          className="mb-0"
          description="Daftar ini mengikuti data dokumen yang sudah ada di proyek. Item yang belum memiliki URL tidak dibuat seolah-olah dapat diunduh."
          eyebrow="Dokumen publik"
          title={`Laporan tahun ${selectedYear}`}
        >
          <div className="space-y-4">
            {reports.map((report) => (
              <DocumentCard
                key={`${report.year}-${report.title}`}
                date={report.date}
                description="Metadata dokumen tersedia, tetapi berkas final belum ditautkan di aplikasi."
                fileType="PDF"
                icon={<FileText aria-hidden className="h-5 w-5" />}
                size={report.size}
                source="Dataset proyek"
                status="Butuh tautan resmi"
                statusVariant="draft"
                title={report.title}
              />
            ))}
          </div>
        </Section>

        <Section
          className="mb-0"
          description="Grafik batang memakai aksen emas sebagai penanda data keuangan resmi, bukan warna peringatan."
          eyebrow="Komposisi belanja"
          title={`Realisasi ${selectedYear}`}
        >
          <div className="rounded-civic-xl border border-civic-line bg-civic-cloud p-5 shadow-civic-xs">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-civic-text">
                  Persentase per kategori
                </p>
                <p className="text-xs text-civic-textSubtle">
                  Satuan dalam persen
                </p>
              </div>
              <PieChart aria-hidden className="h-5 w-5 text-semantic-primary" />
            </div>
            <div className="h-80">
              {chartsReady ? (
                <ResponsiveContainer height="100%" width="100%">
                  <BarChart
                    data={expendituresChart}
                    margin={{ top: 12, right: 8, left: -12, bottom: 16 }}
                  >
                    <CartesianGrid
                      stroke={chartColors.grid}
                      strokeDasharray="3 3"
                    />
                    <XAxis
                      dataKey="name"
                      interval={0}
                      tick={{ fontSize: 11, fill: chartColors.tick }}
                      tickMargin={10}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: chartColors.tick }}
                      unit="%"
                    />
                    <Tooltip
                      contentStyle={{
                        borderColor: chartColors.tooltipBorder,
                        borderRadius: 8,
                        boxShadow: "0 16px 40px rgba(53, 43, 27, 0.12)",
                      }}
                      cursor={{ fill: "rgba(183, 122, 11, 0.08)" }}
                      formatter={(value) => [`${Number(value)}%`, "Realisasi"]}
                    />
                    <Bar
                      dataKey="nilai"
                      fill={chartColors.expenditure}
                      maxBarSize={46}
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ChartHydrationFrame />
              )}
            </div>
            <SourceNote />
          </div>
        </Section>
      </div>

      <Section
        description="Perbandingan lima tahun terakhir membantu warga membaca arah fiskal daerah tanpa mengubah angka dasar yang sudah ada."
        eyebrow="Tren antartahun"
        title="Anggaran dan realisasi"
      >
        <div className="rounded-civic-xl border border-civic-line bg-civic-cloud p-5 shadow-civic-xs md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-civic-text">
                APBD 2021-2025
              </p>
              <p className="text-xs text-civic-textSubtle">
                Satuan dalam triliun rupiah
              </p>
            </div>
            <BarChart3 aria-hidden className="h-5 w-5 text-semantic-primary" />
          </div>
          <div className="h-96">
            {chartsReady ? (
              <ResponsiveContainer height="100%" width="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 16, right: 14, left: -10, bottom: 12 }}
                >
                  <CartesianGrid
                    stroke={chartColors.grid}
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 12, fill: chartColors.tick }}
                    tickMargin={10}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: chartColors.tick }}
                    unit=" T"
                    width={58}
                  />
                  <Tooltip
                    contentStyle={{
                      borderColor: chartColors.tooltipBorder,
                      borderRadius: 8,
                      boxShadow: "0 16px 40px rgba(53, 43, 27, 0.12)",
                    }}
                    formatter={(value, name) => [
                      `Rp ${Number(value).toLocaleString("id-ID")} T`,
                      name === "anggaran" ? "Anggaran" : "Realisasi",
                    ]}
                  />
                  <Legend wrapperStyle={{ paddingTop: 20 }} />
                  <Line
                    activeDot={{ r: 6 }}
                    dataKey="anggaran"
                    dot={{ r: 4, fill: chartColors.budget, strokeWidth: 2 }}
                    name="Anggaran"
                    stroke={chartColors.budget}
                    strokeWidth={3}
                    type="monotone"
                  />
                  <Line
                    activeDot={{ r: 6 }}
                    dataKey="realisasi"
                    dot={{
                      r: 4,
                      fill: chartColors.realization,
                      strokeWidth: 2,
                    }}
                    name="Realisasi"
                    stroke={chartColors.realization}
                    strokeWidth={3}
                    type="monotone"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <ChartHydrationFrame />
            )}
          </div>
          <SourceNote />
        </div>
      </Section>
    </PageShell>
  );
}
