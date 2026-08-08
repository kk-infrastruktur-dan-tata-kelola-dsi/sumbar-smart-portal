import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Newspaper, UserRound } from "lucide-react";

import { ContentCard } from "@/components/content";
import { PageHeader, PageShell, Section, StatusBadge } from "@/components/ui";
import { newsArticle, newsItems } from "@/config/content-data";

interface BeritaDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BeritaDetailPage({
  params,
}: BeritaDetailPageProps) {
  const { slug } = await params;
  const currentNews = newsItems.find((item) => item.id === slug);
  const article = currentNews
    ? {
        ...newsArticle,
        id: currentNews.id,
        title: currentNews.title,
        date: currentNews.date,
        image: currentNews.image,
        source: currentNews.source,
      }
    : newsArticle;
  const relatedNews = newsItems
    .filter((item) => item.id !== article.id)
    .slice(0, 2);

  return (
    <PageShell as="main" width="prose">
      <PageHeader
        description="Artikel ini memakai konten statis proyek saat ini. Hubungkan ke CMS atau sumber berita resmi untuk produksi."
        eyebrow="Berita resmi"
        metadata={
          <>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays aria-hidden className="h-4 w-4" />
              {article.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Newspaper aria-hidden className="h-4 w-4" />
              {article.source}
            </span>
          </>
        }
        title={article.title}
      />

      <article>
        <div className="relative aspect-video overflow-hidden rounded-civic-xl border border-civic-line bg-civic-stone shadow-civic-xs">
          <Image
            fill
            priority
            alt={article.title}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 760px"
            src={article.image}
          />
        </div>

        <div className="civic-prose mt-8">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-civic-line pt-6 text-sm text-civic-textMuted">
          <UserRound aria-hidden className="h-4 w-4 text-semantic-primary" />
          <span>Penulis: {article.author}</span>
          <StatusBadge variant="draft">Konten statis</StatusBadge>
        </div>
      </article>

      <Section
        className="mt-6"
        description="Rujukan berita lain dari dataset yang sama."
        title="Berita terkait"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {relatedNews.map((news) => (
            <ContentCard
              key={news.id}
              aspect="video"
              date={news.date}
              description={news.summary}
              href={`/informasi/berita/${news.id}`}
              image={news.image}
              source={news.source}
              title={news.title}
            />
          ))}
        </div>
      </Section>

      <div className="mt-8">
        <Link
          className="civic-focus-ring inline-flex items-center gap-2 rounded-civic-md px-3 py-2 text-sm font-semibold text-semantic-primary hover:bg-brand-gold-50"
          href="/informasi/berita"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          Kembali ke daftar berita
        </Link>
      </div>
    </PageShell>
  );
}
