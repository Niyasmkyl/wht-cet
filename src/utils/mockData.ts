
import { Building, Event, Room, RoomType } from "@/types";

// Mock buildings data
export const buildings: Building[] = [
  {
    id: "1",
    name: "Electrical Main Block",
    description: "Main electrical engineering department building",
    mapNumber: 1,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    name: "PG Block", 
    description: "Postgraduate studies building",
    mapNumber: 2,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Machines Lab Block",
    description: "Contains various machine laboratories",
    mapNumber: 3,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "4",
    name: "P.G. Lab Block",
    description: "Laboratories for postgraduate students",
    mapNumber: 4,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Main Block",
    description: "Administrative main building with offices and rooms",
    mapNumber: 5,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "33",
    name: "Play Area",
    description: "Central campus recreation area",
    mapNumber: 33,
    imageUrl: "/placeholder.svg"
  }
];

// Mock rooms data
export const rooms: Room[] = [
  {
    id: "101",
    name: "Digital Electronics Lab",
    buildingId: "1",
    floor: 1,
    type: RoomType.LAB,
    description: "Lab for digital electronics experiments"
  },
  {
    id: "102",
    name: "Microprocessors Lab",
    buildingId: "1",
    floor: 1,
    type: RoomType.LAB,
    description: "Lab for microprocessor programming and testing"
  },
  {
    id: "103",
    name: "Lecture Hall A",
    buildingId: "1",
    floor: 2,
    type: RoomType.LECTURE_HALL,
    description: "Main lecture hall for 100+ students"
  },
  {
    id: "201",
    name: "Research Lab 1",
    buildingId: "2",
    floor: 1,
    type: RoomType.LAB,
    description: "Advanced research laboratory for postgraduate students"
  },
  {
    id: "202",
    name: "Faculty Offices",
    buildingId: "2",
    floor: 2,
    type: RoomType.OFFICE,
    description: "Faculty offices for the engineering department"
  },
  {
    id: "301",
    name: "Machine Shop",
    buildingId: "3",
    floor: 1,
    type: RoomType.LAB,
    description: "Workshop for machine fabrication and testing"
  },
  {
    id: "302",
    name: "Electrical Machines Lab",
    buildingId: "3",
    floor: 1,
    type: RoomType.LAB,
    description: "Lab for electrical machines experiments"
  },
  {
    id: "401",
    name: "PG Research Area",
    buildingId: "4",
    floor: 1,
    type: RoomType.LAB,
    description: "Open research area for postgraduate students"
  },
  {
    id: "402",
    name: "Conference Room",
    buildingId: "4",
    floor: 2,
    type: RoomType.OTHER,
    description: "Conference room for department meetings and presentations"
  },
  // Main Block rooms
  {
    id: "501",
    name: "Principal's Office",
    buildingId: "5",
    floor: 1,
    type: RoomType.OFFICE,
    description: "Office of the College Principal"
  },
  {
    id: "502",
    name: "IEDC Room",
    buildingId: "5",
    floor: 1,
    type: RoomType.OFFICE,
    description: "Innovation and Entrepreneurship Development Cell"
  },
  {
    id: "503",
    name: "SA Dean Room",
    buildingId: "5",
    floor: 2,
    type: RoomType.OFFICE,
    description: "Office of the Student Affairs Dean"
  },
  {
    id: "504",
    name: "IA Dean Room",
    buildingId: "5",
    floor: 2,
    type: RoomType.OFFICE,
    description: "Office of the Industrial Affairs Dean"
  },
  {
    id: "505",
    name: "UG Dean Room",
    buildingId: "5",
    floor: 2,
    type: RoomType.OFFICE,
    description: "Office of the Undergraduate Studies Dean"
  }
];

// Helper function to create dates relative to today
const dayFromNow = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

// Helper function to add hours to a date
const hoursFromTime = (date: Date, hours: number) => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
};

// Mock events data
export const events: Event[] = [
  {
    id: "1",
    title: "Engineering Workshop",
    description: "Hands-on workshop on latest engineering practices and technologies",
    location: "Lecture Hall A",
    startDate: dayFromNow(2),
    endDate: hoursFromTime(dayFromNow(2), 3),
    roomId: "103",
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80",
    category: "workshop"
  },
  {
    id: "2",
    title: "Technical Symposium",
    description: "Annual technical symposium with paper presentations and project exhibitions",
    location: "Electrical Main Block",
    startDate: dayFromNow(5),
    endDate: dayFromNow(6),
    roomId: "101",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
    category: "technical"
  },
  {
    id: "3",
    title: "Guest Lecture: AI in Engineering",
    description: "Special lecture on applications of artificial intelligence in engineering fields",
    location: "Conference Room",
    startDate: dayFromNow(1),
    endDate: hoursFromTime(dayFromNow(1), 2),
    roomId: "402",
    imageUrl: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80",
    category: "technical"
  },
  {
    id: "4",
    title: "Project Presentation Day",
    description: "Final year students present their capstone projects",
    location: "PG Research Area",
    startDate: dayFromNow(7),
    endDate: dayFromNow(7),
    roomId: "401",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80",
    category: "technical"
  },
  {
    id: "5",
    title: "Industry Connect Program",
    description: "Networking event with industry professionals and alumni",
    location: "Play Area",
    startDate: dayFromNow(10),
    endDate: dayFromNow(10),
    roomId: "33",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
    category: "workshop"
  },
  {
    id: "6",
    title: "Robotics Competition",
    description: "Inter-college robotics design and programming competition",
    location: "Machine Shop",
    startDate: dayFromNow(15),
    endDate: dayFromNow(15),
    roomId: "301",
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80",
    category: "technical"
  },
  {
    id: "7",
    title: "Annual Cultural Fest",
    description: "Celebration of art, music, dance and cultural activities",
    location: "Play Area",
    startDate: dayFromNow(20),
    endDate: dayFromNow(22),
    roomId: "33",
    imageUrl: "https://images.unsplash.com/photo-1508974642599-c7c7d7fce312?auto=format&fit=crop&q=80",
    category: "cultural"
  },
  {
    id: "8",
    title: "Inter-Department Sports Meet",
    description: "Annual sports competition between various departments",
    location: "Play Area",
    startDate: dayFromNow(12),
    endDate: dayFromNow(14),
    roomId: "33",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80",
    category: "sports"
  },
  {
    id: "9",
    title: "Hackathon 2023",
    description: "24-hour coding challenge for innovative solutions",
    location: "IEDC Room",
    startDate: dayFromNow(8),
    endDate: dayFromNow(9),
    roomId: "502",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
    category: "technical"
  }
];
