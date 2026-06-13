const JAKARTA = "'Plus Jakarta Sans', sans-serif";
const DM = "'DM Sans', sans-serif";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <p className="mb-3 uppercase tracking-widest text-muted-foreground" style={{ fontSize: "0.65rem" }}>{label}</p>
      {children}
    </div>
  );
}

export function FontsSection() {
  return (
    <div>
      {/* Pairing intro */}
      <div className="rounded-xl border border-border bg-card p-8 mb-8">
        <p className="mb-1 text-muted-foreground" style={{ fontSize: "0.75rem", fontFamily: DM }}>Plus Jakarta Sans + DM Sans — Google Fonts pairing</p>
        <h1 style={{ fontFamily: JAKARTA, fontWeight: 800, fontSize: "2.5rem", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Design systems need great typography.
        </h1>
        <p className="mt-4 text-muted-foreground" style={{ fontFamily: DM, fontSize: "1.0625rem", lineHeight: 1.7, maxWidth: "60ch" }}>
          Plus Jakarta Sans brings confident geometry and personality to headings,
          while DM Sans provides quiet, effortless readability for body copy and UI labels.
          Together they share proportions and optical weight that keep the page unified.
        </p>
      </div>

      {/* Specimen — Jakarta Sans */}
      <div className="rounded-xl border border-border bg-card p-8 mb-6">
        <div className="flex items-baseline justify-between mb-6">
          <p className="uppercase tracking-widest text-muted-foreground" style={{ fontSize: "0.65rem" }}>Plus Jakarta Sans — Headings &amp; Display</p>
          <a className="text-muted-foreground underline underline-offset-2" style={{ fontSize: "0.7rem", fontFamily: DM }} href="https://fonts.google.com/specimen/Plus+Jakarta+Sans" target="_blank" rel="noreferrer">fonts.google.com</a>
        </div>

        <Block label="Weight 800 — Extra Bold">
          <p style={{ fontFamily: JAKARTA, fontWeight: 800, fontSize: "2.25rem", lineHeight: 1.2, letterSpacing: "-0.02em" }}>The quick brown fox jumps</p>
        </Block>
        <Block label="Weight 700 — Bold">
          <p style={{ fontFamily: JAKARTA, fontWeight: 700, fontSize: "1.875rem", lineHeight: 1.25, letterSpacing: "-0.015em" }}>The quick brown fox jumps over</p>
        </Block>
        <Block label="Weight 600 — Semibold">
          <p style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: "1.5rem", lineHeight: 1.3 }}>The quick brown fox jumps over the lazy dog</p>
        </Block>
        <Block label="Weight 500 — Medium">
          <p style={{ fontFamily: JAKARTA, fontWeight: 500, fontSize: "1.125rem", lineHeight: 1.5 }}>The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.</p>
        </Block>
        <Block label="Weight 400 — Regular">
          <p style={{ fontFamily: JAKARTA, fontWeight: 400, fontSize: "1rem", lineHeight: 1.6 }}>The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.</p>
        </Block>

        <div className="mt-6 border-t border-border pt-6">
          <p className="mb-2 uppercase tracking-widest text-muted-foreground" style={{ fontSize: "0.65rem" }}>Full Alphabet</p>
          <p style={{ fontFamily: JAKARTA, fontWeight: 600, fontSize: "1rem", letterSpacing: "0.02em", lineHeight: 1.8 }}>
            A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br />
            a b c d e f g h i j k l m n o p q r s t u v w x y z<br />
            0 1 2 3 4 5 6 7 8 9 ! @ # $ % &amp; * ( ) — –
          </p>
        </div>
      </div>

      {/* Specimen — DM Sans */}
      <div className="rounded-xl border border-border bg-card p-8 mb-6">
        <div className="flex items-baseline justify-between mb-6">
          <p className="uppercase tracking-widest text-muted-foreground" style={{ fontSize: "0.65rem" }}>DM Sans — Body, UI &amp; Labels</p>
          <a className="text-muted-foreground underline underline-offset-2" style={{ fontSize: "0.7rem", fontFamily: DM }} href="https://fonts.google.com/specimen/DM+Sans" target="_blank" rel="noreferrer">fonts.google.com</a>
        </div>

        <Block label="Weight 600 — Semibold">
          <p style={{ fontFamily: DM, fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.4 }}>The quick brown fox jumps over the lazy dog</p>
        </Block>
        <Block label="Weight 500 — Medium (UI Labels)">
          <p style={{ fontFamily: DM, fontWeight: 500, fontSize: "1rem", lineHeight: 1.5 }}>The quick brown fox jumps over the lazy dog. Pack my box.</p>
        </Block>
        <Block label="Weight 400 — Regular (Body copy)">
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "1rem", lineHeight: 1.7, maxWidth: "65ch" }}>
            The quick brown fox jumps over the lazy dog. Pack my box with five
            dozen liquor jugs. How vexingly quick daft zebras jump! The five
            boxing wizards jump quickly.
          </p>
        </Block>
        <Block label="Weight 300 — Light">
          <p style={{ fontFamily: DM, fontWeight: 300, fontSize: "1rem", lineHeight: 1.7 }}>The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.</p>
        </Block>
        <Block label="Weight 400 Italic">
          <p style={{ fontFamily: DM, fontWeight: 400, fontStyle: "italic", fontSize: "1rem", lineHeight: 1.7 }}>The quick brown fox jumps over the lazy dog. Emphasis in editorial text.</p>
        </Block>

        <div className="mt-6 border-t border-border pt-6">
          <p className="mb-2 uppercase tracking-widest text-muted-foreground" style={{ fontSize: "0.65rem" }}>Full Alphabet</p>
          <p style={{ fontFamily: DM, fontWeight: 400, fontSize: "1rem", letterSpacing: "0.02em", lineHeight: 1.8 }}>
            A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br />
            a b c d e f g h i j k l m n o p q r s t u v w x y z<br />
            0 1 2 3 4 5 6 7 8 9 ! @ # $ % &amp; * ( ) — –
          </p>
        </div>
      </div>

      {/* Scale comparison */}
      <div className="rounded-xl border border-border bg-card p-8">
        <p className="mb-6 uppercase tracking-widest text-muted-foreground" style={{ fontSize: "0.65rem" }}>Type Scale — Pairing in Context</p>
        {[
          { label: "H1 / Hero", jSize: "2.25rem", jWeight: 800, dSize: "1.125rem", dWeight: 400, heading: "Welcome to the platform", body: "Get started in minutes with zero configuration." },
          { label: "H2 / Section", jSize: "1.625rem", jWeight: 700, dSize: "1rem", dWeight: 400, heading: "Features & Capabilities", body: "Everything you need to build modern web applications." },
          { label: "H3 / Card", jSize: "1.125rem", jWeight: 600, dSize: "0.9375rem", dWeight: 400, heading: "Component Library", body: "50+ accessible, composable components ready to use." },
          { label: "H4 / Label", jSize: "0.9375rem", jWeight: 600, dSize: "0.875rem", dWeight: 400, heading: "Quick Setup", body: "Install, import, and ship in minutes." },
        ].map((row) => (
          <div key={row.label} className="mb-6 pb-6 border-b border-border last:border-0 last:mb-0 last:pb-0">
            <span className="uppercase tracking-widest text-muted-foreground block mb-2" style={{ fontSize: "0.6rem" }}>{row.label}</span>
            <p style={{ fontFamily: JAKARTA, fontWeight: row.jWeight, fontSize: row.jSize, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{row.heading}</p>
            <p className="mt-1 text-muted-foreground" style={{ fontFamily: DM, fontWeight: row.dWeight, fontSize: row.dSize, lineHeight: 1.6 }}>{row.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
