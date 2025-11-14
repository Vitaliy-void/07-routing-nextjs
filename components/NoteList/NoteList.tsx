"use client";
import type { Note } from "@/types/note";
import Link from "next/link";
import css from "./NoteList.module.css";

export interface NoteListProps {
  notes: Note[];
  onDelete?: (id: string) => void; // опційно
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((n) => (
        <li key={n.id} className={css.item}>
          <h3 className={css.title}>
            <Link href={`/notes/${n.id}`}>{n.title}</Link>
          </h3>

          {n.content && <p className={css.content}>{n.content}</p>}

          <div className={css.row}>
            <span className={css.tag}>{n.tag}</span>

            <div className={css.actions}>
              <Link className={`${css.btn} ${css.btnPrimary}`} href={`/notes/${n.id}`}>
                View details
              </Link>
              <button
                type="button"
                className={`${css.btn} ${css.btnDanger}`}
                onClick={() => onDelete?.(n.id)}
                aria-label={`Delete note ${n.title}`}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
