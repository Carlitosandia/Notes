import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "@/api/NotesAPI";
import EditeNoteForm from "@/components/notes/EditNoteForm";

export default function EditNotes() {
    const params = useParams();
    const noteId = parseInt(params.noteid!);

    const { data, isError, isLoading } = useQuery({
        queryKey: ['editNote', noteId],
        queryFn: () => getNoteById(noteId)
    })

    console.log(isLoading);

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>There was an error</p>
    if (data) return <EditeNoteForm data={data} noteId={noteId} />
}