const inputs = document.querySelector(".inputs");
let resetBtn = document.querySelector(".reset-btn");
let hint = document.querySelector(".hint span");
let typingInput = document.querySelector(".typing-char");
let guess = document.querySelector(".guess span");
let wrongLetter = document.querySelector(".wrong-letter span");

let word, maxGuess, corrects = [], incorrects = [];


function randomWord() {
    //getiing the object form word.js file from wordList

    let randObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = randObj.word;//getting the word from the wordList
    hint.innerText = randObj.hint;
    maxGuess = word.length >= 5 ? 8 : 6;
    corrects = [], incorrects = [];//resetting all the value to default

    wrongLetter.innerText = incorrects;//this will reset the value of wrongletter


    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type ="text" disabled>`
    }
    inputs.innerHTML = html;
    guess.innerText = maxGuess;


}//end of the randomWord function 

randomWord();

function initGame(e) {
    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        }
        else {
            maxGuess--;
            incorrects.push(` ${key}`);
        }
        guess.innerText = maxGuess;

        wrongLetter.innerText = incorrects;
    }

    typingInput.value = "";

    setTimeout(() => {
        if (corrects.length === word.length) {

            window.location.href = "success.html";

        }

        else if (maxGuess <= 0) {
            resetBtn.innerHTML = `Correct answer : <h1 style="color:#66dd17"> ${word.toUpperCase()}</h1>`
            setTimeout(() => {
                alert(`You can see the answer below`);

                window.location.href = "failure.html";
            }, 1000)
        }
    })
}

//This will reset the game
resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame)
inputs.addEventListener("click", () => typingInput.focus());

document.addEventListener("keydown", () => typingInput.focus());

