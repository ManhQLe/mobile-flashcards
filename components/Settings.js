import React from 'react';
import { StyleSheet, Text, View,Button,Platform  } from 'react-native';
import {connect} from 'react-redux'
import {mapStateToProps} from './utils'
import {Alizarin} from '../styles/colors'

class Settings extends React.Component {
    render(){
        return <View>
            <Button
                color={Alizarin}
                title="Reset Clear Repository"
            ></Button>
        </View>
    }
}

export default connect(mapStateToProps)(Settings)