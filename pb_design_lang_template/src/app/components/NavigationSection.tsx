import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import {
  LayoutDashboard, BarChart2, Users, Settings, Bell, X, Menu,
  ChevronRight, Search, LogOut, Home, Layers,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, badge: null },
  { label: "Analytics", icon: BarChart2, badge: "New" },
  { label: "Team", icon: Users, badge: "3" },
  { label: "Notifications", icon: Bell, badge: "12" },
  { label: "Settings", icon: Settings, badge: null },
];

function SectionLabel({ text }: { text: string }) {
  return <p className="uppercase tracking-widest text-muted-foreground mb-4 mt-8 first:mt-0" style={{ fontSize: "0.65rem" }}>{text}</p>;
}

/* ─────────────── HORIZONTAL NAV (Top Bar) ─────────────── */
function HorizontalNav({ active, setActive }: { active: string; setActive: (l: string) => void }) {
  return (
    <nav className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center px-4 h-14 gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="size-7 rounded-md bg-primary flex items-center justify-center">
            <Layers className="size-4 text-primary-foreground" />
          </div>
          <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>Acme</span>
        </div>

        {/* Links */}
        <div className="flex-1 flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActive(item.label)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors relative ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"}`}
                style={{ fontSize: "0.8125rem" }}
              >
                <Icon className="size-3.5" />
                {item.label}
                {item.badge && (
                  <span className="ml-0.5 bg-primary text-primary-foreground rounded-full px-1.5" style={{ fontSize: "0.6rem", lineHeight: 1.6 }}>{item.badge}</span>
                )}
                {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
              </button>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" variant="ghost" className="size-8 p-0"><Search className="size-4" /></Button>
          <Button size="sm">Sign up</Button>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────── HORIZONTAL NAV — Underline variant ─────────────── */
function HorizontalNavUnderline({ active, setActive }: { active: string; setActive: (l: string) => void }) {
  return (
    <nav className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center px-4 h-14 gap-6 border-b border-border">
        <div className="flex items-center gap-2 shrink-0">
          <div className="size-7 rounded-md bg-primary flex items-center justify-center">
            <Home className="size-4 text-primary-foreground" />
          </div>
          <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>Brand</span>
        </div>
        <div className="flex-1 flex items-center">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActive(item.label)}
                className={`flex items-center gap-1.5 px-3 h-14 border-b-2 transition-colors ${isActive ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}
                style={{ fontSize: "0.8125rem" }}
              >
                <Icon className="size-3.5" />
                {item.label}
                {item.badge && (
                  <Badge variant="secondary" style={{ fontSize: "0.55rem", padding: "1px 5px" }}>{item.badge}</Badge>
                )}
              </button>
            );
          })}
        </div>
        <Button size="sm" variant="outline">Login</Button>
      </div>

      {/* Sub-content preview */}
      <div className="px-6 py-3 bg-muted/30 flex items-center gap-2">
        <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>Viewing:</span>
        <ChevronRight className="size-3 text-muted-foreground" />
        <span style={{ fontSize: "0.75rem" }}>{active}</span>
      </div>
    </nav>
  );
}

/* ─────────────── VERTICAL NAV (Sidebar) ─────────────── */
function VerticalNav({ active, setActive }: { active: string; setActive: (l: string) => void }) {
  return (
    <div className="w-56 bg-card border border-border rounded-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-md bg-primary flex items-center justify-center">
            <Layers className="size-4 text-primary-foreground" />
          </div>
          <div>
            <p style={{ fontSize: "0.875rem", fontWeight: 600, lineHeight: 1.2 }}>Acme App</p>
            <p className="text-muted-foreground" style={{ fontSize: "0.65rem" }}>workspace</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-3 border-b border-border">
        <div className="flex items-center gap-2 bg-muted rounded-md px-3 py-1.5">
          <Search className="size-3.5 text-muted-foreground" />
          <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>Search…</span>
        </div>
      </div>

      {/* Links */}
      <nav className="flex-1 p-2">
        <p className="px-2 py-1 text-muted-foreground uppercase tracking-widest" style={{ fontSize: "0.6rem" }}>Main</p>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md mb-0.5 transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"}`}
              style={{ fontSize: "0.8125rem" }}
            >
              <Icon className="size-4 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className={`rounded-full px-1.5 text-center ${isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`} style={{ fontSize: "0.6rem", lineHeight: 1.6 }}>
                  {item.badge}
                </span>
              )}
              {isActive && <ChevronRight className="size-3 shrink-0" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors" style={{ fontSize: "0.8125rem" }}>
          <LogOut className="size-4 shrink-0" />
          Sign out
        </button>
      </div>
    </div>
  );
}

