let palabra = "APPLE";
let vidas = 6;
let verde = '#83E463';
let amarillo = '#F5E663';
let gris = '#a4aec4';

let diccionario = ["APPLE", "HOUSE", "ANGEL", "PASTA", "NEVER", "AFTER"];
palabra = palabraAleatoria(diccionario);

const API = "https://random-word-api.vercel.app/api?words=1&length=5";
fetch(API).then((response) => {
    response.json().then((body) => {
        palabra = body[0].toUpperCase();
    });
});

function palabraAleatoria(diccionario) {
    let max = diccionario.length - 1;
    let indice = Math.floor(Math.random() * max + 1);
    return diccionario[indice];
}
let INPUT = document.getElementById("guess-button");
INPUT.addEventListener("click", () => {
    const intento = leerIntento();
    if (palabra === intento) {
        terminar("Ganaste!😀");
        return;
    }
    const row = document.createElement("div");
    row.className = "row";
    const grid = document.getElementById("grid");
    for (const i in intento) {
        const span = document.createElement("span");
        span.className = "letter";
        span.innerText = intento[i];
        if (intento[i] === palabra[i]) {
            span.style.backgroundColor = verde;
        } else if (palabra.includes(intento[i])) {
            span.style.backgroundColor = amarillo;
        } else {
            span.style.backgroundColor = gris;
        }
        row.appendChild(span);
    }
    grid.appendChild(row);
    vidas--;
    if (!vidas) {
        terminar("Perdiste!😖");
        return;
    }
});
function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}

function terminar(mensaje) {
    let p = document.getElementById("guesses");
    p.innerHTML = "<h1>" + mensaje + "<h1/>";
    INPUT.disabled = true;
}
