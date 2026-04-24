import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/campixox-logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" aria-label="CampixoX home" className={`flex items-center gap-2 ${className}`}>
      <img
        src={logoImg}
        alt="CampixoX logo"
        className="h-9 w-auto object-contain"
        loading="eager"
        decoding="async"
      />
      <span className="font-display text-xl font-bold tracking-tight">
        Campixo<span className="text-primary">X</span>
      </span>
    </Link>
  );
}
