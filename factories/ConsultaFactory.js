
class ConsultaFactory{
    
    Build(consultaSimples){

        var day = consultaSimples.date.getDate()+1
        var month = consultaSimples.date.getMonth()
        var year = consultaSimples.date.getFullYear()
        var hour = Number.parseInt(consultaSimples.time.split(":")[0])
        var minutes = Number.parseInt(consultaSimples.time.split(":")[1])

        var startDate = new Date(year, month, day, hour, minutes, 0, 0)
        // startDate.setHours(startDate.getHours() - 3)

        var consult = {
            id: consultaSimples._id,
            title: consultaSimples.nome + " - " + consultaSimples.assunto,
            start: startDate,
            end: startDate,
            notificado: consultaSimples.notificado,
            email: consultaSimples.email
        }

        return consult
    }
}

module.exports = new ConsultaFactory()