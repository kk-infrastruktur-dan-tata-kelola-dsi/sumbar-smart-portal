"use client";

import React from "react";
import { Skeleton } from "@heroui/skeleton";
import { Card } from "@heroui/card";
import { Bell } from "lucide-react";

import CardPengumuman from "@/components/card_pengumuman";
import { getPengumuman, type Pengumuman } from "@/utils/pengumuman-queries";

export default function PengumumanPage() {
  const [pengumumanData, setPengumumanData] = React.useState<Pengumuman[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const ITEMS_PER_PAGE = 9;

  React.useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getPengumuman();

        setPengumumanData(data);
      } catch (error) {
        console.error("Error loading pengumuman:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const totalPages = Math.ceil(pengumumanData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = pengumumanData.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - No Skeleton */}
      <div className="text-black">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
            Pengumuman
          </h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8">
            Informasi dan pengumuman terkini dari Pemerintah Provinsi Sumatera
            Barat
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <>
            {/* Skeleton Loading */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <Card key={i} className="border border-gray-200 shadow-sm">
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <Skeleton className="h-10 w-10 rounded-xl" />
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-6 w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4 rounded-lg" />
                    <Skeleton className="h-4 w-full rounded-lg" />
                    <Skeleton className="h-4 w-5/6 rounded-lg" />
                    <div className="flex justify-between items-center pt-2">
                      <Skeleton className="h-4 w-24 rounded-lg" />
                      <Skeleton className="h-8 w-24 rounded-lg" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : pengumumanData.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-foreground-700 mb-2">
              Belum Ada Pengumuman
            </h3>
            <p className="text-foreground-500">
              Pengumuman akan ditampilkan di sini
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedData.map((pengumuman) => {
                const validStatus =
                  pengumuman.status?.toLowerCase() === "penting"
                    ? "penting"
                    : "info";

                return (
                  <CardPengumuman
                    key={pengumuman.id}
                    desc_preview={pengumuman.deskripsi}
                    fileUrl={pengumuman.file_url}
                    judul={pengumuman.judul}
                    status={validStatus}
                    tanggal={new Date(pengumuman.created_at).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  />
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-3 mt-10">
                <div className="flex items-center gap-1">
                  {/* Previous Button */}
                  <button
                    className={`p-2 rounded-md transition-all ${
                      currentPage === 1
                        ? "pointer-events-none opacity-40 text-gray-400"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M15 19l-7-7 7-7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1 mx-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => {
                        const showPage =
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1);

                        const showEllipsis =
                          (page === currentPage - 2 && currentPage > 3) ||
                          (page === currentPage + 2 &&
                            currentPage < totalPages - 2);

                        if (showEllipsis) {
                          return (
                            <span
                              key={page}
                              className="px-2 text-gray-400 text-sm"
                            >
                              ···
                            </span>
                          );
                        }

                        if (!showPage) return null;

                        return (
                          <button
                            key={page}
                            className={`min-w-[32px] h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all ${
                              currentPage === page
                                ? "bg-warning text-white shadow-sm"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        );
                      },
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    className={`p-2 rounded-md transition-all ${
                      currentPage === totalPages
                        ? "pointer-events-none opacity-40 text-gray-400"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </button>
                </div>

                {/* Info */}
                <p className="text-xs text-gray-500">
                  {startIndex + 1}–{Math.min(endIndex, pengumumanData.length)}{" "}
                  dari {pengumumanData.length} pengumuman
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
