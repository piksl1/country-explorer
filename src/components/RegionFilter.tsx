
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Region, regions } from "@/lib/types";

interface RegionFilterProps {
  value: Region;
  onChange: (value: Region) => void;
}

const RegionFilter = ({ value, onChange }: RegionFilterProps) => {
  return (
    <div className="w-full max-w-[220px]">
      <Select 
        value={value} 
        onValueChange={(val) => onChange(val as Region)}
      >
        <SelectTrigger className="glass glass-dark h-12 border-input/50 focus:ring-2 focus:ring-primary/10 transition-all">
          <SelectValue placeholder="Filter by Region" />
        </SelectTrigger>
        <SelectContent className="glass glass-dark border-input/50 backdrop-blur-lg">
          <SelectItem value="All" className="focus:bg-primary/10">All Regions</SelectItem>
          {regions.map((region) => (
            <SelectItem 
              key={region} 
              value={region}
              className="focus:bg-primary/10"
            >
              {region}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RegionFilter;
