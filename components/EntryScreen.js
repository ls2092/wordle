import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const EntryScreen = ({ onContinue, onLogin, onSignup }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Wordle</Text>
      <Button title="Continue as Guest" onPress={onContinue} />
      <View style={styles.spacer} />
      <Button title="Login" onPress={onLogin} />
      <View style={styles.spacer} />
      <Button title="Sign Up" onPress={onSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center'
  },
  spacer: {
    height: 20
  }
});

export default EntryScreen;
