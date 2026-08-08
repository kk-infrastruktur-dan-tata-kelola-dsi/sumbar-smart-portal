/* eslint-disable */
"use client";

import React from "react";

type LayananItem = {
  label: string;
  href?: string;
  imgSrc: string;
  bgClass: string; // e.g., "bg-yellow-400"
};

const items: LayananItem[] = [
  // 1. SPJ Online
  { label: "SPJ Online", imgSrc: "/images/spj.png", bgClass: "bg-transparent" },
  // 2. Survey Kepuasan Masyarakat
  {
    label: "Survey Kepuasan Masyarakat",
    href: "/informasi-layanan",
    imgSrc: "/images/survey.png",
    bgClass: "bg-transparent",
  },
  // 3. SuREK
  { label: "SuREK", imgSrc: "/images/surek.png", bgClass: "bg-transparent" },
  // 4. Info Publik
  {
    label: "Info Publik",
    imgSrc: "/images/infopublik.png",
    bgClass: "bg-transparent",
  },
  // 5. PPDB Online
  {
    label: "PPDB Online",
    imgSrc: "/images/ppdb.png",
    bgClass: "bg-transparent",
  },
  // 6. SIMBAGDA (Menggantikan SIMBADA dari gambar sebelumnya, saya gunakan SIMBAGDA sesuai urutan)
  {
    label: "SIMBAGDA",
    imgSrc: "/images/simbagda.png",
    bgClass: "bg-transparent",
  },
  // 7. Laptaru
  {
    label: "Laptaru",
    imgSrc: "/images/laptaru.png",
    bgClass: "bg-transparent",
  },
  // 8. E-Sakip Sumbar
  {
    label: "E-Sakip Sumbar",
    imgSrc: "/images/esakip.png",
    bgClass: "bg-transparent",
  },
  // 9. PPID
  { label: "PPID", imgSrc: "/images/ppid.png", bgClass: "bg-transparent" },
  // 10. Sumbar Madani
  {
    label: "Sumbar Madani",
    imgSrc: "/images/madani.png",
    bgClass: "bg-transparent",
  },
  // 11. Dashboard pembangunan (Disesuaikan dari Dashboard E-Performance)
  {
    label: "Dashboard pembangunan",
    imgSrc: "/images/pembangunan.png",
    bgClass: "bg-transparent",
  },
  // 12. SIMPEG
  { label: "SIMPEG", imgSrc: "/images/simpeg.png", bgClass: "bg-transparent" },
  // 13. Absensi Online
  {
    label: "Absensi Online",
    imgSrc: "/images/absensi.png",
    bgClass: "bg-transparent",
  },
  // 14. Internet satu pintu (Disesuaikan dari Internet Sehat Filter/Satu Pintu)
  {
    label: "Internet satu pintu",
    imgSrc: "/images/satupintu.png",
    bgClass: "bg-transparent",
  },
  // 15. Layanan MCAP (Disesuaikan dari Layanan MDAP)
  {
    label: "Layanan MCAP",
    imgSrc: "/images/mcap.png",
    bgClass: "bg-transparent",
  },
  // 16. Fas-Vidkon
  {
    label: "Fas-Vidkon",
    imgSrc: "/images/fasvidcom.png",
    bgClass: "bg-transparent",
  },
  // 17. JDIH
  { label: "JDIH", imgSrc: "/images/jdih.png", bgClass: "bg-transparent" },
  // 18. Pelayanan aplikasi satu pintu
  {
    label: "Pelayanan aplikasi satu pintu",
    imgSrc: "/images/aplikasisatupintu.png",
    bgClass: "bg-transparent",
  },
  // 19. Simtaru (Sistem Informasi Tata Ruang)
  {
    label: "Simtaru",
    imgSrc: "/images/simtaru.png",
    bgClass: "bg-transparent",
  },
  // 20. CSIRT (Computer Security Incident Response Team)
  { label: "CSIRT", imgSrc: "/images/csirt.png", bgClass: "bg-transparent" },
];

export default function LayananCarousel() {
  const [paused, setPaused] = React.useState(false);

  const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;

    if (!target.src.includes("info-publik.png"))
      target.src = "/images/info-publik.png";
  };

  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        Layanan Masyarakat
      </h2>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Wrapper marquee: hover untuk pause */}
        <div
          className="marquee-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchEnd={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          <div
            className="marquee"
            style={{
              animationPlayState: paused ? "paused" : "running",
              ["--duration" as any]: "60s", // 💡 Perlambat di sini (semakin besar semakin lambat)
            }}
          >
            {/* Isi utama */}
            <div className="flex gap-8 px-2 pr-8">
              {items.map((it, i) => (
                <a
                  key={`${it.label}-${i}`}
                  className="flex flex-col items-center justify-center w-48 h-56 hover:scale-105 transition-transform duration-300 cursor-pointer text-center px-3"
                  href={it.href ?? "#"}
                >
                  <img
                    alt={it.label}
                    className="h-16 mb-4"
                    src={it.imgSrc}
                    onError={onImgError}
                  />
                  <span className="text-lg font-semibold text-gray-800 leading-snug">
                    {it.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Duplikasi untuk loop mulus */}
            <div aria-hidden className="flex gap-8 px-2 pr-8">
              {items.map((it, i) => (
                <a
                  key={`dup-${it.label}-${i}`}
                  className="flex flex-col items-center justify-center w-48 h-56 hover:scale-105 transition-transform duration-300 cursor-pointer text-center px-3"
                  href={it.href ?? "#"}
                >
                  <img
                    alt=""
                    className="h-16 mb-4"
                    src={it.imgSrc}
                    onError={onImgError}
                  />
                  <span className="text-lg font-semibold text-gray-800 leading-snug">
                    {it.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS animasi marquee */}
      <style jsx>{`
        .marquee-wrap {
          overflow: hidden;
        }

        .marquee {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marquee var(--duration, 60s) linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
