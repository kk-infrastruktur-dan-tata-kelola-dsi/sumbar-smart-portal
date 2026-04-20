"use client";

import React from "react";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import { Skeleton } from "@heroui/skeleton";
import { Card } from "@heroui/card";

import PopupAntiHoax from "@/components/popup-antihoax";
import CardAntiHoax from "@/components/card_antihoax";
import { getAntiHoaxByJenis, type AntiHoax } from "@/utils/antihoax-queries";

export default function AntiHoaxPage() {
  const [hoaxData, setHoaxData] = React.useState<AntiHoax[]>([]);
  const [verifiedData, setVerifiedData] = React.useState<AntiHoax[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState<AntiHoax | null>(null);

  React.useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const { hoax, verified } = await getAntiHoaxByJenis();

        setHoaxData(hoax);
        setVerifiedData(verified);
      } catch (error) {
        console.error("Error loading anti hoax data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    return date.toLocaleDateString("id-ID", options);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - No Skeleton */}
      <div className="text-black">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
            Anti Hoax
          </h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8">
            Klarifikasi dan verifikasi informasi seputar Pemprov Sumatera Barat
          </p>

          {/* Warning Alert Box */}
          <div className="bg-red-600 rounded-2xl p-6 flex items-start gap-4 shadow-sm max-w-4xl mx-auto">
            {/* Icon */}
            <div className="bg-yellow-400 rounded-xl p-3 flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-gray-900" />
            </div>

            {/* Content */}
            <div className="text-white text-left">
              <h2 className="text-xl font-bold mb-2">
                Waspadai Informasi Hoax!
              </h2>
              <p className="text-sm leading-relaxed opacity-95">
                Selalu verifikasi informasi melalui saluran resmi Pemprov
                Sumbar.
                <br />
                Jangan mudah percaya dan menyebarkan informasi yang belum jelas
                kebenarannya.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {loading ? (
          <>
            {/* Klarifikasi Informasi Hoax Skeleton */}
            <div className="mb-12">
              <h1 className="text-3xl font-bold text-red-900 mb-6">
                Klarifikasi Informasi Hoax
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="border border-gray-200 shadow-sm">
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <Skeleton className="h-10 w-10 rounded-xl" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </div>
                      <Skeleton className="h-6 w-full rounded-lg" />
                      <Skeleton className="h-6 w-3/4 rounded-lg" />
                      <div className="bg-gray-50 rounded-lg p-3">
                        <Skeleton className="h-4 w-full rounded-lg" />
                        <Skeleton className="h-4 w-5/6 rounded-lg mt-2" />
                      </div>
                      <Skeleton className="h-4 w-32 rounded-lg" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Berita Terverifikasi Skeleton */}
            <div>
              <h2 className="text-3xl font-bold text-red-900 mb-6">
                Berita Terverifikasi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="border border-gray-200 shadow-sm">
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <Skeleton className="h-10 w-10 rounded-xl" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </div>
                      <Skeleton className="h-6 w-full rounded-lg" />
                      <Skeleton className="h-6 w-3/4 rounded-lg" />
                      <div className="bg-gray-50 rounded-lg p-3">
                        <Skeleton className="h-4 w-full rounded-lg" />
                        <Skeleton className="h-4 w-5/6 rounded-lg mt-2" />
                      </div>
                      <Skeleton className="h-4 w-32 rounded-lg" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Klarifikasi Informasi Hoax Section */}
            <div className="mb-12">
              <h1 className="text-3xl font-bold text-red-900 mb-6">
                Klarifikasi Informasi Hoax
              </h1>
              {hoaxData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {hoaxData.map((item) => (
                    <CardAntiHoax
                      key={item.id}
                      jenis={item.jenis}
                      judul={item.judul}
                      penjelasan={item.penjelasan}
                      tanggal={formatDate(item.created_at)}
                      onClick={() => setSelectedItem(item)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <ShieldAlert className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground-700 mb-2">
                    Belum Ada Data
                  </h3>
                  <p className="text-foreground-500">
                    Belum ada data klarifikasi hoax
                  </p>
                </div>
              )}
            </div>

            {/* Berita Terverifikasi Section */}
            <div>
              <h2 className="text-3xl font-bold text-red-900 mb-6">
                Berita Terverifikasi
              </h2>
              {verifiedData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {verifiedData.map((item) => (
                    <CardAntiHoax
                      key={item.id}
                      jenis={item.jenis}
                      judul={item.judul}
                      penjelasan={item.penjelasan}
                      tanggal={formatDate(item.created_at)}
                      onClick={() => setSelectedItem(item)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <ShieldAlert className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground-700 mb-2">
                    Belum Ada Data
                  </h3>
                  <p className="text-foreground-500">
                    Belum ada berita terverifikasi
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Popup Component */}
      {selectedItem && (
        <PopupAntiHoax
          gambar={selectedItem.gambar_url || undefined}
          isOpen={true}
          jenis={selectedItem.jenis}
          judul={selectedItem.judul}
          penjelasan={selectedItem.penjelasan}
          tanggal={formatDate(selectedItem.created_at)}
          written_by={selectedItem.written_by}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
