import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WordBox = ({ wordLength, word }) => {
  return (
    <View style={styles.container}>
      {[...Array(wordLength)].map((_, i) => (
        <View key={i} style={styles.box}>
          <Text style={styles.letter}>
            {word ? word[i].toUpperCase() : ''}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 6,
  },
  box: {
    width: 40,
    height: 40,
    borderColor: '#555',
    borderWidth: 2,
    marginHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff3e0',
  },
  letter: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WordBox;
