
const textData = document.getElementById('editor');

const setInitialData = () => {
    let initialData = localStorage.getItem("textEditor");
    if (initialData) {
        textData.value = initialData;
    }
    textData.insertAdjacentHTML('afterend',
        `<button class="clear__button">
            Очистить
        </button>`
    )
};

setInitialData();

document.querySelector('.clear__button').onclick = () => {
    textData.value = "";
}


window.addEventListener('beforeunload', () => {
    localStorage.setItem("textEditor", textData.value);
});