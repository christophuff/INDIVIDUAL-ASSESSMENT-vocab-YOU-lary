// import firebase from 'firebase/app';
import 'firebase/auth';
import { signOut } from '../utils/auth';
import {
  getPinnedWords, getWords, searchWords,
} from '../api/wordData';
import { getLanguages } from '../api/languageData';
import { showWords } from '../pages/words';
import { showLanguages, emptyLanguages } from '../pages/languages';
import populateNavDropdown from '../components/shared/populateNavDropdown';

const navigationEvents = () => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // GET ALL WORDS
  document.querySelector('#all-words').addEventListener('click', () => {
    getWords().then(showWords);
  });

  // GET PINNED WORDS
  document.querySelector('#view-pinned').addEventListener('click', () => {
    getPinnedWords().then(showWords);
  });

  // populate dropdown with languages
  document.querySelector('#wordFilterDropdown').addEventListener('click', () => {
    populateNavDropdown();
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

  // Search Words
  document.querySelector('#search').addEventListener('keyup', (e) => {
    searchWords(e).then(showWords);
  });
};

export default navigationEvents;
