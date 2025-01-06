import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { NotesCategories } from './notes-categories.entity';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn('increment')
  id: number; 

  @Column({type: 'varchar', length: 255})
  title: string;

  @Column({type: 'text'})
  content: string;

  @Column({ type:'boolean' ,default: false })
  isArchived: boolean;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;
  
  @OneToMany(() => NotesCategories, (notesCategories) => notesCategories.note)
  notesCategories: NotesCategories[];
}
