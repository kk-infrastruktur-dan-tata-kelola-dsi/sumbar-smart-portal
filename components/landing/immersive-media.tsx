import { clsx } from "clsx";

export type SumbarImmersiveImage =
  | "ngarai-sianok"
  | "rice-terraces"
  | "green-valley"
  | "mountain-road";

interface ImmersiveMediaProps {
  image: SumbarImmersiveImage;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export function ImmersiveMedia({
  image,
  className,
  imgClassName,
  priority = false,
}: ImmersiveMediaProps) {
  const basePath = `/images/sumatera-barat/${image}`;

  return (
    <picture
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute inset-0 z-0 block overflow-hidden",
        className,
      )}
    >
      <source srcSet={`${basePath}.avif 2400w`} type="image/avif" />
      <source srcSet={`${basePath}.webp 2400w`} type="image/webp" />
      <img
        src={`${basePath}.webp`}
        alt=""
        width={2400}
        height={1600}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        className={clsx(
          "h-full w-full object-cover immersive-image-enter",
          imgClassName,
        )}
      />
    </picture>
  );
}
