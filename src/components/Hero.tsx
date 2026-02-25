import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-primary tracking-[0.4em] uppercase text-xs sm:text-sm mb-6"
          >
            Nairobi's Finest Grill Experience
          </motion.p>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6">
            <span className="block text-foreground">Where Fire</span>
            <span className="block gold-gradient-text italic">Meets Flavour</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-foreground/60 text-lg sm:text-xl max-w-xl mx-auto mb-10 font-body"
          >
            Premium flame-grilled steaks, authentic Kenyan cuisine, and world-class cocktails in an unforgettable atmosphere.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/menu"
              className="gold-gradient text-primary-foreground px-8 py-4 rounded-full font-body font-semibold text-sm tracking-wide uppercase flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg gold-border-glow"
            >
              Order Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/#reservations"
              className="border border-primary/40 text-primary px-8 py-4 rounded-full font-body font-semibold text-sm tracking-wide uppercase hover:bg-primary/10 transition-colors"
            >
              Reserve a Table
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex items-center justify-center gap-8 mt-16 text-muted-foreground text-sm"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Westlands, Nairobi</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Open 11AM – 11PM</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
