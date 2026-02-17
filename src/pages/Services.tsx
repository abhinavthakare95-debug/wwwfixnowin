import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ServiceCard from "@/components/ServiceCard";
import ProviderCard from "@/components/ProviderCard";
import { services, mockProviders } from "@/lib/data";
import { toast } from "sonner";

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [locationDetected, setLocationDetected] = useState(false);

  const detectLocation = () => {
    setLocationDetected(true);
    toast.success("Location detected: Sector 15, Noida");
  };

  const filteredProviders = selectedService
    ? mockProviders.filter((p) => p.service.toLowerCase() === selectedService)
    : mockProviders;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Request a Service</h1>
          <p className="text-muted-foreground mb-8">Select a service and we'll find the nearest provider for you.</p>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-4 mb-8 flex items-center gap-4"
        >
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            {locationDetected ? (
              <div>
                <p className="text-sm font-medium text-foreground">Sector 15, Noida, UP 201301</p>
                <p className="text-xs text-muted-foreground">Location detected via GPS</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Detect your location to find nearby providers</p>
            )}
          </div>
          <Button size="sm" variant={locationDetected ? "outline" : "default"} onClick={detectLocation} className="gap-2">
            <Navigation className="h-3.5 w-3.5" />
            {locationDetected ? "Update" : "Detect"}
          </Button>
        </motion.div>

        {/* Service grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              {...service}
              index={i}
              onClick={() => setSelectedService(service.id === selectedService ? null : service.id)}
            />
          ))}
        </div>

        {/* Providers */}
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
            {selectedService ? `Available ${selectedService} providers` : "Available Providers Nearby"}
          </h2>
          <div className="flex flex-col gap-3">
            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider, i) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  index={i}
                  onSelect={() => toast.success(`Request sent to ${provider.name}! They'll arrive in ${provider.eta}.`)}
                />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No providers found for this service. Try another service or location.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
