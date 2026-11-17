/* 
=============================================================================
MODEL DE USUÁRIOS (User.js)
=============================================================================
Padrão da arquitetura MVC / Sequelize:
- Define a estrutura da tabela "users" no banco de dados (id em formato UUID,
  name, email, password_hash e indicador de admin).
- Possui verificação de segurança para evitar inicializar o modelo mais de uma vez.
=============================================================================
*/

import { DataTypes, Model } from 'sequelize';

class User extends Model {}

export function initUser(sequelize) {
	if (User.sequelize) {
		return User;
	}

	User.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password_hash: DataTypes.STRING,
			admin: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			tableName: 'users',
			timestamps: true,
			underscored: true,
			// ADICIONE ESTAS DUAS LINHAS ABAIXO:
			createdAt: 'created_at',
			updatedAt: 'update_at', // <-- Força o Sequelize a usar o nome sem o 'd' que está na sua tabela
		},
	);

	return User;
}

export default User;
