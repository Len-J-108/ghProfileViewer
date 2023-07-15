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
  // console.log(txtSplit);

  let x = Math.floor(Math.random() * 6); // Variations in colored Text
  for (let i = 0; i < txtSplit.length; i++) {
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

//------------------------------------------------------------------------------------
// exports
export { headingStyleFunc };
