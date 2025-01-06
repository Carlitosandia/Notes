import { Fragment, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "@/api/NotesAPI";
import HeaderDashBoard from "@/components/HeaderDashBoard";
import DeleteCategoryModal from "@/components/categories/DeleteCategoryModal";
import { Note } from "../types";
import DeleteNote from "@/components/notes/DeleteNote";

export default function DashBoard() {
  // Mantén todos los hooks declarados al principio
  const { data, isError, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getAllNotes,
  });

  const [filter, setFilter] = useState<"all" | "archived" | "unarchived" | "category">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Proveer valores predeterminados para evitar errores de acceso
  const notes = data?.notes || [];
  const categories = data?.categories || [];

  // Filtrar las notas según el filtro
  const filteredData = notes.filter((note : Note) => {
    if (filter === "archived") return note.isArchived;
    if (filter === "unarchived") return !note.isArchived;
    if (filter === "category" && selectedCategory) {
      return (
        Array.isArray(note.notesCategories) &&
        note.notesCategories.some((category : any) => category.categoryId === selectedCategory)
      );
    }
    return true; // Default: show all
  });

  // Manejo de errores y carga después de los hooks
  if (isError) {
    return <p>There was a mistake</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <HeaderDashBoard categories = {categories}/>
      <div className="flex gap-4 my-5">
        <button
          className={`px-5 py-2 font-bold rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-5 py-2 font-bold rounded ${
            filter === "unarchived" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("unarchived")}
        >
          Unarchived
        </button>
        <button
          className={`px-5 py-2 font-bold rounded ${
            filter === "archived" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("archived")}
        >
          Archived
        </button>
        <button
          className={`px-5 py-2 font-bold rounded ${
            filter === "category" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("category")}
        >
          By category
        </button>
        {filter === "category" && (
          <select
            className="px-5 py-2 rounded border"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category : any) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        )}
      </div>
      {filteredData.length ? (
        <ul
          role="list"
          className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
        >
          {filteredData.map((note : any) => (
            <li key={note.id} className="flex justify-between gap-x-6 px-5 py-10">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <Link
                    to={`/notes/${note.id}`}
                    className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                    state={categories}
                  >
                    {note.title}
                  </Link>
                  <p className="text-sm text-gray-400">
                    Created at: {new Date(note.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">
                    Last Update: {new Date(note.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                  </MenuButton>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <MenuItem>
                        <Link
                          to={`/notes/${note.id}/edit`}
                          className="block px-3 py-1 text-sm leading-6 text-gray-900"
                        >
                          Edit Note
                        </Link>
                      </MenuItem>
                      <MenuItem>
                      <DeleteNote noteId={note.id} />
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center py-20">
          Notes not found, try adding one{" "}
          <Link className="text-fuchsia-500 hover:underline font-bold" to="/notes/create">
            Create Note
          </Link>
        </p>
      )}
      <DeleteCategoryModal categories={categories}></DeleteCategoryModal>
    </>
  );
}
