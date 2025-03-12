import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyLanguages = () => {
  const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-language-btn">New Language</button>';
  renderToDOM('#add-button', btnString);

  const domString = '<div class="get-started"><h3>Add a language to start adding words. Leave an origin of the language to let people know more about the language!</h3></div>';
  renderToDOM('#store', domString);
};

const showLanguages = (array) => {
  clearDom();

  const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-language-btn">New Language</button>';
  renderToDOM('#add-button', btnString);

  let domString = '';
  array.forEach((item) => {
    domString += `
      <div class="card language-card">
        <div class="card-body">
          <h5 class="card-title">${item.language}</h5>
            <hr>
            <p class="card-text bold">${item.description}</p>
            <hr>
            <div class="language-details">
              <button class="btn btn-success"><i class="fa-solid fa-eye" id="view-language-btn--${item.firebaseKey}"></i></button>
              <button class="btn btn-info"><i id="edit-language-btn--${item.firebaseKey}" class="fa-solid fa-edit"></i></button>
              <button class="btn btn-danger"><i id="delete-language-btn--${item.firebaseKey}" class="fa-solid fa-trash-alt"></i></button>
            </div>
        </div>
      </div>`;
  });
  renderToDOM('#store', domString);
};

export { showLanguages, emptyLanguages };
