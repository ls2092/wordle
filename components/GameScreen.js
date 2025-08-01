import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import WordBox from './WordBox';
import LetterCircle from './LetterCircle';
import { Ionicons } from '@expo/vector-icons';

const GameScreen = ({
  user,
  letters,
  validWords,
  guesses,
  onGuess,
  onNewGame,
  onLogout,
  onBack,
}) => {
  const [input, setInput] = React.useState('');

  const handleSubmit = () => {
    onGuess(input);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.welcome}>
          Wordle
        </Text>

        {user?.email ? (
          <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <LetterCircle letters={letters} />

      <TextInput
        style={styles.input}
        placeholder="Enter a word..."
        value={input}
        onChangeText={setInput}
      />
      <Button title="Submit Guess" onPress={handleSubmit} />

      <Text style={styles.progress}>
        Words Guessed: {guesses.length} / {validWords.length}
      </Text>

      <View style={styles.wordBoxContainer}>
        {[...Array(6)].map((_, i) => (
          <WordBox
            key={i}
            wordLength={validWords[i]?.length || 3}
            word={guesses.includes(validWords[i]) ? validWords[i] : null}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="New Game" onPress={onNewGame} color="#8e44ad" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 5,
    zIndex: 1,
  },
  logoutButton: {
    position: 'absolute',
    right: 0,
    padding: 5,
  },
  logoutText: {
    color: 'blue',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  progress: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  wordBoxContainer: {
    gap: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});

export default GameScreen;
