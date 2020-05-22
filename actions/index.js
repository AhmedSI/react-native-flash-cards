export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

export const createReceiveDecksAction = (decks)=>{
    return {
        type:RECEIVE_DECKS,
        decks:decks
    }
}

export const createAddDeckAction = (deck,id)=>{
    return {
        type:ADD_DECK,
        deck:deck,
        id:id
    }
}

export const createAddQuestionAction = (question,deckId)=>{
    return {
        type:ADD_QUESTION,
        question:question,
        deckId:deckId
    }
}
