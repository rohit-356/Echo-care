import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-sage-50 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-sage-200 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <span className="font-serif text-xl font-semibold text-foreground">EchoCare</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Listening early, supporting gently. A safe space for emotional awareness and growth.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Explore</h4>
            <div className="flex flex-col gap-2">
              <Link to="/chat" className="text-muted-foreground hover:text-foreground transition-colors">Talk to EchoCare</Link>
              <Link to="/insights" className="text-muted-foreground hover:text-foreground transition-colors">Emotional Insights</Link>
              <Link to="/care" className="text-muted-foreground hover:text-foreground transition-colors">Care Tools</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">About</h4>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">Our Mission</Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy & Ethics</Link>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 EchoCare. Built with care for your wellbeing.
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="inline-block w-2 h-2 rounded-full bg-sage-400 animate-pulse-soft mr-2" />
            Not a replacement for professional help
          </p>
        </div>
      </div>
    </footer>
  );
}
