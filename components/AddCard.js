import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {connect} from 'react-redux'
import {mapStateToProps} from './utils'

class AddCard extends React.Component {
    render(){
        return <View>
            <Text>Add Card</Text>
        </View>
    }
}

export default connect(mapStateToProps)(AddCard)