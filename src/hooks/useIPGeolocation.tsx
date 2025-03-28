
import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IPInfo } from "@/components/IPInfoCard";
import { toast } from "sonner";

// Use a free tier API key for IPify - you may need to replace this with a working key
const IPIFY_API_KEY = "at_FYrmoB7DGV17bbyAoMtUUmplQKzlj"; 

export const useIPGeolocation = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userIP, setUserIP] = useState<string | null>(null);
  
  // Function to validate IP address format
  const isValidIP = (ip: string) => {
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipPattern.test(ip);
  };
  
  // Function to validate domain format
  const isValidDomain = (domain: string) => {
    const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    return domainPattern.test(domain);
  };

  // Get the user's IP address on initial load
  useEffect(() => {
    const fetchUserIP = async () => {
      try {
        // Using a free service to get user's IP
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setUserIP(data.ip);
      } catch (error) {
        console.error("Failed to fetch user IP:", error);
        toast.error("Could not determine your IP address");
      }
    };
    
    fetchUserIP();
  }, []);

  // Query to get IP data
  const ipQuery = useQuery({
    queryKey: ["ipGeo", searchQuery || userIP],
    queryFn: async (): Promise<IPInfo> => {
      const baseUrl = "https://geo.ipify.org/api/v2/country,city";
      
      let url = `${baseUrl}?apiKey=${IPIFY_API_KEY}`;
      
      if (searchQuery) {
        // Check if it's an IP or domain
        if (isValidIP(searchQuery)) {
          url += `&ipAddress=${searchQuery}`;
        } else if (isValidDomain(searchQuery)) {
          url += `&domain=${searchQuery}`;
        } else {
          throw new Error("Invalid IP or domain format");
        }
      } else if (userIP) {
        url += `&ipAddress=${userIP}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.messages || "Failed to fetch IP information");
      }
      
      const data = await response.json();
      
      // Extract the country code for linking with Countries API
      const countryCode = data.location.country;
      
      return {
        ip: data.ip,
        location: {
          country: data.location.country,
          region: data.location.region,
          city: data.location.city,
          lat: data.location.lat,
          lng: data.location.lng,
          timezone: data.location.timezone,
        },
        isp: data.isp,
        countryCode: countryCode
      };
    },
    enabled: !!searchQuery || !!userIP, // Enable when we have either search query or user IP
    retry: 1,
    meta: {
      onError: (error: Error) => {
        toast.error(error.message || "Failed to fetch IP information");
      }
    }
  });
  
  // Function to handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);
  
  return {
    ipInfo: ipQuery.data,
    isLoading: ipQuery.isLoading,
    isError: ipQuery.isError,
    error: ipQuery.error,
    handleSearch,
  };
};
