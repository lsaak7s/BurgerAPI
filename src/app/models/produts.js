import { DataTypes, Model } from 'sequelize';

class Product extends Model {
	static associate(models) {
		Product.belongsTo(models.Category, {
			foreignKey: 'category_id',
			as: 'category',
		});
	}
}

export function initProduct(sequelize) {
	Product.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			path: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			url: {
				type: DataTypes.VIRTUAL,
				get() {
					const file = this.getDataValue('path');
					if (!file) return null;
					return `http://localhost:3000/product-file/${encodeURIComponent(file)}`;
				},
			},
		},
		{
			sequelize,
			tableName: 'products',
			underscored: true,
		},
	);

	return Product;
}

export default Product;
