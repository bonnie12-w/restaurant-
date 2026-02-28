import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Clock, Utensils, Flame, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import CartSheet from "@/components/CartSheet";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartSheet />

      <div className="pt-20">
        {/* About Hero */}
        <section className="py-24 section-gradient">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4">Our Story</p>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
                About <span className="gold-gradient-text italic">Savannah Flame</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Born from a passion for authentic flame-grilled cuisine, Savannah Flame Grill brings the rich flavors 
                of the African savannah to Nairobi's vibrant dining scene. Every dish is crafted with premium ingredients, 
                grilled over open flames, and served with warmth.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
              {[
                { icon: Flame, title: "Open Flame Cooking", desc: "Every dish kissed by real fire for authentic smoky flavor." },
                { icon: Utensils, title: "Premium Ingredients", desc: "Locally sourced, sustainably farmed meats and fresh produce." },
                { icon: Users, title: "Warm Hospitality", desc: "A dining experience that feels like home, every single time." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-8 text-center"
                >
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4">Visit Us</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
                Get in <span className="gold-gradient-text italic">Touch</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl mx-auto glass-card rounded-2xl p-8 sm:p-10 space-y-5"
            >
              {[
                { icon: MapPin, text: "Westlands, Nairobi, Kenya" },
                { icon: Phone, text: "+254 712 345 678" },
                { icon: Mail, text: "hello@savannahflame.co.ke" },
                { icon: Instagram, text: "@savannahflamegrill" },
                { icon: Clock, text: "Mon – Sun: 11:00 AM – 11:00 PM" },
              ].map((item, i) => (
                <p key={i} className="flex items-center gap-4 text-muted-foreground">
                  <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{item.text}</span>
                </p>
              ))}
            </motion.div>
          </div>
        </section>

        <FAQSection />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
