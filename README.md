<h2 align="center">App College</h2>

___




<h3 align="center">
  <a href="#information_source-sobre">Sobre</a>&nbsp;|&nbsp;
  <a href="#interrobang-motivo">Motivo</a>&nbsp;|&nbsp;
  <a href="#seedling-requisitos-mínimos">Requisitos</a>&nbsp;|&nbsp;
  <a href="#rocket-tecnologias-utilizadas">Tecnologias</a>&nbsp;|&nbsp;
</h3>

___


## :information_source: Sobre

O projeto é um gerenciador de professores e alunos, em que se pode relacionar qual o professor de cada aluno.

## :interrobang: Motivo

Esse projeto foi desenvolvido como um desafio proposto na fase 03 do bootcamp LaunchBase da Rocketseat, com base no aprendizado do curso.

## :seedling: Instalação
```
# Clone o repositório
$ git clone https://github.com/juliasilvao/App-College.git

# Acesse o diretório
$ cd foodfy

# Instale as dependências
$ npm install
```

## :ab: Criação do Banco de Dados
No PostgreSQL execute o arquivo my_teachers.sql em src/config/foodfy.sql para criar o banco de dados, tabelas e popular.

Acesse o arquivo db.js em src/config/db.js e configure o usuário e senha de conexão com o PostgreSQL.

```
module.exports = new Pool({
    // user: 'Usuário PostgreSQL',
    // password: 'Senha PostgreSQL',    
    host: 'localhost',
    port: 5432,
    database: 'my_teachers'
});
```

## :heavy_check_mark: Executando o sistema

```
# Inicie o servidor
$ npm start
```

## :rocket: Tecnologias Utilizadas 

O projeto foi desenvolvido utilizando as seguintes tecnologias

- Node.js
- HTML
- CSS
- JavaScript
- PostgresSQL
