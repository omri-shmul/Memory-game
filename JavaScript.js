const cards = document.querySelectorAll('.memory-card');
const time = 30
let flip = document.getElementById('flips');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var cnt = 0;
var chck = 0;
var counter = time;
var countDownInt;

function checkWin() {
    if ($('.flip').length === 12) {     
        sg = document.getElementById('victory-text').classList.add('visible');
        document.getElementById('victory-text').classList.add('visible');
    }
}

function startTimer() {
    countDownInt = setInterval(function () {
        counter--;
        if (counter >= 0) {
            id = document.getElementById("countDown");
            id.innerHTML = counter;
        } else {
            if (!vc.classList.contains('visible')) {
                document.getElementById('game-over-text').classList.add('visible');
            }
        }
    }, 1200);
}


// Animation for flipping the cards
function filpCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        //First card clicked
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    //Second card clicked
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    // If statement as a ternary operator!!! Lovely code here!!!!
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('clic', filpCard);
    secondCard.removeEventListener('clic', filpCard);
    cnt += 1;
    flip.innerHTML = cnt;
    checkWin();
    counter = time;
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        cnt += 1;
        flip.innerHTML = cnt;
        counter = time;
        resetBoard();
    }, 1500);
}

cards.forEach(card => card.addEventListener('click', filpCard));

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//Immediately envoked function
function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
        card.classList.remove('flip');
        ready();
    });
}



function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible'); 
        });
    });
}

function startGame() {
    cards.forEach(card => {
        card.classList.remove('flip');
    });

    counter = time;
    cnt = 0;
    startTimer();
    shuffle();
    shuffle();
}

// Event Listeners for Overlay
document.getElementById('game-over-text').addEventListener('click', startGame);
document.getElementById('start').addEventListener('click', startGame);
document.getElementById('victory-text').addEventListener('click', startGame);

var go = document.getElementById('game-over-text');
var vc = document.getElementById('victory-text');
