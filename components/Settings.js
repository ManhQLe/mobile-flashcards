import React from 'react';
import { StyleSheet, Text, View,Button,Platform, Alert ,Picker} from 'react-native';
import {connect} from 'react-redux'
import {changeRemindHour} from '../actions'
import {importDecks} from '../actions'
import {mapStateToProps} from './utils'
import {Alizarin} from '../styles/colors'
import {Permissions,Notifications} from 'expo'

const Times = []
for(i=0;i<24;i++)
    Times.push(i)

class Settings extends React.Component {   
    constructor(props){
        super(props)
        this.state ={
            allowedNotification:false,
            hour:null
        }
    }
    
    reset(){
        const {dispatch, repo,navigation} = this.props;
        Notifications.cancelAllScheduledNotificationsAsync();
        repo.clearData()
        .then(()=>{
            dispatch(importDecks([]))
            navigation.navigate("AllDecks")
            this.setState({hour:null})
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

    reminderHourChanged = (itemValue, itemIndex)=>{
        this.setState({hour:itemValue})
        const {repo,dispatch} = this.props;
        repo.saveReminderHour(itemValue)
        .then(()=>{
           
            dispatch(changeRemindHour(itemValue))            
        })
        .catch(ex=>{            
            console.log(ex)
        })
    }

    componentDidMount(){
        Permissions.askAsync(Permissions.NOTIFICATIONS)    
        .then(({status})=>{
            this.setState({allowedNotification:status==='granted'})
        })    
        .catch(ex=>{
            this.setState({allowedNotification:false})
        })  
    }

    render(){
        let {repo,remindHour} = this.props;
        const {allowedNotification} = this.state;
        const {hour} = this.state;
        hour !==null && (remindHour = hour)
        return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center' }}> 
            {
                !allowedNotification && <Text style={{color:Alizarin}}>Please allow notification for your daily reminder :)</Text>
            }           
            <Text>Reminder time:</Text>
            <Picker style={{width:160}}
                selectedValue={remindHour}
                onValueChange={this.reminderHourChanged}>
                {
                    Times.map(x=>{
                        const t = x==0?12:(x<=12?x:(x-12));
                        return <Picker.Item key={x} label={`${t} ${x<12?"AM":"PM"}`} value={x} />
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