import { Injectable } from '@nestjs/common';
import { NotesRepository } from './notes.repository';
import { UsersRepository } from '../users/users.repository';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UsersService } from 'src/users/users.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class NotesService {
  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly usersService: UsersService, 
  ) { }

  async createNote(createNoteDto: CreateNoteDto): Promise<void> {
    const { title, content, userId, categoryIds } = createNoteDto;
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await this.notesRepository.createNote(title, content, userId, categoryIds);
  }

  async DeleteNote(id: number): Promise<void> {
    // Llama al repositorio para eliminar la nota
    await this.notesRepository.deleteNoteById(id);
  }

  async UpdateNote(id: number, updateNoteDto: UpdateNoteDto){
    // Implementar lógica para actualizar una nota
    const { title, content, isArchived, userId } = updateNoteDto;
    try{
      const user = await this.usersService.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return await this.notesRepository.updateNoteById(id, {
        title,
        content,
        isArchived,  
        updatedAt: new Date(), // Actualiza automáticamente la fecha
      });
    }catch(error){
      throw new Error(`An error occurred while updating the note: ${error.message}`);
    }
  }

  async addCategoriesToNote(id: number, categoryIds: string[]) {
    const note = await this.notesRepository.findOneById(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return await this.notesRepository.addCategoriesToNoteById(id, categoryIds);
  }

  async removeCategoriesFromNote(id: number, categoryIds: string[]) {
    const note = await this.notesRepository.findOneById(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return await this.notesRepository.removeCategoriesFromNoteById(id, categoryIds);
  }

  async findAll(id:string){
    return await this.notesRepository.findAllNotesAndCategories(id);
  }

  async findOne(id: number){
    return await this.notesRepository.findOneNoteById(id);
  }
}
