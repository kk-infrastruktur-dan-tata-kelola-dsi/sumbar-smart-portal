import antihoaxData from "@/data/dummy/antihoax.json";

export type AntiHoax = {
  id: string;
  judul: string;
  penjelasan: string;
  written_by: string;
  gambar_url: string | null;
  jenis: "hoax" | "sebagian" | "verified";
  created_at: string;
};

const antiHoaxItems = antihoaxData as AntiHoax[];

export async function getAntiHoax(jenis?: string): Promise<AntiHoax[]> {
  const normalizedJenis = jenis?.toLowerCase();

  return antiHoaxItems
    .filter((item) => !normalizedJenis || item.jenis === normalizedJenis)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
}

export async function getAntiHoaxById(id: string): Promise<AntiHoax | null> {
  return antiHoaxItems.find((item) => item.id === id) || null;
}

export async function getAntiHoaxByJenis(): Promise<{
  hoax: AntiHoax[];
  verified: AntiHoax[];
}> {
  const sortedItems = [...antiHoaxItems].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return {
    hoax: sortedItems.filter(
      (item) => item.jenis === "hoax" || item.jenis === "sebagian",
    ),
    verified: sortedItems.filter((item) => item.jenis === "verified"),
  };
}
