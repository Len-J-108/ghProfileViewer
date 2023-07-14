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
  bioDiv.classList.add('bio-div');

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('bio-content');

  const collapseBtn = document.createElement('button');
  collapseBtn.classList.add('show-bio-btn');
  collapseBtn.textContent = 'show bio';

  const bioText = _data.bio ? _data.bio : 'User has no biography';
  const bio = `<p>${bioText}</p>`;
  console.log(bio);

  contentDiv.insertAdjacentHTML('beforeend', bio);
  bioDiv.append(collapseBtn, contentDiv);

  collapseBtn.addEventListener('click', bioCollapseFunc);

  return bioDiv;
};

// Biography Collapse Button function
const bioCollapseFunc = (ev) => {
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
  const listOfFollowers = document.createElement('ul');

  fetch(_data.followers_url)
    .then((resp) => resp.json())
    .then((x_data) => {
      console.log(x_data);

      x_data.forEach((e) => {
        const li = document.createElement('li');
        const followerLink = document.createElement('a');
        followerLink.href = e.html_url;
        followerLink.classList.add('follower-link');

        const followerImg = document.createElement('img');
        followerImg.src = e.avatar_url;
        followerLink.append(followerImg);

        const followerName = document.createElement('p');
        followerName.textContent = e.login;

        li.append(followerLink, followerName);

        listOfFollowers.append(li);
      });
    })
    .catch((err) => console.log(err));
  return listOfFollowers;
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

  // card close Button Click-Event
  closeBtn.addEventListener('click', () => {
    card.remove();
    console.clear();
  });
};

//------------------------------------------------------------------------------------
// exports

export { createCard };
