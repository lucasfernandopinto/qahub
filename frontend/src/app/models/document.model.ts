
export interface Document {
    id?: number; // Optional, as it's generated by the backend
    title: string;
    content: string;
    date: Date;
    authorId: number;
    authorName: string;
  }
  