/**
 * Проверяет наличие продукта в корзине
 * @param {INT} id Код продукта
 * @returns   Количество продукта в корзине, если нет возвращает Null
 */
function getQuantityInBasket(id) {
    const products = document.querySelector(`.cart__product[data-id="${id}"]`)
    return products ? parseInt(products.querySelector('.cart__product-count').innerText) : null;
}

/**
 * Изменяем количество продукта в корзине
 * если количество продукта равно 0 , то продукт из корзины удаляется
 * @param {Int} id код продукта
 * @param {Int} quantity  количество
 */
const changeQuantityInBasket = (id, quantity) => {
    const products = document.querySelector(`.cart__product[data-id="${id}"]`);
    const currentQuantity = parseInt(products.querySelector('.cart__product-count').innerText) +
        quantity;
    if (currentQuantity > 0) {
        products.querySelector('.cart__product-count').innerText = currentQuantity;
    } else {
        products.remove();
    }
}

/**
 * Добавление продукта в корзину (если его нет)
 * @param {*} id код продукта 
 * @param {*} quantity количество
 */
const addProductInBasket = (id, quantity) => {
    const basket = document.querySelector('.cart__products');
    if (!getQuantityInBasket(id)) {
        const element = document.querySelector(`.product[data-id="${id}"]`);
        const image = element.querySelector('.product__image').getAttribute('src')
        basket.insertAdjacentHTML('afterbegin',
            `<div class="cart__product" data-id="${id}">
        <img class="cart__product-image" src=${image}>
        <div class="cart__product-count">${quantity}</div>
        </div>`
        )
    } else {
        changeQuantityInBasket(id, quantity);
    }
}

/**
 * Заполняем сохраненнуб корзину
 */
const setInitialData = () => {
    for (var i = 0; i < localStorage.length; i++) {
        addProductInBasket(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
    }
};

setInitialData();

/**
 * Работа с карточкой продукта
 */
const products = document.querySelectorAll('.product');

products.forEach(element => {
    const button = element.querySelector('.product__add');
    const productQuantity = element.querySelector('.product__quantity-value');
    const quantityControl = element.querySelectorAll('.product__quantity-control');
    let quantity = parseInt(productQuantity.innerText.trim());
    const id = element.getAttribute('data-id');

    button.addEventListener('click', () => {

        if (quantity != 0) {
            addProductInBasket(id, quantity)
            quantity = 1;
            productQuantity.innerText = 1;
        }

    })

    quantityControl.forEach(elem => {
        elem.addEventListener('click', () => {
            const basketQuantity = getQuantityInBasket(id);

            if (elem.classList.contains('product__quantity-control_dec')) {
                if (basketQuantity > Math.abs(quantity) && quantity <= 0 || quantity > 0)
                    quantity--;
            } else {
                quantity++;
            };

            if (quantity < 0) {
                button.innerText = "Удалить из корзины";
            } else {
                button.innerText = "Добавить в корзину";
            }

            productQuantity.innerText = quantity;
        })

    });

});

/**
 * Занесение в память
 */
window.addEventListener('beforeunload', () => {
    localStorage.clear();
    const products = document.querySelectorAll(".cart__product");
    products.forEach(element => {
        const id = element.getAttribute('data-id')
        localStorage.setItem(id, getQuantityInBasket(id));
    });

});
