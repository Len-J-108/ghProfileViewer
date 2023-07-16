import { headingStyleFunc } from './heading.js';

import { ghUrl, cardContainer, getGhData, createWarning } from './main.js';

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
// create location function.
const createLocation = (_data) => {
  if (_data.location) {
    const locationHeading = document.createElement('h3');
    headingStyleFunc(_data.location, locationHeading);
    locationHeading.classList.add('location-h3');

    return locationHeading;
  }
};

//------------------------------------------------------------------------------------
// create link function.
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
// create Biography function.

const createBio = (_data) => {
  const bioDiv = document.createElement('div');
  bioDiv.classList.add('show-div');

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('bio-content');

  const collapseBtn = document.createElement('button');
  collapseBtn.classList.add('show-btn');
  collapseBtn.textContent = 'show bio';

  const bioText = _data.bio ? _data.bio : 'User has no biography';
  const bio = `<p>${bioText}</p>`;
  console.log(bio);

  contentDiv.insertAdjacentHTML('beforeend', bio);
  bioDiv.append(collapseBtn, contentDiv);

  collapseBtn.addEventListener('click', collapseFunc);

  return bioDiv;
};
//------------------------------------------------------------------------------------
// Collapse Button function
const collapseFunc = (ev) => {
  const hideContent = ev.target.nextElementSibling;
  console.log(hideContent.style.display);
  if (hideContent.style.maxHeight) {
    hideContent.style.maxHeight = null;
  } else {
    hideContent.style.maxHeight = hideContent.scrollHeight + 'px';
  }
};

//------------------------------------------------------------------------------------
// Following function
const createFollowers = (_data) => {
  if (_data.followers === 0) {
    console.log('No Followers');
    // return '';
  } else {
    const followersDiv = document.createElement('div');
    followersDiv.classList.add('show-div');

    const collapseBtn = document.createElement('button');
    collapseBtn.classList.add('show-btn');
    collapseBtn.textContent = 'Show Followers';

    const listOfFollowers = document.createElement('ul');
    listOfFollowers.classList.add('followers-ul');

    fetch(_data.followers_url)
      .then((resp) => resp.json())
      .then((x_data) => {
        console.log(x_data);

        x_data.forEach((e) => {
          const li = document.createElement('li');
          li.alt = e.login; // so you can click on the li background and still show new follower.
          li.classList.add('follower-li');

          const followerImg = document.createElement('img');
          followerImg.src = e.avatar_url;
          followerImg.alt = e.login;
          followerImg.classList.add('follower-img');
          followerImg.style.outlineColor = imageBorderColor();

          const followerName = document.createElement('p');
          followerName.setAttribute('alt', e.login);

          followerName.classList.add('follower-name');
          headingStyleFunc(e.login, followerName); // show letters in different colors

          li.append(followerImg, followerName);

          listOfFollowers.append(li);
          followersDiv.append(collapseBtn, listOfFollowers);

          collapseBtn.addEventListener('click', collapseFunc);
        });
      })
      .catch((err) => console.log(err));
    return followersDiv;
  }
};
//------------------------------------------------------------------------------------
// Create Card Function
let colorCounter = 1;

const createCard = (_data, _cardContainer) => {
  // Card
  const card = document.createElement('div');
  card.classList.add('gh-card', 'divider');

  card.classList.add(`bg${colorCounter}`);
  colorCounter++;
  if (colorCounter > 7) {
    colorCounter = 1;
  }

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

  // location
  const ghLocation = createLocation(_data);

  // link to GH-page.
  const ghLink = createLink(_data);

  const ghBio = createBio(_data);

  // follwers
  const ghFollowers = createFollowers(_data);

  // appending
  ghName.append(closeBtn);
  card.append(ghName, ghImage, ghLocation, ghLink, ghBio, ghFollowers);
  _cardContainer.append(card);

  //showFollower
  const followers = card.querySelector('.followers-ul');

  followers.addEventListener('click', (ee) => {
    console.log(ee.target)
    if (ee.target.alt === undefined) {
      return;
    } else {
      // card.remove(); // if active only the follower will be displayed.
      getGhData(ghUrl, ee.target.alt).then((data) => {
        createCard(data, cardContainer);
      });
    }
  });

  // card close Button Click-Event
  closeBtn.addEventListener('click', () => {
    card.remove();
    console.clear();
  });
};

//------------------------------------------------------------------------------------
// exports

export { createCard };
