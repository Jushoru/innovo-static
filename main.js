document.addEventListener('DOMContentLoaded', () => {


//----------------------------Бургер меню----------------------------
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('navigation-mobile');
    const closeBtn = mobileNav.querySelector('.navigation-mobile__close');
    const overlay = document.getElementById('mobile-nav-overlay');
    const navLinks = mobileNav.querySelectorAll('.mobile-menu-list a');

    const openMenu = () => {
        mobileNav.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // блокируем скролл
    };

    const closeMenu = () => {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Открытие
    burger.addEventListener('click', openMenu);

    // Закрытие по крестику
    closeBtn.addEventListener('click', closeMenu);

    // Закрытие по клику на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Закрытие по клику на оверлей
    overlay.addEventListener('click', closeMenu);

    // Закрытие по нажатию Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });

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



//----------------------------Логика для стрелок projects----------------------------

const carousel = document.querySelector('[data-carousel]');

const navContainer = carousel.parentElement.querySelector('.projects__nav-container');
const prevBtn = carousel.parentElement.querySelector('.projects__nav--prev');
const nextBtn = carousel.parentElement.querySelector('.projects__nav--next');

// Проверяем, нужно ли вообще отображать навигацию
function updateNavVisibility() {
    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;
    const scrollLeft = carousel.scrollLeft;

    const shouldShowNav = scrollWidth > clientWidth;

    // Управляем кнопками
    prevBtn.toggleAttribute('hidden', !shouldShowNav);
    nextBtn.toggleAttribute('hidden', !shouldShowNav);

    // Управляем ВСЕМ контейнером навигации
    if (navContainer) {
        navContainer.style.display = shouldShowNav ? 'flex' : 'none';
    }

    // Отключаем кнопки на краях
    prevBtn.disabled = scrollLeft === 0;
    nextBtn.disabled = scrollLeft + clientWidth >= scrollWidth - 1;
}

// Прокрутка на ширину карточки (или 80% ширины контейнера)
function scrollByCard(direction) {
    const card = carousel.querySelector('.projects__card');
    const cardWidth = card ? card.offsetWidth + parseInt(getComputedStyle(carousel).gap) : carousel.clientWidth * 0.8;
    carousel.scrollBy({
        left: direction * cardWidth,
        behavior: 'smooth'
    });
}

// Слушаем скролл и изменение размера
carousel.addEventListener('scroll', updateNavVisibility);
window.addEventListener('resize', updateNavVisibility);

// Кнопки
prevBtn?.addEventListener('click', () => scrollByCard(-1));
nextBtn?.addEventListener('click', () => scrollByCard(1));

// Инициализация
updateNavVisibility();


//----------------------------Логика для открытия popup'ов секции projects----------------------------

// Открытие модального окна по клику на карточку
document.querySelectorAll('.projects__card, .trial-period-button').forEach(card => {
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
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});