"use strict";

module.exports = {
  //     email: DataTypes.STRING,
  //     password: DataTypes.STRING,
  //     firstName: DataTypes.STRING,
  //     lastName: DataTypes.STRING,
  //     address: DataTypes.STRING,
  //     phonenumber: DataTypes.STRING,
  //     gender: DataTypes.BOOLEAN,
  //     typeRole: DataTypes.STRING,
  //     keyRole: DataTypes.STRING,
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

    return queryInterface.bulkInsert("Users", [
      {
        email: "locnv14@gmail.com",
        password: "123123",
        firstName: "Nguyen",
        lastName: "Van Loc",
        address: "Cach mang thang tam",
        phonenumber: "0582070987",
        gender: 1,
        typeRole: "ROLE",
        keyRole: "R1",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
