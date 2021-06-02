const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"
let result1 = document.getElementById("result")
let totalResult = document.getElementById("totalResult")
let moves = 0
let movesTotal = 0

startGame()

//aqui e a função para iniciar o jogo
function startGame(){
    initializeCards(game.createCardsTech())
    result1.innerHTML = "Tentativas: " + moves
    totalResult.innerHTML = "Total de movimentos: " + movesTotal
}

//aqui nos vamos criar as nossas cartas e adicionalas ao html
function initializeCards(cards){
    //aqui ele vai pegar a div la do html que e aonde as cartas vão ficar
    let gameBoard = document.getElementById("gameBoard")
    
    gameBoard.innerHTML = ''

    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement);
    })
}

function createCardContent(card, cardElement){
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}

function flipCard(){
    if(game.setCard(this.id)) {

        this.classList.add("flip")

        if(game.secondCard){
            result()
            if(game.checkMatch()){
                game.clearCards()
                if(game.checkGameOver()){
                    let gameOverLayer = document.getElementById("gameOver")
                    gameOverLayer.style.display = "flex"
                }
            }
            else{
                setTimeout(()=>{
                let firstCardView = document.getElementById(game.firstCard.id)
                let secondCardView = document.getElementById(game.secondCard.id)

                firstCardView.classList.remove("flip")
                secondCardView.classList.remove("flip")
                game.unflipCards()
                }, 1000)
            }
        }
    }
}

function restart(){
    game.clearCards()
    startGame()
    let gameOverLayer = document.getElementById("gameOver")
    gameOverLayer.style.display = "none"
    moves = 0
    result1.innerHTML = "Tentativas: " + moves
}

function result(){
    moves++
    movesTotal = moves
    if(restart == true){
        totalResult.innerHTML = "Total de movimentos: " + movesTotal
    }
    result1.innerHTML = "Tentativas: " + moves
}
