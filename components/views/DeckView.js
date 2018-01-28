import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect} from 'react-redux'
import { mapStateToProps } from '../utils/index';

import styles from '../../styles/MainStyle'

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
        return (
            <View style={styles.DeckView}>
                <Text>{deck.title}</Text>
            </View>
        )
    }
}

export default connect(mapStateToProps)(DeckView);