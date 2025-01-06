import ErrorMessage from "../ErrorMessage";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CategoryFormData } from "@/types/index";

type CategoriesFormProps = {
    register: UseFormRegister<CategoryFormData>,
    errors: FieldErrors<CategoryFormData>
}

export default function CategoriesForm ({ register, errors }: CategoriesFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="title" className="text-sm uppercase font-bold">
                    Category name
                </label>
                <input
                    id="title"
                    className="w-full p-3 border border-gray-200"
                    type="text"
                    placeholder="Type the category name"
                    {...register("title", {
                        required: "The category name is required",
                    })}
                />
                {errors.title && (
                    <ErrorMessage>{errors.title.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}