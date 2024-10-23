export interface User {
    id?: number; // Optional because it's generated on the backend
    name: string;
    email: string;
    password: string;
    active: boolean;
    type: string;
  }
  