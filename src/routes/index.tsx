import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { submitLead } from "../lib/leads";
import {
  ArrowRight,
  ArrowDown,
  Check,
  Zap,
  Clock,
  Users,
  Building2,
  PiggyBank,
  FileText,
  CheckCircle2,
  Car,
} from "lucide-react";
import heroImg from "@/assets/hero-ev.jpg";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EVNOW — Go Electric. Get Funded Today." },
      {
        name: "description",
        content:
          "EV finance for New Zealand. Fast approvals, top NZ lenders, no credit hit. Get your rate in minutes.",
      },
      { property: "og:title", content: "EVNOW — EV Finance NZ" },
      {
        property: "og:description",
        content: "Fast approvals, top NZ lenders, and a team that actually knows EVs.",
      },
    ],
  }),
  component: Landing,
});

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-bold tracking-tight ${className}`}>
      <span className="text-electric">EV</span>
      <span className="text-foreground">NOW</span>
    </span>
  );
}

function AmberButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-amber-cta px-7 py-3.5 text-base font-semibold text-amber-cta-foreground transition-all hover:brightness-110 hover:translate-y-[-1px] glow-amber disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none ${className}`}
    >
      {children}
    </button>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <StatsBar />
      <Calculator />
      <HowItWorks />
      <FeaturedIn />
      <LeadForm />
      <FAQ />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <nav className="hidden md:flex items-center gap-6 text-base text-muted-foreground">
          <a href="#calculator" className="px-3 py-2 hover:text-foreground transition-colors">Savings</a>
          <a href="#how" className="px-3 py-2 hover:text-foreground transition-colors">How it works</a>
          <a href="#faq" className="px-3 py-2 hover:text-foreground transition-colors">FAQ</a>
        </nav>
        <a
          href="#apply"
          className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-border bg-surface/60 backdrop-blur px-8 py-4 text-base font-semibold hover:border-electric/60 transition-colors"
        >
          Apply now <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100dvh] isolate">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Premium electric vehicle with blue LED wheel lighting"
          className="w-full h-full object-cover object-right"
          width={1920}
          height={1280}
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="absolute inset-0 dot-grid opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 w-full min-h-[100dvh] flex flex-col justify-center pt-20 pb-24">
        <div className="max-w-2xl">
          <Wordmark className="text-[3.5rem] sm:text-[5.6rem] lg:text-[7.7rem] leading-none tracking-tighter" />
          <div className="flex w-fit items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3 py-1.5 text-xs font-medium text-electric mt-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
            </span>
            New Zealand's #1 EV finance broker
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight mt-6">
            Go Electric.<br />
            Get Funded.<br />
            <span className="text-electric">Today.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl">
            Fast approvals, top NZ lenders, and a team that actually knows EVs.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#apply">
              <AmberButton>
                Check My Rate <ArrowRight className="w-4 h-4" />
              </AmberButton>
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground/90 hover:text-electric transition-colors px-2 py-2"
            >
              Calculate my savings <ArrowDown className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted-foreground">
            {["No credit hit", "Zero obligation", "Approved in hours"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-savings" strokeWidth={3} />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { value: "2hr", label: "Avg approval time", icon: Clock },
  { value: "50k+", label: "NZ applicants", icon: Users },
  { value: "12+", label: "Lender panel", icon: Building2 },
  { value: "$3,500", label: "Avg annual saving", icon: PiggyBank, suffix: "/yr" },
];

function StatsBar() {
  return (
    <section className="relative bg-surface border-y border-border">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s) => (
          <div key={s.label} className="flex items-center gap-4">
            <div className="shrink-0 w-11 h-11 rounded-lg bg-electric/10 border border-electric/20 grid place-items-center">
              <s.icon className="w-5 h-5 text-electric" />
            </div>
            <div className="min-w-0">
              <div className="font-display text-xl lg:text-3xl font-bold leading-none">
                {s.value}
                {s.suffix && (
                  <span className="text-sm font-medium text-muted-foreground">{s.suffix}</span>
                )}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Calculator() {
  const [fuel, setFuel] = useState(400);
  const ev = useMemo(() => Math.round(fuel * 0.25), [fuel]);
  const monthlySaving = fuel - ev;
  const annualSaving = monthlySaving * 12;

  return (
    <section
      id="calculator"
      className="relative py-24 sm:py-32"
      style={{ background: "var(--gradient-section)" }}
    >
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-electric mb-4">
            <Zap className="w-3.5 h-3.5" /> Savings calculator
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            See how much you'd save by <span className="text-savings">going electric</span>.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-lg">
            Drag the slider to your monthly fuel spend. We'll show you exactly what an EV would
            cost to run — and what you'd pocket every year.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Based on average NZ electricity rates",
              "Includes home charging estimates",
              "Excludes maintenance savings (you'll save more)",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-savings shrink-0 mt-0.5" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-electric/10 blur-3xl rounded-full pointer-events-none" />
          <div className="relative rounded-2xl border border-border bg-surface-elevated p-7 sm:p-9 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm text-muted-foreground">Monthly fuel spend</Label>
              <div className="font-display font-bold text-2xl">${fuel}</div>
            </div>
            <Slider
              value={[fuel]}
              min={100}
              max={800}
              step={10}
              onValueChange={(v) => setFuel(v[0])}
              className="my-5"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$100</span>
              <span>$800</span>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3">
              <StatTile label="Petrol" value={`$${fuel}`} tone="muted" />
              <StatTile label="EV" value={`$${ev}`} tone="electric" />
              <StatTile label="Monthly saving" value={`$${monthlySaving}`} tone="savings" />
            </div>

            <div className="mt-7 rounded-xl border border-savings/30 bg-savings/5 p-6 text-center">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Annual saving
              </div>
              <div className="mt-2 font-display text-5xl sm:text-6xl font-bold text-savings">
                ${annualSaving.toLocaleString()}
              </div>
            </div>

            <a href="#apply" className="block mt-7">
              <AmberButton className="w-full">
                Lock In These Savings <ArrowRight className="w-4 h-4" />
              </AmberButton>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "muted" | "electric" | "savings";
}) {
  const toneClass =
    tone === "electric"
      ? "text-electric border-electric/30 bg-electric/5"
      : tone === "savings"
        ? "text-savings border-savings/30 bg-savings/5"
        : "text-foreground border-border bg-background/40";
  return (
    <div className={`rounded-lg border p-3 text-center ${toneClass}`}>
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="font-display font-bold text-xl mt-1">{value}</div>
    </div>
  );
}

const STEPS = [
  {
    n: "01",
    title: "Apply in 2 minutes",
    desc: "Quick online form. No paperwork, no credit hit, no fuss.",
    icon: FileText,
  },
  {
    n: "02",
    title: "Get approved fast",
    desc: "Same-day approval from NZ's top 12+ EV-friendly lenders.",
    icon: CheckCircle2,
  },
  {
    n: "03",
    title: "Drive electric",
    desc: "Pick up your EV this week and start saving from day one.",
    icon: Car,
  },
];

function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-32 bg-surface">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs font-medium uppercase tracking-wider text-electric mb-4">
            How it works
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            From application to <span className="text-electric">electric</span>, in days.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="group relative rounded-2xl border border-border bg-surface-elevated p-8 hover:border-electric/40 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-lg bg-electric/10 border border-electric/20 grid place-items-center">
                  <s.icon className="w-5 h-5 text-electric" />
                </div>
                <span className="font-display font-bold text-3xl text-muted-foreground/30">
                  {s.n}
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold mt-6">{s.title}</h3>
              <p className="mt-3 text-muted-foreground">{s.desc}</p>
              {i < STEPS.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-5 w-5 h-5 text-electric/40 -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedIn() {
  const outlets = ["NZ AUTOCAR", "EVs & BEYOND", "EV TALK NZ", "AUTO TALK"];
  return (
    <section className="relative border-y border-border bg-background py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
        <p className="text-sm text-muted-foreground shrink-0">
          As seen in NZ's leading automotive media
        </p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {outlets.map((o) => (
            <span
              key={o}
              className="font-display font-bold tracking-widest text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              {o}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [evChoice, setEvChoice] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    try {
      await submitLead({
        data: {
          first: fd.get("first") as string,
          last: fd.get("last") as string,
          email: fd.get("email") as string,
          mobile: fd.get("mobile") as string,
          ev: evChoice,
          budget,
        },
      });
      setSubmitted(true);
    } catch {
      setFormError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="apply"
      className="relative py-24 sm:py-32"
      style={{ background: "var(--gradient-section)" }}
    >
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div className="lg:sticky lg:top-24">
          <div className="text-xs font-medium uppercase tracking-wider text-electric mb-4">
            Get your rate
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            Two minutes now.<br />
            <span className="text-electric">Years of savings</span> later.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-md">
            One form. Real humans. We'll come back to you with your best rate within hours —
            usually faster.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              { t: "No credit impact", d: "Soft check only. Your score stays put." },
              { t: "100% free", d: "We get paid by lenders, not you." },
              { t: "NZ-based team", d: "Real people in Auckland & Wellington." },
            ].map((p) => (
              <li key={p.t} className="flex gap-4">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-savings/10 border border-savings/30 grid place-items-center">
                  <Check className="w-4 h-4 text-savings" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-semibold">{p.t}</div>
                  <div className="text-sm text-muted-foreground">{p.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-electric/10 blur-3xl rounded-full pointer-events-none" />
          <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl border border-border bg-surface-elevated p-7 sm:p-9 shadow-[var(--shadow-card)] space-y-5"
          >
            {submitted ? (
              <div className="py-10 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-savings/15 border border-savings/40 grid place-items-center">
                  <Check className="w-7 h-7 text-savings" strokeWidth={3} />
                </div>
                <h3 className="font-display text-2xl font-bold mt-5">You're in.</h3>
                <p className="text-muted-foreground mt-2">
                  We'll be in touch within the next couple of hours with your rate.
                </p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field id="first" name="first" label="First name" placeholder="Alex" required />
                  <Field id="last" name="last" label="Last name" placeholder="Tane" required />
                </div>
                <Field id="email" name="email" label="Email" type="email" placeholder="you@email.co.nz" required />
                <Field id="mobile" name="mobile" label="Mobile" type="tel" placeholder="021 123 4567" required />

                <div className="space-y-1.5">
                  <Label className="text-sm">Which EV interests you?</Label>
                  <Select value={evChoice} onValueChange={setEvChoice}>
                    <SelectTrigger className="bg-background/50 border-border h-11">
                      <SelectValue placeholder="Pick one (or 'not sure')" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tesla">Tesla Model 3 / Y</SelectItem>
                      <SelectItem value="byd">BYD Atto 3 / Seal</SelectItem>
                      <SelectItem value="polestar">Polestar 2</SelectItem>
                      <SelectItem value="mg">MG4 / ZS EV</SelectItem>
                      <SelectItem value="kia">Kia EV6 / Niro</SelectItem>
                      <SelectItem value="hyundai">Hyundai Ioniq 5 / 6</SelectItem>
                      <SelectItem value="other">Something else</SelectItem>
                      <SelectItem value="unsure">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Rough budget</Label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger className="bg-background/50 border-border h-11">
                      <SelectValue placeholder="Select a range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="u30">Under $30k</SelectItem>
                      <SelectItem value="30-50">$30k – $50k</SelectItem>
                      <SelectItem value="50-75">$50k – $75k</SelectItem>
                      <SelectItem value="75-100">$75k – $100k</SelectItem>
                      <SelectItem value="100+">$100k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formError && (
                  <p className="text-sm text-destructive text-center rounded-lg border border-destructive/30 bg-destructive/10 p-3">
                    {formError}
                  </p>
                )}

                <AmberButton type="submit" className="w-full mt-2" disabled={submitting}>
                  {submitting ? "Sending…" : "Get My Rate — It's Free"} <ArrowRight className="w-4 h-4" />
                </AmberButton>
                <p className="text-xs text-muted-foreground text-center">
                  By submitting you agree to be contacted about EV finance. No spam, ever.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  ...rest
}: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm">
        {label}
      </Label>
      <Input id={id} {...rest} className="bg-background/50 border-border h-11" />
    </div>
  );
}

const FAQS = [
  {
    q: "How fast can I get approved?",
    a: "Most applicants get a decision the same day — often within 2 hours during business hours. Some lenders can pre-approve in under 60 minutes.",
  },
  {
    q: "Will this affect my credit?",
    a: "No. We use a soft credit check to give you an indicative rate. Your credit score is not impacted unless you choose to formally proceed with a lender.",
  },
  {
    q: "What EVs can I finance?",
    a: "Anything road-legal in NZ — new or used, dealer or private sale. Tesla, BYD, Polestar, MG, Kia, Hyundai, you name it. We even finance e-utes.",
  },
  {
    q: "Do I need a deposit?",
    a: "Not always. We work with lenders offering 0% deposit options for qualifying applicants, though a deposit usually means a better rate.",
  },
  {
    q: "Is there a cost to use EVNOW?",
    a: "Zero. We're paid a commission by the lender once your loan settles. You'll never pay us a cent.",
  },
  {
    q: "Can I pay off the loan early?",
    a: "Yes. We only recommend lenders that allow early repayment with no penalty. Pay off whenever you like.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-surface">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="text-center">
          <div className="text-xs font-medium uppercase tracking-wider text-electric mb-4">
            Frequently asked
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            Questions, answered.
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl border border-border bg-surface-elevated px-5 data-[state=open]:border-electric/40 transition-colors"
            >
              <AccordionTrigger className="text-left font-display text-lg font-semibold hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <Wordmark className="text-3xl" />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Go Electric. Get Funded Today. New Zealand's specialist EV finance broker.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <FooterCol title="Product" links={["Savings calculator", "How it works", "FAQ", "Apply"]} />
            <FooterCol title="Company" links={["About", "Lender panel", "Contact", "Privacy"]} />
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-muted-foreground max-w-3xl">
            EVNOW is a credit referral service. We connect EV buyers with licensed NZ lenders and
            do not provide credit directly. All loans are subject to lender approval, terms,
            conditions and lending criteria. Indicative rates only — your actual rate may differ.
          </p>
          <p className="text-xs text-muted-foreground shrink-0">
            © {new Date().getFullYear()} EVNOW NZ
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-sm font-semibold mb-4">{title}</div>
      <ul className="space-y-2.5 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="block py-2 -my-2 hover:text-foreground transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
