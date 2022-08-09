document.addEventListener("DOMContentLoaded", function () {

    let questionsHtml = '';

    const questions  = [
        {name: 'Вопрос 1', answers: [
            {name:"Да", radioName: "a", value: "Yes"},
            {name:"Нет", radioName: "a", value: "No"}
        ]},

        {name: 'Вопрос 2', answers: [
            {name:"Да", radioName: "b", value: "Yes"},
            {name:"Нет", radioName: "b", value: "No"}
        ]},

        {name: 'Вопрос 3', answers: [
            {name:"Да", radioName: "c", value: "Yes"},
            {name:"Нет", radioName: "c", value: "No"}
        ]},

        {name: 'Вопрос 4', answers: [
            {name:"Да", radioName: "d", value: "Yes"},
            {name:"Нет", radioName: "d", value: "No"}
        ]},

        {name: 'Вопрос 5', answers: [
            {name:"Да", radioName: "e", value: "Yes"},
            {name:"Нет", radioName: "e", value: "No"}
        ]}
    ];

    questions.forEach(block => {
        questionsHtml += "<div class=\"question\"><h2>" + block.name + "</h2>";
        block.answers.forEach(element => {
            questionsHtml += '<div class="answer"> <input type="radio" value="' + element.value + '" name= "' + element.radioName + '" />'+ element.name + '</div>'
        });
        questionsHtml += '</div>';
    });

    let html = document.getElementById('questions-container')
    html.insertAdjacentHTML('beforeend', questionsHtml)

    console.log(questionsHtml);

    document.getElementById('questionnaire__items').addEventListener('submit', function(event){
        event.preventDefault();

        const ansA = document.querySelector('[name="a"]'),
            ansB = document.querySelector('[name="b"]'),
            ansC = document.querySelector('[name="c"]'),
            ansD = document.querySelector('[name="d"]'),
            ansE = document.querySelector('[name="e"]');

        const data = [
            ansA.checked,
            ansB.checked,
            ansC.checked,
            ansD.checked,
            ansE.checked
        ];


        let yes = 0;
        let no = 0;
        const all = 5;

        data.forEach(element => {
            if(element === true){
                yes++;
            }else{
                no++;
            }
        });

        drawDiagram(yes, no, all);

    })

    function drawDiagram(yesAns, noAns, allAns) {
        let canvas = document.getElementById("myСanvas");
        let ctx = canvas.getContext('2d');
        canvas.height = 300;
        canvas.width = 300;


        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(150,150);
        ctx.arc(150, 150, 150, 0, yesAns / allAns * (2 * Math.PI));
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(150,150);
        ctx.arc(150,150,150, yesAns / allAns * (2 * Math.PI), noAns / allAns * (2 * Math.PI) + yesAns / allAns * (2 * Math.PI));
        ctx.closePath();
        ctx.fill();

        let legend = document.getElementById('legend');
        legend.classList.add('legend--active');
    }


})