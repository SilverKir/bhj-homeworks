const form = document.getElementById('tasks__form');
const taskInput = document.getElementById('task__input');
taskInput.required = true;

/**
 *  Загружаем данные в html
 * @param {*} value  - значение в поле ввода
 */
const insertData = (value) => {
    const taskList = document.getElementById('tasks__list');
    taskList.insertAdjacentHTML('afterbegin',
        `<div class="task">
        <div class="task__title">
       ${value}
        </div>
        <a href="#" class="task__remove">&times;</a>
      </div>`)
};

/**
 * Загрузка начальных значений из localStorage
 */

const setInitialData = () => {
    for (var i = 0; i < localStorage.length; i++) {
        insertData(localStorage.getItem(localStorage.key(i)));
    }
};

/**
 * Функция добавления события
 * @param {*} element - элемент на котором слушается событие
 */

const updateEventListener = (element) => {
    element.addEventListener('click', (event) => {
        event.preventDefault();
        const task = element.parentElement;
        const taskText = element.previousElementSibling.textContent.trim();
        localStorage.removeItem(taskText);
        task.remove();
    })
};


setInitialData();
// localStorage.clear();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    insertData(taskInput.value);
    localStorage.setItem(taskInput.value, taskInput.value);
    form.reset();
    const newRemover = document.querySelector('.task__remove');
    updateEventListener(newRemover);
});


const taskRemove = document.querySelectorAll('.task__remove');
taskRemove.forEach(element => updateEventListener(element));


