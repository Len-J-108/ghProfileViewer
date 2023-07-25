import imageBorderColor from './imageBorderColor.js';
import { headingStyleFunc } from './heading.js';
import collapseFunc from './collapseFunc.js';

const createFollowers = (_data, _cardContainer) => {
  // wrapper (includes btn & followersDiv)
  const followersWrapper = document.createElement('div');
  followersWrapper.classList.add('followers-wrapper', 'show-div', 'shadow3');

  // CollapseButton
  const collapseBtn = document.createElement('button');
  collapseBtn.classList.add('show-btn', 'shadow1');
  collapseBtn.textContent = 'Followers';

  // Followers Div
  const followersDiv = document.createElement('div');
  followersDiv.classList.add('followers-div');

  followersWrapper.append(collapseBtn, followersDiv);

  if (!_data.followers) {
    console.log('No Followers');

    const noFollowersPar = document.createElement('p');
    noFollowersPar.textContent =
      'User has no Followers or the profile is private.';
    followersDiv.classList.add('bio-content');
    followersDiv.append(noFollowersPar);
    collapseBtn.addEventListener('click', collapseFunc);

    return followersWrapper;
  } else {
    fetch(_data.followers_url)
      .then((resp) => resp.json())
      .then((x_data) => {
        x_data.forEach((e) => {
          const follower = document.createElement('div');
          follower.dataQ = e.login; // so you can click on the li background and still show new follower.
          follower.classList.add('follower');

          // Image
          const followerImg = document.createElement('img');
          followerImg.src = e.avatar_url;
          followerImg.alt = e.login;
          followerImg.classList.add('follower-img');
          followerImg.style.outlineColor = imageBorderColor();

          // name
          const followerName = document.createElement('p');
          followerName.setAttribute('alt', e.login);
          followerName.classList.add('follower-name');
          headingStyleFunc(e.login, followerName); // show letters in different colors

          // Appending
          follower.append(followerImg, followerName);

          followersDiv.append(follower);

          //autoScroll to new user
          _cardContainer.lastElementChild.scrollIntoView({
            behavior: 'smooth',
          });
        });
        return followersWrapper;
      })
      .catch((err) => console.log(err));
    collapseBtn.addEventListener('click', collapseFunc);

    return followersWrapper;
  }
};

export default createFollowers;
