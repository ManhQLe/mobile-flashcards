import React from 'react';
import { StyleSheet, Text, View,Button,Platform  } from 'react-native';
import {connect} from 'react-redux'
import {mapStateToProps} from './utils'
import {Alizarin} from '../styles/colors'

class Settings extends React.Component {
    render(){
        return <View style={{flex:1,alignContent:'center',justifyContent:'center' }}>
            <Button
                onPress={()=>{}}
                color={Alizarin}
                title="Reset Repository"
            ></Button>
        </View>
    }
}

export default connect(mapStateToProps)(Settings)