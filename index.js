
//variaveis de ambiente
require('dotenv').config();
const dotenv = require('dotenv')
dotenv.config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const appointmentService = require("./services/AppointmentService")



app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")

mongoose.connect("mongodb://127.0.0.1:27017/agendamento")


app.get("/", (req, res) => {
    res.render('index', { title: 'Início', link: 'inicio' })
})

app.get("/cadastro", (req, res) => {
    res.render('create', { title: 'Cadastro', link: 'cadastro' })
})

app.post("/create", async (req, res) => {

    var status = await appointmentService.Create(
        req.body.name,
        req.body.email,
        req.body.cpf,
        req.body.description,
        req.body.date,
        req.body.time
    )

    if (status) {
        res.redirect("/")
    } else {
        res.send("Ocorreu uma falha!")
    }

})

app.get("/calendario", async (req, res) => {
    var appointments = await appointmentService.GetAll(false)
    res.json(appointments)
})

app.get("/event/:id", async (req, res) => {

    let result = await appointmentService.GetOne(req.params.id)
    res.render('event', { result: result, title: 'Visualizar', link: 'visualizar' })
})

app.post("/finish", async (req, res) => {
    var id = req.body.id
    var result = await appointmentService.finish(id)
    if (result) {
        res.redirect('/');
    } else {
        console.log(result);
    }
    // res.redirect("/")
})

app.get("/list", async (req, res) => {

    var appos = await appointmentService.GetAll(true)
    res.render('list', { appos: appos, title: 'Lista', link: 'lista' })
})

app.get("/search", async (req, res) => {

    var query = req.query.search;
    var appos = await appointmentService.Search(query);
    res.render('list', { appos: appos, title: 'Lista', link: 'lista' })
});

// a cada 5 minutos vai verificar se tem alguma
//notificação para ser enviada pro email
var pollTime = 1000 * 60 * 5

setInterval(async () => {
    await appointmentService.SendNotification()


}, pollTime)


app.listen(process.env.PORT, () => {
    console.log(`App rodando ${process.env.PORT}`)
})