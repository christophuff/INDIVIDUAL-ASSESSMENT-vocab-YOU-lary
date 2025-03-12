import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import domEvents from '../events/domEvents';
import formEvents from '../events/formEvents';
import navigationEvents from '../events/navigationEvents';
// GET WORDS AND SHOW WORDS
import { getWords } from '../api/wordData';
import { emptyWords, showWords } from '../pages/words';

const startApp = (user) => {
  domBuilder(user); // BUILD THE DOM
  domEvents(user); // ADD THE EVENT LISTENTERS TO THE DOM
  formEvents(user); // ADD FORM EVENT LISTENTERS TO THE DOM
  navBar(user); // DYNAMICALLY ADD THE NAV
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
  navigationEvents(); // ATTACH THE EVENT LISTENERS TO THE NAVBAR

  // TODO: Put all words on the DOM on App load
  getWords(user.uid).then((response) => {
    const words = response ? Object.values(response) : []; // Convert response to an array
    if (words.length === 0) {
      emptyWords(); // Show "No Words" message if list is empty
    } else {
      showWords(user.uid); // Display Words
    }
  }).catch((error) => console.error('Error fetching words:', error));
};

export default startApp;
