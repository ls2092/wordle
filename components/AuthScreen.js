import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AuthScreen = ({ onLogin }) => {
  const mockUser = { email: 'demo@example.com' };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <Button title="Continue as Guest" onPress={() => onLogin(mockUser)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
});

export default AuthScreen;
