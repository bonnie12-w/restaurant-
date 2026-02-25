import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Truck, Store, CheckCircle, Loader2, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";

const deliveryZones = [
  { name: "Westlands", fee: 150 },
  { name: "CBD", fee: 200 },
  { name: "Kilimani", fee: 200 },
  { name: "Lavington", fee: 250 },
  { name: "Karen", fee: 400 },
  { name: "Lang'ata", fee: 350 },
  { name: "Kileleshwa", fee: 200 },
  { name: "Parklands", fee: 150 },
  { name: "Hurlingham", fee: 200 },
  { name: "South B/C", fee: 300 },
];

type Step = "details" | "payment" | "success";

type Props = {
  onBack: () => void;
  onComplete: () => void;
};

const CheckoutFlow = ({ onBack, onComplete }: Props) => {
  const { total, items } = useCart();
  const [step, setStep] = useState<Step>("details");
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");
  const [zone, setZone] = useState(deliveryZones[0]);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const deliveryFee = deliveryType === "delivery" ? zone.fee : 0;
  const grandTotal = total + deliveryFee;

  const handlePayment = async () => {
    if (!phone || !name || (deliveryType === "delivery" && !address)) return;
    setProcessing(true);
    // Simulate M-Pesa STK push
    await new Promise((r) => setTimeout(r, 3000));
    const orderNum = `SFG-${Date.now().toString(36).toUpperCase()}`;
    setOrderNumber(orderNum);
    setStep("success");
    setProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <div className="container max-w-lg mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Cart
              </button>

              <h2 className="font-display text-3xl font-bold text-foreground mb-8">Checkout</h2>

              <div className="space-y-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Your Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">M-Pesa Phone Number</label>
                  <div className="flex items-center gap-2 bg-secondary border border-border rounded-xl px-4 py-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 bg-transparent text-foreground focus:outline-none"
                      placeholder="0712345678"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-3 block">Delivery Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["delivery", "pickup"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setDeliveryType(type)}
                        className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                          deliveryType === type
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        {type === "delivery" ? <Truck className="w-4 h-4" /> : <Store className="w-4 h-4" />}
                        <span className="capitalize text-sm font-semibold">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {deliveryType === "delivery" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Delivery Zone</label>
                      <select
                        value={zone.name}
                        onChange={(e) => setZone(deliveryZones.find((z) => z.name === e.target.value)!)}
                        className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        {deliveryZones.map((z) => (
                          <option key={z.name} value={z.name}>
                            {z.name} – {z.fee} KES delivery
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Delivery Address</label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        rows={2}
                        placeholder="Building name, street, landmark"
                      />
                    </div>
                  </motion.div>
                )}

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal ({items.length} items)</span>
                    <span>{total.toLocaleString()} KES</span>
                  </div>
                  {deliveryType === "delivery" && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Delivery ({zone.name})</span>
                      <span>{deliveryFee.toLocaleString()} KES</span>
                    </div>
                  )}
                  <div className="flex justify-between font-display text-xl font-bold text-foreground pt-2">
                    <span>Total</span>
                    <span className="gold-gradient-text">{grandTotal.toLocaleString()} KES</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep("payment")}
                  disabled={!name || !phone || (deliveryType === "delivery" && !address)}
                  className="w-full gold-gradient text-primary-foreground py-4 rounded-xl font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Pay with M-Pesa
                </button>
              </div>
            </motion.div>
          )}

          {step === "payment" && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mb-6">
                <Phone className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">M-Pesa Payment</h2>
              <p className="text-muted-foreground mb-8 max-w-sm">
                An STK push has been sent to <span className="text-foreground font-semibold">{phone}</span>. Enter your M-Pesa PIN to complete payment.
              </p>
              <p className="gold-gradient-text font-display text-3xl font-bold mb-8">
                {grandTotal.toLocaleString()} KES
              </p>
              <button
                onClick={handlePayment}
                disabled={processing}
                className="gold-gradient text-primary-foreground px-12 py-4 rounded-xl font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                  </>
                ) : (
                  "Simulate Payment"
                )}
              </button>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-12 h-12 text-green-500" />
              </motion.div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">Order Confirmed!</h2>
              <p className="text-muted-foreground mb-4">Thank you, {name}!</p>
              <div className="glass-card rounded-xl p-6 mb-8">
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="font-display text-2xl font-bold gold-gradient-text">{orderNumber}</p>
              </div>
              <p className="text-muted-foreground text-sm mb-8 max-w-sm">
                {deliveryType === "delivery"
                  ? `Your order will be delivered to ${zone.name}. Estimated time: 30-45 minutes.`
                  : "Your order will be ready for pickup in 20-30 minutes."}
              </p>
              <button
                onClick={onComplete}
                className="gold-gradient text-primary-foreground px-8 py-4 rounded-xl font-semibold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity"
              >
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CheckoutFlow;
