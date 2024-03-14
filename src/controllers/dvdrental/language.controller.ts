import expressAsyncHandler from 'express-async-handler';
import { LanguageService, languageService } from '~/services/dvdrental/language.service';
import { successJson } from '~/utils/response';

export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  getLanguageList = expressAsyncHandler(async (req, res) => {
    const languageList = await this.languageService.getLanguageList();
    res.json(successJson(languageList));
  });

  getLanguage = expressAsyncHandler<{ languageId: number }>(async (req, res) => {
    const language = await this.languageService.getLanguage(req.params.languageId);
    res.json(successJson(language));
  });
}

export const languageController = new LanguageController(languageService);
