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
            counter: 0,
        };
    }

    // Create the array of random numbers
    componentDidMount() {
        this.fillArray();
    }

    fillArray = () => {
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
    mainButton = () => {
        const {navigation} = this.props;
        if (!this.state.running && !this.state.gameOver && (this.state.streak < 10)) {
            // Player starts a new round
            this.timerID = setInterval(
                () => this.tick(), 500
            );
            this.setState({
                btnText: 'Pay Attention',
                success: '',
            });
        } else if (!this.state.running && this.state.gameOver) {
            // Player has lost
            {navigation.navigate('GameOver', {playerStreak: this.state.streak, correctOrder: this.state.order});};
            this.setState({
                streak: 0,
                success: '',
                playerOrder: [],
            });
            this.fillArray();
        } else if (this.state.streak == 10) {
            // Player has won
        }
    }

    // Flash the buttons in order
    tick() {
        if (this.state.counter < this.state.streak + 1) {
            switch(this.state.order[this.state.counter]) {

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
            this.setState({ counter: this.state.counter + 1 });
        } else if (this.state.counter > this.state.streak) {
            clearInterval(this.timerID);
            this.setState({
                counter: 0,
                btnText: "Your Turn",
                btnColor: 'blue',
                running: true,
            });
        }
    }

    // Player presses their buttons
    onButtonPress = (number) => {
        if (this.state.running) {
            if (this.state.playerOrder.length < this.state.streak + 1) {
                this.setState({
                    playerOrder: [...this.state.playerOrder, number],
                });
            }
            // I find it kind of ridiculous that there's a miniscule delay in
            // setting state variables, but setting a Timeout fixes things
            setTimeout(() => {
                this.checkOrder();
            });
        }
    }

    // Check player order against correct order
    checkOrder = () => {
        let match = true;
        for (let i = 0; i < this.state.playerOrder.length; i++) {
            match = match && (this.state.playerOrder[i] == this.state.order[i]);
        }
        if (!match) {
            this.setState ({
                success: 'You messed up',
                running: false,
                btnText: 'Game Over',
                btnColor: 'red',
                gameOver: true,
            });
        }
        if (match && (this.state.playerOrder.length == this.state.streak + 1)) {
            this.setState({
                success: 'Success',
                streak: this.state.streak + 1,
                playerOrder: [],
                btnText: "I'm Ready",
                btnColor: 'limegreen',
                running: false,
            });
        }
        if (match && (this.state.streak == 10)) {
            this.setState({
                btnText: 'See Stats',
                success: 'You Won!!!',
                running: false,
            })
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
                    <Simon color={this.state.simonColor0} number={0} callback={this.onButtonPress} />
                    <Simon color={this.state.simonColor1} number={1} callback={this.onButtonPress} />
                </View>
        
                <View style={styles.btnRow}>
                    <Simon color={this.state.simonColor2} number={2} callback={this.onButtonPress} />
                    <Simon color={this.state.simonColor3} number={3} callback={this.onButtonPress} />
                </View>
        
                <TouchableOpacity style={[styles.startGame, {backgroundColor: this.state.btnColor}]} onPress={this.mainButton}>
                    <Text style={styles.startText}>{this.state.btnText}</Text>
                </TouchableOpacity>
        
            </View>
        )
    }
}