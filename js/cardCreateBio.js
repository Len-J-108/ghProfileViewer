import collapseFunc from './collapseFunc.js';
import microCreateElFunc from './microCreateElFunc.js';

const createBio = (data, txt, ...classes) => {
  const bioDiv = microCreateElFunc(['div'], classes[0], 'show-btn');
  const contentDiv = microCreateElFunc(['div'], classes[1], );
  const collapseBtn = microCreateElFunc(
    ['button', txt],
    classes[2],
    classes[3],
    'cursor',
    'fs-m'
  );
  const bioText = data ? data : 'User has no biography';
  const bio = `<p class="bio-dark-text">${bioText}</p>`;
  contentDiv.insertAdjacentHTML('beforeend', bio);
  bioDiv.append(collapseBtn, contentDiv);
  collapseBtn.addEventListener('click', collapseFunc);

  return bioDiv;
};

export default createBio;
