import { db } from '~/models';

export class FilmActorService {
  constructor(private readonly database: typeof db) {}

  async getFilmActorList() {
    const filmActorList = await this.database.FilmActor.findAll();
    return filmActorList;
  }

  async getFilmActor(filmActorId: number) {
    const filmActor = await this.database.FilmActor.findByPk(filmActorId, {
      include: [
        {
          model: this.database.Film,
        },
        {
          model: this.database.Actor,
        },
      ],
    });
    return filmActor;
  }
}

export const filmActorService = new FilmActorService(db);
