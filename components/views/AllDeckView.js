import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {connect} from 'react-redux'
import {importDecks} from '../actions'
import {mapStateToProps} from './utils'
import styles from '../styles/MainStyle'

class AllDeckView extends React.Component {      

    componentDidMount(){
        const {decks,repo,dispatch} = this.props;
        if(decks.length == 0)
        {
            repo.getDecks()
            .then(data=>dispatch(importDecks(data)))
        }
    }

    compoe

    render(){
        const {decks} = this.props;
        return (
            <View style={styles.AllDeckView}>
                
            </View>
        )
    }
}

export default connect(mapStateToProps)(AllDeckView)