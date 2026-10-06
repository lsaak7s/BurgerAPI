const express = require('express');
const { resolve } = require('node:dns');

const uploadsPath = express.static(resolve(__dirname, '..', '..', 'uploads'));

