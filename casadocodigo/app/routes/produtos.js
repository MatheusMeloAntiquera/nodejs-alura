
module.exports = function (app) {

    app.get('/produtos', function (req, res) {

        var connection = app.infra.connectionFactory();
        var produtosBanco = new app.infra.ProdutosBanco(connection);


        produtosBanco.lista(function (err, results) {
            console.log(err);
            res.format({
                html: function () {
                    res.render('produtos/lista', { lista: results });
                },
                json: function () {
                    res.json(results);
                }
            });


        });

        connection.end();

    });

    app.get('/produtos/form', function (req, res) {
        res.render('produtos/form', { errosValidacao: {}, produto: {} });
    });

    app.post('/produtos', function (req, res) {

        var produto = req.body;

        req.assert('titulo', 'Titulo é obrigátorio').notEmpty();
        req.assert('preco','Formato inválido').isFloat();

        var erros = req.validationErrors();

        if (erros) {

            
            res.format({
                html: function () {
                    res.status(400).render('produtos/form', { errosValidacao: erros, produto: produto });
                },
                json: function () {
                    res.status(400).json(erros);
                }
            });
        
            return;
        }

        var connection = app.infra.connectionFactory();
        var produtosBanco = new app.infra.ProdutosBanco(connection);

        produtosBanco.salvar(produto, function (erros, resultados) {
            if (erros == null) {
                res.redirect('/produtos');
            } else {
                console.log("Erros:" + erros);
            }

        });


        connection.end();
    });

}

