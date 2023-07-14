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
// create link.
const createLink = (_data) => {
  const link = document.createElement('a');
  link.href = _data.html_url;
  const linkImage = document.createElement('img');
  linkImage.src = '../images/gh-btn-round2.png';
  linkImage.classList.add('gh-link-image');
  link.append(linkImage);
  return link;
};
//------------------------------------------------------------------------------------
// create Biography

const createBio = (_data) => {
  const bioDiv = document.createElement('div');
  const collapseBtn = document.createElement('button');
  collapseBtn.textContent = 'show bio';
  const bioText = _data.bio ? _data.bio : 'User has no biography';

  const bio = `<p>${bioText}</p>`;

  console.log(bio);

  bioDiv.append(collapseBtn);

  bioDiv.insertAdjacentHTML('beforeend', bio);

  return bioDiv;
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

  // link to GH-page.
  const ghLink = createLink(_data);

  const ghBio = createBio(_data);
  // console.log(_data.bio);

  // appending
  ghName.append(closeBtn);
  card.append(ghName, ghImage, ghLink, ghBio);
  _cardContainer.append(card);

  // card close Button
  closeBtn.addEventListener('click', () => {
    card.remove();
  });
};

//------------------------------------------------------------------------------------
// exports

export { createCard };
