import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, 
  headers: {
    Authorization: process.env.NEXT_PUBLIC_API_TOKEN
      ? `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
      : undefined,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const { page, perPage, search, tag } = params;
  const res = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
    },
  });
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
}
