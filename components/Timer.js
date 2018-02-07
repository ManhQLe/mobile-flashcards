import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight,FlatList } from 'react-native';

function elapse(total,fx){
    let elapsed = 0
    const granularity = 100
    const call =()=>{
        setTimeout(()=>{
            elapsed+=granularity
            fx(elapsed)
            elapsed<total&& call();                
        },granularity);
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
        
    }
    
    render(){

    }
}