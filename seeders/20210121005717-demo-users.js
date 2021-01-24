'use strict';

var bcrypt = require("bcryptjs");

const userDefault = [...Array(1)].map((users) => (
  {
    username: 'admin',
    password: bcrypt.hashSync('123456', 8),
    active: true,
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

   await queryInterface.bulkInsert('users', userDefault, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('users', null, {});
  }
};
