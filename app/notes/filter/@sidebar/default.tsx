import Link from "next/link";
import css from "./SidebarNotes.module.css";

export default function SidebarNotes() {
  const categories = [
    { name: "All notes", link: "all" },
    { name: "Work", link: "Work" },
    { name: "Personal", link: "Personal" },
    { name: "Meeting", link: "Meeting" },
    { name: "Shopping", link: "Shopping" },
    { name: "Todo", link: "Todo" },
  ];

  return (
    <ul className={css.menuList}>
      {categories.map((tag) => {
        return (
          <li key={tag.link} className={css.menuItem}>
            <Link href={`/notes/filter/${tag.link}`} className={css.menuLink}>
              {tag.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}