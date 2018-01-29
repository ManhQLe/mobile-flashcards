import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import {connect} from 'react-redux'
import { mapStateToProps } from './utils';
import styles from '../styles/MainStyle'
import { Pumpkin, Clouds, Alizarin } from '../styles/colors';

const NOT_STARTED = 0
const STARTED = 1

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

    render(){
        const { navigation } = this.props;
        const { deck } = navigation.state.params;
        const {stage} = this.state;
        let content
        if(stage == NOT_STARTED){
            content = <View style={{flex:1,justifyContent:'center'}}> 
                <TouchableHighlight  
                    style={[styles.FlatStyleButton]}
                    underlayColor={Clouds} onPress={() => {}}>
                    <Text style={[styles.FlatStyleButtonText,{ color:Alizarin}]}>Start Quiz</Text>
                </TouchableHighlight>
            </View>
        }
        else{
            content = <View></View>
        }

        return content
    }
}


export default connect(mapStateToProps)(Quiz)