import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — CampixoX" },
      { name: "description", content: "Sign in or create your CampixoX account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard" });
  }, [user, loading, navigate]);

  const [busy, setBusy] = useState(false);

  // sign in
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");

  // sign up
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: siEmail,
      password: siPassword,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back!");
    navigate({ to: "/dashboard" });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const redirectUrl = `${window.location.origin}/dashboard`;
    const { data, error } = await supabase.auth.signUp({
      email: suEmail,
      password: suPassword,
      options: {
        emailRedirectTo: redirectUrl,
        data: { name: suName },
      },
    });

    if (error) {
      setBusy(false);
      toast.error(error.message);
      return;
    }

    // Insert into "users" table (id, name, email, created_at)
    if (data.user) {
      const { error: insertErr } = await supabase.from("users").insert({
        id: data.user.id,
        name: suName,
        email: suEmail,
        created_at: new Date().toISOString(),
      });
      if (insertErr) {
        // Don't block signup on this — surface as warning
        console.error("users insert error:", insertErr);
        toast.error(`Profile not saved: ${insertErr.message}`);
      }
    }

    setBusy(false);
    toast.success("Account created! Check your email to confirm if required.");
    if (data.session) navigate({ to: "/dashboard" });
  };

  return (
    <div className="relative min-h-screen bg-background">
      <Toaster richColors position="top-right" />
      <div className="absolute inset-0 bg-gradient-soft" />
      <div className="pointer-events-none absolute -top-32 right-0 h-[400px] w-[600px] rounded-full bg-gradient-hero opacity-15 blur-3xl" />
      <header className="relative z-10 mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <ThemeToggle />
      </header>
      <div className="relative z-10 mx-auto flex max-w-md flex-col px-6 pb-12 pt-8">
        <div className="rounded-2xl border border-border bg-card/95 p-8 shadow-elegant backdrop-blur">
          <h1 className="font-display text-2xl font-bold">Welcome to CampixoX</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in or create an account to continue.</p>
          <Tabs defaultValue="signin" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="e1">Email</Label>
                  <Input id="e1" type="email" value={siEmail} onChange={(e) => setSiEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p1">Password</Label>
                  <Input id="p1" type="password" value={siPassword} onChange={(e) => setSiPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full shadow-elegant" disabled={busy}>
                  {busy ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="n">Full Name</Label>
                  <Input id="n" value={suName} onChange={(e) => setSuName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="e2">Email</Label>
                  <Input id="e2" type="email" value={suEmail} onChange={(e) => setSuEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p2">Password</Label>
                  <Input id="p2" type="password" value={suPassword} onChange={(e) => setSuPassword(e.target.value)} required minLength={6} />
                </div>
                <Button type="submit" className="w-full shadow-elegant" disabled={busy}>
                  {busy ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
        <Link to="/" className="mt-6 text-center text-sm text-muted-foreground hover:text-foreground">← Back to home</Link>
      </div>
    </div>
  );
}
