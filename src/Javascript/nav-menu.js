const mobileBtn = document.getElementById('mobile-cta');
const nav = document.getElementById('nav');
mobileBtnExit = document.getElementById('mobile-exit');

mobileBtn.addEventListener('click', () => {
    nav.style.display = 'block';
})
mobileBtnExit.addEventListener('click', () => {
    nav.style.removeProperty('display');
})