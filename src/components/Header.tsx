import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Header() {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Talk", path: "/chat" },
    { name: "Insights", path: "/insights" },
    { name: "Care Tools", path: "/care" },
    { name: "About", path: "/about" },
    { name: "Team", path: "/team" },
  ];
  
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between bg-card/80 backdrop-blur-lg rounded-3xl px-6 py-3 shadow-soft border border-border/50">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-sage-200 flex items-center justify-center group-hover:bg-sage-300 transition-colors duration-300">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ripple opacity-0 group-hover:opacity-100" />
          </div>
          <span className="font-serif text-xl font-semibold text-foreground">EchoCare</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-sage-100 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-sage-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <Link to="/chat">
          <Button variant="hero" size="sm">
            Start Talking
          </Button>
        </Link>
      </nav>
    </motion.header>
  );
}
