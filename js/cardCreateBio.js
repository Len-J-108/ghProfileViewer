import { collapseFunc } from './card.js';

const createBio = (data, txt, ...classes) => {
  const bioDiv = document.createElement('div');
  bioDiv.classList.add(classes[0]);

  const contentDiv = document.createElement('div');
  contentDiv.classList.add(classes[1]);

  const collapseBtn = document.createElement('button');
  collapseBtn.classList.add(classes[2], classes[3]);
  collapseBtn.textContent = txt;

  const bioText = data ? data : 'User has no biography';
  const bio = `<p>${bioText}</p>`;

  contentDiv.insertAdjacentHTML('beforeend', bio);
  bioDiv.append(collapseBtn, contentDiv);

  collapseBtn.addEventListener('click', collapseFunc);

  return bioDiv;
};

export default createBio;
