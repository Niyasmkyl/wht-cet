
export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  imageUrl?: string;
  roomId: string;
}

export interface Room {
  id: string;
  name: string;
  buildingId: string;
  floor: number;
  description?: string;
  type: RoomType;
}

export interface Building {
  id: string;
  name: string;
  description?: string;
  mapNumber?: number;
  imageUrl?: string;
}

export enum RoomType {
  CLASSROOM = "CLASSROOM",
  LAB = "LAB",
  OFFICE = "OFFICE",
  LECTURE_HALL = "LECTURE_HALL",
  COMMON_AREA = "COMMON_AREA",
  OTHER = "OTHER"
}
