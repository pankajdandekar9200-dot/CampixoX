import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

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
  const [role, setRole] = useState("Student");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="relative min-h-screen bg-background">
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
              <form onSubmit={submit} className="space-y-4 pt-4">
                <div className="space-y-2"><Label htmlFor="e1">Email</Label><Input id="e1" type="email" placeholder="you@college.edu" required /></div>
                <div className="space-y-2"><Label htmlFor="p1">Password</Label><Input id="p1" type="password" required /></div>
                <Button type="submit" className="w-full shadow-elegant">Sign In</Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={submit} className="space-y-4 pt-4">
                <div className="space-y-2"><Label htmlFor="n">Full Name</Label><Input id="n" required /></div>
                <div className="space-y-2"><Label htmlFor="e2">Email</Label><Input id="e2" type="email" required /></div>
                <div className="space-y-2"><Label htmlFor="p2">Password</Label><Input id="p2" type="password" required /></div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Club Organizer">Club Organizer</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label htmlFor="c">College Name</Label><Input id="c" required /></div>
                <Button type="submit" className="w-full shadow-elegant">Create Account</Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
        <Link to="/" className="mt-6 text-center text-sm text-muted-foreground hover:text-foreground">← Back to home</Link>
      </div>
    </div>
  );
}
