import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import {FontAwesome,Ionicons} from '@expo/vector-icons'

import {TabNavigator} from 'react-navigation'

import {connect} from 'react-redux'
import {importDecks} from '../../actions'
import {mapStateToProps} from '../utils'
import styles from '../../styles/MainStyle'
import {Clouds, PeterRiver, Turquoise} from '../../styles/colors'
import AddDeck from '../AddDeck';

function RenderDecks(props){
    const {decks} = props.screenProps.decks;
    
    return (
        
        <View style={styles.AllDeckView}>
            {/* {
                decks.map(d=>{
                    <View style={styles.DeckCard}>
                        <Text>d.title</Text>
                    </View>
                })
            } */}
        </View>
    )
}

const Tabs = TabNavigator({
	AllDecks:{
		screen:RenderDecks,
		navigationOptions:{
			tabBarLabel:'All Decks',
			tabBarIcon:({tintColor})=><FontAwesome name='cards' size={30} color={tintColor}/>
		}
	},
	AddEntry:{
		screen:AddDeck,
		navigationOptions:{
			tabBarLabel:'Add Deck',
			tabBarIcon:({tintColor})=><Ionicons name='ios-add' size={40} color={tintColor}/>
		}
	}
}, 

{
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

    componentDidMount(){
        const {decks,repo,dispatch} = this.props;
        if(decks.length == 0)
        {
            repo.getDecks()
            .then(data=>dispatch(importDecks(data)))
        }
    }
    render(){        
        const {decks} = this.props;
        return <Tabs screenProps={{decks}}/>
    }
}

export default connect(mapStateToProps)(AllDeckView)