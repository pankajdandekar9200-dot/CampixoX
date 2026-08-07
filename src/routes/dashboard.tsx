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
            <div className="flex items-center gap-3">
              {o.logo && (
                <img src={o.logo} alt={`${o.company} logo`} className="h-12 w-12 rounded-lg object-cover" />
              )}
              <Badge variant="secondary">{o.type}</Badge>
            </div>
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

type Note = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  type: "free" | "paid";
  price?: number;
};

const seedNotes: Note[] = [
  {
    id: "n1",
    title: "Data Structures — Quick Revision",
    description: "Concise notes covering arrays, linked lists, trees, and graphs.",
    fileUrl: "https://www.africau.edu/images/default/sample.pdf",
    fileName: "ds-revision.pdf",
    type: "free",
  },
  {
    id: "n2",
    title: "Operating Systems — Full Notes",
    description: "Comprehensive OS notes: processes, scheduling, memory, file systems.",
    fileUrl: "https://www.africau.edu/images/default/sample.pdf",
    fileName: "os-full.pdf",
    type: "paid",
    price: 99,
  },
  {
    id: "n3",
    title: "DBMS Cheat Sheet",
    description: "One-page summary of normalization, SQL, and transactions.",
    fileUrl: "https://www.africau.edu/images/default/sample.pdf",
    fileName: "dbms-cheatsheet.pdf",
    type: "free",
  },
  {
    id: "n4",
    title: "Machine Learning — Premium Pack",
    description: "Curated ML notes with worked examples and practice problems.",
    fileUrl: "https://www.africau.edu/images/default/sample.pdf",
    fileName: "ml-premium.pdf",
    type: "paid",
    price: 149,
  },
];

function NotesView() {
  const [notes, setNotes] = useState<Note[]>(seedNotes);
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"all" | "free" | "paid">("all");
  const [selected, setSelected] = useState<Note | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const filtered = notes.filter((n) => filter === "all" || n.type === filter);

  const openNote = (n: Note) => {
    if (n.type === "free" || unlocked.has(n.id)) {
      window.open(n.fileUrl, "_blank");
    } else {
      setSelected(n);
    }
  };

  const handleUnlock = () => {
    if (!selected) return;
    // Simulate payment success
    setUnlocked((prev) => new Set(prev).add(selected.id));
    const justUnlocked = selected;
    setSelected(null);
    setTimeout(() => window.open(justUnlocked.fileUrl, "_blank"), 200);
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Notes</h1>
          <p className="mt-1 text-muted-foreground">Free and premium study notes shared by your peers.</p>
        </div>
        <Button onClick={() => setShowUpload(true)} className="shadow-elegant">
          <Upload className="mr-2 h-4 w-4" /> Upload Notes
        </Button>
      </div>

      <div className="mb-6 flex gap-2">
        {(["all", "free", "paid"] as const).map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
            className="capitalize"
          >
            {f}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((n) => {
          const isUnlocked = n.type === "free" || unlocked.has(n.id);
          return (
            <div
              key={n.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <div className="flex items-start justify-between gap-2">
                {n.type === "free" ? (
                  <Badge className="bg-emerald-500 text-white hover:bg-emerald-500/90">Free</Badge>
                ) : (
                  <Badge className="bg-red-500 text-white hover:bg-red-500/90">Paid · ₹{n.price}</Badge>
                )}
                {n.type === "paid" && !isUnlocked && (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold">{n.title}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{n.description}</p>
              <Button
                size="sm"
                className="mt-4 w-full"
                variant={isUnlocked ? "default" : "secondary"}
                onClick={() => openNote(n)}
              >
                {isUnlocked ? (
                  <><Download className="mr-2 h-4 w-4" /> Open / Download</>
                ) : (
                  <><Lock className="mr-2 h-4 w-4" /> Locked</>
                )}
              </Button>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No notes found for this filter.
          </div>
        )}
      </div>

      {selected && (
        <UnlockModal note={selected} onClose={() => setSelected(null)} onUnlock={handleUnlock} />
      )}
      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onCreate={(n) => {
            setNotes((prev) => [n, ...prev]);
            setShowUpload(false);
          }}
        />
      )}
    </>
  );
}

function UnlockModal({ note, onClose, onUnlock }: { note: Note; onClose: () => void; onUnlock: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-elegant"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <h3 className="font-display text-xl font-semibold">Unlock note</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>
        <h4 className="text-base font-semibold">{note.title}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{note.description}</p>
        <div className="my-4 flex items-center justify-between rounded-lg border border-border bg-background p-3">
          <span className="text-sm text-muted-foreground">Price</span>
          <span className="font-display text-lg font-bold">₹{note.price}</span>
        </div>
        <Button className="w-full shadow-elegant" onClick={onUnlock}>Unlock / Buy</Button>
        <p className="mt-2 text-center text-xs text-muted-foreground">Payment is simulated for demo purposes.</p>
      </div>
    </div>
  );
}

function UploadModal({ onClose, onCreate }: { onClose: () => void; onCreate: (n: Note) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"free" | "paid">("free");
  const [price, setPrice] = useState("49");
  const [file, setFile] = useState<File | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !file) return;
    const fileUrl = URL.createObjectURL(file);
    onCreate({
      id: `n${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      fileUrl,
      fileName: file.name,
      type,
      price: type === "paid" ? Number(price) || 0 : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-elegant"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold">Upload note</h3>
          <Button type="button" variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">Description</label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">File (PDF / Image)</label>
            <Input
              type="file"
              accept="application/pdf,image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium">Type</label>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={type === "free" ? "default" : "outline"}
                onClick={() => setType("free")}
              >
                Free
              </Button>
              <Button
                type="button"
                size="sm"
                variant={type === "paid" ? "default" : "outline"}
                onClick={() => setType("paid")}
              >
                Paid
              </Button>
            </div>
          </div>
          {type === "paid" && (
            <div>
              <label className="mb-1 block text-xs font-medium">Price (₹)</label>
              <Input type="number" min="1" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
          )}
        </div>
        <Button type="submit" className="mt-5 w-full shadow-elegant">Upload</Button>
      </form>
    </div>
  );
}
