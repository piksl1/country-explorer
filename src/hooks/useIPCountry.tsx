
import { useEffect, useState } from "react";
import { IPInfo } from "@/components/IPInfoCard";
import { Country } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useIPCountry = (ipInfo: IPInfo | null) => {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  
  // Update country code when IP info changes
  useEffect(() => {
    if (ipInfo?.location?.country) {
      setCountryCode(ipInfo.location.country);
    }
  }, [ipInfo]);
  
  // Fetch country data when we have a country code
  const countryQuery = useQuery({
    queryKey: ["ipCountry", countryCode],
    queryFn: async (): Promise<Country> => {
      if (!countryCode) throw new Error("No country code available");
      
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch country information");
      }
      
      const data = await response.json();
      return data[0] as Country;
    },
    enabled: !!countryCode,
  });
  
  return {
    country: countryQuery.data,
    isLoading: countryQuery.isLoading,
    isError: countryQuery.isError,
  };
};
