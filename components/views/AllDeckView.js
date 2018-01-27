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

function RenderDeck({item}){
	return (
		<TouchableOpacity key={item.id}>
			<View style={styles.DeckCard}>
				<Text style={styles.DeckCardTitle}>{item.title}</Text>
			</View>
		</TouchableOpacity>
	)
}

function RenderDecks(props){
	const {decks} = props.screenProps;
    return (    
		<View style={styles.AllDeckView}>    
        	<FlatList data={decks} renderItem={RenderDeck}
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
		const {decks} = this.props;
        return <Tabs screenProps={{decks}}/>
    }
}

export default connect(mapStateToProps)(AllDeckView)