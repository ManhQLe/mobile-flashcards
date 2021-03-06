import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Platform, Animated, Button, Picker } from 'react-native';
import { connect } from 'react-redux'
import { mapStateToProps } from '../utils';
import styles from '../../styles/MainStyle'
import { Clouds, Alizarin, Turquoise, PeterRiver, Amethyst, Silver, Carrot, Emerald } from '../../styles/colors';
import QuizAnswer from '../QuizAnswer'
import mainStyle from '../../styles/MainStyle'

const NOT_STARTED = 0
const STARTED = 1
const FINISHED = 2
const MAX_ANSWER = 4
const COLOR_COL = [Alizarin, Turquoise, PeterRiver, Amethyst]

const isIOS = Platform.OS === 'ios' 
const platformColor = isIOS ? PeterRiver : Turquoise


// Reference some idea of how to flip card from https://codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native

const style = StyleSheet.create({
    TextHeader: {
        fontSize: 30
    },
    FlipBntCnt: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 5 },
    QuestionStyle: { flex: 1, flexWrap: 'wrap', fontSize: 30, color: Alizarin },
    AnswerStyle: { justifyContent: 'center', fontSize: 30, color: platformColor },
    ResultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ResultBox: {
        borderWidth: 3,

        padding: 5,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    ResultText: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    StartQuizContainer:{
        padding:10,
        justifyContent:'center'
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
            quizTime:0
        }
        
    }

    initValues(){
        this.cheated = false;
        this.deg = 0;
        this.flip = new Animated.Value(0)
        this.flip.addListener(({ value }) => {
            this.deg = value;
        })
        this.timer = null
        const frontValue = {
            inputRange: [0, 180],
        }
        frontValue.outputRange = isIOS?['0deg', '180deg']:[1,0]

        const backValue = {
            inputRange: [0, 180],
        }
        backValue.outputRange = isIOS?['180deg', '360deg']:[0,1]

        this.interFront = this.flip.interpolate(frontValue)
        this.interBack = this.flip.interpolate(backValue)

    }

    componentWillMount() {
        this.initValues();
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

        this.cheated = true;
    }

    answerPicked = (a) => {

        clearTimeout(this.timer)
        const { navigation,repo } = this.props;
        const { deck } = navigation.state.params;
        let { qIndex, correctAnswer, stage } = this.state;
        const cCard = deck.questions[qIndex]
        qIndex++;
        stage = qIndex === deck.questions.length ? FINISHED : stage        
        correctAnswer += (a === cCard.answer) ? 1 : 0
        this.setState({
            qIndex,
            correctAnswer,
            stage
        })

        repo.removeReminder(deck.id)
    }

    retakeQuiz = () => {
        clearTimeout(this.timer);
        this.timer = null;
        this.initValues();        
        this.setState({
            qIndex: 0,
            correctAnswer: 0,
            stage: NOT_STARTED
        })
    }

    render() {
        const { navigation } = this.props;
        const { deck } = navigation.state.params;
        const { stage, qIndex, quizTime } = this.state;
        let content

        switch (stage) {
            case NOT_STARTED:
                content = <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={style.StartQuizContainer}>
                        <TouchableHighlight
                            style={[styles.FlatStyleButton]}
                            underlayColor={Clouds} onPress={this.startTest}>
                            <Text style={[styles.FlatStyleButtonText, { color: Alizarin }]}>Start Quiz</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={[style.StartQuizContainer,{alignItems:'center'}]}>
                        <Text style={{fontSize:20}}>Challenges</Text>
                        <Text style={{color:platformColor}}>Seconds per quiz</Text>
                    </View>
                    <View style={style.StartQuizContainer}>
                        <Picker style={{width:160}}
                            selectedValue={this.state.quizTime}
                            onValueChange={(itemValue, itemIndex) =>{this.setState({quizTime:itemValue}) } }>
                            <Picker.Item label="Infinite" value={0} />
                            <Picker.Item label="5 seconds" value={5} />
                            <Picker.Item label="10 seconds" value={10} />                        
                        </Picker>
                    </View>
                </View>
                break;

            case STARTED:
                if(quizTime){
                    this.timer = setTimeout(()=>this.answerPicked(null),parseInt(quizTime)*1000);
                }

                const cCard = deck.questions[qIndex]
                const animFrontStyle = { }
   
                isIOS && (animFrontStyle.transform =  [{ rotateY: this.interFront }])
                !isIOS && (animFrontStyle.opacity =  this.interFront)
               
                const animBackStyle = {}
                isIOS && (animBackStyle.transform = [{ rotateY: this.interBack }])
                !isIOS && (animBackStyle.opacity = this.interBack)
                    

                content = (
                    <View style={[{ flex: 1, padding: 5 }]}>
                        <View style={{ height: "90%" }}>
                            <Animated.View style={[mainStyle.QuizCard, animBackStyle, { position: 'absolute' }]}>
                                <View style={{ flex: 1, flexGrow: 9, alignItems: 'center', justifyContent: 'center' }}>
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
                const { correctAnswer } = this.state;
                const {cheated} = this;
                let result;
                if (cheated)
                    result = <View style={[style.ResultBox, { borderColor: Alizarin }]}><Text style={[style.ResultText, { borderColor: Alizarin }]}>Busted on the act :D</Text></View>
                else {
                    const p = correctAnswer / deck.questions.length
                    const pr = Math.round(p * 100)
                    if (p >= 0.8)
                        result = <View style={[style.ResultBox, { borderColor: Emerald }]}><Text style={[style.ResultText, { borderColor: Emerald }]}>{pr}% Passed</Text></View>
                    else
                        result = <View style={[style.ResultBox, { borderColor: Alizarin }]}><Text style={[style.ResultText, { borderColor: Emerald }]}>{pr}% Failed</Text></View>
                }

                content = (
                    <View style={style.ResultContainer}>
                        <View>
                            {result}
                        </View>
                        <View style={{paddingTop:10}}>
                            <Button style={{ alignSelf: 'center'}}
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