/* 
=============================================================================
CONFIGURAÇÃO DO MULTER / UPLOAD DE ARQUIVOS (multer.cjs)
=============================================================================
Padrão da arquitetura / Configurações:
- Configura o armazenamento de arquivos em disco (diskStorage) via biblioteca Multer.
- destination: Aponta para a pasta 'uploads' na raiz da aplicação.
- filename: Gera um identificador único via UUID v4 e concatena com o nome original
  do arquivo para evitar substituição acidental de arquivos com o mesmo nome.
=============================================================================
*/

const multer = require('multer');
const { resolve } = require('node:path');
const { v4 } = require('uuid');

module.exports = {
	storage: multer.diskStorage({
		destination: resolve(__dirname, '..', '..', 'uploads'),
		filename: (_req, file, callback) => {
			const mergeName = v4().concat(`-${file.originalname}`);
			return callback(null, mergeName);
		},
	}),
};