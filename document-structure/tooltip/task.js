const elementsHasTooltip = document.querySelectorAll(".has-tooltip");

const createElements = (position) => {
    elementsHasTooltip.forEach(element => {
        element.insertAdjacentHTML("afterEnd", `<div class="tooltip" data-position = "${position}">${element.title}</div>`);
    }
    )
};

const hideTooltips = (tooltip) => {
    const activeTooltips = document.querySelectorAll('.tooltip_active');
    activeTooltips.forEach(el => {
        if (el !== tooltip) {
            el.classList.remove('tooltip_active');
        }
    });
};

const getPosition = (element, tooltip) => {
    switch (tooltip.getAttribute('data-position')) {
        case 'bottom':
            return [element.getBoundingClientRect().bottom + 'px',
            element.getBoundingClientRect().left + 'px'];
        case 'top':
            return [element.getBoundingClientRect().top - tooltip.getBoundingClientRect().height + 'px',
            element.getBoundingClientRect().left + 'px'];
        case 'left':
            return [element.getBoundingClientRect().top + 'px',
            element.getBoundingClientRect().left - tooltip.getBoundingClientRect().width + 'px'];
        case 'right':
            return [element.getBoundingClientRect().top + 'px',
            element.getBoundingClientRect().right + 'px'];
    }
};

const showTooltip = (element) => {
    const tooltip = element.nextElementSibling;
    tooltip.classList.toggle('tooltip_active');
    if (tooltip.classList.contains('tooltip_active')) {
        tooltip.style.top = getPosition(element, tooltip)[0];
        tooltip.style.left = getPosition(element, tooltip)[1];
    }
};

createElements('bottom');

const body = document.querySelector("body");

body.onscroll = () => {
    const tooltip = document.querySelector('.tooltip_active');
    if (tooltip) {
        const element = tooltip.previousElementSibling;
        tooltip.style.top = getPosition(element, tooltip)[0];
        tooltip.style.left = getPosition(element, tooltip)[1];
    };
};

elementsHasTooltip.forEach(element => {
    element.addEventListener('click', (event) => {
        event.preventDefault();
        const tooltip = element.nextElementSibling;
        hideTooltips(tooltip);
        showTooltip(element);
    });
});
