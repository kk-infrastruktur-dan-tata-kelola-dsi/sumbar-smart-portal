"use client";

import type {
  BudayaItemWithRelations,
  KabupatenWithItems,
} from "@/types/budaya";

import React from "react";
import Image from "next/image";
import {
  AlertCircle,
  Landmark,
  MapPin,
  Mountain,
  Search,
  Star,
  Utensils,
  X,
} from "lucide-react";

import DetailDialog from "./DetailDialog";

import MapSumbar from "@/components/MapSumbar";
import {
  EmptyState,
  PageHeader,
  PageShell,
  Section,
  StatusBadge,
} from "@/components/ui";
import { getBudayaItems, getKabupatens } from "@/utils/budaya-queries";

const categories = [
  { name: "Semua", type: null, icon: Landmark },
  { name: "Objek", type: "objek", icon: Mountain },
  { name: "Tradisi", type: "tradisi", icon: Landmark },
  { name: "Kuliner", type: "kuliner", icon: Utensils },
] as const;

const mapPalette = [
  "var(--color-civic-success)",
  "var(--color-civic-primary)",
  "var(--color-civic-info)",
  "var(--color-civic-warning)",
];

function normalizeImageUrl(url?: string) {
  if (!url) {
    return "/images/placeholder-horizontal.jpg";
  }

  if (url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("http://")) {
    return `https://${url.slice(7)}`;
  }

  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  return `https://${url}`;
}

function LoadingState() {
  return (
    <PageShell as="main">
      <PageHeader
        description="Memuat data budaya, kabupaten/kota, dan peta wilayah."
        eyebrow="Budaya dan wilayah"
        metadata={<StatusBadge variant="draft">Memuat data</StatusBadge>}
        title="Budaya Sumbar"
      />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-4">
          <div className="h-12 rounded-civic-lg bg-civic-stone" />
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="rounded-civic-xl border border-civic-line bg-civic-cloud p-4 shadow-civic-xs"
              >
                <div className="h-44 rounded-civic-lg bg-civic-stone" />
                <div className="mt-4 h-5 w-3/4 rounded bg-civic-stone" />
                <div className="mt-3 h-4 rounded bg-civic-stone" />
                <div className="mt-2 h-4 w-5/6 rounded bg-civic-stone" />
              </div>
            ))}
          </div>
        </div>
        <div className="h-[640px] rounded-civic-xl border border-civic-line bg-civic-stone" />
      </div>
    </PageShell>
  );
}

