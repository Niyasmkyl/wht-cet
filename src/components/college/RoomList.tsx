
import React from "react";
import { motion } from "framer-motion";
import { Building, Room } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import RoomCard from "@/components/RoomCard";

interface RoomListProps {
  rooms: Room[];
  selectedBuilding: string | null;
  searchQuery: string;
  findBuilding: (id: string) => Building | undefined;
  clearFilters: () => void;
}

const RoomList: React.FC<RoomListProps> = ({
  rooms,
  selectedBuilding,
  searchQuery,
  findBuilding,
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
      {selectedBuilding && (
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            Rooms in {findBuilding(selectedBuilding)?.name}
          </h3>
          <Separator className="mb-4" />
        </div>
      )}
      
      {rooms.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {rooms.map(room => {
            const buildingForRoom = findBuilding(room.buildingId);
            if (!buildingForRoom) return null;
            return (
              <RoomCard 
                key={room.id} 
                room={room} 
                building={buildingForRoom}
              />
            );
          })}
        </motion.div>
      ) : (
        <div className="text-center py-8">
          <div className="bg-gray-50 rounded-lg p-8 inline-flex flex-col items-center">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No rooms found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? `No rooms match "${searchQuery}"`
                : selectedBuilding
                ? "This building has no rooms listed"
                : "There are no rooms in the database"}
            </p>
            {(searchQuery || selectedBuilding) && (
              <button
                className="text-sm text-primary hover:underline"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RoomList;
