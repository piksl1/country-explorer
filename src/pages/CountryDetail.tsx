
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCountryByCode, useBorderCountries } from "@/hooks/useCountries";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CountryDetail = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  
  const { data: country, isLoading: isLoadingCountry, error } = useCountryByCode(code || "");
  const { data: borderCountries, isLoading: isLoadingBorders } = useBorderCountries(country?.borders);

  // Helper functions for formatting data
  const getFormattedNativeNames = (country: any) => {
    if (!country?.name?.nativeName) return "N/A";
    return Object.values(country.name.nativeName)
      .map((name: any) => name.common)
      .join(", ");
  };

  const getFormattedCurrencies = (country: any) => {
    if (!country?.currencies) return "N/A";
    return Object.values(country.currencies)
      .map((currency: any) => `${currency.name} (${currency.symbol})`)
      .join(", ");
  };

  const getFormattedLanguages = (country: any) => {
    if (!country?.languages) return "N/A";
    return Object.values(country.languages).join(", ");
  };

  if (isLoadingCountry) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-6 py-10 flex-1 flex items-center justify-center">
          <div className="animate-pulse text-2xl text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-6 py-10 flex-1 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">Country not found</h2>
          <p className="text-muted-foreground mb-8">We couldn't find the country you're looking for.</p>
          <Button onClick={() => navigate("/")} variant="outline">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <Button 
            variant="outline" 
            className="glass glass-dark gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="relative overflow-hidden rounded-lg shadow-md aspect-video bg-muted"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img
              src={country.flags.svg || country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <div className="space-y-8">
            <motion.h2 
              className="text-3xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {country.name.common}
            </motion.h2>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Native Name: </span>
                  <span className="text-muted-foreground">{getFormattedNativeNames(country)}</span>
                </p>
                <p>
                  <span className="font-semibold">Population: </span>
                  <span className="text-muted-foreground">{country.population?.toLocaleString() || "N/A"}</span>
                </p>
                <p>
                  <span className="font-semibold">Region: </span>
                  <span className="text-muted-foreground">{country.region || "N/A"}</span>
                </p>
                <p>
                  <span className="font-semibold">Sub Region: </span>
                  <span className="text-muted-foreground">{country.subregion || "N/A"}</span>
                </p>
                <p>
                  <span className="font-semibold">Capital: </span>
                  <span className="text-muted-foreground">{country.capital?.[0] || "N/A"}</span>
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Top Level Domain: </span>
                  <span className="text-muted-foreground">{country.tld?.[0] || "N/A"}</span>
                </p>
                <p>
                  <span className="font-semibold">Currencies: </span>
                  <span className="text-muted-foreground">{getFormattedCurrencies(country)}</span>
                </p>
                <p>
                  <span className="font-semibold">Languages: </span>
                  <span className="text-muted-foreground">{getFormattedLanguages(country)}</span>
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <h3 className="font-semibold text-lg mb-4">Border Countries:</h3>
              
              {isLoadingBorders ? (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="px-6 py-2 rounded-md glass glass-dark animate-pulse w-24 h-10"
                    />
                  ))}
                </div>
              ) : borderCountries && borderCountries.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {borderCountries.map((border) => (
                    <Link
                      key={border.cca3}
                      to={`/country/${border.cca3}`}
                      className="px-6 py-2 glass glass-dark rounded-md text-sm font-medium hover:bg-primary/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      {border.name.common}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No bordering countries</p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CountryDetail;
