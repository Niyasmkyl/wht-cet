
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import MapDisplay from "@/components/MapDisplay";
import SearchBar from "@/components/SearchBar";
import { buildings, rooms } from "@/utils/mockData";
import { Building, Room } from "@/types";
import { Building2, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuildingList from "@/components/college/BuildingList";
import RoomList from "@/components/college/RoomList";
import SelectedBuildingCard from "@/components/college/SelectedBuildingCard";

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
              <SelectedBuildingCard
                building={findBuilding(selectedBuilding)}
                clearFilters={clearFilters}
              />
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
                <BuildingList
                  buildings={filteredBuildings}
                  rooms={rooms}
                  searchQuery={searchQuery}
                  handleSelectBuilding={handleSelectBuilding}
                  clearFilters={clearFilters}
                />
              </TabsContent>
              
              <TabsContent value="rooms" className="mt-0">
                <RoomList
                  rooms={filteredRooms}
                  selectedBuilding={selectedBuilding}
                  searchQuery={searchQuery}
                  findBuilding={findBuilding}
                  clearFilters={clearFilters}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default College;
