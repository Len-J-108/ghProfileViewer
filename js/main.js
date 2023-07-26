// Selecting
const container = document.getElementById('container');
const searchInput = document.querySelector('input');

const searchBtn = document.querySelector('button');
const cardContainer = document.getElementById('card-container');
const body = document.querySelector('body');

//------------------------------------------------------------------------------------
//INFO:    IMPORTS                                              :
import { headingStyleFunc } from './heading.js';
import { createWarning } from './warning.js';
import { createCard } from './card.js';
import microCreateElFunc from './microCreateElFunc.js';

//------------------------------------------------------------------------------------

const mainHeading = microCreateElFunc(['h1'], 'main-heading');

body.prepend(mainHeading);

//heading Text
const h1Txt = 'Github Profile Viewer';

//------------------------------------------------------------------------------------

// create H1 heading in colors
headingStyleFunc(h1Txt, mainHeading);
//------------------------------------------------------------------------------------

// Container
container.classList.add('search-container');

// Input
searchInput.classList.add('input', 'shadow1');
searchBtn.classList.add('btn');

// Button
searchBtn.classList.add('search-button', 'shadow1');

// Url
const ghUrl = 'https://api.github.com/users/';

//------------------------------------------------------------------------------------
// Main Function

const getGhData = async (_url, userName = searchInput.value) => {
  try {
    const res = await fetch(_url + userName);
    const data = await res.json();
    console.log(data);
    if (!userName) {
      throw new Error('Invalid Input');
    }
    if (data.message === 'Not Found') {
      throw new Error('Name not found...');
    }
    if (res.status >= 400) {
      throw new Error('something is W');
    }
    console.log(data); // logging the response data
    userName = ''; // deletes text in input after search.
    return data;
  } catch (err) {
    createWarning(err, body);
  }
};

//------------------------------------------------------------------------------------
// EventListener for Go.. Button

searchBtn.addEventListener('click', () => {
  getGhData(ghUrl)
    .then((data) => {
      createCard(data, cardContainer);
    })
    .then(() => {
      // Auto Scroll to user
      cardContainer.lastElementChild.scrollIntoView({ behavior: 'smooth' });
    });
});

export { ghUrl, cardContainer, getGhData, createWarning };
