import { useState } from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Switch } from "./components/ui/switch";
import { Checkbox } from "./components/ui/checkbox";
import { Slider } from "./components/ui/slider";
import { Progress } from "./components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { Separator } from "./components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { Skeleton } from "./components/ui/skeleton";
import {
  Bell, CheckCircle, AlertCircle, Info, AlertTriangle, Star, Heart, Zap,
  Settings, Palette, Type, Layout, Box, ToggleLeft, Layers, Home,
  ChevronRight, Sun, Moon, Search, Mail, Eye, EyeOff,
  Trash2, Download, Upload, ArrowRight, Loader2, Check,
  Grid, Columns, Sliders, Navigation, Image as ImageIcon, Type as FontIcon,
} from "lucide-react";

// New sections
import { FontsSection } from "./components/FontsSection";
import { GridSection } from "./components/GridSection";
import { FlexStackSection } from "./components/FlexStackSection";
import { AspectRatioSection } from "./components/AspectRatioSection";
import { CarouselSection } from "./components/CarouselSection";
import { NumericSliderSection } from "./components/NumericSliderSection";
import { NavigationSection } from "./components/NavigationSection";

const sections = [
  { id: "colors",     label: "Colors",          icon: Palette },
  { id: "fonts",      label: "Fonts",            icon: FontIcon },
  { id: "typography", label: "Typography",       icon: Type },
  { id: "buttons",    label: "Buttons",          icon: Box },
  { id: "badges",     label: "Badges",           icon: Star },
  { id: "forms",      label: "Forms",            icon: Layout },
  { id: "cards",      label: "Cards",            icon: Layers },
  { id: "alerts",     label: "Alerts",           icon: Bell },
  { id: "feedback",   label: "Feedback",         icon: ToggleLeft },
  { id: "data",       label: "Data Display",     icon: Home },
  { id: "overlays",   label: "Overlays",         icon: Settings },
  { id: "grid",       label: "Grid System",      icon: Grid },
  { id: "flex",       label: "Flex & Stack",     icon: Columns },
  { id: "aspect",     label: "Aspect Ratio",     icon: ImageIcon },
  { id: "carousel",   label: "Carousel",         icon: ChevronRight },
  { id: "slider",     label: "Numeric Slider",   icon: Sliders },
  { id: "nav",        label: "Navigation",       icon: Navigation },
];

const colorTokens = [
  { name: "Primary",     var: "--primary",     bg: "bg-primary",     text: "text-primary-foreground",  hex: "#030213" },
  { name: "Secondary",   var: "--secondary",   bg: "bg-secondary",   text: "text-secondary-foreground",hex: "oklch(0.95 …)" },
  { name: "Destructive", var: "--destructive", bg: "bg-destructive", text: "text-white",               hex: "#d4183d" },
  { name: "Muted",       var: "--muted",       bg: "bg-muted",       text: "text-muted-foreground",    hex: "#ececf0" },
  { name: "Accent",      var: "--accent",      bg: "bg-accent",      text: "text-accent-foreground",   hex: "#e9ebef" },
  { name: "Background",  var: "--background",  bg: "bg-background",  text: "text-foreground",          hex: "#ffffff" },
];

const chartColors = [
  { name: "Chart 1", bg: "bg-[var(--chart-1)]" },
  { name: "Chart 2", bg: "bg-[var(--chart-2)]" },
  { name: "Chart 3", bg: "bg-[var(--chart-3)]" },
  { name: "Chart 4", bg: "bg-[var(--chart-4)]" },
  { name: "Chart 5", bg: "bg-[var(--chart-5)]" },
];

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <h2 className="mb-1">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
      <Separator className="mt-4" />
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h4 className="mb-4 text-muted-foreground uppercase tracking-widest" style={{ fontSize: "0.7rem" }}>{title}</h4>
      {children}
    </div>
  );
}

