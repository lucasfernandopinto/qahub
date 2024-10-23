export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED'
}
  
export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}
  
export interface Task {
    id?: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    startDate: Date;
    endDate: Date;
}
  