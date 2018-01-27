import React from 'react';

import {connect} from 'react-redux'
import MainNavigator from './MainNavigator'
import { mapStateToProps } from './utils';
import {importDecks} from '../actions'

class Entry extends React.Component {
    
    componentDidMount(){
        const {decks,repo,dispatch} = this.props;
        if(decks.length == 0)
        {
            repo.getDecks()
            .then(data=>dispatch(importDecks(data)))
        }
    }
    
    render(){
        return <MainNavigator/>
    }
}

export default connect(mapStateToProps)(Entry)