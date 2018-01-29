import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { mapStateToProps } from '../utils/index';

import styles from '../../styles/MainStyle'
import { Turquoise, PeterRiver, Alizarin, Emerald, WetAsphalt, Clouds, Amethyst ,Silver} from '../../styles/colors';

const qStyles = StyleSheet.create({
    Letter: {
        fontSize: 20,
        margin: 5
    },
    QLetter: {
        color: Alizarin,
    },
    ALetter: {
        color: Emerald,
    },
    Row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

function RenderQuestion(props) {
    const { question } = props
    return (
        <View style={[styles.DeckCard, { alignItems: 'flex-start' }]}>
            <View style={qStyles.Row}>
                <Text style={[qStyles.Letter, qStyles.QLetter]}>Q</Text>
                <Text>{question.question}</Text>
            </View>
            <View style={qStyles.Row}>
                <Text style={[qStyles.Letter, qStyles.ALetter]}>A</Text>
                <Text>{question.answer}</Text>
            </View>
        </View>
    )
}


class DeckView extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params;
        return {
            title: deck.title
        }
    }

    goTo = (view) => {
        const { navigation } = this.props
        const { deck } = navigation.state.params
        const back = navigation.goBack;
        navigation.navigate(view, { deck })
    }



    render() {
        const { navigation } = this.props
        const { deck } = navigation.state.params
        const { questions } = deck;
        const canTakeQuiz = questions.length 
        const questionsList = canTakeQuiz            
            ? <View style={{ flex: 1, flexGrow: 3, justifyContent: 'flex-start', alignItems: 'stretch' }}>
                
                <FlatList data={deck.questions}
                    renderItem={({ item }) => <RenderQuestion question={item} />}
                    keyExtractor={(item) => item.id}
                >
                </FlatList>
            </View>
            : <View></View>
 
        return (
            <View style={styles.DeckView}>
                <View style={{ alignItems: 'center', flexGrow: 0 }}>
                    <Text style={styles.DeckViewTitle}>{deck.title}</Text>
                    <Text style={styles.DeckViewSubTitle}>{questions.length} cards</Text>
                </View>
                <View style={[qStyles.Row, { justifyContent: 'space-around', flexGrow: 1 }]}>
                    <TouchableHighlight style={[styles.FlatStyleButton]}
                        underlayColor={Clouds} onPress={() => this.goTo("AddCard")}>
                        <Text style={[styles.FlatStyleButtonText, { color: Turquoise }]}>Add Card</Text>
                    </TouchableHighlight>
                    <TouchableHighlight disabled={!canTakeQuiz} 
                        style={[canTakeQuiz?styles.FlatStyleButton:styles.FlatStyleButtonDisabled]}
                        underlayColor={Clouds} onPress={() => this.goTo("Quiz")}>
                        <Text style={[styles.FlatStyleButtonText,{ color: canTakeQuiz?Amethyst:Silver }]}>Take Quiz</Text>
                    </TouchableHighlight>
                </View>
                {
                    questionsList
                }
            </View>
        )
    }
}

export default connect(mapStateToProps)(DeckView);