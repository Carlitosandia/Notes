import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import CategoriesForm from '@/components/categories/CategoriesForm'
import { CategoryFormData } from '@/types/index'
import { createCategory } from '@/api/NotesAPI'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export default function CreateCategories() {
    const userId = localStorage.getItem("USER_ID");
    const navigate = useNavigate()
    const initialValues : CategoryFormData = {
        title: "",
        userId: userId!,
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const {mutate} = useMutation({
        mutationFn: createCategory,
        onSuccess: (data) => {
            toast.success(data.message)
            navigate('/')
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        }
    })

    const handleFormSubmit = (formData : CategoryFormData) => mutate(formData)
    

    return (
        <>
            <div className='max-w-3xl mx-auto'>
                <h1 className="text-5xl font-black"> Create a category</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Create a new category</p>
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

                    <CategoriesForm
                        register={register}
                        errors={errors}
                    />

                    <input
                        type="submit"
                        value='Create note'
                        className='bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors'
                    />
                </form>
            </div>
        </>
    )
}