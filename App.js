import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Image, Keyboard, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
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
        <Stack.Screen name="GameOver"
          component={GameOver}
          options={
            ({route}) => ({
              title: 'Game Over',
              headerTitleAlign: 'center',
            })
          }
        />
        <Stack.Screen name="Victory"
          component={Victory}
          options={
            ({route}) => ({
              title: 'Congratulations!',
              headerTitleAlign: 'center',
            })
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Landing Screen
const Landing = ({navigation}) => {

  const [name, onChangeName] = React.useState('');
  // Shamelessly stealing my own code from Assign2
  const [diffMod, changeDiff] = React.useState(5);
  const [color1, changeColor1] = React.useState('black');
  const [color2, changeColor2] = React.useState('lightgrey');
  const [color3, changeColor3] = React.useState('lightgrey');

  let instructions = 'A simple game of Simon Says. Press the buttons in the order they flash to win the game!';

  navi = (page, name, diffMod) => {
    page = page;
    name = name;
    diffMod = diffMod;
    // If the user hasn't set a name, send an Alert
    if(name == '') {
      Alert.alert("Who Are You?", "You can't stay Anonymous.");
    } else {
      {navigation.navigate(page, {name: name, diffMod: diffMod,});};
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

        {/* Display the difficulty selectors */}
        {/* Once again, shamelessly stealing code from Assign2 */}
        <View style={styles.btnRow}>

          <Pressable
            style={[{borderColor: color1}, styles.difficulty]}
            onPress={() => {changeDiff(5),
            changeColor1('black'),
            changeColor2('lightgrey'),
            changeColor3('lightgrey')}}>
            <Text>Easy</Text>
          </Pressable>

          <Pressable
            style={[{borderColor: color2}, styles.difficulty]}
            onPress={() => {changeDiff(10),
            changeColor1('lightgrey'),
            changeColor2('black'),
            changeColor3('lightgrey')}}>
            <Text>Hard</Text>
          </Pressable>

          <Pressable
            style={[{borderColor: color3}, styles.difficulty]}
            onPress={() => {changeDiff(100),
            changeColor1('lightgrey'),
            changeColor2('lightgrey'),
            changeColor3('black')}}>
            <Text>Extreme</Text>
          </Pressable>

        </View>

        {/* Display the pressable to navigate to the Game Screen */}
        <Pressable style={styles.startGame} onPress={() => {navi('Game', name, diffMod)}}>
          <Text style={styles.startText}>Start the Game</Text>
        </Pressable>

      </Pressable>
    </ScrollView>
  )
};

// The Main Game Screen
const GameScreen = ({navigation, route}) => {

  let name = route.params.name;
  let diffMod = route.params.diffMod;
  return (
    <Game navigation={navigation} name={name} diffMod={diffMod}/>
  )
};

// The Game Over Screen
const GameOver = ({navigation, route}) => {
  let streak = route.params.playerStreak;
  let order = route.params.correctOrder;
  let colorOrder = [];
  let name = route.params.name;
  let diff = route.params.diff;
  let mode = '';

  if (diff == 5) {
    mode = 'Easy';
  } else if (diff == 10) {
    mode = 'Hard';
  } else if (diff == 100) {
    mode = 'Extreme';
  };

  // Convert the array to text
  for (let i = 0; i < streak + 1; i++) {
    switch (order[i]) {
      case 0:
        if (i < order.length - 1) {
          colorOrder[i] = 'Blue, ';
        } else {
          colorOrder[i] = 'Blue';
        }
        break;
      case 1:
        if (i < order.length - 1) {
          colorOrder[i] = 'Green, ';
        } else {
          colorOrder[i] = 'Green';
        }
        break;
      case 2:
        if (i < order.length - 1) {
          colorOrder[i] = 'Red, ';
        } else {
          colorOrder[i] = 'Red';
        }
        break;
      case 3:
        if (i < order.length - 1) {
          colorOrder[i] = 'Yellow, ';
        } else {
          colorOrder[i] = 'Yellow';
        }
        break;
    }
  }

  return (
    <View style={styles.container}>
      {/* LOSS */}
      <Text style={styles.stats}>You Lost On {mode} Mode.</Text>
      {/* CURRENT STREAK */}
      <Text style={styles.stats}>Your Streak Was: {streak} Rounds</Text>
      {/* CORRECT SEQUENCE */}
      <Text style={styles.stats}>The Correct Order Was:</Text>
      <Text style={styles.stats}>{colorOrder}</Text>
      {/* RESTART PRESSABLE */}
      <Pressable style={styles.startGame} onPress={() => {navi('Landing', name)}}>
        <Text style={styles.startText}>Try Again</Text>
      </Pressable>
    </View>
  )
};

// The Victory Screen
const Victory = ({navigation, route}) => {
  let streak = route.params.playerStreak;
  let name = route.params.name;
  let celebrate = {uri: 'https://cdn.shopify.com/s/files/1/1061/1924/products/4_1024x1024.png?v=1571606116'};
  let diff = route.params.diff;
  let mode = '';

  if (diff == 5) {
    mode = 'Easy';
  } else if (diff == 10) {
    mode = 'Hard';
  } else if (diff == 100) {
    mode = 'Extreme';
  };

  return (
    <View style={styles.container}>
      {/* WIN */}
      <Text style={styles.stats}>You Won On {mode} Mode!</Text>
      {/* CURRENT STREAK */}
      <Text style={styles.stats}>Your Streak Was: {streak} Rounds!</Text>
      {/* CELEBRATION EMOJI */}
      <Image source={celebrate} style={styles.celebrate} />
      {/* RESTART PRESSABLE */}
      <Pressable style={styles.startGame} onPress={() => {navi('Landing', name)}}>
        <Text style={styles.startText}>Play Again</Text>
      </Pressable>
    </View>
  )
};
