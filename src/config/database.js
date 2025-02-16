module.exports = {
  dialect: 'postgres', //Banco que vai ser utilizado
  host: 'localhost', // Server do banco
  port: 5432, //Porta, SQL usa por padrão a 3306
  username: 'postgres', // Usuário do Banco
  password: 'postgres', // Senha do banco
  database: 'manage_access', //Nome do banco
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}