let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function(id){
        let card = this.cards.filter(card => card.id === id)[0]
        console.log(card)

        if(card.flipped || this.lockMode){
            return false
        }

        if(!this.firstCard){
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        }

        else{
            this.secondCard = card
            this.lockMode = true
            this.secondCard.flipped = true
            return true
        }
    },

    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
            return false
        }
        return this.firstCard.icon == this.secondCard.icon
    },

    clearCards: function(){
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    unflipCards(){
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()
    },

    techs: [
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
    ],

    cards : null,

    //aqui na função ele esta pegando a variavel techs
    createCardsTech: function() {
        //aqui adicionamos uma variavel cards vazia aonde ela vai receber as cartas
        this.cards = []
    
        //aqui fazemos um for aonde vai pegar cada uma das techs da vairavel que esta la em cima e vai adicionar ao card um push que vai chamar a fução que cria o par das cartas
        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech))
        })
        this.cards = this.cards.flatMap(pair => pair)
        this.shuffleCards()
        return this.cards
    },

    //nessa função ele cria um par de cada carta
    createPairFromTech: function(tech){
        //aqui ele retorna um objeto que contem um id que chama um função que pega o numero aleatorio e adiciona ao id, depois ele vai pegar o icone da tech, e depois vai ver se a carta esta virada
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        },{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }]
    },

    //aqui e a função que faz um numero aleatorio
    createIdWithTech: function(tech){
        return tech + parseInt(Math.random() * 1000)
    },

    //aqui fazemos a função para embaralhar as cartas
    shuffleCards: function(cards){
    //primeiro criamos uma variavel que vai pegar o legnth das cartas
    let currentIndex = this.cards.length
    //e fazemos outra variavel que vai gerar um numero aleatorio, começando do 0
    let randomIndex = 0

    //aqui nos fazemos um while, que enquanto o currentIndex for diferente de 0 ele vai executar alguma coisa.
    while(currentIndex !== 0){
        //ele vai pegar o radomIndex e vai adicionar um Math.floor mais um Math.radom, que vai gerar um numero aleatorio vezes o numero do currentIndex.
        randomIndex = Math.floor(Math.random() * currentIndex)

        //ai aqui ele vai pegar esse numero e diminuir 1 para que não seja maior e de erro
        currentIndex--

        //aqui nos vamos inverter as ordens das cartas
        [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
    }
    }
}