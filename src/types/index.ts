export type AvailabilityStatus = 'Available' | 'Busy' | 'Full';

export interface AmenityInfo {
  floor: string;
  quietLevel: 'Silent' | 'Whisper' | 'Moderate' | 'Collaborative';
  quietDescription: string;
  wifi: string;
  outlets: string;
  ac: string;
  lighting: string;
  naturalLight: boolean;
}

export interface Seat {
  id: string;
  number: number;
  row: string;
  zone: 'Silent Pods' | 'Window Desks' | 'Study Carrels' | 'Group Tables';
  status: 'available' | 'occupied';
  hasOutlet: boolean;
  nearWindow: boolean;
}

export interface FloorPlan {
  floorNumber: string;
  floorName: string;
  totalSeats: number;
  availableSeats: number;
  seats: Seat[];
}

export interface RouteStep {
  icon: string;
  instruction: string;
  distance: string;
  subtext?: string;
}

export interface StudySpace {
  id: string;
  code: 'C1' | 'C3' | 'D6' | 'B1' | 'D8';
  name: string;
  buildingName: string;
  subtitle: string;
  status: AvailabilityStatus;
  availableSeats: number;
  totalSeats: number;
  walkMinutes: number;
  distanceMeters: number;
  category: ('Library' | 'Quiet' | 'Group' | '24×7')[];
  amenities: AmenityInfo;
  mapCoords: { x: number; y: number }; // percentage on campus map 0-100
  floorPlan: FloorPlan;
  routeFromHub: {
    origin: string;
    destination: string;
    totalDistance: string;
    totalTime: string;
    elevation: string;
    steps: RouteStep[];
    pathCoordinates: [number, number][]; // coordinates on campus map SVG
  };
}

export type TabType = 'home' | 'map' | 'search' | 'saved' | 'profile';
export type FilterChip = 'All' | 'Library' | 'Quiet' | 'Group' | '24×7';

export interface Booking {
  id: string;
  spaceId: string;
  spaceName: string;
  spaceCode: string;
  seatId: string;
  seatNumber: number;
  zone: string;
  floor: string;
  timestamp: string;
  validUntil: string;
}
