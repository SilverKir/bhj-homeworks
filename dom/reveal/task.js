const blocks = document.querySelectorAll('.reveal');

function isVisible(el) {
    const { top, bottom } = el.getBoundingClientRect();
    if (bottom < 0) {
        return false;
    }
    if (top > window.innerHeight / 2) {
        return false;
    }
    return true;
}


document.addEventListener('scroll', () => {
    blocks.forEach((block) => {
        if (isVisible(block)) {
            block.classList.add('reveal_active')
        } else { block.classList.remove('reveal_active') }
    })
})

