
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Room, RoomType } from "@/types";
import { Building2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface RoomCardProps {
  room: Room;
  building: Building;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, building }) => {
  const navigate = useNavigate();
  
  const getRoomTypeColor = (type: RoomType) => {
    switch (type) {
      case RoomType.CLASSROOM:
        return "bg-blue-100 text-blue-800";
      case RoomType.LAB:
        return "bg-green-100 text-green-800";
      case RoomType.OFFICE:
        return "bg-purple-100 text-purple-800";
      case RoomType.LECTURE_HALL:
        return "bg-amber-100 text-amber-800";
      case RoomType.COMMON_AREA:
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <Card 
        className="h-full glass-card hover-scale cursor-pointer border border-gray-200/50"
        onClick={() => navigate(`/college/room/${room.id}`)}
      >
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{room.name}</CardTitle>
            <Badge className={`${getRoomTypeColor(room.type)}`}>
              {room.type.replace('_', ' ')}
            </Badge>
          </div>
          <CardDescription>{room.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-center text-muted-foreground text-sm">
            <Building2 className="h-4 w-4 mr-2" />
            {building.name}, Floor {room.floor}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="text-sm">
            {building.mapNumber && (
              <span className="text-muted-foreground">Map: #{building.mapNumber}</span>
            )}
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RoomCard;
