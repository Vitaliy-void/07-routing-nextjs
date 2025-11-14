"use client";

import Modal from "@/components/Modal/Modal";
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import Loader from "@/components/Loader/Loader";
import { fetchSingleNote } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

function NotePreview() {
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
    <>
      <Modal onClose={() => router.back()}>
        <button
          type="button"
          onClick={() => router.back()}
          className={css.backBtn}
        >
          ✕
        </button>
        <div className={css.container}>
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
      </Modal>
    </>
  );
}

export default NotePreview;