import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ExamListScreen from '../screens/ExamListScreen';
import QuestionScreen from '../screens/QuestionScreen';
import ScoreScreen from '../screens/ScoreScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, gestureEnabled: false }}
        initialRouteName="ExamList"
      >
        <Stack.Screen name="ExamList" component={ExamListScreen} />
        <Stack.Screen name="Question" component={QuestionScreen} />
        <Stack.Screen name="Score" component={ScoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
