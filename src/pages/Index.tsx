
import { useState } from "react";
import { useAllCountries, useFilteredCountries } from "@/hooks/useCountries";
import { Region } from "@/lib/types";
import Navbar from "@/components/Navbar";
import SearchInput from "@/components/SearchInput";
import RegionFilter from "@/components/RegionFilter";
import CountryGrid from "@/components/CountryGrid";
import { motion } from "framer-motion";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<Region>("All");
  
  const { data: countries, isLoading, error } = useAllCountries();
  const filteredCountries = useFilteredCountries(countries, searchQuery, selectedRegion);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-6 py-10">
        <motion.div 
          className="w-full mb-12 flex flex-col md:flex-row gap-6 md:items-center md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-full md:max-w-md">
            <SearchInput onSearch={setSearchQuery} />
          </div>
          
          <RegionFilter 
            value={selectedRegion} 
            onChange={setSelectedRegion} 
          />
        </motion.div>

        {error ? (
          <div className="text-center py-20">
            <p className="text-destructive mb-2">Error loading countries</p>
            <p className="text-muted-foreground">Please try again later</p>
          </div>
        ) : (
          <CountryGrid 
            countries={filteredCountries} 
            isLoading={isLoading} 
          />
        )}
      </main>
    </div>
  );
};

export default Index;
