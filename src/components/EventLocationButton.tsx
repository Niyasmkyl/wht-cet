
import React from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EventLocationButtonProps {
  roomId: string;
  buildingId: string;
}

const EventLocationButton: React.FC<EventLocationButtonProps> = ({ roomId, buildingId }) => {
  const navigate = useNavigate();
  
  const handleShowLocation = () => {
    navigate(`/college?building=${buildingId}`);
  };
  
  return (
    <Button 
      onClick={handleShowLocation}
      variant="outline" 
      size="sm"
      className="mt-2 w-full flex items-center justify-center gap-2"
    >
      <MapPin className="h-4 w-4" />
      Show on Map
    </Button>
  );
};

export default EventLocationButton;
