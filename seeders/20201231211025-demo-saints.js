'use strict';

const faker = require('faker-br');

const saints = [...Array(5)].map((users) => (
  {
    name: faker.name.firstName(),
    date: faker.date.past(),
    resume: faker.lorem.text().substring(1, 100),
    active: faker.random.boolean(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   
    await queryInterface.bulkInsert('saints', saints, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    
     await queryInterface.bulkDelete('saints', null, {});
  }
};
