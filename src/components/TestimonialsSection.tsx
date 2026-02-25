import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Amina K.",
    text: "The Tomahawk Ribeye is absolutely divine. Best steak experience in Nairobi, hands down.",
    rating: 5,
    avatar: "AK",
  },
  {
    name: "James M.",
    text: "The atmosphere, the service, the food — everything screams luxury. A must-visit for any food lover.",
    rating: 5,
    avatar: "JM",
  },
  {
    name: "Sarah O.",
    text: "Ordered online and the delivery was seamless. The Nyama Choma platter was incredible!",
    rating: 5,
    avatar: "SO",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4">Testimonials</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            What Our <span className="gold-gradient-text italic">Guests</span> Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {t.avatar}
                </div>
                <span className="text-foreground font-semibold text-sm">{t.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
