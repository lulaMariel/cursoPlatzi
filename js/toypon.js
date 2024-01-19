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

let toypones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeToypones
let inputWoody
let inputBuzz
let inputRex
let mascotaJugador
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

class Toypones {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }

}

let woody = new Toypones("Woody", "fotos/woody.png", 5)

let buzz = new Toypones("Buzz", "fotos/buzz.png", 5)

let rex = new Toypones("Rex", "fotos/rex.png", 5)

woody.ataques.push(
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🌱", id: "boton-tierra"},
)

buzz.ataques.push(
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "💧", id: "boton-agua"},
)

rex.ataques.push(
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "💧", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego" },
)

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
}

function seleccionarMascotaJugador() {
    seccionSelecionarMascota.style.display = "none"
    
    seccionVerMapa.style.display = "flex"
    let imagenDeWoody = new Image()
    imagenDeWoody.src = woody.foto
    lienzo.drawImage(
        imagenDeWoody,
        20,
        40,
        100,
        100
    )

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

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
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
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, toypones.length - 1)

    spanMascotaEnemigo.innerHTML = toypones[mascotaAleatoria].nombre
    document.getElementById("imagen-enemigo").src = toypones[mascotaAleatoria].foto
    ataquesToyponEnemigo = toypones[mascotaAleatoria].ataques

    secuenciaAtaques()
}

function ataqueAleatorioEnemigo() {
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


window.addEventListener("load", iniciarJuego)