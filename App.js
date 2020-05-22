import * as React from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import {decks} from './reducers'
import ConnectedHome from './components'
import ConnectedAddDeck from './components/AddDeck'
import ConnetedDeck from './components/Deck'
import ConnectedAddQuestion from './components/addQuestion'
import ConnectedQuiz from './components/Quiz'
import ConnectedScore from './components/Score'

const Stack = createStackNavigator();

function MyStack() {
  
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ConnectedHome} />
        <Stack.Screen name="Add Deck" component={ConnectedAddDeck} />
  <Stack.Screen name="Deck" component={ConnetedDeck}/>
        <Stack.Screen name="Add Question" component={ConnectedAddQuestion} />
        <Stack.Screen name="Quiz" component={ConnectedQuiz} />
        <Stack.Screen name="Score" component={ConnectedScore}/>
      </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={createStore(decks)}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}