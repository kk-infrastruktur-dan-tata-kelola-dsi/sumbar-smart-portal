import Image from "next/image";
import Link from "next/link";
import { ExternalLink, FileSearch, ShieldCheck } from "lucide-react";

import { PageHeader, PageShell, Section, StatusBadge } from "@/components/ui";

const innovations = [
  {
    image: "/images/ppid.png",
    title: "PPID",
    description:
      "Pejabat Pengelola Informasi dan Dokumentasi membantu warga mengakses informasi publik sesuai ketentuan keterbukaan informasi.",
    actionLabel: "Akses PPID",
    href: "https://ppid.sumbarprov.go.id/",
    icon: ShieldCheck,
  },
  {
    image: "/images/e-riset.png",
    title: "Aplikasi E-Riset",
    description:
      "Repositori hasil penelitian dari perguruan tinggi, lembaga penelitian, OPD, dan peneliti lain untuk mendukung kebijakan berbasis pengetahuan.",
    actionLabel: "Kunjungi E-Riset",
    href: "https://eriset-balitbang.sumbarprov.go.id/",
    icon: FileSearch,
  },
];

export default function InovasiPage() {
  return (
    <PageShell as="main">
      <PageHeader
        description="Platform digital yang mendukung keterbukaan informasi, riset, dan pelayanan publik Provinsi Sumatera Barat."
        eyebrow="Layanan digital"
        metadata={
          <>
            <StatusBadge variant="information">
              {innovations.length} layanan
            </StatusBadge>
            <StatusBadge variant="official">Tautan eksternal resmi</StatusBadge>
          </>
        }
        title="Inovasi dan layanan digital"
      />

      <Section
        description="Kartu layanan memakai struktur yang konsisten: tujuan, pengelola, dan akses keluar yang jelas."
        title="Daftar layanan digital"
      >
        <div className="space-y-6">
          {innovations.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.href}
                className="grid gap-6 rounded-civic-xl border border-civic-line bg-civic-cloud p-6 shadow-civic-xs md:grid-cols-[220px_1fr] md:items-center"
              >
                <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-civic-xl bg-civic-stone md:w-full">
                  <Image
                    fill
                    alt={item.title}
                    className="object-contain p-6"
                    priority={index === 0}
                    sizes="220px"
                    src={item.image}
                  />
                </div>
                <div>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-civic-lg bg-brand-rantau-50 text-semantic-info">
                    <Icon aria-hidden className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold leading-tight text-civic-text">
                    {item.title}
                  </h2>
                  <p className="mt-3 max-w-civic-prose text-sm leading-6 text-civic-textMuted md:text-base">
                    {item.description}
                  </p>
                  <Link
                    className="civic-focus-ring mt-5 inline-flex items-center gap-2 rounded-civic-lg bg-brand-gold-500 px-5 py-3 text-sm font-bold text-white shadow-civic-sm transition duration-civic hover:bg-brand-gold-600"
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.actionLabel}
                    <ExternalLink aria-hidden className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Section>
    </PageShell>
  );
}
