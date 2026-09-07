import { StudySpace, Seat } from '../types';

// Helper to generate realistic seats for floor plans
const generateSeats = (
  total: number,
  availableCount: number,
  zoneDistribution: { zone: Seat['zone']; count: number }[]
): Seat[] => {
  const seats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  let seatCounter = 1;
  let allocatedAvailable = 0;

  zoneDistribution.forEach(({ zone, count }) => {
    for (let i = 0; i < count; i++) {
      const rowIndex = Math.floor((seatCounter - 1) / 6) % rows.length;
      const row = rows[rowIndex];
      // Distribute available seats evenly
      const shouldBeAvailable =
        allocatedAvailable < availableCount &&
        (Math.random() < availableCount / total || (count - i <= availableCount - allocatedAvailable));

      const isAvailable = availableCount === 0 ? false : shouldBeAvailable;
      if (isAvailable) allocatedAvailable++;

      seats.push({
        id: `seat-${seatCounter}`,
        number: seatCounter,
        row,
        zone,
        status: isAvailable ? 'available' : 'occupied',
        hasOutlet: zone !== 'Group Tables' || Math.random() > 0.15,
        nearWindow: zone === 'Window Desks' || Math.random() > 0.65,
      });

      seatCounter++;
    }
  });

  // Guarantee exact available count if discrepancy due to random
  let currentAvail = seats.filter(s => s.status === 'available').length;
  if (availableCount === 0) {
    seats.forEach(s => (s.status = 'occupied'));
  } else {
    while (currentAvail < availableCount) {
      const occ = seats.find(s => s.status === 'occupied');
      if (occ) {
        occ.status = 'available';
        currentAvail++;
      } else break;
    }
    while (currentAvail > availableCount) {
      const avail = seats.find(s => s.status === 'available');
      if (avail) {
        avail.status = 'occupied';
        currentAvail--;
      } else break;
    }
  }

  return seats;
};

