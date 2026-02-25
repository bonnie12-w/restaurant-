import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart3, ShoppingCart, Package, Truck, ChefHat, Clock, TrendingUp,
  DollarSign, AlertTriangle, Bell, ArrowLeft, Search, Filter, LogOut
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { menuItems } from "@/data/menu";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from "recharts";

type OrderStatus = "paid" | "preparing" | "ready" | "delivered";
type Tab = "orders" | "kitchen" | "inventory" | "analytics" | "reports";

const sampleOrders = [
  { id: "SFG-A1B2C", customer: "Amina K.", phone: "0712345678", items: ["Tomahawk Ribeye", "Truffle Fries"], total: 5050, status: "paid" as OrderStatus, time: "12:30 PM", type: "delivery", zone: "Westlands" },
  { id: "SFG-D3E4F", customer: "James M.", phone: "0723456789", items: ["Nyama Choma Platter", "Dawa Cocktail"], total: 3550, status: "preparing" as OrderStatus, time: "12:45 PM", type: "pickup", zone: "" },
  { id: "SFG-G5H6I", customer: "Sarah O.", phone: "0734567890", items: ["Flame-Grilled Prawns", "Smoky Old Fashioned"], total: 2150, status: "ready" as OrderStatus, time: "1:00 PM", type: "delivery", zone: "Kilimani" },
  { id: "SFG-J7K8L", customer: "David W.", phone: "0745678901", items: ["Grilled Lamb Chops", "Crème Brûlée"], total: 3900, status: "delivered" as OrderStatus, time: "11:15 AM", type: "delivery", zone: "Karen" },
  { id: "SFG-M9N0O", customer: "Lucy N.", phone: "0756789012", items: ["Savannah Wings", "Fresh Passion Juice"], total: 1200, status: "paid" as OrderStatus, time: "1:15 PM", type: "pickup", zone: "" },
];

const revenueData = [
  { day: "Mon", revenue: 45000 }, { day: "Tue", revenue: 52000 }, { day: "Wed", revenue: 48000 },
  { day: "Thu", revenue: 61000 }, { day: "Fri", revenue: 78000 }, { day: "Sat", revenue: 95000 }, { day: "Sun", revenue: 82000 },
];

const ordersData = [
  { day: "Mon", orders: 24 }, { day: "Tue", orders: 28 }, { day: "Wed", orders: 22 },
  { day: "Thu", orders: 35 }, { day: "Fri", orders: 42 }, { day: "Sat", orders: 55 }, { day: "Sun", orders: 48 },
];

const topItems = [
  { name: "Tomahawk Ribeye", sales: 45, revenue: 202500 },
  { name: "Nyama Choma", sales: 38, revenue: 106400 },
  { name: "Savannah Wings", sales: 52, revenue: 44200 },
  { name: "Dawa Cocktail", sales: 41, revenue: 30750 },
];

const pieData = [
  { name: "Delivery", value: 60 }, { name: "Pickup", value: 25 }, { name: "Dine-in", value: 15 },
];
const PIE_COLORS = ["hsl(43,72%,53%)", "hsl(228,15%,40%)", "hsl(43,60%,35%)"];

const statusColors: Record<OrderStatus, string> = {
  paid: "bg-blue-500/20 text-blue-400",
  preparing: "bg-amber-500/20 text-amber-400",
  ready: "bg-green-500/20 text-green-400",
  delivered: "bg-muted text-muted-foreground",
};

