export interface Property {
    id?: number; // Optional, as it's generated by the backend
    name: string;
    available: boolean;
    obs: string; // Observation or description
  }
  