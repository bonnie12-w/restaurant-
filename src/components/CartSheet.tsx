import { motion } from "framer-motion";
import { ShoppingBag, Minus, Plus, X, Truck, Store } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import CheckoutFlow from "./CheckoutFlow";

const CartSheet = () => {
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (showCheckout) {
    return <CheckoutFlow onBack={() => setShowCheckout(false)} onComplete={() => { clearCart(); setShowCheckout(false); }} />;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="fixed bottom-6 right-6 z-40 gold-gradient text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center shadow-2xl gold-border-glow"
        >
          <ShoppingBag className="w-6 h-6" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </motion.button>
      </SheetTrigger>

      <SheetContent className="bg-card border-border w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl text-foreground">Your Order</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <ShoppingBag className="w-12 h-12 mb-4 opacity-30" />
            <p className="text-lg font-display">Your cart is empty</p>
            <p className="text-sm mt-1">Add something delicious!</p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {items.map((ci) => (
              <div key={ci.item.id} className="flex gap-4 p-4 rounded-xl bg-secondary/50">
                <img
                  src={ci.item.image}
                  alt={ci.item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h4 className="font-display font-semibold text-foreground text-sm">{ci.item.name}</h4>
                    <button onClick={() => removeItem(ci.item.id)} className="text-muted-foreground hover:text-destructive">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {ci.upsells.length > 0 && (
                    <p className="text-primary text-xs mt-1">
                      + {ci.upsells.map((u) => u.name).join(", ")}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-background rounded-lg">
                      <button
                        onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                        className="p-1.5 text-muted-foreground hover:text-foreground"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{ci.quantity}</span>
                      <button
                        onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                        className="p-1.5 text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="gold-gradient-text font-bold text-sm">
                      {((ci.item.price + ci.upsells.reduce((s, u) => s + u.price, 0)) * ci.quantity).toLocaleString()} KES
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t border-border pt-4 mt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-foreground font-display text-lg">Total</span>
                <span className="gold-gradient-text font-display font-bold text-2xl">
                  {total.toLocaleString()} KES
                </span>
              </div>
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full gold-gradient text-primary-foreground py-4 rounded-xl font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity gold-border-glow"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
