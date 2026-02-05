import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-lavender-100/50 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-sage-100/50 blur-3xl" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
          You're not broken.
          <br />
          <span className="text-gradient-sage">You're human.</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
          Sometimes we all need someone to listen. EchoCare is here whenever you're ready.
        </p>
        <Link to="/chat">
          <Button variant="hero" size="xl" className="group">
            Start a conversation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
