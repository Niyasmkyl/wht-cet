
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building } from "@/types";
import { motion } from "framer-motion";
import { Search, ZoomIn, ZoomOut, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MapDisplayProps {
  buildings: Building[];
  onSelectBuilding?: (buildingId: string) => void;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ buildings, onSelectBuilding }) => {
  const [scale, setScale] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 1.5));
  };
  
  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };
  
  const mapVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } }
  };

  const handleTooltipOpen = (buildingId: string) => {
    setShowTooltip(buildingId);
  };

  const handleTooltipClose = () => {
    setShowTooltip(null);
  };

  return (
    <div className="relative">
      <Card className="glass-card border-gray-200/50 shadow-md mb-4 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-medium">Campus Map</div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={scale <= 0.5}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={scale >= 1.5}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-md">
            <motion.div
              variants={mapVariants}
              initial="initial"
              animate="animate"
              className="relative"
              style={{ transform: `scale(${scale})`, transformOrigin: "center", transition: "transform 0.2s ease-out" }}
            >
              <div className="relative">
                <img 
                  src="/lovable-uploads/84a745e3-f806-4b47-a485-ad3afba5f144.png" 
                  alt="Campus Layout" 
                  className="w-full h-auto rounded-md"
                />
                
                {/* Building Overlays */}
                <TooltipProvider>
                  {buildings.map((building) => (
                    building.mapNumber && (
                      <Tooltip key={building.id}>
                        <TooltipTrigger asChild>
                          <motion.div 
                            className="absolute cursor-pointer"
                            onClick={() => onSelectBuilding && onSelectBuilding(building.id)}
                            whileHover={{ scale: 1.1 }}
                            style={{
                              // Positions are approximated based on the map image
                              ...getMapPositionForBuilding(building.mapNumber)
                            }}
                          >
                            <div className="bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full w-8 h-8 flex items-center justify-center">
                              <span className="text-xs font-medium text-primary-foreground">
                                {building.mapNumber}
                              </span>
                            </div>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="p-1">
                            <div className="font-medium">{building.name}</div>
                            {building.description && (
                              <div className="text-xs text-muted-foreground">{building.description}</div>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    )
                  ))}
                </TooltipProvider>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-4 flex items-center">
            <Info className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Click on a numbered point to see building details</span>
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for a building or room..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

// Helper function to position elements on the map
const getMapPositionForBuilding = (mapNumber: number): React.CSSProperties => {
  const positions: Record<number, { top: string, left: string }> = {
    1: { top: "12%", left: "60%" },   // Electrical Main Block
    2: { top: "15%", left: "70%" },   // PG Block
    3: { top: "35%", left: "50%" },   // Machines Lab Block
    4: { top: "25%", left: "65%" },   // P.G. Lab Block
    33: { top: "55%", left: "35%" },  // Play Area
    // Add more positions as needed
    20: { top: "45%", left: "45%" },
    26: { top: "20%", left: "25%" },
    29: { top: "65%", left: "30%" },
    30: { top: "75%", left: "40%" },
    43: { top: "80%", left: "75%" },
  };
  
  return positions[mapNumber] || { top: "50%", left: "50%" };
};

export default MapDisplay;
