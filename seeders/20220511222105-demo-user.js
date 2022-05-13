'use strict';

const { faker } = require('@faker-js/faker')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     let users = [];

     for (let i = 0; i < 3; i++) {
       users.push({
         username: faker.internet.userName(),
         desk: faker.datatype.number(10),
         review: faker.lorem.paragraph(),
         createdAt: new Date(),
         updatedAt: new Date(),
       })
     }
 
     await queryInterface.bulkInsert('users', users)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
