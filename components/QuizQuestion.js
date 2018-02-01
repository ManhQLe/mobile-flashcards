import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import styles from '../../styles/MainStyle'
import { Alizarin, Turquoise, PeterRiver, Amethyst } from '../../styles/colors';

const MAX_ANSWER = 4
const COLOR_COL = [Alizarin, Turquoise, PeterRiver, Amethyst]

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
    for(let i = 0;i<n;i++){
        if(i!==aidx){
            let maxLen = Math.floor(Math.random() * correctAnwser.length) + 3;
            answers.push(sampleAnswer(correctAnwser,maxLen))
        }
        else
            answers.push(correctAnwser);
    }

    return answers;    
}

function RenderAnswer(props){
    return 
}

export default function QuizQuestion(props) {
    const {onAnswerPicked, answer,}     
    const A = generateAnswers(answer,MAX_ANSWER);
    
    return(
        <View>
        {
            <FlatList data={A}
                renderItem={({ item }) =>{ 
                    return <TouchableHighlight 
                    style={[styles.FlatStyleButton]} 
                    underlayColor={Clouds}
                    onPress={()=>onAnswerPicked(item)}>
                        <Text style={[styles.FlatStyleButtonText,{ color:COLOR_COL[i%COLOR_COL.length] }]}
                        >{item}</Text>
                    </TouchableHighlight>
                }}
                keyExtractor={(item,i) => i}>                
                </FlatList>

        }
        </View>
    ) 
}


