const seccionSelecionarAtaque = document.getElementById("seleccionar-ataque")
const seccionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")

const seccionSelecionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")
let imagenJugador = document.getElementById("imagen-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
let imagenEnemigo = document.getElementById("imagen-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const seccionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")

const seccionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let toypones = []
let toyponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeToypones
let inputWoody
let inputBuzz
let inputRex
let mascotaJugador
let objetoMascotaJugador
let ataquesToypon
let ataquesToyponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "fotos/toymap.png"
let altura
let anchoMapa = window.innerWidth - 20
const anchoMaxMapa = 350

if(anchoMapa > anchoMaxMapa) {
    anchoMapa = anchoMaxMapa - 20
}

altura = anchoMapa * 600 / 800

mapa.width = anchoMapa + 200
mapa.height = altura + 100

class Toypones {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 60
        this.alto = 60
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarToypon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let woody = new Toypones("Woody", "fotos/woody.png", 5, "fotos/carawoody.png")

let buzz = new Toypones("Buzz", "fotos/buzz.png", 5, "fotos/carabuzz.png")

let rex = new Toypones("Rex", "fotos/rex.png", 5, "fotos/cararex.png")

const woodyAtaques = [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🌱", id: "boton-tierra"},
]

woody.ataques.push(...woodyAtaques)

const buzzAtaques = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "💧", id: "boton-agua"},
]

buzz.ataques.push(...buzzAtaques)

const rexAtaques = [
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "💧", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego" },
]

rex.ataques.push(...rexAtaques)

toypones.push(woody,buzz,rex)

