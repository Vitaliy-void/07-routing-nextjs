"use client";
import SearchBox from "@/components/SearchBox/SearchBox";
import { ApiNotesResponse, fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./Notes.module.css";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

function Notes({ initialCategory = "" }: { initialCategory?: string }) {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    setCategory(initialCategory);
    setCurrentPage(1);
  }, [initialCategory]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setCurrentPage(1);
  }, 300);

  const { data, isError, isLoading, isSuccess, error } =
    useQuery<ApiNotesResponse>({
      queryKey: ["notes", query, currentPage, category],
      queryFn: () => fetchNotes(query, currentPage, category),
      placeholderData: currentPage > 1 ? keepPreviousData : undefined,
    });
  const totalPages = data?.totalPages ?? 0;

  if (isError && error) throw error;

  return (
    <div className={css.app}>
      <section className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />

        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </section>
      {isLoading && <Loader>Loading notes, please wait...</Loader>}
      {data && data.notes.length === 0 && (
        <ErrorMessage>Not Found!</ErrorMessage>
      )}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default Notes;