import { useState } from "react";
import { Slider } from "../components/ui/slider";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function NumericSlider({
  label,
  min,
  max,
  step,
  defaultValue,
  unit = "",
  color = "bg-primary",
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
  color?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const pct = ((value - min) / (max - min)) * 100;

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const n = parseFloat(e.target.value);
    if (!isNaN(n)) setValue(clamp(n, min, max));
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <Label>{label}</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={handleInput}
            className="w-24 text-center h-8"
            style={{ fontSize: "0.875rem" }}
          />
          {unit && <span className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>{unit}</span>}
        </div>
      </div>

      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => setValue(v)}
        className="mb-3"
      />

      {/* Track labels */}
      <div className="flex justify-between text-muted-foreground" style={{ fontSize: "0.7rem" }}>
        <span className="font-mono">{min}{unit}</span>
        <span className="font-mono text-primary">{value}{unit}</span>
        <span className="font-mono">{max}{unit}</span>
      </div>

      {/* Progress bar visual */}
      <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>

      <div className="mt-3 flex gap-2 flex-wrap">
        <Badge variant="secondary" style={{ fontSize: "0.65rem" }}>min: {min}{unit}</Badge>
        <Badge variant="secondary" style={{ fontSize: "0.65rem" }}>max: {max}{unit}</Badge>
        <Badge variant="secondary" style={{ fontSize: "0.65rem" }}>step: {step}</Badge>
      </div>
    </div>
  );
}

function RangeSlider() {
  const [range, setRange] = useState([20, 75]);

  function handleMin(e: React.ChangeEvent<HTMLInputElement>) {
    const v = clamp(parseFloat(e.target.value) || 0, 0, range[1] - 1);
    setRange([v, range[1]]);
  }
  function handleMax(e: React.ChangeEvent<HTMLInputElement>) {
    const v = clamp(parseFloat(e.target.value) || 100, range[0] + 1, 100);
    setRange([range[0], v]);
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <Label>Price Range</Label>
        <div className="flex items-center gap-2">
          <Input type="number" value={range[0]} min={0} max={range[1] - 1} onChange={handleMin} className="w-20 text-center h-8" style={{ fontSize: "0.875rem" }} />
          <span className="text-muted-foreground">—</span>
          <Input type="number" value={range[1]} min={range[0] + 1} max={100} onChange={handleMax} className="w-20 text-center h-8" style={{ fontSize: "0.875rem" }} />
          <span className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>$</span>
        </div>
      </div>

      <Slider
        value={range}
        min={0}
        max={100}
        step={1}
        onValueChange={setRange}
        className="mb-3"
      />

      <div className="flex justify-between text-muted-foreground" style={{ fontSize: "0.7rem" }}>
        <span className="font-mono">$0</span>
        <span className="font-mono text-primary">${range[0]} – ${range[1]}</span>
        <span className="font-mono">$100</span>
      </div>

      <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-primary transition-all"
          style={{ marginLeft: `${range[0]}%`, width: `${range[1] - range[0]}%` }}
        />
      </div>

      <div className="mt-3 flex gap-2 flex-wrap">
        <Badge variant="secondary" style={{ fontSize: "0.65rem" }}>2 thumbs</Badge>
        <Badge variant="secondary" style={{ fontSize: "0.65rem" }}>range: ${range[0]}–${range[1]}</Badge>
        <Badge variant="secondary" style={{ fontSize: "0.65rem" }}>span: ${range[1] - range[0]}</Badge>
      </div>
    </div>
  );
}

function StepSlider() {
  const [step, setStep] = useState(3);
  const steps = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <Label>Size selector</Label>
        <Badge>{steps[step]}</Badge>
      </div>

      <Slider value={[step]} min={0} max={steps.length - 1} step={1} onValueChange={([v]) => setStep(v)} className="mb-4" />

      <div className="flex justify-between">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={`text-center transition-colors rounded px-1 py-0.5 ${i === step ? "text-primary" : "text-muted-foreground"}`}
            style={{ fontSize: "0.7rem", fontWeight: i === step ? 600 : 400 }}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <Badge variant="secondary" style={{ fontSize: "0.65rem" }}>discrete steps</Badge>
        <Badge variant="secondary" style={{ fontSize: "0.65rem" }}>{steps.length} options</Badge>
      </div>
    </div>
  );
}

function ColorMixer() {
  const [r, setR] = useState(99);
  const [g, setG] = useState(102);
  const [b, setB] = useState(241);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <Label>RGB Color Mixer</Label>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md border border-border" style={{ background: `rgb(${r},${g},${b})` }} />
          <span className="font-mono text-muted-foreground" style={{ fontSize: "0.75rem" }}>rgb({r},{g},{b})</span>
        </div>
      </div>

      {[
        { label: "R", val: r, set: setR, color: "bg-red-500" },
        { label: "G", val: g, set: setG, color: "bg-green-500" },
        { label: "B", val: b, set: setB, color: "bg-blue-500" },
      ].map((ch) => (
        <div key={ch.label} className="mb-4 last:mb-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>{ch.label}</span>
            <Input
              type="number"
              value={ch.val}
              min={0}
              max={255}
              onChange={(e) => ch.set(clamp(parseInt(e.target.value) || 0, 0, 255))}
              className="w-16 text-center h-7"
              style={{ fontSize: "0.75rem" }}
            />
          </div>
          <Slider value={[ch.val]} min={0} max={255} step={1} onValueChange={([v]) => ch.set(v)} />
          <div className="mt-1 h-1 rounded-full overflow-hidden bg-muted">
            <div className={`h-full ${ch.color} transition-all`} style={{ width: `${(ch.val / 255) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function NumericSliderSection() {
  return (
    <div>
      <p className="text-muted-foreground mb-6" style={{ fontSize: "0.875rem" }}>
        Numeric sliders pair a drag handle with a live-editable number input. Type or drag to update — they stay in sync. All examples use the Radix UI Slider primitive.
      </p>

      <p className="uppercase tracking-widest text-muted-foreground mb-3" style={{ fontSize: "0.65rem" }}>Single Value</p>
      <div className="grid grid-cols-1 gap-4 mb-6">
        <NumericSlider label="Volume" min={0} max={100} step={1} defaultValue={60} unit="%" />
        <NumericSlider label="Brightness" min={0} max={100} step={5} defaultValue={75} unit="%" color="bg-amber-500" />
        <NumericSlider label="Font Size" min={8} max={96} step={1} defaultValue={16} unit="px" color="bg-violet-500" />
        <NumericSlider label="Opacity" min={0} max={1} step={0.01} defaultValue={0.85} color="bg-emerald-500" />
      </div>

      <p className="uppercase tracking-widest text-muted-foreground mb-3" style={{ fontSize: "0.65rem" }}>Range (Two Thumbs)</p>
      <div className="mb-6">
        <RangeSlider />
      </div>

      <p className="uppercase tracking-widest text-muted-foreground mb-3" style={{ fontSize: "0.65rem" }}>Discrete Steps</p>
      <div className="mb-6">
        <StepSlider />
      </div>

      <p className="uppercase tracking-widest text-muted-foreground mb-3" style={{ fontSize: "0.65rem" }}>Compound — RGB Color Mixer</p>
      <ColorMixer />
    </div>
  );
}
