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
 * Анимация, в зависимости от наличия товара в корзине меняется место прилета,
 * в зависимости отрицательного или положительного изменения количества товара,
 * меняется направление полета 
 * @param {*} id индекс товара
 * @param {*} quantity количество выбранного товара
 */
const setAnimation = (id, quantity) => {
    const quantityInBasket = getQuantityInBasket(id);
    const count = 20;
    const timeout = 50;
    const element = document.querySelector(`.product[data-id="${id}"]`);
    const image = element.querySelector('.product__image');
    const product = quantityInBasket ? document.querySelector(`.cart__product[data-id="${id}"]`) : document.querySelector(`.cart__product`)
    const startPosition = image.getBoundingClientRect();
    const endPosition = document.querySelector(`.cart__product`) ? product.querySelector('.cart__product-image').getBoundingClientRect() : document.querySelector(`.cart`).getBoundingClientRect();

    let leftDelta = quantityInBasket ? (endPosition.left - startPosition.left) / count : (endPosition.left * 2 - endPosition.right - startPosition.left) / count;
    if (!document.querySelector(`.cart__product`)) {
        leftDelta = (window.innerWidth / 2) / count;
    }
    let topDelta = (endPosition.top - startPosition.top) / count;
    let currentLeft = quantity > 0 ? startPosition.left : endPosition.left;
    let currentTop = quantity > 0 ? startPosition.top : endPosition.top;
    let index = 1;
    let clone = image.cloneNode();
    element.appendChild(clone)
    clone.style.position = 'absolute';
    clone.style.left = currentLeft + "px";
    clone.style.top = currentTop + "px";

    const startAnimation = () => {
        if (quantity > 0) {
            currentLeft += leftDelta;
            currentTop += topDelta;
        } else {
            currentLeft -= leftDelta;
            currentTop -= topDelta;
        }

        clone.style.left = currentLeft + "px";
        clone.style.top = currentTop + "px";
        index++;

        if (index > count) {
            clearInterval(timeInterval);
            clone.remove();
            if (quantity > 0) {
                addProductInBasket(id, quantity);
            }
        }

    }

    let timeInterval = setInterval(startAnimation, timeout)

    if (quantity < 0) {
        addProductInBasket(id, quantity)
    };
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
 * Заполняем сохраненну корзину
 */
const setInitialData = () => {
    let productBasket = JSON.parse(localStorage.getItem("productBasket"));
    for (let key in productBasket) {
        addProductInBasket(parseInt(key), parseInt(productBasket[key]));
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
        setAnimation(id, quantity);
        quantity = 1;
        productQuantity.innerText = 1;
        button.innerText = "Добавить в корзину";
    })

    quantityControl.forEach(elem => {
        elem.addEventListener('click', () => {
            const basketQuantity = getQuantityInBasket(id);

            if (elem.classList.contains('product__quantity-control_dec')) {
                if (basketQuantity > Math.abs(quantity) && quantity <= 0 || quantity > 0)
                    quantity--;
                if (quantity === 0) {
                    quantity = !basketQuantity ? 1 : --quantity;
                }

            } else {
                quantity++;
                if (quantity === 0)
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

    const products = document.querySelectorAll(".cart__product");
    let productBasket = {};
    products.forEach(element => {
        const id = element.getAttribute('data-id')
        productBasket[id] = getQuantityInBasket(id);
    });
    localStorage.setItem("productBasket", JSON.stringify(productBasket));

});
