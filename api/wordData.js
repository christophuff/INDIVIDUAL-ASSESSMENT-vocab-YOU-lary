import client from '../utils/client';

const endpoint = client.databaseURL;

// GET ALL WORDS
const getWords = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/words.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// GET SINGLE WORD
const getSingleWord = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/words/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET pinned words
const getPinnedWords = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/words.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const isPinned = Object.values(data).filter((item) => item.pinned);
      resolve(isPinned);
    })
    .catch(reject);
});

// Sort Words by Alphabetical Order
const getWordsAlphabeticalOrder = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/words.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const wordsArray = Object.values(data);
        wordsArray.sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase(), 'ja-en'));
        resolve(wordsArray);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// Get words sorted by newest first
const getWordsNewest = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/words.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data).sort((a, b) => new Date(b.time_submitted) - new Date(a.time_submitted)));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// GET words sorted by oldest first
const getWordsOldest = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/words.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data).sort((a, b) => new Date(a.time_submitted) - new Date(b.time_submitted)));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// CREATE new word
const createWord = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/words.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE word
const updateWord = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/words/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteWord = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/words/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET all words by language
const getLanguageWords = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/words.json?orderBy="language_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// Toggle Pinned Words
const togglePinned = (firebaseKey, currentStatus) => new Promise((resolve, reject) => {
  const updatedStatus = !currentStatus;

  fetch(`${endpoint}/words/${firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pinned: updatedStatus }),
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// Search Words
const searchWords = (e, uid) => new Promise((resolve, reject) => {
  const userInput = e.target.value.toLowerCase();

  fetch(`${endpoint}/words.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((wordData) => {
      if (!wordData) {
        resolve([]); // Resolve with empty array if no data
        return;
      }

      // Convert Firebase Object into an array
      const wordsArray = Object.keys(wordData).map((key) => ({
        firebaseKey: key,
        ...wordData[key],
      }));

      // Filter books based on title or description
      const searchResult = wordsArray.filter((word) => word.word.toLowerCase().includes(userInput) || word.definition.toLowerCase().includes(userInput));

      resolve(searchResult); // Resolve with filtered results
    })
    .catch(reject);
});

export {
  getWords,
  getSingleWord,
  getLanguageWords,
  getPinnedWords,
  getWordsAlphabeticalOrder,
  getWordsNewest,
  getWordsOldest,
  createWord,
  updateWord,
  deleteWord,
  togglePinned,
  searchWords
};
