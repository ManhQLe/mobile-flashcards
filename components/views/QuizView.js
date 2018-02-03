import React from 'react';
import { StyleSheet, Text, View,TouchableHighlight, Platform, Animated,Button } from 'react-native';
import { connect } from 'react-redux'
import { mapStateToProps } from '../utils';
import styles from '../../styles/MainStyle'
import { Clouds, Alizarin, Turquoise, PeterRiver, Amethyst, Silver, Carrot } from '../../styles/colors';
import QuizAnswer from '../QuizAnswer'
import mainStyle from '../../styles/MainStyle'

const NOT_STARTED = 0
const STARTED = 1
const MAX_ANSWER = 4
const COLOR_COL = [Alizarin, Turquoise, PeterRiver, Amethyst]

const style = StyleSheet.create({
    TextHeader: {
        fontSize: 30
    }
})

function sampleAnswer(answer, times) {
    let x = ""
    for (let i = 0; i < times; i++) {
        x += answer.charAt(Math.random() * answer.length);
    }
    return x;
}

function generateAnswers(correctAnwser, n) {
    let aidx = Math.floor(Math.random() * n)
    const answers = [];
    for (let i = 0; i < n; i++) {
        if (i !== aidx) {
            let maxLen = Math.floor(Math.random() * correctAnwser.length) + 3;
            answers.push(sampleAnswer(correctAnwser, maxLen))
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
            title: `Quiz on ${deck.title}`
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            stage: NOT_STARTED,
            qIndex: 0,
           
        }        
        this.deg = 0;
        this.flip = new Animated.Value(0)
        this.flip.addListener(({v})=>{
            this.deg  = v;
        })

        this.interFront = this.flip.interpolate({
            inputRange:[0,180],
            outputRange:['0deg','180deg']
        })
        this.interBack = this.flip.interpolate({
            inputRange:[0,180],
            outputRange:['180deg','360deg']
        })
    }

    startTest = () => {
        this.setState({
            stage: STARTED
        })
    }

    flipCard = ()=>{    
        if(this.deg >= 180)    
            Animated.spring(this.flip,{toValue:0,friction:8,tension:10,}).start();
        else
        {
            Animated.spring(this.flip,{toValue:180,friction:8,tension:10,}).start();
            debugger;
        }
    }

    render() {
        const { navigation } = this.props;
        const { deck } = navigation.state.params;
        const { stage, qIndex } = this.state;
        let content
        if (stage == NOT_STARTED) {
            content = <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableHighlight
                    style={[styles.FlatStyleButton]}
                    underlayColor={Clouds} onPress={this.startTest}>
                    <Text style={[styles.FlatStyleButtonText, { color: Alizarin }]}>Start Quiz</Text>
                </TouchableHighlight>
            </View>
        }
        else {
            const cCard = deck.questions[qIndex]
            const animFrontStyle = {
                transform:[{rotateY:this.interFront}]
            }
            const animBackStyle = {
                transform:[{rotateY:this.interBack}]
            }
            
            content = (
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ height: "100%" }}>
                        <Animated.View style={[mainStyle.QuizCard, animBackStyle]}>
                            <View>
                                <Text>{cCard.answer}</Text>
                            </View>
                            <View style={{flex:1,flexGrow:1, alignItems:'center',justifyContent:'center'}}>
                                <Button style={{alignSelf: 'center'}}
                                onPress={this.flipCard}
                                color={Alizarin}
                                title="Front"
                                ></Button>
                            </View>
                        </Animated.View>
                        <Animated.View style={[mainStyle.QuizCard, animFrontStyle]}>
                            <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row' }}>
                                <Text style={[style.TextHeader, { color: Carrot }]}>{qIndex + 1}</Text>
                                <Text style={[style.TextHeader, { color: Silver }]}> / </Text>
                                <Text style={[style.TextHeader, { color: Platform.OS === 'ios' ? PeterRiver : Turquoise }]}>{deck.questions.length}</Text>
                            </View>
                            <View style={{ flex: 1, flexGrow: 2, alignItems: 'center' }}>
                                <Text style={{flex:1,flexWrap:'wrap', fontSize: 35, color: Alizarin }}>{cCard.question}</Text>
                            </View>
                            <View style={{borderWidth:1 ,borderColor:"#F0F0F0", flex: 1, flexGrow: 3.5, alignItems: 'stretch', padding: 5 }}>
                                <QuizAnswer answer={cCard.answer} />
                            </View>
                            <View style={{flex:1,flexGrow:1, alignItems:'center',justifyContent:'center'}}>
                                    <Button style={{alignSelf: 'center'}}
                                    onPress={this.flipCard}
                                    color={Alizarin}
                                    title="Back"
                                ></Button>
                            </View>
                        </Animated.View>
                    </View>
                </View>
            )
        }

        return content
    }
}


export default connect(mapStateToProps)(Quiz)