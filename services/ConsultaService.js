
let consulta = require("../models/Consulta")
let mongoose = require("mongoose")

const Consult = mongoose.model("Consulta", consulta)

class ConsultaService {

    async Create(nome, email, cpf, assunto, data, hora){
        let newConsult = new Consult({
            nome, 
            email, 
            assunto, 
            cpf, 
            data, 
            hora,
            finalizada: false
        })

        try{
            await newConsult.save()
            return true
        }catch(erro){
            console.log(erro)
            return false
        }
    }

    async getAll(showFinalizada){
        if (showFinalizada) {
            return await Consult.find()
        }else{
            return await Consult.find({"finalizada": false})
        }
    }
}

module.exports = new ConsultaService()

