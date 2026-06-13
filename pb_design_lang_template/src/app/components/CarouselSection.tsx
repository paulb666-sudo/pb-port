import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Monitor, Tablet, Smartphone } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const SLIDES = [
  { id: 1, title: "Mountain Escape", tag: "Nature", gradient: "from-sky-400 via-blue-500 to-indigo-600", sub: "Patagonia, Argentina" },
  { id: 2, title: "Urban Geometry", tag: "Architecture", gradient: "from-slate-600 via-slate-700 to-slate-900", sub: "Tokyo, Japan" },
  { id: 3, title: "Desert Bloom", tag: "Landscape", gradient: "from-amber-400 via-orange-500 to-red-600", sub: "Atacama, Chile" },
  { id: 4, title: "Ocean Depth", tag: "Seascape", gradient: "from-teal-400 via-cyan-500 to-blue-600", sub: "Maldives" },
  { id: 5, title: "Forest Light", tag: "Nature", gradient: "from-green-400 via-emerald-500 to-teal-600", sub: "Daintree, Australia" },
  { id: 6, title: "City Glow", tag: "Urban", gradient: "from-violet-500 via-purple-600 to-fuchsia-700", sub: "New York, USA" },
];

type CarouselMode = "mobile" | "tablet" | "desktop";

const modeConfig: Record<CarouselMode, { slidesInView: number; label: string; width: string; icon: React.ElementType; breakLabel: string }> = {
  mobile:  { slidesInView: 1,   label: "Mobile",  width: "max-w-xs",  icon: Smartphone, breakLabel: "< 640 px — 1 slide" },
  tablet:  { slidesInView: 2,   label: "Tablet",  width: "max-w-xl",  icon: Tablet,     breakLabel: "640–1023 px — 2 slides" },
  desktop: { slidesInView: 3,   label: "Desktop", width: "max-w-4xl", icon: Monitor,    breakLabel: "≥ 1024 px — 3 slides" },
};

function EmblaCarousel({ mode }: { mode: CarouselMode }) {
  const { slidesInView } = modeConfig[mode];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const slideWidth = slidesInView === 1 ? "100%" : slidesInView === 2 ? "50%" : "33.333%";

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden rounded-xl">
        <div className="flex">
          {SLIDES.map((slide) => (
            <div key={slide.id} className="shrink-0 px-2" style={{ flexBasis: slideWidth }}>
              <div className={`bg-gradient-to-br ${slide.gradient} rounded-xl overflow-hidden`}>
                <div className="flex flex-col justify-between p-5" style={{ aspectRatio: slidesInView === 1 ? "4/3" : "3/4" }}>
                  <Badge variant="secondary" style={{ fontSize: "0.65rem", width: "fit-content" }}>{slide.tag}</Badge>
                  <div>
                    <p className="text-white" style={{ fontWeight: 700, fontSize: slidesInView === 1 ? "1.5rem" : "1rem", lineHeight: 1.2 }}>{slide.title}</p>
                    <p className="text-white/70 mt-1" style={{ fontSize: "0.75rem" }}>{slide.sub}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full shadow-md"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full shadow-md"
        onClick={() => emblaApi?.scrollNext()}
      >
        <ChevronRight className="size-4" />
      </Button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`rounded-full transition-all ${i === selectedIndex ? "bg-primary w-5 h-2" : "bg-muted-foreground/30 w-2 h-2"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function CarouselSection() {
  const [mode, setMode] = useState<CarouselMode>("desktop");
  const cfg = modeConfig[mode];

  return (
    <div>
      <p className="text-muted-foreground mb-6" style={{ fontSize: "0.875rem" }}>
        Carousels adapt their slide count and aspect ratios to the viewport. Switch the mode below to preview how the carousel behaves across device classes.
      </p>

      {/* Mode switcher */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {(Object.keys(modeConfig) as CarouselMode[]).map((m) => {
          const Icon = modeConfig[m].icon;
          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors ${mode === m ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-accent"}`}
            >
              <Icon className="size-4" />
              {modeConfig[m].label}
              <span className="opacity-60" style={{ fontSize: "0.65rem" }}>— {modeConfig[m].breakLabel.split("—")[0].trim()}</span>
            </button>
          );
        })}
      </div>

      {/* Viewport frame */}
      <div className="flex justify-center">
        <div className={`w-full ${cfg.width} transition-all duration-300`}>
          <div className="border-2 border-dashed border-border rounded-2xl p-6 bg-muted/20">
            <div className="flex items-center gap-2 mb-4">
              <cfg.icon className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>{cfg.breakLabel}</span>
              <Badge variant="secondary" style={{ fontSize: "0.6rem" }}>{cfg.slidesInView} slide{cfg.slidesInView > 1 ? "s" : ""} visible</Badge>
            </div>
            <EmblaCarousel key={mode} mode={mode} />
          </div>
        </div>
      </div>

      {/* Breakpoint cheat-sheet */}
      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <p className="uppercase tracking-widest text-muted-foreground mb-4" style={{ fontSize: "0.65rem" }}>Implementation — Responsive Slide Count</p>
        <div className="space-y-2">
          {[
            { bp: "Default (mobile)", css: "slidesToScroll: 1  |  flexBasis: 100%", col: "1 slide" },
            { bp: "sm: 640px (tablet)", css: "slidesToScroll: 1  |  flexBasis: 50%", col: "2 slides" },
            { bp: "lg: 1024px (desktop)", css: "slidesToScroll: 1  |  flexBasis: 33.33%", col: "3 slides" },
          ].map((r) => (
            <div key={r.bp} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
              <span className="w-44 text-muted-foreground" style={{ fontSize: "0.75rem" }}>{r.bp}</span>
              <span className="flex-1 font-mono text-muted-foreground" style={{ fontSize: "0.7rem" }}>{r.css}</span>
              <Badge variant="outline" style={{ fontSize: "0.6rem" }}>{r.col}</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Autoplay variant note */}
      <div className="mt-4 rounded-xl border border-border bg-card p-6">
        <p className="uppercase tracking-widest text-muted-foreground mb-3" style={{ fontSize: "0.65rem" }}>Features Supported</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {["Loop / infinite scroll", "Dot indicators", "Prev / Next buttons", "Touch & drag swipe", "Keyboard navigation", "Autoplay plugin", "Fade transition", "Vertical orientation"].map((f, i) => (
            <div key={f} className="flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
