"use client";

import React from "react";
import {
  Building,
  Building2,
  FileText,
  Hammer,
  Heart,
  Package,
  Scale,
  Users,
  WalletCards,
} from "lucide-react";

import {
  EmptyState,
  PageHeader,
  PageShell,
  Section,
  StatusBadge,
} from "@/components/ui";

const tabs = [
  "Sekretaris Daerah",
  "Dinas Daerah",
  "Badan Daerah",
  "Rumah Sakit Daerah",
  "Sekretariat DPRD",
];

const opdData = {
  "Sekretaris Daerah": [
    { name: "Biro Umum", icon: Building },
    { name: "Biro Hukum", icon: Scale },
    { name: "Biro Administrasi Pimpinan", icon: FileText },
    { name: "Biro Pemerintahan dan Otonomi Daerah", icon: Building2 },
    { name: "Biro Perekonomian", icon: WalletCards },
    { name: "Biro Pengadaan Barang dan Jasa", icon: Package },
    { name: "Biro Kesejahteraan Rakyat", icon: Heart },
    { name: "Biro Administrasi Pembangunan", icon: Hammer },
    { name: "Biro Organisasi", icon: Users },
  ],
  "Dinas Daerah": [
    { name: "Dinas Pendidikan", icon: FileText },
    { name: "Dinas Kesehatan", icon: Heart },
    { name: "Dinas Pekerjaan Umum dan Penataan Ruang", icon: Hammer },
    { name: "Dinas Perumahan dan Kawasan Permukiman", icon: Building },
    { name: "Dinas Sosial", icon: Users },
    { name: "Dinas Tenaga Kerja dan Transmigrasi", icon: Users },
    { name: "Dinas Pemberdayaan Perempuan dan Perlindungan Anak", icon: Heart },
    { name: "Dinas Pangan", icon: Package },
    { name: "Dinas Lingkungan Hidup", icon: Building2 },
    { name: "Dinas Kependudukan dan Pencatatan Sipil", icon: FileText },
    { name: "Dinas Pemberdayaan Masyarakat dan Desa", icon: Users },
    { name: "Dinas Perhubungan", icon: Building2 },
  ],
  "Badan Daerah": [
    { name: "Badan Perencanaan Pembangunan Daerah", icon: Building2 },
    { name: "Badan Keuangan Daerah", icon: WalletCards },
    { name: "Badan Kepegawaian Daerah", icon: Users },
    { name: "Badan Pendapatan Daerah", icon: WalletCards },
    { name: "Badan Pengelolaan Keuangan dan Aset Daerah", icon: Package },
    { name: "Badan Penanggulangan Bencana Daerah", icon: Building2 },
    { name: "Badan Kesatuan Bangsa dan Politik", icon: Building },
    { name: "Badan Penelitian dan Pengembangan", icon: FileText },
  ],
  "Rumah Sakit Daerah": [
    { name: "RSUD Achmad Mochtar", icon: Heart },
    { name: "RSUD Dr. Rasidin", icon: Heart },
    { name: "RSJ Prof. HB. Saanin", icon: Heart },
    { name: "Rumah Sakit Khusus Paru", icon: Heart },
    { name: "Rumah Sakit Gigi dan Mulut", icon: Heart },
    { name: "Rumah Sakit Iswandi", icon: Heart },
  ],
  "Sekretariat DPRD": [
    { name: "Sekretariat DPRD Provinsi Sumatera Barat", icon: Building },
    { name: "Bagian Umum dan Protokol", icon: FileText },
    { name: "Bagian Keuangan", icon: WalletCards },
    { name: "Bagian Persidangan dan Perundang-undangan", icon: Scale },
    { name: "Bagian Hubungan Masyarakat", icon: Users },
  ],
};

export default function OPDPage() {
  const [selectedTab, setSelectedTab] = React.useState(tabs[0]);
  const activeItems = opdData[selectedTab as keyof typeof opdData] ?? [];

  return (
    <PageShell as="main">
      <PageHeader
        description="Direktori OPD Provinsi Sumatera Barat dikelompokkan berdasarkan struktur pemerintahan agar warga dapat menemukan unit kerja secara cepat."
        eyebrow="Direktori pemerintah"
        metadata={
          <>
            <StatusBadge variant="information">
              {tabs.length} kategori
            </StatusBadge>
            <StatusBadge variant="official">
              {activeItems.length} unit aktif
            </StatusBadge>
          </>
        }
        title="Organisasi Perangkat Daerah"
      />

      <Section
        description="Gunakan kategori untuk menyaring unit kerja. Data kontak rinci dapat ditambahkan saat sumber resmi tersedia."
        title="Kategori OPD"
      >
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const isActive = selectedTab === tab;

            return (
              <button
                key={tab}
                className={`civic-focus-ring shrink-0 rounded-civic-lg border px-4 py-2 text-sm font-semibold transition duration-civic ${
                  isActive
                    ? "border-brand-gold-300 bg-brand-gold-50 text-brand-gold-700"
                    : "border-civic-line bg-civic-cloud text-civic-textMuted hover:border-brand-rantau-200 hover:text-civic-text"
                }`}
                type="button"
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {activeItems.length === 0 ? (
          <EmptyState
            description={`Data untuk kategori ${selectedTab} akan ditambahkan setelah sumber resmi tersedia.`}
            icon={<Building2 aria-hidden className="h-7 w-7" />}
            title="Data belum tersedia"
            tone="information"
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {activeItems.map((opd) => {
              const Icon = opd.icon;

              return (
                <article
                  key={opd.name}
                  className="rounded-civic-xl border border-civic-line bg-civic-cloud p-5 shadow-civic-xs transition duration-civic hover:-translate-y-0.5 hover:border-brand-gold-300 hover:shadow-civic-sm"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-civic-lg bg-brand-rantau-50 text-semantic-info">
                    <Icon aria-hidden className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold leading-snug text-civic-text">
                    {opd.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-civic-textMuted">
                    Kategori: {selectedTab}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-civic-textSubtle">
                    Profil OPD belum ditautkan
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </Section>
    </PageShell>
  );
}
