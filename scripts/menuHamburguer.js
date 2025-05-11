const menuButton = document.getElementById('menu');
const navList = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
  menuButton.classList.toggle('open');
  navList.classList.toggle('open');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    menuButton.classList.remove('open');
    navList.classList.remove('open');
    navList.style.display = 'flex';
  } else {
    navList.style.display = ''; 
  }
});
