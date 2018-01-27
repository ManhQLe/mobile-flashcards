import React from 'react';
import {Text} from 'react-native'
import {connect} from 'react-redux'
import MainNavigator from './MainNavigator'
import { mapStateToProps } from './utils';
import {importDecks} from '../actions'

class Entry extends React.Component {
    constructor(props){
        super(props)
        this.state={
            loadStatus:0
        }
    }


    componentDidMount(){
        const {decks,repo,dispatch} = this.props;
        debugger;
        if(decks.length == 0)
        {
            repo.getDecks()
            .then(data=>{
                dispatch(importDecks(data))
                this.setState({loadStatus:1})
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