# Sistema de Agendamento
## 📝 Proposta:
### Este é um projeto de um sistema de agendamento, que permite agendar consultas em um calendário interativo.
### Além disso, também foi implementado uma função para o paciente receber um lembrete por e-mail quando estiver faltando 12 horas para sua consulta.
### Depois da consulta encerrada presencialmente, é feito uma finalização no sistem, apagando a consulta no calendário.


## 💻 Tecnologias e ferramentas utilizadas:
- Node.js: plataforma de desenvolvimento em JavaScript para construir aplicações web do lado do servidor.
- Express: framework web para Node.js que fornece recursos para desenvolvimento de aplicações web e APIs.
- MongoDB: banco de dados NoSQL que utiliza documentos JSON para armazenar dados.
- Mongoose: ODM (Object-Document Mapper) para MongoDB, utilizado para definir e trabalhar com modelos de dados.
- EJS: template engine para Node.js que permite a criação de páginas HTML com conteúdo dinâmico.
- FullCalendar: biblioteca JavaScript para criar calendários interativos.
- Bootstrap: framework front-end que facilita o desenvolvimento de interfaces web responsivas.
- Dotenv: módulo Node.js que carrega variáveis de ambiente a partir de um arquivo .env.
- jQuery Mask Plugin CPF: É uma extensão que permite criar uma máscara de entrada de dados para campos de CPF em formulários
- Mailtrap: serviço de teste de e-mail para desenvolvedores.

## 🎯 Clonando o repositório:
### Clone o repositório para a sua máquina local usando o comando:

```
git clone https://github.com/rogeriopessanha/agendamento.git
```
## 📌 Dependências:
<h1 align="left">
  <img width="250px" height="200px" src="https://github.com/rogeriopessanha/agendamento/blob/main/public/assets/readme/img/dependencias.png" />
</h1>

## 🔧 Instalando as dependências:
### Instale as dependências do projeto utilizando o gerenciador de pacotes npm ou yarn, executando o comando:

```
npm install ou yarn add
```

## 🚀 Executando a aplicação:
#### Para iniciar a aplicação, execute o comando:

```
npm start ou node index
```
A aplicação será executada na porta 3000.

## ⚙️ Funcionamento:

### Versão mobile
<h1 align="center">
  <img  height="550px" src="https://github.com/rogeriopessanha/agendamento/blob/main/public/assets/readme/video/agendamento-mobile.gif" />
</h1>

### Versão desktop
<h1 align="center">
  <img width="650px" height="650px" src="https://github.com/rogeriopessanha/agendamento/blob/main/public/assets/readme/video/agendamento_desktop.gif" />
</h1>

###  Demonstração de como é possível fazer uma busca pelo paciente, consultando pelo CPF ou e-mail e finalizando a consulta e apagando do calendario
<h1 align="center">
  <img width="650px" height="650px" src="https://github.com/rogeriopessanha/agendamento/blob/main/public/assets/readme/video/finalizando_agendamento.gif" />
</h1>

## 🔎 E-mail de lembrete para a consulta, sempre que faltar 12 horas para a consulta, o paciente vai ser notificado por e-mail, assim não correndo o risco de esquecer:
### Informações importantes:
- From: E-mail da clinica/hospital
- To: E-mail do paciente 
- subject: "Lembrete: Consulta agendada"
- Mensagem: "Sua consulta está marcada para daqui a 12 horas, não se esqueça, "nome do paciente" e "o tipo de procedimento"
<h1 align="left">
  <img width="1000px" height="400px" src="https://github.com/rogeriopessanha/agendamento/blob/main/public/assets/readme/img/email1.png" />
</h1>

## Conclusão: 
### O projeto de sistema de agendamento desenvolvido com Node.js, Express, Nodemailer, EJS, MongoDB, Mongoose, FullCalendar, Bootstrap, Dotenv, Mailtrap e jQuery Mask Plugin CPF é uma solução eficiente e completa para gerenciamento de agendamento online.

### Com o uso dessas tecnologias, foi possível criar uma plataforma web moderna e responsiva, capaz de armazenar informações de agendamentos em um banco de dados MongoDB, enviar notificações por e-mail para os usuários envolvidos e exibir uma agenda dinâmica com a biblioteca FullCalendar.

### Além disso, a utilização do Bootstrap permitiu criar uma interface visualmente agradável e amigável, enquanto o dotenv e Mailtrap garantiram a segurança e confiabilidade na manipulação de informações sensíveis.

### O projeto pode ser facilmente personalizado e adaptado para atender às necessidades de diferentes tipos de negócios que precisam gerenciar agendas e compromissos de seus clientes.

## ✒️ Autor
### Rogerio Pessanha

