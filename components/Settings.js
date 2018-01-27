import React from 'react';
import { StyleSheet, Text, View,Button,Platform, Alert  } from 'react-native';
import {connect} from 'react-redux'

import {importDecks} from '../actions'
import {mapStateToProps} from './utils'
import {Alizarin} from '../styles/colors'

class Settings extends React.Component {    
    reset(){
        const {dispatch, repo,navigation} = this.props;
        repo.clearData()
        .then(()=>{
            dispatch(importDecks([]))
            navigation.navigate("AllDecks")
        })
    }

    question =()=>{        
        Alert.alert(
            "Are you sure?",
            "This action will clear all current data stored in this app",
            [
                {
                    text: "I agree", onPress: ()=>{this.reset()}
                },
                {
                    text:"Cancel",  onPress:()=>{}
                }                
            ]
        )
    }

    render(){
        return <View style={{flex:1,alignContent:'center',justifyContent:'center' }}>
            <Button
                onPress={this.question}
                color={Alizarin}
                title="Reset Repository"
            ></Button>
        </View>
    }
}

export default connect(mapStateToProps)(Settings)