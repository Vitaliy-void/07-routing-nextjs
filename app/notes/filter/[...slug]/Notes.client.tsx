"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { Note, NoteTag } from "@/types/note";
import css from "./page.module.css"; 

type NotesProps = { tag?: NoteTag | "all" };
const PER_PAGE = 12;

export default function Notes({ tag }: NotesProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag ?? "all", page, search],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search,
        tag: tag && tag !== "all" ? (tag as NoteTag) : undefined,
      }),
    placeholderData: keepPreviousData,
  });

  const items: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <section className={css.wrapper}>
      <form className={css.searchBar} onSubmit={onSubmit}>
        <input
          value={search}
          onChange={onChange}
          placeholder="Search notes..."
          className={css.input}
        />
        <button type="submit" className={css.btn}>Search</button>
      </form>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Failed to load notes.</p>}

      <ul className={css.list}>
        {items.map((n: Note) => ( // ✅ тип для n
          <li key={n.id} className={css.item}>
            <Link href={`/notes/${n.id}`} className={css.title}>
              {n.title}
            </Link>
            {n.content && <p className={css.content}>{n.content}</p>}
            {n.createdAt && (
              <p className={css.date}>{new Date(n.createdAt).toLocaleString()}</p>
            )}
          </li>
        ))}
      </ul>

      <div className={css.pagination}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}>
          Prev
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}