function ColorsSection() {
  return (
    <div>
      <SectionHeader title="Color System" description="Design tokens and semantic color palette used throughout the system." />
      <SubSection title="Semantic Colors">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {colorTokens.map((c) => (
            <div key={c.name} className="rounded-lg overflow-hidden border border-border">
              <div className={`${c.bg} ${c.text} h-20 flex items-end p-3`}>
                <span style={{ fontSize: "0.75rem" }} className="font-mono opacity-80">{c.var}</span>
              </div>
              <div className="p-3 bg-card">
                <p className="text-foreground" style={{ fontSize: "0.875rem" }}>{c.name}</p>
                <p className="text-muted-foreground font-mono" style={{ fontSize: "0.7rem" }}>{c.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </SubSection>
      <SubSection title="Chart / Data Visualization Colors">
        <div className="flex gap-3 flex-wrap">
          {chartColors.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-2">
              <div className={`${c.bg} w-14 h-14 rounded-lg border border-border`} />
              <span style={{ fontSize: "0.7rem" }} className="text-muted-foreground">{c.name}</span>
            </div>
          ))}
        </div>
      </SubSection>
      <SubSection title="Border Radius Tokens">
        <div className="flex gap-6 flex-wrap items-end">
          {[{ label: "sm", cls: "rounded-sm" }, { label: "md", cls: "rounded-md" }, { label: "lg", cls: "rounded-lg" }, { label: "xl", cls: "rounded-xl" }, { label: "full", cls: "rounded-full" }].map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-2">
              <div className={`bg-primary w-14 h-14 ${r.cls}`} />
              <span style={{ fontSize: "0.7rem" }} className="text-muted-foreground font-mono">{r.label}</span>
            </div>
          ))}
        </div>
      </SubSection>
    </div>
  );
}

function TypographySection() {
  return (
    <div>
      <SectionHeader title="Typography" description="Type scale, weights, and text styles for content hierarchy." />
      <SubSection title="Heading Scale">
        <div className="space-y-4 border border-border rounded-lg p-6 bg-card">
          <div><h1>Heading 1 — Display</h1><span style={{ fontSize: "0.7rem" }} className="text-muted-foreground font-mono">text-2xl / medium / 1.5 lh</span></div>
          <Separator />
          <div><h2>Heading 2 — Section</h2><span style={{ fontSize: "0.7rem" }} className="text-muted-foreground font-mono">text-xl / medium / 1.5 lh</span></div>
          <Separator />
          <div><h3>Heading 3 — Subsection</h3><span style={{ fontSize: "0.7rem" }} className="text-muted-foreground font-mono">text-lg / medium / 1.5 lh</span></div>
          <Separator />
          <div><h4>Heading 4 — Card Title</h4><span style={{ fontSize: "0.7rem" }} className="text-muted-foreground font-mono">text-base / medium / 1.5 lh</span></div>
        </div>
      </SubSection>
      <SubSection title="Body & UI Text">
        <div className="space-y-3 border border-border rounded-lg p-6 bg-card">
          <p>Body — The quick brown fox jumps over the lazy dog. Used for primary content and paragraph text.</p>
          <p className="text-muted-foreground">Muted — Secondary text, captions, and helper descriptions with reduced visual weight.</p>
          <p className="text-destructive">Destructive — Error messages and critical warnings that require immediate attention.</p>
          <p><strong>Bold body</strong> — Emphasis inline within normal text to highlight key terms.</p>
          <p><span className="underline">Underlined</span> and <span className="italic">italic</span> text variants for semantic meaning.</p>
          <p className="font-mono" style={{ fontSize: "0.875rem" }}>Monospace — code snippets, tokens, technical values: var(--primary)</p>
        </div>
      </SubSection>
    </div>
  );
}

