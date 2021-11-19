const axios = require("axios");
const headers = { headers: {Accept: "application/json"}};

let blue = document.querySelector(".blue");
let red = document.querySelector(".red");
let yellow = document.querySelector(".yellow");
let green = document.querySelector(".green");
let playButton = document.querySelector("#play");
let gameStat= document.querySelector("#status");
let body = document.querySelector("body");

let Opener;
let testSequence;

/**
 * asynchronous function that gets the opening sequence from the api
 */
async function getOpeningSequence(){
    try {
        let openingSequence = await axios.get(`http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start`, headers)
        Opener = openingSequence.data.sequence;
        runOpeneingSequence(Opener);
        console.log(Opener);
    }
    catch(error){
        console.log(error);
    }
}

/**
 * asynchronous function that gets the sequence the player must repeat to win
 */
async function getGameSequence(numRounds){
    try {
        let gameSequence = await axios.get(`http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=getSolution&rounds=${numRounds}`, headers);
        testSequence = gameSequence.data.key;
        console.log(testSequence);
    }
    catch(error){
        console.log(error);
    }
}

function runOpeneingSequence(array){
    for (let i = 0; i < array.length; i++){
        setTimeout(() => {
            if (array[i] == `R`){
                (new Audio ("sounds/red.wav")).play();
                red.style.backgroundColor = "#ff69b4";
                setTimeout(() => {red.style.backgroundColor = "#ff0000"}, 200)
            }
            else if (array[i] == `B`){
                (new Audio ("sounds/blue.wav")).play();
                blue.style.backgroundColor = "#add8e6";
                setTimeout(() => {blue.style.backgroundColor = "#0000bb"}, 200)
            }
            else if (array[i] == `Y`){
                (new Audio ("sounds/yellow.wav")).play();
                yellow.style.backgroundColor = "#ffff00";
                setTimeout(() => {yellow.style.backgroundColor = "#daa520"}, 200)
            }
            else {
                (new Audio ("sounds/green.wav")).play();
                green.style.backgroundColor = "#90ee90";
                setTimeout(() => {green.style.backgroundColor = "#228b22"}, 200)
            }
        }, i * 120)
    }
}

