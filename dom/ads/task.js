const rotators = document.querySelectorAll('.rotator__case');
let firstElement = 0;

function getRandom(max) {
    return Math.floor(Math.random() * max);
};

function setRotator(elements, classText) {
    const elementsCount = elements.length;
    let elementNumber = getRandom(elementsCount);
    let element = elements[elementNumber];
    elements[firstElement].classList.remove(classText);
    element.classList.add(classText);
    let timeout = parseInt(element.getAttribute('data-speed'));
    element.style.color = element.getAttribute('data-color');
    firstElement = elementNumber;
    setTimeout(() => this.setRotator(elements, classText), timeout);
}

setRotator(rotators, 'rotator__case_active');

