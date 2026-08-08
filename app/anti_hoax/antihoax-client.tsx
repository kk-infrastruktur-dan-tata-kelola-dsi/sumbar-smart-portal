"use client";

import React, { useState } from "react";

import CardAntiHoax from "@/components/card_antihoax";
import PopupAntiHoax from "@/components/popup-antihoax";
import { AntiHoax } from "@/utils/antihoax-queries";

interface AntiHoaxClientProps {
  hoaxData: AntiHoax[];
  verifiedData: AntiHoax[];
}

export default function AntiHoaxClient({
  hoaxData,
  verifiedData,
}: AntiHoaxClientProps) {
  const [selectedItem, setSelectedItem] = useState<AntiHoax | null>(null);

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
    <>
      <div className="container mx-auto px-4">
        {/* Klarifikasi Informasi Hoax Section */}
        <section className="mb-16">
          <div className="flex items-center gap-6 mb-8">
            <h2 className="text-2xl font-bold text-red-900">
              Klarifikasi Informasi Hoax
            </h2>
            <div className="h-[3px] flex-grow bg-red-900/20" />
          </div>

          {hoaxData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <p className="text-gray-500">Belum ada data klarifikasi hoax</p>
            </div>
          )}
        </section>

        {/* Berita Terverifikasi Section */}
        <section className="mb-16">
          <div className="flex items-center gap-6 mb-8">
            <h2 className="text-2xl font-bold text-red-900">
              Berita Terverifikasi
            </h2>
            <div className="h-[3px] flex-grow bg-red-900/20" />
          </div>

          {verifiedData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <p className="text-gray-500">Belum ada berita terverifikasi</p>
            </div>
          )}
        </section>
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
    </>
  );
}
