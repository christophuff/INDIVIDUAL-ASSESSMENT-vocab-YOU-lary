// import firebase from 'firebase';
import 'firebase/auth';
import { getLanguages } from '../../api/languageData';
import renderToDOM from '../../utils/renderToDom';

const selectLanguage = (languageId) => {
  let domString = `<label for="language">Select a Language</label>
    <select class="form-control" id="language_id" required>
    <option value="">Select a Language</option>`;

  getLanguages().then((languagesArray) => {
    languagesArray.forEach((language) => {
      domString += `
        <option 
          value="${language.firebaseKey}" 
          ${languageId === language.firebaseKey ? 'selected' : ''}>
          ${language.language}
        </option>`;
    });

    domString += '</select>'; // Move this line here after authors are added

    renderToDOM('#select-language', domString); // Render the populated select element
  }).catch((error) => {
    console.error('Error fetching authors:', error);
  });
};

export default selectLanguage;
