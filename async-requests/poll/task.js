let questionId = null;
let answersData = [];
const pollAnswers = document.getElementById('poll__answers');


const setHtmlData = (title, buttons) => {
    document.getElementById('poll__title').textContent = title;
    pollAnswers.innerHTML = '';
    let htmlData = '';
    buttons.forEach(element => {
        htmlData += `<button class="poll__answer"> 
            ${element}</button >
            `
    });
    pollAnswers.insertAdjacentHTML('afterbegin', htmlData);
};


const getBattonData = () => {
    const buttons = document.querySelectorAll('.poll__answer');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('«Спасибо, ваш голос засчитан!»');
            let answerID = answersData.indexOf(btn.textContent.trim());
            sendAnswer(questionId, answerID);
        })
    })
};

const setStatisticData = (stat) => {
    let clickSumm = 0;
    let statisticData = "";

    stat.forEach(element => {
        clickSumm += element.votes
    });

    stat.forEach(element => {
        statisticData += `<div> ${element.answer}: <strong>${(element.votes * 100 / clickSumm).toFixed(2)}% </strong></div>
                   `
    });
    pollAnswers.innerHTML = statisticData;

    setTimeout(getQuestions, 3000);
};








const sendAnswer = (id, answerID) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(`vote=${id}&answer=${answerID}`);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            setStatisticData(JSON.parse(xhr.responseText).stat);
        };
    };
};


const getQuestions = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
    xhr.send();
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            questionId = response.id;
            answersData = response.data.answers
            setHtmlData(response.data.title, response.data.answers)
            getBattonData();
        }
    })
};


getQuestions();


