import expressAsyncHandler from 'express-async-handler';
import { FilmActorService, filmActorService } from '~/services/dvdrental/film-actor.service';
import { successJson } from '~/utils/response';

export class FilmActorController {
  constructor(private readonly filmActorService: FilmActorService) {}

  getFilmActorList = expressAsyncHandler(async (req, res) => {
    const filmActorList = await this.filmActorService.getFilmActorList();
    res.json(successJson(filmActorList));
  });

  getFilmActor = expressAsyncHandler<{ filmActorId: number }>(async (req, res) => {
    const filmActor = await this.filmActorService.getFilmActor(req.params.filmActorId);
    res.json(successJson(filmActor));
  });
}

export const filmActorController = new FilmActorController(filmActorService);
