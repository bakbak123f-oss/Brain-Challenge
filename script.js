
let score = 0;
const correctAnswer = 8;

const answerInput = document.querySelector("#answer");
const checkButton = document.querySelector("#checkButton");
const feedback = document.querySelector("#feedback");
const scoreDisplay = document.querySelector("#score");

checkButton.addEventListener("click", function () {
    const answer = Number(answerInput.value);

    if (answerInput.value === "") {
        feedback.textContent = "Vul eerst een antwoord in!";
    } else if (answer === correctAnswer) {
        feedback.textContent = "Goed gedaan! ";
        score++;
        scoreDisplay.textContent = "Score: " + score;
    } else {
        feedback.textContent = "Helaas, probeer het opnieuw!";
    }
});
