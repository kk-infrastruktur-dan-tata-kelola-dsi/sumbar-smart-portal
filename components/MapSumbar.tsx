"use client";

import React from "react";

type KabupatenItem = {
  key: string;
  name: string;
  lat: number;
  lng: number;
  color: string;
  itemCount?: number; // Number of budaya items in this kabupaten
};

export default function MapSumbar({
  items,
  onSelect,
  selectedKey,
  debug = false,
}: {
  items: KabupatenItem[];
  onSelect: (key: string) => void;
  selectedKey?: string | null;
  debug?: boolean;
}) {
  const center: [number, number] = [-0.7399, 100.3835]; // sekitar Sumbar

  const [mounted, setMounted] = React.useState(false);
  const [Lmods, setLmods] = React.useState<any | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<any | null>(null);
  const markersLayerRef = React.useRef<any | null>(null);

  // Mount flag and CSS injection (client only)
  React.useEffect(() => {
    setMounted(true);

    const cssId = "leaflet-css";

    if (typeof document !== "undefined" && !document.getElementById(cssId)) {
      const link = document.createElement("link");

      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.onload = () => {
        if (debug) console.info("[MapSumbar] Leaflet CSS loaded successfully");
      };
      link.onerror = (e) => {
        console.warn(
          "[MapSumbar] Failed to load Leaflet CSS. Interactivity/markers may be broken.",
          e,
        );
      };
      document.head.appendChild(link);
    }

    // Add custom styles for pin markers and tooltips
    const styleId = "leaflet-custom-pin";

    if (typeof document !== "undefined" && !document.getElementById(styleId)) {
      const style = document.createElement("style");

      style.id = styleId;
      style.textContent = `
        .custom-pin-icon {
          background: transparent !important;
          border: none !important;
          z-index: 1000 !important;
          pointer-events: auto !important;
        }
        .custom-pin-icon > div {
          pointer-events: auto !important;
        }
        /* Ensure Chrome/Edge allow clicking inside custom marker SVG */
        .leaflet-marker-pane .custom-pin-icon,
        .leaflet-marker-pane .custom-pin-icon * {
          pointer-events: auto !important;
        }
        .leaflet-pane .leaflet-marker-icon,
        .leaflet-pane .leaflet-marker-icon * {
          pointer-events: auto !important;
        }
        .custom-pin-icon svg {
          cursor: pointer !important;
          transition: all 0.2s ease;
          pointer-events: auto !important;
        }
        .custom-pin-icon:hover svg {
          transform: scale(1.15);
        }
        .custom-tooltip {
          background: rgba(255, 255, 255, 0.98) !important;
          border: 2px solid rgba(0, 0, 0, 0.1) !important;
          border-radius: 8px !important;
          padding: 8px 12px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
          font-family: inherit !important;
        }
        .custom-tooltip::before {
          border-top-color: rgba(255, 255, 255, 0.98) !important;
        }
        .leaflet-tooltip-top::before {
          border-top-color: rgba(255, 255, 255, 0.98) !important;
        }
        /* Safety: make sure map container/panes accept pointer events in Chromium */
        .leaflet-container,
        .leaflet-pane,
        .leaflet-pane * {
          pointer-events: auto !important;
        }
        .leaflet-container {
          touch-action: auto !important;
          -ms-touch-action: manipulation !important;
          cursor: grab;
        }
        /* Visual feedback on marker interaction */
        .custom-pin-icon:hover {
          transform: scale(1.05);
          transition: transform 0.2s ease;
        }
        .custom-pin-icon:active {
          transform: scale(0.95);
          transition: transform 0.1s ease;
        }
        .custom-pin-icon {
          transition: transform 0.2s ease;
        }
      `;
      document.head.appendChild(style);
    }

    let cancelled = false;

    import("leaflet")
      .then((L) => {
        if (!cancelled) {
          if (debug)
            console.info("[MapSumbar] Leaflet module loaded", {
              ua: navigator.userAgent,
            });
          setLmods(L);
        }
      })
      .catch(() => {
        console.warn(
          "[MapSumbar] Failed to dynamically import 'leaflet'. Map will not render.",
        );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Initialize map once
  React.useEffect(() => {
    if (!mounted || !Lmods || !containerRef.current) return;
    if (mapRef.current) return; // already initialized

    const L = Lmods.default || Lmods;

    // Make sure container is interactive and focusable (helps a11y and some Chromium edge cases)
    try {
      containerRef.current.style.pointerEvents = "auto";
      containerRef.current.style.zIndex = "0";
      containerRef.current.setAttribute("tabindex", "0");
      containerRef.current.setAttribute("role", "application");
    } catch {}

    const map = L.map(containerRef.current, {
      center,
      zoom: 7.5, // Slightly zoomed out for better spacing
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapRef.current = map;

    if (debug) {
      console.info("[MapSumbar] Map initialized", {
        center,
        zoom: map.getZoom(),
      });

      const rect = containerRef.current?.getBoundingClientRect();
      const cs = containerRef.current
        ? window.getComputedStyle(containerRef.current)
        : null;

      console.info("[MapSumbar] Container metrics", {
        rect,
        pointerEvents: cs?.pointerEvents,
        zIndex: cs?.zIndex,
      });

      // Log map click events
      map.on("click", (e: any) => {
        console.debug("[MapSumbar] Map click", e?.latlng);
      });

      // Capture click at container level and show overlay element stack
      const onContainerClick = (ev: MouseEvent) => {
        const { clientX, clientY } = ev;
        // @ts-ignore elementsFromPoint exists in all target browsers
        const stack = document.elementsFromPoint(
          clientX,
          clientY,
        ) as HTMLElement[];
        const summary = stack.slice(0, 8).map((el) => ({
          tag: el.tagName,
          id: el.id,
          class: el.className,
          z: window.getComputedStyle(el).zIndex,
          pe: window.getComputedStyle(el).pointerEvents,
        }));

        console.debug("[MapSumbar] Click stack (top->bottom)", summary);
      };

      containerRef.current?.addEventListener("click", onContainerClick, {
        capture: true,
      });

      // Cleanup
      return () => {
        containerRef.current?.removeEventListener("click", onContainerClick, {
          capture: true,
        } as any);
      };
    }

    return () => {
      try {
        map.remove();
      } catch {}
      mapRef.current = null;
    };
  }, [mounted, Lmods]);

  // Render/Update markers with custom colored pins and permanent labels
  React.useEffect(() => {
    if (!mapRef.current || !Lmods) return;
    const L = Lmods.default || Lmods;

    // Clear previous layer
    if (markersLayerRef.current) {
      markersLayerRef.current.remove();
      markersLayerRef.current = null;
    }

    const layer = L.layerGroup();

    items.forEach((kab: any) => {
      const fill = kab.color ?? "var(--color-civic-primary)";
      const isSel = selectedKey === kab.key;
      const itemCount = kab.itemCount || 0;

      if (debug) {
        console.info("[MapSumbar] Creating marker", { key: kab.key, fill });
      }

      // USE CIRCLEMARKER - native Leaflet, clicks work reliably in Chrome!
      const marker = L.circleMarker([kab.lat, kab.lng], {
        radius: isSel ? 12 : 10,
        fillColor: fill,
        fillOpacity: 0.9,
        color: isSel
          ? "var(--color-civic-primary)"
          : "var(--color-civic-cloud)",
        weight: isSel ? 3 : 2,
        interactive: true,
        bubblingMouseEvents: false,
      }).addTo(layer);

      // Tooltip on hover (shows kabupaten name + count)
      const tooltipContent = `<div style="text-align: center;"><strong>${kab.name}</strong><br/><span style="font-size: 11px; color: var(--color-civic-text-muted);">${itemCount} item budaya</span></div>`;

      marker.bindTooltip(tooltipContent, {
        direction: "top",
        offset: [0, -15],
        opacity: 0.95,
        className: "custom-tooltip",
      });

      // Store marker data
      (marker as any)._kabKey = kab.key;
      (marker as any)._kabName = kab.name;

      // Click handler - works in all browsers with CircleMarker!
      marker.on("click", (e: any) => {
        if (debug) {
          console.info("[MapSumbar] CircleMarker clicked", { key: kab.key });
        }
        L.DomEvent.stopPropagation(e);
        try {
          onSelect(kab.key);
        } catch (err) {
          console.error("[MapSumbar] Error in marker click:", err);
        }
      });

      // Hover effect - enlarge circle slightly
      marker.on("mouseover", () => {
        if (!isSel) {
          marker.setStyle({ radius: 12 });
        }
      });

      marker.on("mouseout", () => {
        if (!isSel) {
          marker.setStyle({ radius: 10 });
        }
      });
    });

    layer.addTo(mapRef.current);
    markersLayerRef.current = layer;

    if (debug) {
      console.info("[MapSumbar] Rendered CircleMarkers", {
        count: items.length,
        keys: items.map((item) => item.key),
        selectedKey,
      });
    }
  }, [items, selectedKey, Lmods, onSelect, debug]);

  // Don't render on server to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="relative bg-civic-stone"
      style={{ height: "100%", width: "100%" }}
    />
  );
}
