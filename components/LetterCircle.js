// components/LetterCircle.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DEFAULT_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const LetterCircle = ({ letters = DEFAULT_LETTERS }) => {
  return (
    <View style={styles.circle}>
      {(letters || DEFAULT_LETTERS).map((letter, index) => (
        <View key={index} style={styles.letterBox}>
          <Text style={styles.letter}>{letter.toUpperCase()}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 20,
    backgroundColor: '#f0f8ff',
    borderRadius: 100,
    marginBottom: 20,
  },
  letterBox: {
    backgroundColor: '#d1c4e9',
    margin: 10,
    padding: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default LetterCircle;
