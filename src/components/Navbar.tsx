import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Wrench, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHero = location.pathname === "/";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isHero ? "bg-hero/80" : "bg-background/80"
      } backdrop-blur-xl border-b border-border/30`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <Wrench className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className={`font-heading font-bold text-lg ${isHero ? "text-hero-foreground" : "text-foreground"}`}>
            FixNow
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { to: "/", label: "Home" },
            { to: "/services", label: "Services" },
            { to: "/dashboard", label: "Dashboard" },
            { to: "/provider", label: "Provider" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isHero ? "text-hero-muted hover:text-primary" : "text-muted-foreground"
              } ${location.pathname === link.to ? "text-primary" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/login">
            <Button variant="outline" size="sm" className={isHero ? "border-hero-muted/30 text-hero-foreground hover:bg-hero-foreground/10" : ""}>
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          {mobileOpen ? (
            <X className={`h-6 w-6 ${isHero ? "text-hero-foreground" : "text-foreground"}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isHero ? "text-hero-foreground" : "text-foreground"}`} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className={`md:hidden ${isHero ? "bg-hero" : "bg-background"} border-b border-border/30 px-4 pb-4`}
        >
          <div className="flex flex-col gap-3">
            {[
              { to: "/", label: "Home" },
              { to: "/services", label: "Services" },
              { to: "/dashboard", label: "Dashboard" },
              { to: "/provider", label: "Provider" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium py-2 ${isHero ? "text-hero-muted" : "text-muted-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Link to="/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">Log In</Button>
              </Link>
              <Link to="/signup" className="flex-1">
                <Button size="sm" className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
