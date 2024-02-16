'use strict';

const { hash, genSalt } = require('bcrypt');

const hashPassword = async (password) => await hash(password, await genSalt(12));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    /**
     * @type {{id: number; name: string; email: string; password: string; birthdate?: Date; created_at: Date; updated_at: Date}[]}
     */
    const users = [
      {
        id: 1,
        name: 'S Abd Malik',
        email: 'ssamsara98@mailsac.com',
        password: await hashPassword('asdf1234'),
        birthdate: new Date('1998-12-29'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'DTX',
        email: 'dtx@mailsac.com',
        password: await hashPassword('asdf1346'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('users', users);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
