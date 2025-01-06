import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./entities/category.entity";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepo: Repository<Category>,
    ) { }

    async createCategory(title: string, userId: string): Promise<Category> {
        try {
            // Creación de la categoría
            const category = this.categoriesRepo.create({ title, user: { id: userId } });
            return await this.categoriesRepo.save(category); // Guarda y retorna la categoría
        } catch (error) {
            throw new Error(`An error occurred while creating the category: ${error.message}`);
        }
    }

    async removeCategory(id: string): Promise<Object> {
        try {
            const result = await this.categoriesRepo.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`Category with ID ${id} not found`);
            }
            return { message: `Category deleted successfully` };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new Error(`An error occurred while deleting the category: ${error.message}`);
        }
    }

    async findAll(userId : string): Promise<Category[]> {
        return this.categoriesRepo.find({where: { user: { id: userId }}});
    }
}