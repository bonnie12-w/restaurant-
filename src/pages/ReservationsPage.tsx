import Navbar from "@/components/Navbar";
import CartSheet from "@/components/CartSheet";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";

const ReservationsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartSheet />
      <div className="pt-20">
        <ReservationSection />
      </div>
      <Footer />
    </div>
  );
};

export default ReservationsPage;
