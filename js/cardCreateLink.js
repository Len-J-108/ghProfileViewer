// create link function.
const createLink = (dataHtmlUrl, ...classes) => {
  const link = document.createElement('a');
  link.href = dataHtmlUrl;
  const linkImage = document.createElement('img');
  linkImage.src = '../images/gh-btn-round2.png';
  linkImage.classList.add(...classes);
  link.append(linkImage);
  return link;
};

export default createLink;
