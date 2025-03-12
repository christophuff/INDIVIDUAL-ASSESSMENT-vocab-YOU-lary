import firebase from 'firebase';
import 'firebase/auth';
import { getLanguages } from '../../api/languageData';
import renderToDOM from '../../utils/renderToDom';

// Function to create the language dropdown
const selectLanguage = (languageId = '') => {
  firebase.auth().onAuthStateChanged((user) => {
    let domString = `
    <label for="language">Select a Language</label>
    <select class="form-control" id="language_id" required>
    <option value="">Select a Language</option>`;

    getLanguages(user.uid).then((languagesArray) => {
      languagesArray.forEach((language) => {
        domString += `
          <option 
            value="${language.firebaseKey}" 
            ${languageId === language.firebaseKey ? 'selected' : ''}>
            ${language.language}
          </option>`;
      });

      domString += '</select>';

      renderToDOM('#select-language', domString); // Render the populated select element
    }).catch((error) => {
      console.error('Error fetching languages:', error);
    });
  });
};

export default selectLanguage;
