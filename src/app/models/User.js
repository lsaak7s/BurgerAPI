//SEMPRE TENHA CERTEZA
// Importa as ferramentas do Sequelize:
// - DataTypes: define os tipos das colunas (UUID, texto, booleano, etc.)
// - Model: a classe base que toda tabela do banco herda
import { DataTypes, Model } from 'sequelize';

// Define a classe User que representa a tabela de usuários
class User extends Model {}

// Função responsável por criar/configurar a tabela no banco de dados
export function initUser(sequelize) {
	// Verificação de segurança: se o modelo já foi inicializado antes,
	// evita erro de tentar configurar duas vezes e apenas retorna o que já existe
	if (User.sequelize) {
		return User;
	}

	User.init(
		{
			// Coluna ID: identificador único do usuário
			id: {
				type: DataTypes.UUID, // Gera um código único aleatório (ex: a1b2c3d4-...)
				defaultValue: DataTypes.UUIDV4, // O banco gera esse código automaticamente ao salvar
				primaryKey: true, // É a chave primária da tabela
			},

			// Coluna Name: nome do usuário
			name: DataTypes.STRING, // Texto

			// Coluna Email: email do usuário
			email: DataTypes.STRING, // Texto

			// Coluna password_hash: guarda a senha criptografada (nunca salva senha pura)
			password_hash: DataTypes.STRING, // Texto

			// Coluna admin: define se o usuário é administrador
			admin: DataTypes.BOOLEAN, // Verdadeiro ou Falso
		},
		{
			sequelize, // Passa a conexão com o banco de dados
			tableName: 'users', // Nome da tabela no banco
			timestamps: true, // O banco cria sozinho as datas de "criado em" e "atualizado em"
			underscored: true, // Usa snake_case para nomes de colunas (ex: created_at)
		},
	);

	// Retorna a classe User já configurada
	return User;
}

// Exporta o modelo User como padrão do arquivo
export default User;