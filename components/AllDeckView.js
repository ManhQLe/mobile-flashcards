import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import repository from '../repository'
import styles from '../styles/MainStyle'
export default class AllDeckView extends React.Component {
    render(){
        return (
            <View style={styles.AllDeckView}>
                <Text>All Decks</Text>
            </View>
        )
    }
}