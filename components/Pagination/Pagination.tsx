"use client";
import css from "./Pagination.module.css";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({ page, totalPages, onPrev, onNext }: PaginationProps) {
  return (
    <div className={css.pagination}>
      <button onClick={onPrev} disabled={page <= 1}>Prev</button>
      <span className={css.page}>{page} / {totalPages}</span>
      <button onClick={onNext} disabled={page >= totalPages}>Next</button>
    </div>
  );
}
