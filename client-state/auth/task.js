
const setInitialData = () => {
    if (localStorage.getItem('user_id')) {
        setUserId(localStorage.getItem('user_id'));
    }
    else {
        setSignin();
    }
}

const setUserId = (userId) => {
    document.getElementById('signin').classList.remove('signin_active');
    document.getElementById('welcome').classList.add('welcome_active');
    document.getElementById('user_id').textContent = userId;
    if (!document.querySelector('.clear__button')) {
        document.querySelector('.card').insertAdjacentHTML('afterend',
            `<button class="clear__button">
            Деавторизовать
        </button>`
        )
        setButton();
    }

}

const setButton = () => {
    let button = document.querySelector('.clear__button')
    button.onclick = () => {
        localStorage.removeItem("user_id");
        document.getElementById('signin').classList.toggle('signin_active');
        document.getElementById('welcome').classList.toggle('welcome_active')
        button.remove();
        setSignin();
    }
}


const setSignin = () => {
    const form = document.getElementById('signin__form');
    form.reset();
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let data = new FormData(form);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth');
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === xhr.DONE) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    setUserId(response.user_id);
                    localStorage.setItem("user_id", response.user_id);

                } else {
                    alert('«Неверный логин/пароль»');
                }
            }
        })

        xhr.send(data);
    });
}

setInitialData();