function ButtonsSection() {
  const [loading, setLoading] = useState(false);
  const handleLoading = () => { setLoading(true); setTimeout(() => setLoading(false), 2000); };

  return (
    <div>
      <SectionHeader title="Buttons" description="Action triggers across six variants and four sizes." />
      <SubSection title="Variants">
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </SubSection>
      <SubSection title="Sizes">
        <div className="flex flex-wrap gap-3 items-center">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Star /></Button>
        </div>
      </SubSection>
      <SubSection title="With Icons">
        <div className="flex flex-wrap gap-3">
          <Button><Mail /> Send Email</Button>
          <Button variant="outline"><Download /> Download</Button>
          <Button variant="secondary"><Upload /> Upload</Button>
          <Button variant="destructive"><Trash2 /> Delete</Button>
          <Button variant="ghost"><Heart /> Like</Button>
        </div>
      </SubSection>
      <SubSection title="States">
        <div className="flex flex-wrap gap-3">
          <Button disabled>Disabled</Button>
          <Button onClick={handleLoading} disabled={loading}>
            {loading ? <><Loader2 className="animate-spin" /> Processing...</> : <><Zap /> Run Action</>}
          </Button>
          <Button variant="outline" className="gap-2"><Check className="text-green-600 dark:text-green-400" /> Completed</Button>
        </div>
      </SubSection>
    </div>
  );
}

