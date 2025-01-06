import { Link, useNavigate } from "react-router-dom"
import NotesForm from "./NotesForm"
import { NoteFormData, Note } from "@/types/index"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { updateNote } from "@/api/NotesAPI"
import { toast } from "react-toastify"

type EditNoteFormProps = {
    data: NoteFormData
    noteId: Note['id']
}

export default function EditeNoteForm({ data, noteId }: EditNoteFormProps) {
    const navigate = useNavigate();
    const userId = localStorage.getItem('USER_ID');
    const { register, handleSubmit, formState: { errors } } = useForm<NoteFormData>({
        defaultValues: {
            title: data.title,
            content: data.content,
            isArchived: data.isArchived,
            userId: userId!,
            notesCategories: data.notesCategories
        }
    });

    const { mutate } = useMutation({
        mutationFn: updateNote,
        onSuccess: (data) => {
            toast.success(data.message)
            navigate('/')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleFormSubmit = (formData: NoteFormData) => {
        const data = {
            formData,
            noteId
        }
        mutate(data)
    }

    return (
        <>
            <div className='max-w-3xl mx-auto'>
                <h1 className="text-5xl font-black"> Edit note</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Edit the note</p>
                <nav className="my-5">
                    <Link
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transitiion-colors"
                        to="/"
                    >Back to Dashboard</Link>
                </nav>
                <form
                    className='mt-10 bg-white shadow-lg p-10 rounded-lg'
                    onSubmit={handleSubmit(handleFormSubmit)}
                    noValidate
                >

                    <NotesForm
                        register={register}
                        errors={errors}
                    />


                    <input
                        type="submit"
                        value='Update Note'
                        className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors'
                    />
                </form>
            </div>
        </>
    )
}