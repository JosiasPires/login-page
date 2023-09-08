# Login Page: Template for auth projects

[![CI](https://github.com/JosiasPires/login-page/actions/workflows/ci.yml/badge.svg)](https://github.com/JosiasPires/login-page/actions/workflows/ci.yml)

[![CD](https://github.com/JosiasPires/login-page/actions/workflows/cd.yml/badge.svg?branch=develop)](https://github.com/JosiasPires/login-page/actions/workflows/cd.yml)

## Functions:
- Template Auth Page

## Como usar:

- Altere as variáveis dentro do index.html localizado no diretório `public`:
  - TARGET_URL: Alterar para a página que o usuário será enviado caso o login seja bem sucedido
  - API_URL: Alterar para o link da api que será enviado o formulário de login com usuário e senha (É aconselhado que seja feito um proxy para o mesmo endereço de origem como "/api" encaminhando para o serviço de backend correspondente a api)
  - API_TOKEN: Alterar para o Bearer token de acesso da api

##[LICENSE](https://github.com/JosiasPires/login-page/LICENSE)