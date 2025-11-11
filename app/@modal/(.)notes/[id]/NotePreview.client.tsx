'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from '@/styles/NotePreview.module.css';

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal isOpen onClose={() => router.back()}>
      {}
      <div className={css.wrapper}>
        <h2 className={css.title}>{data?.title}</h2>
        <p className={css.content}>{data?.content}</p>
      </div>
    </Modal>
  );
}
