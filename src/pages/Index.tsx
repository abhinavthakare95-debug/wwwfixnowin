import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import Navbar from "@/components/Navbar";
import { services, stats } from "@/lib/data";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Emergency services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-hero/95 via-hero/80 to-hero/60" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
                <MapPin className="h-3.5 w-3.5" />
                Available in 50+ cities
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-hero-foreground leading-tight mb-6">
                Help arrives in{" "}
                <span className="text-gradient">minutes</span>,
                <br />not hours.
              </h1>
              <p className="text-lg text-hero-muted mb-8 max-w-lg">
                Stranded with a flat tire? Pipes leaking at 2 AM? Get verified professionals at your doorstep — fast, reliable, and tracked live on map.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/services">
                  <Button size="lg" className="text-base gap-2 animate-pulse-glow">
                    Get Help Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/provider">
                  <Button size="lg" variant="outline" className="text-base border-hero-muted/30 text-hero-foreground hover:bg-hero-foreground/10">
                    Join as Provider
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="font-heading text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Services at your fingertips
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              From roadside emergencies to home repairs — find the right expert in seconds.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <Link to="/services" key={service.id}>
                <ServiceCard {...service} index={i} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-card border-y border-border/50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-center text-foreground mb-16"
          >
            How it works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Request", desc: "Select a service and share your location. We detect it automatically." },
              { step: "02", title: "Match", desc: "Nearby verified providers receive your request and accept instantly." },
              { step: "03", title: "Track & Pay", desc: "Track your provider live on map. Pay securely after service is done." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-5xl font-heading font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hero-gradient rounded-2xl p-12 text-center"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-hero-foreground mb-4">
              Ready to get started?
            </h2>
            <p className="text-hero-muted mb-8 max-w-md mx-auto">
              Join thousands of users who trust FixNow for their emergency and home service needs.
            </p>
            <Link to="/signup">
              <Button size="lg" className="text-base">Create Free Account</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2026 FixNow. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
