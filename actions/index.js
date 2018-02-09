export const ADD_QUESTION = 'ADD_QUESTION'
export const IMPORT_DECKS = 'IMPORT_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const CHANGE_REMINDER_HOUR = 'CHANGE_REMINDER_HOUR'

export function importDecks(data){
    return {
        type:IMPORT_DECKS,
        data
    }
}

export function addDeck(deck){
    return {
        type:ADD_DECK,
        data:deck
    }
}

export function changeRemindHour(hour){
    return {
        type:CHANGE_REMINDER_HOUR,
        data:hour
    }
}

export function addQuestion(qData,deckId){
    return {
        type:ADD_QUESTION,
        data:{
            qData,            
            deckId
        }
    }
}