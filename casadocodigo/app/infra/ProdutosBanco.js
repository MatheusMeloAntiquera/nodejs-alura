function ProdutosBanco(connection) {
    this._connection = connection;
}

ProdutosBanco.prototype.lista = function (callback) {
    this._connection.query('select * from produtos', callback);
}

ProdutosBanco.prototype.salvar = function (produto, callback) {
    this._connection.query('insert into produtos set ?', produto, callback);
}


module.exports = function () {

    return ProdutosBanco;
}