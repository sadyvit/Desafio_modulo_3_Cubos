const conexao = require('../conexao');


const listarProdutos = async (req, res) => {

    const { usuario } = req;

    try {
        const queryProdutos = 'SELECT * FROM produtos WHERE usuario_id = $1';
        const { rows } = await conexao.query(queryProdutos, [usuario.id]);


        return res.status(200).json(rows);
    } catch (error) {
        return res.status(401).json({ "Mensagem": error.message });
    }
};

const detalharProduto = async (req, res) => {

    const { usuario } = req;
    const { id } = req.params;

    try {
        const produto = await conexao.query('SELECT * from produtos where usuario_id = $1 AND id = $2', [usuario.id, id]);
        console.log(produto.rows);
        return res.status(200).json(produto.rows);

    } catch (error) {
        return res.status(401).json({ "Mensagem": error.message });
    }
};

const cadastrarProduto = async (req, res) => {

    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;
    const { usuario } = req;

    if (quantidade <= 0) {
        return res.status(404).json({ "mensagem": 'O campo quantidade deve ser maior que zero.' })
    }

    try {
        const queryProduto = 'INSERT INTO produtos (usuario_id, nome, quantidade, categoria, preco, descricao, imagem) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        const cadastro = await conexao.query(queryProduto, [usuario.id, nome, quantidade, categoria, preco, descricao, imagem]);

        if (cadastro.rowCount == 0) {
            return res.status(401).json({ "Mensagem": "Não foi possível cadastrar o produto." });
        }

        return res.status(204).json();

    } catch (error) {
        return res.status.status(401).json({ "mensagem": error.message });

    }
};

const atualizarProduto = async (req, res) => {
    const { id } = req.params;
    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;
    const usuario = req.usuario;


    if (id == undefined) {
        return res.status(404).json({ "Mensagem": "O id do produto deve ser informado no parametro" });
    }

    try {

        const queryIdProduto = 'SELECT * from produtos WHERE id = $1 AND usuario_id = $2';
        const verificarId = await conexao.query(queryIdProduto, [id, usuario.id]);

        if (verificarId.rowCount == 0) {
            return res.status(404).json({ "mensagem": "Usuário não encontrado." })
        }

        const queryAtualizacao = 'UPDATE produtos SET nome = $1, quantidade = $2, categoria = $3, preco = $4, descricao = $5, imagem = $6 WHERE id = $7 AND usuario_id = $8';
        const atualizarProduto = await conexao.query(queryAtualizacao, [nome, quantidade, categoria, preco, descricao, imagem, id, usuario.id]);

        if (atualizarProduto.rowCount == 0) {
            return res.status(403).json({ "mensagem": "Não foi possível atualizar o produto." });
        }
        return res.status(200).json();

    } catch (error) {
        return res.status(401).json({ "Mensagem": error.message });
    }

};

const excluirProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const queryProduto = 'SELECT * from produtos WHERE id = $1 AND usuario_id = $2';
        const verificarId = await conexao.query(queryProduto, [id, usuario.id]);

        if (verificarId.rowCount == 0) {
            return res.status(404).json({ "mensagem": "Usuário não encontrado." })
        }

        const queryExclusao = 'DELETE FROM produtos WHERE id = $1';
        const { rowCount } = await conexao.query(queryExclusao, [id]);

        if (rowCount == 0) {
            return res.status(403).json({ "Mensagem": "Não foi possível excluir o produto. " })
        }
        return res.status(200).json();

    } catch (error) {
        return res.status(401).json({ "Mensagem": error.message });
    }

};

module.exports = {
    cadastrarProduto,
    excluirProduto,
    atualizarProduto,
    listarProdutos,
    detalharProduto
}