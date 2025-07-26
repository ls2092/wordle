import words from 'an-array-of-english-words';

export function getValidWords(letters) {
  const validWords = [];

  const isSubset = (word, availableLetters) => {
    const tempLetters = [...availableLetters];
    for (let char of word) {
      const idx = tempLetters.indexOf(char);
      if (idx === -1) return false;
      tempLetters.splice(idx, 1);
    }
    return true;
  };

  for (let word of words) {
    const w = word.toLowerCase();
    if (w.length >= 2 && w.length <= 5 && isSubset(w, letters)) {
      validWords.push(w);
    }
  }

  return validWords;
}
