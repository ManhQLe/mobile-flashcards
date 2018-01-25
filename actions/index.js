export const ADD_QUESTION = 'ADD_QUESTION'
export const IMPORT_DECKS = 'ADD_DECK'
export const IMPORT_DATA = 'IMPORT_DATA'

export function importData(data){
    return {
        type:IMPORT_DATA,
        data:data
    }
}

export function addDeck(title){
    return {
        type:ADD_DECK,
        data:title
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