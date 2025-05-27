document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navigation = document.querySelector('nav');

    if (hamburgerMenu && navigation) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('open');
            navigation.classList.toggle('open');
        });

        navigation.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('open');
                navigation.classList.remove('open');
            });
        });
    } else {
        console.error('Um ou ambos os elementos (hamburger-menu ou nav) não foram encontrados.');
    }

    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }
});