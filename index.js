const express = require("express"); //importando o express dentro da const express
const app = express(); //criando uma instancia do express para ser chamada pela variavel app
const bodyParser = require("body-parser"); //responsavel por traduzri os dados enviados pelo formualario em uma estrutra JS back end
const conection = require("./database/database");      
const Pergunta = require("./database/Pergunta");    //Chamando o Model Pergunta
const Resposta = require("./database/Resposta");    // Chamando o Model Resposta
const { render } = require("ejs");


//DATABASES
conection
    .authenticate()
    .then(() => {
        console.log("conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
})

//Estou dizendo para o EXPRESS utilizar arquivos EJS como visualizador de HTML  
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//ROTAS
app.get("/",(req, res)  => { //criada a rota para a pagina principal index.ejs  
    Pergunta.findAll({raw: true, order: [
        ["id","DESC"] //ASC é igual a crescente no SQL  e DESC é descrescente
    ]}).then(perguntas => { //raw: true esta buscando apenas os dados crús, apenas as informações passadas para o banco
        res.render("index", {//o metodo render automaticamente aponta para a pasta views sem precisar apontar 
            perguntas: perguntas// criando um JSON para buscar os dados do banco de dados e armazenando num array 
        });
    }); //equivale ao SELECT * FROM Perguntas do SQL
});

app.get("/perguntar",(req, res)  => { 
    res.render("perguntar");
});


app.get("/pergunta/:id", (req,res) => {
    var id = req.params.id;
    Pergunta.findOne({where: {
            id: id
        }
    }).then(pergunta => {
        if(pergunta != undefined){//Se for diferente de undefined quer dizer que a pergunta foi achada. true no caso

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [["id",  "DESC"]] 
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            })
        }else {
            res.redirect("/")
        }
    })
})

app.post("/salvarpergunta", (req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    }); 
});

app.post("/responder", (req,res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() =>{
        res.redirect("/pergunta/"+ perguntaId)
    })
});

//Comando para iniciar a aplicação na porta 8080 e retornando uma mensagem como iniciado
app.listen(8080, () => { //definido a porta de saida de rede e a mensagem quando rodada a aplicação.
    console.log("Aplicação rodando!");
});