function iniciarJuego() {
    seccionSelecionarAtaque.style.display = "none"

    seccionVerMapa.style.display = "none"

    seccionReiniciar.style.display = "none"

    toypones.forEach((toypon) => {
        opcionDeToypones = `
        <input type="radio" name="mascota" id=${toypon.nombre} />
        <label class="tarjeta-de-toypon" for=${toypon.nombre}>
            <p>${toypon.nombre}</p>
            <img src=${toypon.foto} alt=${toypon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeToypones

        inputWoody = document.getElementById("Woody")
        inputBuzz = document.getElementById("Buzz")
        inputRex = document.getElementById("Rex")

    })
    
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    botonReiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if(res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {
    seccionSelecionarMascota.style.display = "none"

    if(inputWoody.checked) {
        spanMascotaJugador.innerHTML = inputWoody.id
        mascotaJugador = inputWoody.id
        imagenJugador.src = "fotos/woody.png"
    } else if(inputBuzz.checked) {
        spanMascotaJugador.innerHTML = inputBuzz.id
        mascotaJugador = inputBuzz.id
        imagenJugador.src = "fotos/buzz.png"
    } else if(inputRex.checked) {
        spanMascotaJugador.innerHTML = inputRex.id
        mascotaJugador = inputRex.id
        imagenJugador.src = "fotos/rex.png"
    } else {
        alert("Selecciona una mascota")
        reiniciarJuego()
    }
    
    seleccionarToypon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    seccionVerMapa.style.display = "flex"
    iniciarMapa()
}

function seleccionarToypon(mascotaJugador) {
    fetch(`http://localhost:8080/toypon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            toypon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < toypones.length; i++) {
        if (mascotaJugador == toypones[i].nombre) {
            ataques = toypones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesToypon = `
        <button id=${ataque.id} class="boton-ataque BAtaques">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesToypon
    })

    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaques")
}

function secuenciaAtaques() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent == "🔥") {
                ataqueJugador.push("🔥")
                boton.style.background = "#3C0753"
                boton.disabled = true
            } else if(e.target.textContent == "💧") {
                ataqueJugador.push("💧")
                boton.style.background = "#3C0753"
                boton.disabled = true
            } else {
                ataqueJugador.push("🌱")
                boton.style.background = "#3C0753"
                boton.disabled = true
            }
            if (ataqueJugador.length == 5) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://localhost:8080/toypon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
}

function seleccionarMascotaEnemigo(enemigo) {
    let mascotaAleatoria = aleatorio(0, toypones.length - 1)

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    document.getElementById("imagen-enemigo").src = enemigo.foto
    ataquesToyponEnemigo = enemigo.ataques

    secuenciaAtaques()
}

function ataqueAleatorioEnemigo() {
    console.log(ataquesToyponEnemigo)
    let ataqueAleatorio = aleatorio(0, ataquesToyponEnemigo.length - 1)

    if(ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push("🔥")
    } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("💧")
    } else {
        ataqueEnemigo.push("🌱")
    }
    console.log(ataqueEnemigo)
    iniciarCombate()
}

function iniciarCombate() {
    if (ataqueJugador.length == 5) {
        combate()
    }
}

function indexAmbosJugadores(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] == ataqueEnemigo[index]) {
            indexAmbosJugadores(index, index)
            crearMensaje("Empate🤝")
        } else if((ataqueJugador[index] == "🔥" && ataqueEnemigo[index] == "🌱") || (ataqueJugador[index] == "💧" && ataqueEnemigo[index] == "🔥") || (ataqueJugador[index] == "🌱" && ataqueEnemigo[index] == "💧")) {
            indexAmbosJugadores(index, index)
            crearMensaje("Ganaste🥇")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosJugadores(index, index)
            crearMensaje("Perdiste👎")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
    }
}
    revisarVictorias()
}

function revisarVictorias() {
    if(victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal("Empate! Jugá la revancha")
    } else if(victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("Lo lograste! Felicidades🥇")
    } else {
        crearMensajeFinal("Lo siento, perdiste😥. Pero aún podes jugar la revancha!")
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    seccionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    seccionMensajes.innerHTML = resultadoFinal
    
    seccionReiniciar.style.display = "block"
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    objetoMascotaJugador.x = objetoMascotaJugador.x + objetoMascotaJugador.velocidadX
    objetoMascotaJugador.y = objetoMascotaJugador.y + objetoMascotaJugador.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    objetoMascotaJugador.pintarToypon()

    enviarPosicion(objetoMascotaJugador.x, objetoMascotaJugador.y)

    toyponesEnemigos.forEach(function (toypon) {
        toypon.pintarToypon()
        revisarColision(toypon)
    })
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/toypon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then (function (res) {
        if (res.ok) {
            res.json()
                .then (function ({ enemigos }) {
                    console.log(enemigos)
                    toyponesEnemigos = enemigos.map(function (enemigo) {
                        let toyponEnemigo = null
                        const toyponNombre = enemigo.toypon.nombre || ""
                        if (toyponNombre == "Woody") {
                            toyponEnemigo = new Toypones("Woody", "fotos/woody.png", 5, "fotos/carawoody.png", enemigo.id)
                        } else if (toyponNombre == "Buzz") {
                            toyponEnemigo = new Toypones("Buzz", "fotos/buzz.png", 5, "fotos/carabuzz.png", enemigo.id)
                        } else if (toyponNombre == "Rex") {
                            toyponEnemigo = new Toypones("Rex", "fotos/rex.png", 5, "fotos/cararex.png", enemigo.id)
                        }
                        toyponEnemigo.x = enemigo.x
                        toyponEnemigo.y = enemigo.y

                        return toyponEnemigo
                    })
                })
        }
    })
}

function moverDerecha() {
    objetoMascotaJugador.velocidadX = 5
}

function moverIzquierda() {
    objetoMascotaJugador.velocidadX = -5
}

function moverArriba() {
    objetoMascotaJugador.velocidadY = -5
}

function moverAbajo() {
    objetoMascotaJugador.velocidadY = 5
}

function detenerMovimiento() {
    objetoMascotaJugador.velocidadX = 0
    objetoMascotaJugador.velocidadY = 0
}

function teclas(evento) {
    switch (evento.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "w":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "s":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "a":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        case "d":
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {
    objetoMascotaJugador = objetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", teclas)

    window.addEventListener("keyup", detenerMovimiento)

    const botonArriba = document.getElementById("mover-arriba");
    const botonIzquierda = document.getElementById("mover-izquierda");
    const botonAbajo = document.getElementById("mover-abajo");
    const botonDerecha = document.getElementById("mover-derecha");
    
    if (botonArriba) {
        botonArriba.addEventListener("touchstart", () => moverArriba(), false);
        botonArriba.addEventListener("touchend", detenerMovimiento, false);
    }
    
    if (botonIzquierda) {
        botonIzquierda.addEventListener("touchstart", () => moverIzquierda(), false);
        botonIzquierda.addEventListener("touchend", detenerMovimiento, false);
    }
    
    if (botonAbajo) {
        botonAbajo.addEventListener("touchstart", () => moverAbajo(), false);
        botonAbajo.addEventListener("touchend", detenerMovimiento, false);
    }
    
    if (botonDerecha) {
        botonDerecha.addEventListener("touchstart", () => moverDerecha(), false);
        botonDerecha.addEventListener("touchend", detenerMovimiento, false);
    }  
}

function objetoMascota() {
    for (let i = 0; i < toypones.length; i++) {
        if (mascotaJugador == toypones[i].nombre) {
            return toypones[i]
        }
    }
        
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = objetoMascotaJugador.y
    const abajoMascota = objetoMascotaJugador.y + objetoMascotaJugador.alto
    const derechaMascota = objetoMascotaJugador.x + objetoMascotaJugador.ancho
    const izquierdaMascota = objetoMascotaJugador.x


    if(
        abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo
    ) {
        return;
    }

    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id
    seccionSelecionarAtaque.style.display = "flex"
    seccionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}


window.addEventListener("load", iniciarJuego)