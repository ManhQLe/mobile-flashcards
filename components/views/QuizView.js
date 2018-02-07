import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Platform, Animated, Button } from 'react-native';
import { connect } from 'react-redux'
import { mapStateToProps } from '../utils';
import styles from '../../styles/MainStyle'
import { Clouds, Alizarin, Turquoise, PeterRiver, Amethyst, Silver, Carrot,Emerald } from '../../styles/colors';
import QuizAnswer from '../QuizAnswer'
import mainStyle from '../../styles/MainStyle'

const NOT_STARTED = 0
const STARTED = 1
const FINISHED = 2
const MAX_ANSWER = 4
const COLOR_COL = [Alizarin, Turquoise, PeterRiver, Amethyst]

const platformColor = Platform.OS === 'ios' ? PeterRiver : Turquoise

const style = StyleSheet.create({
    TextHeader: {
        fontSize: 30
    },
    FlipBntCnt: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 5 },
    QuestionStyle: { flex: 1, flexWrap: 'wrap', fontSize: 30, color: Alizarin },
    AnswerStyle: {justifyContent:'center', fontSize: 30, color: platformColor },
    ResultContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    ResultBox:{        
        borderWidth:3,

        padding:5,
        alignSelf:'center',
        justifyContent:'center'
    },
    ResultText:{
        fontSize:25,
        fontWeight:'bold'    
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
            correctAnswer: 0,
            cheated:false
        }

    }

    componentWillMount() {
        this.deg = 0;
        this.flip = new Animated.Value(0)
        this.flip.addListener(({ value }) => {
            this.deg = value;
        })

        this.interFront = this.flip.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })
        this.interBack = this.flip.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
    }

    startTest = () => {
        this.setState({
            stage: STARTED
        })
    }

    flipCard = () => {
        if (this.deg >= 90)
            Animated.spring(this.flip, { toValue: 0, friction: 8, tension: 10, }).start();
        else {
            Animated.spring(this.flip, { toValue: 180, friction: 8, tension: 10, }).start();
        }
        
        this.setState({cheated:true})
    }

    answerPicked = (a) => {
        const { navigation } = this.props;
        const { deck } = navigation.state.params;
        let { qIndex, correctAnswer,stage } = this.state;
        const cCard = deck.questions[qIndex]
        qIndex++;
        stage = qIndex === deck.questions.length? FINISHED:stage
        correctAnswer += ( a.localeCompare(cCard.answer)==0) ? 1 : 0
        this.setState({
            qIndex,
            correctAnswer,
            stage
        })
    }

    retakeQuiz = ()=>{
        this.setState({
            qIndex:0,
            correctAnswer:0,
            stage:STARTED
        })
    }

    render() {
        const { navigation } = this.props;
        const { deck } = navigation.state.params;
        const { stage, qIndex } = this.state;
        let content

        switch (stage) {
            case NOT_STARTED:
                content = <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableHighlight
                        style={[styles.FlatStyleButton]}
                        underlayColor={Clouds} onPress={this.startTest}>
                        <Text style={[styles.FlatStyleButtonText, { color: Alizarin }]}>Start Quiz</Text>
                    </TouchableHighlight>
                </View>
                break;

            case STARTED:
                const cCard = deck.questions[qIndex]
                const animFrontStyle = {
                    transform: [{ rotateY: this.interFront }]
                }
                const animBackStyle = {
                    transform: [{ rotateY: this.interBack }]
                }

                content = (
                    <View style={[{ flex: 1, padding: 5 }]}>
                        <View style={{ height: "90%" }}>
                            <Animated.View style={[mainStyle.QuizCard, animBackStyle, { position: 'absolute' }]}>
                                <View style={{ flex: 1,flexGrow:9, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={style.AnswerStyle}>{cCard.answer}</Text>
                                </View>
                            </Animated.View>
                            <Animated.View style={[mainStyle.QuizCard, animFrontStyle]}>
                                <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row' }}>
                                    <Text style={[style.TextHeader, { color: Carrot }]}>{qIndex + 1}</Text>
                                    <Text style={[style.TextHeader, { color: Silver }]}> / </Text>
                                    <Text style={[style.TextHeader, { color: platformColor }]}>{deck.questions.length}</Text>
                                </View>
                                <View style={{ flex: 1, flexGrow: 2, alignItems: 'center' }}>
                                    <Text style={style.QuestionStyle}>{cCard.question}</Text>
                                </View>
                                <View style={{ borderWidth: 1, borderColor: "#F0F0F0", flex: 1, flexGrow: 3.5, alignItems: 'stretch', padding: 5 }}>
                                    <QuizAnswer onAnswerPicked={this.answerPicked} answer={cCard.answer} />
                                </View>
                            </Animated.View>
                        </View>
                        <View style={style.FlipBntCnt}>
                            <View style={{ borderColor: platformColor, borderWidth: 3, justifyContent: 'center' }}>
                                <Button style={{ alignSelf: 'center' }}
                                    onPress={this.flipCard}
                                    color={platformColor}
                                    title="Flip Card"
                                ></Button>
                            </View>
                        </View>
                    </View>
                )
                break;
            case FINISHED:
                const {cheated,correctAnswer} = this.state;                
                let result;
                if(cheated)
                    result=<View style={[style.ResultBox,{borderColor:Alizarin}]}><Text style={[style.ResultText,{borderColor:Alizarin}]}>Busted on the act :D</Text></View>
                else
                {
                    const p = correctAnswer/deck.questions.length
                    const pr = Math.round(p*100)
                    if(p>=0.8)
                        result=<View style={[style.ResultBox,{borderColor:Emerald}]}><Text style={[style.ResultText,{borderColor:Emerald}]}>{pr}% Passed</Text></View>
                    else
                        result=<View style={[style.ResultBox,{borderColor:Alizarin}]}><Text style={[style.ResultText,{borderColor:Emerald}]}>{pr}% Failed</Text></View>
                }

                content = (
                    <View style={style.ResultContainer}>
                        <View>                        
                            {result}
                        </View>
                        <View>
                            <Button style={{ alignSelf: 'center' }}
                                onPress={this.retakeQuiz}
                                color={platformColor}
                                title="Retake Quiz"
                            ></Button>
                        </View>
                    </View>
                )
        }

        return content
    }
}




export default connect(mapStateToProps)(Quiz)