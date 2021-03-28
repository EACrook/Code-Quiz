var homePage = document.querySelector("#welcome");
var choiceContainer = document.querySelector(".choice-btn");
var myScore = document.querySelector("#score");
var finishedGame = document.querySelector("#endGame");
var contOrEnd = document.querySelector(".again-btn");
var saveScoreEl = document.querySelector(".savescore")

// --Arrays with questions and answers
var questions = [{
        question: "What is the capital of WI?",
        answer: "Madison",
        choices: ["Milwaukee", "Green Bay", "Sheboygan", "Madison"]

    },
    {
        question: "What is my cat's name?",
        answer: "Fancy",
        choices: ["Beans", "Toast", "Fancy", "Jeff"]
    },
    {
        question: "Third",
        answer: "",
        choices: ["", "", ""]
    },
    {
        question: " Fourth",
        answer: "",
        choices: ["", "", ""]
    },
    {
        question: " Fith",
        answer: "",
        choices: ["", "", ""]
    }
]

// --track of score
var score = 0;
var qIndex = 0;

// Welcome Page

function welcomePlayer(e) { 
    homePage.innerHTML = "Welcome! Please choice if you would like to continue to the quiz or view the high scores";

    // Create buttons
    var startGameButtonEl = document.createElement("button");
    startGameButtonEl.textContent = "Start the Quiz";
    startGameButtonEl.className = "btn start-btn";
    homePage.appendChild(startGameButtonEl);

    var viewScoresButtonEl = document.createElement("button");
    viewScoresButtonEl.textContent = "View High Scores";
    viewScoresButtonEl.className = "btn scores-btn";
    homePage.appendChild(viewScoresButtonEl);

    // button click prints which has been clicked
    startGameButtonEl.addEventListener("click", function(s) {
        console.log('clicked', s.target.innerHTML)
        displayQuestion();
    });

    viewScoresButtonEl.addEventListener("click", function(v) {
        console.log('clicked', v.target.innerHTML)
        endgame();
    })
}

function displayQuestion() {
    homePage.innerHTML = "";
    choiceContainer.innerHTML = '';
    // console.log('MY SCORE!~!', score)
    // myScore.innerHTML = "Score :" + score

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

function endgame() {
    homePage.innerHTML= "";
    finishedGame.innerHTML = 'Congratulations, you have finished the quiz! Your final score is: ' + score + '!';

    var enterInfoEl = document.createElement("form");
    enterInfoEl.setAttribute("method", "GET");
    enterInfoEl.setAttribute("action", "submit.php");

    var identifyEl = document.createElement("input");
    identifyEl.setAttribute("type", "text")
    identifyEl.setAttribute("name", "enterName");
    identifyEl.setAttribute("placeholder", "Your Name");

    var submitButtonEl = document.createElement("button");
    submitButtonEl.setAttribute("type", "submit");
    submitButtonEl.setAttribute("value", "Submit");

    // append each item 
    saveScoreEl.appendChild(enterInfoEl);
    saveScoreEl.appendChild(identifyEl);
    saveScoreEl.appendChild(submitButtonEl);
    
}

welcomePlayer();