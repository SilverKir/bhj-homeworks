const fontSizeTabs = document.querySelectorAll('.font-size');
const textColorTabs = document.querySelectorAll('a[data-text-color]');
const textBackgroundTabs = document.querySelectorAll('a[data-bg-color]');
let initialSize = 1;
let initialColor = 0;
let initialBackground = 2;
const book = document.getElementById('book');

fontSizeTabs.forEach((tab, index) => {
    tab.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (initialSize != index) {
            fontSizeTabs[initialSize].classList.remove('font-size_active');
            tab.classList.add('font-size_active');
            initialSize = index;
            updateBook();
        }
    })
})

textColorTabs.forEach((tab, index) => {
    tab.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (initialColor != index) {
            textColorTabs[initialColor].classList.remove('color_active');
            tab.classList.add('color_active');
            initialColor = index;
            updateBook();
        }
    })
})

textBackgroundTabs.forEach((tab, index) => {
    tab.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (initialBackground != index) {
            textBackgroundTabs[initialBackground].classList.remove('color_active');
            tab.classList.add('color_active');
            initialBackground = index;
            updateBook();
        }
    })
})

updateBook = () => {
    book.className = "book";
    const fontSize = fontSizeTabs[initialSize].getAttribute('data-size');
    if (fontSize) {
        book.classList.add('book_fs-' + fontSize);
    }
    book.classList.add('book_color-' + textColorTabs[initialColor].getAttribute('data-text-color'));
    book.classList.add('book_bg-' + textBackgroundTabs[initialBackground].getAttribute('data-bg-color'));
}
