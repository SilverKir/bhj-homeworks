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
    let initialData = JSON.parse(localStorage.getItem("todoList"));
    if (initialData) {
        for (let i = initialData.length - 1; i >= 0; i--) {
            insertData(initialData[i]);
        }
    }
};

/**
 * Функция обновления удаления записей
 * @param {*} element - новый элемент удаления записей
 */

const updateRemoverEvent = (element) => {
    element.addEventListener('click', (event) => {
        event.preventDefault();
        element.parentElement.remove();
    })
};

//localStorage.clear();
setInitialData();


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = taskInput.value.trim();
    if (inputValue) {
        insertData(inputValue);
        const newRemover = document.querySelector('.task__remove');
        updateRemoverEvent(newRemover);
    }
    form.reset();

});


const taskRemove = document.querySelectorAll('.task__remove');
taskRemove.forEach(element => updateRemoverEvent(element));


/**
 * Занесение в память список задач
 */
window.addEventListener('beforeunload', () => {
    const products = document.querySelectorAll(".task__title");
    let taskList = [];
    products.forEach(element => {
        taskList.push(element.textContent.trim())
    });
    localStorage.setItem("todoList", JSON.stringify(taskList));
});

