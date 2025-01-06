import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Note } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteNote } from "@/api/NotesAPI";

interface DeleteNoteProps {
  noteId: Note["id"];
}

const DeleteNote = forwardRef<HTMLButtonElement, DeleteNoteProps>(({ noteId }, ref) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteNote = () => {
    mutate(noteId);
  };

  return (
    <button
      ref={ref}
      type="button"
      className="block px-3 py-1 text-sm leading-6 text-red-500"
      onClick={handleDeleteNote}
    >
      Delete Note
    </button>
  );
});

export default DeleteNote;
