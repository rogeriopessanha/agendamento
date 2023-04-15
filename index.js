
const express = require("express")
const app = express()
const mongoose = require("mongoose")

const consultaService = require("./services/ConsultaService")
const ConsultaService = require("./services/ConsultaService")

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

    let status = await consultaService.Create(
        req.body.nome,
        req.body.email,
        req.body.cpf,
        req.body.assunto,
        req.body.data,
        req.body.hora
        )

    if (status) {
        res.redirect("/")
    }else{
        res.send("Ocorreu uma falha!")
    }

})

app.get("/calendario", async (req, res) => {
    let consultas = await ConsultaService.getAll(false)
    res.json(consultas)
})


app.listen(3000, () => {})