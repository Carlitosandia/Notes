import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Note } from './note.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity('notes_categories')
export class NotesCategories {
  @PrimaryColumn()
  noteId: number;

  @PrimaryColumn()
  categoryId: string;

  @ManyToOne(() => Note, (note) => note.notesCategories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'noteId' })
  note: Note;

  @ManyToOne(() => Category, (category) => category.notesCategories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
