import expressAsyncHandler from 'express-async-handler';
import { CategoryService, categoryService } from '~/services/dvdrental/category.service';
import { successJson } from '~/utils/response';

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  getCategoryList = expressAsyncHandler(async (req, res) => {
    const categoryList = await this.categoryService.getCategoryList();
    res.json(successJson(categoryList));
  });

  getCategory = expressAsyncHandler<{ categoryId: number }>(async (req, res) => {
    const category = await this.categoryService.getCategory(req.params.categoryId);
    res.json(successJson(category));
  });
}

export const categoryController = new CategoryController(categoryService);
