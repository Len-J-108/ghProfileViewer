// Selecting
const container = document.getElementById('container');
const searchInput = document.querySelector('input');
const searchBtn = document.querySelector('button');
const cardContainer = document.getElementById('card-container');
const body = document.querySelector('body');

// h1 Heading
const mainHeading = document.createElement('h1');
mainHeading.classList.add('main-heading');
body.prepend(mainHeading);

//heading Text
const h1Txt = 'Github Profile Viewer';

//------------------------------------------------------------------------------------
// heading style function

const headingStyleFunc = (txt, dest) => {
  const arrOfColors2 = [
    '#475569',
    '#ea580c',
    '#0891b2',
    '#1d4ed8',
    '#4a044e',
    '#78350f',
    '#6b7280',
    '#1a2e05',
  ];
  const txtSplit = txt.split('');
  console.log(txtSplit);

  let span2 = '';
  let x = 0;
  for (let i = 0; i < txtSplit.length; i++) {
    // span2 += `<span>${txtSplit[i]}</span>`
    if (x > arrOfColors2.length) {
      x = 0;
    }
    const span = document.createElement('span');
    span.textContent = txtSplit[i];
    span.style.color = arrOfColors2[x];
    x++;
    dest.append(span);
  }
};

// create H1 heading in colors
headingStyleFunc(h1Txt, mainHeading);
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
  body.prepend(warningBackground);
  warningBackground.append(warning);
  setTimeout(() => {
    warning.classList.add('warning', 'warning-animation-1');
    warningBackground.classList.add('zz');
  }, 10);
  const ff = () => {
    return new Promise((res) => {
      setTimeout(() => {
        res('warning-timeout resolved...');
      }, 5000);
    });
  };
  ff().then(() => {
    warning.classList.remove('warning-animation-1'); // so the warning animation fires everytime
    warningBackground.remove();
  });
};

const getGhData = async (_url) => {
  try {
    const res = await fetch(_url + searchInput.value);
    const data = await res.json();
    console.log(data);
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

  // appending
  ghName.append(closeBtn);
  card.append(ghName, ghImage);
  cardContainer.append(card);

  // card close Button
  closeBtn.addEventListener('click', () => {
    card.remove();
  });
};

searchBtn.addEventListener('click', () => {
  getGhData(ghUrl).then((data) => {
    createCard(data);
  });
});

warningBackground.addEventListener('click', () => {
  warning.classList.remove('warning-animation-1'); // so the warning animation fires everytime
  warningBackground.remove(); // remove card => back to start
});
