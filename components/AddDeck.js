import React from 'react';
import { Keyboard, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux'

import {addDeck} from '../actions'
import { mapStateToProps } from './utils'
import styles from '../styles/MainStyle'

class AddDeck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    createDeck=()=>{
        const {text} = this.state;
        const {repo,dispatch,navigation} = this.props
        repo.createDeck(text)
        .then((deck)=>{
            dispatch(addDeck(deck))
                        
        })
    }

    render() {
        const {text} = this.state
        const disabled= text.length===0
        return (
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>

                <View style={styles.AddCard}>
                    <Text style={styles.Label}>Enter deck title</Text>
                    <Text style={styles.SpaceGap}></Text>
                    <TextInput style={styles.Input}
                        onChangeText={t => this.setState({ text:t })}
                        value={text} />
                    <Text style={styles.SpaceGap}></Text>
                    <TouchableOpacity style={disabled?styles.ButtonDisabled:styles.Button}                     
                        disabled={disabled}
                        onPress={this.createDeck}
                        >
                        <Text style={styles.ButtonText}>Create Deck</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default connect(mapStateToProps)(AddDeck)