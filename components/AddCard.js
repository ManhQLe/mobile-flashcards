import React from 'react';
import { Keyboard, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'

import {addQuestion,importDecks} from '../actions'
import { mapStateToProps, getDeckById } from './utils'
import styles from '../styles/MainStyle'

class AddCard extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params;
        return {
            title:`Add card to ${deck.title}`
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            question: "",
            answer:""
        }
    }

    createCard=()=>{
        const {question,answer} = this.state;
        const {repo,dispatch,decks,navigation} = this.props
        const {deck} = navigation.state.params     
        repo.addQuestionToDeck(deck.id,question,answer)
        .then((q)=>{
            deck.questions.push(q);
            Keyboard.dismiss();
            this.setState({question:"",answer:""})        
            dispatch(importDecks([...decks]))
        })

    }

    render() {
        const {navigation} = this.props;       
        const {deck} = navigation.state.params;

        const {question,answer} = this.state
        const disabled= question.length===0 || answer.length===0
        return (
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>

                <View style={styles.AddCard}>
                    <Text style={styles.SpaceGap20}></Text>
                    <Text style={styles.Label}>Question</Text>
                    
                    <Text style={styles.SpaceGap20}></Text>
                    <TextInput style={styles.Input}
                        onChangeText={t => this.setState({ question:t })}
                        value={question} />

                    <Text style={styles.SpaceGap20}></Text>
                    <Text style={styles.Label}>Answer</Text>
                    
                    <Text style={styles.SpaceGap20}></Text>
                    <TextInput style={styles.Input}
                        onChangeText={t => this.setState({ answer:t })}
                        value={answer} />

                    <Text style={styles.SpaceGap20}></Text>
                    <TouchableOpacity style={disabled?styles.ButtonDisabled:styles.Button}                     
                        disabled={disabled}
                        onPress={this.createCard}
                        >
                        <Text style={styles.ButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default connect(mapStateToProps)(AddCard)