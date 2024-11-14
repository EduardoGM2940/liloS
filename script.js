let puntajeJugador = 0;
let puntajeComputadora = 0;
let rondaActual = 0;
let totalRondas = 5;
let juegoIniciado = false;

// Control de sonido
let isMuted = false;
const backgroundMusic = document.getElementById("background-music");

function iniciarJuegoConMusica() {
    document.getElementById("instrucciones-modal").style.display = "none";
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
}

function iniciarJuego() {
    puntajeJugador = 0;
    puntajeComputadora = 0;
    rondaActual = 0;
    totalRondas = parseInt(document.getElementById("num-rondas").value);
    juegoIniciado = true;
    document.getElementById("num-rondas").disabled = true;
    document.getElementById("resultado").innerText = "";
    document.getElementById("puntaje-acumulado").innerText = "";
    document.getElementById("gif-img").style.display = "none";
}

function calcularResultado() {
    if (!juegoIniciado) {
        iniciarJuego();
    }

    if (rondaActual >= totalRondas) {
        document.getElementById("resultado").innerText = "El juego ha terminado. Por favor, reinicia el juego.";
        let ganador = puntajeJugador > puntajeComputadora
            ? "¡El Jugador ganó el juego!"
            : puntajeJugador < puntajeComputadora
            ? "¡La Computadora ganó el juego!"
            : "¡Es un empate!";
        document.getElementById("puntaje-acumulado").innerText += `\n${ganador}`;
        return;
    }

    const player = document.getElementById("player-strategy").value;
    const computer = ["nani", "jumba"][Math.floor(Math.random() * 2)];
    let resultado = "";

    const payoff = {
        "lilo-nani": [5, 0],
        "lilo-jumba": [0, 10],
        "stitch-nani": [10, 0],
        "stitch-jumba": [-5, -5]
    };

    const gifs = {
        "lilo-nani": "lilo-nani.gif",
        "lilo-jumba": "lilo-jumba.gif",
        "stitch-nani": "stitch-nani.gif",
        "stitch-jumba": "stitch-jumba.gif"
    };

    const key = `${player}-${computer}`;
    const [playerPoints, computerPoints] = payoff[key] || [0, 0];
    resultado = `Jugador: ${player} vs Computadora: ${computer}\n`;

    puntajeJugador += playerPoints;
    puntajeComputadora += computerPoints;

    resultado += `Puntos ganados en esta ronda - Jugador: ${playerPoints}, Computadora: ${computerPoints}\n`;

    const gifURL = gifs[key];
    document.getElementById("gif-img").src = gifURL;
    document.getElementById("gif-img").style.display = "block";

    document.getElementById("resultado").innerText = resultado;
    document.getElementById("puntaje-acumulado").innerText = `Puntaje acumulado: Jugador ${puntajeJugador} | Computadora ${puntajeComputadora}`;
    
    rondaActual++;
}

function reiniciarJuego() {
    puntajeJugador = 0;
    puntajeComputadora = 0;
    rondaActual = 0;
    juegoIniciado = false;
    document.getElementById("num-rondas").disabled = false;
    document.getElementById("resultado").innerText = "";
    document.getElementById("puntaje-acumulado").innerText = "";
    document.getElementById("gif-img").style.display = "none";
}

function toggleMute() {
    isMuted = !isMuted;
    backgroundMusic.muted = isMuted;
    document.getElementById("mute-btn").innerText = isMuted ? "Activar Sonido" : "Silenciar";
}
