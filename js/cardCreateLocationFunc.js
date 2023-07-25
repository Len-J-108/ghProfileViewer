import cardHeadingFunc from './cardHeadingFunc.js';

const createLocation = (_data) => {
  if (_data.location) {
    const xx = cardHeadingFunc('h3', _data.location, 'location-h3');
    return xx;
  }
  return '_no location given_';
};

export default createLocation;
