import { Model, DataTypes } from 'sequelize';

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      foreignKey: 'category_id',
      as: 'products',
    });
  }
}

export function initCategory(sequelize) {
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'category',
      underscored: true,
    }
  );

  return Category;
}

export default Category;
