
import React from "react";
import { motion } from "framer-motion";
import { Building, Room } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

interface BuildingListProps {
  buildings: Building[];
  rooms: Room[];
  searchQuery: string;
  handleSelectBuilding: (id: string) => void;
  clearFilters: () => void;
}

const BuildingList: React.FC<BuildingListProps> = ({
  buildings,
  rooms,
  searchQuery,
  handleSelectBuilding,
  clearFilters
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      {buildings.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {buildings.map(building => (
            <Card 
              key={building.id}
              className="hover-scale cursor-pointer glass-card border border-gray-200/50"
              onClick={() => handleSelectBuilding(building.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{building.name}</CardTitle>
                  {building.mapNumber && (
                    <div className="bg-primary/10 text-primary text-xs rounded-full px-2 py-1">
                      #{building.mapNumber}
                    </div>
                  )}
                </div>
                <CardDescription>{building.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {rooms.filter(room => room.buildingId === building.id).length} rooms
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-8">
          <div className="bg-gray-50 rounded-lg p-8 inline-flex flex-col items-center">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No buildings found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? `No buildings match "${searchQuery}"`
                : "There are no buildings in the database"}
            </p>
            {searchQuery && (
              <button
                className="text-sm text-primary hover:underline"
                onClick={clearFilters}
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BuildingList;
