
import { useQuery } from "@tanstack/react-query";
import { Country, Region } from "@/lib/types";

const API_URL = "https://restcountries.com/v3.1";

// Fetch all countries with reduced fields for efficiency
export const useAllCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async (): Promise<Country[]> => {
      const response = await fetch(
        `${API_URL}/all?fields=name,population,region,capital,flags,cca3`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }
      
      const data = await response.json();
      return data as Country[];
    },
  });
};

// Fetch single country with all details
export const useCountryByCode = (code: string) => {
  return useQuery({
    queryKey: ["country", code],
    queryFn: async (): Promise<Country> => {
      if (!code) throw new Error("Country code is required");
      
      const response = await fetch(`${API_URL}/alpha/${code}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch country with code ${code}`);
      }
      
      const data = await response.json();
      return data[0] as Country;
    },
    enabled: Boolean(code),
  });
};

// Fetch border countries by codes
export const useBorderCountries = (codes?: string[]) => {
  return useQuery({
    queryKey: ["borders", codes],
    queryFn: async (): Promise<Country[]> => {
      if (!codes || codes.length === 0) return [];
      
      const codeString = codes.join(",");
      const response = await fetch(`${API_URL}/alpha?codes=${codeString}&fields=name,cca3`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch border countries");
      }
      
      const data = await response.json();
      return data as Country[];
    },
    enabled: Boolean(codes && codes.length > 0),
  });
};

// Filter and search functionality
export const useFilteredCountries = (
  countries: Country[] | undefined,
  searchQuery: string,
  selectedRegion: Region
) => {
  if (!countries) return [];

  return countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
      
    const matchesRegion =
      selectedRegion === "All" ||
      country.region === selectedRegion;
      
    return matchesSearch && matchesRegion;
  });
};
