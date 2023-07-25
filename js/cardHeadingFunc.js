import { headingStyleFunc } from './heading.js';

const cardHeadingFunc = (heading, data, ...classes) => {
  const el = document.createElement(heading);
  el.classList.add(...classes);
  headingStyleFunc(data, el);
  return el;
};

export { cardHeadingFunc };
