
import { Country } from "@/lib/types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

interface CountryCardProps {
  country: Country;
  index: number;
}

const CountryCard = ({ country, index }: CountryCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Format population with commas
  const formatPopulation = (population?: number) => {
    return population?.toLocaleString() || "N/A";
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }),
    hover: {
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  };

  return (
    <motion.div
      className="h-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={`/country/${country.cca3}`}
        className="block h-full focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-lg"
      >
        <div className={`h-full rounded-lg overflow-hidden glass glass-dark shadow-sm transition-all duration-300 ${isHovered ? 'shadow-md' : ''}`}>
          <div className="relative aspect-[3/2] overflow-hidden bg-muted">
            {!isLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700"></div>
            )}
            <img
              src={country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className={`h-full w-full object-cover transition-all duration-700 ease-in-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
              onLoad={() => setIsLoaded(true)}
            />
          </div>

          <div className="p-6">
            <h3 className="font-semibold text-lg mb-4 line-clamp-1 text-balance">{country.name.common}</h3>
            
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Population:</span>{" "}
                <span className="text-muted-foreground">{formatPopulation(country.population)}</span>
              </p>
              <p>
                <span className="font-medium">Region:</span>{" "}
                <span className="text-muted-foreground">{country.region || "N/A"}</span>
              </p>
              <p>
                <span className="font-medium">Capital:</span>{" "}
                <span className="text-muted-foreground">{country.capital?.[0] || "N/A"}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CountryCard;
