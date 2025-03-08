import { getSingleLanguage, deleteLanguage } from './languageData';
import { getSingleWord, getLanguageWords, deleteWord } from './wordData';

const getWordDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // Get single word
  getSingleWord(firebaseKey).then((wordObject) => {
    getSingleLanguage(wordObject.language_id).then((languageObject) => resolve({ ...wordObject, languageObject }));
  }).catch(reject);
});

// GET data for viewLanguage
const getLanguageDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleLanguage(firebaseKey).then((languageObject) => {
    getLanguageWords(firebaseKey).then((wordsArray) => {
      resolve({ ...languageObject, books: wordsArray });
    }).catch(reject);
  });
});

// Delete all Words if deleting language
const deleteLanguageWordsRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getLanguageWords(firebaseKey).then((languageWordsArray) => {
    const deleteWordPromises = languageWordsArray.map((word) => deleteWord(word.firebaseKey));

    Promise.all(deleteWordPromises).then(() => {
      deleteLanguage(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export {
  getWordDetails,
  getLanguageDetails,
  deleteLanguageWordsRelationship
};