export const INITIAL_STUDY_SPACES: StudySpace[] = [
  {
    id: 'central-c1',
    code: 'C1',
    name: 'Central Library (C1)',
    buildingName: 'Central Academic Complex • Wing A',
    subtitle: 'Silent Reading Hall & Individual Carrels',
    status: 'Available',
    availableSeats: 82,
    totalSeats: 120,
    walkMinutes: 3,
    distanceMeters: 220,
    category: ['Library', 'Quiet', '24×7'],
    amenities: {
      floor: 'Floor 2 & 3',
      quietLevel: 'Silent',
      quietDescription: 'Strict silence enforced. Perfect for deep focus & exam prep.',
      wifi: 'Campus-Fast (480 Mbps)',
      outlets: '98% Desks with Dual AC & USB-C',
      ac: 'Climate Controlled (21.5°C)',
      lighting: 'Adjustable warm desk lamps + daylight skylight',
      naturalLight: true,
    },
    mapCoords: { x: 42, y: 38 },
    floorPlan: {
      floorNumber: 'Floor 2',
      floorName: 'West Quiet Sanctuary',
      totalSeats: 120,
      availableSeats: 82,
      seats: generateSeats(120, 82, [
        { zone: 'Window Desks', count: 32 },
        { zone: 'Silent Pods', count: 28 },
        { zone: 'Study Carrels', count: 40 },
        { zone: 'Group Tables', count: 20 },
      ]),
    },
    routeFromHub: {
      origin: 'Campus Center Plaza',
      destination: 'Central Library (C1) — Level 2 Entrance',
      totalDistance: '220 meters',
      totalTime: '3 min walk',
      elevation: '+1 floor via grand staircase',
      steps: [
        {
          icon: 'Compass',
          instruction: 'Head north from Campus Center Plaza past the clock tower fountain',
          distance: '80m',
          subtext: 'Paved tree-lined central promenade',
        },
        {
          icon: 'CornerUpRight',
          instruction: 'Turn slight right toward Central Library North Portico',
          distance: '90m',
          subtext: 'Pass through the glass revolving doors',
        },
        {
          icon: 'MoveUp',
          instruction: 'Take central atrium stairs or elevator to Floor 2 (Wing A)',
          distance: '50m',
          subtext: 'Tap your digital pass at turnstile C1-West',
        },
      ],
      pathCoordinates: [
        [50, 75], // Campus Quad
        [50, 58],
        [46, 48],
        [42, 38], // C1
      ],
    },
  },
  {
    id: 'central-c3',
    code: 'C3',
    name: 'Central Library (C3)',
    buildingName: 'Central Academic Complex • Wing C',
    subtitle: 'Ground Level Open Commons & Media Lounge',
    status: 'Full',
    availableSeats: 0,
    totalSeats: 90,
    walkMinutes: 4,
    distanceMeters: 260,
    category: ['Library', 'Group', '24×7'],
    amenities: {
      floor: 'Floor 1 (Ground)',
      quietLevel: 'Moderate',
      quietDescription: 'Lively collaborative hum with white noise masking.',
      wifi: 'Campus-Fast (420 Mbps)',
      outlets: '85% Desks with AC power strips',
      ac: 'Comfort Airflow (22.0°C)',
      lighting: 'Full-spectrum ambient LED',
      naturalLight: true,
    },
    mapCoords: { x: 58, y: 36 },
    floorPlan: {
      floorNumber: 'Floor 1',
      floorName: 'East Commons & Collaboration Pods',
      totalSeats: 90,
      availableSeats: 0,
      seats: generateSeats(90, 0, [
        { zone: 'Group Tables', count: 40 },
        { zone: 'Window Desks', count: 24 },
        { zone: 'Study Carrels', count: 26 },
      ]),
    },
    routeFromHub: {
      origin: 'Campus Center Plaza',
      destination: 'Central Library (C3) — East Wing',
      totalDistance: '260 meters',
      totalTime: '4 min walk',
      elevation: 'Flat ground entrance',
      steps: [
        {
          icon: 'Compass',
          instruction: 'Walk northeast towards Central Complex garden breezeway',
          distance: '120m',
          subtext: 'Follow signs for Wing C / Student Cafe',
        },
        {
          icon: 'CornerUpRight',
          instruction: 'Enter Wing C glass atrium doors on your right',
          distance: '100m',
          subtext: 'Badge scanner next to automatic sliding doors',
        },
        {
          icon: 'MapPin',
          instruction: 'C3 Commons is straight ahead across from the IT Helpdesk',
          distance: '40m',
          subtext: 'Ground floor main concourse',
        },
      ],
      pathCoordinates: [
        [50, 75],
        [50, 60],
        [55, 48],
        [58, 36], // C3
      ],
    },
  },
  {
    id: 'digital-d6',
    code: 'D6',
    name: 'Digital Library (D6)',
    buildingName: 'Turing Technology Center • Tower D',
    subtitle: 'Dual-Monitor Workstations & High-Tech Lab',
    status: 'Available',
    availableSeats: 45,
    totalSeats: 70,
    walkMinutes: 6,
    distanceMeters: 410,
    category: ['Library', 'Quiet', '24×7'],
    amenities: {
      floor: 'Floor 4',
      quietLevel: 'Whisper',
      quietDescription: 'Soft keyboard clicks and quiet whispers permitted.',
      wifi: 'Ultra Fiber-Gigabit (1.2 Gbps)',
      outlets: '100% Desks with 100W PD USB-C + 4K USB-C Displays',
      ac: 'Precision Climate (20.5°C)',
      lighting: 'Anti-glare matte bias lighting',
      naturalLight: true,
    },
    mapCoords: { x: 74, y: 55 },
    floorPlan: {
      floorNumber: 'Floor 4',
      floorName: 'Sky Innovation Loft',
      totalSeats: 70,
      availableSeats: 45,
      seats: generateSeats(70, 45, [
        { zone: 'Window Desks', count: 25 },
        { zone: 'Silent Pods', count: 20 },
        { zone: 'Study Carrels', count: 25 },
      ]),
    },
    routeFromHub: {
      origin: 'Campus Center Plaza',
      destination: 'Digital Library (D6) — 4th Floor Tech Commons',
      totalDistance: '410 meters',
      totalTime: '6 min walk',
      elevation: '+4 floors via high-speed express lift',
      steps: [
        {
          icon: 'Compass',
          instruction: 'Walk east along Innovation Walkway toward Turing Tower',
          distance: '240m',
          subtext: 'Cross the covered skybridge over Pine Creek',
        },
        {
          icon: 'CornerUpLeft',
          instruction: 'Enter Turing Center main revolving lobby',
          distance: '90m',
          subtext: 'Swipe your digital ID card at the turnstiles',
        },
        {
          icon: 'MoveUp',
          instruction: 'Take express elevators B/C to Floor 4 (Digital Library D6)',
          distance: '80m',
          subtext: 'Exit right directly into the Sky Loft space',
        },
      ],
      pathCoordinates: [
        [50, 75],
        [62, 70],
        [68, 62],
        [74, 55], // D6
      ],
    },
  },
  {
    id: 'block-b1',
    code: 'B1',
    name: 'Block B1 Library',
    buildingName: 'Founders Hall • B-Wing',
    subtitle: 'Group Study Rooms & Open Whiteboard Tables',
    status: 'Busy',
    availableSeats: 12,
    totalSeats: 65,
    walkMinutes: 2,
    distanceMeters: 150,
    category: ['Library', 'Group'],
    amenities: {
      floor: 'Ground Floor',
      quietLevel: 'Collaborative',
      quietDescription: 'Active brainstorming, whiteboard pods & group projects.',
      wifi: 'Campus-Fast (360 Mbps)',
      outlets: '75% Desks with shared charging towers',
      ac: 'Natural cross-breeze + AC (22.5°C)',
      lighting: 'Warm architectural spotlights & floor-to-ceiling glass',
      naturalLight: true,
    },
    mapCoords: { x: 26, y: 62 },
    floorPlan: {
      floorNumber: 'Ground Level',
      floorName: 'Founder Courtyard Wing',
      totalSeats: 65,
      availableSeats: 12,
      seats: generateSeats(65, 12, [
        { zone: 'Group Tables', count: 35 },
        { zone: 'Study Carrels', count: 18 },
        { zone: 'Window Desks', count: 12 },
      ]),
    },
    routeFromHub: {
      origin: 'Campus Center Plaza',
      destination: 'Block B1 Library — Ground Floor Concourse',
      totalDistance: '150 meters',
      totalTime: '2 min walk',
      elevation: 'Level ground access',
      steps: [
        {
          icon: 'Compass',
          instruction: 'Exit Campus Plaza heading west toward Old Quad lawn',
          distance: '70m',
          subtext: 'Pass the student bookstore on your left',
        },
        {
          icon: 'CornerDownLeft',
          instruction: 'Follow stone archway entrance to Block B1',
          distance: '50m',
          subtext: 'Enter through timber acoustic double doors',
        },
        {
          icon: 'MapPin',
          instruction: 'Library entrance is located immediately on your right',
          distance: '30m',
          subtext: 'Look for the "B1 Study Commons" sign',
        },
      ],
      pathCoordinates: [
        [50, 75],
        [40, 72],
        [32, 68],
        [26, 62], // B1
      ],
    },
  },
  {
    id: 'block-d8',
    code: 'D8',
    name: 'Block D8 Library',
    buildingName: 'Applied Sciences Complex • Quad D',
    subtitle: 'Sunlit Atrium & Ergonomic Acoustic Booths',
    status: 'Available',
    availableSeats: 36,
    totalSeats: 58,
    walkMinutes: 5,
    distanceMeters: 350,
    category: ['Library', 'Quiet', '24×7'],
    amenities: {
      floor: 'Floor 2',
      quietLevel: 'Silent',
      quietDescription: 'Acoustic baffle ceilings, silent zone with zero ambient hum.',
      wifi: 'Campus-Fast (520 Mbps)',
      outlets: '95% Desks with dual Qi wireless pads + AC outlets',
      ac: 'Filtered Clean-Air HVAC (21.0°C)',
      lighting: 'Circadian rhythm synchronized soft LEDs',
      naturalLight: true,
    },
    mapCoords: { x: 68, y: 22 },
    floorPlan: {
      floorNumber: 'Floor 2',
      floorName: 'Zenith Sun Gallery',
      totalSeats: 58,
      availableSeats: 36,
      seats: generateSeats(58, 36, [
        { zone: 'Window Desks', count: 22 },
        { zone: 'Silent Pods', count: 18 },
        { zone: 'Study Carrels', count: 18 },
      ]),
    },
    routeFromHub: {
      origin: 'Campus Center Plaza',
      destination: 'Block D8 Library — Level 2 Atrium',
      totalDistance: '350 meters',
      totalTime: '5 min walk',
      elevation: '+1 floor via spiral ramp or elevator',
      steps: [
        {
          icon: 'Compass',
          instruction: 'Walk north-east past Science Quad water pavilion',
          distance: '180m',
          subtext: 'Follow paved magnolia tree pathway',
        },
        {
          icon: 'CornerUpRight',
          instruction: 'Enter Applied Sciences Block D8 main glass atrium',
          distance: '110m',
          subtext: 'Tap mobile ID at turnstile gate',
        },
        {
          icon: 'MoveUp',
          instruction: 'Ascend glass spiral staircase to Floor 2 gallery',
          distance: '60m',
          subtext: 'D8 Library sanctuary door is on the north glass facade',
        },
      ],
      pathCoordinates: [
        [50, 75],
        [56, 55],
        [62, 38],
        [68, 22], // D8
      ],
    },
  },
];
