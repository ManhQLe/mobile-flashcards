import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { connect } from 'react-redux'
import { mapStateToProps} from '../utils/index';

import styles from '../../styles/MainStyle'
import { Turquoise, PeterRiver } from '../../styles/colors';

class DeckView extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params;
        return {
            title: deck.title
        }
    }

    goToAddCard=()=>{
        const { navigation } = this.props
        const { deck } = navigation.state.params        
        const back = navigation.goBack;
        navigation.navigate("AddCard",{deck})
    }

    render() {
        const { navigation } = this.props
        const {deck} = navigation.state.params
        const { questions } = deck;
        console.log(questions.length)
        return (
            <View style={styles.DeckView}>
                <View style={{ marginTop: 50, alignItems: 'center' }}>
                    <Text style={styles.DeckViewTitle}>{deck.title}</Text>
                    <Text style={styles.DeckViewSubTitle}>{questions.length} cards</Text>
                </View>
                <View style={{ justifyContent: 'space-between', flex: 1, flexDirection: 'row' }}>
                    <TouchableHighlight style={[styles.Button, { flexGrow: 1 }]} 
                        underlayColor={Turquoise} onPress={this.goToAddCard}>
                        <Text style={styles.ButtonText}>Add Card</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.Button, styles.ButtonTakeQuiz, { flexGrow: 1 }]} underlayColor={Turquoise} onPress={() => Alert.alert("Hi")}>
                        <Text style={[styles.ButtonText, styles.ButtonTextQuiz]}>Take Quiz</Text>
                    </TouchableHighlight>
                </View>
                <View>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps)(DeckView);