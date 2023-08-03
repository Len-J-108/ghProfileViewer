import { headingStyleFunc } from './heading.js';
import { ghUrl, cardContainer, getGhData, createWarning } from './main.js';
import cardHeadingFunc from './cardHeadingFunc.js';
import imageBorderColor from './imageBorderColor.js';
import createLocation from './cardCreateLocationFunc.js';
import createLink from './cardCreateLink.js';
import createBio from './cardCreateBio.js';
import createFollowers from './cardCreateFollowersFunc.js';
import microCreateElFunc from './microCreateElFunc.js';
//------------------------------------------------------------------------------------
// Create Card Function
let colorCounter = 1;

const createCard = (_data, _cardContainer) => {
  // Card
  const card = microCreateElFunc(
    ['div'],
    'gh-card',
    'divider',
    `bg${colorCounter}`,
    'flex-col-center',
    'margin-block-big'
  );
  //------------------------------------------------------------------------------------
  colorCounter++;
  if (colorCounter > 6) {
    colorCounter = 1;
  }
  //------------------------------------------------------------------------------------
  // name
  const ghName = cardHeadingFunc(
    'h3',
    _data.name,
    'fs-xl',
    'margin-block-medium',
    'margin-inline-medium'
  );

  // close button for card
  const closeBtn = document.createElement('span');
  closeBtn.classList.add(
    'fa-regular',
    'fa-circle-xmark',
    'card-close-btn',
    'cursor',
    'fs-xl',
    'margin-inline-small'
  );

  //show Image
  const ghImage = microCreateElFunc(['img'], 'gh-image', 'round');
  ghImage.src = _data.avatar_url;
  ghImage.style.borderColor = imageBorderColor();

  // location
  const ghLocation = createLocation(
    _data.location,
    'fs-xl',
    'margin-block-medium'
  );

  // link to GH-page.
  const ghLink = createLink(
    _data.html_url,
    'gh-link-image',
    'shadow1',
    'round',
    'margin-block-medium'
  );

  const ghBio = createBio(
    _data.bio,
    'Bio',
    'show-div',
    'bio-content',
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
