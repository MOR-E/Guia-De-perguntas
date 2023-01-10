//Sempre que criar um model, criar eele com a primeira letra maiuscula para diferenciar ele
const Sequelize = require("sequelize");
const conection = require("./database");

const Pergunta = conection.define("pergunta",{ //definicao do model e pergunta é o nome da tabela
    titulo: {
        type: Sequelize.STRING, //tipo da coluna como string
        allowNull: false //que o campo seja nulo

    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => { //não permite que seja criado outra tabela quando outro formulario é enviado

});

module.exports = Pergunta;