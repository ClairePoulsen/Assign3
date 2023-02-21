import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Simon from './Simon';
import styles from './Style';

export default class Game extends Component {
constructor(props) {
    super(props);
    this.state = {
        success: '',
        streak: 0,
        order: [],
        btnText: "I'm Ready",
    };
}

initArray = () => {
    console.log('----New List----');
    let newOrder = [];
    // Create an array of 10 random numbers between 0-3
    for (var i = 0; i < 10; i++) {
        //Create a random number between 0-3
        let number = (Math.floor(Math.random() * 100) + 1) % 4;
        // console.log(number);
        // Put the random number in to the array
        newOrder = [...newOrder, number];
        console.log(newOrder);
    }
    this.setState({
        order: newOrder,
    });
    console.log(this.state.order);
}

render() {
    return (
        <View style={styles.container}>
    
            <View style={styles.info}>
                <Text style={styles.instText}>{this.state.success}</Text>
                <Text style={styles.instText}>Current Streak: {this.state.streak}</Text>
            </View>
    
            <View style={styles.btnRow}>
                <Simon color='blue' />
                <Simon color='limegreen' />
            </View>
    
            <View style={styles.btnRow}>
                <Simon color='red' />
                <Simon color='yellow' />
            </View>
    
            <TouchableOpacity style={styles.startGame} onPress={() => this.initArray()}>
                <Text style={styles.startText}>{this.state.btnText}</Text>
            </TouchableOpacity>
    
        </View>
    )
}
}