import { motion } from "framer-motion";
import { Clock, Star, MapPin, CreditCard, History } from "lucide-react";
import Navbar from "@/components/Navbar";
import { mockServiceHistory } from "@/lib/data";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-1">Welcome back, User</h1>
          <p className="text-muted-foreground mb-8">Here's a summary of your activity.</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Services", value: "12", icon: History, color: "text-primary" },
            { label: "Avg Rating Given", value: "4.7", icon: Star, color: "text-warning" },
            { label: "Total Spent", value: "₹8,450", icon: CreditCard, color: "text-success" },
            { label: "Active Request", value: "None", icon: Clock, color: "text-muted-foreground" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border/50 rounded-xl p-5"
            >
              <item.icon className={`h-5 w-5 ${item.color} mb-3`} />
              <div className="font-heading text-2xl font-bold text-card-foreground">{item.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Service History */}
        <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Service History</h2>
        <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">Service</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Provider</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Rating</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Amount</th>
                </tr>
              </thead>
              <tbody>
                {mockServiceHistory.map((item) => (
                  <tr key={item.id} className="border-b border-border/30 last:border-0">
                    <td className="p-4 font-medium text-card-foreground">{item.service}</td>
                    <td className="p-4 text-muted-foreground">{item.provider}</td>
                    <td className="p-4 text-muted-foreground">{item.date}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-warning">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs">{item.rating}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right font-medium text-card-foreground">₹{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
