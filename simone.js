let blue = document.querySelector(".blue");
let red = document.querySelector(".red");
let yellow = document.querySelector(".yellow");
let green = document.querySelector(".green");
let playButton = document.querySelector("#play");
let gameStat= document.querySelector("#status");

let Opener = ['red', 'yellow', 'blue', 'green', 'red', 'yellow', 'blue', 'green', 'red', 'yellow', 'blue', 'green'];
let testSequence = [
    `blue`, `red`, `green`, `yellow`,`green`, `red`, `yellow`,
    `blue`, `red`, `green`, `yellow`,`green`, `red`, `yellow`
];

function runOpeneingSequence(array){
    for (let i = 0; i < array.length; i++){
        setTimeout(() => {
            if (array[i] == `red`){
                (new Audio ("sounds/red.wav")).play();
                red.style.backgroundColor = "#ff69b4";
                setTimeout(() => {red.style.backgroundColor = "#ff0000"}, 200)
            }
            else if (array[i] == `blue`){
                (new Audio ("sounds/blue.wav")).play();
                blue.style.backgroundColor = "#add8e6";
                setTimeout(() => {blue.style.backgroundColor = "#0000bb"}, 200)
            }
            else if (array[i] == `yellow`){
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
    let lastInput = ``;
    //event handlers for the blue game button
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
        (new Audio ("sounds/blue.wav")).play();
        blue.style.backgroundColor = "#0000bb";
        lastInput = `blue`;
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
        lastInput = `red`;
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
        lastInput = `yellow`;
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
        lastInput = `green`;
    };
    runOpeneingSequence(Opener);
    //gonna have to edit here when i get the axios going
    let rounds = document.querySelector(`#rounds`).value; //gonna need to get the solution
    //if rounds to play is not entered or not a positive/valid length then defaults to 10 rounds
    if(rounds < 1 || rounds == undefined){
        rounds = 10;
    }
    setTimeout(() => {
        console.log("rounds being played: " + rounds);
    let currentRound = 0;
    /**
     * uses currentRound and rounds, runs the local function to display the solution up to the
     * position of the current round in the solution sequence, then will get user input and respond
     * accordingly to whether the user was correct, incorrect, or won the game
     */
    function gameLoop(){
        setTimeout(() => { //creates 800ms second delay inbetween rounds
            let counter = 0; //counts how many buttons to press when displaying the solution each round
            /**
             * checks the color of the solution sequence at counter and plays the solution sequence up
             * to the number of rounds the user has completed.
            */
            function displaySol() {
                    setTimeout(() => {
                            if (testSequence[counter] == `red`){ //check what the color of the sequence is and animate corresponding button
                                (new Audio ("sounds/red.wav")).play();
                                red.style.backgroundColor = "#ff69b4";
                                setTimeout(() => {red.style.backgroundColor = "#ff0000"}, 200)
                                console.log(`red`);
                            }
                            else if (testSequence[counter] == `blue`){
                                (new Audio ("sounds/blue.wav")).play();
                                blue.style.backgroundColor = "#add8e6";
                                setTimeout(() => {blue.style.backgroundColor = "#0000bb"}, 200)
                                console.log(`blue`);
                            }
                            else if (testSequence[counter] == `yellow`){
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
            console.log("round " + currentRound + " out of " + rounds);
            currentRound++;
            if(currentRound < rounds){
                gameLoop();
            }
        }, 2000) //change this so that it is 800 (2000 for testing purposes)
    }
    gameLoop();
    }, 4000);
})



/**
            for (let currentSpot = 0; currentSpot < currentRound; currentSpot++){ //loop through all the spots that we have reached
                lastInput = ``;
                let waitingInput = 0;
                while (waitingInput < 1){
                    if (lastInput == testSequence[currentSpot] && currentRound == rounds){ //correct on last round
                        console.log("you made it through the final round");
                        waitingInput++;
                    }
                    else if (lastInput == testSequence[currentSpot] && currentRound < rounds){ //correct not last round
                        console.log("you are on round " + currentRound + " out of " + rounds);
                        waitingInput++;
                    }
                    else if (lastInput != testSequence[currentSpot] && lastInput != ``){ //incorrect
                        console.log("this is incorrect");
                        waitingInput++;
                    }
                }
            }
            */