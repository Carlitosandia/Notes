import axiosClient from "@/lib/axios";
import { categoriesSchema, CategoryFormData, dashBoardSchema, Note, NoteFormData, UserLoginForm } from "@/types/index";
import { isAxiosError } from "axios";

export async function authenticateUser(formData:UserLoginForm) {
    try{
        const { data } = await axiosClient.post('/users/login', formData);
        console.log(data);  
        localStorage.setItem('USER_ID', data.id);
        localStorage.setItem('USER_NAME', data.name);
        localStorage.setItem('AUTH_TOKEN', data.accessToken);
        return data;
    } catch(error){
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}
export async function createNote(formData : NoteFormData) {
    try{
        const { data } = await axiosClient.post('/notes', formData);
        return data;
    } catch(error){
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function getAllNotes() {
    try{
        const id = localStorage.getItem("USER_ID");
        const { data } = await axiosClient.get(`/notes/${id}`);
        const notes = dashBoardSchema.safeParse(data.notes);
        const categories = categoriesSchema.safeParse(data.categories);
        if(notes.success && categories.success){
            return data;
        }
    } catch(error){
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function getNoteById(id: Note['id']) {
    try{
        const { data } = await axiosClient.get(`/notes/note/${id}`);

        return data;
    } catch(error){
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

type NoteAPIType ={
    formData: NoteFormData;
    noteId: Note['id'];
}

export async function updateNote({formData, noteId}: NoteAPIType) {
    try{
        const { data } = await axiosClient.patch(`/notes/${noteId}`, formData);
        return data;
    } catch(error){
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

type CategoryAPIType ={
    noteId: Note['id'];
    formData: string[];
}

export async function addCategoryToNote({noteId, formData}: CategoryAPIType) {
    try{
        const { data } = await axiosClient.patch(`/notes/${noteId}/categories`, {categoryIds: formData});
        return data;
    }catch(error){
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function createCategory(formData: CategoryFormData) {
    try{
        const { data } = await axiosClient.post('/categories', formData);
        return data;
    } catch(error){
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function removeCategory(id: string) {
    try{
        const { data } = await axiosClient.delete(`/categories/${id}`);
        return data;
    } catch(error){
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteNoteCategory({noteId, formData}: CategoryAPIType) {
    try{
        const { data } = await axiosClient.patch(`/notes/remove/${noteId}/categories`, {categoryIds: formData});
        return data;
    }catch(error){
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteNote(noteId: Note['id']) {
    try{
        const { data } = await axiosClient.delete(`/notes/${noteId}`);
        return data;
    } catch(error){
        console.log(error);
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}