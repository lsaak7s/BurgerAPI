//SEMPRE TENHA CERTEZA
const express = require('express');
const { resolve } = require('node:path');

const uploadsPath = resolve(__dirname, '..', '..', 'uploads');
const fileRouterConfig = express.static(uploadsPath);
/*const fs = require('node:fs');
console.log('[static uploadsPath]', uploadsPath);
console.log('[existe?]', fs.existsSync(uploadsPath));
try { console.log(fs.readdirSync(uploadsPath).slice(0,5)); } catch(e){ console.log(e.message) }*/
module.exports = fileRouterConfig;
