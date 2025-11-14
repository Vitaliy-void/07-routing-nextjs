"use client";
import css from "./SearchBox.module.css";

export interface SearchBoxProps {
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}

export default function SearchBox({ value, placeholder, onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
