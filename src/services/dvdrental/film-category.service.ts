import { db } from '~/models';

export class FilmCategoryService {
  constructor(private readonly database: typeof db) {}

  async getFilmCategoryList() {
    const filmCategoryList = await this.database.FilmCategory.findAll();
    return filmCategoryList;
  }

  async getFilmCategory(filmCategoryId: number) {
    const filmCategory = await this.database.FilmCategory.findByPk(filmCategoryId, {
      include: [
        {
          model: this.database.Film,
        },
        {
          model: this.database.Category,
        },
      ],
    });
    return filmCategory;
  }
}

export const filmCategoryService = new FilmCategoryService(db);
