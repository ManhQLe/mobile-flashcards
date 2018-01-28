import {Platform } from 'react-native';
export function mapStateToProps(state){
    return {
        ...state
    }
}

export function getDeckById(decks,id){
    return decks.find(d=>d.id===id);
}

export const iconPrefix = Platform.OS=='ios'?'ios':'md'
