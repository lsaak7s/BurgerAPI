/* 
=============================================================================
MODEL DE CATEGORIAS (category.js)
=============================================================================
Padrão da arquitetura MVC / Sequelize:
- Define a estrutura da tabela "category" no banco de dados (coluna "name").
- Define os relacionamentos: Uma Categoria possui muitos Produtos (hasMany).
=============================================================================
*/

import { DataTypes, Model } from 'sequelize';

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
		},
	);

	return Category;
}

export default Category;