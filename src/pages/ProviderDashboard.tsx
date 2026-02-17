import { useState } from "react";
import { motion } from "framer-motion";
import { Power, MapPin, Star, Clock, CreditCard, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import GoogleMapComponent from "@/components/GoogleMap";
import { DEFAULT_CENTER } from "@/lib/maps";
import { toast } from "sonner";

const mockRequests = [
  { id: 1, user: "Rahul M.", service: "Flat tire repair", distance: "1.2 km", time: "2 min ago" },
  { id: 2, user: "Sneha K.", service: "Engine won't start", distance: "3.5 km", time: "5 min ago" },
];

const ProviderDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [requests, setRequests] = useState(mockRequests);

  const toggleOnline = () => {
    setIsOnline(!isOnline);
    toast(isOnline ? "You're now offline" : "You're now online! Waiting for requests...");
  };

  const handleRequest = (id: number, accept: boolean) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    toast(accept ? "Request accepted! Navigate to user." : "Request declined.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Provider Dashboard</h1>
            <p className="text-muted-foreground">Rajesh Kumar • Mechanic</p>
          </div>
          <Button
            size="lg"
            onClick={toggleOnline}
            className={`gap-2 ${isOnline ? "bg-success hover:bg-success/90" : ""}`}
            variant={isOnline ? "default" : "outline"}
          >
            <Power className="h-4 w-4" />
            {isOnline ? "Online" : "Go Online"}
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Today's Earnings", value: "₹2,400", icon: CreditCard },
            { label: "Jobs Completed", value: "342", icon: CheckCircle },
            { label: "Rating", value: "4.8", icon: Star },
            { label: "Response Time", value: "3 min", icon: Clock },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border/50 rounded-xl p-5"
            >
              <item.icon className="h-5 w-5 text-primary mb-3" />
              <div className="font-heading text-2xl font-bold text-card-foreground">{item.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Map */}
        {isOnline && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-3">Your Location</h2>
            <GoogleMapComponent
              markers={[{ id: 99, lat: DEFAULT_CENTER.lat + 0.003, lng: DEFAULT_CENTER.lng + 0.005, name: "You (Rajesh Kumar)", service: "Mechanic", isUser: true }]}
              center={DEFAULT_CENTER}
              zoom={15}
              className="h-[250px]"
            />
          </motion.div>
        )}

        {/* Incoming requests */}
        <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Incoming Requests</h2>
        {!isOnline ? (
          <div className="text-center py-12 text-muted-foreground bg-card border border-border/50 rounded-xl">
            Go online to start receiving requests.
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground bg-card border border-border/50 rounded-xl">
            No requests right now. Stay tuned!
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {requests.map((req) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card border border-border/50 rounded-xl p-5 flex items-center gap-4"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-primary">
                  {req.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-semibold text-card-foreground">{req.user}</h4>
                  <p className="text-sm text-muted-foreground">{req.service}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{req.distance}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{req.time}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleRequest(req.id, true)} className="gap-1">
                    <CheckCircle className="h-3.5 w-3.5" /> Accept
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleRequest(req.id, false)} className="gap-1">
                    <XCircle className="h-3.5 w-3.5" /> Decline
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
