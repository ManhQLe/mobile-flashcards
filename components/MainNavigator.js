import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import AllDeckView from './AllDeckView'
import DeckView from './DeckView'
import styles from '../styles/MainStyle'

const Home = ({ navigation }) => (
	<View style={styles.AllDeckView}>
		<Text>This is the Home view</Text>
	</View>
);

const MainNav = StackNavigator({
	AllDecks: {
		screen: AllDeckView,
		navigationOptions:{
			title:"All Decks"
		}
	},	
	SingleDeck: {
		screen: DeckView,
		navigationOptions:{
			title:"Deck View",
			headerTintColor:"black",

		}
	}
})

export default MainNav;