import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'

import AllDeckView from './views/AllDeckView'
import DeckView from './views/DeckView'
import AddCard from './AddCard';

const MainNav = StackNavigator({
	AllDecks: {
		screen: AllDeckView,
		navigationOptions:{
			title:"Decks"
		}
	},	
	SingleDeck: {
		screen: DeckView,
		navigationOptions:{		
		}
	},
	AddCard:{
		screen:AddCard
	}
})

export default MainNav;