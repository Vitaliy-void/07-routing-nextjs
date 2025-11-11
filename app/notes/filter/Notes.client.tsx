'use client';

import * as React from "react";
import type { JSX } from 'react';
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import css from "@/styles/NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import type { NoteTag } from "@/types/note";

export interface NotesClientProps {
  initialPage: number;
  initialSearch: string;
  perPage: number;
  initialTag: NoteTag | "all";
}

export default function NotesClient({
  initialPage,
  initialSearch,
  perPage,
  initialTag,
}: NotesClientProps): JSX.Element {
  const [page, setPage] = React.useState(initialPage);
  const [search, setSearch] = React.useState(initialSearch);

  const tag: NoteTag | undefined =
    initialTag === "all" ? undefined : (initialTag as NoteTag);

  const { data, isPending, error } = useQuery({
    queryKey: ["notes", page, perPage, search, tag ?? "all"],
    queryFn: () => fetchNotes({ page, perPage, search, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={(v) => { setPage(1); setSearch(v); }} />
      </div>

      {isPending && <p>Loading, please wait...</p>}
      {error && <p>Something went wrong.</p>}
      {data?.notes?.length ? (
        <NoteList items={data.notes} />
      ) : (
        !isPending && <p>No notes yet</p>
      )}

      {data?.totalPages && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={(p) => setPage(p)}
        />
      )}
    </div>
  );
}
