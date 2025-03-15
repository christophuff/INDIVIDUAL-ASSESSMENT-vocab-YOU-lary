import firebase from 'firebase/app';
import 'firebase/auth';
import { signOut } from '../utils/auth';
import {
  getPinnedWords, getWords, getWordsAlphabeticalOrder, getWordsNewest, getWordsOldest, searchWords,
} from '../api/wordData';
import { getLanguages } from '../api/languageData';
import { emptyWords, showWords } from '../pages/words';
import { showLanguages, emptyLanguages } from '../pages/languages';
import populateNavDropdown from '../components/shared/populateNavDropdown';

const navigationEvents = () => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // GET ALL WORDS
  document.querySelector('#all-words').addEventListener('click', () => {
    firebase.auth().onAuthStateChanged((user) => {
      getWords(user.uid).then((response) => {
        const words = response ? Object.values(response) : []; // Convert response to an array
        if (words.length === 0) {
          emptyWords(); // Show "No Words" message if list is empty
        } else {
          showWords(words); // Display Languages
        }
      }).catch((error) => console.error('Error fetching words:', error));
    });
  });

  // GET LANGUAGES
  document.querySelector('#all-languages').addEventListener('click', () => {
    firebase.auth().onAuthStateChanged((user) => {
      getLanguages(user.uid).then((response) => {
        const languages = response ? Object.values(response) : []; // Convert response to an array
        if (languages.length === 0) {
          emptyLanguages(); // Show "No Languages" message if list is empty
        } else {
          showLanguages(languages); // Display Languages
        }
      }).catch((error) => console.error('Error fetching languages:', error));
    });
  });

  // GET PINNED WORDS
  document.querySelector('#view-pinned').addEventListener('click', () => {
    firebase.auth().onAuthStateChanged((user) => {
      getPinnedWords(user.uid).then(showWords);
    });
  });

  // Filter Words by Alphabetical Order
  document.querySelector('#view-alphabetical').addEventListener('click', () => {
    firebase.auth().onAuthStateChanged((user) => {
      getWordsAlphabeticalOrder(user.uid).then(showWords);
    });
  });

  // Filter Words by Newst
  document.querySelector('#view-newest').addEventListener('click', () => {
    firebase.auth().onAuthStateChanged((user) => {
      getWordsNewest(user.uid).then(showWords);
    });
  });

  // Filter Words by Oldest
  document.querySelector('#view-oldest').addEventListener('click', () => {
    firebase.auth().onAuthStateChanged((user) => {
      getWordsOldest(user.uid).then(showWords);
    });
  });

  // populate dropdown with languages
  document.querySelector('#wordFilterDropdown').addEventListener('click', () => {
    firebase.auth().onAuthStateChanged((user) => {
      populateNavDropdown(user.uid);
    });
  });

  // Search Words
  document.querySelector('#search').addEventListener('keyup', (e) => {
    firebase.auth().onAuthStateChanged((user) => {
      searchWords(e, user.uid).then(showWords);
    });
  });
};

export default navigationEvents;
