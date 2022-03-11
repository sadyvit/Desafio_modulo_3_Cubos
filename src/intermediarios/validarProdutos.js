function validarProdutos(req, res, next) {
    const { nome, quantidade, preco, descricao, imagem } = req.body;

    if (!nome) {
        return res.status(404).json({ "Mensagem": "O nome do produto deve ser informado." });
    }
    if (!quantidade) {
        return res.status(404).json({ "Mensagem": "A quantidade do produto deve ser informada." });
    }
    if (!preco) {
        return res.status(404).json({ "Mensagem": "O preco do produto deve ser informado." })
    }
    if (!descricao) {
        return res.status(404).json({ "Mensagem": "A descrição do produto deve ser informada." })
    }
    next()
}

module.exports = {
    validarProdutos

}