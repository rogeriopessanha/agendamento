
var appointment = require("../models/Appointment")
var mongoose = require("mongoose")
var AppointmentFactory = require("../factories/AppointmentFactory")
var nodemailer = require("nodemailer")

const Appo = mongoose.model("Appointment", appointment)

class AppointmentService {

    async Create(name, email, cpf, description, date, time) {
        let newAppo = new Appo({
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false,
            notified: false
        })

        try {
            await newAppo.save()
            return true
        } catch (erro) {
            console.log(erro)
            return false
        }
    }

    async GetAll(showFinished) {
        if (showFinished) {
            return await Appo.find()
        } else {
            var appos = await Appo.find({ "finished": false })  
            var appointments = []
            
            appos.forEach(appointment => {

                if (appointment.date != undefined) {
                    appointments.push(AppointmentFactory.Build(appointment))
                }   
            })
            return appointments
        }
    }

    async GetById(id){
        try{
            var event = await Appo.findOne({'_id': id})
            return event
        }catch(erro){
            console.log(erro)
        }
    }

    async finish(id){
        try{
            await Appo.findByIdAndUpdate(id, {finished: true})
            return true
        }catch(erro){
            console.log(erro)
            return false
        }
    }

  
    async search(query){

        try{
            var appos = await Appo.find().or([{cpf: query}, {email: query}])
            return appos
        }catch(erro){
            console.log(erro)
            return[]
        }

    }

    async SendNotification(){

        var appos = await this.GetAll(false)

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 25,
            auth: {
                user: "71d1f872aeb1f0",
                pass: "0e21ed63dc481f"
            }
        })

        appos.forEach(async app => {
            var date = app.start.getTime()
            var hour = 1000 * 60 * 60 * 12
            var gap = date-Date.now()

            if (gap <= hour) {

                if (!app.notified) {

                    await Appo.findByIdAndUpdate(app.id, {notified: true})

                    transporter.sendMail({
                        from: "Confirmação do Agendamento <notificacao_agendamento@gmail.com>",
                        to: app.email,
                        subject: "Lembrete: Consulta agendada",
                        text: "Sua consulta está marcada para daqui a 12 horas, não se esqueça",
                    }).then(() => {

                    }).catch(erro => {
                        console.log(erro)
                    })
                }
            }
        })
    }
}

module.exports = new AppointmentService()

