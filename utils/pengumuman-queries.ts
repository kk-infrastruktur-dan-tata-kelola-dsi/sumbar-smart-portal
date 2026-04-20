import pengumumanData from "@/data/dummy/pengumuman.json";

export type Pengumuman = {
  id: string;
  judul: string;
  deskripsi: string;
  status: string;
  file_url: string | null;
  created_at: string;
};

const pengumumanItems = pengumumanData as Pengumuman[];

export async function getPengumuman(status?: string): Promise<Pengumuman[]> {
  const normalizedStatus = status?.toLowerCase();

  return pengumumanItems
    .filter(
      (item) =>
        !normalizedStatus || item.status.toLowerCase() === normalizedStatus,
    )
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
}

export async function getPengumumanById(
  id: string,
): Promise<Pengumuman | null> {
  return pengumumanItems.find((item) => item.id === id) || null;
}
