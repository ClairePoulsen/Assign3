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
        btnColor: 'limegreen',
        playerOrder: [],
        running: false,
        gameOver: false,
    };
}

onGameStart = () => {
    // Add a random number to the Order
    if (!this.state.running) {
        let randNumber = (Math.floor(Math.random() * 100) + 1) % 4;
        this.setState({
            order: [...this.state.order, randNumber],
            running: true,
        });
    }
}

onButtonPress = (number) => {
    if (this.state.running) { // Only add to arrays if the game has started
        
        // Update the Player Order if it's smaller than the Order
        if (this.state.playerOrder.length < this.state.order.length) {
            this.setState({
                playerOrder: [...this.state.playerOrder, number],
            });

            // Compare order and playerOrder
            let matching = true;
            for (var i = 0; i < this.state.playerOrder.length; i++) {
                matching = (this.state.order[i] == this.state.playerOrder[i]);
            }
            console.log(matching);

            // If the player gets the order wrong
            if (!matching) {
                this.setState({
                    gameOver: true,
                    btnText: 'Game Over',
                    btnColor: 'red',
                    success: 'Oh No!',
                    running: false,
                });
            }
        }
    }
}

render() {
    return (
        <View style={styles.container}>
            <Text>{this.state.order}</Text>
            <Text>{this.state.playerOrder}</Text>
            <View style={styles.info}>
                <Text style={styles.instText}>{this.state.success}</Text>
                <Text style={styles.instText}>Current Streak: {this.state.streak}</Text>
            </View>
    
            <View style={styles.btnRow}>
                <Simon color='blue' number={0} callback={this.onButtonPress} />
                <Simon color='limegreen' number={1} callback={this.onButtonPress} />
            </View>
    
            <View style={styles.btnRow}>
                <Simon color='red' number={2} callback={this.onButtonPress} />
                <Simon color='yellow' number={3} callback={this.onButtonPress} />
            </View>
    
            <TouchableOpacity style={[styles.startGame, {backgroundColor: this.state.btnColor}]} onPress={this.onGameStart}>
                <Text style={styles.startText}>{this.state.btnText}</Text>
            </TouchableOpacity>
    
        </View>
    )
}
}