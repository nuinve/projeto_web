document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.querySelector('.btn_menu');
    const menu = document.querySelector('nav.menu');
    const mainContent = document.querySelector('.main');

    menuBtn.addEventListener('click', function() {
        menu.classList.toggle('active');
        mainContent.classList.toggle('active');
    });
});