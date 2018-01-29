import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {connect} from 'react-redux'
import { mapStateToProps } from './utils';

class Quiz extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params;
        return {
            title:`Quiz on ${deck.title}`
        }
    }

    constructor(props){
        super(props)
        
    }

    render(){
        return (
            <View>
                <Text>Quiz</Text>
            </View>
        )            
    }
}


export default connect(mapStateToProps)(Quiz)