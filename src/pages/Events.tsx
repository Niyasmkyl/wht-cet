import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import EventCard from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, FilterX, SlidersHorizontal } from "lucide-react";
import { events, buildings, rooms } from "@/utils/mockData";
import { Event } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import EventCategoryFilter from "@/components/EventCategoryFilter";
import EventLocationButton from "@/components/EventLocationButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Events: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [timeFilter, setTimeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("upcoming");
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("search");
    const categoryParam = params.get("category");
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    if (categoryParam) {
      setCategoryFilter(categoryParam);
    }
    
    filterEvents(
      searchParam || "", 
      timeFilter, 
      categoryParam || "all", 
      sortOrder
    );
  }, [location.search]);
  
  const filterEvents = (search: string, time: string, category: string, sort: string) => {
    let result = [...events];
    
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        event =>
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.location.toLowerCase().includes(searchLower)
      );
    }
    
    if (category !== "all") {
      result = result.filter(event => event.category === category);
    }
    
    const now = new Date();
    if (time === "upcoming") {
      result = result.filter(event => event.startDate > now);
    } else if (time === "past") {
      result = result.filter(event => event.startDate < now);
    } else if (time === "today") {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const today = new Date(now);
      today.setHours(0, 0, 0, 0);
      
      result = result.filter(
        event => event.startDate >= today && event.startDate < tomorrow
      );
    } else if (time === "week") {
      const weekLater = new Date(now);
      weekLater.setDate(weekLater.getDate() + 7);
      
      result = result.filter(
        event => event.startDate >= now && event.startDate <= weekLater
      );
    }
    
    if (sort === "upcoming") {
      result.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    } else if (sort === "recent") {
      result.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
    }
    
    setFilteredEvents(result);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    const params = new URLSearchParams(location.search);
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    
    navigate(`/events?${params.toString()}`);
    filterEvents(query, timeFilter, categoryFilter, sortOrder);
  };
  
  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
    
    const params = new URLSearchParams(location.search);
    if (category !== "all") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    
    navigate(`/events?${params.toString()}`);
    filterEvents(searchQuery, timeFilter, category, sortOrder);
  };
  
  const handleTimeFilterChange = (value: string) => {
    setTimeFilter(value);
    filterEvents(searchQuery, value, categoryFilter, sortOrder);
  };
  
  const handleSortChange = (value: string) => {
    setSortOrder(value);
    filterEvents(searchQuery, timeFilter, categoryFilter, value);
  };
  
  const clearFilters = () => {
    setTimeFilter("all");
    setCategoryFilter("all");
    setSortOrder("upcoming");
    setSearchQuery("");
    navigate("/events");
    filterEvents("", "all", "all", "upcoming");
  };
  
  const findBuildingIdByRoomId = (roomId: string): string => {
    const room = rooms.find(r => r.id === roomId);
    return room ? room.buildingId : "";
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
  
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Events</h1>
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search for events by title, description, or location..."
          />
          
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-50 rounded-lg p-4 flex flex-col gap-4 border border-gray-200/50">
                  <EventCategoryFilter 
                    selectedCategory={categoryFilter}
                    onChange={handleCategoryChange}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Time Frame
                      </label>
                      <Select value={timeFilter} onValueChange={handleTimeFilterChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Events</SelectItem>
                          <SelectItem value="upcoming">Upcoming Events</SelectItem>
                          <SelectItem value="past">Past Events</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Sort Order
                      </label>
                      <Select value={sortOrder} onValueChange={handleSortChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upcoming">Soonest First</SelectItem>
                          <SelectItem value="recent">Latest First</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={clearFilters}
                      >
                        <FilterX className="h-4 w-4 mr-2" />
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <Separator />
        
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-muted-foreground">
              {filteredEvents.length === 0
                ? "No events found"
                : `Showing ${filteredEvents.length} event${
                    filteredEvents.length === 1 ? "" : "s"
                  }`}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {timeFilter === "all"
                  ? "All time"
                  : timeFilter === "upcoming"
                  ? "Upcoming events"
                  : timeFilter === "past"
                  ? "Past events"
                  : timeFilter === "today"
                  ? "Today"
                  : "This week"}
              </span>
            </div>
          </div>
          
          {filteredEvents.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredEvents.map(event => (
                <div key={event.id}>
                  <EventCard event={event} />
                  <EventLocationButton 
                    roomId={event.roomId} 
                    buildingId={findBuildingIdByRoomId(event.roomId)} 
                  />
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-lg p-8 inline-flex flex-col items-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? `No events match "${searchQuery}"`
                    : "There are no events matching your filters"}
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {filteredEvents.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="rounded-md bg-primary text-white hover:bg-primary/90"
              >
                1
              </Button>
              <Button variant="outline" size="icon" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Events;
