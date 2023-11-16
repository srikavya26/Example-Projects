document.addEventListener('DOMContentLoaded', function () {
    const image = document.querySelector('.zoom-fade-image');
    window.addEventListener('scroll', function () {
        const scrollPercentage = (window.scrollY / window.innerHeight) * 100;

        image.style.transform = `scale(${1 + (scrollPercentage / 100)})`;
        image.style.opacity = 1 - (scrollPercentage / 100);


        if (scrollPercentage >= 100) {
            image.classList.add('zoomed');
        } else {
            image.classList.remove('zoomed');
        }
    });
});