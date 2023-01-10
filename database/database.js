const Sequelize = require("sequelize"); // chamando o sequelize

const conection = new Sequelize("guiaperguntas","root","abc@123",{
    host: "localhost", //apontando para o meu computador de servidor
    dialect: "mysql" // indicando qual banco de dados usar, no caso o MYSQL  
}); // fazendo a conexão com o banco de dados

module.exports = conection; //exportando as conexões 