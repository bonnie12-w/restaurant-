import { Link } from "react-router-dom";
import { ShieldX } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const UnauthorizedPage = () => {
  const { role, signOut } = useAuth();

  const dashboardLink = role === "kitchen" ? "/kitchen" : role === "rider" ? "/rider" : "/";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <ShieldX className="w-16 h-16 text-destructive mx-auto mb-6" />
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-8">You don't have permission to view this page.</p>
        <div className="flex gap-4 justify-center">
          <Link to={dashboardLink} className="gold-gradient text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold">
            Go to My Dashboard
          </Link>
          <button onClick={signOut} className="bg-secondary text-muted-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:text-foreground">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
