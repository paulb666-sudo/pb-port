import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

const breakpoints = [
  { prefix: "—", name: "xs / Base", min: "0 px", cols: "1", use: "Mobile phones" },
  { prefix: "sm:", name: "sm", min: "640 px", cols: "2", use: "Large phones / small tablets" },
  { prefix: "md:", name: "md", min: "768 px", cols: "2–3", use: "Tablets (portrait)" },
  { prefix: "lg:", name: "lg", min: "1024 px", cols: "3–4", use: "Laptops / tablets (landscape)" },
  { prefix: "xl:", name: "xl", min: "1280 px", cols: "4–6", use: "Desktop monitors" },
  { prefix: "2xl:", name: "2xl", min: "1536 px", cols: "6–12", use: "Wide / large desktops" },
];

const COLORS = [
  "bg-blue-100 border-blue-300 text-blue-700",
  "bg-violet-100 border-violet-300 text-violet-700",
  "bg-emerald-100 border-emerald-300 text-emerald-700",
  "bg-amber-100 border-amber-300 text-amber-700",
  "bg-rose-100 border-rose-300 text-rose-700",
  "bg-cyan-100 border-cyan-300 text-cyan-700",
  "bg-fuchsia-100 border-fuchsia-300 text-fuchsia-700",
  "bg-lime-100 border-lime-300 text-lime-700",
  "bg-orange-100 border-orange-300 text-orange-700",
  "bg-teal-100 border-teal-300 text-teal-700",
  "bg-indigo-100 border-indigo-300 text-indigo-700",
  "bg-pink-100 border-pink-300 text-pink-700",
];

function Cell({ label, span, i }: { label: string; span?: string; i: number }) {
  return (
    <div className={`border rounded-md flex items-center justify-center py-3 px-2 ${span || ""} ${COLORS[i % COLORS.length]}`}>
      <span style={{ fontSize: "0.7rem" }} className="font-mono">{label}</span>
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return <p className="mb-3 mt-6 uppercase tracking-widest text-muted-foreground" style={{ fontSize: "0.65rem" }}>{text}</p>;
}

export function GridSection() {
  return (
    <div>
      {/* Breakpoints reference table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden mb-8">
        <table className="w-full" style={{ fontSize: "0.8125rem" }}>
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Prefix</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Min-width</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Typical cols</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Use case</th>
            </tr>
          </thead>
          <tbody>
            {breakpoints.map((bp, i) => (
              <tr key={bp.name} className={`border-b border-border last:border-0 ${i === 0 ? "bg-primary/5" : ""}`}>
                <td className="px-4 py-3 font-mono text-primary">{bp.prefix}</td>
                <td className="px-4 py-3">{bp.name}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{bp.min}</td>
                <td className="px-4 py-3 font-mono">{bp.cols}</td>
                <td className="px-4 py-3 text-muted-foreground">{bp.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive grid demo */}
      <div className="rounded-xl border border-border bg-card p-6 mb-6">
        <div className="flex items-center justify-between mb-1">
          <p className="uppercase tracking-widest text-muted-foreground" style={{ fontSize: "0.65rem" }}>Responsive auto-grid</p>
          <div className="flex gap-1.5">
            <Badge variant="secondary" style={{ fontSize: "0.65rem" }}>1-col mobile</Badge>
            <Badge variant="secondary" style={{ fontSize: "0.65rem" }}>2-col tablet</Badge>
            <Badge variant="secondary" style={{ fontSize: "0.65rem" }}>4-col desktop</Badge>
          </div>
        </div>
        <p className="text-muted-foreground mb-4" style={{ fontSize: "0.75rem" }}>
          <span className="font-mono">grid-cols-1 sm:grid-cols-2 lg:grid-cols-4</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {["Card A", "Card B", "Card C", "Card D"].map((label, i) => (
            <div key={label} className={`border rounded-lg p-4 ${COLORS[i]}`}>
              <p className="font-mono" style={{ fontSize: "0.7rem" }}>{label}</p>
              <p className="text-muted-foreground mt-1" style={{ fontSize: "0.65rem" }}>col 1 of 4</p>
            </div>
          ))}
        </div>
      </div>

      {/* 12-column span grid */}
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="uppercase tracking-widest text-muted-foreground mb-4" style={{ fontSize: "0.65rem" }}>12-Column Span Grid</p>

        {/* Row patterns */}
        {[
          { label: "12 cols — full width", cells: [{ label: "col-span-12", span: "col-span-12", i: 0 }] },
          { label: "6 + 6 — halves", cells: [{ label: "span-6", span: "col-span-6", i: 1 }, { label: "span-6", span: "col-span-6", i: 2 }] },
          { label: "4 + 4 + 4 — thirds", cells: [{ label: "span-4", span: "col-span-4", i: 3 }, { label: "span-4", span: "col-span-4", i: 4 }, { label: "span-4", span: "col-span-4", i: 5 }] },
          { label: "3 + 3 + 3 + 3 — quarters", cells: [{ label: "span-3", span: "col-span-3", i: 6 }, { label: "span-3", span: "col-span-3", i: 7 }, { label: "span-3", span: "col-span-3", i: 8 }, { label: "span-3", span: "col-span-3", i: 9 }] },
          { label: "8 + 4 — two-thirds / one-third", cells: [{ label: "span-8", span: "col-span-8", i: 10 }, { label: "span-4", span: "col-span-4", i: 11 }] },
          { label: "9 + 3 — three-quarter / quarter", cells: [{ label: "span-9", span: "col-span-9", i: 0 }, { label: "span-3", span: "col-span-3", i: 1 }] },
          { label: "3 + 6 + 3 — sidebar / content / sidebar", cells: [{ label: "span-3", span: "col-span-3", i: 2 }, { label: "span-6", span: "col-span-6", i: 3 }, { label: "span-3", span: "col-span-3", i: 4 }] },
          { label: "2 + 8 + 2 — narrow / wide / narrow", cells: [{ label: "span-2", span: "col-span-2", i: 5 }, { label: "span-8", span: "col-span-8", i: 6 }, { label: "span-2", span: "col-span-2", i: 7 }] },
        ].map((row) => (
          <div key={row.label} className="mb-3">
            <p className="text-muted-foreground mb-1.5" style={{ fontSize: "0.65rem" }}>{row.label}</p>
            <div className="grid grid-cols-12 gap-1.5">
              {row.cells.map((cell, ci) => (
                <Cell key={ci} label={cell.label} span={cell.span} i={cell.i} />
              ))}
            </div>
          </div>
        ))}

        <Separator className="my-5" />

        {/* Gap reference */}
        <p className="uppercase tracking-widest text-muted-foreground mb-3" style={{ fontSize: "0.65rem" }}>Gap Scale</p>
        <div className="space-y-2">
          {[{ label: "gap-1", px: "4px" }, { label: "gap-2", px: "8px" }, { label: "gap-3", px: "12px" }, { label: "gap-4", px: "16px" }, { label: "gap-6", px: "24px" }, { label: "gap-8", px: "32px" }].map((g, i) => (
            <div key={g.label} className="flex items-center gap-3">
              <span className="font-mono text-muted-foreground w-16" style={{ fontSize: "0.7rem" }}>{g.label}</span>
              <span className="text-muted-foreground w-10" style={{ fontSize: "0.7rem" }}>{g.px}</span>
              <div className={`flex flex-1`} style={{ gap: g.px }}>
                {[0, 1, 2].map((j) => <div key={j} className={`h-6 flex-1 rounded ${COLORS[(i + j) % COLORS.length]}`} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
