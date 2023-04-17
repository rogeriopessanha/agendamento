
var consulta = require("../models/Consulta")
var mongoose = require("mongoose")
var ConsultaFactory = require("../factories/ConsultaFactory")
var nodemailer = require("nodemailer")

const Consult = mongoose.model("Consulta", consulta)

class ConsultaService {

    async Create(nome, email, cpf, assunto, date, time) {
        let novaConsult = new Consult({
            nome,
            email,
            assunto,
            cpf,
            date,
            time,
            terminado: false,
            notificado: false
        })

        try {
            await novaConsult.save()
            return true
        } catch (erro) {
            console.log(erro)
            return false
        }
    }

    async GetAll(finalizado) {
        if (finalizado) {
            return await Consult.find()
        } else {
            var consults = await Consult.find({ "terminado": false })  
            var consultas = []
            
            consults.forEach(consulta => {

                if (consulta.data != undefined) {
                    consultas.push(ConsultaFactory.Build(consulta))
                }   
            })
            return consultas
        }
    }

    async GetById(id){
        try{
            var event = await Consult.findOne({'_id': id})
            return event
        }catch(erro){
            console.log(erro)
        }
    }

    async finish(id){
        try{
            await Consult.findByIdAndUpdate(id, {terminado: true})
            return true
        }catch(erro){
            console.log(erro)
            return false
        }
    }

    async search(pesquisa){

        try{
            var consults = await Consult.find().or([{cpf: pesquisa}, {email: pesquisa}])
            return consults
        }catch(erro){
            console.log(erro)
            return[]
        }

    }

    async SendNotification(){

        var consults = await this.GetAll(false)

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 25,
            auth: {
                user: "71d1f872aeb1f0",
                pass: "0e21ed63dc481f"
            }
        })

        consults.forEach(async app => {
            var date = app.start.getTime()
            var hour = 1000 * 60 * 60 * 12
            var gap = date-Date.now()

            if (gap <= hour) {

                if (!app.notificado) {

                    await Consult.findByIdAndUpdate(app.id, {notificado: true})

                    transporter.sendMail({
                        from: "Confirmação do Agendamento <notificacao_agendamento@gmail.com>",
                        to: app.email,
                        subject: "Lembrete: Consulta agendada",
                        text: "Sua consulta está marcada para daqui a 12 horas, não se esqueça.",
                    }).then(() => {

                    }).catch(erro => {
                        console.log(erro)
                    })
                }
            }
        })
    }
}

module.exports = new ConsultaService()

