"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Alert } from "@heroui/alert";
import {
  Accessibility,
  ExternalLink,
  MessageCircle,
  NotepadText,
  Send,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

import { useTTS } from "@/contexts/TTSContext";
import type { AIMessage } from "@/types/ai";

type Panel = "menu" | "chat" | null;
type ChatMessage = AIMessage & { id: string };

export default function AiAssistant() {
  const pathname = usePathname();
  const [panel, setPanel] = React.useState<Panel>(null);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [greeting, setGreeting] = React.useState<string>("Selamat datang");
  const [timeString, setTimeString] = React.useState<string | null>(null);

  const { ttsEnabled, isSpeaking, toggleTTS } = useTTS();
  const chatContainerRef = React.useRef<HTMLDivElement | null>(null);
  const abortRef = React.useRef<AbortController | null>(null);
  const idRef = React.useRef(0);
  const pinnedToBottomRef = React.useRef(true);

  const nextId = React.useCallback(() => {
    idRef.current += 1;

    return `msg-${idRef.current}`;
  }, []);

  // Batalkan stream yang masih berjalan saat komponen dilepas,
  // supaya tidak ada setState setelah unmount.
  React.useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const closePanel = React.useCallback(() => {
    setPanel(null);
    setError(null);
  }, []);

  const handleChatScroll = React.useCallback(() => {
    const el = chatContainerRef.current;

    if (!el) return;

    pinnedToBottomRef.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }, []);

  // Auto-scroll hanya saat pengguna berada di dekat dasar. Instan selama
  // streaming agar tidak tersendat, mulus saat pesan baru/panel dibuka.
  React.useEffect(() => {
    const el = chatContainerRef.current;

    if (panel !== "chat" || !el || !pinnedToBottomRef.current) return;

    el.scrollTo({ top: el.scrollHeight, behavior: "instant" });
  }, [messages, loading, panel]);

  React.useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const t = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setTimeString(t);

    if (hour >= 3 && hour < 10) {
      setGreeting("Selamat pagi");
    } else if (hour >= 10 && hour < 15) {
      setGreeting("Selamat siang");
    } else if (hour >= 15 && hour < 18) {
      setGreeting("Selamat sore");
    } else {
      setGreeting("Selamat malam");
    }
  }, []);

  const send = async (text?: string) => {
    const messageText = (text ?? input).trim();

    if (!messageText || loading) return;

    setPanel("chat");
    setError(null);
    setLoading(true);
    setInput("");
    pinnedToBottomRef.current = true;

    const userMsg: ChatMessage = {
      id: nextId(),
      role: "user",
      content: messageText,
    };
    const assistantMsg: ChatMessage = {
      id: nextId(),
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);

    const controller = new AbortController();

    abortRef.current = controller;

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: messageText,
          stream: true,
          currentPage: pathname,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const ct = res.headers.get("content-type") || "";

        if (ct.includes("application/json")) {
          const data = await res.json();
          throw new Error(data?.error || data?.details || "Request failed");
        }

        const txt = await res.text();
        throw new Error(txt || "Request failed");
      }

      if (!res.body) {
        throw new Error("No response body");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        acc += decoder.decode(value, { stream: true });
        const content = acc;

        setMessages((prev) =>
          prev.map((m) => (m.id === assistantMsg.id ? { ...m, content } : m)),
        );
      }

      if (!acc) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id ? { ...m, content: "(no response)" } : m,
          ),
        );
      }
    } catch (e: unknown) {
      if (controller.signal.aborted) return;
      setError(e instanceof Error ? e.message : String(e));
      setMessages((prev) =>
        prev.filter((m) => !(m.id === assistantMsg.id && !m.content)),
      );
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  const quickActions = [
    {
      label: "Tempat wisata di Sumbar",
      text: "Apa saja tempat wisata menarik di Sumatera Barat?",
    },
    {
      label: "APBD tahun 2025",
      text: "Berapa anggaran Sumbar tahun 2025?",
    },
    {
      label: "Cara akses PPID",
      text: "Bagaimana cara mengakses informasi publik melalui PPID?",
    },
    {
      label: "Laporan keuangan daerah",
      text: "Bagaimana cara melihat laporan keuangan daerah Sumbar?",
    },
  ];

  const isOpen = panel !== null;

  return (
    <div className="fixed bottom-5 right-5 z-50" suppressHydrationWarning>
      {panel === "menu" && (
        <div className="chat-panel-enter mb-3 w-[min(calc(100vw-2.5rem),360px)] rounded-civic-xl border border-civic-line bg-civic-cloud p-4 shadow-civic-md">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-semantic-primary">
                Pusat bantuan
              </p>
              <h2 className="mt-1 text-lg font-bold text-civic-text">
                Butuh bantuan?
              </h2>
            </div>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={closePanel}
              aria-label="Tutup pusat bantuan"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setPanel("chat")}
              className="civic-focus-ring flex w-full items-center gap-3 rounded-civic-lg border border-civic-line bg-civic-paper px-3 py-3 text-left transition duration-civic hover:border-brand-gold-300 hover:bg-brand-gold-50"
            >
              <Image
                src="/images/tanyomamak.svg"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span>
                <span className="block text-sm font-bold text-civic-text">
                  Tanyo Mamak
                </span>
                <span className="block text-xs text-civic-textMuted">
                  Tanya layanan dan informasi Sumbar.
                </span>
              </span>
            </button>

            <a
              href="https://forms.gle/AhScbDbK5g8551C59"
              target="_blank"
              rel="noopener noreferrer"
              className="civic-focus-ring flex w-full items-center gap-3 rounded-civic-lg border border-civic-line bg-civic-paper px-3 py-3 text-left transition duration-civic hover:border-brand-gold-300 hover:bg-brand-gold-50"
            >
              <NotepadText className="h-5 w-5 text-semantic-primary" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-civic-text">
                  Survey Kepuasan Masyarakat
                </span>
                <span className="block text-xs text-civic-textMuted">
                  Buka formulir penilaian layanan.
                </span>
              </span>
              <ExternalLink className="h-4 w-4 text-civic-textSubtle" />
            </a>

            <button
              type="button"
              onClick={toggleTTS}
              className="civic-focus-ring flex w-full items-center gap-3 rounded-civic-lg border border-civic-line bg-civic-paper px-3 py-3 text-left transition duration-civic hover:border-brand-gold-300 hover:bg-brand-gold-50"
            >
              {ttsEnabled ? (
                <Volume2 className="h-5 w-5 text-semantic-success" />
              ) : (
                <VolumeX className="h-5 w-5 text-civic-textMuted" />
              )}
              <span>
                <span className="block text-sm font-bold text-civic-text">
                  Mode aksesibilitas
                </span>
                <span className="block text-xs text-civic-textMuted">
                  {ttsEnabled ? "Aktif" : "Nonaktif"}
                  {isSpeaking ? " - sedang membacakan" : ""}
                </span>
              </span>
            </button>
          </div>
        </div>
      )}

      {panel === "chat" && (
        <div className="chat-panel-enter mb-3 flex max-h-[min(70vh,620px)] w-[min(calc(100vw-2.5rem),430px)] flex-col overflow-hidden rounded-civic-xl border border-civic-line bg-civic-cloud shadow-civic-md">
          <div className="flex items-start justify-between gap-3 border-b border-civic-line bg-brand-gold-50 px-4 py-4">
            <div className="flex items-start gap-3">
              <Image
                src="/images/tanyomamak.svg"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <div>
                <h3 className="font-bold text-civic-text">Tanyo Mamak</h3>
                <p className="text-xs text-civic-textMuted">
                  Bantuan informasi Provinsi Sumatera Barat
                </p>
              </div>
            </div>
            <Button
              variant="light"
              isIconOnly
              size="sm"
              onPress={closePanel}
              aria-label="Tutup Tanyo Mamak"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {error && (
            <div className="px-4 pt-3">
              <Alert color="danger" variant="flat" className="text-sm">
                {error}
              </Alert>
            </div>
          )}

          <div
            ref={chatContainerRef}
            onScroll={handleChatScroll}
            className="flex-1 overflow-auto px-4 py-3"
          >
            <div className="flex flex-col gap-3">
              {messages.length === 0 && (
                <div className="rounded-civic-lg border border-civic-line bg-civic-paper p-4">
                  <p className="text-sm font-semibold text-civic-text" suppressHydrationWarning>
                    {greeting}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-civic-textMuted">
                    Saya Mamak. Saya bisa membantu mencari informasi tentang
                    layanan, keuangan daerah, PPID, budaya, dan pengumuman
                    resmi Sumatera Barat.
                  </p>
                  <p className="mt-3 text-xs text-civic-textSubtle" suppressHydrationWarning>
                    {timeString ?? ""}
                  </p>
                </div>
              )}

              {messages.map((m) => {
                const isUser = m.role === "user";
                const isStreaming =
                  !isUser &&
                  loading &&
                  m.id === messages[messages.length - 1]?.id;

                return (
                  <div
                    key={m.id}
                    className={`chat-message-enter flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-civic-lg p-3 text-sm leading-6 ${
                        isUser
                          ? "bg-semantic-primary text-white"
                          : "bg-civic-paper text-civic-text"
                      }`}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{m.content}</p>
                      ) : (
                        <div>
                          {m.content ? (
                            <div
                              className="prose prose-sm max-w-none whitespace-pre-wrap"
                              dangerouslySetInnerHTML={{ __html: m.content }}
                            />
                          ) : isStreaming ? (
                            <span
                              aria-label="Mamak sedang mengetik"
                              className="flex items-center gap-1.5 px-0.5 py-1.5"
                              role="status"
                            >
                              <span
                                className="typing-dot h-2 w-2 bg-civic-textSubtle"
                                style={{ animationDelay: "0ms" }}
                              />
                              <span
                                className="typing-dot h-2 w-2 bg-civic-textSubtle"
                                style={{ animationDelay: "160ms" }}
                              />
                              <span
                                className="typing-dot h-2 w-2 bg-civic-textSubtle"
                                style={{ animationDelay: "320ms" }}
                              />
                            </span>
                          ) : null}
                          {isStreaming && !!m.content && (
                            <span
                              aria-hidden="true"
                              className="typing-cursor"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {messages.length === 0 && (
            <div className="border-t border-civic-line px-4 py-3">
              <p className="mb-2 text-xs font-semibold text-civic-textMuted">
                Pertanyaan cepat
              </p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => send(action.text)}
                    disabled={loading}
                    className="civic-focus-ring rounded-civic border border-civic-line bg-civic-cloud px-3 py-2 text-left text-xs font-medium text-civic-text transition duration-civic hover:border-brand-gold-300 hover:bg-brand-gold-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 border-t border-civic-line bg-civic-paper px-4 py-3">
            <input
              type="text"
              className="civic-focus-ring min-w-0 flex-1 rounded-civic-lg border border-civic-line bg-civic-cloud px-3 py-2 text-sm text-civic-text outline-none placeholder:text-civic-textSubtle disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Ketik pertanyaan Anda..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              disabled={loading}
            />
            <Button
              color="primary"
              isIconOnly
              radius="md"
              onPress={() => send()}
              isDisabled={loading || !input.trim()}
              aria-label="Kirim pertanyaan"
            >
              {loading ? <Spinner size="sm" color="current" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      )}

      <Button
        color={isOpen ? "default" : "primary"}
        radius="md"
        onPress={() => (isOpen ? closePanel() : setPanel("menu"))}
        className="h-12 shadow-civic-md"
        startContent={
          isOpen ? (
            <X className="h-5 w-5" />
          ) : ttsEnabled ? (
            <Accessibility className="h-5 w-5" />
          ) : (
            <MessageCircle className="h-5 w-5" />
          )
        }
        aria-label={isOpen ? "Tutup pusat bantuan" : "Buka pusat bantuan"}
      >
        {isOpen ? "Tutup" : "Bantuan"}
      </Button>
    </div>
  );
}
