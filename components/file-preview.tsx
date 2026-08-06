"use client";

import { useEffect } from "react";
import { Download, ExternalLink, FileText, X } from "lucide-react";

type FilePreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  title: string;
};

export function FilePreviewModal({ isOpen, onClose, fileUrl, title }: FilePreviewModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const fileExtension = fileUrl.split(".").pop()?.toLowerCase();
  const isPDF = fileExtension === "pdf";
  const isImage = ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(
    fileExtension || "",
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-civic-charcoal/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="file-preview-title"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-civic-xl bg-civic-cloud shadow-civic-md"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-civic-line p-5">
          <h2 id="file-preview-title" className="truncate text-lg font-bold text-civic-text">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="civic-focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-civic-md text-civic-textMuted hover:bg-civic-stone hover:text-civic-text"
            aria-label="Tutup pratinjau"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-civic-stone">
          {isPDF ? (
            <iframe
              src={fileUrl}
              className="h-full min-h-[70vh] w-full border-0"
              title={title}
            />
          ) : isImage ? (
            <div className="flex min-h-[70vh] items-center justify-center p-8">
              <img
                src={fileUrl}
                alt={title}
                className="max-h-full max-w-full rounded-civic-lg object-contain shadow-civic-sm"
              />
            </div>
          ) : (
            <div className="flex min-h-[70vh] flex-col items-center justify-center px-8 py-16 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-civic-lg bg-brand-rantau-50 text-semantic-info">
                <FileText className="h-8 w-8" aria-hidden />
              </div>
              <p className="mb-6 text-sm leading-6 text-civic-textMuted">
                Pratinjau tidak tersedia untuk tipe file ini.
              </p>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="civic-focus-ring inline-flex items-center gap-2 rounded-civic-lg bg-brand-gold-500 px-5 py-3 text-sm font-bold text-white"
              >
                <Download className="h-4 w-4" aria-hidden />
                Unduh file
              </a>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-civic-line bg-civic-cloud p-4">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="civic-focus-ring inline-flex items-center gap-2 rounded-civic-md px-3 py-2 text-sm font-semibold text-semantic-primary hover:bg-brand-gold-50"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            Buka di tab baru
          </a>
          <button
            type="button"
            onClick={onClose}
            className="civic-focus-ring rounded-civic-md border border-civic-line px-3 py-2 text-sm font-semibold text-civic-textMuted hover:bg-civic-stone hover:text-civic-text"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
