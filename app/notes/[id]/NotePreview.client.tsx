"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./page.module.css";

export default function NotePreviewClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  const onClose = () => router.back();

  const dateISO = note?.date ?? note?.createdAt;

  return (
    <Modal isOpen onClose={onClose}>
      <div className={css.container}>
        {isLoading && <p>Loading, please wait...</p>}
        {(isError || !note) && !isLoading && <p>Something went wrong.</p>}

        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>

            <p className={css.content}>{note.content}</p>

            {dateISO && (
              <p className={css.date}>{new Date(dateISO).toLocaleString()}</p>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
