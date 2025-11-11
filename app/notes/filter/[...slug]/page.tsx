import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import NotesClient from "../Notes.client";

const PER_PAGE = 12;


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
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const p = await params;
  const sp = await searchParams;

  const raw = p.slug?.[0];

  const tag: NoteTag | undefined =
    raw && raw !== "all" && isNoteTag(raw) ? raw : undefined;

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
