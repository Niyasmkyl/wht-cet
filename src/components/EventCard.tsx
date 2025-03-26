
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Event } from "@/types";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  const navigate = useNavigate();
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
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
      className={`overflow-hidden ${featured ? "col-span-2 md:col-span-1" : ""}`}
    >
      <Card className={`h-full overflow-hidden glass-card hover-scale border border-gray-200/50 ${featured ? "md:flex" : ""}`}>
        {event.imageUrl && (
          <div className={`relative ${featured ? "md:w-2/5" : "h-48"}`}>
            <img 
              src={event.imageUrl} 
              alt={event.title}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1 text-sm font-medium rounded-br-md">
              {formatDate(event.startDate)}
            </div>
          </div>
        )}
        <div className={`${featured ? "md:w-3/5" : ""}`}>
          <CardHeader className="p-4">
            <CardTitle className="text-xl">{event.title}</CardTitle>
            <CardDescription className="text-muted-foreground line-clamp-2">{event.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex flex-col space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(event.startDate)}
                {!isSameDay(event.startDate, event.endDate) && ` - ${formatDate(event.endDate)}`}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                {formatTime(event.startDate)} - {formatTime(event.endDate)}
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                {event.location}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              View Details
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
};

export default EventCard;
