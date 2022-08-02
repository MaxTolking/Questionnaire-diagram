document.addEventListener("DOMContentLoaded", function () {
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
                no++
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

    }

    
})                                                                                                   