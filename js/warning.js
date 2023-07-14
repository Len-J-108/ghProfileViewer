// warning create function

const createWarning = (_err, _body) => {
  //create Element
  const warning = document.createElement('p');
  const warningBackground = document.createElement('div'); // create background for blur-fx.
  warningBackground.classList.add('warning-background'); // styling.

  warning.textContent = _err.message;
  _body.prepend(warningBackground); // put warning as firstChild of body.
  warningBackground.append(warning);

  //short intervall for loading...

  setTimeout(() => {
    warning.classList.add('warning', 'warning-animation-1');
    warningBackground.classList.add('zz');
  }, 10);
  // shows the warning for 5 sec. than resolves and dissappears
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

  // remove warning when clicked out of the green box.
  warningBackground.addEventListener('click', () => {
    warning.classList.remove('warning-animation-1'); // so the warning animation fires everytime
    warningBackground.remove(); // remove card => back to start
  });
};

//------------------------------------------------------------------------------------
// exports
export { createWarning };
