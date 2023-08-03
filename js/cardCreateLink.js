import microCreateElFunc from './microCreateElFunc.js';
// create link function.
const createLink = (dataHtmlUrl, ...classes) => {
  const link = microCreateElFunc(
    ['a'],
    'w-100',
    'flex-row-center',
    'border-bottom'
  );
  link.href = dataHtmlUrl;
  const linkImage = microCreateElFunc(['img'], ...classes);
  linkImage.src = '../images/gh-btn-round2.png';
  link.append(linkImage);
  return link;
};

export default createLink;
