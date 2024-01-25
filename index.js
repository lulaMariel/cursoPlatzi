const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080; // Usar el puerto proporcionado por Vercel o 8080 como fallback

app.use(express.static("publico")); // Servir archivos estáticos desde la carpeta "publico"
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json());

const jugadores = [];

class Jugador {
    constructor(id) {
        this.id = id;
    }

    asignarToypon(toypon) {
        this.toypon = toypon;
    }

    actualizarPosicion(x, y) {
        this.x = x;
        this.y = y;
    }

    asignarAtaques(ataques) {
        this.ataques = ataques;
    }
}

class Toypon {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`;

    const jugador = new Jugador(id);

    jugadores.push(jugador);

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.send(id);
});

app.post("/toypon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const nombre = req.body.toypon || "";
    const toypon = new Toypon(nombre);

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId == jugador.id);

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarToypon(toypon);
    }

    console.log(jugadores);
    console.log(jugadorId);
    res.end();
});

app.post("/toypon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const x = req.body.x || 0;
    const y = req.body.y || 0;

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId == jugador.id);

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y);
    }

    const enemigos = jugadores.filter((jugador) => jugadorId != jugador.id);

    res.send({
        enemigos
    });
});

app.post("/toypon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const ataques = req.body.ataques || [];

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId == jugador.id);

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques);
    }

    res.end();
});

app.get("/toypon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || "";
    const jugador = jugadores.find((jugador) => jugador.id == jugadorId);

    res.send({
        ataques: jugador.ataques || []
    });
});

app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});
