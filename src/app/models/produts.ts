//SEMPRE TENHA CERTEZA
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

import { DataTypes, Model, type Sequelize } from 'sequelize';

class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare price: number;
  declare category_id: number;
  declare path: string;
  declare readonly url: CreationOptional<string>;
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
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.VIRTUAL,
        get(this: Product): string | null {
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
    }
  );

  return Product;
}

export default Product;
