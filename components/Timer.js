import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight,FlatList } from 'react-native';

function elapseTime(total,fx){
    let elapsed = 0
    const granularity = 16.6666
    const call =()=>{
        requestAnimationFrame(()=>{
            elapsed+=granularity
            fx(elapsed)
            elapsed<total&& call();                
        });
    }
    call();
}

class Timer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            elapse:0,            
        }
    }

    componentDidMount(){
        const {totalTime = 0} = this.props
        totalTime && elapseTime(totalTime,(x)=>{
            this.setState({elapse:x})
        })
    }
    
    render(){
        const {elapse} =  this.state
        return <Text>{elapse}</Text>
    }
}