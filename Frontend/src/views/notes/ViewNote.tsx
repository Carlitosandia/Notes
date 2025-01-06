import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getNoteById } from "@/api/NotesAPI";
import AddCategoryModal from "@/components/categories/AddCategoryModal";
import DeleteCategoryModal from "@/components/categories/DeleteCategoryModal";
import { Category } from "@/types/index";

type Note = {
    id: number;
    title: string;
    content: string;
    isArchived: boolean;
    userId: string;
    notesCategories?: {
        categoryId: string; // ID de la categoría
        category: {
            title: string; // Nombre de la categoría
        };
    }[];
};

export default function ViewNote() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const noteId = parseInt(params.noteid!);

    const [isCategoriesLoading, setIsCategoriesLoading] = useState(true); // Estado para manejar la carga de categorías
    const [categories, setCategories] = useState(location.state || undefined); // Inicializa con `state` o undefined

    // Monitorear cambios en `location.state`
    useEffect(() => {
        if (location.state) {
            setCategories(location.state); // Actualiza las categorías cuando estén disponibles
            setIsCategoriesLoading(false); // Detener el estado de carga
        }
    }, [location.state]);

    const { data: noteData, isError, isLoading } = useQuery({
        queryKey: ["note", noteId],
        queryFn: () => getNoteById(noteId),
    });

    if (isLoading || isCategoriesLoading) {
        return <p>Cargando datos...</p>;
    }

    if (isError) {
        return <p>Ha ocurrido un error al cargar la nota.</p>;
    }

    function getAssociatedCategories(note: Note, categories: Category[]) {
        const associatedCategoryIds = note.notesCategories?.map((nc) => nc.categoryId) || [];
        return categories.filter((category) =>
            associatedCategoryIds.includes(category.id)
        );
    }
    
    function getUnassociatedCategories(note: Note, categories: Category[]) {
        const associatedCategoryIds = note.notesCategories?.map((nc) => nc.categoryId) || [];
        return categories.filter(
            (category) => !associatedCategoryIds.includes(category.id)
        );
    }
    
    


    const note = noteData;
    const associatedCategories = getAssociatedCategories(note, categories);
    const unassociatedCategories = getUnassociatedCategories(note, categories);
    console.log(associatedCategories);
    return (
        <>
            <div className="p-5 min-h-screen">
                <nav className="my-5">
                    <Link
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transitiion-colors"
                        to="/"
                    >
                        Back to DashBoard
                    </Link>
                </nav>
                <h1 className="text-4xl font-bold text-center mb-10">{note.title}</h1>

                <div className="bg-white shadow-md rounded-md p-6 max-w-4xl mx-auto my-5">
                    <p className="text-lg text-justify leading-relaxed">{note.content}</p>
                </div>

                <h3 className="text-2xl font-bold mb-10">Categories</h3>
                <div className="flex flex-wrap gap-4 mt-10">
                    {note.notesCategories?.map((category: any) => (
                        <div
                            key={category.categoryId}
                            className="shadow-md rounded-md p-4 w-48 text-center border border-gray-300"
                        >
                            <h2 className="text-lg font-semibold text-gray-700">
                                {category.category.title}
                            </h2>
                        </div>
                    ))}
                </div>
                <div className="flex my-10 py-3 gap-4">
                <button
                    type="button"
                    className="bg-green-400 hover:bg-green-500 px-10 py-4 text-white text-xl font-bold cursor-pointer transitiion-colors"
                    onClick={() =>
                        navigate(location.pathname + "?newCategory=true&noteId=" + noteId)
                    }
                >
                    Add Category
                </button>
                <button
                    type="button"
                    className="bg-red-400 hover:bg-red-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transitiion-colors"
                    onClick={() => navigate(location.pathname + "?deleteCategory=true&noteId=" + noteId)}
                >
                    Delete Category
                </button>
                </div>
            </div>
            <AddCategoryModal categories={unassociatedCategories} />
            <DeleteCategoryModal categories={associatedCategories} />
        </>
    );
}
