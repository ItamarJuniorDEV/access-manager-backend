import dotenv from 'dotenv';
import server from './server';

const PORT = 3333;

dotenv.config();

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Server rodando na porta ${PORT}`);
})