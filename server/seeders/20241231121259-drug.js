"use strict";
const axios = require("axios");
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
    const response = await axios.get(
      "https://magneto.api.halodoc.com/api/v1/buy-medicine/products/search/%20?page=1&per_page=199"
    );
    //console.log(response.data.result);
    const drugs = response.data.result.map((drug) => drug.slug);
    //console.log(drugs);
    //console.log(drugs.length);

    const drugDetails = await Promise.all(
      drugs.map(async (slug) => {
        const detailResponse = await axios.get(
          `https://magneto.api.halodoc.com/api/v1/buy-medicine/products/detail/${slug}`
        );
        const { name, description, image_url, composition, dosage } =
          detailResponse.data;
        return {
          name,
          description,
          imgUrl: image_url,
          composition,
          dosage,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );
    await queryInterface.bulkInsert("Drugs", drugDetails);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Drugs", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};
