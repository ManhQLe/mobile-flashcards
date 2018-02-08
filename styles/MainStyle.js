import React from 'react';

import { StyleSheet,Platform} from 'react-native';

import {Clouds,Abestos, Silver, DarkGray, Carrot, Turquoise, PeterRiver, IosBlue, Emerald, SunFlower, WetAsphalt} from './colors'

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
        justifyContent:'flex-start',
        padding:5
    },
    DeckViewTitle:
    {
        fontSize:60,
        color:isIos?Carrot: Turquoise,
    },
    DeckViewSubTitle:
    {
        color:Abestos,
        fontSize:40
    },
    AddCard:{
        flex:1,
        padding:10,        
        justifyContent: "flex-start",
        alignItems:'center'
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
        width:"100%",
        borderWidth: isIos?1:0,
        backgroundColor:"#FFF"
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
        alignItems:'center',
        borderWidth:1,        
        borderColor:'rgba(0,0,0,0)',
        backgroundColor:isIos?PeterRiver:Turquoise, 
    },
    ButtonTakeQuiz:{
        backgroundColor:WetAsphalt, 
    },    
    ButtonText:{
        color:Clouds,
        padding:10,
        fontSize: 30
    },
    ButtonTextQuiz:{
        color:SunFlower
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
    },

    FlatStyleButton:{
        borderRadius,
        borderWidth:1,
        borderColor:'rgba(0,0,0,0)',
        backgroundColor:"#FFF", 
        shadowRadius: 2,
        shadowOpacity:0.8,
        shadowColor:'rgba(0,0,0,0.24)',
        shadowOffset:{
            width:0,
            height:2
        }
    },
    FlatStyleButtonText:{
        color:"#000",
        padding:10,
        fontSize: 30,
    },
    FlatStyleButtonDisabled:{
        borderRadius,
        alignSelf: 'center',
        borderWidth:1,        
        borderColor:'rgba(0,0,0,0)',
        backgroundColor:"#FFF", 
        shadowRadius: 1,
        shadowOpacity:0.4,
        shadowColor:'rgba(0,0,0,0.24)',
        shadowOffset:{
            width:0,
            height:1
        }
    },
    FlatStyleButtonAnswer:{
        borderRadius,
        borderWidth:1,
        borderColor:'rgba(0,0,0,0)',
        backgroundColor:"#FFF", 
        shadowRadius: 2,
        shadowOpacity:0.8,
        shadowColor:'rgba(0,0,0,0.24)',
        shadowOffset:{
            width:0,
            height:1
        }
    },  
    QuizAnswerButtonText:{
        color:"#000",
        padding:10,
        fontSize: 20
    },
    QuizCard:{
        padding:5,
        flex:1,
        justifyContent: 'space-around',
        borderRadius,
        backgroundColor:"#FFF",
        height:"100%",
        width:"100%",        
        borderWidth:1,
        borderColor:'rgba(0,0,0,0)',
        backfaceVisibility: 'hidden',
        shadowRadius: 1.5,
        shadowOpacity:0.8,
        shadowColor:'rgba(0,0,0,0.24)',
        shadowOffset:{
            width:0,
            height:1.5
        }
    }  
})

export default styles;