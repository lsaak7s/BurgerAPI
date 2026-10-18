/* 
=============================================================================
CONFIGURAÇÃO DO BANCO DE DADOS (database.cjs)
=============================================================================
Padrão da arquitetura / Configurações:
- Contém as credenciais e parâmetros de conexão do Sequelize com o PostgreSQL.
- Define host, porta, usuário, senha e nome do banco de dados (BurgerAPI-db).
- Configura o padrão de timestamps (created_at, updated_at) e convenção
  snake_case para as colunas das tabelas.
=============================================================================
*/

module.exports = {
	dialect: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'admin',
	password: 'LULUBLUR2',
	database: 'BurgerAPI-db',
	define: {
		timestamps: true,
		underscored: true,
		underscoredALL: true,
	},
};
