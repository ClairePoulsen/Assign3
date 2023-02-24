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
        simonColor0: 'blue',
        simonColor1: 'limegreen',
        simonColor2: 'red',
        simonColor3: 'yellow',
        durationMS: 250,
    };
}

// Create the array of random numbers
componentDidMount() {
    let newOrder = [];
    for (let i = 0; i < 10; i++) {
        let randNumber = (Math.floor(Math.random() * 100) + 1) % 4;
        newOrder = [...newOrder, randNumber];
    }
    this.setState({
        order: newOrder,
    });
}

// Player starts the game
onGameStart = () => {
    this.timerID = setInterval(
        () => this.tick(), 500
    );
}

// Flash the buttons in order
/*
* TODO: Change the conditions of the flash so that it can flash a partial array
*/
tick() {
    if (this.state.streak < this.state.order.length) {
        switch(this.state.order[this.state.streak]) {

            case 0:
                setTimeout(() => {
                    this.setState({ simonColor0: 'white' });
                    setTimeout(() => {
                        this.setState({ simonColor0: 'blue' });
                    }, this.state.durationMS);
                }, this.state.durationMS);
                break;

            case 1:
                setTimeout(() => {
                    this.setState({ simonColor1: 'white' });
                    setTimeout(() => {
                        this.setState({ simonColor1: 'limegreen' });
                    }, this.state.durationMS);
                }, this.state.durationMS);
                break;

            case 2:
                setTimeout(() => {
                    this.setState({ simonColor2: 'white' });
                    setTimeout(() => {
                        this.setState({ simonColor2: 'red' });
                    }, this.state.durationMS);
                }, this.state.durationMS);
                break;

            case 3:
                setTimeout(() => {
                    this.setState({ simonColor3: 'white' });
                    setTimeout(() => {
                        this.setState({ simonColor3: 'yellow' });
                    }, this.state.durationMS);
                }, this.state.durationMS);
                break;
        }
    }
    clearInterval(this.timerID);
}

// Player presses their buttons
onButtonPress = (number) => {
    if (this.state.playerOrder.length < this.state.order.length) {
        this.setState({
            playerOrder: [...this.state.playerOrder, number],
        });
        this.checkOrder();
    }
}

// Check player order against correct order
/*
* TODO: Figure out why it doesn't register false until the press after
*       the wrong one
*/
checkOrder = () => {
    let match = true;
    for (let i = 0; i < this.state.playerOrder.length; ++i) {
        match = match && (this.state.playerOrder[i] == this.state.order[i]);
    }
}

render() {
    return (
        <View style={styles.container}>
            <Text>Order: {this.state.order}</Text>
            <Text>Player Order: {this.state.playerOrder}</Text>
            <View style={styles.info}>
                <Text style={styles.instText}>{this.state.success}</Text>
                <Text style={styles.instText}>Current Streak: {this.state.streak}</Text>
            </View>
    
            <View style={styles.btnRow}>
                <Simon color={this.state.simonColor0} number={0} order={this.state.order} callback={this.onButtonPress} />
                <Simon color={this.state.simonColor1} number={1} order={this.state.order} callback={this.onButtonPress} />
            </View>
    
            <View style={styles.btnRow}>
                <Simon color={this.state.simonColor2} number={2} order={this.state.order} callback={this.onButtonPress} />
                <Simon color={this.state.simonColor3} number={3} order={this.state.order} callback={this.onButtonPress} />
            </View>
    
            <TouchableOpacity style={[styles.startGame, {backgroundColor: this.state.btnColor}]} onPress={this.onGameStart}>
                <Text style={styles.startText}>{this.state.btnText}</Text>
            </TouchableOpacity>
    
        </View>
    )
}
}