const conexao = require('../conexao');

const validarIdParams = async (req, res, next) => {
    const { usuario } = req;
    const { id } = req.params;

    if (!id) {
        return res.status(404).json({ "Mensagem": 'O campo id é obrigatório' });
    }

    try {
        const queryProduto = 'SELECT * FROM produtos WHERE id = $1 AND usuario_id = $2';
        const verificarProduto = await conexao.query(queryProduto, [id, usuario.id]);

        if (verificarProduto.rowCount == 0) {
            return res.status(200).json({ "Mensagem": `Não existe produto cadastrado com o ID ${id}.` });
        }
    } catch (error) {
        return res.status(401).json({ "mensagem": error.message });
    }
    next()
}
module.exports = {
    validarIdParams
}