document.addEventListener('DOMContentLoaded', () => {



//----------------------------Логика пишущей машинки в блоке Hero----------------------------
    const container = document.getElementById('info__typewriter');

    const words = [
        'БРОНИРОВАНИЕ СЛОТОВ ОНЛАЙН',
        'ОТСЛЕЖИВАНИЕ В РЕАЛЬНОМ ВРЕМЕНИ',
        'МОБИЛЬНОЕ ПРИЛОЖЕНИЕ',
        'АНАЛИТИКА И ОТЧЁТЫ'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingSpeed = 80;
    const deletingSpeed = 20;
    const pauseAfterType = 1800;
    const pauseAfterDelete = 300;

    function updateText() {
        const currentWord = words[wordIndex];
        let displayText = '';

        if (!isDeleting) {
            displayText = currentWord.substring(0, charIndex);

            if (charIndex < currentWord.length) {
                charIndex++;
                setTimeout(updateText, typingSpeed);
            } else {
                setTimeout(() => {
                    isDeleting = true;
                    updateText();
                }, pauseAfterType);
            }
        } else {
            displayText = currentWord.substring(0, charIndex);

            if (charIndex > 0) {
                charIndex--;
                setTimeout(updateText, deletingSpeed);
            } else {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(updateText, pauseAfterDelete);
            }
        }

        container.innerHTML = `
            <span class="info__typewriter-wrapper">
                ${displayText}
                <span class="typewriter-cursor"></span>
            </span>
        `;
    }

    updateText();



//----------------------------Логика для списка specifics----------------------------

    const listItems = document.querySelectorAll('.specifics__list-item');
    const imageCards = document.querySelectorAll('.specifics__image');

    if (listItems.length > 0 && imageCards.length > 0) {
        listItems.forEach((item, index) => {
            item.addEventListener('mouseenter', function () {
                listItems.forEach(el => el.classList.remove('accent-item'));

                this.classList.add('accent-item');

                imageCards.forEach(card => card.classList.add('card-hidden'));

                if (imageCards[index]) {
                    imageCards[index].classList.remove('card-hidden');
                }
            });
        });
    }
});



//----------------------------Логика для открытия popup'ов секции projects----------------------------

// Открытие модального окна по клику на карточку
document.querySelectorAll('.projects__card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        const modal = document.getElementById(`modal-${projectId}`);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // запрет прокрутки
        }
    });
});

// Закрытие по клику на оверлей или кнопку
document.querySelectorAll('[data-close]').forEach(element => {
    element.addEventListener('click', () => {
        const projectId = element.dataset.close;
        const modal = document.getElementById(`modal-${projectId}`);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // вернуть прокрутку
        }
    });
});

// Закрытие по нажатию Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.project-modal.active').forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});