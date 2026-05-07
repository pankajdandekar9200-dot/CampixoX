import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Calendar, Users, Bell, Briefcase, Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import heroImg from "@/assets/campixox-hero.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampixoX — Your entire campus, organized in one place" },
      { name: "description", content: "Simplify college life with events, clubs, notices and opportunities — all in one platform." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Calendar, title: "Events Hub", desc: "Never miss a fest, workshop, or guest lecture again." },
  { icon: Users, title: "Clubs Directory", desc: "Discover and join every student club on your campus." },
  { icon: Bell, title: "Notices Board", desc: "Official announcements, organized and searchable." },
  { icon: Briefcase, title: "Opportunities", desc: "Internships, competitions, fellowships — curated for you." },
];

function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = [
    { label: "Home", to: "/" as const, hash: undefined },
    { label: "Features", to: "/" as const, hash: "features" },
    { label: "About", to: "/" as const, hash: "about" },
  ];
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.hash ? `#${l.hash}` : "/"}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button variant="ghost" asChild><Link to="/auth">Login</Link></Button>
            <Button asChild className="shadow-elegant"><Link to="/auth">Get Started</Link></Button>
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {mobileOpen && (
          <div className="border-t border-border/60 bg-background/95 backdrop-blur md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.hash ? `#${l.hash}` : "/"}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                <Button variant="outline" asChild><Link to="/auth">Login</Link></Button>
                <Button asChild className="shadow-elegant"><Link to="/auth">Get Started</Link></Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/80" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-hero opacity-30 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:gap-8 lg:py-28">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-card backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Built for modern campuses
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Your entire campus,{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                organized in one place.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg lg:mx-0 lg:text-xl">
              Simplify college life with events, clubs, notices and opportunities — all
              in a single, beautifully designed platform.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Button asChild size="lg" className="h-12 px-8 text-base shadow-elegant transition-transform hover:-translate-y-0.5">
                <Link to="/auth">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
                <Link to="/dashboard">View Demo</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground lg:justify-start">
              <span>✓ Free for students</span>
              <span>✓ No credit card</span>
              <span>✓ Setup in minutes</span>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-hero opacity-20 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
              <img
                src={heroImg}
                alt="CampixoX dashboard preview showing events, clubs and notifications"
                className="h-auto w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Everything campus, nothing scattered.</h2>
          <p className="mt-3 text-muted-foreground">Replace WhatsApp groups, lost emails and pinned notices with one calm dashboard.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-gradient-hero group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-24">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">About CampixoX</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              CampixoX is built for the modern campus — bringing students, club organizers
              and administrators together in one calm, beautifully designed workspace.
              No more lost messages, no more missed opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-12 text-center shadow-elegant md:p-16">
          <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">Ready to organize your campus?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">Join thousands of students already using CampixoX.</p>
          <Button asChild size="lg" variant="secondary" className="mt-8 h-12 px-8 text-base transition-transform hover:-translate-y-0.5">
            <Link to="/auth">Create your account</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <Logo />
          <div>© 2026 CampixoX</div>
        </div>
      </footer>
    </div>
  );
}
