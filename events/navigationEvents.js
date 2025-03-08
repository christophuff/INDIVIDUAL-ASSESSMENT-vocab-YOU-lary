// import firebase from 'firebase/app';
import 'firebase/auth';
import { signOut } from '../utils/auth';
import { getWords } from '../api/wordData';
import { getLanguages } from '../api/languageData';
import { showWords } from '../pages/words';
import { showLanguages, emptyLanguages } from '../pages/languages';

const navigationEvents = () => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // GET ALL WORDS
  document.querySelector('#all-words').addEventListener('click', () => {
    getWords().then(showWords);
  });

  // GET LANGUAGES
  document.querySelector('#all-languages').addEventListener('click', () => {
    getLanguages().then((response) => {
      const languages = response ? Object.values(response) : []; // Convert response to an array
      if (languages.length === 0) {
        emptyLanguages(); // Show "No Languages" message if list is empty
      } else {
        showLanguages(languages); // Display Languages
      }
    }).catch((error) => console.error('Error fetching authors:', error));
  });
};

export default navigationEvents;
