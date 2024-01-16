import express from 'express';

import { resolve } from 'path';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import '../config/database.js';
import homeRouter from './routes/homeRoute.js';
import cadastroRouter from './routes/cadastroRoute.js';
import loginRouter from './routes/loginRoute.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static(resolve(__dirname, '../public')))

app.use('/', homeRouter);

/*
// caso o usuario ensira um caminho que não existe, ira redirecionar para essa pagina
app.use((req, res) => {
  res.status(404).send
  (`
  <div style="
  width:100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  ">

  <h1 style="color:blue; font-size:5rem;"> 
    ERRO 404: Ta fazendo merda ai mermão
  </h1>

  </div>
  
  `);
});
*/

app.use('/cadastro/', cadastroRouter);

app.use('/login/', loginRouter);
/*
app.get('/cadastro', (req, res) => {
  res.sendfile(path.resolve(__dirname, '../public/cadastro.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/login.html'));
});
*/

export default app;

