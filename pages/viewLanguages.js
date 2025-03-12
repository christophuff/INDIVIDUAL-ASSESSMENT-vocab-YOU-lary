import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewLanguage = (obj) => {
  clearDom();
  const domString = `
      <div class="container text-center mt-5">
        <div class="d-flex flex-column align-items-center">
          <h2 class="text-white">${obj.language}</h2>
        </div>
        <div>
          <button class="btn btn-info"><i class="fas fa-edit" id="edit-language-btn--${obj.firebaseKey}"></i></button>
          <button class="btn btn-danger"><i class="fas fa-trash-alt" id="delete-language-btn--${obj.firebaseKey}"></i></button>
        </div>
      
      <hr>
  
      <h3 class="mt-4 text-center text-white">All ${obj.language} Words:</h3>
      <div id="author-books">
        ${obj.words.length > 0 ? obj.words.map((word) => `
          <div class="card word-card">
            <div class="card-body">
              <h5 class="card-title">${word.word}</h5>
              <p class="card-text">${word.definition || 'No description available.'}</p>
              <div class="btn-container">
              <button class="btn btn-info"><i id="edit-word-btn--${word.firebaseKey}" class="fa-solid fa-edit"></i></button>
              <button class="btn btn-danger"><i id="delete-word-btn--${word.firebaseKey}" class="fa-solid fa-trash-alt"></i></button>
            </div>
            </div>
          </div>
        `).join('') : '<p>No Words found for this Language.</p>'}
      </div>
      </div>
    `;

  renderToDOM('#view', domString);
};

export default viewLanguage;
