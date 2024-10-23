
export interface Automation {
    id?: number; // Optional, as it's generated by the backend
    pipeline: string;
    result: string;
    startDate: Date;
    endDate: Date;
  }
  