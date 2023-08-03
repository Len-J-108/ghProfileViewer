import collapseFunc from './collapseFunc.js';
import microCreateElFunc from './microCreateElFunc.js';

const createBio = (data, txt, ...classes) => {
  const bioDiv = microCreateElFunc(['div'], classes[0], 'w-100');
  const contentDiv = microCreateElFunc(['div'], classes[1]);
  const collapseBtn = microCreateElFunc(
    ['button', txt],
    'cursor',
    'fs-m',
    'border-bottom',
    'collapse-btn',
    'w-100'
  );
  const bioText = data ? data : 'User has no biography';
  const bio = `<p class="bio-dark-text">${bioText}</p>`;
  contentDiv.insertAdjacentHTML('beforeend', bio);
  bioDiv.append(collapseBtn, contentDiv);
  collapseBtn.addEventListener('click', collapseFunc);

  return bioDiv;
};

export default createBio;
