import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import { getWordDetails } from '../api/mergedData';

const emptyWords = () => {
  const btnString = '<button class="note-stack-btn" id="add-word-btn">New Word</button>';
  renderToDOM('#add-button', btnString);

  const domString = `
  <div class="get-started">
    <h3>No words saved yet! Head over to the Languages tab to get started!</h3>
  </div>
  `;
  renderToDOM('#store', domString);
};

const showWords = (array) => {
  clearDom();
  const btnString = '<button class="note-stack-btn" id="add-word-btn">New Word</button>';
  renderToDOM('#add-button', btnString);

  // Create an array of promises to fetch word details
  const wordPromises = array.map((item) => getWordDetails(item.firebaseKey)
    .then((wordDetails) => wordDetails)
    .catch(() => null));

  Promise.all(wordPromises).then((wordDetailsArray) => {
    // Filter out any failed fetches
    const validWords = wordDetailsArray.filter((word) => word !== null);

    let domString = '';
    validWords.forEach((wordDetails) => {
      domString += `
        <div class="card word-card">
          <div class="card-body">
            <h5 class="card-title">
              ${wordDetails.word}
              <i id="toggle-pinned--${wordDetails.firebaseKey}" class="fa-solid ${wordDetails.pinned ? 'fa-thumbtack' : 'fa-thumbtack-slash'}"></i>
            </h5>
            <p class="card-text bold">${wordDetails.definition}</p>
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
    });

    renderToDOM('#store', domString);
  });
};

export { showWords, emptyWords };
