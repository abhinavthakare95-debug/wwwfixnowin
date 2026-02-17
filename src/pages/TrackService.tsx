import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Star, Clock, Navigation, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import GoogleMapComponent from "@/components/GoogleMap";
import { DEFAULT_CENTER, simulateProviderMovement } from "@/lib/maps";

const providerStart = { lat: 28.5450, lng: 77.4020 };
const userLocation = DEFAULT_CENTER;

const TrackService = () => {
  const [providerPos, setProviderPos] = useState(providerStart);
  const [step, setStep] = useState(0);
  const [eta, setEta] = useState(8);
  const totalSteps = 40;

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= totalSteps) {
          clearInterval(interval);
          return prev;
        }
        const next = prev + 1;
        setProviderPos(simulateProviderMovement(providerStart, userLocation, next, totalSteps));
        setEta(Math.max(0, Math.round(8 - (next / totalSteps) * 8)));
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const arrived = step >= totalSteps;

  const markers = [
    { id: 1, lat: providerPos.lat, lng: providerPos.lng, name: "Rajesh Kumar", service: "Mechanic", rating: 4.8 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="font-heading text-3xl font-bold text-foreground">Live Tracking</h1>
          <p className="text-muted-foreground">Your service provider is on the way</p>
        </motion.div>

        {/* Map */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GoogleMapComponent
            markers={markers}
            userLocation={userLocation}
            center={{
              lat: (providerPos.lat + userLocation.lat) / 2,
              lng: (providerPos.lng + userLocation.lng) / 2,
            }}
            zoom={14}
            className="h-[400px] mb-6"
          />
        </motion.div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`glass-card rounded-xl p-5 mb-6 border-l-4 ${arrived ? "border-l-[hsl(var(--success))]" : "border-l-primary"}`}
        >
          <div className="flex items-center gap-2 mb-1">
            {arrived ? (
              <span className="text-sm font-semibold text-[hsl(var(--success))]">✓ Provider has arrived!</span>
            ) : (
              <>
                <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold text-foreground">Provider en route</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> ETA: {eta} min</span>
            <span className="flex items-center gap-1"><Navigation className="h-3 w-3" /> {(1.2 - (step / totalSteps) * 1.2).toFixed(1)} km away</span>
          </div>
        </motion.div>

        {/* Provider info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-5 flex items-center gap-4"
        >
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-primary text-lg shrink-0">
            RK
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-heading font-semibold text-foreground">Rajesh Kumar</h4>
            <p className="text-sm text-muted-foreground">Mechanic • Vehicle Repair</p>
            <div className="flex items-center gap-1 text-xs text-[hsl(var(--warning))] mt-1">
              <Star className="h-3 w-3 fill-current" /> 4.8 • 342 jobs
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" className="h-10 w-10">
              <Phone className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" className="h-10 w-10">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrackService;
