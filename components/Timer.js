import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight,FlatList } from 'react-native';
import { Alizarin } from '../styles/colors';
import PropTypes from 'prop-types'

function elapseTime(total,fx){
    let elapsed = 0
    const granularity = 1000
    const call =()=>{
        setTimeout(()=>{
            elapsed+=granularity
            fx(elapsed)            
            if(elapsed< total)  call();
        },granularity);
    }
    call();
}

export default class Timer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            elapse:0,            
        }
    }

    componentDidMount(){
        const {totalTime = 0} = this.props
        const {onElapse =()=>{}} = this.props;
        totalTime && elapseTime(totalTime* 1000,(x)=>{            
            this.setState({elapse:x})
            onElapse(x);
        })
    }
    
    render(){
        const {elapse} =  this.state
        const {totalTime} = this.props;
        return <Text style={{color:Alizarin}}>{totalTime - elapse/1000}</Text>
    }
    static propTypes ={
        totalTime:PropTypes.number,
        onElapse:PropTypes.func
    }
}