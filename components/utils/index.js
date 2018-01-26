import {Platform } from 'react-native';
export function mapStateToProps(state){
    return {
        ...state
    }
}

export const iconPrefix = Platform.OS=='ios'?'ios':'md'
