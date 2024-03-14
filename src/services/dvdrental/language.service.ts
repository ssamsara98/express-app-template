import { db } from '~/models';

export class LanguageService {
  constructor(private readonly database: typeof db) {}

  async getLanguageList() {
    const languageList = await this.database.Language.findAll();
    return languageList;
  }

  async getLanguage(languageId: number) {
    const language = await this.database.Language.findByPk(languageId, {
      include: [
        {
          model: this.database.Film,
        },
      ],
    });
    return language;
  }
}

export const languageService = new LanguageService(db);
