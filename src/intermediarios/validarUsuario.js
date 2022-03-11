function validarCampos(req, res, next) {
    const { nome, nome_loja, email, senha } = req.body

    if (!nome) {
        return res.status(404).json({ "mensagem": 'O campo nome é obrigatório!' });
    }
    if (!email) {
        return res.status(404).json({ "mensagem": 'O campo email é obrigatório!' });
    }
    if (!nome_loja) {
        return res.status(404).json({ "mensagem": 'O campo nome_loja é obrigatório!' });
    }
    if (!senha) {
        return res.status(404).json({ "mensagem": 'O campo senha é obrigatório!' });
    }
    next()
}




module.exports = {
    validarCampos
}