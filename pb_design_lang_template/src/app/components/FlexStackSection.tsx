import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";

const COLORS = [
  "bg-blue-100 border border-blue-200 text-blue-700",
  "bg-violet-100 border border-violet-200 text-violet-700",
  "bg-emerald-100 border border-emerald-200 text-emerald-700",
  "bg-amber-100 border border-amber-200 text-amber-700",
  "bg-rose-100 border border-rose-200 text-rose-700",
];

function Box({ i, label, wide }: { i: number; label?: string; wide?: boolean }) {
  return (
    <div className={`rounded-md flex items-center justify-center ${wide ? "px-6 py-3" : "w-12 h-12"} ${COLORS[i % COLORS.length]}`}>
      <span style={{ fontSize: "0.65rem" }} className="font-mono">{label ?? String.fromCharCode(65 + i)}</span>
    </div>
  );
}

function Demo({ code, children }: { code: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="font-mono text-muted-foreground mb-2" style={{ fontSize: "0.7rem" }}>{code}</p>
      <div className="rounded-lg border border-border bg-muted/30 p-4">{children}</div>
    </div>
  );
}

function SubLabel({ text }: { text: string }) {
  return <p className="uppercase tracking-widest text-muted-foreground mb-3 mt-6" style={{ fontSize: "0.65rem" }}>{text}</p>;
}

