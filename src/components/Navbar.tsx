
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";
import { Globe, MapPin, Home } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  return (
    <motion.header 
      className="sticky top-0 z-50 glass glass-dark border-b border-border/50 backdrop-blur-lg"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
        >
          <Globe className="w-6 h-6 text-primary" aria-hidden="true" />
          <h1 className="text-xl font-medium tracking-tight">
            Countries Explorer
          </h1>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            to="/" 
            className={`flex items-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md ${location.pathname === '/' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Home className="w-5 h-5" />
            <span className="hidden md:inline">Home</span>
          </Link>
          
          <Link 
            to="/countries" 
            className={`flex items-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md ${location.pathname === '/countries' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Globe className="w-5 h-5" />
            <span className="hidden md:inline">Countries</span>
          </Link>
          
          <Link 
            to="/ip-tracker" 
            className={`flex items-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md ${location.pathname === '/ip-tracker' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <MapPin className="w-5 h-5" />
            <span className="hidden md:inline">IP Tracker</span>
          </Link>
          
          <ThemeToggle />
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
