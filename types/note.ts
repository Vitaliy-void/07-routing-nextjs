export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping" | string;

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  date?: string;       
  createdAt?: string;  
}
