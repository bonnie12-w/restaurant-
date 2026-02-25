import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import CartSheet from "@/components/CartSheet";
import MenuCard from "@/components/MenuCard";
import ReservationSection from "@/components/ReservationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { menuItems } from "@/data/menu";

const Index = () => {
  const featured = menuItems.filter((i) => ["m1", "m2", "s1", "d1"].includes(i.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartSheet />

      <Hero />

      {/* Featured Menu */}
      <section className="py-24 section-gradient">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4">From Our Kitchen</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
              Signature <span className="gold-gradient-text italic">Dishes</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-primary hover:text-gold-light transition-colors font-semibold text-sm tracking-wide uppercase"
            >
              View Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4">@savannahflamegrill</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
              Follow the <span className="gold-gradient-text italic">Flame</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {menuItems.slice(0, 8).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="aspect-square rounded-xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <ReservationSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
