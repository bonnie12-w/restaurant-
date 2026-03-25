import { MapPin, Phone, Mail, Instagram, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔥</span>
              <div>
                <h3 className="font-display text-xl font-bold gold-gradient-text">La Sauce Restaurant</h3>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">LA</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nairobi's premier The finest of Cameroonian 🇨🇲 cuisine.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" /> Nairobi, Kenya
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" /> +254 712 345 678
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" /> hello@LaSauceRestaurant.co.ke
              </p>
              <p className="flex items-center gap-3">
                <Instagram className="w-4 h-4 text-primary" /> @LaSauceRestaurant
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Hours</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary" />
                <span>Mon – Sun: 11:00 AM – 11:00 PM</span>
              </p>
              <p className="text-xs text-muted-foreground/60 mt-2">
                Open on public holidays
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-xs text-muted-foreground/50">
          © 2026 La Sauce Restaurant. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
