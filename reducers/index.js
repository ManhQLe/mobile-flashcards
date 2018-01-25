import {ADD_DECK,ADD_QUESTION, IMPORT_DECKS} from '../actions'
import {getRepository} from '../repository'

const defaultState={
    repo:getRepository(),
    decks:[]
}

export default function reducer(state=defaultState,action){
    let newState;
    const data = action.data;
    switch(action.type){
        case ADD_DECK:
            newState = Object.assign({},state);
            newState.decks.push(data);
            return newState;

        case ADD_QUESTION:
            newState = Object.assign({},state);
            const deck = newState.decks.find(data.deckId);
            deck && deck.questions.push(data.qData);
            return newState;

        case IMPORT_DECKS:
            newState = Object.assign({},state);
            newState.decks = data;
            return newState;

        default:
            return state;

    }
}

