const currency = {};
let valuteHtml = '';


const addValuteHtml = (charCode, value) => {
    currency[charCode] = value;
    valuteHtml += `<div class="item">
                    <div class="item__code">
                    ${charCode}
                </div>
                <div class="item__value">
                ${value}
                </div>
                <div class="item__currency">
                    руб.
                </div>
                </div>
                `
};

const updateHtml = () => {
    document.getElementById('items').innerHTML = '';
    document.getElementById('items').insertAdjacentHTML('afterbegin', valuteHtml);
}

const setInitialData = () => {
    if (localStorage.getItem("preloader")) {
        const initialCurrency = JSON.parse(localStorage.getItem("preloader"));
        if (initialCurrency) {
            for (let key in initialCurrency) {
                addValuteHtml(key, initialCurrency[key]);
            }
            updateHtml()
            document.getElementById("loader").classList.remove('loader_active');
        }
    }
};


const getValuteData = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
    xhr.send();
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText).response.Valute;
            valuteHtml = '';
            for (let valute in response) {
                addValuteHtml(response[valute].CharCode, response[valute].Value);
            }
            updateHtml()
            document.getElementById("loader").classList.remove('loader_active');
        }
    })
};

window.addEventListener('beforeunload', () => {
    localStorage.setItem("preloader", JSON.stringify(currency));
});

setInitialData();
getValuteData();
