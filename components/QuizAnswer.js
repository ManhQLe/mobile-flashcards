import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight,FlatList } from 'react-native';
import styles from '../styles/MainStyle'
import {Clouds, Alizarin, Turquoise, PeterRiver, Amethyst, SunFlower, MidNightBlue, DarkGray } from '../styles/colors';

const MAX_ANSWER = 4
const COLOR_COL = [Alizarin, Turquoise, PeterRiver, Amethyst]
const START_CHAR = 65

function sampleAnswer(answer,times){
    let x = ""
    for(let i = 0;i<times;i++){
        x+=answer.charAt(Math.random()*answer.length);
    }
    return x;
}

function generateAnswers(correctAnwser,n){    
    let aidx = Math.floor(Math.random()*n)
    const answers = [];
    let aa;
    for(let i = 0;i<n;i++){
        if(i!==aidx){
            let maxLen = Math.floor(Math.random() * correctAnwser.length) + 3;
            aa = sampleAnswer(correctAnwser,maxLen)            
        }
        else
            aa = correctAnwser

        answers.push({i,a:aa})
    }

   

    return answers;    
}

function RenderAnswer(props){
    return 
}

export default function QuizAnswer(props) {
    const {onAnswerPicked=()=>{}, answer}  = props
    const A = generateAnswers(answer,MAX_ANSWER);
    
    return(
        <View style={{flex:1,alignItems:'flex-start',borderWidth:1}}>
        {
            <FlatList data={A}
                renderItem={({ item }) =>{ 
                    return <TouchableHighlight 
                    style={[styles.FlatStyleButtonAnswer,{marginBottom:5}]} 
                    underlayColor={Clouds}
                    onPress={()=>onAnswerPicked(item)}>
                        <View style={ {flex:1, flexDirection:'row'}}>
                            <Text style={[styles.FlatStyleButtonText,{backgroundColor:"#F0F0F0", color:DarkGray}]}>
                                {String.fromCharCode(item.i + START_CHAR)}
                            </Text>
                            <Text style={[styles.FlatStyleButtonText,{ color:COLOR_COL[item.i%COLOR_COL.length] }]}
                            >{item.a}</Text>
                        </View>
                    </TouchableHighlight>
                }}
                keyExtractor={(item,i) => i}>                
                </FlatList>
        }
        </View>
    ) 
}

