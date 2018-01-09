//Carrega o modulo que configura o Express
var app = require('./config/express')();

//Configuração de rota para /produtos
var rotasProdutos = require('./app/routes/produtos')(app);

//Fazer o servidor rodar, escutando a porta 3000
app.listen(3000, function () {
    console.log("servidor rodando");
});