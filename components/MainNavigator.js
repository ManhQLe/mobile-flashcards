import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'

import AllDeckView from './views/AllDeckView'
import DeckView from './views/DeckView'
import AddCard from './AddCard';
import QuizView from './views/QuizView';

const MainNav = StackNavigator({
	AllDecks: {
		screen: AllDeckView,
		navigationOptions:{
			title:"Decks"
		}
	},	
	SingleDeck: {
		screen: DeckView		
	},
	AddCard:{
		screen:AddCard
	},
	Quiz:{
		screen: QuizView
	}
})

export default MainNav;