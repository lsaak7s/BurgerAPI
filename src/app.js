/* 
=============================================================================
CONFIGURAÇÃO DO APP EXPRESS (src/app.js)
=============================================================================
Padrão da arquitetura / Core da Aplicação:
- Inicializa a instância principal do servidor Express.
- Configura middlewares globais para permitir leitura de dados em JSON e URL-encoded.
- Registra a rota "/product-file" para servir arquivos estáticos (imagens da pasta uploads).
- Conecta todas as rotas da aplicação definidas no arquivo routes.js.
- Exporta o app pronto para ser inicializado pelo server.js.
=============================================================================
*/

import express from 'express';
import fileRouterConfig from './config/fileRouterConfig.cjs';
import router from './routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/product-file', fileRouterConfig);
app.use('/category-file', fileRouterConfig);
app.use(router);

export default app;