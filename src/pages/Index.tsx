import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Map, Search, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import EventCard from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import { events } from "@/utils/mockData";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get the two upcoming events
  const upcomingEvents = [...events]
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .filter(event => event.startDate > new Date())
    .slice(0, 2);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate(`/events?search=${encodeURIComponent(query)}`);
  };
  
  return (
    <Layout>
      <div className="space-y-10">
        {/* Hero Section */}
        <section className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Welcome to <span className="text-primary">Wht@CET</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Your guide to events and locations across campus.
              Find what's happening and where it's located, all in one place.
            </p>
          </motion.div>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-16">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {/* Feature Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/events" className="block">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200/50 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
                  <div className="flex items-start mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Browse Events</h3>
                  <p className="text-gray-600 mb-4">
                    Discover upcoming workshops, lectures, and social gatherings happening around campus.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <span>View all events</span>
                    <Clock className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/college" className="block">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200/50 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
                  <div className="flex items-start mb-4">
                    <div className="bg-cet-green/10 p-3 rounded-lg">
                      <Map className="h-6 w-6 text-cet-green" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Campus Map</h3>
                  <p className="text-gray-600 mb-4">
                    Navigate the campus with ease. Find classrooms, labs, and other important buildings.
                  </p>
                  <div className="flex items-center text-cet-green font-medium">
                    <span>Explore the map</span>
                    <Search className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Upcoming Events Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <Button 
              variant="outline" 
              className="text-primary bg-transparent border-primary/20 hover:bg-primary/10"
              onClick={() => navigate('/events')}
            >
              View All
              <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} featured={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500">No upcoming events scheduled.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate('/events')}
              >
                Browse All Events
              </Button>
            </div>
          )}
        </section>
        
        {/* Call to Action */}
        <section className="my-16">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-8 md:p-10 shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with Campus Activities</h2>
              <p className="text-lg opacity-90 mb-6">
                Don't miss out on important events and activities happening around campus.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  className="bg-white text-primary hover:bg-blue-50"
                  size="lg"
                  onClick={() => navigate('/events')}
                >
                  Browse Events
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  size="lg"
                  onClick={() => navigate('/college')}
                >
                  Explore Campus
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
