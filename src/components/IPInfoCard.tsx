
import { motion } from "framer-motion";

export type IPInfo = {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    timezone: string;
  };
  isp: string;
  countryCode?: string;
};

interface IPInfoCardProps {
  ipInfo: IPInfo | null;
  isLoading: boolean;
}

const InfoItem = ({ title, value }: { title: string; value: string }) => (
  <div className="flex flex-col md:items-start">
    <h3 className="text-xs uppercase font-bold text-muted-foreground tracking-wider mb-1">{title}</h3>
    <p className="text-lg font-medium break-words max-w-full">{value || "—"}</p>
  </div>
);

const IPInfoCard = ({ ipInfo, isLoading }: IPInfoCardProps) => {
  if (isLoading) {
    return (
      <motion.div 
        className="w-full max-w-5xl glass glass-dark rounded-lg p-6 shadow-lg grid grid-cols-1 md:grid-cols-4 gap-5 md:divide-x divide-border/50"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="md:pl-6 first:pl-0">
            <div className="h-4 w-24 bg-muted/40 rounded animate-pulse mb-3"></div>
            <div className="h-7 w-40 bg-muted/30 rounded animate-pulse"></div>
          </div>
        ))}
      </motion.div>
    );
  }

  if (!ipInfo) {
    return null;
  }

  return (
    <motion.div 
      className="w-full max-w-5xl glass glass-dark rounded-lg p-6 shadow-lg grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-border/50 text-center md:text-left"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="md:pr-6">
        <InfoItem title="IP Address" value={ipInfo.ip} />
      </div>
      <div className="md:px-6">
        <InfoItem 
          title="Location" 
          value={`${ipInfo.location.city}, ${ipInfo.location.region}, ${ipInfo.location.country}`} 
        />
      </div>
      <div className="md:px-6">
        <InfoItem title="Timezone" value={`UTC ${ipInfo.location.timezone}`} />
      </div>
      <div className="md:pl-6">
        <InfoItem title="ISP" value={ipInfo.isp} />
      </div>
    </motion.div>
  );
};

export default IPInfoCard;
