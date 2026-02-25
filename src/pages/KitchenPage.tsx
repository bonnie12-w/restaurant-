import { useState } from "react";
import { motion } from "framer-motion";
import { ChefHat, Clock, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type OrderStatus = "paid" | "preparing" | "ready" | "delivered";

const sampleKitchenOrders = [
  { id: "SFG-A1B2C", items: ["Tomahawk Ribeye", "Truffle Fries"], status: "paid" as OrderStatus, time: "12:30 PM", type: "delivery" },
  { id: "SFG-D3E4F", items: ["Nyama Choma Platter", "Dawa Cocktail"], status: "preparing" as OrderStatus, time: "12:45 PM", type: "pickup" },
  { id: "SFG-M9N0O", items: ["Savannah Wings", "Fresh Passion Juice"], status: "paid" as OrderStatus, time: "1:15 PM", type: "pickup" },
];

const statusColors: Record<OrderStatus, string> = {
  paid: "bg-blue-500/20 text-blue-400",
  preparing: "bg-amber-500/20 text-amber-400",
  ready: "bg-green-500/20 text-green-400",
  delivered: "bg-muted text-muted-foreground",
};

const KitchenPage = () => {
  const { signOut } = useAuth();
  const [orders, setOrders] = useState(sampleKitchenOrders);

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const active = orders.filter((o) => o.status === "paid" || o.status === "preparing");

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <ChefHat className="w-6 h-6 text-primary" />
            <h1 className="font-display text-lg font-bold gold-gradient-text">Kitchen Screen</h1>
          </div>
          <button onClick={signOut} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {active.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-2xl p-6 border-2 ${
                order.status === "paid" ? "border-blue-500/50 bg-blue-500/5" : "border-amber-500/50 bg-amber-500/5"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-display text-2xl font-bold text-foreground">{order.id}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <div className="space-y-2 mb-6">
                {order.items.map((item, i) => (
                  <p key={i} className="text-lg text-foreground font-semibold">• {item}</p>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {order.time} · {order.type}
                </span>
                {order.status === "paid" && (
                  <button onClick={() => updateStatus(order.id, "preparing")} className="gold-gradient text-primary-foreground px-6 py-2 rounded-lg text-sm font-semibold">
                    Start
                  </button>
                )}
                {order.status === "preparing" && (
                  <button onClick={() => updateStatus(order.id, "ready")} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-semibold">
                    Ready
                  </button>
                )}
              </div>
            </motion.div>
          ))}
          {active.length === 0 && (
            <div className="col-span-2 text-center py-20 text-muted-foreground">
              <ChefHat className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-display text-xl">No active orders</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KitchenPage;
