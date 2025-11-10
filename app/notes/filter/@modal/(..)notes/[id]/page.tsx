import NotePreview from "@/components/NotePreview/NotePreview";

export default async function InterceptedNoteModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // споживаємо параметр, щоб уникнути no-unused-vars
  await params;
  return <NotePreview />;
}
