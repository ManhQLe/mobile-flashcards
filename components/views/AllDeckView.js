import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, FlatList } from 'react-native';
import {FontAwesome,Ionicons} from '@expo/vector-icons'

import {TabNavigator} from 'react-navigation'

import {connect} from 'react-redux'
import {importDecks} from '../../actions'
import {mapStateToProps, iconPrefix} from '../utils'
import styles from '../../styles/MainStyle'
import {Clouds, PeterRiver, Turquoise} from '../../styles/colors'
import AddDeck from '../AddDeck';
import Settings from '../Settings';

function RenderDeck({deck,onNavigate}){
	const questionLabel = `${deck.questions.length} question${deck.questions.length>1?'s':''}`	

	return (
		<TouchableOpacity key={deck.id} onPress={()=>onNavigate(deck)}>
			<View style={styles.DeckCard}>
				<Text style={styles.DeckCardTitle}>{deck.title}</Text>
				<Text style={styles.SpaceGap}></Text>
				<Text style={styles.DeckCardSubTitle}>{questionLabel}</Text>
			</View>
		</TouchableOpacity>
	)
}

function RenderDecks(props){
	const {decks, mainNavigation} = props.screenProps;
	
	function goToDeck(deck){
		mainNavigation.navigate('SingleDeck',deck)
	}

    return (    
		<View style={styles.AllDeckView}>    
        	<FlatList data={decks} renderItem={({item})=> <RenderDeck deck={item} onNavigate={goToDeck}/>}
			keyExtractor={(item) => item.id}
			>           
        </FlatList>
		</View>
    )
}

const Tabs = TabNavigator({
	AllDecks:{
		screen:RenderDecks,
		navigationOptions:{
			tabBarLabel:'All Decks',
			tabBarIcon:({tintColor})=><Ionicons name={`${iconPrefix}-paper`} size={30} color={tintColor}/>
		}
	},
	AddEntry:{
		screen:AddDeck,
		navigationOptions:{
			tabBarLabel:'Add Deck',
			tabBarIcon:({tintColor})=><Ionicons name={`${iconPrefix}-add`} size={40} color={tintColor}/>
		}
    },
    Settings:{
        screen:Settings,
        navigationOptions:{
			tabBarLabel:'Settings',
			tabBarIcon:({tintColor})=><Ionicons name={`${iconPrefix}-settings`} size={40} color={tintColor}/>
		}
    }
}, 

{
	animationEnabled :true,
	tabBarOptions:{
		activeTintColor: Platform.OS==='ios' ? PeterRiver:Clouds,
		style:{
			height:56,
			backgroundColor:Platform.OS=== 'ios'?Clouds:Turquoise,
			shadowColor:'rgba(0,0,0,0.25)',
			shadowOffset:{
				width:0,
				height:3
			},
			shadowRadius:6,
			shadowOpacity:1
		}
	}

})

class AllDeckView extends React.Component {	
    render(){        
		const {decks,navigation} = this.props;
        return <Tabs screenProps={{decks,mainNavigation:navigation}}/>
    }
}

export default connect(mapStateToProps)(AllDeckView)