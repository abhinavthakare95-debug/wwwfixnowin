import { Wrench, Zap, Droplets, Hammer, Wind, Bug, Car, Phone, Star, MapPin, Clock, Shield } from "lucide-react";

export const services = [
  { id: "mechanic", name: "Mechanic", icon: Wrench, description: "Vehicle repair & diagnostics", color: "from-orange-500 to-amber-500" },
  { id: "towing", name: "Vehicle Towing", icon: Car, description: "24/7 towing service", color: "from-red-500 to-orange-500" },
  { id: "plumber", name: "Plumber", icon: Droplets, description: "Pipe & water system repair", color: "from-blue-500 to-cyan-500" },
  { id: "electrician", name: "Electrician", icon: Zap, description: "Electrical fixes & wiring", color: "from-yellow-500 to-amber-400" },
  { id: "carpenter", name: "Carpenter", icon: Hammer, description: "Woodwork & furniture repair", color: "from-amber-700 to-orange-600" },
  { id: "hvac", name: "HVAC Technician", icon: Wind, description: "AC & heating repair", color: "from-teal-500 to-cyan-500" },
  { id: "pest", name: "Pest Control", icon: Bug, description: "Pest removal & prevention", color: "from-green-600 to-emerald-500" },
];

export const mockProviders = [
  { id: 1, name: "Rajesh Kumar", service: "Mechanic", rating: 4.8, jobs: 342, distance: "1.2 km", eta: "8 min", phone: "+91 98765 43210", avatar: "RK" },
  { id: 2, name: "Amit Singh", service: "Mechanic", rating: 4.6, jobs: 218, distance: "2.5 km", eta: "12 min", phone: "+91 87654 32109", avatar: "AS" },
  { id: 3, name: "Priya Sharma", service: "Electrician", rating: 4.9, jobs: 456, distance: "0.8 km", eta: "5 min", phone: "+91 76543 21098", avatar: "PS" },
  { id: 4, name: "Vikram Patel", service: "Plumber", rating: 4.7, jobs: 189, distance: "3.1 km", eta: "15 min", phone: "+91 65432 10987", avatar: "VP" },
];

export const mockServiceHistory = [
  { id: 1, service: "Mechanic", provider: "Rajesh Kumar", date: "2026-02-15", status: "completed", rating: 5, amount: 850 },
  { id: 2, service: "Electrician", provider: "Priya Sharma", date: "2026-02-10", status: "completed", rating: 4, amount: 500 },
  { id: 3, service: "Plumber", provider: "Vikram Patel", date: "2026-02-05", status: "completed", rating: 5, amount: 1200 },
];

export const stats = [
  { label: "Active Providers", value: "2,500+", icon: Shield },
  { label: "Cities Covered", value: "50+", icon: MapPin },
  { label: "Avg Response Time", value: "8 min", icon: Clock },
  { label: "Happy Customers", value: "100K+", icon: Star },
];
