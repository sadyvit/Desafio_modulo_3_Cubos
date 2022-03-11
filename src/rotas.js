const express = require('express');

const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const produtos = require('./controladores/produtos');

const { verificarLogin } = require('./intermediarios/verificarLogin');
const { validarCampos } = require('./intermediarios/validarUsuario');
const { validarProdutos } = require('./intermediarios/validarProdutos');
const { validarIdParams } = require('./intermediarios/validarIdParams');

const rotas = express();


rotas.post("/usuario", validarCampos, usuarios.cadastrarUsuario);

rotas.post("/login", login.login);

rotas.use(verificarLogin)

rotas.get("/usuario", usuarios.detalharUsuario);

rotas.put("/usuario", validarCampos, usuarios.atualizarUsuario);

rotas.get("/produtos", produtos.listarProdutos);

rotas.get("/produtos/:id", validarIdParams, produtos.detalharProduto);

rotas.post("/produtos", validarProdutos, produtos.cadastrarProduto);

rotas.put("/produtos/:id", validarProdutos, validarIdParams, produtos.atualizarProduto);

rotas.delete("/produtos/:id", validarIdParams, produtos.excluirProduto);

module.exports = rotas;