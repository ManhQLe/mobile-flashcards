import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {Ionicons} from '@expo/vector-icons'
import MainNavigator from './components/MainNavigator'


export default class App extends React.Component {
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
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
