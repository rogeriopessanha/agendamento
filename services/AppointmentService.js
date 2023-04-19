
//variaveis de ambiente
require('dotenv').config();
const dotenv = require('dotenv')
dotenv.config()

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
            
 

            appos.forEach(appo => {
                appointments.push(AppointmentFactory.Build(appo))
            });
            return appointments
        }
    }

    

    async GetOne(id) {
        try {
            return await Appo.findOne({'_id': id});
        } catch (erro) {
            console.log(erro);
        }
    }

    async finish(id) {
        try {
            await Appo.findByIdAndUpdate(id, {finished:true});
            return true;
        } catch (erro) {
            console.log(erro);
            return false;
        }
    }

    async Search(query) {
        try {
            return await Appo.find().or([{email: query}, {cpf: query}]);
        } catch (erro) {
            console.log(erro);
            return [];
        }
    }

    async SendNotification(){

        var transporter = nodemailer.createTransport({
            host: process.env.DB_HOST,
            port: 25,
            auth: {
                user: process.env.DB_USER,
                pass: process.env.DB_PASS
            }
        })

        var appos = await this.GetAll(false);
        appos.forEach(async r => {
            var date = r.start.getTime();
            var hour = 1000 * 60 * 60 * 12
            var gap = date-Date.now()

            if (gap <= hour) {
                if (!r.notified) {

                    

                    transporter.sendMail({
                        from: "Confirmação Agendamento <notificacao_agendamento@gmail.com>",
                        to: r.email,
                        subject: "Lembrete: Consulta agendada",
                        text: `Sua consulta está marcada para daqui a 12 horas, não se esqueça ${r.title}`,
                    }).then(async () => {
                        await Appo.findByIdAndUpdate(r.id, {notified: true});
                    }).catch(erro => {
                        console.log(erro)
                    })
                }
            }
        })
    }
}

module.exports = new AppointmentService()

