import { headingStyleFunc } from './heading.js';

//------------------------------------------------------------------------------------
// Image Border-Color Function
/* chooses a random color for the ourline of the displayed image in the
   card // used in createCard function. */
const imageBorderColor = () => {
  const colorArr = [
    '#99f6e4',
    '#155e75',
    '#6366f1',
    '#e879f9',
    '#881337',
    '#fbbf24',
  ];
  //Math.floor(Math.random() * (max - min + 1) + min);  // standard random function
  return colorArr[Math.floor(Math.random() * 6)];
};

//------------------------------------------------------------------------------------
// Create Card Function

const createCard = (_data, _cardContainer) => {
  // Card
  const card = document.createElement('div');
  card.classList.add('gh-card');
  // showName
  const ghName = document.createElement('h3');
  headingStyleFunc(_data.name, ghName); // show letters in different colors
  ghName.classList.add('name');

  //show Image
  const ghImage = document.createElement('img');
  ghImage.src = _data.avatar_url;
  ghImage.classList.add('gh-image');
  ghImage.style.borderColor = imageBorderColor();

  // close button for card
  const closeBtn = document.createElement('span');
  closeBtn.classList.add('fa-regular', 'fa-circle-xmark', 'card-close-btn');

  // appending
  ghName.append(closeBtn);
  card.append(ghName, ghImage);
  _cardContainer.append(card);

  // card close Button
  closeBtn.addEventListener('click', () => {
    card.remove();
  });
};

//------------------------------------------------------------------------------------
// exports

export { createCard };
