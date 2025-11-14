import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Notes from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

async function NotesByCategory({ params }: Props) {
  const { slug } = await params;
  const category =
    slug[0] === "all" ? "" : slug[0].charAt(0).toUpperCase() + slug[0].slice(1);
  const page = 1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", page, category],
    queryFn: () => fetchNotes("", page, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes initialCategory={category} />
    </HydrationBoundary>
  );
}

export default NotesByCategory;