//play button event listener that starts the game
playButton.addEventListener(`click`, () => {
    let rounds = document.querySelector(`#rounds`).value; //gonna need to get the solution
    if(rounds < 1 || rounds == undefined){
        rounds = 10;
    }
    getOpeningSequence();
    getGameSequence(rounds);
    let lastInput = ``;
    
    setTimeout(() => { //creates a 4 second delay after pressing the start button and starting the game
        console.log("rounds being played: " + rounds);
        let currentRound = 1; //keeps track of the current round of the game

        
            let currentButton = 0;//counts the current button that the user is on
            let counter = 0; //counts how many buttons to press when displaying the solution each round
            /**
            * checks the color of the solution sequence at counter and plays the solution sequence up
            * to the number of rounds the user has completed.
            */
            function displaySol() {
                    setTimeout(() => {
                            if (testSequence[counter] == `R`){ //check what the color of the sequence is and animate corresponding button
                                (new Audio ("sounds/red.wav")).play();
                                red.style.backgroundColor = "#ff69b4";
                                setTimeout(() => {red.style.backgroundColor = "#ff0000"}, 200)
                                console.log(`red`);
                            }
                            else if (testSequence[counter] == `B`){
                                (new Audio ("sounds/blue.wav")).play();
                                blue.style.backgroundColor = "#add8e6";
                                setTimeout(() => {blue.style.backgroundColor = "#0000bb"}, 200)
                                console.log(`blue`);
                            }
                            else if (testSequence[counter] == `Y`){
                                (new Audio ("sounds/yellow.wav")).play();
                                yellow.style.backgroundColor = "#ffff00";
                                setTimeout(() => {yellow.style.backgroundColor = "#daa520"}, 200)
                                console.log(`yellow`);
                            }
                            else {
                                (new Audio ("sounds/green.wav")).play();
                                green.style.backgroundColor = "#90ee90";
                                setTimeout(() => {green.style.backgroundColor = "#228b22"}, 200)
                                console.log(`green`);
                            }
                        
                        counter++;
                        if(counter < currentRound){
                            console.log("button " + counter + " of " + currentRound);
                            displaySol();
                        }
                    }, 400);
            }
            displaySol();
            //blue event handlers
            blue.onmouseover = function() {
                blue.style.border = "solid #eeeeee .5px";
            };
            blue.onmouseout = function() {
                blue.style.border = "solid #000000 .5px";
            };
            blue.onmousedown = function() {
                blue.style.backgroundColor = "#add8e6";
            };
            blue.onmouseup = function() {
                blue.style.backgroundColor = "#0000bb";
                (new Audio("sounds/blue.wav")).play();
                lastInput = `B`;
                if (currentButton < rounds + currentButton){                                            //only do this is while the game is playing
                    if (lastInput == testSequence[currentButton] && currentButton < rounds){            //the user is correct
                        console.log("you were correct");
                        
                        if (currentButton == rounds -1){                                                //the user won
                            console.log("game was won");
                            currentButton = rounds + currentButton;
                            gameStat.innerHTML = "Congrats you won!";                                   //update the status
                            (new Audio("sounds/win.mp3")).play();                                       //play the win audio
                            body.style.backgroundColor = "#00bfff";                                           //change the background color
                        }
                        else{                                                                           //the user has not won yet
                            console.log("you haven't won yet");
                            if (currentButton == currentRound -1){                                      //the user completed the round
                                console.log("you completed the round");
                                gameStat.innerHTML = "Good job! Prepare for next round...";             //update the status
                                currentButton = 0;                                                      //reset the current button
                                currentRound++;                                                         //increment the round
                                setTimeout(()=>{                                                        //start 800 ms delay
                                    gameStat.innerHTML = "Round " + currentRound + " out of " + rounds; //update the status
                                    setTimeout(() => {                                                  //start another 800ms delay
                                        counter = 0;                                                    //reset the counter for displaySol
                                        displaySol();                                                   //display next round
                                    }, 800);
                                }, 800);
                            }
                            else{                                                                       //the user didn't complete round
                                console.log("you haven't completed the round");
                                currentButton++;                                                        //increment user's position
                                gameStat.innerHTML = "So far so good! " + (currentRound - currentButton) + " more to go!";
                            }
                        }
                    }
                    else{                                                                               //the user is incorrect
                        console.log("you were incorrect");
                        gameStat.innerHTML = "Incorrect! You lose";                                     //update status
                        (new Audio("sounds/lose.wav")).play();                                          //play the lose audio
                        body.style.backgroundColor = "#ff69b4";                                               //change background color to pink
                        currentButton = rounds + currentButton;                                         //so that no more inputs are registered
                        currentRound = rounds + currentRound;                                           //game is over
                    }
                }
            };
            //event handlers for the red game button
            red.onmouseover = function() {
                red.style.border = "solid #eeeeee .5px";
            };
            red.onmouseout = function() {
                red.style.border = "solid #000000 .5px";
            };
            red.onmousedown = function() {
                red.style.backgroundColor = "#ff69b4";
            };
            red.onmouseup = function() {
                (new Audio ("sounds/red.wav")).play();
                red.style.backgroundColor = "#ff0000";
                lastInput = `R`;
                if (currentButton < rounds + currentButton){
                    if (lastInput == testSequence[currentButton] && currentButton < rounds){            //the user is correct
                        console.log("you were correct");
                        
                        if (currentButton == rounds -1){                                                //the user won
                            console.log("game was won");
                            currentButton = rounds + currentButton;
                            gameStat.innerHTML = "Congrats you won!";                                   //update the status
                            (new Audio("sounds/win.mp3")).play();                                       //play the win audio
                            body.style.backgroundColor = "#00bfff";                                           //change the background color
                        }
                        else{                                                                           //the user has not won yet
                            console.log("you haven't won yet");
                            if (currentButton == currentRound -1){                                      //the user completed the round
                                console.log("you completed the round");
                                gameStat.innerHTML = "Good job! Prepare for next round...";             //update the status
                                currentButton = 0;                                                      //reset the current button
                                currentRound++;                                                         //increment the round
                                setTimeout(()=>{                                                        //start 800 ms delay
                                    gameStat.innerHTML = "Round " + currentRound + " out of " + rounds; //update the status
                                    setTimeout(() => {                                                  //start another 800ms delay
                                        counter = 0;                                                    //reset the counter for displaySol
                                        displaySol();                                                   //display next round
                                    }, 800);
                                }, 800);
                            }
                            else{                                                                       //the user didn't complete round
                                console.log("you haven't completed the round");
                                currentButton++;                                                        //increment user's position
                                gameStat.innerHTML = "So far so good! " + (currentRound - currentButton) + " more to go!";
                            }
                        }
                    }
                    else{                                                                               //the user is incorrect
                        console.log("you were incorrect");
                        gameStat.innerHTML = "Incorrect! You lose";                                     //update status
                        (new Audio("sounds/lose.wav")).play();                                          //play the lose audio
                        body.style.backgroundColor = "#ff69b4";                                               //change background color to pink
                        currentButton = rounds + currentButton;                                         //so that no more inputs are registered
                        currentRound = rounds + currentRound;                                           //game is over
                    }
                }
            };
        
            //event handlers for the yellow game button
            yellow.onmouseover = function() {
                yellow.style.border = "solid #eeeeee .5px";
            };
            yellow.onmouseout = function() {
                yellow.style.border = "solid #000000 .5px";
            };
            yellow.onmousedown = function() {
                yellow.style.backgroundColor = "#ffff00";
            };
            yellow.onmouseup = function() {
                (new Audio ("sounds/yellow.wav")).play();
                yellow.style.backgroundColor = "#daa520";
                lastInput = `Y`;
                if (currentButton < rounds + currentButton){
                    if (lastInput == testSequence[currentButton] && currentButton < rounds){            //the user is correct
                        console.log("you were correct");
                        
                        if (currentButton == rounds -1){                                                //the user won
                            console.log("game was won");
                            currentButton = rounds + currentButton;
                            gameStat.innerHTML = "Congrats you won!";                                   //update the status
                            (new Audio("sounds/win.mp3")).play();                                       //play the win audio
                            body.style.backgroundColor = "#00bfff";                                           //change the background color
                        }
                        else{                                                                           //the user has not won yet
                            console.log("you haven't won yet");
                            if (currentButton == currentRound -1){                                      //the user completed the round
                                console.log("you completed the round");
                                gameStat.innerHTML = "Good job! Prepare for next round...";             //update the status
                                currentButton = 0;                                                      //reset the current button
                                currentRound++;                                                         //increment the round
                                setTimeout(()=>{                                                        //start 800 ms delay
                                    gameStat.innerHTML = "Round " + currentRound + " out of " + rounds; //update the status
                                    setTimeout(() => {                                                  //start another 800ms delay
                                        counter = 0;                                                    //reset the counter for displaySol
                                        displaySol();                                                   //display next round
                                    }, 800);
                                }, 800);
                            }
                            else{                                                                       //the user didn't complete round
                                console.log("you haven't completed the round");
                                currentButton++;                                                        //increment user's position
                                gameStat.innerHTML = "So far so good! " + (currentRound - currentButton) + " more to go!";
                            }
                        }
                    }
                    else{                                                                               //the user is incorrect
                        console.log("you were incorrect");
                        gameStat.innerHTML = "Incorrect! You lose";                                     //update status
                        (new Audio("sounds/lose.wav")).play();                                          //play the lose audio
                        body.style.backgroundColor = "#ff69b4";                                               //change background color to pink
                        currentButton = rounds + currentButton;                                         //so that no more inputs are registered
                        currentRound = rounds + currentRound;                                           //game is over
                    }
                }
            };
        
            //event handlers for the green game button
            green.onmouseover = function() {
                green.style.border = "solid #eeeeee .5px";
            };
            green.onmouseout = function() {
                green.style.border = "solid #000000 .5px";
            };
            green.onmousedown = function() {
                green.style.backgroundColor = "#90ee90";
            };
            green.onmouseup = function() {
                (new Audio ("sounds/green.wav")).play();
                green.style.backgroundColor = "#228b22";
                lastInput = `G`;
                if (currentButton < rounds + currentButton){
                    if (lastInput == testSequence[currentButton] && currentButton < rounds){            //the user is correct
                        console.log("you were correct");
                        
                        if (currentButton == rounds -1){                                                //the user won
                            console.log("game was won");
                            currentButton = rounds + currentButton;
                            gameStat.innerHTML = "Congrats you won!";                                   //update the status
                            (new Audio("sounds/win.mp3")).play();                                       //play the win audio
                            body.style.backgroundColor = "#00bfff";                                           //change the background color
                        }
                        else{                                                                           //the user has not won yet
                            console.log("you haven't won yet");
                            if (currentButton == currentRound -1){                                      //the user completed the round
                                console.log("you completed the round");
                                gameStat.innerHTML = "Good job! Prepare for next round...";             //update the status
                                currentButton = 0;                                                      //reset the current button
                                currentRound++;                                                         //increment the round
                                setTimeout(()=>{                                                        //start 800 ms delay
                                    gameStat.innerHTML = "Round " + currentRound + " out of " + rounds; //update the status
                                    setTimeout(() => {                                                  //start another 800ms delay
                                        counter = 0;                                                    //reset the counter for displaySol
                                        displaySol();                                                   //display next round
                                    }, 800);
                                }, 800);
                            }
                            else{                                                                       //the user didn't complete round
                                console.log("you haven't completed the round");
                                currentButton++;                                                        //increment user's position
                                gameStat.innerHTML = "So far so good! " + (currentRound - currentButton) + " more to go!";
                            }
                        }
                    }
                    else{                                                                               //the user is incorrect
                        console.log("you were incorrect");
                        gameStat.innerHTML = "Incorrect! You lose";                                     //update status
                        (new Audio("sounds/lose.wav")).play();                                          //play the lose audio
                        body.style.backgroundColor = "#ff69b4";                                               //change background color to pink
                        currentButton = rounds + currentButton;                                         //so that no more inputs are registered
                        currentRound = rounds + currentRound;                                           //game is over
                    }
                }
            };
    }, 4000);  
})