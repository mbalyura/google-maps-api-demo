export default (show) => {
  const spinner = document.querySelector('.spinner');
  spinner.style.display = show ? 'block' : 'none';
};
