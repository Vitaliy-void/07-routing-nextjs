import type { ReactNode } from "react";
import css from "./layout.module.css";

export default function FilterLayout({
  children,         // основний контент (список)
  sidebar,          // @sidebar меню тегів
  modal,            // @modal (для перехоплення /notes/[id])
}: {
  children: ReactNode;
  sidebar: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div className={css.shell}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.main}>
        {children}
      </main>

      {/* перехоплений контент рендеримо поверх */}
      {modal}
    </div>
  );
}
