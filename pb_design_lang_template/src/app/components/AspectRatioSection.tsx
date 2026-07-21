import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { Badge } from "../components/ui/badge";

const ratios = [
  { label: "1 : 1", ratio: 1 / 1, name: "Square", use: "Avatars, thumbnails, icons", color: "from-blue-400 to-violet-500" },
  { label: "4 : 3", ratio: 4 / 3, name: "Traditional", use: "Presentations, legacy video, photos", color: "from-emerald-400 to-teal-500" },
  { label: "16 : 9", ratio: 16 / 9, name: "Widescreen", use: "YouTube, TV, modern video", color: "from-amber-400 to-orange-500" },
  { label: "3 : 2", ratio: 3 / 2, name: "Photo", use: "DSLR photos, print, product shots", color: "from-rose-400 to-pink-500" },
  { label: "21 : 9", ratio: 21 / 9, name: "Ultrawide", use: "Cinematic film, hero banners", color: "from-cyan-400 to-sky-500" },
  { label: "9 : 16", ratio: 9 / 16, name: "Portrait / Mobile", use: "Stories, Reels, TikTok, mobile UI", color: "from-fuchsia-400 to-purple-500" },
  { label: "3 : 4", ratio: 3 / 4, name: "Portrait Print", use: "Magazine covers, posters, cards", color: "from-lime-400 to-green-500" },
  { label: "2 : 1", ratio: 2 / 1, name: "Panoramic", use: "Open-graph images, map tiles", color: "from-indigo-400 to-blue-500" },
];

function RatioCard({ label, ratio, name, use, color }: typeof ratios[0]) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4">
        <AspectRatioPrimitive.Root ratio={ratio}>
          <div className={`w-full h-full rounded-lg bg-gradient-to-br ${color} flex flex-col items-center justify-center gap-2`}>
            <span className="text-white font-mono" style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em" }}>{label}</span>
            <span className="text-white/70" style={{ fontSize: "0.7rem" }}>{name}</span>
          </div>
        </AspectRatioPrimitive.Root>
      </div>
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <p style={{ fontSize: "0.875rem" }}>{name}</p>
          <Badge variant="outline" style={{ fontSize: "0.6rem" }}>{label}</Badge>
        </div>
        <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>{use}</p>
        <p className="font-mono text-muted-foreground mt-1" style={{ fontSize: "0.65rem" }}>ratio={`{${ratio.toFixed(4)}}`}</p>
      </div>
    </div>
  );
}

export function AspectRatioSection() {
  return (
    <div>
      <p className="text-muted-foreground mb-6" style={{ fontSize: "0.875rem" }}>
        Aspect ratio containers preserve proportions regardless of width. Built on{" "}
        <span className="font-mono">@radix-ui/react-aspect-ratio</span>.
        Resize the preview to see them respond.
      </p>

      {/* Landscape / square ratios */}
      <p className="uppercase tracking-widest text-muted-foreground mb-3" style={{ fontSize: "0.65rem" }}>Landscape &amp; Square</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {ratios.filter((r) => r.ratio >= 1).map((r) => <RatioCard key={r.label} {...r} />)}
      </div>

      {/* Portrait ratios */}
      <p className="uppercase tracking-widest text-muted-foreground mb-3" style={{ fontSize: "0.65rem" }}>Portrait</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-8">
        {ratios.filter((r) => r.ratio < 1).map((r) => <RatioCard key={r.label} {...r} />)}
      </div>

      {/* Composition example */}
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="uppercase tracking-widest text-muted-foreground mb-4" style={{ fontSize: "0.65rem" }}>Composition — Image grid with mixed ratios</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <AspectRatioPrimitive.Root ratio={16 / 9}>
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-end p-3">
                <div>
                  <Badge variant="secondary" style={{ fontSize: "0.6rem" }}>16:9 Hero</Badge>
                  <p className="text-white mt-1" style={{ fontSize: "0.75rem" }}>Main feature image</p>
                </div>
              </div>
            </AspectRatioPrimitive.Root>
          </div>
          <div className="flex flex-col gap-3">
            <AspectRatioPrimitive.Root ratio={4 / 3}>
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 flex items-end p-2">
                <Badge variant="secondary" style={{ fontSize: "0.55rem" }}>4:3</Badge>
              </div>
            </AspectRatioPrimitive.Root>
            <AspectRatioPrimitive.Root ratio={4 / 3}>
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-end p-2">
                <Badge variant="secondary" style={{ fontSize: "0.55rem" }}>4:3</Badge>
              </div>
            </AspectRatioPrimitive.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