export default function BudayaPage() {
  const mapDebug = process.env.NEXT_PUBLIC_MAP_DEBUG === "1";
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Semua");
  const [selectedKabupaten, setSelectedKabupaten] = React.useState<
    string | null
  >(null);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] =
    React.useState<BudayaItemWithRelations | null>(null);
  const [items, setItems] = React.useState<BudayaItemWithRelations[]>([]);
  const [kabupatens, setKabupatens] = React.useState<KabupatenWithItems[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

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

        setKabupatens(kabData || []);
        setItems(itemsResult.items || []);

        if (mapDebug) {
          console.info("[BudayaPage] Loaded budaya data", {
            kabupatens: kabData?.length || 0,
            items: itemsResult.items?.length || 0,
          });
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Gagal memuat data budaya.";

        console.error("[BudayaPage] Error loading budaya data:", err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [mapDebug]);

  const kabupatenData = React.useMemo(() => {
    return kabupatens.map((kab, index) => {
      const itemCount =
        kab.item_count ??
        items.filter((item) => item.kabupaten?.slug === kab.slug).length;

      return {
        name: kab.name,
        key: kab.slug,
        lat: Number(kab.latitude),
        lng: Number(kab.longitude),
        color: mapPalette[index % mapPalette.length],
        itemCount,
      };
    });
  }, [kabupatens, items]);

  const filteredDestinations = React.useMemo(() => {
    const activeCategory = categories.find(
      (category) => category.name === selectedCategory,
    );

    return items.filter((item) => {
      const normalizedSearch = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.kabupaten?.name?.toLowerCase().includes(normalizedSearch) ||
        item.description?.toLowerCase().includes(normalizedSearch);
      const matchesType =
        !activeCategory?.type || item.type === activeCategory.type;
      const matchesKabupaten =
        !selectedKabupaten || item.kabupaten?.slug === selectedKabupaten;

      return matchesSearch && matchesType && matchesKabupaten;
    });
  }, [items, searchQuery, selectedCategory, selectedKabupaten]);

  const selectedKabupatenName = kabupatenData.find(
    (kab) => kab.key === selectedKabupaten,
  )?.name;

  const handleKabupatenClick = React.useCallback(
    (key: string) => {
      if (mapDebug) {
        console.info("[BudayaPage] Kabupaten selected", { key });
      }

      setSelectedKabupaten((prev) => (prev === key ? null : key));
    },
    [mapDebug],
  );

  function openDetail(item: BudayaItemWithRelations) {
    setSelectedItem(item);
    setIsDetailOpen(true);
  }

  function closeDetail() {
    setIsDetailOpen(false);
    setSelectedItem(null);
  }

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <PageShell as="main">
        <EmptyState
          actions={
            <button
              className="civic-focus-ring rounded-civic-lg bg-brand-gold-500 px-4 py-2 text-sm font-bold text-white"
              type="button"
              onClick={() => window.location.reload()}
            >
              Coba lagi
            </button>
          }
          description={error}
          icon={<AlertCircle aria-hidden className="h-7 w-7" />}
          title="Gagal memuat data budaya"
          tone="warning"
        />
      </PageShell>
    );
  }

  return (
    <PageShell as="main" width="wide">
      <PageHeader
        description="Jelajahi objek budaya, tradisi, kuliner, dan wilayah Sumatera Barat melalui daftar dan peta interaktif."
        eyebrow="Budaya dan wilayah"
        metadata={
          <>
            <StatusBadge variant="verified">
              {items.length} item budaya
            </StatusBadge>
            <StatusBadge variant="information">
              {kabupatenData.length} kabupaten/kota
            </StatusBadge>
            {selectedKabupatenName && (
              <StatusBadge variant="official">
                {selectedKabupatenName}
              </StatusBadge>
            )}
          </>
        }
        title="Budaya Sumbar"
      >
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <label className="relative block">
            <span className="sr-only">Cari budaya</span>
            <Search
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-civic-textSubtle"
            />
            <input
              className="civic-focus-ring h-12 w-full rounded-civic-lg border border-civic-line bg-civic-cloud pl-10 pr-4 text-sm font-medium text-civic-text shadow-civic-xs"
              placeholder="Cari budaya, kuliner, tradisi, atau kabupaten..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
          {selectedKabupaten && (
            <button
              className="civic-focus-ring inline-flex items-center justify-center gap-2 rounded-civic-lg border border-civic-line bg-civic-cloud px-4 py-3 text-sm font-semibold text-civic-textMuted hover:border-brand-gold-300 hover:text-civic-text"
              type="button"
              onClick={() => setSelectedKabupaten(null)}
            >
              <X aria-hidden className="h-4 w-4" />
              Reset wilayah
            </button>
          )}
        </div>
      </PageHeader>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px]">
        <Section
          actions={
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const active = selectedCategory === category.name;

                return (
                  <button
                    key={category.name}
                    className={`civic-focus-ring inline-flex items-center gap-2 rounded-civic-lg border px-3 py-2 text-sm font-semibold transition duration-civic ${
                      active
                        ? "border-brand-alam-300 bg-brand-alam-50 text-brand-alam-700"
                        : "border-civic-line bg-civic-cloud text-civic-textMuted hover:border-brand-alam-200 hover:text-civic-text"
                    }`}
                    type="button"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <Icon aria-hidden className="h-4 w-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          }
          className="mb-0"
          description={`${filteredDestinations.length} item cocok dengan filter saat ini.`}
          title="Daftar budaya"
        >
          {filteredDestinations.length === 0 ? (
            <EmptyState
              description="Ubah kata kunci, kategori, atau filter kabupaten/kota."
              icon={<Search aria-hidden className="h-7 w-7" />}
              title="Tidak ada budaya ditemukan"
              tone="information"
            />
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {filteredDestinations.map((dest) => (
                <article
                  key={dest.id}
                  className="overflow-hidden rounded-civic-xl border border-civic-line bg-civic-cloud shadow-civic-xs transition duration-civic hover:-translate-y-0.5 hover:border-brand-alam-300 hover:shadow-civic-sm"
                >
                  <div className="relative h-52 overflow-hidden bg-civic-stone">
                    <Image
                      fill
                      unoptimized
                      alt={dest.name}
                      className="object-cover transition duration-civic hover:scale-[1.025]"
                      sizes="(max-width: 768px) 100vw, 420px"
                      src={normalizeImageUrl(dest.image_url)}
                    />
                    <div className="absolute left-3 top-3">
                      <StatusBadge variant="verified">
                        {dest.category?.name || dest.type}
                      </StatusBadge>
                    </div>
                    <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-civic-md bg-civic-charcoal/85 px-2.5 py-1 text-xs font-semibold text-civic-inverse">
                      <MapPin aria-hidden className="h-3.5 w-3.5" />
                      {dest.kabupaten?.name || "Sumatera Barat"}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-bold leading-snug text-civic-text">
                        {dest.name}
                      </h3>
                      <div className="flex shrink-0 items-center gap-1 text-sm font-bold text-brand-gold-700">
                        <Star aria-hidden className="h-4 w-4 fill-current" />
                        <span className="civic-tabular">{dest.rating}</span>
                      </div>
                    </div>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-civic-textMuted">
                      {dest.description}
                    </p>
                    {dest.tags && dest.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {dest.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-civic-stone px-2 py-1 text-xs font-semibold text-civic-textMuted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <button
                      className="civic-focus-ring mt-5 inline-flex rounded-civic-md px-2 py-1 text-sm font-semibold text-semantic-primary hover:bg-brand-gold-50"
                      type="button"
                      onClick={() => openDetail(dest)}
                    >
                      Lihat detail
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Section>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-civic-xl border border-civic-line bg-civic-cloud shadow-civic-xs">
            <div className="border-b border-civic-line p-5">
              <h2 className="text-lg font-bold text-civic-text">Peta budaya</h2>
              <p className="mt-1 text-sm leading-6 text-civic-textMuted">
                Klik pin atau daftar wilayah untuk memfilter konten budaya.
              </p>
            </div>
            {kabupatenData.length === 0 && (
              <div className="px-5 py-3 text-sm font-semibold text-semantic-danger">
                Data peta belum tersedia.
              </div>
            )}
            <div className="h-[560px] bg-civic-stone">
              <MapSumbar
                debug={mapDebug}
                items={kabupatenData}
                selectedKey={selectedKabupaten}
                onSelect={handleKabupatenClick}
              />
            </div>
            <div className="border-t border-civic-line p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-civic-text">
                  Kabupaten/kota
                </span>
                <span className="text-xs font-semibold text-civic-textSubtle">
                  {kabupatenData.length} lokasi
                </span>
              </div>
              <div className="grid max-h-64 grid-cols-2 gap-2 overflow-y-auto pr-1">
                {kabupatenData.map((kab) => (
                  <button
                    key={kab.key}
                    className={`civic-focus-ring flex items-center gap-2 rounded-civic-md border p-2 text-left text-xs font-semibold transition duration-civic ${
                      selectedKabupaten === kab.key
                        ? "border-brand-alam-300 bg-brand-alam-50 text-brand-alam-700"
                        : "border-civic-line bg-civic-cloud text-civic-textMuted hover:border-brand-rantau-200 hover:text-civic-text"
                    }`}
                    type="button"
                    onClick={() => handleKabupatenClick(kab.key)}
                  >
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: kab.color }}
                    />
                    <span className="truncate">{kab.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <DetailDialog
        isOpen={isDetailOpen}
        item={selectedItem}
        onClose={closeDetail}
      />
    </PageShell>
  );
}
