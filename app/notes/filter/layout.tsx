import css from "./NotesLayout.module.css";

function NotesLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <>
      <section className={css.notesWrapper}>
        <aside className={css.sidebar}>{sidebar}</aside>
        <div className={css.container}>{children}</div>
      </section>
    </>
  );
}

export default NotesLayout;