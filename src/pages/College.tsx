
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import MapDisplay from "@/components/MapDisplay";
import RoomCard from "@/components/RoomCard";
import SearchBar from "@/components/SearchBar";
import { buildings, rooms } from "@/utils/mockData";
import { Building, Room } from "@/types";
import { motion } from "framer-motion";
import { Building2, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const College: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBuildings, setFilteredBuildings] = useState<Building[]>(buildings);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("buildings");
  
  // Parse search query from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("search");
    const buildingParam = params.get("building");
    
    if (searchParam) {
      setSearchQuery(searchParam);
      filterBuildingsAndRooms(searchParam);
    }
    
    if (buildingParam) {
      setSelectedBuilding(buildingParam);
      setActiveTab("rooms");
    }
  }, [location.search]);
  
  // Filter when selected building changes
  useEffect(() => {
    if (selectedBuilding) {
      setFilteredRooms(rooms.filter(room => room.buildingId === selectedBuilding));
      setActiveTab("rooms");
    } else {
      setFilteredRooms(rooms);
    }
  }, [selectedBuilding]);
  
  const filterBuildingsAndRooms = (query: string) => {
    const searchLower = query.toLowerCase();
    
    const matchedBuildings = buildings.filter(
      building =>
        building.name.toLowerCase().includes(searchLower) ||
        (building.description && building.description.toLowerCase().includes(searchLower))
    );
    
    const matchedRooms = rooms.filter(
      room =>
        room.name.toLowerCase().includes(searchLower) ||
        (room.description && room.description.toLowerCase().includes(searchLower))
    );
    
    setFilteredBuildings(matchedBuildings);
    setFilteredRooms(matchedRooms);
    
    // If there are no building matches but there are room matches, switch to rooms tab
    if (matchedBuildings.length === 0 && matchedRooms.length > 0) {
      setActiveTab("rooms");
    }
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterBuildingsAndRooms(query);
  };
  
  const handleSelectBuilding = (buildingId: string) => {
    setSelectedBuilding(buildingId);
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBuilding(null);
    setFilteredBuildings(buildings);
    setFilteredRooms(rooms);
    setActiveTab("buildings");
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Find building by ID
  const findBuilding = (id: string): Building | undefined => {
    return buildings.find(building => building.id === id);
  };
  
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">Campus Directory</h1>
          
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search for buildings or rooms..."
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <MapDisplay 
              buildings={buildings} 
              onSelectBuilding={handleSelectBuilding}
            />
            
            {selectedBuilding && (
              <Card className="mb-4 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle>
                    Selected Building
                  </CardTitle>
                  <CardDescription>
                    {findBuilding(selectedBuilding)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {findBuilding(selectedBuilding)?.description}
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
            )}
          </div>
          
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="buildings" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Buildings
                  {filteredBuildings.length > 0 && (
                    <span className="bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5 ml-2">
                      {filteredBuildings.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="rooms" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Rooms
                  {filteredRooms.length > 0 && (
                    <span className="bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5 ml-2">
                      {filteredRooms.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="buildings" className="mt-0">
                {filteredBuildings.length > 0 ? (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredBuildings.map(building => (
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
              </TabsContent>
              
              <TabsContent value="rooms" className="mt-0">
                {selectedBuilding && (
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">
                      Rooms in {findBuilding(selectedBuilding)?.name}
                    </h3>
                    <Separator className="mb-4" />
                  </div>
                )}
                
                {filteredRooms.length > 0 ? (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredRooms.map(room => {
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default College;
