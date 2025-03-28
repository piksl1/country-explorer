
import { useEffect, useRef, useState } from "react";
import { IPInfo } from "./IPInfoCard";
import { Skeleton } from "./ui/skeleton";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Info } from "lucide-react";

interface IPMapProps {
  ipInfo: IPInfo | null;
  isLoading: boolean;
}

const IPMap = ({ ipInfo, isLoading }: IPMapProps) => {
  const mapRef = useRef<HTMLIFrameElement>(null);
  const isMobile = useIsMobile();
  const [isMapHovered, setIsMapHovered] = useState(false);
  
  // Update the map when IP info changes
  useEffect(() => {
    if (!ipInfo) return;
    
    const lat = ipInfo.location.lat;
    const lng = ipInfo.location.lng;
    
    // Generate OpenStreetMap URL with markers
    if (mapRef.current) {
      // Adjust zoom level based on screen size
      const zoom = isMobile ? 12 : 14;
      mapRef.current.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}&zoom=${zoom}`;
    }
  }, [ipInfo, isMobile]);

  return (
    <div 
      className="w-full h-[60vh] md:h-[70vh] z-0 relative rounded-md overflow-hidden shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsMapHovered(true)}
      onMouseLeave={() => setIsMapHovered(false)}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-muted/20 z-10 flex items-center justify-center">
          <div className="glass glass-dark p-4 rounded-md shadow-lg">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        </div>
      )}
      
      {!ipInfo && !isLoading ? (
        <div className="h-full w-full flex flex-col items-center justify-center bg-muted/10 gap-2">
          <p className="text-muted-foreground">Search for an IP address to view location</p>
          <p className="text-xs text-muted-foreground">Your IP will be loaded automatically</p>
        </div>
      ) : (
        <>
          <iframe 
            ref={mapRef}
            className="h-full w-full border-0"
            title="IP Location Map"
            src={ipInfo ? `https://www.openstreetmap.org/export/embed.html?bbox=${ipInfo.location.lng - 0.01},${ipInfo.location.lat - 0.01},${ipInfo.location.lng + 0.01},${ipInfo.location.lat + 0.01}&layer=mapnik&marker=${ipInfo.location.lat},${ipInfo.location.lng}` : "about:blank"}
            allowFullScreen
          ></iframe>
          
          {ipInfo && (
            <div className="absolute top-2 right-2 z-10">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button className={`p-2 rounded-full ${isMapHovered ? 'bg-background/80' : 'bg-background/40'} backdrop-blur-sm transition-all duration-300 hover:bg-background/90`}>
                    <Info className="h-5 w-5 text-primary" />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-72 p-3 text-sm">
                  <div className="space-y-1">
                    <p className="font-medium">{ipInfo.location.city}, {ipInfo.location.region}</p>
                    <p className="text-xs text-muted-foreground">Lat: {ipInfo.location.lat}, Lng: {ipInfo.location.lng}</p>
                    <p className="text-xs">Click and drag to explore the map</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default IPMap;
