import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  name: string;
  icon: LucideIcon;
  description: string;
  color: string;
  onClick?: () => void;
  index: number;
}

const ServiceCard = ({ name, icon: Icon, description, color, onClick, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group cursor-pointer rounded-xl bg-card border border-border/50 p-6 transition-shadow hover:shadow-xl hover:shadow-primary/10"
    >
      <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="h-6 w-6 text-primary-foreground" />
      </div>
      <h3 className="font-heading font-semibold text-card-foreground mb-1">{name}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;
