
const mongoose = require("mongoose")

const consulta = new mongoose.Schema({
    nome: String,
    email: String,
    cpf: String,
    assunto: String,
    data: Date,
    hora: String,
    finalizada: Boolean
})

module.exports = consulta