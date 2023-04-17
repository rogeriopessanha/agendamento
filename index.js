
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const appointmentService = require("./services/AppointmentService")
const AppointmentService = require("./services/AppointmentService")


app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.set("view engine", "ejs")

mongoose.connect("mongodb://127.0.0.1:27017/agendamento")


app.get("/", (req, res) => {
    res.render("index")
})

app.get("/cadastro", (req, res) => {
    res.render("create")
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
    }else{
        res.send("Ocorreu uma falha!")
    }

})

app.get("/calendario", async (req, res) => {
    var appointments = await appointmentService.GetAll(false)
    res.json(appointments)
})

app.get("/event/:id", async(req, res) => {
    var appointment = await appointmentService.GetById(req.params.id)
    console.log(appointment)
    res.render("event", {appo: appointment})
})

app.post("/finish", async(req, res) => {
    var id = req.body.id
    var result = await appointmentService.finish(id)
    res.redirect("/")
})

app.get("/list", async(req, res) => {

    var appos = await appointmentService.GetAll(true)
    res.render("list", {appos})
})

app.get("/searchresult", async (req, res)=>{
    var appos = await appointmentService.search(req.query.search) 
    if (appos != " ") {
        res.render("list",{appos});
   } else {
     res.redirect("/list");  
   }
});

// a cada 5 minutos vai verificar se tem alguma
//notificação para ser enviada pro email
var pollTime = 1000 * 60 * 5

setInterval(async () => {
    await appointmentService.SendNotification()

    
},pollTime)


app.listen(3000, () => {})