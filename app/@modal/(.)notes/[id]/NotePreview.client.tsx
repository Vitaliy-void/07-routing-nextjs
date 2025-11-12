"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "@/styles/NotePreview.module.css";

export default function NotePreviewClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  return (
    <Modal isOpen onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.title}>
            {isLoading ? "Loading…" : note?.title ?? "Note"}
          </h2>
          <button className={css.close} onClick={() => router.back()}>
            ×
          </button>
        </div>

        {isLoading && <p>Loading, please wait…</p>}
        {isError && !isLoading && <p>Something went wrong.</p>}

        {note && !isLoading && !isError && (
          <div className={css.body}>
            <p className={css.content}>{note.content}</p>
            <div className={css.meta}>
              <span className={css.tag}>#{note.tag}</span>
              <span className={css.date}>
                {new Date(note.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
