// Selecting
const container = document.getElementById('container');
const searchInput = document.querySelector('input');
const searchBtn = document.querySelector('button');
const card = document.getElementById('card');
const body = document.querySelector('body');

// h1 Heading
const mainHeading = document.createElement('h1');
mainHeading.classList.add('main-heading');
mainHeading.textContent = 'Github Profile Viewer';
body.prepend(mainHeading);

//------------------------------------------------------------------------------------
// heading style function

const h1StyleFunc = () => {
  const txt = 'Github Profile Viewer';
  const arrOfGray = [
    '#737373',
    '#78716c',
    '#6b7280',
    '#4b5563',
    '#334155',
    '#292524',
    '#18181b',
  ];
  const span = document.createElement('span');
  const span2 = `<span></span>`;
  const txtSplit = txt.split('');
  console.log(txtSplit)
  txtSplit.forEach((e) => {
    if (e === ' ') return;
    
  })
};

h1StyleFunc()

//------------------------------------------------------------------------------------

// warning
const warning = document.createElement('p');
const warningBackground = document.createElement('div');
warningBackground.classList.add('warning-background');

// Container
container.classList.add('container');

// Input
searchInput.classList.add('input');
searchBtn.classList.add('btn');

// Card
card.classList.add('gh-card');

// Url
const ghUrl = 'https://api.github.com/users/';

// image outline color function
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

// warning create function
const createWarning = (_err) => {
  warning.textContent = _err.message;
  card.append(warningBackground);
  warningBackground.append(warning);
  setTimeout(() => {
    warning.classList.add('warning', 'test');
  }, 10);
};

const getGhData = async (_url) => {
  try {
    const res = await fetch(_url + searchInput.value);
    const data = await res.json();
    if (!searchInput.value) {
      throw new Error('Invalid Input');
    }
    if (data.message === 'Not Found') {
      throw new Error('Name not found...');
    }
    if (res.status >= 400) {
      throw new Error('something is WRONG');
    }
    console.log(data); // logging the response data
    searchInput.value = ''; // deletes text in input after search.
    return data;
  } catch (err) {
    createWarning(err);
  }
};

const createCard = (_data) => {
  // showName
  const ghName = document.createElement('h3');
  ghName.textContent = _data.name;
  ghName.classList.add('name');

  //show Image
  const ghImage = document.createElement('img');
  ghImage.src = _data.avatar_url;
  ghImage.classList.add('gh-image');
  ghImage.style.borderColor = imageBorderColor();

  // appending
  card.append(ghName, ghImage);
};

searchBtn.addEventListener('click', () => {
  getGhData(ghUrl).then((data) => {
    createCard(data);
  });
  // .catch((err) => {
  //   createWarning(err);
  // });
});

warningBackground.addEventListener('click', () => {
  warningBackground.remove();
});
