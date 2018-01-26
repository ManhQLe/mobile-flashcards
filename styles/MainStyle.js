import React from 'react';
import { StyleSheet,Platform} from 'react-native';
import {Clouds} from './colors'
const styles =  StyleSheet.create({   
    AllDeckView: {
		flex: 1,		
		justifyContent: "flex-start",
		alignItems:'flex-start'
	},
	DeckCard: {
        backgroundColor: Clouds,
        borderRadius: Platform.OS === 'ios' ? 16 : 0,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,        
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
	}	
})

export default styles;