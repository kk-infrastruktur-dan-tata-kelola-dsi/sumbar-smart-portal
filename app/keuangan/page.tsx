"use client";

import React from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Select, SelectItem } from "@heroui/select";
import { Skeleton } from "@heroui/skeleton";
import { Download, Calendar } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";

export default function KeuanganDaerahPage() {
  const [selectedYear, setSelectedYear] = React.useState("2025");
  const [loading, setLoading] = React.useState(true);

  const years = ["2025", "2024", "2023", "2022", "2021"];

  // Simulate data loading
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [selectedYear]);

  const statisticsByYear: Record<string, any[]> = {
    "2025": [
      {
        value: "12,5 T",
        label: "Per April 2025",
        description: "Anggaran Pendapatan & Belanja Daerah",
        color: "warning",
      },
      {
        value: "35,8%",
        label: "Realisasi hingga Q1 2025",
        description: "Tingkat Realisasi",
        color: "warning",
      },
      {
        value: "WTP",
        label: "Target Opini BPK 2025",
        description: "Wajar Tanpa Pengecualian",
        color: "warning",
      },
    ],
    "2024": [
      {
        value: "11,8 T",
        label: "Tahun Anggaran 2024",
        description: "Anggaran Pendapatan & Belanja Daerah",
        color: "warning",
      },
      {
        value: "94,2%",
        label: "Realisasi 2024",
        description: "Tingkat Realisasi",
        color: "warning",
      },
      {
        value: "WTP",
        label: "Opini BPK 2024",
        description: "Wajar Tanpa Pengecualian",
        color: "warning",
      },
    ],
    "2023": [
      {
        value: "10,9 T",
        label: "Tahun Anggaran 2023",
        description: "Anggaran Pendapatan & Belanja Daerah",
        color: "warning",
      },
      {
        value: "92,5%",
        label: "Realisasi 2023",
        description: "Tingkat Realisasi",
        color: "warning",
      },
      {
        value: "WTP",
        label: "Opini BPK 2023",
        description: "Wajar Tanpa Pengecualian",
        color: "warning",
      },
    ],
    "2022": [
      {
        value: "10,2 T",
        label: "Tahun Anggaran 2022",
        description: "Anggaran Pendapatan & Belanja Daerah",
        color: "warning",
      },
      {
        value: "91,3%",
        label: "Realisasi 2022",
        description: "Tingkat Realisasi",
        color: "warning",
      },
      {
        value: "WTP",
        label: "Opini BPK 2022",
        description: "Wajar Tanpa Pengecualian",
        color: "warning",
      },
    ],
    "2021": [
      {
        value: "9,5 T",
        label: "Tahun Anggaran 2021",
        description: "Anggaran Pendapatan & Belanja Daerah",
        color: "warning",
      },
      {
        value: "89,7%",
        label: "Realisasi 2021",
        description: "Tingkat Realisasi",
        color: "warning",
      },
      {
        value: "WTP",
        label: "Opini BPK 2021",
        description: "Wajar Tanpa Pengecualian",
        color: "warning",
      },
    ],
  };

  const allReports = [
    // 2025
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
    // 2024
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
    // 2023
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
    // 2022
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
    // 2021
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

  const expendituresByYear: Record<string, any[]> = {
    "2025": [
      { category: "Belanja Pegawai", percentage: 45, label: "45% dari total belanja" },
      { category: "Belanja Barang & Jasa", percentage: 28, label: "28% dari total belanja" },
      { category: "Belanja Modal", percentage: 20, label: "20% dari total belanja" },
      { category: "Belanja Lainnya", percentage: 7, label: "7% dari total belanja" },
    ],
    "2024": [
      { category: "Belanja Pegawai", percentage: 72, label: "72% dari total belanja" },
      { category: "Belanja Barang & Jasa", percentage: 83, label: "83% dari total belanja" },
      { category: "Belanja Modal", percentage: 33, label: "33% dari total belanja" },
      { category: "Belanja Lainnya", percentage: 7, label: "7% dari total belanja" },
    ],
    "2023": [
      { category: "Belanja Pegawai", percentage: 70, label: "70% dari total belanja" },
      { category: "Belanja Barang & Jasa", percentage: 80, label: "80% dari total belanja" },
      { category: "Belanja Modal", percentage: 30, label: "30% dari total belanja" },
      { category: "Belanja Lainnya", percentage: 8, label: "8% dari total belanja" },
    ],
    "2022": [
      { category: "Belanja Pegawai", percentage: 68, label: "68% dari total belanja" },
      { category: "Belanja Barang & Jasa", percentage: 78, label: "78% dari total belanja" },
      { category: "Belanja Modal", percentage: 28, label: "28% dari total belanja" },
      { category: "Belanja Lainnya", percentage: 9, label: "9% dari total belanja" },
    ],
    "2021": [
      { category: "Belanja Pegawai", percentage: 65, label: "65% dari total belanja" },
      { category: "Belanja Barang & Jasa", percentage: 75, label: "75% dari total belanja" },
      { category: "Belanja Modal", percentage: 25, label: "25% dari total belanja" },
      { category: "Belanja Lainnya", percentage: 10, label: "10% dari total belanja" },
    ],
  };

  // Trend data untuk chart perbandingan antar tahun
  const trendData = [
    { year: "2021", anggaran: 9.5, realisasi: 8.5 },
    { year: "2022", anggaran: 10.2, realisasi: 9.3 },
    { year: "2023", anggaran: 10.9, realisasi: 10.1 },
    { year: "2024", anggaran: 11.8, realisasi: 11.1 },
    { year: "2025", anggaran: 12.5, realisasi: 4.5 },
  ];

  const statisticCards = statisticsByYear[selectedYear] || statisticsByYear["2025"];
  const reports = allReports.filter((r) => r.year === selectedYear);
  const expenditures = expendituresByYear[selectedYear] || expendituresByYear["2025"];
  
  const expendituresChart = expenditures.map((e) => ({
    name: e.category,
    nilai: e.percentage,
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-black">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">Keuangan Daerah</h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8">
            Informasi Pengelolaan Keuangan Daerah (IPKD) Provinsi Sumatera Barat
          </p>
          
          {/* Year Filter */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="text-foreground-600" size={20} />
              <span className="text-sm font-medium text-foreground-600">Tahun Anggaran:</span>
            </div>
            <Select
              selectedKeys={[selectedYear]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setSelectedYear(selected);
              }}
              className="w-32"
              size="sm"
              aria-label="Pilih Tahun Anggaran"
              classNames={{
                trigger: "bg-white border-2 border-gray-300 hover:border-gray-400 data-[hover=true]:bg-gray-50",
                value: "font-semibold",
              }}
            >
              {years.map((year) => (
                <SelectItem key={year}>
                  {year}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <>
            {/* Statistics Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border border-gray-200 shadow-sm">
                  <div className="p-6 text-center space-y-3">
                    <Skeleton className="h-10 w-32 mx-auto rounded-lg" />
                    <Skeleton className="h-4 w-24 mx-auto rounded-lg" />
                    <Skeleton className="h-4 w-40 mx-auto rounded-lg" />
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Reports Skeleton */}
              <div>
                <Skeleton className="h-8 w-48 mb-6 rounded-lg" />
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="border border-gray-200 shadow-sm">
                      <div className="p-4 flex items-center gap-4">
                        <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-3/4 rounded-lg" />
                          <Skeleton className="h-4 w-1/2 rounded-lg" />
                        </div>
                        <Skeleton className="w-24 h-8 rounded-lg flex-shrink-0" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Chart Skeleton */}
              <div>
                <Skeleton className="h-8 w-48 mb-6 rounded-lg" />
                <Card className="border border-gray-200 shadow-sm">
                  <div className="p-4">
                    <Skeleton className="h-80 w-full rounded-lg" />
                    <Skeleton className="h-3 w-full mt-3 rounded-lg" />
                  </div>
                </Card>
              </div>
            </div>

            {/* Trend Chart Skeleton */}
            <div className="mt-12">
              <Skeleton className="h-8 w-64 mb-6 rounded-lg" />
              <Card className="border border-gray-200 shadow-sm">
                <div className="p-6">
                  <Skeleton className="h-96 w-full rounded-lg" />
                  <Skeleton className="h-3 w-full mt-4 rounded-lg" />
                </div>
              </Card>
            </div>

            {/* CTA Skeleton */}
            <Card className="mt-12 border border-gray-200 shadow-sm">
              <div className="p-6 text-center space-y-4">
                <Skeleton className="h-6 w-48 mx-auto rounded-lg" />
                <Skeleton className="h-4 w-96 max-w-full mx-auto rounded-lg" />
                <div className="flex gap-3 justify-center">
                  <Skeleton className="h-10 w-36 rounded-lg" />
                  <Skeleton className="h-10 w-36 rounded-lg" />
                </div>
              </div>
            </Card>
          </>
        ) : (
          <>
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {statisticCards.map((stat, idx) => (
            <Card key={idx} className="border border-gray-200 shadow-sm">
              <div className="p-6 text-center">
                <h2 className="text-4xl font-semibold text-foreground mb-1">{stat.value}</h2>
                <p className="text-xs text-foreground-500 mb-1">{stat.label}</p>
                <p className="text-foreground-600 text-sm">{stat.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reports Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Laporan & Dokumen</h2>
            <div className="space-y-4">
              {reports.map((report, idx) => (
                <Card key={idx} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="bg-amber-500 rounded-full p-3 flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm truncate">{report.title}</h3>
                          <Chip size="sm" color="warning" variant="flat" className="hidden sm:inline-flex">PDF</Chip>
                        </div>
                        <p className="text-xs text-foreground-500">
                          {report.size} • {report.date}
                        </p>
                      </div>
                    </div>
                    <Button
                      color="warning"
                      variant="flat"
                      size="sm"
                      className="flex-shrink-0"
                      startContent={<Download size={16} />}
                     
                    >
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Expenditures Section with Chart */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Realisasi Belanja {selectedYear}</h2>
            <Card className="border border-gray-200 shadow-sm">
              <div className="p-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expendituresChart} margin={{ top: 12, right: 12, left: 0, bottom: 12 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} tickMargin={8} />
                      <YAxis tick={{ fontSize: 12 }} unit="%" />
                      <Tooltip
                        cursor={{ fill: "rgba(0,0,0,0.03)" }}
                        formatter={(v) => [
                          `${Number(Array.isArray(v) ? v[0] : (v ?? 0))}%`,
                          "Realisasi",
                        ]}
                      />
                      <Bar dataKey="nilai" radius={[4, 4, 0, 0]} fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-foreground-500 mt-3">Komposisi realisasi belanja per kategori tahun {selectedYear} (%).</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Trend Chart - Perbandingan Antar Tahun */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Tren Anggaran & Realisasi (2021-2025)</h2>
          <Card className="border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ top: 12, right: 12, left: 0, bottom: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="year" tick={{ fontSize: 12 }} tickMargin={8} />
                    <YAxis tick={{ fontSize: 12 }} unit=" T" label={{ value: 'Triliun Rupiah', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
                    <Tooltip
                      formatter={(v) => [
                        `Rp ${Number(Array.isArray(v) ? v[0] : (v ?? 0))} T`,
                        "",
                      ]}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Line 
                      type="monotone" 
                      dataKey="anggaran" 
                      stroke="#f59e0b" 
                      strokeWidth={3}
                      name="Anggaran"
                      dot={{ r: 5, fill: '#f59e0b' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="realisasi" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      name="Realisasi"
                      dot={{ r: 5, fill: '#10b981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-foreground-500 mt-4">
                Grafik menunjukkan perbandingan anggaran dan realisasi APBD Provinsi Sumatera Barat dari tahun 2021 hingga 2025.
              </p>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <Card className="mt-12 border border-gray-200 shadow-sm">
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Transparansi Anggaran</h3>
            <p className="text-sm text-foreground-600 mb-4 max-w-2xl mx-auto">
              Pemerintah Provinsi Sumatera Barat berkomitmen pada pengelolaan keuangan daerah yang transparan dan akuntabel.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button color="default" variant="solid" size="md">
                Lihat Semua Laporan
              </Button>
              <Button color="default" variant="bordered" size="md">
                Hubungi BPKD
              </Button>
            </div>
          </div>
        </Card>
        </>
        )}
      </div>
      
    </div>
  );
}
