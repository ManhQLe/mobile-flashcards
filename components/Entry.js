import React from 'react';
import {Text, Alert} from 'react-native'
import {connect} from 'react-redux'
import MainNavigator from './MainNavigator'
import { mapStateToProps } from './utils';
import {importDecks, changeRemindHour} from '../actions'
import {Notifications,Permissions} from 'expo'


class Entry extends React.Component {
    constructor(props){
        super(props)
        this.state={
            loadStatus:0
        }
    }

    componentDidMount(){
        const {decks,repo,dispatch} = this.props;
        if(decks.length == 0)
        {
            Promise.all([repo.getReminderHour(),repo.getDecks()])
            .then(([hour,data])=>{               
                dispatch(importDecks(data))
                hour!==null && hour!== undefined && dispatch(changeRemindHour(hour))
                this.setState({loadStatus:1})                
            })
            .catch(ex=>{
                console.log(ex);
            })
        }
        else
        {
            this.setState({loadStatus:1})
        }        
    }
    
    render(){
        const {loadStatus} = this.state
        if(loadStatus === 0 )
            return <Text>Please wait...</Text>
        else        
            return <MainNavigator/>
    }
}

export default connect(mapStateToProps)(Entry)