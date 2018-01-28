import React from 'react';

import { StyleSheet,Platform} from 'react-native';

import {Clouds,Abestos, Silver, DarkGray, Carrot, Turquoise, PeterRiver, IosBlue} from './colors'

const isIos = Platform.OS ==='ios'
const borderRadius = isIos?5:3


const styles =  StyleSheet.create({   
    AllDeckView: {
		flex: 1,		
		justifyContent: "flex-start",
        alignItems:'stretch',
        padding:8
    },
    DeckView:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center'
    },
    DeckViewTitle:
    {
        fontSize:45,
        color:isIos?Carrot: Turquoise,
    },
    DeckViewSubTitle:
    {
        color:Abestos,
        fontSize:30
    },
    AddCard:{
        flex:1,
        padding:10,
        justifyContent: "center"
    },
	DeckCard: {
        backgroundColor: "#FFF", 
        borderColor:"#FFF",
        padding: 10,
        borderBottomColor:Silver,
        borderWidth:1, 
        alignItems:'center',
        justifyContent: 'center',       
    },
    DeckCardTitle:{
        color:PeterRiver,
        fontSize:30
    },
    DeckCardSubTitle:{
        color:Abestos,
        fontSize:25
    },
    Input:{
        borderRadius,
        borderColor: Silver,        
        fontSize:30,        
        padding:5,
        borderWidth: isIos?1:0
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
        borderColor:isIos?PeterRiver:Turquoise,
        backgroundColor:isIos?PeterRiver:Turquoise, 
    },
    ButtonText:{
        color:Clouds,
        padding:10,
        fontSize: 30
    },
    Label:{
        fontSize:20,
        color: DarkGray
    },
    
    SpaceGap:{
        height:5
    },
    SpaceGap20:{
        height:20
    }
})

export default styles;