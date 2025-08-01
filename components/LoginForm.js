import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const LoginForm = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    onLogin(email, password);
  };

  return (
    <View style={styles.container}>
      {/* Back Button at top-left */}
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
       
        <Text style={styles.backText}>←</Text>
        
      </TouchableOpacity>

      <Text style={styles.heading}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert("Redirect to forgot password screen")}>
        <Text style={styles.link}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center'
  },
  backButton: {
    position: 'absolute',
    top: 35, 
    left: 10,
    zIndex: 1,
    padding: 10
  },
  backText: {
    fontSize: 24,
    color: '#000'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline'
  }
});

export default LoginForm;
