import { db } from '~/models';

export class CategoryService {
  constructor(private readonly database: typeof db) {}

  async getCategoryList() {
    const categoryList = await this.database.Category.findAll();
    return categoryList;
  }

  async getCategory(categoryId: number) {
    const category = await this.database.Category.findByPk(categoryId, {
      include: [
        {
          model: this.database.Film,
        },
      ],
    });
    return category;
  }
}

export const categoryService = new CategoryService(db);
