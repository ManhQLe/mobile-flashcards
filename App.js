import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {Ionicons} from '@expo/vector-icons'

import {getRepository} from './repository'

import MainNavigator from './components/MainNavigator'
import AllDeckView from './components/AllDeckView'

export default class App extends React.Component {

	
    componentDidMount(){

        const repo = getRepository();
        repo.getDecks().then(decks=>{
			console.log(decks);
        })
    }

	render() {
		return (
			<View style={styles.container}>				
				<MainNavigator/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1		
	},
});
