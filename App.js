import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import LetterCircle from './components/LetterCircle';
import WordBox from './components/WordBox';
import { getValidWords } from './utils/wordUtils';

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

export default function App() {
  const [letters, setLetters] = useState([]);
  const [validWords, setValidWords] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState('');

  const generateGame = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const newLetters = Array.from({ length: 5 }, () =>
      alphabet[Math.floor(Math.random() * 26)]
    );
    setLetters(newLetters);

    // Get all valid words from these letters
    let words = getValidWords(newLetters);

    // Filter to max 6 unique random words (2 to 5 letters)
    if (words.length > 6) {
      words = shuffle(words).slice(0, 6);
    }

    setValidWords(words);
    setGuesses([]);
    setInput('');
  };

  useEffect(() => {
    generateGame();
  }, []);

  const handleGuess = () => {
    const guess = input.toLowerCase();

    if (guesses.length >= 6) {
      Alert.alert("Limit reached", "You've guessed the maximum of 6 words.");
      setInput('');
      return;
    }

    if (!validWords.includes(guess)) {
      Alert.alert("Invalid word", "That word is not in the list of valid answers.");
    } else if (guesses.includes(guess)) {
      Alert.alert("Already guessed", "You already guessed that word.");
    } else {
      setGuesses([...guesses, guess]);
    }

    setInput('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Word Circle Game</Text>

      <LetterCircle letters={letters} />

      <TextInput
        style={styles.input}
        placeholder="Enter a word..."
        value={input}
        onChangeText={setInput}
      />
      <Button title="Submit Guess" onPress={handleGuess} />

      <Text style={styles.progress}>
        Words Guessed: {guesses.length} / {validWords.length}
      </Text>

      {/* Render only 6 WordBoxes based on validWords */}
      {[...Array(6)].map((_, i) => (
        <WordBox
          key={i}
          wordLength={validWords[i]?.length || 3}
          word={guesses.includes(validWords[i]) ? validWords[i] : null}
        />
      ))}

      <View style={styles.buttonContainer}>
        <Button title="New Game" onPress={generateGame} color="#8e44ad" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
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
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
