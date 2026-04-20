"use client";

import type {
  BudayaItemWithRelations,
  KabupatenWithItems,
} from "@/types/budaya";

import React from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { Search, MapPin, Star, X, Share2, Heart } from "lucide-react";
import Image from "next/image";

import MapSumbar from "../../components/MapSumbar";

import DetailDialog from "./DetailDialog";

import { getBudayaItems, getKabupatens } from "@/utils/budaya-queries";

export default function BudayaPage() {
  const MAP_DEBUG = process.env.NEXT_PUBLIC_MAP_DEBUG === "1";
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Semua");
  const [selectedKabupaten, setSelectedKabupaten] = React.useState<
    string | null
  >(null);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] =
    React.useState<BudayaItemWithRelations | null>(null);

  // State untuk data dari database
  const [items, setItems] = React.useState<BudayaItemWithRelations[]>([]);
  const [kabupatens, setKabupatens] = React.useState<KabupatenWithItems[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Load data from local dummy data queries
  React.useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const [kabData, itemsResult] = await Promise.all([
          getKabupatens(true),
          getBudayaItems({
            status: "published",
            limit: 200,
            order_by: "rating",
            order_direction: "desc",
          }),
        ]);

        const itemsData = itemsResult.items || [];

        setKabupatens(kabData || []);
        setItems(itemsData);

        if (MAP_DEBUG) {
          console.info("[BudayaPage] Loaded data via local query utilities", {
            kabupatens: kabData?.length || 0,
            items: itemsData?.length || 0,
            kabSample: kabData?.slice(0, 2),
            itemsSample: itemsData?.slice(0, 2),
          });
          if (!kabData?.length) {
            console.warn(
              "[BudayaPage] No kabupatens returned from dummy dataset. Map will render without pins.",
            );
          }
          if (!itemsData?.length) {
            console.warn(
              "[BudayaPage] No budaya_items returned (status=published).",
            );
          }
        }
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Unknown error loading data";

        console.error("[BudayaPage] Error loading budaya data:", err);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [MAP_DEBUG]);

  // Filter tipe konten: Objek wisata, Tradisi, Kuliner
  const categories = [
    { name: "Semua", icon: "📋" },
    { name: "Objek", icon: "📍" },
    { name: "Tradisi", icon: "🎎" },
    { name: "Kuliner", icon: "🍽️" },
  ];

  // Convert kabupatens data untuk map component with item counts
  const kabupatenData = React.useMemo(() => {
    return kabupatens.map((kab) => {
      // Use item_count from API if available, else calculate from items array
      const itemCount =
        kab.item_count ??
        items.filter((item) => item.kabupaten?.slug === kab.slug).length;

      return {
        name: kab.name,
        key: kab.slug,
        lat: Number(kab.latitude),
        lng: Number(kab.longitude),
        color: kab.color,
        itemCount: itemCount,
      };
    });
  }, [kabupatens, items]);

  React.useEffect(() => {
    if (MAP_DEBUG) {
      console.info("[BudayaPage] kabupatenData computed", {
        count: kabupatenData.length,
        sample: kabupatenData.slice(0, 3),
      });
    }
  }, [MAP_DEBUG, kabupatenData]);

  // Filtering logic
  const filteredDestinations = React.useMemo(() => {
    const filtered = items.filter((item) => {
      // Filter by search query
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kabupaten?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by type (Semua, Objek, Tradisi, Kuliner)
      const typeMap: Record<string, string> = {
        Objek: "objek",
        Tradisi: "tradisi",
        Kuliner: "kuliner",
      };
      const matchesType =
        selectedCategory === "Semua" || item.type === typeMap[selectedCategory];

      // Filter by kabupaten
      const matchesKabupaten =
        !selectedKabupaten || item.kabupaten?.slug === selectedKabupaten;

      return matchesSearch && matchesType && matchesKabupaten;
    });

    console.log("[BudayaPage] 🔍 Filtering results", {
      totalItems: items.length,
      filteredCount: filtered.length,
      selectedKabupaten,
      selectedCategory,
      searchQuery,
    });

    return filtered;
  }, [items, selectedKabupaten, selectedCategory, searchQuery]);

  // Normalize external image URLs to avoid mixed-content issues
  const toHttps = (url?: string) => {
    if (!url) return "/placeholder.jpg";
    if (url.startsWith("https://")) return url;
    if (url.startsWith("http://")) return "https://" + url.slice(7);
    if (url.startsWith("//")) return `https:${url}`;

    return `https://${url}`;
  };

  const handleKabupatenClick = React.useCallback(
    (key: string) => {
      // ALWAYS log (critical for debugging Chrome issue)
      console.log("[BudayaPage] ✅ handleKabupatenClick CALLED", {
        key,
        browser: navigator.userAgent.includes("Chrome")
          ? "Chrome/Edge"
          : "Other",
        timestamp: new Date().toISOString(),
        MAP_DEBUG,
      });

      // Toggle: jika sudah selected, clear filter; jika belum, set filter
      setSelectedKabupaten((prev) => {
        const newValue = prev === key ? null : key;

        console.log("[BudayaPage] ✅ State changing", {
          from: prev,
          to: newValue,
        });

        return newValue;
      });
    },
    [MAP_DEBUG],
  );

  const openDetail = (item: BudayaItemWithRelations) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedItem(null);
  };

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2 text-red-600">
            Gagal Memuat Data
          </h2>
          <p className="text-foreground-600 mb-4">{error}</p>
          <Button color="warning" onPress={() => window.location.reload()}>
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  // Show loading state with skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header Skeleton */}
        <div className="text-black">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Budaya Sumbar
            </h1>
            <div className="flex items-center gap-2 text-sm text-foreground-600 mb-4 justify-center">
              <span>
                <MapPin size={16} />
              </span>
              <span>Jelajah Kekayaan Budaya Sumatera Barat</span>
            </div>
            <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8">
              Menampilkan warisan budaya, kuliner, dan destinasi alam Sumbar
              dengan storytelling visual dan konten interaktif.
            </p>
            {/* Keep search bar as skeleton while loading */}
            <Skeleton className="h-12 w-full max-w-xl mx-auto rounded-lg" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Content Skeleton */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category Pills Skeleton */}
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-lg" />
                ))}
              </div>

              <Skeleton className="h-6 w-64 rounded-lg" />

              {/* Destination Cards Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full rounded-none" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-6 w-3/4 rounded-lg" />
                      <Skeleton className="h-4 w-full rounded-lg" />
                      <Skeleton className="h-4 w-5/6 rounded-lg" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16 rounded-lg" />
                        <Skeleton className="h-6 w-20 rounded-lg" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Map Skeleton */}
            <div className="lg:col-span-5">
              <Card className="sticky top-4 overflow-hidden">
                <div className="bg-white p-4 border-b space-y-2">
                  <Skeleton className="h-6 w-32 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                </div>
                <Skeleton className="h-[600px] w-full rounded-none" />
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="text-black">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Budaya Sumbar</h1>
          <div className="flex items-center gap-2 text-sm text-foreground-600 mb-4 justify-center">
            <span>
              <MapPin size={16} />
            </span>
            <span>Jelajah Kekayaan Budaya Sumatera Barat</span>
          </div>
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-8">
            Menampilkan warisan budaya, kuliner, dan destinasi alam Sumbar
            dengan storytelling visual dan konten interaktif.
          </p>

          {/* Search Bar */}
          <div className="flex gap-3 flex-wrap justify-center max-w-xl mx-auto">
            <Input
              className="flex-1 min-w-[280px]"
              classNames={{
                input: "text-base",
                inputWrapper:
                  "bg-gray-50 border-2 border-gray-300 shadow-md h-12 hover:border-gray-400 focus-within:!border-foreground-900 transition-colors",
              }}
              placeholder="Cari budaya..."
              startContent={
                <Search className="text-foreground-500" size={20} />
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Content - Categories and Destinations */}
          <div className="lg:col-span-7 space-y-6">
            {/* Categories Pills */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Button
                  key={cat.name}
                  className={
                    selectedCategory === cat.name ? "font-semibold" : ""
                  }
                  color={selectedCategory === cat.name ? "warning" : "default"}
                  size="sm"
                  startContent={<span>{cat.icon}</span>}
                  variant={selectedCategory === cat.name ? "solid" : "bordered"}
                  onPress={() => setSelectedCategory(cat.name)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            {/* Destinations Count */}
            <div className="flex items-center justify-between">
              <p className="text-foreground-600">
                Menampilkan{" "}
                <span className="font-semibold text-foreground-900">
                  {filteredDestinations.length}
                </span>{" "}
                dokumentasi budaya
              </p>
              {selectedKabupaten && (
                <Button
                  color="warning"
                  size="sm"
                  startContent={<X size={14} />}
                  variant="flat"
                  onPress={() => setSelectedKabupaten(null)}
                >
                  Reset Filter
                </Button>
              )}
            </div>

            {/* Destinations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDestinations.map((dest) => (
                <Card
                  key={dest.id}
                  className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow group"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      fill
                      unoptimized
                      alt={dest.name}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      src={toHttps(dest.image_url)}
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        isIconOnly
                        className="bg-white/90 backdrop-blur"
                        size="sm"
                        variant="flat"
                      >
                        <Heart size={16} />
                      </Button>
                      <Button
                        isIconOnly
                        className="bg-white/90 backdrop-blur"
                        size="sm"
                        variant="flat"
                      >
                        <Share2 size={16} />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Chip
                        className="bg-white/90 backdrop-blur font-medium"
                        size="sm"
                        startContent={<span>📍</span>}
                      >
                        {dest.kabupaten?.name || ""}
                      </Chip>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-base">{dest.name}</h3>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                        <Star className="fill-warning text-warning" size={14} />
                        <span className="font-semibold text-sm">
                          {dest.rating}
                        </span>
                        <span className="text-xs text-foreground-400">
                          ({dest.reviews_count})
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-foreground-600 mb-3 line-clamp-2">
                      {dest.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {dest.tags
                        ?.slice(0, 3)
                        .map((tag: string, idx: number) => (
                          <Chip
                            key={idx}
                            className="text-xs"
                            size="sm"
                            variant="flat"
                          >
                            {tag}
                          </Chip>
                        ))}
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button
                        color="warning"
                        size="sm"
                        variant="flat"
                        onPress={() => openDetail(dest)}
                      >
                        Lihat detail
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredDestinations.length === 0 && (
              <div className="text-center py-12">
                <div className="text-5xl mb-3">🔍</div>
                <h3 className="text-lg font-semibold mb-2">
                  Tidak ada destinasi ditemukan
                </h3>
                <p className="text-sm text-foreground-500">
                  Coba ubah kata kunci atau filter pencarian Anda
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar - Interactive Map */}
          <div className="lg:col-span-5">
            <Card className="sticky top-4 overflow-hidden border border-gray-200 shadow-sm">
              <div className="bg-white p-4">
                <h3 className="font-bold text-lg mb-1">Peta Budaya</h3>
                <p className="text-sm text-foreground-600">
                  Klik pin untuk memfilter semua konten: objek, tradisi, dan
                  kuliner
                </p>
              </div>
              {(kabupatenData.length === 0 ||
                !kabupatenData.some((k) => Number(k.lat) && Number(k.lng))) && (
                <div className="px-4 pb-2 text-sm text-red-600">
                  Data peta belum tersedia atau koordinat belum terisi. Pastikan
                  data kabupaten dan koordinat ada di database.
                </div>
              )}

              <div className="relative h-[600px] bg-white">
                <MapSumbar
                  debug={process.env.NEXT_PUBLIC_MAP_DEBUG === "1"}
                  items={kabupatenData as any}
                  selectedKey={selectedKabupaten}
                  onSelect={(key: string) => handleKabupatenClick(key)}
                />
              </div>

              {/* Map Legend */}
              <div className="p-4 bg-white border-t">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-foreground-700">
                    Kabupaten/Kota
                  </span>
                  <span className="text-xs text-foreground-500">
                    {kabupatenData.length} lokasi
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {kabupatenData.map((kab) => (
                    <button
                      key={kab.key}
                      className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left ${
                        selectedKabupaten === kab.key
                          ? "bg-gray-100 ring-2 ring-warning"
                          : "bg-white border border-gray-200"
                      }`}
                      onClick={() => handleKabupatenClick(kab.key)}
                    >
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: kab.color }}
                      />
                      <span className="text-xs font-medium truncate">
                        {kab.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog Detail Item */}
      <DetailDialog
        isOpen={isDetailOpen}
        item={selectedItem}
        onClose={closeDetail}
      />
    </div>
  );
}
