
import CountryCard from "./CountryCard";
import { Country } from "@/lib/types";
import { motion } from "framer-motion";

interface CountryGridProps {
  countries: Country[];
  isLoading: boolean;
}

const CountryGrid = ({ countries, isLoading }: CountryGridProps) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (countries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg text-muted-foreground mb-2">No countries found</p>
        <p className="text-sm text-muted-foreground">Try adjusting your search or filter</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05
          }
        }
      }}
    >
      {countries.map((country, index) => (
        <CountryCard key={country.cca3} country={country} index={index} />
      ))}
    </motion.div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-lg overflow-hidden shadow-sm glass glass-dark">
          <div className="aspect-[3/2] bg-muted animate-pulse" />
          <div className="p-6 space-y-4">
            <div className="h-5 bg-muted rounded animate-pulse w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
              <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
              <div className="h-4 bg-muted rounded animate-pulse w-3/5"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryGrid;
