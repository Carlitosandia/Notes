import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Note } from '../../notes/entities/note.entity';
import { Category } from '../../categories/entities/category.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', length: 255})
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({type: 'varchar', length: 15})
  password: string;
  
  @OneToMany(() => Note, (note) => note.user, { eager: false })
  notes: Note[];
  
  @OneToMany(() => Category, (category) => category.user, { eager: false })
  categories: Category[];
  
  
}
