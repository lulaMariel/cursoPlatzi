const express = require("express")
const cors = require("cors")

const app = express()

const jugadores = []

app.use(cors ())
app.use(express.json())

class Jugador {
    constructor(id) {
        this.id = id
    }

    asignarToypon(toypon){
        this.toypon = toypon
    }
}

class Toypon {
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")
    
    res.send(id)
})

app.post("/toypon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.toypon || ""
    const toypon = new Toypon(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId == jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarToypon(toypon)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.listen(8080, () => {
    console.log("Servidor funcionando")
})