import {RECEIVE_DECKS} from '../actions'
import {ADD_DECK} from '../actions'
import { ADD_QUESTION } from "../actions"

export const decks = (state={},action)=>{
    switch(action.type){
        case RECEIVE_DECKS:
            return{
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return{
                ...state,
                [action.id]:action.deck
            }
        case ADD_QUESTION:
            return{
                ...state,
                [action.deckId]:{
                   ...state[action.deckId],
                   questions:state[action.deckId].questions.concat(action.question)
                }
            }
        default:
            return state
    }
}

