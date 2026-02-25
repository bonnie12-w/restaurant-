import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/context/CartContext";
import type { MenuItem } from "@/data/menu";
import { Check, Plus } from "lucide-react";

type Props = {
  item: MenuItem;
  open: boolean;
  onClose: () => void;
};

const UpsellDialog = ({ item, open, onClose }: Props) => {
  const { addItem } = useCart();
  const [selectedUpsells, setSelectedUpsells] = useState<{ name: string; price: number }[]>([]);

  const toggleUpsell = (u: { name: string; price: number }) => {
    setSelectedUpsells((prev) =>
      prev.find((p) => p.name === u.name)
        ? prev.filter((p) => p.name !== u.name)
        : [...prev, u]
    );
  };

  const handleConfirm = () => {
    addItem(item, selectedUpsells);
    onClose();
    setSelectedUpsells([]);
  };

  const handleSkip = () => {
    addItem(item);
    onClose();
    setSelectedUpsells([]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-foreground">
            Make it even better? 🔥
          </DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-sm mb-4">
          Add extras to your <span className="text-foreground font-semibold">{item.name}</span>
        </p>
        <div className="space-y-3">
          {item.upsells?.map((u) => {
            const selected = selectedUpsells.some((s) => s.name === u.name);
            return (
              <button
                key={u.name}
                onClick={() => toggleUpsell(u)}
                className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                  selected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <span className="text-sm text-foreground">{u.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-primary text-sm font-semibold">+{u.price} KES</span>
                  {selected ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Plus className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSkip}
            className="flex-1 border border-border text-foreground/70 py-3 rounded-lg text-sm font-semibold hover:bg-secondary transition-colors"
          >
            No Thanks
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 gold-gradient text-primary-foreground py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Add with Extras
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpsellDialog;
