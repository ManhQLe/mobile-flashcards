import {
    AsyncStorage
} from 'react-native'
const uuidv4 = require('uuid/v4');
const DBNAME = 'FLASHCARD-DB'
const REMINDERDB = ReminderCompanionDB(DBNAME)

/*
    REMINDER DB SCHEMA
    {
        reminderHour:20,
        reminders:{

        }
    }
*/


function ReminderCompanionDB(dbname){
    return `${dbname}-REMINDER`
}

function createDeck(title) {
    return {
        title,
        questions: []
    }
}

class Repository {
    constructor(dbName,reminderdb) {
        this.dbName = dbName;
        this.reminderDbName = reminderdb
    }

    getRawReminder(){
        return AsyncStorage.getItem(this.reminderDbName)
        .then(results => results ? JSON.parse(results) : {});
    }

    getReminderByDeck(deckid){
        return this.getRawReminder()
        .then(data=>{            
            return (data.reminders || {})[deckid]
        })
    }

    removeReminder(deckid){
        return this.getRawReminder()
        .then(data=>{
            const reminders = (data.reminders || {})
            delete reminders[deckid]
            return this.__saveData(data,this.reminderDbName);
        })
    }

    saveReminder(deckid, reminderid){
        return this.getRawReminder()
        .then(data=>{
            let {reminders} = data;
            reminders || (reminders={})
            reminders[deckid] = reminderid;
            data.reminders = reminders;    
            return this.__saveData(data,this.reminderDbName)
        })
    }

    saveReminderHour(hour){
        return this.getRawReminder()
        .then(data=>{
            data.reminderHour = hour;               
            return this.__saveData(data,this.reminderDbName)
        })
    }

    getReminderHour(){
        return this.getRawReminder()
        .then(data=>{
            return data.reminderHour;
        })
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

    __saveData(data,name) {
        return AsyncStorage.setItem(name || this.dbName, JSON.stringify(data));
    }

}

export function getRepository(dbName = DBNAME,reminderdb = REMINDERDB) {
    return new Repository(dbName,reminderdb);
}