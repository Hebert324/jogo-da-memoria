const FRONT = "card_font"
const BACK = "card_back"

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
creatCardsTech(techs)
function creatCardsTech(techs){
    let cards = []

    for(let tech of techs){
        cards.push(creatPairFromTech(tech))
    }
    return cards.flatMap(pair => pair)
}
function creatPairFromTech(tech){
    return [{
        id: creatIdWithTech(tech),
        icon: tech,
        flipped: false
    },{
        id: creatIdWithTech(tech),
        icon: tech,
        flipped: false
    }]
}
function creatIdWithTech(tech){
    return tech + parseInt(Math.random() * 1000)
}