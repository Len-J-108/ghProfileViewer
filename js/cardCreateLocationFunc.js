import cardHeadingFunc from './cardHeadingFunc.js';

const createLocation = (data, ...classes) => {
  if (data) {
    const xx = cardHeadingFunc('h3', data, ...classes);
    return xx;
  }
  return '_no location given_';
};

export default createLocation;
