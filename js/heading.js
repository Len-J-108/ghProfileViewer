import microCreateElFunc from './microCreateElFunc.js';

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

  let x = Math.floor(Math.random() * 6); // Variations in colored Text

  txt.split('').forEach((item, i, arr) => {
    if (x >= arrOfColors2.length) {
      x = 0;
    }
    const span = microCreateElFunc(['span', arr[i]]);
    span.style.color = arrOfColors2[x];
    x++;
    dest.append(span);
  });
};

export { headingStyleFunc };
