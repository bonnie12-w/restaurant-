import { motion } from "framer-motion";
import { Plus, AlertTriangle } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import UpsellDialog from "./UpsellDialog";

const MenuCard = ({ item, index }: { item: MenuItem; index: number }) => {
  const { addItem } = useCart();
  const [showUpsell, setShowUpsell] = useState(false);

  const handleAdd = () => {
    if (item.upsells && item.upsells.length > 0) {
      setShowUpsell(true);
    } else {
      addItem(item);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="glass-card rounded-xl overflow-hidden group hover:gold-border-glow transition-all duration-500"
      >
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

          {!item.inStock && (
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
              <span className="flex items-center gap-2 text-destructive font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" /> Out of Stock
              </span>
            </div>
          )}

          {item.inStock && item.stockQty <= 5 && (
            <span className="absolute top-3 right-3 bg-destructive/80 text-destructive-foreground text-[10px] px-2 py-1 rounded-full font-semibold uppercase tracking-wide">
              Only {item.stockQty} left
            </span>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
              {item.name}
            </h3>
            <span className="gold-gradient-text font-display font-bold text-lg whitespace-nowrap">
              {item.price.toLocaleString()} <span className="text-xs">KES</span>
            </span>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
            {item.description}
          </p>

          {item.inStock && (
            <button
              onClick={handleAdd}
              className="w-full gold-gradient text-primary-foreground py-3 rounded-lg font-semibold text-sm tracking-wide uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" /> Add to Order
            </button>
          )}
        </div>
      </motion.div>

      {showUpsell && (
        <UpsellDialog
          item={item}
          open={showUpsell}
          onClose={() => setShowUpsell(false)}
        />
      )}
    </>
  );
};

export default MenuCard;
