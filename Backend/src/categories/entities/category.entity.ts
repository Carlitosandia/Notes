import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { NotesCategories } from '../../notes/entities/notes-categories.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.categories)
  user: User;

  @OneToMany(() => NotesCategories, (notesCategories) => notesCategories.category)
  notesCategories: NotesCategories[];
}
