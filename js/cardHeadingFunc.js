import { headingStyleFunc } from './heading.js';
import microCreateElFunc from './microCreateElFunc.js';

const cardHeadingFunc = (heading, data, ...classes) => {
  const el = microCreateElFunc([heading], ...classes);
  el.classList.add(...classes);
  headingStyleFunc(data, el);
  return el;
};

export default cardHeadingFunc;
