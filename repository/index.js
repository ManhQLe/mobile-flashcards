import {AsyncStorage} from 'react-native'
const DBNAME = 'FLASHCARD-DB'

var sample = [
    {
        title:'React',
        questions:[
            {
                question:'ABC',
                answer:'123'
            }
        ]        
    }
]

function createDeck(title){
    return {title,questions:[]}
}

class Repository {
    constructor(dbName){
        this.dbName = dbName;
    }

    clearData(){
        return AsyncStorage.removeItem(this.dbName);
    }

    getDecks(){
        return AsyncStorage.getItem(this.dbName)
        .then(results=>results?JSON.parse(results):[]);
    }

    getDeck(title){
        return this.getDecks().then(decks=>decks.find(d=>d.title===title))
    }

    addDeck(title){
        return new Promise((resolve,reject)=>{
            this.getDeck(title).then(deck=>{
                if(deck)
                    reject(`Deck ${title} already exists`)
                else
                    this.getDecks().then(data=>{
                        deck = createDeck(title);
                        data.push(deck);
                        this.__saveData(data).then(()=>resolve(deck))
                    })
            })
        })        
    }

    addQuestionToDeck(deckTitle,question,anwser) {
        return new Promise((resolve,reject)=>{
            this.getDeck(title).then(deck=>{
                if(!deck)
                    reject(`Deck ${deckTitle} does not exist`)
                else
                    this.getDecks().then(data=>{
                        const card = {
                            question,answer
                        }
                        data.questions.push(card);
                        this.__saveData(data).then(()=>resolve(card))
                    })
            })
        })    
    }

    __saveData(data){
        return AsyncStorage.setItem(this.dbName,JSON.stringify(data));
    }

}

export function getRepository(dbName = DBNAME){
    return new Repository(dbName);
}
