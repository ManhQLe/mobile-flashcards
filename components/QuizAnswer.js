import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableHighlight,FlatList } from 'react-native';
import styles from '../styles/MainStyle'
import {Clouds, Alizarin, Turquoise, PeterRiver, Amethyst, SunFlower, MidNightBlue, DarkGray, Silver } from '../styles/colors';

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


export default function QuizAnswer(props) {
    const {onAnswerPicked=()=>{}, answer}  = props
    const A = generateAnswers(answer,MAX_ANSWER);
    
    return(    
        <FlatList data={A} contentContainerStyle={{padding:5}}
            renderItem={({ item }) =>{ 
                return <TouchableHighlight 
                style={[styles.FlatStyleButtonAnswer,{marginBottom:8}]} 
                underlayColor={Clouds}
                onPress={()=>onAnswerPicked(item.a)}>
                    <View style={ {flex:1, flexDirection:'row'}}>
                        <Text style={[styles.QuizAnswerButtonText,
                            {backgroundColor:COLOR_COL[item.i%COLOR_COL.length],color:"white"}]}>
                            {String.fromCharCode(item.i + START_CHAR)}
                        </Text>
                        <Text style={[styles.QuizAnswerButtonText,
                            {color:DarkGray,flex:1,flexWrap:'wrap' }]}
                        >{item.a}</Text>
                    </View>
                </TouchableHighlight>
            }}
            keyExtractor={(item,i) => i}>                
        </FlatList>
    
    ) 
    
}

QuizAnswer.propTypes ={
    onAnswerPicked: PropTypes.func,
    answer: PropTypes.string
}


