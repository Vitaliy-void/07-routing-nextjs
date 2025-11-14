"use client";
import { useState } from "react";
import type { NoteTag } from "@/types/note";
import type { CreateNoteBody } from "@/lib/api";
import css from "./NoteForm.module.css";

export interface NoteFormProps {
  initialTag?: NoteTag;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (payload: CreateNoteBody) => void;
}

export default function NoteForm({ initialTag, isSubmitting, onCancel, onSubmit }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<NoteTag>(initialTag ?? "Todo");

  return (
    <form
      className={css.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title, content, tag });
      }}
    >
      <input
        className={css.input}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className={css.textarea}
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <select className={css.select} value={tag} onChange={(e) => setTag(e.target.value as NoteTag)}>
        {["Todo", "Work", "Personal", "Meeting", "Shopping"].map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <div className={css.actions}>
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit" disabled={isSubmitting}>Create</button>
      </div>
    </form>
  );
}
