CREATE TABLE IF NOT EXISTS usuarios (
	id serial primary key,
	nome varchar not null,
	nome_loja varchar not null,
	email text not null unique,
	senha text not null
	);

CREATE TABLE IF NOT EXISTS produtos (
	id serial primary key,
	nome text not null,
	quantidade number not null,
	categoria text,
	preco numeric not null,
	descricao text not null,
	imagem text null,
	foreign key (usuario_id) references usuarios (id)
	);