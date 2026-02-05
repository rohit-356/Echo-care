import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Heart, Users, Shield, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Human-First",
    description: "Technology serves people, not the other way around. Every feature is designed with emotional intelligence.",
  },
  {
    icon: Users,
    title: "Accessible Care",
    description: "Mental health support should be available to everyone, early, before things become overwhelming.",
  },
  {
    icon: Shield,
    title: "Safe Space",
    description: "Your thoughts and feelings are yours. Privacy and trust are foundational to everything we build.",
  },
  {
    icon: Lightbulb,
    title: "Gentle Awareness",
    description: "We don't diagnose. We help you notice patterns and offer tools — the choice is always yours.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
              About EchoCare
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We believe everyone deserves to be heard — especially when they're just beginning to notice something feels off.
            </p>
          </motion.div>
          
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-3xl border border-border shadow-card p-8 md:p-12 mb-12"
          >
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              EchoCare was born from a simple truth: many people struggle in silence because they don't realize they need support until things become overwhelming.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We're building a gentle companion that listens without judgment, notices patterns early, and offers calming support — not clinical diagnosis, but human connection powered by thoughtful technology.
            </p>
            <p className="text-lg text-foreground font-medium italic">
              "Listen early, support gently, empower always."
            </p>
          </motion.div>
          
          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="font-serif text-3xl font-semibold text-foreground text-center mb-8">
              What We Believe
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-card rounded-3xl border border-border shadow-soft p-6 hover:shadow-card transition-shadow duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Limitations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-sage-50 rounded-3xl p-8 text-center"
          >
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
              What EchoCare Is Not
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              EchoCare is not a replacement for professional mental health care. We don't diagnose conditions or prescribe treatments. If you're experiencing a mental health crisis, please reach out to a qualified professional or crisis helpline immediately.
            </p>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
