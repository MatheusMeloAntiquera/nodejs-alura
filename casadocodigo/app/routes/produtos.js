
module.exports = function (app) {

    app.get('/produtos', function (req, res) {

        var connection = app.infra.connectionFactory();
        var produtosBanco = new app.infra.ProdutosBanco(connection);


        produtosBanco.lista(function (err, results) {
            res.render('produtos/lista', { lista: results });
        });

        connection.end();

    });

    app.get('/produtos/form', function (req, res) {
        res.render('produtos/form');
    });

    app.post('/produtos', function (req, res) {

        var produto = req.body;

        var connection = app.infra.connectionFactory();
        var produtosBanco = new app.infra.ProdutosBanco(connection);

        produtosBanco.salvar(produto, function (erros, resultados) {
            if (erros == null) {
                res.redirect('/produtos');
            } else {
                console.log("Erros:" + erros);
            }

        });
    });

}

