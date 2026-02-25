import { useState } from "react";
import { motion } from "framer-motion";
import { categories, menuItems } from "@/data/menu";
import MenuCard from "@/components/MenuCard";
import Navbar from "@/components/Navbar";
import CartSheet from "@/components/CartSheet";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("starters");

  const filtered = menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartSheet />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4">Our Menu</p>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-foreground">
              Flame-Grilled <span className="gold-gradient-text italic">Excellence</span>
            </h1>
          </motion.div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all ${
                  activeCategory === cat.id
                    ? "gold-gradient text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* Menu grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
