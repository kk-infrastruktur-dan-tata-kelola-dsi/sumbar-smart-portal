import { CalendarDays, Play } from "lucide-react";

export interface VideoCardProps {
  id: string;
  title: string;
  date: string;
  source?: string;
}

export function VideoCard({ id, title, date, source = "YouTube" }: VideoCardProps) {
  return (
    <article className="overflow-hidden rounded-civic-xl border border-civic-line bg-civic-cloud shadow-civic-xs">
      <div className="relative aspect-video bg-civic-charcoal">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-civic-md bg-civic-charcoal/80 px-2.5 py-1 text-xs font-semibold text-civic-inverse">
          <Play className="h-3.5 w-3.5" aria-hidden />
          Video
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold leading-snug text-civic-text">{title}</h3>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-civic-textSubtle">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            {date}
          </span>
          <span>Sumber: {source}</span>
        </div>
      </div>
    </article>
  );
}
