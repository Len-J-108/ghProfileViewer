import imageBorderColor from './imageBorderColor.js';
import { headingStyleFunc } from './heading.js';
import collapseFunc from './collapseFunc.js';
import microCreateElFunc from './microCreateElFunc.js';

const createFollowers = (_data, _cardContainer) => {
  const followersWrapper = microCreateElFunc(
    ['div'],
    'followers-wrapper',
    'show-div',
    'shadow3'
  );

  // CollapseButton
  const collapseBtn = microCreateElFunc(
    ['button', 'Followers'],
    'show-btn',
    'shadow1'
  );

  // Followers Div
  const followersDiv = microCreateElFunc(['div'], 'followers-div');

  followersWrapper.append(collapseBtn, followersDiv);

  if (!_data.followers) {
    console.log('User has no followers');

    const noFollowersPar = microCreateElFunc([
      'p',
      'User has no Followers or the profile is private.',
    ]);
    followersDiv.classList.add('bio-content');
    followersDiv.append(noFollowersPar);
    collapseBtn.addEventListener('click', collapseFunc);

    return followersWrapper;
  } else {
    fetch(_data.followers_url)
      .then((resp) => resp.json())
      .then((x_data) => {
        x_data.forEach((e) => {
          const follower = microCreateElFunc(['div'], 'follower');
          follower.dataQ = e.login; // so you can click on the li background and still show new follower.

          // Image
          const followerImg = microCreateElFunc(['img'], 'follower-img');
          followerImg.src = e.avatar_url;
          followerImg.alt = e.login;
          followerImg.style.outlineColor = imageBorderColor();

          // name
          const followerName = microCreateElFunc(['p'], 'follower-name');
          followerName.setAttribute('alt', e.login);
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