function BadgesSection() {
  return (
    <div>
      <SectionHeader title="Badges" description="Status indicators, labels, and categorical markers." />
      <SubSection title="Variants">
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </SubSection>
      <SubSection title="With Icons">
        <div className="flex flex-wrap gap-3">
          <Badge><Star /> Featured</Badge>
          <Badge variant="secondary"><CheckCircle /> Verified</Badge>
          <Badge variant="destructive"><AlertCircle /> Error</Badge>
          <Badge variant="outline"><Info /> Info</Badge>
          <Badge variant="outline"><Zap /> Beta</Badge>
        </div>
      </SubSection>
      <SubSection title="Use Cases">
        <div className="flex flex-wrap gap-3">
          {["React", "TypeScript", "Tailwind CSS", "Radix UI", "Vite"].map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
          <Badge variant="default">v2.4.1</Badge>
          <Badge variant="destructive">Deprecated</Badge>
          <Badge variant="outline">Draft</Badge>
        </div>
      </SubSection>
    </div>
  );
}

function FormsSection() {
  const [showPassword, setShowPassword] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [checked, setChecked] = useState<boolean | "indeterminate">(false);
  const [sliderVal, setSliderVal] = useState([40]);
  const [radioVal, setRadioVal] = useState("option1");

  return (
    <div>
      <SectionHeader title="Form Elements" description="Inputs, controls, and selection components for data capture." />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <SubSection title="Text Inputs">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pr-10" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input id="search" placeholder="Search..." className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="disabled">Disabled</Label>
                <Input id="disabled" placeholder="Cannot edit this" disabled />
              </div>
            </div>
          </SubSection>
          <SubSection title="Textarea">
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Write your message here..." rows={4} />
            </div>
          </SubSection>
        </div>
        <div>
          <SubSection title="Select">
            <div className="space-y-2">
              <Label>Framework</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                  <SelectItem value="svelte">Svelte</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </SubSection>
          <SubSection title="Radio Group">
            <RadioGroup value={radioVal} onValueChange={setRadioVal}>
              {[{ val: "option1", label: "Standard Plan — $9/mo" }, { val: "option2", label: "Pro Plan — $29/mo" }, { val: "option3", label: "Enterprise — Contact us" }].map((o) => (
                <div key={o.val} className="flex items-center gap-3">
                  <RadioGroupItem value={o.val} id={o.val} />
                  <Label htmlFor={o.val}>{o.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </SubSection>
          <SubSection title="Checkbox & Switch">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Checkbox id="agree" checked={checked} onCheckedChange={setChecked} />
                <Label htmlFor="agree">I agree to the terms of service</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="newsletter" defaultChecked />
                <Label htmlFor="newsletter">Subscribe to newsletter</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="disabled-check" disabled />
                <Label htmlFor="disabled-check" className="opacity-50">Disabled option</Label>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Switch id="notifications" checked={switchOn} onCheckedChange={setSwitchOn} />
                <Label htmlFor="notifications">Enable notifications {switchOn ? "(on)" : "(off)"}</Label>
              </div>
            </div>
          </SubSection>
          <SubSection title="Slider">
            <div className="space-y-3">
              <Label>Volume: {sliderVal[0]}%</Label>
              <Slider value={sliderVal} onValueChange={setSliderVal} max={100} step={1} />
            </div>
          </SubSection>
        </div>
      </div>
    </div>
  );
}

function CardsSection() {
  return (
    <div>
      <SectionHeader title="Cards" description="Content containers for grouping related information." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Basic Card</CardTitle>
            <CardDescription>A simple card with header and content.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>Cards group related content and actions. They provide a visual boundary and hierarchy for information.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Statistics</CardTitle>
              <Badge variant="secondary">Live</Badge>
            </div>
            <CardDescription>Monthly performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[{ label: "Total Users", val: "12,483", change: "+12%" }, { label: "Revenue", val: "$84,320", change: "+8%" }, { label: "Conversion", val: "3.24%", change: "-0.5%" }].map((s) => (
              <div key={s.label} className="flex justify-between items-center">
                <span className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>{s.label}</span>
                <div className="text-right">
                  <span style={{ fontSize: "0.875rem" }}>{s.val}</span>
                  <span style={{ fontSize: "0.7rem" }} className={`ml-2 ${s.change.startsWith("+") ? "text-green-700 dark:text-green-300" : "text-destructive"}`}>{s.change}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Alice Johnson</CardTitle>
                <CardDescription>Product Designer</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>Passionate about creating intuitive user experiences that delight and empower people.</p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm">Follow</Button>
            <Button size="sm" variant="outline">Message</Button>
          </CardFooter>
        </Card>
        <Card className="col-span-1 sm:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
            <CardDescription>Pro Plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <span className="text-3xl font-bold">$29</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-2">
              {["Unlimited projects", "10GB storage", "Priority support", "Advanced analytics"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: "0.875rem" }}>
                  <CheckCircle className="size-4 text-green-600 dark:text-green-400 shrink-0" />{f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Get Started <ArrowRight /></Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function AlertsSection() {
  return (
    <div>
      <SectionHeader title="Alerts" description="Contextual feedback messages for user actions and system status." />
      <SubSection title="Alert Variants">
        <div className="space-y-3">
          <Alert>
            <Info className="size-4" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>This is an informational alert. It provides neutral context or supplementary details about an action or state.</AlertDescription>
          </Alert>
          <Alert className="border-[var(--status-success-border)] bg-[var(--status-success-bg)] text-[var(--status-success-text)] [&>svg]:text-[var(--status-success-icon)]">
            <CheckCircle className="size-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your changes have been saved successfully. The system is now up to date with your latest configuration.</AlertDescription>
          </Alert>
          <Alert className="border-[var(--status-warning-border)] bg-[var(--status-warning-bg)] text-[var(--status-warning-text)] [&>svg]:text-[var(--status-warning-icon)]">
            <AlertTriangle className="size-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>This action cannot be undone. Please review your settings carefully before proceeding with this operation.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to connect to the server. Please check your network connection and try again in a few moments.</AlertDescription>
          </Alert>
        </div>
      </SubSection>
    </div>
  );
}

function FeedbackSection() {
  const [progress, setProgress] = useState(65);

  return (
    <div>
      <SectionHeader title="Feedback & Status" description="Progress indicators, loading states, and visual feedback components." />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <SubSection title="Progress Bars">
            <div className="space-y-4">
              {[{ label: "Storage used", val: 72 }, { label: "Upload progress", val: 45 }, { label: "Profile complete", val: 88 }].map((p) => (
                <div key={p.label} className="space-y-1.5">
                  <div className="flex justify-between">
                    <span style={{ fontSize: "0.875rem" }} className="text-muted-foreground">{p.label}</span>
                    <span style={{ fontSize: "0.875rem" }}>{p.val}%</span>
                  </div>
                  <Progress value={p.val} />
                </div>
              ))}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span style={{ fontSize: "0.875rem" }} className="text-muted-foreground">Interactive</span>
                  <span style={{ fontSize: "0.875rem" }}>{progress}%</span>
                </div>
                <Progress value={progress} />
                <div className="flex gap-2 pt-1">
                  <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 10))}>-10</Button>
                  <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 10))}>+10</Button>
                </div>
              </div>
            </div>
          </SubSection>
        </div>
        <div>
          <SubSection title="Avatars">
            <div className="space-y-4">
              <div className="flex gap-3 items-end">
                {["sm", "default", "lg"].map((size) => (
                  <div key={size} className="flex flex-col items-center gap-1">
                    <Avatar className={size === "sm" ? "size-8" : size === "lg" ? "size-14" : "size-10"}>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${size}`} />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                    <span style={{ fontSize: "0.7rem" }} className="text-muted-foreground">{size}</span>
                  </div>
                ))}
              </div>
              <div className="flex -space-x-3">
                {["Alice", "Bob", "Carol", "Dave", "Eve"].map((name) => (
                  <Avatar key={name} className="border-2 border-background size-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                  </Avatar>
                ))}
                <div className="size-10 rounded-full border-2 border-background bg-muted flex items-center justify-center" style={{ fontSize: "0.75rem" }}>+3</div>
              </div>
            </div>
          </SubSection>
          <SubSection title="Skeletons">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
              <Skeleton className="h-24 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-3/5" />
              </div>
            </div>
          </SubSection>
        </div>
      </div>
    </div>
  );
}

function DataSection() {
  const users = [
    { name: "Alice Johnson", role: "Designer", status: "Active", plan: "Pro" },
    { name: "Bob Smith", role: "Engineer", status: "Active", plan: "Enterprise" },
    { name: "Carol Davis", role: "Manager", status: "Inactive", plan: "Standard" },
    { name: "Dave Wilson", role: "Engineer", status: "Active", plan: "Pro" },
    { name: "Eve Martinez", role: "Designer", status: "Pending", plan: "Pro" },
  ];

  return (
    <div>
      <SectionHeader title="Data Display" description="Tables, accordions, and structured content components." />
      <SubSection title="Table">
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.name}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-7">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`} />
                        <AvatarFallback>{u.name[0]}</AvatarFallback>
                      </Avatar>
                      <span style={{ fontSize: "0.875rem" }}>{u.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>{u.role}</TableCell>
                  <TableCell>
                    <Badge variant={u.status === "Active" ? "default" : u.status === "Inactive" ? "outline" : "secondary"} style={{ fontSize: "0.7rem" }}>{u.status}</Badge>
                  </TableCell>
                  <TableCell style={{ fontSize: "0.875rem" }}>{u.plan}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SubSection>
      <SubSection title="Accordion">
        <Accordion type="single" collapsible className="border border-border rounded-lg">
          {[
            { q: "What is a design system?", a: "A design system is a collection of reusable components, design tokens, and guidelines that allow teams to build consistent, high-quality products faster." },
            { q: "How do I use these components?", a: "Import any component from the ui directory and use it in your React application. Each component is built with Radix UI primitives and Tailwind CSS for full accessibility and customization." },
            { q: "Can I customize the theme?", a: "Yes! All colors, spacing, and typography are defined as CSS custom properties in theme.css. Update those tokens to instantly retheme the entire application." },
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="px-4">{item.q}</AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SubSection>
    </div>
  );
}

function OverlaysSection() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <SectionHeader title="Overlays & Navigation" description="Dialogs, tooltips, tabs, and layered interface patterns." />
      <SubSection title="Tabs">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>The overview tab shows a summary of your project's key metrics and recent activity. Switch tabs to explore different views.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>Analytics content: charts, trends, and data visualizations would appear here in a production application.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>Settings content: configuration options, preferences, and account management would appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SubSection>
      <SubSection title="Dialog / Modal">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Action</DialogTitle>
              <DialogDescription>This is a modal dialog built with Radix UI Dialog. It traps focus and handles accessibility automatically.</DialogDescription>
            </DialogHeader>
            <div className="py-2">
              <Alert className="border-[var(--status-warning-border)] bg-[var(--status-warning-bg)] text-[var(--status-warning-text)] [&>svg]:text-[var(--status-warning-icon)]">
                <AlertTriangle className="size-4" />
                <AlertTitle>Before you continue</AlertTitle>
                <AlertDescription>This is an example dialog with an embedded alert to show composition patterns.</AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SubSection>
      <SubSection title="Tooltips">
        <TooltipProvider>
          <div className="flex gap-4 flex-wrap">
            {[
              { label: "Top", side: "top" as const, content: "Tooltip on top" },
              { label: "Right", side: "right" as const, content: "Tooltip on right" },
              { label: "Bottom", side: "bottom" as const, content: "Tooltip on bottom" },
              { label: "Left", side: "left" as const, content: "Tooltip on left" },
            ].map((t) => (
              <Tooltip key={t.label}>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">{t.label}</Button>
                </TooltipTrigger>
                <TooltipContent side={t.side}>{t.content}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </SubSection>
    </div>
  );
}

// Section title wrappers for new pages
function WithHeader({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div>
      <SectionHeader title={title} description={description} />
      {children}
    </div>
  );
}

const sectionComponents: Record<string, React.ComponentType> = {
  colors:     ColorsSection,
  fonts:      () => <WithHeader title="Fonts" description="Plus Jakarta Sans (headings) + DM Sans (body) — two complementary Google Sans-Serif typefaces."><FontsSection /></WithHeader>,
  typography: TypographySection,
  buttons:    ButtonsSection,
  badges:     BadgesSection,
  forms:      FormsSection,
  cards:      CardsSection,
  alerts:     AlertsSection,
  feedback:   FeedbackSection,
  data:       DataSection,
  overlays:   OverlaysSection,
  grid:       () => <WithHeader title="Grid System" description="12-column responsive grid with standard breakpoints for mobile, tablet, and desktop."><GridSection /></WithHeader>,
  flex:       () => <WithHeader title="Flex & Stack" description="Advanced flexbox layout engine — row, column, wrap, alignment, and managed spacing."><FlexStackSection /></WithHeader>,
  aspect:     () => <WithHeader title="Aspect Ratio" description="Containers that lock their proportions regardless of width — built on Radix UI."><AspectRatioSection /></WithHeader>,
  carousel:   () => <WithHeader title="Carousel" description="Embla-powered carousel with responsive slide counts — 1 on mobile, 2 on tablet, 3 on desktop."><CarouselSection /></WithHeader>,
  slider:     () => <WithHeader title="Numeric Slider" description="Drag-and-type sliders — single value, range (two thumbs), discrete steps, and compound examples."><NumericSliderSection /></WithHeader>,
  nav:        () => <WithHeader title="Navigation" description="Horizontal, vertical, hamburger, fixed vs relative — all patterns with 5 live menu items."><NavigationSection /></WithHeader>,
};

export default function App() {
  const [activeSection, setActiveSection] = useState("colors");
  const [darkMode, setDarkMode] = useState(false);

  const ActiveComponent = sectionComponents[activeSection];

  // Apply dark class to <html> so Radix portals (dialogs, selects, tooltips)
  // that render outside the app root also inherit the dark mode tokens.
  const toggleDark = (next: boolean) => {
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div className="flex h-full bg-background text-foreground">
        {/* Sidebar */}
        <div className="w-56 shrink-0 border-r border-border bg-sidebar flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-md bg-primary flex items-center justify-center">
                <Layers className="size-4 text-primary-foreground" />
              </div>
              <div>
                <p className="leading-tight" style={{ fontSize: "0.875rem" }}>Design System</p>
                <p className="text-muted-foreground leading-tight" style={{ fontSize: "0.7rem" }}>Component Library</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md mb-0.5 transition-colors text-left ${activeSection === s.id ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"}`}
                  style={{ fontSize: "0.875rem" }}
                >
                  <Icon className="size-4 shrink-0" />
                  {s.label}
                  {activeSection === s.id && <ChevronRight className="size-3 ml-auto" />}
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>Theme</span>
              <button onClick={() => toggleDark(!darkMode)} className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground">
                {darkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
