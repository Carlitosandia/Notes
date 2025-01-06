import { Controller,Get, Post, Body, Delete, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { DeleteNoteDto } from './dto/delete-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    await this.notesService.createNote(createNoteDto);
    return { message: 'Note created successfully' };
  }

  @Get('/:id')
  async findAll(@Param('id') id: string) { 
    return await this.notesService.findAll(id);
  }

  @Get('/note/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.notesService.findOne(id);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.notesService.DeleteNote(id); 
    return { message: 'Note deleted successfully' };
  }
  @Patch('/remove/:id/categories')
  async removeCategoriesFromNote(@Param('id') id: number, @Body('categoryIds') categoryIds: string[]){
    console.log(id);
    console.log(categoryIds);
    return await this.notesService.removeCategoriesFromNote(id, categoryIds);
  }

  @Patch('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateNoteDto: UpdateNoteDto) {
    await this.notesService.UpdateNote(id, updateNoteDto);
    return { message: 'Note updated successfully' };
  }

  @Patch('/:id/categories')
  async addCategoriesToNote(@Param('id') id: number, @Body('categoryIds') categoryIds: string[]){
   return await this.notesService.addCategoriesToNote(id, categoryIds);
  }
}
