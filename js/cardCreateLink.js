import microCreateElFunc from './microCreateElFunc.js';
// create link function.
const createLink = (dataHtmlUrl, ...classes) => {
  const linkDiv = microCreateElFunc(
    ['div'],
    'w-100',
    'flex-row-center',
    'border-bottom'
  );
  const link = microCreateElFunc(['a', 'gh-page'], 'gh-link', 'margin-block-big', 'flex-row-center');
  link.href = dataHtmlUrl;
  linkDiv.append(link);
  return linkDiv;
};

export default createLink;
