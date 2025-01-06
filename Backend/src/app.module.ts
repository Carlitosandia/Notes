import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { CategoriesModule } from './categories/categories.module';
import { User } from './users/entities/user.entity';
import { Note } from './notes/entities/note.entity';
import { Category } from './categories/entities/category.entity';
import { NotesCategories } from './notes/entities/notes-categories.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db-instance-notes.cfqya048en2z.us-east-1.rds.amazonaws.com' ,
    port: 5432,
    username: 'postgres',
    password: 'CaJaRe2018',
    database: 'Task_Manager',
    entities: [User, Note, Category, NotesCategories],
    synchronize: false,
  }), UsersModule, NotesModule, CategoriesModule]
})


export class AppModule {}
