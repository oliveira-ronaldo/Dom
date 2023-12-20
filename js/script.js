const fim = document.querySelector(".fimDeJogo");
const cartas = document.querySelectorAll(".carta");
const imagens = ["images/imagem1.png", "images/imagem2.png", "images/imagem3.png", "images/imagem4.png", "images/imagem5.png", "images/imagem6.png", "images/imagem7.png", "images/imagem8.png"];

let ordemCartasEmbaralhadas = [];
let jogadorNome = "";
let pontuacao = 0;
let cartasPareadas = 0;
let acertos = 0;

function sortearNumero(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function obterNomeJogador() {
    jogadorNome = prompt("Digite seu nome:");
    if (!jogadorNome) {
        jogadorNome = "Jogador Anônimo";
    }
}

function embaralharCartas() {
    const distribuicaoImagens = Array(imagens.length).fill(0);

    cartas.forEach((carta, i) => {
        while (ordemCartasEmbaralhadas[i] === undefined) {
            let num = sortearNumero(0, distribuicaoImagens.length - 1);

            if (distribuicaoImagens[num] < 2) {
                ordemCartasEmbaralhadas[i] = imagens[num];
                distribuicaoImagens[num]++;
            }
        }
    });
}

function virarCarta() {
    if (!this.estaPareada && !this.estaVirada) {
        this.style.backgroundImage = `url(${ordemCartasEmbaralhadas[this.indice]})`;
        this.estaVirada = true;

        let cartasViradas = Array.from(cartas).filter(carta => carta.estaVirada && !carta.estaPareada);

        if (cartasViradas.length === 2) {
            verificarPar(cartasViradas);
        }
    }
}

function verificarPar(cartasSelecionadas) {
    if (cartasSelecionadas[0].style.backgroundImage == cartasSelecionadas[1].style.backgroundImage) {
        console.log("Cartas iguais!");
        for (let carta of cartasSelecionadas) {
            carta.estaPareada = true;
        }
        pontuacao += 10;
        cartasPareadas += 2;
        acertos++;

        if (cartasPareadas === cartas.length) {
            // Todas as cartas estão pareadas, ajusta a pontuação para 100
            pontuacao = 100;
        }

        verificarFimDeJogo();
    } else {
        console.log("Cartas diferentes!");
        setTimeout(desvirarCarta, 300, cartasSelecionadas);
    }
}

function desvirarCarta(cartasSelecionadas) {
    for (let carta of cartasSelecionadas) {
        carta.style.backgroundImage = "url(img/reverse_clear.png)";
        carta.estaVirada = false;
    }
}

function verificarFimDeJogo() {
    if (cartasPareadas === cartas.length) {
        mostrarResultado();
    }
}

function mostrarResultado() {
    alert(`Parabéns, ${jogadorNome}! Sua pontuação é ${pontuacao} %. Você acertou ${acertos} vezes.`);
    const jogarNovamente = confirm("Deseja jogar novamente?");
    if (jogarNovamente) {
        reiniciarJogo();
    } else {
        fim.classList.add("aparecer");
    }
}

function reiniciarJogo() {
    ordemCartasEmbaralhadas = [];
    jogadorNome = "";
    pontuacao = 0;
    cartasPareadas = 0;
    acertos = 0;
    fim.classList.remove("aparecer");
    obterNomeJogador();
    embaralharCartas();
    for (let carta of cartas) {
        carta.style.backgroundImage = "url(img/reverse_clear.png)";
        carta.estaVirada = false;
        carta.estaPareada = false;
    }
}

obterNomeJogador();
embaralharCartas();

for (let i = 0; i < cartas.length; i++) {
    cartas[i].addEventListener("click", virarCarta);
    cartas[i].estaVirada = false;
    cartas[i].estaPareada = false;
    cartas[i].indice = i;
}
