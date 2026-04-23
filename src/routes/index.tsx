import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Users, Bell, Briefcase, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

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
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" asChild><Link to="/auth">Sign in</Link></Button>
            <Button asChild className="shadow-elegant"><Link to="/auth">Get Started</Link></Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-soft" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-hero opacity-20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-36">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-card backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Built for modern campuses
          </div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Your entire campus,<br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">organized in one place.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Simplify college life with events, clubs, notices and opportunities —
            all in a single, beautifully designed platform.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="h-12 px-8 text-base shadow-elegant">
              <Link to="/auth">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
              <Link to="/dashboard">View Demo</Link>
            </Button>
          </div>

          {/* Dashboard preview mock */}
          <div className="mx-auto mt-20 max-w-4xl">
            <div className="rounded-2xl border border-border bg-card p-3 shadow-elegant">
              <div className="rounded-xl bg-gradient-soft p-6">
                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    { label: "Upcoming Events", value: "12" },
                    { label: "Active Clubs", value: "48" },
                    { label: "Open Opportunities", value: "27" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg border border-border bg-card p-4 text-left shadow-card">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                      <div className="mt-1 font-display text-3xl font-bold">{s.value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-border bg-card p-4 text-left shadow-card">
                    <div className="text-sm font-semibold">TechFest 2026</div>
                    <div className="mt-1 text-xs text-muted-foreground">May 12 · CS Club</div>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4 text-left shadow-card">
                    <div className="text-sm font-semibold">Mid-sem exams begin May 2</div>
                    <div className="mt-1 text-xs text-muted-foreground">Notice · Exam</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-24">
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

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-12 text-center shadow-elegant md:p-16">
          <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">Ready to organize your campus?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">Join thousands of students already using CampixoX.</p>
          <Button asChild size="lg" variant="secondary" className="mt-8 h-12 px-8 text-base">
            <Link to="/auth">Create your account</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 text-sm text-muted-foreground">
          <Logo />
          <div>© 2026 CampixoX</div>
        </div>
      </footer>
    </div>
  );
}
