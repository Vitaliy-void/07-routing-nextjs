// app/notes/filter/[...tag]/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "../Notes.client";
import type { NoteTag } from "@/types/note";

const PER_PAGE = 12;

// дозвoлені теги (бекенд не віддає список)
const ALLOWED_TAGS: readonly NoteTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
] as const;

function isNoteTag(v: unknown): v is NoteTag {
  return typeof v === "string" && (ALLOWED_TAGS as readonly string[]).includes(v);
}

export default async function FilteredNotesPage({
  params,
  searchParams,
}: {
  params: Promise<{ tag?: string[] }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const p = await params;
  const sp = await searchParams;

  // catch-all: беремо перший сегмент
  const tagRaw: string | undefined = p.tag?.[0];

  // "all" -> не передаємо tag; інакше приймаємо тільки валідні значення NoteTag
  const tag: NoteTag | undefined =
    tagRaw === "all" ? undefined : isNoteTag(tagRaw) ? tagRaw : undefined;

  const page = Math.max(1, Number(sp.page ?? "1"));
  const search = (sp.search ?? "").trim();

  // стабільний ключ для кеша
  const initialTagKey = tagRaw ?? "all";

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["notes", page, PER_PAGE, search, initialTagKey],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient
        initialPage={page}
        initialSearch={search}
        perPage={PER_PAGE}
        initialTag={initialTagKey}
      />
    </HydrationBoundary>
  );
}
