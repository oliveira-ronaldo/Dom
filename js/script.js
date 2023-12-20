document.addEventListener('DOMContentLoaded', startGame);

let flippedCards = [];
let matchedCards = [];
let playerName;

function startGame() {
    createCards();
    playerName = prompt('Digite seu nome:');
    if (!playerName) {
        playerName = 'Jogador';
    }
}

function createCards() {
    const gameContainer = document.querySelector('.game-container');

    for (let i = 1; i <= 8; i++) {
        const card = document.createElement('div');
        card.className = 'carta';
        card.dataset.cardNumber = i;
        card.style.backgroundImage = `url(images/imagem${i}.jpg)`;
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    }
}

function flipCard() {
    const clickedCard = this;

    if (!flippedCards.includes(clickedCard) && flippedCards.length < 2) {
        flippedCards.push(clickedCard);
        clickedCard.classList.add('virada');

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.cardNumber === card2.dataset.cardNumber) {
        matchedCards.push(card1, card2);

        if (matchedCards.length === 8) {
            endGame();
        }
    } else {
        card1.classList.remove('virada');
        card2.classList.remove('virada');
    }

    flippedCards = [];
}

function endGame() {
    const endScreen = document.createElement('div');
    endScreen.className = 'fim-de-jogo';
    endScreen.innerHTML = `
        <p>Fim do jogo, ${playerName}!</p>
        <p>Pontuação: ${matchedCards.length / 2}</p>
        <button onclick="reiniciarJogo()">Jogar Novamente</button>
    `;
    
    document.body.appendChild(endScreen);
}

function reiniciarJogo() {
    const endScreen = document.querySelector('.fim-de-jogo');
    endScreen.style.display = 'none';
    
    const gameContainer = document.querySelector('.game-container');
    gameContainer.innerHTML = '';

    flippedCards = [];
    matchedCards = [];

    startGame();
}
