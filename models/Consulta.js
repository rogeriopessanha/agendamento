
const mongoose = require("mongoose")

const consulta = new mongoose.Schema({
    nome: String,
    email: String,
    cpf: String,
    assunto: String,
    date: Date,
    time: String,
    terminado: Boolean,
    notificado: Boolean
})

module.exports = consulta