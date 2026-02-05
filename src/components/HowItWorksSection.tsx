import { motion } from "framer-motion";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Start a conversation",
      description: "Simply begin talking. EchoCare will gently guide the flow.",
    },
    {
      number: "02",
      title: "Express freely",
      description: "Share what's on your mind. There's no wrong way to feel.",
    },
    {
      number: "03",
      title: "Receive gentle insights",
      description: "EchoCare reflects back what it notices, without judgment.",
    },
    {
      number: "04",
      title: "Explore support options",
      description: "Discover calming exercises and techniques that might help.",
    },
  ];

  return (
    <section className="py-24 px-6 gradient-sage">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            A gentle process
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No forms. No clinical assessments. Just authentic connection.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <span className="font-serif text-6xl font-bold text-primary/10">
                  {step.number}
                </span>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-px bg-primary/20 -translate-y-1/2" />
                )}
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
