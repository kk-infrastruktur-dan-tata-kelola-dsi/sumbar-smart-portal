"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

import { EmptyState, PageShell } from "@/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageShell as="main">
      <EmptyState
        actions={
          <button
            className="civic-focus-ring rounded-civic-lg bg-brand-gold-500 px-4 py-2 text-sm font-bold text-white"
            type="button"
            onClick={() => reset()}
          >
            Coba lagi
          </button>
        }
        description="Terjadi gangguan saat memuat halaman. Coba muat ulang bagian ini."
        icon={<AlertCircle aria-hidden className="h-7 w-7" />}
        title="Halaman gagal dimuat"
        tone="warning"
      />
    </PageShell>
  );
}
