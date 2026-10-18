/* 
=============================================================================
CONFIGURAÇÃO DE ROTA DE ARQUIVOS ESTÁTICOS (fileRouterConfig.cjs)
=============================================================================
Padrão da arquitetura / Configurações:
- Configura o middleware de arquivos estáticos do Express.
- Mapeia o caminho até a pasta 'uploads' para permitir o acesso público
  e download de imagens de produtos pela API.
=============================================================================
*/

const express = require('express');
const { resolve } = require('node:path');

const uploadsPath = resolve(__dirname, '..', '..', 'uploads');
const fileRouterConfig = express.static(uploadsPath);

module.exports = fileRouterConfig;