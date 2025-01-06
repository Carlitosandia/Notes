import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { NotesCategories } from './entities/notes-categories.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class NotesRepository {
    constructor(
        @InjectRepository(NotesCategories)
        private readonly notesCategoriesRepo: Repository<NotesCategories>,
        @InjectRepository(Note)
        private readonly notesRepo: Repository<Note>,
        private readonly categoriesService: CategoriesService // Inyección del servicio
    ) { }


    async createNote(title: string, content: string, userId: string, categoryIds: string[] = []): Promise<Note> {
        // Crear la nota
        try{
            const note = this.notesRepo.create({
                title,
                content,
                user: { id: userId },
                createdAt: new Date(),
                updatedAt: new Date(),
            });
    
            const savedNote = await this.notesRepo.save(note);
    
            // Actualizar relaciones en la tabla intermedia
            if (categoryIds.length > 0) {
                // Eliminar relaciones previas
                await this.notesCategoriesRepo.delete({ noteId: savedNote.id });
    
                // Insertar nuevas relaciones
                const categories = categoryIds.map((categoryId) => ({
                    noteId: savedNote.id,
                    categoryId,
                }));
    
                await this.notesCategoriesRepo.insert(categories);
            }
            return savedNote;
        }catch(error){
            throw new Error(`An error occurred while creating the note: ${error.message}`);
        }
    }

    async findOneById(userId: number): Promise<Note> {
        return this.notesRepo.findOne({ where: { id: userId } });
    }

    async deleteNoteById(id: number): Promise<void> {
        await this.notesRepo.delete(id); // Usa el método de TypeORM para eliminar
    }

    async updateNoteById(id: number, updateNoteDto: Partial<Note>): Promise<void> {
        try {
            await this.notesRepo.update(id, updateNoteDto); 
        } catch (error) {
            throw new Error(`An error occurred while updating the note: ${error.message}`);
        }
    }

    async addCategoriesToNoteById(noteId: number, categoryIds: string[]): Promise<Object> {
        const existingRelations = await this.notesCategoriesRepo.find({
            where: { noteId },
        });
        const existingCategoryIds = existingRelations.map((relation) => relation.categoryId);
        const newCategoryIds = categoryIds.filter((categoryId) => !existingCategoryIds.includes(categoryId));
        const newRelations = newCategoryIds.map((categoryId) => ({
            noteId,
            categoryId,
        }));
        if (newRelations.length === 0) {
            throw new Error('Categories already added to the note');
        }
        try {
            await this.notesCategoriesRepo.insert(newRelations);
            return { message: 'Categories added successfully' };
        } catch (error) {
            throw new Error(`An error occurred while adding categories to the note: ${error.message}`);
        }
    }

    async removeCategoriesFromNoteById(noteId: number, categoryIds: string[]): Promise<Object> {
        const existingRelations = await this.notesCategoriesRepo.find({
            where: { noteId },
        });
        const existingCategoryIds = existingRelations.map((relation) => relation.categoryId);
        const relationsToRemove = existingRelations.filter((relation) => categoryIds.includes(relation.categoryId));
        if (relationsToRemove.length === 0) {
            throw new Error('Categories not found in the note');
        }
        try {
            await this.notesCategoriesRepo.remove(relationsToRemove);
            return { message: 'Categories removed successfully' };
        } catch (error) {
            throw new Error(`An error occurred while removing categories from the note: ${error.message}`);
        }
    }

    async findAllNotesAndCategories(userId : string) {
        const categories = await this.categoriesService.findAll(userId);
        const notes=  await this.notesRepo.find({
            where: { user: { id: userId } }, // Filtra por el userId
            relations: ['notesCategories', 'notesCategories.category'], // Incluye relaciones
        });
        return { notes, categories };
    }

    async findOneNoteById(id: number): Promise<Note> {
        return await this.notesRepo.findOne({
            where: { id },
            relations: ['notesCategories', 'notesCategories.category'],
        });
    }
}
