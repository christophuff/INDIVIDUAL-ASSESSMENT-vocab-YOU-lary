import { getLanguages } from '../../api/languageData';
import renderToDOM from '../../utils/renderToDom';
import { getLanguageWords } from '../../api/wordData';
import { showWords } from '../../pages/words';

const populateNavDropdown = () => {
  getLanguages().then((languagesArray) => {
    if (!languagesArray || languagesArray.length === 0) {
      console.error('No languages found.');
      return;
    }

    let domString = ''; // Empty string to hold all language options

    languagesArray.forEach((language) => {
      domString += `
        <li class="language-option">
          <a class="dropdown-item language-filter" href="#" data-language-id="${language.firebaseKey}">
            ${language.language}
          </a>
        </li>`;
    });

    renderToDOM('#select-language-dropdown', domString); // Insert into the dropdown

    // Event listener for each language option
    document.querySelectorAll('.language-filter').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLanguageId = e.target.dataset.languageId;
        getLanguageWords(selectedLanguageId).then(showWords);
      });
    });
  });
};

export default populateNavDropdown;
