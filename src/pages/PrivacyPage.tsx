import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Lock, Eye, Database, Shield, AlertTriangle } from "lucide-react";

const privacyPoints = [
  {
    icon: Lock,
    title: "Encrypted Conversations",
    description: "All your conversations are encrypted in transit and at rest. Your words stay between you and EchoCare.",
  },
  {
    icon: Eye,
    title: "No Human Review",
    description: "Your conversations are never read by humans unless you explicitly choose to share them.",
  },
  {
    icon: Database,
    title: "Data Ownership",
    description: "You own your data. You can export or delete everything at any time, no questions asked.",
  },
  {
    icon: Shield,
    title: "No Selling Data",
    description: "We will never sell, share, or monetize your personal information or emotional data.",
  },
];

const ethicsPoints = [
  {
    title: "Transparency About AI",
    content: "EchoCare uses AI to provide support, but we're clear about its limitations. AI cannot replace human connection or professional care.",
  },
  {
    title: "No Diagnosis",
    content: "We help you notice patterns and feelings, but we never label or diagnose. Mental health is complex and deserves qualified human expertise.",
  },
  {
    title: "Crisis Responsibility",
    content: "If we detect signs of crisis, we gently encourage you to seek help from professionals and provide relevant resources — never creating panic.",
  },
  {
    title: "Inclusive Design",
    content: "We design for diverse experiences, cultures, and backgrounds. Emotional wellbeing looks different for everyone.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
              Privacy & Ethics
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Trust is the foundation of healing. Here's how we protect yours.
            </p>
          </motion.div>
          
          {/* Privacy Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-8 text-center">
              Your Privacy
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {privacyPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-card rounded-3xl border border-border shadow-soft p-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center mb-4">
                    <point.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Ethics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="font-serif text-3xl font-semibold text-foreground mb-8 text-center">
              Our Ethical Commitments
            </h2>
            
            <div className="space-y-4">
              {ethicsPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-card rounded-2xl border border-border shadow-soft p-6"
                >
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {point.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-lavender-100/50 rounded-3xl p-8 border border-lavender-200"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-lavender-200 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  Important Notice
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  EchoCare is designed as a supportive tool, not a medical device. If you're experiencing thoughts of self-harm, suicidal ideation, or a mental health emergency, please contact emergency services or a crisis helpline in your area immediately.
                </p>
                <div className="mt-4 p-4 bg-card rounded-xl">
                  <p className="text-sm font-medium text-foreground">
                    Crisis Resources:
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    • National Suicide Prevention Lifeline: 988 (US)
                    <br />
                    • Crisis Text Line: Text HOME to 741741
                    <br />
                    • International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
