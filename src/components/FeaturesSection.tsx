import { motion } from "framer-motion";
import { Brain, Shield, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Emotional Check-Ins",
    description: "A safe space to explore how you're really feeling, at your own pace.",
    color: "bg-sage-100",
  },
  {
    icon: Brain,
    title: "Early Signal Detection",
    description: "Gently notices patterns of stress, burnout, or emotional fatigue.",
    color: "bg-sky-100",
  },
  {
    icon: Sparkles,
    title: "Guided Support",
    description: "Breathing exercises, journaling prompts, and grounding techniques.",
    color: "bg-lavender-100",
  },
  {
    icon: Shield,
    title: "Safe & Private",
    description: "Your conversations stay yours. Built with care and transparency.",
    color: "bg-cream-100",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            How EchoCare supports you
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Like having a calm conversation with someone who truly listens.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-3xl bg-card border border-border/50 shadow-soft hover:shadow-card transition-all duration-500 hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
