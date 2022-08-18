let questionsIds = [];

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('questionnaire__create-btn').addEventListener('click', (e) => {
        e.preventDefault();

        const createForm = document.getElementById('questionnaire__submit');
        createForm.classList.add('questionnaire__submit--active');
    });

    document.getElementById('questionnaire__submit').addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(questionnaire__submit);
        const questionName = formData.get('questionName');
        const answers = [formData.get('answerNameA'), formData.get('answerNameB')];

        let questionId = questionsIds.length === 0 ? 1 : questionsIds[questionsIds.length - 1] + 1;
        questionsIds.push(questionId);

        let questionsHtml = '';
        questionsHtml += "<div class=\"question\"><h2>" + questionName + "</h2>";
        answers.forEach(element => {
            questionsHtml += '<div class="answer"> <input type="radio" value="' + element + '" name= "answer_' + questionId + '" /> <h3> '+ element + ' </h3>';
            questionsHtml += '</div>';
        });
        questionsHtml += '<div class="answer"> <input type="radio" value="other" name= "answer_' + questionId + '" /> <h3> Другое </h3>';
        questionsHtml += '<input type="text" class="another-answer" placeholder="Введите своё решение..." name= "answer_' + questionId + '_text">'
        questionsHtml += '</div>';
        questionsHtml += '</div>';

        let html = document.getElementById('questionsContainer')
        html.insertAdjacentHTML('beforeend', questionsHtml)
    });

    document.getElementById('questionnaire__submit-btn-close').addEventListener('click', (c) => {
        c.preventDefault();

        const closeForm = document.getElementById('questionnaire__submit');
        closeForm.classList.remove('questionnaire__submit--active');
    });


    document.getElementById('questionnaire__btn-show').addEventListener('submit', function(event){
        event.preventDefault();

        const formData = new FormData(questionsContainer);
        let answersValues = [];
        questionsIds.forEach(id => {
            if(formData.get('answer_' + id) === 'other'){
                answersValues.push(formData.get('answer_' + id + '_text'));
            }else{
                answersValues.push(formData.get('answer_' + id));
            }
        });

        let allAns = answersValues.length;
        let answersData = {};
        answersValues.forEach(element => {
            answersData[element] = 0;
        });

        answersValues.forEach(element => {
            answersData[element]++;
        });
        drawDiagram(answersData, allAns);
    })

    function drawDiagram(answersCount, allAns) {
        let canvas = document.getElementById("myСanvas");
        let ctx = canvas.getContext('2d');
        canvas.height = 300;
        canvas.width = 300;

        let legendHtml = '';
        let drawnСontent = 0;
        for (let key in answersCount) {
            let color = '#'+(Math.random().toString(16)+'00000').slice(2,8);
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(150,150);
            ctx.arc(150, 150, 150, drawnСontent, answersCount[key] / allAns * (2 * Math.PI) + drawnСontent);
            ctx.closePath();
            ctx.fill();

            legendHtml += '<div class="legend__item"> <div class="legend__icon" style="background: ' + color + '"></div><h3>Ответ "' + key + '"</h3></div>';

            drawnСontent += answersCount[key] / allAns * (2 * Math.PI);
        }

        let legend = document.getElementById('legend');
        legend.insertAdjacentHTML('beforeend', legendHtml);
        legend.classList.add('legend--active');
    }

})