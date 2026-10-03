/*import Sequelize, { Model } from 'sequelize';

class Products extends Model {
	static init(Sequelize) {
		Model.init(
			{
				name: Sequelize.STRING,
				price: Sequelize.INTEGER,
				category: Sequelize.STRING,
				path: Sequelize.STRING,
			},
			{
				sequelize,
				tableName: 'products',
			},
		);
	}
}
export default Products;
*/

import { DataTypes, type Sequelize, type InferAttributes, type InferCreationAttributes, Model } from 'sequelize';

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    declare id: number;
    declare name: string;
    declare price: number;
    declare category: string;
    declare path: string;
}

export function initProduct(sequelize: Sequelize): typeof Product {
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
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            path: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'products',
        }
    );

    return Product;
}

export default Product;
