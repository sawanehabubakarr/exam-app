import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ExamProvider } from './src/context/ExamContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ExamProvider>
      <StatusBar style="dark" />
      <AppNavigator />
    </ExamProvider>
  );
}
