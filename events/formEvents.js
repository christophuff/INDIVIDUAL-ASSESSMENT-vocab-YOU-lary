import 'firebase/auth';
// import firebase from 'firebase';
import { getWords, createWord, updateWord } from '../api/wordData';
import { showWords } from '../pages/words';
import { getLanguages, createLanguage, updateLanguage } from '../api/languageData';
import { showLanguages } from '../pages/languages';

const formEvents = () => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();

    // Adding a Book
    if (e.target.id.includes('submit-word')) {
      const payload = {
        word: document.querySelector('#word').value,
        definition: document.querySelector('#definition').value,
        language_id: document.querySelector('#language_id').value,
        time_submitted: new Date().toISOString(),
      };

      createWord(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateWord(patchPayload).then(() => {
          getWords().then(showWords);
        });
      });
    }

    if (e.target.id.includes('update-word')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = {
        word: document.querySelector('#word').value,
        definition: document.querySelector('#definition').value,
        language_id: document.querySelector('#language_id').value,
        time_submitted: new Date().toISOString(),
        firebaseKey,
      };

      updateWord(payload).then(() => {
        getWords().then(showWords);
      });
    }

    // Adding a Language
    if (e.target.id.includes('submit-language')) {
      const payload = {
        language: document.querySelector('#language').value,
        description: document.querySelector('#description').value,
      };

      createLanguage(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateLanguage(patchPayload).then(() => {
          getLanguages().then(showLanguages);
        });
      });
    }

    if (e.target.id.includes('update-language')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = {
        language: document.querySelector('#language').value,
        description: document.querySelector('#description').value,
        firebaseKey
      };

      updateLanguage(payload).then(() => {
        getLanguages().then(showLanguages);
      });
    }
  });
};

export default formEvents;