export function FlexStackSection() {
  return (
    <div className="space-y-2">

      {/* ── FLEX ROW ── */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <p className="uppercase tracking-widest text-muted-foreground" style={{ fontSize: "0.65rem" }}>Flex Row — Justify</p>
          <Badge variant="secondary" style={{ fontSize: "0.6rem" }}>flex flex-row</Badge>
        </div>

        {[
          { label: "justify-start", cls: "justify-start" },
          { label: "justify-center", cls: "justify-center" },
          { label: "justify-end", cls: "justify-end" },
          { label: "justify-between", cls: "justify-between" },
          { label: "justify-around", cls: "justify-around" },
          { label: "justify-evenly", cls: "justify-evenly" },
        ].map((j) => (
          <Demo key={j.label} code={`flex ${j.label}`}>
            <div className={`flex gap-2 ${j.cls}`}>
              {[0, 1, 2].map((i) => <Box key={i} i={i} />)}
            </div>
          </Demo>
        ))}
      </div>

      {/* ── FLEX ROW — Align ── */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <p className="uppercase tracking-widest text-muted-foreground" style={{ fontSize: "0.65rem" }}>Flex Row — Align Items (cross-axis)</p>
        </div>
        {[
          { label: "items-start", cls: "items-start" },
          { label: "items-center", cls: "items-center" },
          { label: "items-end", cls: "items-end" },
          { label: "items-stretch", cls: "items-stretch" },
          { label: "items-baseline", cls: "items-baseline" },
        ].map((a) => (
          <Demo key={a.label} code={`flex ${a.label}`}>
            <div className={`flex gap-2 h-20 ${a.cls}`}>
              {[0, 1, 2].map((i) => (
                <div key={i} className={`rounded-md flex items-center justify-center px-3 ${COLORS[i]}`} style={{ height: i === 1 ? "100%" : i === 2 ? "60%" : "35%" }}>
                  <span style={{ fontSize: "0.65rem" }} className="font-mono">{String.fromCharCode(65 + i)}</span>
                </div>
              ))}
            </div>
          </Demo>
        ))}
      </div>

      {/* ── FLEX COLUMN ── */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <p className="uppercase tracking-widest text-muted-foreground" style={{ fontSize: "0.65rem" }}>Flex Column</p>
          <Badge variant="secondary" style={{ fontSize: "0.6rem" }}>flex flex-col</Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "flex-col justify-start", jcls: "justify-start" },
            { label: "flex-col justify-between", jcls: "justify-between" },
          ].map((j) => (
            <Demo key={j.label} code={j.label}>
              <div className={`flex flex-col gap-2 h-40 ${j.jcls}`}>
                {[0, 1, 2].map((i) => (
                  <div key={i} className={`rounded-md flex items-center justify-center py-2 ${COLORS[i]}`}>
                    <span style={{ fontSize: "0.65rem" }} className="font-mono">{String.fromCharCode(65 + i)}</span>
                  </div>
                ))}
              </div>
            </Demo>
          ))}
        </div>
      </div>

      {/* ── FLEX WRAP ── */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <p className="uppercase tracking-widest text-muted-foreground" style={{ fontSize: "0.65rem" }}>Flex Wrap</p>
        </div>
        <Demo code="flex flex-wrap gap-2">
          <div className="flex flex-wrap gap-2">
            {["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota"].map((name, i) => (
              <Box key={name} i={i} label={name} wide />
            ))}
          </div>
        </Demo>
        <Demo code="flex flex-nowrap (overflow, no wrap)">
          <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
            {["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta"].map((name, i) => (
              <Box key={name} i={i} label={name} wide />
            ))}
          </div>
        </Demo>
      </div>

      {/* ── STACK ── */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <p className="uppercase tracking-widest text-muted-foreground" style={{ fontSize: "0.65rem" }}>Stack — Managed Spacing</p>
          <Badge variant="secondary" style={{ fontSize: "0.6rem" }}>space-y / space-x</Badge>
        </div>

        <SubLabel text="Vertical Stack — space-y scale" />
        <div className="grid grid-cols-3 gap-4">
          {[{ gap: "space-y-1", label: "4px" }, { gap: "space-y-3", label: "12px" }, { gap: "space-y-6", label: "24px" }].map((s) => (
            <Demo key={s.gap} code={`${s.gap} (${s.label})`}>
              <div className={s.gap}>
                {[0, 1, 2].map((i) => (
                  <div key={i} className={`rounded-md flex items-center justify-center py-2 ${COLORS[i]}`}>
                    <span style={{ fontSize: "0.65rem" }} className="font-mono">{String.fromCharCode(65 + i)}</span>
                  </div>
                ))}
              </div>
            </Demo>
          ))}
        </div>

        <SubLabel text="Horizontal Stack — space-x scale" />
        <div className="grid grid-cols-3 gap-4">
          {[{ gap: "space-x-1", label: "4px" }, { gap: "space-x-3", label: "12px" }, { gap: "space-x-6", label: "24px" }].map((s) => (
            <Demo key={s.gap} code={`${s.gap} (${s.label})`}>
              <div className={`flex ${s.gap}`}>
                {[0, 1, 2].map((i) => <Box key={i} i={i} />)}
              </div>
            </Demo>
          ))}
        </div>

        <Separator className="my-5" />

        <SubLabel text="Flex Grow &amp; Shrink" />
        <Demo code="flex — grow, shrink-0, flex-1">
          <div className="flex gap-2 items-center">
            <div className="flex items-center justify-center shrink-0 w-20 h-10 rounded-md bg-blue-100 border border-blue-200">
              <span style={{ fontSize: "0.65rem" }} className="font-mono text-blue-700">shrink-0</span>
            </div>
            <div className="flex-1 flex items-center justify-center h-10 rounded-md bg-violet-100 border border-violet-200">
              <span style={{ fontSize: "0.65rem" }} className="font-mono text-violet-700">flex-1 (grows)</span>
            </div>
            <div className="grow flex items-center justify-center h-10 rounded-md bg-emerald-100 border border-emerald-200">
              <span style={{ fontSize: "0.65rem" }} className="font-mono text-emerald-700">grow</span>
            </div>
          </div>
        </Demo>

        <SubLabel text="Self Align — individual item override" />
        <Demo code="flex items-start — with self-center / self-end overrides">
          <div className="flex gap-2 items-start h-24">
            {[
              { cls: "", label: "default" },
              { cls: "self-center", label: "self-center" },
              { cls: "self-end", label: "self-end" },
              { cls: "self-stretch", label: "self-stretch" },
            ].map((item, i) => (
              <div key={item.label} className={`flex-1 rounded-md flex items-center justify-center ${item.cls} ${COLORS[i]}`} style={{ minHeight: "2.5rem" }}>
                <span style={{ fontSize: "0.6rem" }} className="font-mono">{item.label}</span>
              </div>
            ))}
          </div>
        </Demo>
      </div>
    </div>
  );
}
