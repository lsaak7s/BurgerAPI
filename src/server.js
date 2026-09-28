import app from './app.js';
import './database/index.js'
//Em qual porta o nosso servidor vai rodar
app.listen(3000, () => console.log('Burger API b running ad port 3000'));
