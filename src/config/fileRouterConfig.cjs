//SEMPRE TENHA CERTEZA
// Importa o Express, que é o framework usado para criar as rotas da API
const express = require('express');

// Importa a ferramenta 'resolve' do Node.js para montar caminhos de arquivos de forma segura
const { resolve } = require('node:path');

// Calcula o caminho real para a pasta "uploads"
// __dirname é a pasta atual onde este arquivo está
// '..', '..' sobe duas pastas para cima
// 'uploads' é o nome da pasta onde as imagens ficam salvas
// Exemplo final: C:\projeto\uploads ou /var/www/projeto/uploads
const uploadsPath = resolve(__dirname, '..', '..', 'uploads');

// Cria o middleware estático do Express
// Isso permite que o servidor "entregue" os arquivos dessa pasta para o cliente
// Se o cliente chamar /product-file/foto.jpg, o Express procura na pasta uploads e devolve o arquivo
const fileRouterConfig = express.static(uploadsPath);

/*
  // ===== CÓDIGO DESCOMENTADO PARA DEBUG =====
  // Este bloco abaixo estava comentado (desligado), mas serve para verificar se a pasta existe.
  
  const fs = require('node:fs'); // Biblioteca para lidar com arquivos e pastas no disco
  console.log('[static uploadsPath]', uploadsPath); // Mostra no terminal o caminho calculado
  console.log('[existe?]', fs.existsSync(uploadsPath)); // Verifica se a pasta realmente existe no computador
  // Tenta listar os primeiros 5 arquivos da pasta para depuração
  try { 
    console.log(fs.readdirSync(uploadsPath).slice(0,5)); 
  } catch(e){ 
    console.log(e.message) // Se der erro (ex: pasta não existe), mostra a mensagem de erro
  }
*/

// Exporta a configuração criada acima para ser usada nas rotas do servidor
module.exports = fileRouterConfig;
