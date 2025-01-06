import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NotesCategories } from './entities/notes-categories.entity';
import { NotesRepository } from './notes.repository';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [UsersModule, CategoriesModule, TypeOrmModule.forFeature([Note, NotesCategories])],
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
})
export class NotesModule {}