const AdminDashboard = () => {
  const { signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState(sampleOrders);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [inventory, setInventory] = useState(menuItems.map((i) => ({ ...i })));

  const filteredOrders = statusFilter === "all" ? orders : orders.filter((o) => o.status === statusFilter);

  const updateOrderStatus = (id: string, newStatus: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  const tabs = [
    { id: "orders" as Tab, label: "Orders", icon: ShoppingCart },
    { id: "kitchen" as Tab, label: "Kitchen", icon: ChefHat },
    { id: "inventory" as Tab, label: "Inventory", icon: Package },
    { id: "analytics" as Tab, label: "Analytics", icon: BarChart3 },
    { id: "reports" as Tab, label: "Reports", icon: TrendingUp },
  ];

  const todayStats = {
    totalSales: orders.reduce((s, o) => s + o.total, 0),
    totalOrders: orders.length,
    bestSeller: "Tomahawk Ribeye",
    avgOrder: Math.round(orders.reduce((s, o) => s + o.total, 0) / orders.length),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Main</span>
            </Link>
            <div>
              <h1 className="font-display text-lg font-bold gold-gradient-text">Admin Dashboard</h1>
              <p className="text-[10px] text-muted-foreground tracking-wider uppercase">Savannah Flame Grill</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
            </button>
            <button onClick={signOut} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                tab === t.id ? "gold-gradient text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {tab === "orders" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-wrap gap-3 mb-6">
              {(["all", "paid", "preparing", "ready", "delivered"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all ${
                    statusFilter === s ? "gold-gradient text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {s === "all" ? "All" : s} ({s === "all" ? orders.length : orders.filter((o) => o.status === s).length})
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="glass-card rounded-xl p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-display font-bold text-foreground">{order.id}</span>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{order.customer} · <span className="text-muted-foreground">{order.phone}</span></p>
                      <p className="text-sm text-muted-foreground mt-1">{order.items.join(", ")}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {order.time}</span>
                        <span className="capitalize">{order.type}{order.zone ? ` · ${order.zone}` : ""}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="gold-gradient-text font-display font-bold text-lg">{order.total.toLocaleString()} KES</p>
                      <div className="flex gap-2 mt-3">
                        {order.status === "paid" && (
                          <button onClick={() => updateOrderStatus(order.id, "preparing")} className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-semibold">
                            Start Preparing
                          </button>
                        )}
                        {order.status === "preparing" && (
                          <button onClick={() => updateOrderStatus(order.id, "ready")} className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 text-xs font-semibold">
                            Mark Ready
                          </button>
                        )}
                        {order.status === "ready" && (
                          <button onClick={() => updateOrderStatus(order.id, "delivered")} className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-semibold">
                            Mark Delivered
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Kitchen Tab */}
        {tab === "kitchen" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.filter((o) => o.status === "paid" || o.status === "preparing").map((order) => (
                <div key={order.id} className={`rounded-2xl p-6 border-2 ${
                  order.status === "paid" ? "border-blue-500/50 bg-blue-500/5" : "border-amber-500/50 bg-amber-500/5"
                }`}>
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
                      <button onClick={() => updateOrderStatus(order.id, "preparing")} className="gold-gradient text-primary-foreground px-6 py-2 rounded-lg text-sm font-semibold">
                        Start
                      </button>
                    )}
                    {order.status === "preparing" && (
                      <button onClick={() => updateOrderStatus(order.id, "ready")} className="bg-green-500 text-primary-foreground px-6 py-2 rounded-lg text-sm font-semibold">
                        Ready
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {orders.filter((o) => o.status === "paid" || o.status === "preparing").length === 0 && (
                <div className="col-span-2 text-center py-20 text-muted-foreground">
                  <ChefHat className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="font-display text-xl">No active orders</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Inventory Tab */}
        {tab === "inventory" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="space-y-3">
              {inventory.map((item) => (
                <div key={item.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-display font-semibold text-foreground text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.category} · {item.price.toLocaleString()} KES</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {item.stockQty <= 5 && item.stockQty > 0 && (
                      <span className="flex items-center gap-1 text-amber-400 text-xs">
                        <AlertTriangle className="w-3 h-3" /> Low
                      </span>
                    )}
                    {item.stockQty === 0 && (
                      <span className="text-destructive text-xs font-semibold">Out of Stock</span>
                    )}
                    <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-1.5">
                      <button
                        onClick={() => setInventory((prev) => prev.map((i) => i.id === item.id ? { ...i, stockQty: Math.max(0, i.stockQty - 1), inStock: i.stockQty - 1 > 0 } : i))}
                        className="text-muted-foreground hover:text-foreground text-sm"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold w-8 text-center text-foreground">{item.stockQty}</span>
                      <button
                        onClick={() => setInventory((prev) => prev.map((i) => i.id === item.id ? { ...i, stockQty: i.stockQty + 1, inStock: true } : i))}
                        className="text-muted-foreground hover:text-foreground text-sm"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => setInventory((prev) => prev.map((i) => i.id === item.id ? { ...i, inStock: !i.inStock } : i))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        item.inStock ? "bg-green-500/20 text-green-400" : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {item.inStock ? "In Stock" : "Out"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {tab === "analytics" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Today's Revenue", value: `${todayStats.totalSales.toLocaleString()} KES`, icon: DollarSign },
                { label: "Total Orders", value: todayStats.totalOrders, icon: ShoppingCart },
                { label: "Best Seller", value: todayStats.bestSeller, icon: TrendingUp },
                { label: "Avg. Order", value: `${todayStats.avgOrder.toLocaleString()} KES`, icon: BarChart3 },
              ].map((stat, i) => (
                <div key={i} className="glass-card rounded-xl p-5">
                  <stat.icon className="w-5 h-5 text-primary mb-3" />
                  <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Revenue (This Week)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(228,12%,18%)" />
                    <XAxis dataKey="day" stroke="hsl(228,8%,55%)" fontSize={12} />
                    <YAxis stroke="hsl(228,8%,55%)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "hsl(228,18%,10%)", border: "1px solid hsl(228,12%,18%)", borderRadius: "8px", color: "hsl(40,10%,92%)" }} />
                    <Bar dataKey="revenue" fill="hsl(43,72%,53%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Orders Per Day</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={ordersData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(228,12%,18%)" />
                    <XAxis dataKey="day" stroke="hsl(228,8%,55%)" fontSize={12} />
                    <YAxis stroke="hsl(228,8%,55%)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "hsl(228,18%,10%)", border: "1px solid hsl(228,12%,18%)", borderRadius: "8px", color: "hsl(40,10%,92%)" }} />
                    <Line type="monotone" dataKey="orders" stroke="hsl(43,72%,53%)" strokeWidth={2} dot={{ fill: "hsl(43,72%,53%)" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Order Type Split</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "hsl(228,18%,10%)", border: "1px solid hsl(228,12%,18%)", borderRadius: "8px", color: "hsl(40,10%,92%)" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Top Selling Items</h3>
                <div className="space-y-4">
                  {topItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.sales} orders</p>
                        </div>
                      </div>
                      <span className="gold-gradient-text font-semibold text-sm">{item.revenue.toLocaleString()} KES</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Reports Tab */}
        {tab === "reports" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="glass-card rounded-2xl p-8 max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">Daily Report</h3>
                  <p className="text-xs text-muted-foreground">Auto-generated at 10:00 PM</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Total Revenue", value: "461,000 KES" },
                  { label: "Total Orders", value: "254" },
                  { label: "Best Selling Item", value: "Tomahawk Ribeye (45 orders)" },
                  { label: "M-Pesa Revenue", value: "438,950 KES (95.2%)" },
                  { label: "Average Order Value", value: "1,815 KES" },
                  { label: "Delivery Orders", value: "152 (59.8%)" },
                  { label: "Pickup Orders", value: "64 (25.2%)" },
                  { label: "Dine-in Orders", value: "38 (15%)" },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{r.label}</span>
                    <span className="text-sm font-semibold text-foreground">{r.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-xs text-primary">📧 Email summary sent to admin@savannahflame.co.ke</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
