import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What are your opening hours?", a: "We are open daily from 11:00 AM to 11:00 PM, including public holidays." },
  { q: "Do you offer delivery?", a: "Yes! We deliver across Nairobi including Westlands, CBD, Kilimani, Lavington, Karen, and more. Delivery fees vary by zone." },
  { q: "How does M-Pesa payment work?", a: "After placing your order, you'll receive an STK push on your phone. Simply enter your M-Pesa PIN to complete payment. It's instant and secure." },
  { q: "Can I make a reservation for a large group?", a: "Absolutely! For groups of 10+, please call us directly at +254 712 345 678 for special arrangements." },
  { q: "Do you cater for private events?", a: "Yes, we offer exclusive private dining and event catering. Contact us for a custom menu and pricing." },
  { q: "Is parking available?", a: "Yes, we have secure underground parking for all our guests, complimentary with your visit." },
];

const FAQSection = () => {
  return (
    <section className="py-24 section-gradient">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4">FAQ</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            Frequently <span className="gold-gradient-text italic">Asked</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass-card rounded-xl border-none px-6"
              >
                <AccordionTrigger className="text-foreground font-display text-sm sm:text-base py-5 hover:no-underline hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
