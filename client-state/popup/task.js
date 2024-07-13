const setInitialData = () => {
    const popup = document.getElementById('subscribe-modal');
    popup.classList.add('modal_active');
}

const setCloseModal = () => {
    document.querySelector(".modal__close").addEventListener('click',
        () => {
            document.getElementById('subscribe-modal').classList.remove('modal_active');
            setCookie('modal', 'close');
        }
    )
}

const setCookie = (name, value) => {
    document.cookie = name + '=' + encodeURIComponent(value);
}

const getCookie = (name) => {
    const value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts
            .pop()
            .split(";")
            .shift();
    }
}

if (!getCookie('modal')) {
    setInitialData();
    setCloseModal();
}
