const conexao = require('../conexao');
const bcrypt = require('bcrypt');
const segredo = require('../secret');


const cadastrarUsuario = async (req, res) => {
    try {

        const { nome, nome_loja, email, senha } = req.body
        const queryEmail = 'SELECT * FROM usuarios WHERE email = $1'
        const { rowCount } = await conexao.query(queryEmail, [email]);

        if (rowCount > 0) {
            return res.status(400).json({ "mensagem": "Já existe usuário cadastrado com o e-mail informado." });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const query = 'INSERT INTO usuarios (nome, nome_loja, email, senha) VALUES ($1, $2, $3, $4)';
        const usuarioCadastrado = await conexao.query(query, [nome, nome_loja, email, senhaCriptografada]);

        if (usuarioCadastrado.rowCount === 0) {
            return res.status(400).json({ "mensagem": "Não foi possível cadastrar o usuário." });
        }
        return res.status(204).json();

    } catch (error) {
        return res.status({ "mensagem": error.message });
    }
}

const detalharUsuario = async (req, res) => {

    try {

        const usuario = req.usuario;

        return res.status(200).json(usuario);

    } catch (error) {
        return res.status(401).json({ "mensagem": error.message })
    }


}

const atualizarUsuario = async (req, res) => {

    try {

        const { nome, email, senha, nome_loja } = req.body;
        const { id } = req.usuario;

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const queryEmail = 'SELECT * from usuarios WHERE email = $1 and id != $2'
        const verificarEmail = await conexao.query(queryEmail, [email, id]);

        if (verificarEmail.rowCount > 0) {
            return res.status(400).json({ "Mensagem": "O e-mail informado já está sendo utilizado por outro usuário." })
        }

        const query = 'UPDATE usuarios  SET nome = $1, nome_loja = $2, email = $3, senha = $4 WHERE id = $5';
        const usuarioAtualizado = await conexao.query(query, [nome, nome_loja, email, senhaCriptografada, id]);

        if (usuarioAtualizado.rowCount == 0) {
            return res.status(400).json({ "mensagem": "Não foi possível atualizar o usuário." });
        }

        return res.status(200).json();

    } catch (error) {
        return res.status(401).json({ "Mensagem": error.message });
    }
}

module.exports = {

    cadastrarUsuario,
    detalharUsuario,
    atualizarUsuario
}