import {ADD_DECK,ADD_QUESTION, IMPORT_DECKS, CHANGE_REMINDER_HOUR} from '../actions'
import {getRepository} from '../repository'

const defaultState={
    repo:getRepository(),
    decks:[],
    remindHour:20
}

export default function reducer(state=defaultState,action){
    let newState;
    const data = action.data;
    switch(action.type){
        case ADD_DECK:
            newState = Object.assign({},state);
            newState.decks = [...state.decks,data]
            return newState;

        case ADD_QUESTION:
            newState = Object.assign({},state);            
            const deck = newState.decks.find(d=>d.id===data.deckId);
            deck && deck.questions.push(data.qData);
            return newState;

        case IMPORT_DECKS:
            newState = Object.assign({},state);
            newState.decks = data;
            return newState;

        case CHANGE_REMINDER_HOUR:
            newState = Object.assign({},state);
            newState.remindHour = data
            return newState
            
        default:
            return state;

    }
}

