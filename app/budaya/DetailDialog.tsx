"use client";

import Image from "next/image";
import { Modal, ModalBody, ModalContent, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { MapPin, Star } from "lucide-react";

import { StatusBadge } from "@/components/ui";
import type { BudayaItemWithRelations } from "@/types/budaya";

interface DetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: BudayaItemWithRelations | null;
}

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

function buildExplanation(item: BudayaItemWithRelations) {
  const type = item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : "Objek";
  const kabupatenName = item.kabupaten?.name || "Sumatera Barat";
  const longDescription = item.long_description || item.description || "";

  return `${item.name} adalah ${type.toLowerCase()} di ${kabupatenName}. ${longDescription}`.trim();
}

export default function DetailDialog({ isOpen, onClose, item }: DetailDialogProps) {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside" radius="lg">
      <ModalContent className="max-h-[90vh] overflow-hidden rounded-civic-xl">
        {() => (
          <>
            <div className="relative h-72 w-full overflow-hidden bg-civic-stone">
              <Image
                src={normalizeImageUrl(item.image_url)}
                alt={item.name}
                fill
                unoptimized
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-civic-charcoal/35 via-civic-charcoal/5 to-civic-charcoal/75" />
              <div className="absolute left-5 top-5">
                <StatusBadge variant="verified">
                  {item.category?.name || item.type}
                </StatusBadge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-civic-inverse">
                <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
                  {item.name}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-civic-line bg-civic-cloud px-6 py-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-civic-textMuted">
                <MapPin className="h-4 w-4 text-semantic-primary" aria-hidden />
                {item.kabupaten?.name || "Sumatera Barat"}
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-gold-700">
                <Star className="h-4 w-4 fill-current" aria-hidden />
                <span className="civic-tabular text-lg font-extrabold">{item.rating}</span>
                <span className="text-civic-textSubtle">({item.reviews_count} ulasan)</span>
              </div>
            </div>

            <ModalBody className="bg-civic-cloud py-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-civic-text">Ringkasan</h3>
                  <p className="mt-2 text-sm leading-6 text-civic-textMuted">
                    {item.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-civic-text">Konteks budaya</h3>
                  <p className="mt-2 text-sm leading-6 text-civic-textMuted">
                    {buildExplanation(item)}
                  </p>
                </div>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-civic-stone px-2 py-1 text-xs font-semibold text-civic-textMuted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </ModalBody>

            <ModalFooter className="border-t border-civic-line bg-civic-cloud">
              <Button radius="sm" variant="light" onPress={onClose}>
                Tutup
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
