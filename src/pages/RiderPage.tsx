import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, MapPin, Phone, LogOut, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type DeliveryStatus = "ready" | "delivered";

const sampleDeliveries: { id: string; customer: string; phone: string; zone: string; items: string[]; status: DeliveryStatus }[] = [
  { id: "SFG-A1B2C", customer: "Amina K.", phone: "0712345678", zone: "Westlands", items: ["Tomahawk Ribeye", "Truffle Fries"], status: "ready" },
  { id: "SFG-G5H6I", customer: "Sarah O.", phone: "0734567890", zone: "Kilimani", items: ["Flame-Grilled Prawns"], status: "ready" },
];

const RiderPage = () => {
  const { signOut } = useAuth();
  const [deliveries, setDeliveries] = useState(sampleDeliveries);

  const markDelivered = (id: string) => {
    setDeliveries((prev) => prev.map((d) => (d.id === id ? { ...d, status: "delivered" as const } : d)));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-primary" />
            <h1 className="font-display text-lg font-bold gold-gradient-text">Deliveries</h1>
          </div>
          <button onClick={signOut} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-4">
        {deliveries.map((d) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-card rounded-xl p-5 ${d.status === "delivered" ? "opacity-50" : ""}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-display font-bold text-foreground">{d.id}</span>
                <p className="text-sm text-foreground mt-1">{d.customer}</p>
                <p className="text-sm text-muted-foreground mt-1">{d.items.join(", ")}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {d.zone}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {d.phone}</span>
                </div>
              </div>
              <div>
                {d.status === "ready" ? (
                  <button
                    onClick={() => markDelivered(d.id)}
                    className="gold-gradient text-primary-foreground px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" /> Mark Delivered
                  </button>
                ) : (
                  <span className="text-primary text-xs font-semibold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Delivered
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RiderPage;
