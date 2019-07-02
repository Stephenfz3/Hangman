var dubstepDjs = ["EXCISION", "ILLENIUM", "DUBLOADZ", "DIONTIMMER", "HESH", "SKRILLEX", "VIRTUALRIOT", "CHIBS", "ALROSS", "SVDDENDEATH"];
var totalGuesses = 9;       // number of tries
var userGuesses = [];       // letters the user guessed
var randomPick;           // array number the machine choose randomly
var wordGuessed = [];       // This will be the word we actually build to match the current word
var guessesLeft = 0;        // How many tries the player has left
var finishedGame = false;   // Flag for 'press any key to try again'     
var wins = 0;               //wins
var losses = 0;             //losses




// start the game
function startGame() {
    guessesLeft = totalGuesses;

    //grab a random number from the djs array  (number of words)
    randomPick = Math.floor(Math.random() * (dubstepDjs.length));

    if(dubstepDjs[randomPick] == dubstepDjs[0]) {
        $('.clue').html("<img src='assets/images/excision.jpg' width='300'/>");
    }else if(dubstepDjs[randomPick] == dubstepDjs[1]) {
        $('.clue').html("<img src='assets/images/illenium.jpg' width='300'/>");
    }else if(dubstepDjs[randomPick] == dubstepDjs[2]) {
        $('.clue').html("<img src='assets/images/dubloadz.jpg' width='300'/>");
    }else if(dubstepDjs[randomPick] == dubstepDjs[3]) {
        $('.clue').html("<img src='assets/images/dion.jpg' width='300'/>");
    }else if(dubstepDjs[randomPick] == dubstepDjs[4]) {
        $('.clue').html("<img src='assets/images/hesh.jpg' width='300'/>");  
    }else if(dubstepDjs[randomPick] == dubstepDjs[5]) {
        $('.clue').html("<img src='assets/images/skrillex.jpg' width='300'/>");  
    }else if(dubstepDjs[randomPick] == dubstepDjs[6]) {
        $('.clue').html("<img src='assets/images/virtualriot.jpg' width='300'/>");  
    }else if(dubstepDjs[randomPick] == dubstepDjs[7]) {
        $('.clue').html("<img src='assets/images/chibs.jpg' width='300'/>");  
    }else if(dubstepDjs[randomPick] == dubstepDjs[8]) {
        $('.clue').html("<img src='assets/images/alross.jpg' width='300'/>");        
    }else if(dubstepDjs[randomPick] == dubstepDjs[9]) {
        $('.clue').html("<img src='assets/images/svddendeath.jpg' width='300'/>");                                
    }else($('.clue').text('neither of these')); 

    // Clear out arrays
    userGuesses = [];
    wordGuessed = [];

    //build the word with blanks
    for (var i = 0; i < dubstepDjs[randomPick].length; i++) {
        wordGuessed.push("_");
    }   

 // try again
   document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    //refresh the screen
    refreshScreen();
};

//  Updates the display on the HTML Page
function refreshScreen() {

    document.getElementById("gameWins").innerText = wins;
    document.getElementById("gameLosses").innerText = losses;

    var guessingWordText = "";
    for (var i = 0; i < wordGuessed.length; i++) {
        guessingWordText += wordGuessed[i];
    }

    //update guesses, word, and letters entered
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("userGuesses").innerText = userGuesses;
};

//compare letters entered to the character you're trying to guess
function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < dubstepDjs[randomPick].length; i++) {
        if(dubstepDjs[randomPick][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        guessesLeft--;
    } else {
        for(var i = 0; i < positions.length; i++) {
            wordGuessed[positions[i]] = letter;
        }
    }
};

//check if all letters have been entered.
function checkWin() {
    if(wordGuessed.indexOf("_") === -1) {
       document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        finishedGame = true;
    }
};

//check if the user is out of guesses
function checkLoss()
{
    if(guessesLeft <= 0) {
       document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        losses++;
        finishedGame = true;
    }
}

//guessing
function makeGuess(letter) {
    if (guessesLeft > 0) {
        // Make sure we didn't use this letter
        if (userGuesses.indexOf(letter) === -1) {
            userGuesses.push(letter);
            evaluateGuess(letter);
        }
    }
};

// Event listener
document.onkeydown = function(event) {
    //if the game is finished, restart it.
    if(finishedGame) {
        startGame();
        finishedGame = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
             makeGuess(event.key.toUpperCase());
            refreshScreen();
            checkWin();
            checkLoss();
        }
    }
};


