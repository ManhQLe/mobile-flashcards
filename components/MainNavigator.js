import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import AllDeckView from './AllDeckView'
import DeckView from './DeckView'

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
		}
	}
})

export default MainNav;