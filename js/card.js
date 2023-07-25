import { headingStyleFunc } from './heading.js';

import { ghUrl, cardContainer, getGhData, createWarning } from './main.js';

import cardHeadingFunc from './cardHeadingFunc.js';

import imageBorderColor from './imageBorderColor.js';

import createLocation from './cardCreateLocationFunc.js';

import createLink from './cardCreateLink.js';

import createBio from './cardCreateBio.js';

import createFollowers from './cardCreateFollowersFunc.js';
//------------------------------------------------------------------------------------
// Create Card Function
let colorCounter = 1;

const createCard = (_data, _cardContainer) => {
  // Card
  const card = document.createElement('div');
  card.classList.add('gh-card', 'divider');
  card.classList.add(`bg${colorCounter}`);
  //------------------------------------------------------------------------------------
  colorCounter++;
  if (colorCounter > 6) {
    colorCounter = 1;
  }
  //------------------------------------------------------------------------------------
  // name
  const ghName = cardHeadingFunc('h3', _data.name, 'name');

  // close button for card
  const closeBtn = document.createElement('span');
  closeBtn.classList.add('fa-regular', 'fa-circle-xmark', 'card-close-btn');

  //show Image
  const ghImage = document.createElement('img');
  ghImage.src = _data.avatar_url;
  ghImage.classList.add('gh-image');
  ghImage.style.borderColor = imageBorderColor();

  // location
  const ghLocation = createLocation(_data.location, 'location-h3');

  // link to GH-page.
  const ghLink = createLink(_data.html_url, 'gh-link-image', 'shadow1');

  const ghBio = createBio(
    _data.bio,
    'Bio',
    'show-div',
    'bio-content',
    'show-btn',
    'shadow1'
  );

  // follwers
  const ghFollowers = createFollowers(_data, _cardContainer);

  // appending
  // ghName.append(closeBtn);
  card.append(
    ghName,
    ghImage,
    ghLocation,
    ghLink,
    ghBio,
    ghFollowers,
    closeBtn
  );
  _cardContainer.append(card);
  //------------------------------------------------------------------------------------
  //showFollower in new card.

  ghFollowers.lastElementChild.addEventListener('click', (ee) => {
    if (ee.target.alt === undefined) {
      return;
    } else {
      getGhData(ghUrl, ee.target.alt).then((data) => {
        createCard(data, cardContainer);
      });
    }
  });

  //------------------------------------------------------------------------------------
  // card close Button Click-Event
  closeBtn.addEventListener('click', () => {
    card.remove();
    console.clear();
  });
};
//------------------------------------------------------------------------------------

export { createCard };
