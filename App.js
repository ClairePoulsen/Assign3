import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Keyboard, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import styles from './Style';
import Game from './Game';

const Stack = createNativeStackNavigator();

// Function to dismiss keyboard
const dismissKeyboard = () => {
  Keyboard.dismiss();
}

// Stack of Screens
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" 
          component={Landing}
          options={{ 
            title: 'Simple Simon',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold',
            }
           }}
        />
        <Stack.Screen name="Game"
          component={GameScreen}
          options={
            ({route}) => ({
              title: route.params.name,
              headerTitleAlign: 'center',
            })
          }
        />
        <Stack.Screen name="Game Over" component={GameOver} />
        <Stack.Screen name="Victory" component={Victory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Landing Screen
const Landing = ({navigation}) => {

  const [name, onChangeName] = React.useState('');

  let instructions = 'These will be the instructions';

  navi = (page, name) => {
    page = page;
    name = name;
    // If the user hasn't set a name, send an Alert
    if(name == '') {
      Alert.alert("Who Are You?", "You can't stay Anonymous.");
    } else {
      {navigation.navigate(page, {name: name});};
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Pressable style={styles.container} onPress={dismissKeyboard}>

        {/* Display the instructions */}
        <View style={styles.inst}>
          <Text style={styles.instText}>{instructions}</Text>
        </View>

        {/* Display input for the players name */}
        <View style={styles.input}>
          <TextInput
            style={styles.pName}
            onChangeText={onChangeName}
            value={name}
            placeholder='Player Name'
          />
        </View>

        {/* Display the pressable to navigate to the Game Screen */}
        <Pressable style={styles.startGame} onPress={() => {navi('Game', name)}}>
          <Text style={styles.startText}>Start the Game</Text>
        </Pressable>

      </Pressable>
    </ScrollView>
  )
};

// The Main Game Screen
const GameScreen = ({navigation, route}) => {
  return (
    <Game />
  )
};

// The Game Over Screen
const GameOver = ({navigation, route}) => {};

// The Victory Screen
const Victory = ({navigation, route}) => {};
