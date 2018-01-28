import {
    AsyncStorage
} from 'react-native'
const uuidv4 = require('uuid/v4');
const DBNAME = 'FLASHCARD-DB'

var sample = {
    React: {
        title: 'React',
        questions: [{
            question: 'ABC',
            answer: '123'
        }]
    }
}

function createDeck(title) {
    return {
        title,
        questions: []
    }
}

class Repository {
    constructor(dbName) {
        this.dbName = dbName;
    }

    clearData() {
        return AsyncStorage.removeItem(this.dbName);
    }

    getRawData() {
        return AsyncStorage.getItem(this.dbName)
            .then(results => results ? JSON.parse(results) : {});
    }

    getDecks() {
        return this.getRawData().then(data => {
            const keys = Object.keys(data);
            return keys.map(key => {
                return data[key]
            })
        })
    }

    getDeck(id) {
        return this.getRawData().then(data => data[id]);
    }

    createDeck(title) {
        return new Promise((resolve, reject) => {
            this.getRawData()
                .then(data => {
                    const id = uuidv4();
                    data[id] = {
                        id,
                        title,
                        questions: []
                    }
                    this.__saveData(data)
                        .then(() => resolve(data[id]));
                })
        })
    }

    addQuestionToDeck(deckId, question, answer) {
        return new Promise((resolve, reject) => {
            this.getRawData()
            .then(data => {
                const deck = data[deckId];
                if (deck) {
                    const q = {
                        question,
                        answer,
                        id: uuidv4()
                    }
                    deck.questions.push(q);
                    this.__saveData(data).then(() => resolve(q))
                } else
                    reject(`Could not find deck id: ${deckId}`)
            })
        })
    }

    __saveData(data) {
        return AsyncStorage.setItem(this.dbName, JSON.stringify(data));
    }

}

export function getRepository(dbName = DBNAME) {
    return new Repository(dbName);
}