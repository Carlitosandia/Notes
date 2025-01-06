import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get('/:id')
  findAll(@Param('id') userId: string) {
    return this.categoriesService.findAll(userId);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
