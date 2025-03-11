import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import { getWordDetails } from '../api/mergedData';

const emptyWords = () => {
  const domString = '<h1>No Books</h1>';
  renderToDOM('#store', domString);
};

const showWords = (array) => {
  clearDom();

  const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-word-btn">New Word</button>';
  renderToDOM('#add-button', btnString);

  let domString = '';
  const wordPromises = array.map((item) => getWordDetails(item.firebaseKey).then((wordDetails) => {
    domString += `
        <div class="card word-card">
          <div class="card-body">
            <h5 class="card-title">
            ${wordDetails.word}
            <i id="toggle-pinned--${wordDetails.firebaseKey}" class="fa-solid ${wordDetails.pinned ? 'fa-thumbtack' : 'fa-thumbtack-slash'}"></i>
            </h5>
            <p class="card-text bold">${wordDetails.definition}</p>
            <hr>
            <div class="word-details">
              <p><strong>Submitted:</strong> ${new Date(wordDetails.time_submitted).toLocaleString('en-US')}</p>
              <p><strong>Language:</strong> ${wordDetails.languageObject.language}</p>
            </div>  
            <div class="btn-container">
              <button class="btn btn-info"><i id="edit-word-btn--${wordDetails.firebaseKey}" class="fa-solid fa-edit"></i></button>
              <button class="btn btn-danger"><i id="delete-word-btn--${wordDetails.firebaseKey}" class="fa-solid fa-trash-alt"></i></button>
            </div>
          </div>
        </div>`;
  }));

  // Wait for all word details to be fetched, then render the DOM
  Promise.all(wordPromises).then(() => renderToDOM('#store', domString));
};

export { showWords, emptyWords };
