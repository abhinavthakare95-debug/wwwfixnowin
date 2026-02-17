import { motion } from "framer-motion";
import { Star, MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProviderCardProps {
  provider: {
    id: number;
    name: string;
    service: string;
    rating: number;
    jobs: number;
    distance: string;
    eta: string;
    phone: string;
    avatar: string;
  };
  onSelect?: () => void;
  index: number;
}

const ProviderCard = ({ provider, onSelect, index }: ProviderCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg"
    >
      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-primary text-lg shrink-0">
        {provider.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-heading font-semibold text-card-foreground truncate">{provider.name}</h4>
          <div className="flex items-center gap-1 text-warning text-sm shrink-0">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>{provider.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{provider.distance}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{provider.eta}</span>
          <span>{provider.jobs} jobs</span>
        </div>
      </div>
      <Button size="sm" onClick={onSelect}>Request</Button>
    </motion.div>
  );
};

export default ProviderCard;
