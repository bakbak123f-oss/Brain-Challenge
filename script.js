const questions = [
    { text: "12 + 8 = ?", answer: 20, options: [18, 20, 15, 17] },
    { text: "20 - 7 = ?", answer: 13, options: [12, 14, 13, 11] },
    { text: "6 × 4 = ?", answer: 24, options: [20, 24, 18, 16] },
    { text: "36 ÷ 6 = ?", answer: 6, options: [4, 5, 6, 7] },
    { text: "15 + 9 = ?", answer: 24, options: [22, 24, 26, 20] },
    { text: "18 - 5 = ?", answer: 13, options: [10, 12, 13, 14] },
    { text: "7 × 3 = ?", answer: 21, options: [18, 20, 21, 24] },
    { text: "40 ÷ 8 = ?", answer: 5, options: [5, 6, 7, 8] }
];

// Alle gegevens van de game staan samen in één object.
const game = {
    score: 0,
    currentQuestion: 0,
    correctAnswers: 0,
    questions: questions,
    answered: false
};

const homeScreen = document.querySelector("#homeScreen");
const gameScreen = document.querySelector("#gameScreen");
const resultScreen = document.querySelector("#resultScreen");

const startButton = document.querySelector("#startButton");
const nextButton = document.querySelector("#nextButton");
const restartButton = document.querySelector("#restartButton");
const menuButton = document.querySelector("#menuButton");

const questionCounter = document.querySelector("#questionCounter");
const scoreDisplay = document.querySelector("#scoreDisplay");
const progressBar = document.querySelector("#progressBar");
const questionText = document.querySelector("#questionText");
const answerButtons = document.querySelector("#answerButtons");
const feedback = document.querySelector("#feedback");

function showScreen(screenToShow) {
    [homeScreen, gameScreen, resultScreen].forEach((screen) => {
        screen.hidden = screen !== screenToShow;
        screen.classList.toggle("active", screen === screenToShow);
    });
}

function startGame() {
    game.score = 0;
    game.currentQuestion = 0;
    game.correctAnswers = 0;
    game.answered = false;

    scoreDisplay.textContent = game.score;
    showScreen(gameScreen);
    loadQuestion();
}

function loadQuestion() {
    game.answered = false;
    const question = game.questions[game.currentQuestion];

    questionCounter.textContent =
        `Vraag ${game.currentQuestion + 1} van ${game.questions.length}`;
    scoreDisplay.textContent = game.score;
    progressBar.style.width =
        `${(game.currentQuestion / game.questions.length) * 100}%`;
    questionText.textContent = question.text;
    feedback.textContent = "";
    feedback.className = "feedback";
    nextButton.hidden = true;
    answerButtons.replaceChildren();

    // Hussel de antwoorden, zodat het goede antwoord niet steeds op dezelfde plek staat.
    const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer-button";
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option, button));
        answerButtons.appendChild(button);
    });
}

function checkAnswer(selectedAnswer, selectedButton) {
    if (game.answered) return;
    game.answered = true;

    const question = game.questions[game.currentQuestion];
    const allAnswerButtons = answerButtons.querySelectorAll("button");

    allAnswerButtons.forEach((button) => {
        button.disabled = true;
        if (Number(button.textContent) === question.answer) {
            button.classList.add("correct");
        }
    });

    if (selectedAnswer === question.answer) {
        game.score += 125;
        game.correctAnswers += 1;
        feedback.textContent = "🎉 Helemaal goed! Je verdient 125 punten!";
        feedback.classList.add("good");
    } else {
        selectedButton.classList.add("incorrect");
        feedback.textContent = `Bijna! Het goede antwoord is ${question.answer}.`;
        feedback.classList.add("bad");
    }

    scoreDisplay.textContent = game.score;
    progressBar.style.width =
        `${((game.currentQuestion + 1) / game.questions.length) * 100}%`;

    nextButton.textContent =
        game.currentQuestion === game.questions.length - 1
            ? "Bekijk mijn score 🏆"
            : "Volgende vraag →";
    nextButton.hidden = false;
}

function showResults() {
    showScreen(resultScreen);

    document.querySelector("#finalScore").textContent = game.score;
    document.querySelector("#correctCount").textContent =
        `${game.correctAnswers} van de ${game.questions.length} antwoorden goed`;

    const resultTitle = document.querySelector("#resultTitle");
    const resultMessage = document.querySelector("#resultMessage");
    const resultStars = document.querySelector("#resultStars");

    if (game.score === 1000) {
        resultTitle.textContent = "Fantastisch! 🏆";
        resultMessage.textContent = "Perfect gespeeld! Jij bent een rekenkampioen!";
    } else if (game.score >= 625) {
        resultTitle.textContent = "Super gedaan! 🌟";
        resultMessage.textContent = "Je bent goed op weg. Blijf je brein trainen!";
    } else if (game.score >= 375) {
        resultTitle.textContent = "Goed geprobeerd! 💪";
        resultMessage.textContent = "Oefening baart kunst. Probeer het nog eens!";
    } else {
        resultTitle.textContent = "Blijf oefenen Strijder 💪";
        resultMessage.textContent = "Elke poging maakt je slimmer. Je kunt het!";
    }

    const stars = Math.round((game.score / 1000) * 5);
    resultStars.textContent = "★".repeat(stars) + "☆".repeat(5 - stars);
}

function goToNextQuestion() {
    if (!game.answered) return;

    game.currentQuestion += 1;

    if (game.currentQuestion >= game.questions.length) {
        showResults();
    } else {
        loadQuestion();
    }
}

function returnToMenu() {
    showScreen(homeScreen);
}

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", goToNextQuestion);
restartButton.addEventListener("click", startGame);
menuButton.addEventListener("click", returnToMenu);
