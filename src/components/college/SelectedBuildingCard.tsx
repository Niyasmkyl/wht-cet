
import React from "react";
import { Building } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SelectedBuildingCardProps {
  building: Building | undefined;
  clearFilters: () => void;
}

const SelectedBuildingCard: React.FC<SelectedBuildingCardProps> = ({
  building,
  clearFilters
}) => {
  if (!building) return null;
  
  return (
    <Card className="mb-4 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle>
          Selected Building
        </CardTitle>
        <CardDescription>
          {building.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {building.description}
        </p>
        <div className="flex justify-end">
          <button 
            className="text-sm text-primary hover:underline"
            onClick={clearFilters}
          >
            Clear Selection
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectedBuildingCard;
