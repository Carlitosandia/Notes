import { Link, useNavigate } from "react-router-dom"
import RemoveCategoryModal from "./categories/RemoveCategory";
import { Category } from "../types";

interface HeaderDashBoardProps {
    categories?: Category[];
}

export default function HeaderDashBoard({ categories = [] }: HeaderDashBoardProps) {
    const navigate = useNavigate();
    return (
        <>
            <h1 className="text-5xl font-black">My notes</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">
                Manage your notes
            </p>
            <nav className="my-5 flex gap-4">
                <Link
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transitiion-colors"
                    to="/notes/create"
                >
                    Create Note
                </Link>
                <Link
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transitiion-colors"
                    to="/category/create"
                >
                    Create Category
                </Link>
                <button
                    type="button"
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transitiion-colors"
                    onClick={() => navigate(location.pathname + "?removeCategory=true")}
                >
                    Delete Category
                </button>
            </nav>
            <RemoveCategoryModal categories={categories} />
        </>
    );
}
