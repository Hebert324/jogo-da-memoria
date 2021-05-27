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
function creatCardsTech(techs){
    let cards = []

    for(let tech of techs){
        cards.push(creatPairFromTech)
    }
}