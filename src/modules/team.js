//Наша команда. при наведение курсора меняется фото
const team = () => {
    const commandPhoto = document.querySelectorAll('.container')[7];
    const img = commandPhoto.querySelectorAll('img');

    const changingPhotos = (event) => {
        const target = event.target;
        if (target.classList.contains('command__photo')) {
            const lastSrc = target.src;

            target.src = target.dataset.img;
            target.dataset.img = lastSrc;
        }
    };

    img.forEach((image) => {
        image.addEventListener('mouseover', changingPhotos);
        image.addEventListener('mouseout', changingPhotos);
    })
};

export default team;