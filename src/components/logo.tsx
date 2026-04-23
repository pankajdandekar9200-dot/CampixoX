import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-elegant">
        <span className="font-display text-lg font-bold text-primary-foreground">C</span>
      </div>
      <span className="font-display text-xl font-bold tracking-tight">
        Campixo<span className="text-primary">X</span>
      </span>
    </Link>
  );
}
