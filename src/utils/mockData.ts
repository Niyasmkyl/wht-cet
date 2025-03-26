
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
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Technical Symposium",
    description: "Annual technical symposium with paper presentations and project exhibitions",
    location: "Electrical Main Block",
    startDate: dayFromNow(5),
    endDate: dayFromNow(6),
    roomId: "101",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Guest Lecture: AI in Engineering",
    description: "Special lecture on applications of artificial intelligence in engineering fields",
    location: "Conference Room",
    startDate: dayFromNow(1),
    endDate: hoursFromTime(dayFromNow(1), 2),
    roomId: "402",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Project Presentation Day",
    description: "Final year students present their capstone projects",
    location: "PG Research Area",
    startDate: dayFromNow(7),
    endDate: dayFromNow(7),
    roomId: "401",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "5",
    title: "Industry Connect Program",
    description: "Networking event with industry professionals and alumni",
    location: "Play Area",
    startDate: dayFromNow(10),
    endDate: dayFromNow(10),
    roomId: "33",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "6",
    title: "Robotics Competition",
    description: "Inter-college robotics design and programming competition",
    location: "Machine Shop",
    startDate: dayFromNow(15),
    endDate: dayFromNow(15),
    roomId: "301",
    imageUrl: "/placeholder.svg"
  }
];
