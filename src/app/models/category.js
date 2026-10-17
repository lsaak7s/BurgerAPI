// Importa as ferramentas necessárias do Sequelize:
// - DataTypes: define os tipos de dados dos campos (texto, número, data, etc.)
// - Model: classe base que toda tabela do banco vai herdar
import { DataTypes, Model } from 'sequelize';

// Define a classe Category que representa a tabela de categorias no banco de dados
class Category extends Model {
	// Método estático para definir os relacionamentos (associações) dessa tabela com outras
	static associate(models) {
		// Define que UMA categoria pode ter MUITOS produtos (relacionamento 1 para N)
		this.hasMany(models.Product, {
			foreignKey: 'category_id', // Chave estrangeira que liga o produto à categoria
			as: 'products', // Apelido para quando buscarmos a categoria junto com seus produtos
		});
	}
}

// Função responsável por inicializar/configurar os campos e opções do modelo Category
export function initCategory(sequelize) {
	Category.init(
		{
			// Define a coluna "name" na tabela do banco
			name: {
				type: DataTypes.STRING, // Tipo texto (VARCHAR)
				allowNull: false, // Não permite salvar sem preencher o nome
			},
		},
		{
			sequelize, // Passa a conexão ativa com o banco de dados
			tableName: 'category', // Nome exato da tabela no banco de dados
			underscored: true, // Converte nomes de campos para snake_case no banco (ex: createdAt vira created_at)
		},
	);

	// Retorna a classe Category já configurada
	return Category;
}

// Exporta o modelo Category como padrão do arquivo
export default Category;
