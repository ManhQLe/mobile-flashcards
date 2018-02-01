import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import {connect} from 'react-redux'
import { mapStateToProps } from '../utils';
import styles from '../../styles/MainStyle'
import {  Clouds, Alizarin, Turquoise, PeterRiver, Amethyst} from '../../styles/colors';
import QuizAnswer from '../QuizAnswer'

const NOT_STARTED = 0
const STARTED = 1
const MAX_ANSWER = 4
const COLOR_COL = [Alizarin,Turquoise, PeterRiver, Amethyst]

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

class Quiz extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params;
        return {
            title:`Quiz on ${deck.title}`
        }
    }

    constructor(props){
        super(props)
        this.state={
            stage:NOT_STARTED,
            qIndex:0
        }
    }

    startTest=()=>{
        this.setState({
            stage:STARTED
        })
    }

    render(){
        const { navigation } = this.props;
        const { deck } = navigation.state.params;
        const {stage, qIndex} = this.state;
        let content
        if(stage == NOT_STARTED){
            content = <View style={{flex:1,justifyContent:'center'}}> 
                <TouchableHighlight  
                    style={[styles.FlatStyleButton]}
                    underlayColor={Clouds} onPress={this.startTest}>
                    <Text style={[styles.FlatStyleButtonText,{ color:Alizarin}]}>Start Quiz</Text>
                </TouchableHighlight>
            </View>
        }
        else{               
            const cCard = deck.questions[qIndex]
            content = <QuizAnswer answer={cCard.answer}/>
        }

        return content
    }
}


export default connect(mapStateToProps)(Quiz)