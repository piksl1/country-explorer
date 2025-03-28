
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

interface IPSearchFormProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const IPSearchForm = ({ onSearch, isLoading }: IPSearchFormProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.form 
      className={`w-full max-w-2xl relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}
      onSubmit={handleSubmit}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Search for any IP address or domain"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pr-14 h-14 glass glass-dark shadow-md text-base transition-all duration-300 hover:shadow-lg focus:border-primary"
        />
        <Button 
          type="submit" 
          size="icon" 
          className="absolute right-1 top-1/2 -translate-y-1/2 h-12 w-12 bg-primary hover:bg-primary/90 rounded-md transition-all duration-300 hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
          ) : (
            <Search className="h-5 w-5" />
          )}
        </Button>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs text-center mt-2 text-muted-foreground"
      >
        Enter an IP address (e.g., 8.8.8.8) or a domain (e.g., google.com)
      </motion.p>
    </motion.form>
  );
};

export default IPSearchForm;
