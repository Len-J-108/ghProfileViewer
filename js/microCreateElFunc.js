const microCreateElFunc = (arg, ...classes) => {
  const element = document.createElement(arg[0]);
  element.textContent = arg[1];
  element.classList.add(...classes);
  return element;
};

export default microCreateElFunc;

// arg[0] => element tag
// arg[1] => elements textContent
// ...classes => add class names
