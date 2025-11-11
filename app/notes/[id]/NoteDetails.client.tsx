"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false, 
  });

  if (isLoading) {
    return (
      <div className={css.container}>
        <p>Loading, please wait...</p>
      </div>
    );
  }

  if (isError || !note) {
    return (
      <div className={css.container}>
        <p>Something went wrong.</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2>{note.title}</h2>
      </div>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>
        {note.createdAt ? new Date(note.createdAt).toLocaleString() : "—"}
      </p>
    </div>
  );
}
