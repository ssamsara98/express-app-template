import Sequelize from 'sequelize';
import { Actor, actorModel } from './actor.model';
import { Address, addressModel } from './address.model';
import { Category, categoryModel } from './category.model';
import { City, cityModel } from './city.model';
import { Country, countryModel } from './country.model';
import { Customer, customerModel } from './customer.model';
import { FilmActor, filmActorModel } from './film-actor.model';
import { FilmCategory, filmCategoryModel } from './film-category.model';
import { Film, filmModel } from './film.model';
import { Inventory, inventoryModel } from './inventory.model';
import { Language, languageModel } from './language.model';
import { Payment, paymentModel } from './payment.model';
import { Rental, rentalModel } from './rental.model';
import { Staff, staffModel } from './staff.model';
import { Store, storeModel } from './store.model';

export type DvdrentalModels = {
  Actor: typeof Actor;
  Address: typeof Address;
  Category: typeof Category;
  City: typeof City;
  Country: typeof Country;
  Customer: typeof Customer;
  Film: typeof Film;
  FilmActor: typeof FilmActor;
  FilmCategory: typeof FilmCategory;
  Inventory: typeof Inventory;
  Language: typeof Language;
  Payment: typeof Payment;
  Rental: typeof Rental;
  Staff: typeof Staff;
  Store: typeof Store;
};

export const getDvdrentalModels = (
  s: Sequelize.Sequelize,
  dt: typeof Sequelize.DataTypes,
): DvdrentalModels => ({
  Actor: actorModel(s, dt),
  Address: addressModel(s, dt),
  Category: categoryModel(s, dt),
  City: cityModel(s, dt),
  Customer: customerModel(s, dt),
  Country: countryModel(s, dt),
  Film: filmModel(s, dt),
  FilmActor: filmActorModel(s, dt),
  FilmCategory: filmCategoryModel(s, dt),
  Inventory: inventoryModel(s, dt),
  Language: languageModel(s, dt),
  Payment: paymentModel(s, dt),
  Rental: rentalModel(s, dt),
  Staff: staffModel(s, dt),
  Store: storeModel(s, dt),
});
