import React from 'react';
import { StyleSheet, Text, View,Button,Platform, Alert ,Picker } from 'react-native';
import {connect} from 'react-redux'

import {importDecks} from '../actions'
import {mapStateToProps} from './utils'
import {Alizarin} from '../styles/colors'

const Times = []
for(i=0;i<24;i++)
    Times.push(i)

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
                    text: "I Agree", onPress: ()=>{this.reset()}
                },
                {
                    text:"Cancel",  onPress:()=>{}
                }
            ]
        )
    }

    render(){
        return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center' }}>
            <Picker style={{width:160}}
                selectedValue={this.props.remindHour}
                onValueChange={(itemValue, itemIndex) =>{ } }>
                {
                    Times.map(x=>{
                        const t = x==0?12:(x<=12?x:(x-12));
                        return <Picker.Item label={`${t} ${x<12?"AM":"PM"}`} value={x} />
                    })
                }
                   
            </Picker>
            <Button style={{alignSelf: 'center'}}
                onPress={this.question}
                color={Alizarin}
                title="Reset Repository"
            ></Button>
        </View>)
    }
}

export default connect(mapStateToProps)(Settings)