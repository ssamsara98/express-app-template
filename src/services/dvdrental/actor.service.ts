import { db } from '~/models';

export class ActorService {
  constructor(private readonly database: typeof db) {}

  async getActorList() {
    const actorList = await this.database.Actor.findAll();
    return actorList;
  }

  async getActor(actorId: number) {
    const actor = await this.database.Actor.findByPk(actorId, {
      include: [
        {
          model: this.database.Film,
        },
      ],
    });
    return actor;
  }
}

export const actorService = new ActorService(db);
