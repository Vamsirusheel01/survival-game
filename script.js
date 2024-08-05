const characters = ["Vamsi", "Pavan", "Shivaram", "Aditya", "Pranay", "Anusha", "Akshitha"];
let playerName = '';
let currentQuestion = 0;
let answers = [];
let survivalScore = 0;

const questions = [
    "You need to build a shelter. Who would you choose to help you?",
    "You need to find water. Who would you choose to help you?",
    "You need to start a fire. Who would you choose to help you?",
    "You need to find food. Who would you choose to help you?",
    "You need to navigate the area. Who would you choose to help you?",
    "You need to keep watch at night. Who would you choose to help you?",
    "You need to handle a medical emergency. Who would you choose to help you?",
    "You need to plan the next steps. Who would you choose to help you?",
    "You need to boost morale. Who would you choose to help you?",
    "You need to stay calm under pressure. Who would you choose to help you?"
];

const situations = [
    "You and your friends are stranded in a dense rainforest after a plane crash. You must work together to survive. Each friend has unique skills that can help in different situations. Let's start your adventure by choosing the right person for each task.",
    "It's starting to get dark, and you need to build a shelter to protect yourselves from the elements. The trees around you provide enough material, but you need help to put everything together.",
    "The sun is high, and everyone is getting thirsty. You need to find a water source. There's a river nearby, but you need someone who can navigate the rough terrain to get there.",
    "Nighttime is approaching, and it's getting cold. To stay warm and keep wild animals away, you need to start a fire. There's plenty of dry wood around, but you need someone with the skills to ignite it.",
    "You've run out of the food you had in your backpacks. The jungle is full of potential food sources, but you need someone who knows what to look for and can safely gather it.",
    "You're lost and need to find your way back to the crash site where there's a better chance of being rescued. The jungle is dense, and it's easy to get turned around.",
    "The nights in the jungle are dangerous with wild animals lurking around. To ensure everyone's safety, someone needs to stay awake and keep watch while others sleep.",
    "One of your friends gets injured while navigating through the jungle. The wound isn't life-threatening, but it needs to be treated to prevent infection. You need someone who can handle this emergency calmly and effectively.",
    "You need to decide on the next steps for survival. With limited resources and an unknown terrain, you need to make a plan that ensures everyone's safety and increases your chances of rescue.",
    "After several days in the jungle, everyone is feeling the strain. The group's morale is low, and you need to lift everyone's spirits to keep going.",
    "A sudden storm hits, and you need to take quick action to protect yourselves. The group is panicking, and you need someone who can stay calm and lead everyone to safety."
];

const characterTraits = {
    "Vamsi": { technology: 10, planning: 10, physical: 2, morale: 2, survival: 5 },
    "Pavan": { technology: 2, planning: 5, physical: 10, morale: 2, survival: 5 },
    "Shivaram": { technology: 2, planning: 5, physical: 10, morale: 2, survival: 8, swimming: 10 },
    "Aditya": { technology: 5, planning: 8, physical: 5, morale: 10, survival: 5 },
    "Pranay": { technology: 2, planning: 5, physical: 8, morale: 2, survival: 10, swimming: 10 },
    "Anusha": { technology: 2, planning: 2, physical: 2, morale: 10, survival: 5 },
    "Akshitha": { technology: 2, planning: 5, physical: 5, morale: 10, survival: 8, swimming: 10 }
};

window.onload = () => {
    const nameOptions = document.getElementById('name-options');
    characters.forEach(name => {
        const button = document.createElement('button');
        button.textContent = name;
        button.onclick = () => selectName(name);
        nameOptions.appendChild(button);
    });
};

function selectName(name) {
    playerName = name;
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('story-screen').style.display = 'block';
    document.getElementById('story-text').textContent = situations[0];
}

function startQuestions() {
    document.getElementById('story-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    document.getElementById('question').textContent = situations[currentQuestion + 1];
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    characters.filter(name => name !== playerName).forEach(name => {
        const button = document.createElement("button");
        button.textContent = name;
        button.onclick = () => selectAnswer(name);
        optionsDiv.appendChild(button);
    });
}

function selectAnswer(name) {
    answers.push(name);
    survivalScore += calculateSurvivalScore(name, currentQuestion);
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

function calculateSurvivalScore(name, questionIndex) {
    const traits = characterTraits[name];
    switch (questionIndex) {
        case 0:
            return traits.physical;
        case 1:
            return traits.survival;
        case 2:
            return traits.survival;
        case 3:
            return traits.survival;
        case 4:
            return traits.planning;
        case 5:
            return traits.physical;
        case 6:
            return traits.survival;
        case 7:
            return traits.planning;
        case 8:
            return traits.morale;
        case 9:
            return traits.planning;
        default:
            return 0;
    }
}

function showResults() {
    document.getElementById('game-screen').style.display = 'none';
    const resultsDiv = document.getElementById('results-screen');
    resultsDiv.style.display = 'block';
    const resultsList = document.getElementById('results');
    resultsList.innerHTML = '';
    questions.forEach((question, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${question}: ${answers[index]}`;
        resultsList.appendChild(listItem);
    });
    saveResults();
    displaySurvivalAnalysis();
}

function saveResults() {
    const resultData = {
        playerName,
        answers
    };
    localStorage.setItem('survivalGameResults', JSON.stringify(resultData));
}

function restartGame() {
    playerName = '';
    currentQuestion = 0;
    answers = [];
    survivalScore = 0;
    document.getElementById('results-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
}

function displaySurvivalAnalysis() {
    const survivalPercentage = (survivalScore / (questions.length * 10)) * 100;
    const analysisDiv = document.createElement('div');
    const analysisText = document.createElement('p');
    analysisText.textContent = `Survival Chance: ${survivalPercentage.toFixed(2)}%`;
    analysisDiv.appendChild(analysisText);

    if (survivalPercentage < 40) {
        const deathMessage = document.createElement('p');
        deathMessage.textContent = "Unfortunately, your chances of survival are low. You and your friends did not make it.";
        analysisDiv.appendChild(deathMessage);
    } else {
        const successMessage = document.createElement('p');
        successMessage.textContent = "Congratulations! You and your friends have a good chance of surviving the jungle.";
        analysisDiv.appendChild(successMessage);
    }

    document.getElementById('results-screen').appendChild(analysisDiv);
}

// To access the stored data:
function getStoredResults() {
    const storedData = localStorage.getItem('survivalGameResults');
    return storedData ? JSON.parse(storedData) : null;
}
