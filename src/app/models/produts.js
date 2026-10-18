// Importa as ferramentas do Sequelize:
// - DataTypes: define os tipos das colunas no banco (texto, número, etc.)
// - Model: a classe base que toda tabela do banco herda
import { DataTypes, Model } from 'sequelize';

// Define a classe Product que representa a tabela de produtos no banco
class Product extends Model {
	// Método estático para definir como esta tabela se relaciona com outras
	static associate(models) {
		// Define que MUITOS produtos pertencem a UMA categoria (relacionamento N para 1)
		Product.belongsTo(models.Category, {
			foreignKey: 'category_id', // É o campo "category_id" que guarda o id da categoria
			as: 'category', // Apelido usado quando vamos buscar o produto junto com a categoria
		});
	}
}

// Função responsável por criar/configurar a tabela no banco de dados
export function initProduct(sequelize) {
	Product.init(
		{
			// Coluna ID: identificador único do produto
			id: {
				type: DataTypes.INTEGER, // Tipo número inteiro
				autoIncrement: true, // O banco aumenta sozinho (1, 2, 3...)
				primaryKey: true, // É a chave primária da tabela
			},

			// Coluna Name: nome do produto
			name: {
				type: DataTypes.STRING, // Tipo texto
				allowNull: false, // Não pode ficar vazio
			},

			// Coluna Price: preço do produto
			price: {
				type: DataTypes.INTEGER, // Tipo número inteiro
				allowNull: false, // Não pode ficar vazio
			},

			// Coluna Path: onde a imagem do produto está salva no servidor
			path: {
				type: DataTypes.STRING, // Tipo texto (ex: "foto-produto.jpg")
				allowNull: false, // Não pode ficar vazio
			},
			offer: {
				type: DataTypes.BOOLEAN,
			},
			// Coluna VIRTUAL: não existe no banco, só na resposta JSON
			// Útil para montar um link completo da imagem para o cliente
			url: {
				type: DataTypes.VIRTUAL, // Indica que é um campo calculado/gerado
				get() {
					// Pega o valor real do campo "path"
					const file = this.getDataValue('path');

					// Se não houver arquivo, retorna null
					if (!file) return null;

					// Monta a URL completa da imagem
					// encodeURIComponent garante que nomes com espaços ou acentos funcionem certo
					return `http://localhost:3000/product-file/${encodeURIComponent(file)}`;
				},
			},
		},
		{
			sequelize, // Conexão ativa com o banco
			tableName: 'products', // Nome da tabela no banco
			underscored: true, // Usa snake_case para nomes de colunas (ex: created_at)
		},
	);

	// Retorna a classe Product já configurada
	return Product;
}

// Exporta o modelo Product como padrão do arquivo
export default Product;