/* ─────────────── HAMBURGER MENU (Mobile) ─────────────── */
function HamburgerMenu({ active, setActive }: { active: string; setActive: (l: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Simulated mobile frame */}
      <div className="max-w-xs mx-auto border-2 border-border rounded-2xl overflow-hidden" style={{ fontFamily: "system-ui" }}>
        {/* Top bar */}
        <div className="bg-card border-b border-border flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-primary flex items-center justify-center">
              <Layers className="size-4 text-primary-foreground" />
            </div>
            <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>Acme</span>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center size-9 rounded-md hover:bg-accent transition-colors text-foreground"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Drawer */}
        <div
          className="bg-card overflow-hidden transition-all duration-300"
          style={{ maxHeight: open ? "360px" : "0px" }}
        >
          <div className="px-3 pt-2 pb-4">
            {/* Search */}
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 mb-3">
              <Search className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>Search…</span>
            </div>
            <Separator className="mb-2" />
            {NAV_ITEMS.map((item, i) => {
              const Icon = item.icon;
              const isActive = active === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => { setActive(item.label); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-accent/50"}`}
                  style={{ fontSize: "0.9375rem" }}
                >
                  <Icon className="size-5 shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="bg-primary text-primary-foreground rounded-full px-2" style={{ fontSize: "0.65rem", lineHeight: 1.8 }}>{item.badge}</span>
                  )}
                  <ChevronRight className={`size-4 text-muted-foreground transition-transform ${isActive ? "rotate-90" : ""}`} />
                </button>
              );
            })}
            <Separator className="my-2" />
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors" style={{ fontSize: "0.9375rem" }}>
              <LogOut className="size-5" />
              Sign out
            </button>
          </div>
        </div>

        {/* Page content stub */}
        <div className="bg-background px-4 py-6 min-h-32">
          <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>Active page:</p>
          <p style={{ fontSize: "1rem", fontWeight: 600 }}>{active}</p>
          <p className="text-muted-foreground mt-2" style={{ fontSize: "0.75rem" }}>
            {open ? "Menu is open — tap any item or the ✕ to close." : "Tap the ☰ icon above to open the navigation menu."}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2 flex-wrap justify-center">
        <Badge variant="secondary" style={{ fontSize: "0.65rem" }}>CSS max-height transition</Badge>
        <Badge variant="secondary" style={{ fontSize: "0.65rem" }}>X / ☰ icon swap</Badge>
        <Badge variant="secondary" style={{ fontSize: "0.65rem" }}>Closes on item select</Badge>
        <Badge variant="secondary" style={{ fontSize: "0.65rem" }}>Active state persisted</Badge>
      </div>
    </div>
  );
}

/* ─────────────── FIXED vs RELATIVE note ─────────────── */
function PositioningNote() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <table className="w-full" style={{ fontSize: "0.8125rem" }}>
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Property</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">position: fixed</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">position: relative / sticky</th>
          </tr>
        </thead>
        <tbody>
          {[
            { prop: "Scroll behaviour", fixed: "Stays on screen — always visible", rel: "Scrolls with content" },
            { prop: "Layout flow", fixed: "Removed from flow — overlaps content", rel: "Stays in document flow" },
            { prop: "z-index needed", fixed: "Yes — set high (e.g. z-50)", rel: "Usually no" },
            { prop: "Body padding needed", fixed: "Yes — pad-top: nav height", rel: "No extra padding" },
            { prop: "Best for", fixed: "Top nav bars, mobile bottom tabs", rel: "In-page section headers" },
            { prop: "Sticky variant", fixed: "—", rel: "Stays at top of scroll container (sticky)" },
            { prop: "Tailwind class", fixed: "fixed top-0 left-0 right-0 z-50", rel: "relative  or  sticky top-0" },
          ].map((row, i) => (
            <tr key={row.prop} className="border-b border-border last:border-0">
              <td className="px-4 py-3 font-medium">{row.prop}</td>
              <td className="px-4 py-3 text-muted-foreground">{row.fixed}</td>
              <td className="px-4 py-3 text-muted-foreground">{row.rel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────── MAIN EXPORT ─────────────── */
export function NavigationSection() {
  const [hActive, setHActive] = useState("Dashboard");
  const [hActive2, setHActive2] = useState("Analytics");
  const [vActive, setVActive] = useState("Dashboard");
  const [mActive, setMActive] = useState("Dashboard");

  return (
    <div>
      <SectionLabel text="Horizontal Navigation — Pill Variant" />
      <HorizontalNav active={hActive} setActive={setHActive} />

      <SectionLabel text="Horizontal Navigation — Underline Variant" />
      <HorizontalNavUnderline active={hActive2} setActive={setHActive2} />

      <SectionLabel text="Vertical Navigation — Sidebar" />
      <div className="flex gap-4">
        <VerticalNav active={vActive} setActive={setVActive} />
        <div className="flex-1 rounded-xl border border-border bg-card p-6 flex items-center justify-center text-muted-foreground" style={{ fontSize: "0.875rem" }}>
          Content area for: <strong className="ml-1 text-foreground">{vActive}</strong>
        </div>
      </div>

      <SectionLabel text="Hamburger Menu — Mobile (tap to toggle)" />
      <HamburgerMenu active={mActive} setActive={setMActive} />

      <SectionLabel text="Fixed vs Relative Positioning" />
      <PositioningNote />
    </div>
  );
}
