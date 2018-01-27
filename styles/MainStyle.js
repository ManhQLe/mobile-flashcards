import React from 'react';

import { StyleSheet,Platform} from 'react-native';

import {Clouds,Abestos, Silver, Carrot, Turquoise, PeterRiver, IosBlue} from './colors'

const borderRadius = Platform.OS === 'ios'?5:0

const styles =  StyleSheet.create({   
    AllDeckView: {
		flex: 1,		
		justifyContent: "flex-start",
        alignItems:'stretch',
        padding:8
    },
    AddCard:{
        flex:1,
        padding:10,
        justifyContent: "center"
    },
	DeckCard: {
        backgroundColor: "#FFF",
        borderRadius,
        padding: 10,
        marginTop: 10,        
        alignItems:'center',
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    DeckCardTitle:{
        color:PeterRiver,
        fontSize:30
    },
    Input:{
        borderRadius:3,
        borderColor: Silver,        
        fontSize:30,        
        padding:5,
        borderWidth:1
    },
    ButtonDisabled:{
        borderRadius,
        alignSelf: 'center',
        borderWidth:1,
        borderColor:Silver,
        backgroundColor:Silver, 
    },    
    Button:{
        borderRadius,
        alignSelf: 'center',
        borderWidth:1,
        borderColor:Platform.OS==='ios'?PeterRiver:Turquoise,
        backgroundColor:Platform.OS==='ios'?PeterRiver:Turquoise, 
    },
    ButtonText:{
        color:Clouds,
        padding:10,
        fontSize: 30
    },
    Label:{
        fontSize:20,
        color:Abestos
    },
    SpaceGap:{
        height:20
    }
})

export default styles;