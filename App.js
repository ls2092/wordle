import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LetterCircle from './components/LetterCircle';
import WordBox from './components/WordBox';
import { getValidWords } from './utils/wordUtils';
import EntryScreen from './components/EntryScreen';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import GameScreen from './components/GameScreen'; // ✅ imported GameScreen

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

export default function App() {
  const [screen, setScreen] = useState('entry');
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [letters, setLetters] = useState([]);
  const [validWords, setValidWords] = useState([]);
  const [guesses, setGuesses] = useState([]);

  const generateGame = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const newLetters = Array.from({ length: 5 }, () =>
      alphabet[Math.floor(Math.random() * 26)]
    );
    setLetters(newLetters);

    let words = getValidWords(newLetters);
    if (words.length > 6) {
      words = shuffle(words).slice(0, 6);
    }

    setValidWords(words);
    setGuesses([]);
  };

  useEffect(() => {
    generateGame();
  }, []);

  const handleGuess = (guess) => {
    guess = guess.toLowerCase();

    if (guesses.length >= 6) {
      Alert.alert('Limit reached', 'You have guessed 6 words.');
      return;
    }

    if (!validWords.includes(guess)) {
      Alert.alert('Invalid word', 'That word is not a valid answer.');
    } else if (guesses.includes(guess)) {
      Alert.alert('Already guessed', 'You already guessed that word.');
    } else {
      setGuesses([...guesses, guess]);
    }
  };

  const handleLogin = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      setScreen('game');
    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  const handleSignup = ({ email, password }) => {
    const exists = users.find((u) => u.username === email);
    if (exists) {
      Alert.alert('Username already exists');
    } else {
      const newUser = { username: email, password };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      setScreen('game');
    }
  };

  const handleGuest = () => {
    setCurrentUser({ username: 'Guest', password: '' });
    setScreen('game');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setScreen('entry');
  };

  // Screen Routing
  if (screen === 'entry') {
    return (
      <EntryScreen
        onLogin={() => setScreen('login')}
        onSignup={() => setScreen('signup')}
        onContinue={handleGuest}
      />
    );
  }

  if (screen === 'login') {
    return <LoginForm onLogin={handleLogin} onBack={() => setScreen('entry')} />;
  }

  if (screen === 'signup') {
    return <SignupForm onSignup={handleSignup} onBack={() => setScreen('entry')} />;
  }

  if (screen ==='welcome') {
    return (
      <View style={styles.welcomeScreen}>
        <Text style={styles.welcomeText}>Welcome {currentUser?.username} || {currentUser?.email} || 'Guest' to the Game!</Text>
      </View>
    )
  }
  
  if (screen === 'game') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.inner}>
          <GameScreen
            user={currentUser}
            letters={letters}
            validWords={validWords}
            guesses={guesses}
            onGuess={handleGuess}
            onNewGame={generateGame}
            onLogout={handleLogout}
            onBack={handleBack}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    padding: 20,
    justifyContent: 'center',
  },
  welcomeScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef2f3',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});