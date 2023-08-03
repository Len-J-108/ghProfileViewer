const collapseFunc = (ev) => {
  const hideContent = ev.target.nextElementSibling;

  if (hideContent.style.maxHeight) {
    hideContent.style.maxHeight = null;
  } else {
    if (ev.target.innerText === 'Bio') {
      hideContent.style.maxHeight = hideContent.scrollHeight + 'px';
    }
    if (ev.target.innerText === 'Followers') {
      hideContent.style.maxHeight = 500 + 'px';
      hideContent.style.overflowY = 'auto';
    }
  }
};

export default collapseFunc;
