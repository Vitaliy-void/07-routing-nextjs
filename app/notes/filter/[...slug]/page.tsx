import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
// ІМПОРТУЙ тип, якщо він уже є
import type { NoteTag } from "@/types/note";
import NotesClient from "../Notes.client";

const PER_PAGE = 12;
// Якщо не експортуєш список тегів із types/note.ts – оголоси локально:
const ALLOWED_TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export default async function FilteredNotesPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const p = await params;
  const sp = await searchParams;

  const tagRaw = p.slug?.[0];                 // "all" | "Todo" | ...
  // "all" -> не передаємо tag в API; інакше – перевіряємо на валідність
  const tag: NoteTag | undefined =
    tagRaw === "all"
      ? undefined
      : (ALLOWED_TAGS.includes(tagRaw as NoteTag) ? (tagRaw as NoteTag) : undefined);

  const page = Math.max(1, Number(sp.page ?? "1"));
  const search = (sp.search ?? "").trim();

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["notes", page, PER_PAGE, search, tag ?? "all"],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient
        initialPage={page}
        initialSearch={search}
        perPage={PER_PAGE}
        initialTag={tag ?? "all"}
      />
    </HydrationBoundary>
  );
}
