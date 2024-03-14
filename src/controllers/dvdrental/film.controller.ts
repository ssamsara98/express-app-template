import expressAsyncHandler from 'express-async-handler';
import { FilmService, filmService } from '~/services/dvdrental/film.service';
import { successJson } from '~/utils/response';

export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  getFilmList = expressAsyncHandler(async (req, res) => {
    const filmList = await this.filmService.getFilmList();
    res.json(successJson(filmList));
  });

  getFilm = expressAsyncHandler<{ filmId: number }>(async (req, res) => {
    const film = await this.filmService.getFilm(req.params.filmId);
    res.json(successJson(film));
  });

  getFilmListRaw = expressAsyncHandler(async (req, res) => {
    const filmList = await this.filmService.getFilmListRaw();
    res.json(successJson(filmList));
  });

  getFilmRaw = expressAsyncHandler<{ filmId: number }>(async (req, res) => {
    const film = await this.filmService.getFilmRaw(req.params.filmId);
    res.json(successJson(film));
  });
}

export const filmController = new FilmController(filmService);
