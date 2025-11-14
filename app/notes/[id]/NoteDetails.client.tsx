"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchSingleNote } from "@/lib/api";
import css from "./NoteDetails.module.css";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: note, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchSingleNote(id),
    refetchOnMount: false,
  });
  if (error) throw error;
  if (!note) return <Loader>Loading, please wait...</Loader>;
  return (
    <main>
      <div className={css.container}>
        <button
          type="button"
          onClick={() => router.back()}
          className={css.backBtn}
        >
          ✕
        </button>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <div className={css.details}>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.date}>{`Created at: ${note.createdAt}`}</p>
          </div>
        </div>
      </div>
    </main>
  );
}