import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    const { title, userId } = createCategoryDto;
    return this.categoriesRepository.createCategory(title, userId);
  }

  findAll(userId: CreateCategoryDto['userId']) {
    return this.categoriesRepository.findAll(userId);
  }

  remove(id: string) {
    const noteDelete = this.categoriesRepository.removeCategory(id);
    return noteDelete;
  }
}
