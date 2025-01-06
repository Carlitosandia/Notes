import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotesCategories } from './entities/notes-categories.entity';

@Injectable()
export class NotesCategoriesRepository {
  constructor(
    @InjectRepository(NotesCategories)
    private readonly notesCategoriesRepo: Repository<NotesCategories>,
  ) {}

  async addNoteToCategory(noteId: number, categoryId: string): Promise<NotesCategories> {
    const noteCategory = this.notesCategoriesRepo.create({ noteId, categoryId });
    return this.notesCategoriesRepo.save(noteCategory);
  }

  async findCategoriesByNote(noteId: number): Promise<NotesCategories[]> {
    return this.notesCategoriesRepo.find({ where: { noteId } });
  }

  async removeNoteFromCategory(noteId: number, categoryId: string): Promise<void> {
    await this.notesCategoriesRepo.delete({ noteId, categoryId });
  }
}
