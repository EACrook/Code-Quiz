var homePage = document.querySelector("#welcome");
var choiceContainer = document.querySelector(".choice-btn");
var myScore = document.querySelector("#score");
var finishedGame = document.querySelector("#endGame");
var contOrEnd = document.querySelector(".again-btn");
var saveScoreEl = document.querySelector(".savescore")
var highScore = document.querySelector(".high-scores");

// --Arrays with questions and answers
var questions = [{
        question: "What is the capital of Wisconsin?",
        answer: "Madison",
        choices: ["Milwaukee", "Green Bay", "Sheboygan", "Madison"]

    },
    {
        question: "What is the Wisconsin state motto?",
        answer: "Forward",
        choices: ["Forward", "Tomorrow", "Onward", "Toward"]
    },
    {
        question: "What is Wisconsin's largest city?",
        answer: "Milwaukee",
        choices: ["Madison", "Ashland", "Green Bay", "Milwaukee"]
    },
    {
        question: "What is Wisconsin's state bird?",
        answer: "Robin",
        choices: ["Turkey", "Robin", "Eagle", "Cardinal"]
    },
    {
        question: "What is the state flower?",
        answer: "Wood Violet",
        choices: ["Wild Blue Phlox", "Dwarf Lake Iris", "Wood Violet", "Chicory"]
    }
]

// --track of score
var score = 0;
var qIndex = 0;

function takeToHome() {
    var startGameButtonEl = document.createElement("button");
    startGameButtonEl.textContent = "Start the Quiz";
    startGameButtonEl.className = "btn start-btn";
    homePage.appendChild(startGameButtonEl);

    startGameButtonEl.addEventListener("click", function(s) {
        console.log('clicked', s.target.innerHTML)
        displayQuestion();
    });
}

function takeToScores() {
    var viewScoresButtonEl = document.createElement("button");
    viewScoresButtonEl.textContent = "View High Scores";
    viewScoresButtonEl.className = "btn scores-btn";
    homePage.appendChild(viewScoresButtonEl);

    viewScoresButtonEl.addEventListener("click", function(v) {
        console.log('clicked', v.target.innerHTML)
        highScoreLog();
    })
}

// Welcome Page

function welcomePlayer(e) { 
    homePage.innerHTML = "Welcome! Please choice if you would like to continue to the quiz or view the high scores!";
    
   takeToHome()
   takeToScores()
   
}

function displayQuestion() {
    homePage.innerHTML = "";
    choiceContainer.innerHTML = '';


    var poseQuestion = document.createElement("h1");
    poseQuestion.textContent = questions[qIndex].question;
    choiceContainer.appendChild(poseQuestion);

    for (let i = 0; i < questions[qIndex].choices.length; i++) {

        //1 Get choice buttons on page
        var choiceButtonEl = document.createElement("button");
        choiceButtonEl.textContent = questions[qIndex].choices[i];
        choiceButtonEl.className = "btn choice-btn";
        choiceButtonEl.id = i.toString();
        choiceContainer.appendChild(choiceButtonEl);

        //2 can click buttons and prints out which one was clicked
        document.querySelector("choiceButtonEl");
        choiceButtonEl.addEventListener("click", typeEvent);

        //3 If else statement stuff they picked apples is that the correct ? from questions array
        function typeEvent(e) {
            console.log('button go t clicked', e.target.innerHTML)
            //alert("button clicked");

            if (questions[qIndex].answer === e.target.innerHTML) {
                console.log('you are correct')
                score++
                qIndex++

            } else {
                console.log('wrong')
                qIndex++

            }

            if (qIndex >= questions.length) {
                choiceContainer.innerHTML = '';
                endgame();
                console.log("time to end the game")
            } else {
                displayQuestion()
            }
        }
    }
}

function displayMessage(type, message) {
    saveScoreEl.textContent = message;
    saveScoreEl.setAttribute("class", type);
}

function endgame() {
    homePage.innerHTML= "";
    finishedGame.innerHTML = 'Congratulations, you have finished the quiz! Your final score is: ' + score + '!';

    var enterInfoEl = document.createElement("form");
    enterInfoEl.setAttribute("method", "GET");
    enterInfoEl.setAttribute("action", "submit.php");
    enterInfoEl.textContent= "Enter your name and see where you are on the leader board."

    var identifyEl = document.createElement("input");
    identifyEl.setAttribute("type", "text")
    identifyEl.setAttribute("name", "enterName");
    identifyEl.setAttribute("placeholder", "Your Name");

    var submitButtonEl = document.createElement("button");
    submitButtonEl.setAttribute("type", "submit");
    submitButtonEl.setAttribute("value", "Submit");
    submitButtonEl.id = identifyEl.toString();
    submitButtonEl.textContent = "Submit";

    // append each item 
    saveScoreEl.appendChild(enterInfoEl);
    saveScoreEl.appendChild(identifyEl);
    saveScoreEl.appendChild(submitButtonEl);

    submitButtonEl.addEventListener("click", function() {
        if (identifyEl === "") {
           displayMessage("error", "Name field cannot be blank.")
        }
        else {
            displayMessage("success", "Your score has been saved!")
        }

        localStorage.setItem("name", JSON.stringify(identifyEl));
        localStorage.setItem("score", JSON.stringify(score));
        identifyEl.innerHTML= "";
    })
    
    
    takeToHome();
    takeToScores();
    
}

function highScoreLog(){
    highScore.innerHTML= "View the high scores for this quiz!"

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    highscores.sort(function(a, b) {
        return b.score = a.score;
    });

    highscores.forEach(function(score) {
        var listScoreEl = document.createElement("li");
        listScoreEl.textContent = score.identifyEl + " has a score of " + score.score;

        var displayScoreEl = document.getElementById("highscores");
        displayScoreEl.appendChild(listScoreEl)
    })    
}

welcomePlayer();