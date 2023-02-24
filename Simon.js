import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import styles from './Style';

export default class Simon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: props.number,
            passNumber: props.callback,
        }
    };

    render() {
        return (
            <TouchableOpacity style={[styles.simonBtn, {backgroundColor: this.props.color}]} onPress={() => this.state.passNumber(this.state.number)} />
        );
    }
}