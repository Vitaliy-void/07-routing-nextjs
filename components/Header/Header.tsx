import Link from "next/link";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.inner}>
        <Link href="/" className={css.logo}>NoteHub</Link>

        <nav>
          <ul className={css.nav}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/notes/filter/all">Notes</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
