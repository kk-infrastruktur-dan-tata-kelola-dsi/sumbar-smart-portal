import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerGroups = [
  {
    title: "Layanan",
    links: [
      { label: "Survey Kepuasan Masyarakat", href: "/informasi-layanan" },
      { label: "Keuangan Daerah", href: "/keuangan" },
      { label: "Inovasi", href: "/inovasi" },
      { label: "OPD", href: "/opd" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { label: "Berita", href: "/informasi/berita" },
      { label: "Pengumuman", href: "/pengumuman" },
      { label: "Agenda", href: "/informasi/agenda" },
      { label: "Anti Hoax", href: "/anti_hoax" },
    ],
  },
  {
    title: "Provinsi",
    links: [
      { label: "Profil Provinsi", href: "/profile" },
      { label: "Struktur Organisasi", href: "/profile#struktur" },
      { label: "Budaya Sumbar", href: "/budaya" },
      { label: "Infografis", href: "/informasi/infografis" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-civic-footer text-civic-inverse">
      <div className="mx-auto max-w-civic-wide px-6 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 border-b border-white/12 pb-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                alt="Peta Sumatera Barat"
                className="h-11 w-11"
                height={44}
                src="/images/sumbarmap.svg"
                width={44}
              />
              <div>
                <h2 className="font-bold text-white">Sumatera Barat</h2>
                <p className="text-sm text-white/62">
                  Portal resmi Pemerintah Provinsi
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/68">
              Akses layanan publik, pengumuman resmi, informasi transparansi,
              dan pengetahuan daerah dalam satu portal.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-bold text-white">{group.title}</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="text-white/68 transition duration-civic hover:text-brand-gold-200"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 border-b border-white/12 py-8 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-300" />
            <div>
              <h4 className="text-sm font-semibold text-white">Alamat</h4>
              <p className="mt-1 text-sm leading-6 text-white/64">
                Jl. Jenderal Sudirman No. 51
                <br />
                Padang, Sumatera Barat 25112
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-300" />
            <div>
              <h4 className="text-sm font-semibold text-white">Telepon</h4>
              <p className="mt-1 text-sm leading-6 text-white/64">
                (0751) 7051711
                <br />
                Senin-Jumat, 08:00-16:00 WIB
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-300" />
            <div>
              <h4 className="text-sm font-semibold text-white">Email</h4>
              <p className="mt-1 text-sm leading-6 text-white/64">
                info@sumbarprov.go.id
                <br />
                humas@sumbarprov.go.id
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-xs text-white/52 md:flex-row md:items-center md:justify-between">
          <p>
            © 2025 Pemerintah Provinsi Sumatera Barat. Seluruh hak cipta
            dilindungi.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {/* Pending legal routes: keep disabled until real policy pages exist. */}
            <span aria-disabled="true">Kebijakan Privasi</span>
            <span aria-disabled="true">Syarat & Ketentuan</span>
            <Link
              className="transition duration-civic hover:text-brand-gold-200"
              href="/informasi"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
