import Link from "next/link";
import css from "./page.module.css";

const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export default function SidebarDefault() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>All notes</Link>
      </li>
      {TAGS.map(t => (
        <li key={t} className={css.menuItem}>
          <Link href={`/notes/filter/${t}`} className={css.menuLink}>{t}</Link>
        </li>
      ))}
    </ul>
  );
}
