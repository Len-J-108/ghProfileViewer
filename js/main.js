// Selecting
const container = document.getElementById('container');
const searchInput = document.querySelector('input');

const searchBtn = document.querySelector('button');
const cardContainer = document.getElementById('card-container');
const body = document.querySelector('body');

const toTop = document.getElementById('to-top');

//------------------------------------------------------------------------------------
//INFO:    IMPORTS                                              :
import { headingStyleFunc } from './heading.js';
import { createWarning } from './warning.js';
import { createCard } from './card.js';
import microCreateElFunc from './microCreateElFunc.js';

//------------------------------------------------------------------------------------
const scrollFunction = () => {
  let curr = window.scrollY;
  if (curr > 1000) toTop.className = 'to-top-btn border-radius show-btn';
  else toTop.className = 'to-top-btn hide-btn';
};

const mainHeading = microCreateElFunc(['h1'], 'fs-mega', 'flex-row-center');
mainHeading.id = 'top';

body.prepend(mainHeading);

//heading Text
const h1Txt = 'Github Profile Viewer';

//------------------------------------------------------------------------------------

// create H1 heading in colors
headingStyleFunc(h1Txt, mainHeading);
//------------------------------------------------------------------------------------

// Container
container.classList.add('search-container', 'flex-row-center');

// Input
searchInput.classList.add('input', 'shadow1', 'border-radius', 'fs-m');
searchBtn.classList.add('btn', 'cursor');

// Button
searchBtn.classList.add('search-button', 'shadow1', 'border-radius');
// Url
const ghUrl = 'https://api.github.com/users/';

//------------------------------------------------------------------------------------
// Main Function

const getGhData = async (_url, userName = searchInput.value) => {
  try {
    const res = await fetch(_url + userName);
    const data = await res.json();
    if (!userName) {
      throw new Error('Invalid Input');
    }
    if (!data.name) {
      throw new Error('No User with that name');
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

//EventListener totopButton Hide / Show
window.addEventListener('scroll', scrollFunction);

// Auto Scroll to Top when clicked
toTop.addEventListener('click', (ee) => {
  body.scrollIntoView({ behavior: 'smooth' });
});
