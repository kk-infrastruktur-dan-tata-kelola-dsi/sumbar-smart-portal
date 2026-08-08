import CardPengumuman from "@/components/card_pengumuman";

export default function TesPage() {
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <CardPengumuman
        desc_preview="Dibuka pendaftaran beasiswa untuk 1.000 pelajar dan mahasiswa"
        judul="Pembukaan Pendaftaran Beasiswa Unggulan Pemprov"
        status="penting"
        tanggal="5 Oktober 2025"
      />

      <CardPengumuman
        desc_preview="LPPD Provinsi Sumatera Barat tahun anggaran 2024 telah dipublikasikan"
        judul="Laporan Penyelenggaraan Pemerintahan Daerah (LPPD)"
        status="info"
        tanggal="20 Oktober 2025"
      />
    </div>
  );
}
