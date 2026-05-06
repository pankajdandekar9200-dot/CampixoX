import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, Users, Bell, Briefcase, LayoutDashboard, LogOut, Search, FileText, Lock, Download, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { events, clubs, notices, opportunities } from "@/lib/mock-data";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CampixoX" },
      { name: "description", content: "Your campus dashboard: events, clubs, notices and opportunities." },
    ],
  }),
  component: Dashboard,
});

type Tab = "overview" | "events" | "clubs" | "notices" | "opportunities" | "notes";

const nav: { id: Tab; label: string; icon: typeof Calendar }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "events", label: "Events", icon: Calendar },
  { id: "clubs", label: "Clubs", icon: Users },
  { id: "notices", label: "Notices", icon: Bell },
  { id: "opportunities", label: "Opportunities", icon: Briefcase },
  { id: "notes", label: "Notes", icon: FileText },
];

function Dashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ name: string | null; email: string | null } | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("users")
        .select("name, email")
        .eq("id", user.id)
        .maybeSingle();
      if (cancelled) return;
      setProfile({
        name: data?.name ?? (user.user_metadata?.name as string) ?? null,
        email: data?.email ?? user.email ?? null,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/auth" });
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  const displayName = profile?.name ?? user.email?.split("@")[0] ?? "there";
  const displayEmail = profile?.email ?? user.email ?? "";
  const initial = (displayName?.[0] ?? "U").toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-card md:flex">
        <div className="flex h-16 items-center border-b border-border px-6"><Logo /></div>
        <nav className="flex-1 space-y-1 p-4">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                tab === n.id
                  ? "bg-gradient-hero text-primary-foreground shadow-elegant"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-border p-4">
          <div className="mb-3 rounded-lg border border-border bg-background p-3">
            <div className="truncate text-sm font-medium">{displayName}</div>
            <div className="truncate text-xs text-muted-foreground">{displayEmail}</div>
          </div>
          <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />Sign out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="md:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 px-6 backdrop-blur-xl">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search across campus..." className="pl-9" />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-gradient-hero font-display text-sm font-bold text-primary-foreground sm:flex">
              {initial}
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign out" className="md:hidden">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Mobile tabs */}
        <div className="flex gap-2 overflow-x-auto border-b border-border px-4 py-2 md:hidden">
          {nav.map((n) => (
            <Button key={n.id} size="sm" variant={tab === n.id ? "default" : "ghost"} onClick={() => setTab(n.id)}>
              {n.label}
            </Button>
          ))}
        </div>

        <main className="mx-auto max-w-7xl p-6">
          {tab === "overview" && <Overview onJump={setTab} name={displayName} email={displayEmail} />}
          {tab === "events" && <EventsView />}
          {tab === "clubs" && <ClubsView />}
          {tab === "notices" && <NoticesView />}
          {tab === "opportunities" && <OppView />}
          {tab === "notes" && <NotesView />}
        </main>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-3xl font-bold">{title}</h1>
      <p className="mt-1 text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function Overview({ onJump, name, email }: { onJump: (t: Tab) => void; name: string; email: string }) {
  const stats = [
    { label: "Upcoming Events", value: events.length, icon: Calendar },
    { label: "Active Clubs", value: clubs.length, icon: Users },
    { label: "New Notices", value: notices.length, icon: Bell },
    { label: "Open Opportunities", value: opportunities.length, icon: Briefcase },
  ];
  return (
    <>
      <SectionHeader title={`Welcome back, ${name} 👋`} subtitle={email || "Here's what's happening on campus today."} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{s.label}</div>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 font-display text-3xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Upcoming Events" onMore={() => onJump("events")}>
          {events.slice(0, 3).map((e) => (
            <Row key={e.id} title={e.title} meta={`${e.date} · ${e.organizer}`} badge={e.tag} />
          ))}
        </Card>
        <Card title="Latest Notices" onMore={() => onJump("notices")}>
          {notices.slice(0, 3).map((n) => (
            <Row key={n.id} title={n.title} meta={n.date} badge={n.category} urgent={n.urgent} />
          ))}
        </Card>
        <Card title="Featured Clubs" onMore={() => onJump("clubs")}>
          {clubs.slice(0, 3).map((c) => (
            <div key={c.id} className="flex items-center gap-3 rounded-lg border border-border/60 bg-background p-3">
              {c.logo ? (
                <img src={c.logo} alt={`${c.name} logo`} className="h-10 w-10 rounded-md object-contain" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-hero font-display text-sm font-bold text-primary-foreground">
                  {c.name[0]}
                </div>
              )}
              <div className="truncate text-sm font-medium">{c.name}</div>
            </div>
          ))}
        </Card>
        <Card title="Opportunities" onMore={() => onJump("opportunities")}>
          {opportunities.slice(0, 3).map((o) => (
            <Row key={o.id} title={o.title} meta={`${o.company} · ${o.location}`} badge={o.type} />
          ))}
        </Card>
      </div>
    </>
  );
}

function Card({ title, children, onMore }: { title: string; children: React.ReactNode; onMore: () => void }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <Button variant="ghost" size="sm" onClick={onMore}>View all</Button>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Row({ title, meta, badge, urgent }: { title: string; meta: string; badge: string; urgent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-background p-3">
      <div className="min-w-0">
        <div className="truncate text-sm font-medium">{title}</div>
        <div className="truncate text-xs text-muted-foreground">{meta}</div>
      </div>
      <Badge variant={urgent ? "destructive" : "secondary"}>{badge}</Badge>
    </div>
  );
}

function EventsView() {
  return (
    <>
      <SectionHeader title="Events Hub" subtitle="Discover and register for upcoming events." />
      <div className="grid gap-4 md:grid-cols-2">
        {events.map((e) => (
          <div key={e.id} className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant">
            <div className="flex items-start justify-between">
              <Badge variant="secondary">{e.tag}</Badge>
              <div className="text-right text-xs text-muted-foreground">{e.date}<br />{e.time}</div>
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold">{e.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">By {e.organizer}</p>
            <p className="mt-3 text-sm">{e.description}</p>
            <Button className="mt-4 w-full shadow-elegant">Register</Button>
          </div>
        ))}
      </div>
    </>
  );
}

function ClubsView() {
  return (
    <>
      <SectionHeader title="Clubs Directory" subtitle="Find your community on campus." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clubs.map((c) => (
          <div key={c.id} className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant">
            {c.logo ? (
              <img
                src={c.logo}
                alt={`${c.name} logo`}
                style={{ width: 100 }}
                className="h-auto object-contain"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-hero font-display text-xl font-bold text-primary-foreground shadow-elegant">
                {c.name[0]}
              </div>
            )}
            <h3 className="mt-4 font-display text-lg font-semibold">{c.name}</h3>
            <div className="mt-4 flex items-center justify-end">
              <Button size="sm">Join Club</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function NoticesView() {
  return (
    <>
      <SectionHeader title="Notices Board" subtitle="Official announcements from your college." />
      <div className="space-y-3">
        {notices.map((n) => (
          <div key={n.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${n.urgent ? "bg-destructive/10 text-destructive" : "bg-accent text-accent-foreground"}`}>
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <div className="font-medium">{n.title}</div>
                <div className="text-xs text-muted-foreground">{n.date}</div>
              </div>
            </div>
            <Badge variant={n.urgent ? "destructive" : "secondary"}>{n.category}</Badge>
          </div>
        ))}
      </div>
    </>
  );
}

function OppView() {
  return (
    <>
      <SectionHeader title="Opportunities" subtitle="Internships, competitions and fellowships." />
      <div className="grid gap-4 md:grid-cols-2">
        {opportunities.map((o) => (
          <div key={o.id} className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant">
            <Badge variant="secondary">{o.type}</Badge>
            <h3 className="mt-3 font-display text-lg font-semibold">{o.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{o.company} · {o.location}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Apply by {o.deadline}</span>
              <Button size="sm">Apply</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
