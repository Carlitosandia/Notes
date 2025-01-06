import { z } from 'zod';

/** Auth User */

const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;

/** Notes Schema */

export const noteSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    isArchived: z.boolean(),
    userId: z.string(),
    notesCategories: z.array(z.string()).optional(),
});

export const dashBoardSchema = z.array(
    noteSchema
      .pick({
        id: true,
        title: true,
        content: true,
        isArchived: true,
      })
      .extend({
        createdAt: z.string().transform((val) => new Date(val)), // Transforma a Date
        updatedAt: z.string().transform((val) => new Date(val)), // Transforma a Date
        notescategories: z.array(z.string()).optional(),
    })
);

export const categorySchema = z.object({  
    id: z.string(),
    title: z.string(),
    userId: z.string(),
});

export const categoriesSchema = z.array(
  categorySchema.pick({
    id: true,
    title: true,
  })
);

export type Category = z.infer<typeof categorySchema>;
export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'title' | 'content' | 'userId' | 'isArchived' | 'notesCategories'>;
export type CategoryFormData = Pick<Category, 'title' | 'userId'>;
