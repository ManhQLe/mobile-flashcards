import React from 'react';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import {Ionicons} from '@expo/vector-icons'


import MainNavigator from './components/MainNavigator'
import reducer from './reducers'


export default class App extends React.Component {

	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View style={styles.container}>				
					<MainNavigator/>
				</View>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
});
