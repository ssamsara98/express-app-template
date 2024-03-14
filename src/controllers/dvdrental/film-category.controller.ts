import expressAsyncHandler from 'express-async-handler';
import {
  FilmCategoryService,
  filmCategoryService,
} from '~/services/dvdrental/film-category.service';
import { successJson } from '~/utils/response';

export class FilmCategoryController {
  constructor(private readonly filmCategoryService: FilmCategoryService) {}

  getFilmCategoryList = expressAsyncHandler(async (req, res) => {
    const filmCategoryList = await this.filmCategoryService.getFilmCategoryList();
    res.json(successJson(filmCategoryList));
  });

  getFilmCategory = expressAsyncHandler<{ filmCategoryId: number }>(async (req, res) => {
    const filmCategory = await this.filmCategoryService.getFilmCategory(req.params.filmCategoryId);
    res.json(successJson(filmCategory));
  });
}

export const filmCategoryController = new FilmCategoryController(filmCategoryService);
