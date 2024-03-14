import expressAsyncHandler from 'express-async-handler';
import { ActorService, actorService } from '~/services/dvdrental/actor.service';
import { successJson } from '~/utils/response';

export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  getActorList = expressAsyncHandler(async (req, res) => {
    const actorList = await this.actorService.getActorList();
    res.json(successJson(actorList));
  });

  getActor = expressAsyncHandler<{ actorId: number }>(async (req, res) => {
    const actor = await this.actorService.getActor(req.params.actorId);
    res.json(successJson(actor));
  });
}

export const actorController = new ActorController(actorService);
