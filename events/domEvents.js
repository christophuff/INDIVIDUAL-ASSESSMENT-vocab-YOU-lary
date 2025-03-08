import { getSingleWord, getWords, deleteWord } from '../api/wordData';
import { getSingleLanguage, getLanguages } from '../api/languageData';
import { deleteLanguageWordsRelationship } from '../api/mergedData';
import addWordForm from '../components/forms/addWordForm';
import addLanguageForm from '../components/forms/addLanguageForm';
import { showWords } from '../pages/words';
import { showLanguages } from '../pages/languages';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // Click Event for showing form for adding word
    if (e.target.id.includes('add-word-btn')) {
      addWordForm();
    }

    // Click Event for editing/updating word
    if (e.target.id.includes('edit-word-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getSingleWord(firebaseKey).then((wordObj) => addWordForm(wordObj));
    }

    // Click Event for deleting a book
    if (e.target.id.includes('delete-word')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to Delete?')) {
        console.warn('CLICKED DELETE BOOK', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteWord(firebaseKey).then(() => {
          getWords().then(showWords);
        });
      }
    }

    // Click Event for adding a language
    if (e.target.id.includes('add-language-btn')) {
      addLanguageForm();
    }

    // Click Event for editing/updating language
    if (e.target.id.includes('edit-language-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getSingleLanguage(firebaseKey).then((languageObj) => addLanguageForm(languageObj));
    }

    // Click Event for deleting language
    if (e.target.id.includes('delete-language-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('DELETE LANGUAGE', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteLanguageWordsRelationship(firebaseKey).then(() => {
          getLanguages().then(showLanguages);
        });
      }
    }
  });
};

export default domEvents;
