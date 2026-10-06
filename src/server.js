//Em qual porta o nosso servidor vai rodar
//SEMPRE TENHA CERTEZA
import app from './app.js';
import './database/index.js';

app.listen(3000, () => console.log('Burger API b running ad port 3000'));
