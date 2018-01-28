import React from 'react';
import { StyleSheet, Text, View,TouchableHighlight, Alert } from 'react-native';
import { connect} from 'react-redux'
import { mapStateToProps } from '../utils/index';

import styles from '../../styles/MainStyle'
import { Turquoise, PeterRiver } from '../../styles/colors';

class DeckView extends React.Component {
    static navigationOptions = ({navigation})=>{
        const {deck} = navigation.state.params;
        return {
            title:deck.title
        }
    }

    render(){
        const {navigation} = this.props        
        const {deck} = navigation.state.params
        const {questions} = deck;
        return (
            <View style={styles.DeckView}>
                <View style={{marginTop:50,alignItems:'center'}}>
                    <Text style={styles.DeckViewTitle}>{deck.title}</Text>                
                    <Text style={styles.DeckViewSubTitle}>{questions.length} cards</Text>
                </View>
                <View style={{marginBottom:50,alignItems:'center'}}>
                    <TouchableHighlight style={styles.Button} underlayColor={Turquoise} onPress={()=>Alert.alert("Hi")}>                       
                        <Text style={styles.ButtonText}>Add Card</Text>                      
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps)(DeckView);