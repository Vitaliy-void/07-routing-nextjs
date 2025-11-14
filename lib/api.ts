import axios from "axios";
import type { Note, PostNote } from "../types/note";

export interface ApiNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface apiTypes {
  API_KEY: string | undefined;
  BASE_URL: string;
  ENDPOINTS: {
    notes: () => string;
    delNote: (id: string) => string;
  };
}

const apiNoteHub: apiTypes = {
  API_KEY: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
  BASE_URL: "https://notehub-public.goit.study/api",
  ENDPOINTS: {
    notes: () => `/notes`,
    delNote: (id) => `/notes/${id}`,
  },
};
const { BASE_URL, API_KEY, ENDPOINTS } = apiNoteHub;

const api = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

export async function fetchNotes(
  search: string,
  page: number,
  tag?: string
): Promise<ApiNotesResponse> {
  const { data } = await api.get<ApiNotesResponse>(ENDPOINTS.notes(), {
    params: {
      ...(!!search && { search }),
      page: page,
      perPage: 12,
      ...(!!tag && { tag }),
    },
  });
  return data;
}

export async function fetchSingleNote(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`${ENDPOINTS.notes()}/${id}`);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(ENDPOINTS.delNote(id));
  return data;
}

export async function createNote(note: PostNote): Promise<Note> {
  const { data } = await api.post<Note>(ENDPOINTS.notes(), note);
  return data;
}