
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import IPSearchForm from "@/components/IPSearchForm";
import IPInfoCard from "@/components/IPInfoCard";
import IPMap from "@/components/IPMap";
import Footer from "@/components/Footer";
import { useIPGeolocation } from "@/hooks/useIPGeolocation";
import { useIPCountry } from "@/hooks/useIPCountry";
import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const IPTracker = () => {
  const { ipInfo, isLoading, handleSearch } = useIPGeolocation();
  const { country, isLoading: isLoadingCountry } = useIPCountry(ipInfo);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        <div className="relative">
          <div className="bg-gradient-to-b from-primary/30 to-background/60 dark:from-primary/20 dark:to-background/90">
            <div className="container mx-auto px-6 py-12 text-center">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                IP Address Tracker
              </motion.h1>
              
              <IPSearchForm onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>
          
          <div className="container mx-auto px-6 -mt-10 mb-5 relative z-10">
            <IPInfoCard ipInfo={ipInfo} isLoading={isLoading} />
          </div>
        </div>
        
        <div className="container mx-auto px-6 py-5 flex-1">
          <IPMap ipInfo={ipInfo} isLoading={isLoading} />
          
          {country && !isLoadingCountry && (
            <motion.div 
              className="mt-8 glass glass-dark rounded-lg p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Country Information
                  </h2>
                  <p className="text-muted-foreground">
                    This IP address is located in {country.name.common}
                  </p>
                </div>
                
                <Link to={`/country/${country.cca3}`}>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 hover:bg-primary/10"
                  >
                    View Country Details
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="mt-5 flex items-center gap-4">
                {country.flags?.png && (
                  <img 
                    src={country.flags.png} 
                    alt={`Flag of ${country.name.common}`} 
                    className="h-10 w-auto object-contain rounded shadow-sm"
                  />
                )}
                <div>
                  <p><span className="font-medium">Population:</span> {country.population?.toLocaleString()}</p>
                  <p><span className="font-medium">Region:</span> {country.region}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default IPTracker;
