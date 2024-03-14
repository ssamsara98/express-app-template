import { debug } from '~/bin/debug';
import { db } from '~/models';

export class FilmService {
  constructor(private readonly database: typeof db) {}

  async getFilmList() {
    const filmList = await this.database.Film.findAll();
    return filmList;
  }

  async getFilm(filmId: number) {
    const film = await this.database.Film.findByPk(filmId, {
      include: [
        {
          model: this.database.Language,
        },
        {
          model: this.database.Category,
        },
        {
          model: this.database.Actor,
        },
        {
          model: this.database.Inventory,
        },
      ],
    });
    return film;
  }

  async getFilmListRaw() {
    const [results, metadata] = await this.database.sequelize.query(
      `SELECT
  "film"."film_id" AS "id",
  "film"."title",
  "film"."description",
  "film"."release_year" AS "releaseYear",
  "film"."language_id" AS "languageId",
  "film"."rental_duration" AS "rentalDuration",
  "film"."rental_rate" AS "rentalRate",
  "film"."length",
  "film"."replacement_cost" AS "replacementCost",
  "film"."rating",
  "film"."special_features" AS "specialFeatures",
  "film"."fulltext",
  "film"."last_update" AS "lastUpdate",
  "language"."language_id" AS "language.id",
  "language"."name" AS "language.name",
  "language"."last_update" AS "language.lastUpdate"
FROM "film" AS "film"
LEFT OUTER JOIN "language" AS "language" ON "film"."language_id" = "language"."language_id"
;`,
      {
        // nest: true,
      },
    );
    return results;
  }

  async getFilmRaw(filmId: number) {
    const [results, metadata] = await this.database.sequelize.query(
      `
SELECT
  "film"."film_id" AS "id",
  "film"."title",
  "film"."description",
  "film"."release_year" AS "releaseYear",
  "film"."language_id" AS "languageId",
  "film"."rental_duration" AS "rentalDuration",
  "film"."rental_rate" AS "rentalRate",
  "film"."length",
  "film"."replacement_cost" AS "replacementCost",
  "film"."rating",
  "film"."special_features" AS "specialFeatures",
  "film"."fulltext",
  "film"."last_update" AS "lastUpdate",
  "language"."language_id" AS "language.id",
  "language"."name" AS "language.name",
  "language"."last_update" AS "language.lastUpdate",
  "categories"."category_id" AS "categories.id",
  "categories"."name" AS "categories.name",
  "categories"."last_update" AS "categories.lastUpdate",
  "categories->film_category"."film_id" AS "categories.film_category.filmId",
  "categories->film_category"."category_id" AS "categories.film_category.categoryId",
  "categories->film_category"."last_update" AS "categories.film_category.lastUpdate",
  "actors"."actor_id" AS "actors.id",
  "actors"."first_name" AS "actors.firstName",
  "actors"."last_name" AS "actors.lastName",
  "actors"."last_update" AS "actors.lastUpdate",
  "actors->film_actor"."film_id" AS "actors.film_actor.filmId",
  "actors->film_actor"."actor_id" AS "actors.film_actor.actorId",
  "actors->film_actor"."last_update" AS "actors.film_actor.lastUpdate",
  "inventories"."inventory_id" AS "inventories.id",
  "inventories"."film_id" AS "inventories.filmId",
  "inventories"."store_id" AS "inventories.storeId",
  "inventories"."last_update" AS "inventories.lastUpdate"
FROM "film" AS "film"
LEFT OUTER JOIN "language" AS "language" ON "film"."language_id" = "language"."language_id"
LEFT OUTER JOIN
  ("film_category" AS "categories->film_category" INNER JOIN "category" AS "categories" ON "categories"."category_id" = "categories->film_category"."category_id")
  ON "film"."film_id" = "categories->film_category"."film_id"
LEFT OUTER JOIN
  ("film_actor" AS "actors->film_actor" INNER JOIN "actor" AS "actors" ON "actors"."actor_id" = "actors->film_actor"."actor_id")
  ON "film"."film_id" = "actors->film_actor"."film_id"
LEFT OUTER JOIN "inventory" AS "inventories" ON "film"."film_id" = "inventories"."film_id"
WHERE "film"."film_id" = :filmId
  -- OR "film"."film_id" = :filmId2 --
;`,
      {
        type: this.database.Sequelize.QueryTypes.SELECT,
        replacements: {
          filmId,
          // filmId2: filmId + 1,
        },
        // model: this.database.Film,
        // mapToModel: true,
        // plain: true,
        // raw: false,
        logging: debug,
        nest: true,
      },
    );
    return results;
  }
}

export const filmService = new FilmService(db);
