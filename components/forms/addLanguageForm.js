import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';

// USING THIS FORM FOR BOTH CREATE AND UPDATE
const addLanguageForm = (obj = {}) => {
  clearDom();
  const domString = `
    <form id="${obj.firebaseKey ? `update-language--${obj.firebaseKey}` : 'submit-language'}" class="mb-4">
      <div class="form-group">
        <label for="Language">Language</label>
        <input type="text" class="form-control" id="language" aria-describedby="language" placeholder="Enter Language" value="${obj.language || ''}" required>
      </div>
      <div class="form-group">
        <label for="Description">Description</label>
        <textarea class="form-control" placeholder="Language Description" id="description" style="height: 100px;" required>${obj.description || ''}</textarea>    
      <button type="submit" class="btn submit-btn">${obj.firebaseKey ? 'Update' : 'Submit'} Language</button>

    </form>`;

  renderToDOM('#form-container', domString);
};

export default addLanguageForm;
