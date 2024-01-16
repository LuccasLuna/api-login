import { resolve } from 'path';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { connection, pool } from '../config/database.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

pool.query('USE cadastro_login', (useDbErr) => {
  if (useDbErr) {
    console.log(useDbErr);
    return res.status(500).json('falha ao selecionar database.');
  }
});

class LoginController {
  index(req, res) {
    try {
      return res.sendFile(path.resolve(__dirname, '../public/login.html'));
    } catch (e) {
      console.log(e);
      return res.status(400).json('Deu ruim meu patrão.');
    }
  }

  async store(req, res) {

    const { email = '', senha = '' } = req.body;

    if(!email) {
      return res.status(400).json({
        error: ['insira email e senha.'],
      });
    }

    try {
      pool.query('SELECT email FROM usuarios WHERE email= ?', [email], (error, results) => {

        if(error) {
          return console.log(error);
        }
        
        // esta recebendo o primeiro resultado do array results( que no caso é um obj )
        const  { email: emailEnviado } = results[0]; // ta fazendo destructuring e setando o nome da variavel de emailEnviado

        if(!emailEnviado) {
         return console.log(emailEnviado, 'deu bigode');
        } else {
          return res.send(emailEnviado);
        }
  
      });
    } catch(e) {
      console.log(e)
      return res.status(500).json('deu merda federal aq primo');
    } 

  }

}

export default new LoginController();