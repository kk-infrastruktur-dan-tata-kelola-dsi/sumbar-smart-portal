import { clsx } from "clsx";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { StatusBadge, type StatusBadgeVariant } from "@/components/ui";

type ContentCardLayout = "grid" | "list" | "poster";
type ContentCardAspect = "landscape" | "portrait" | "square" | "video";

export interface ContentCardProps {
  title: string;
  description?: ReactNode;
  href?: string;
  image?: StaticImageData | string;
  imageAlt?: string;
  date?: string;
  source?: string;
  eyebrow?: string;
  status?: ReactNode;
  statusVariant?: StatusBadgeVariant;
  actionLabel?: string;
  layout?: ContentCardLayout;
  aspect?: ContentCardAspect;
  className?: string;
  priority?: boolean;
}

const aspectClass: Record<ContentCardAspect, string> = {
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  video: "aspect-video",
};

export function ContentCard({
  title,
  description,
  href,
  image,
  imageAlt,
  date,
  source,
  eyebrow,
  status,
  statusVariant = "official",
  actionLabel = "Baca selengkapnya",
  layout = "grid",
  aspect = "landscape",
  className,
  priority = false,
}: ContentCardProps) {
  const isList = layout === "list";
  const isPoster = layout === "poster";

  const media = image ? (
    <div
      className={clsx(
        "relative overflow-hidden bg-civic-stone",
        isList ? "rounded-civic-lg md:w-72 md:shrink-0" : "rounded-t-civic-xl",
        isList ? "aspect-[4/3]" : aspectClass[aspect],
      )}
    >
      <Image
        fill
        priority={priority}
        src={image}
        alt={imageAlt ?? title}
        className="object-cover transition duration-civic ease-civic group-hover:scale-[1.025]"
        sizes={
          isList
            ? "(max-width: 768px) 100vw, 288px"
            : "(max-width: 768px) 100vw, 33vw"
        }
      />
    </div>
  ) : null;

  const content = (
    <>
      {media}
      <div className={clsx("flex flex-1 flex-col", isPoster ? "p-5" : "p-5")}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-semantic-primary">
              {eyebrow}
            </span>
          )}
          {status && <StatusBadge variant={statusVariant}>{status}</StatusBadge>}
        </div>

        <h3 className="text-lg font-bold leading-snug text-civic-text">
          {title}
        </h3>

        {description && (
          <div className="mt-2 line-clamp-3 text-sm leading-6 text-civic-textMuted">
            {description}
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-civic-textSubtle">
          {date && <span>{date}</span>}
          {source && <span>Sumber: {source}</span>}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 text-sm">
          <span className="font-semibold text-semantic-primary">
            {href ? actionLabel : "Belum tersedia"}
          </span>
        </div>
      </div>
    </>
  );

  const cardClassName = clsx(
    "group block h-full overflow-hidden rounded-civic-xl border border-civic-line bg-civic-cloud shadow-civic-xs transition duration-civic ease-civic hover:-translate-y-0.5 hover:border-brand-gold-300 hover:shadow-civic-sm focus-visible:shadow-civic-focus",
    isList && "md:flex md:items-stretch",
    className,
  );

  if (!href) {
    return <article className={cardClassName}>{content}</article>;
  }

  return (
    <Link href={href} className={cardClassName}>
      {content}
    </Link>
  );
}
