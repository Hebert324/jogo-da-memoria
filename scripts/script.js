const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

let techs = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'
]

let cards = null

startGame()

//aqui e a função para iniciar o jogo
function startGame(){
    let cards = createCardsTech(techs)
    shuffleCards(cards)
    initializeCards(cards)
}

//aqui nos vamos criar as nossas cartas e adicionalas ao html
function initializeCards(cards){
    //aqui ele vai pegar a div la do html que e aonde as cartas vão ficar
    let gameBoard = document.getElementById("gameBoard")
    
    cards.forEach(card => {
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

//aqui fazemos a função para embaralhar as cartas
function shuffleCards(cards){
    //primeiro criamos uma variavel que vai pegar o legnth das cartas
    let currentIndex = cards.length
    //e fazemos outra variavel que vai gerar um numero aleatorio, começando do 0
    let randomIndex = 0

    //aqui nos fazemos um while, que enquanto o currentIndex for diferente de 0 ele vai executar alguma coisa.
    while(currentIndex !== 0){
        //ele vai pegar o radomIndex e vai adicionar um Math.floor mais um Math.radom, que vai gerar um numero aleatorio vezes o numero do currentIndex.
        randomIndex = Math.floor(Math.random() * currentIndex)

        //ai aqui ele vai pegar esse numero e diminuir 1 para que não seja maior e de erro
        currentIndex--

        //aqui nos vamos inverter as ordens das cartas
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
    }
}

//nessa função ela vai criar as cartas
createCardsTech(techs)
//aqui na função ele esta pegando a variavel techs
function createCardsTech(techs){
    //aqui adicionamos uma variavel cards vazia aonde ela vai receber as cartas
    let cards = []

    //aqui fazemos um for aonde vai pegar cada uma das techs da vairavel que esta la em cima e vai adicionar ao card um push que vai chamar a fução que cria o par das cartas
    techs.forEach((tech) => {
        cards.push(createPairFromTech(tech))
    })
    return cards.flatMap(pair => pair)
}
//nessa função ele cria um par de cada carta
function createPairFromTech(tech){
    //aqui ele retorna um objeto que contem um id que chama um função que pega o numero aleatorio e adiciona ao id, depois ele vai pegar o icone da tech, e depois vai ver se a carta esta virada
    return [{
        id: createIdWithTech(tech),
        icon: tech,
        flipped: false
    },{
        id: createIdWithTech(tech),
        icon: tech,
        flipped: false
    }]
}
//aqui e a função que faz um numero aleatorio
function createIdWithTech(tech){
    return tech + parseInt(Math.random() * 1000)
}
function flipCard(){
    this.classList.add("flip")
}