'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('category', 'path', {
			type: Sequelize.STRING,
		});
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.removeColumn('category', 'path');
	},
};
