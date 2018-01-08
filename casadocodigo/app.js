var express = require("express");
var app = express();

app.get('/produtos', function (req, res) {
    res.send("<html><body><h1>Listando os Produtos</h1></body></html>");

});

app.listen(3000, function () {
    console.log("servidor rodando");
});