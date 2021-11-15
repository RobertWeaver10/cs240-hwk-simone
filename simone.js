let blue = document.querySelector(".blue");
let red = document.querySelector(".red");
let yellow = document.querySelector(".yellow");
let green = document.querySelector(".green");
let playButton = document.querySelector("#play");

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
};

playButton.addEventListener('click', () => {
    //get the value entered into #rounds

    //get game sequence from api same size as #rounds.value

    //get openeing sequence
        //start 4 second delay
            //enter loop
            //press button that corresponds with the sequence
            //start 120 ms delay
        //
    //

    //var i = 0;
    //enter loop while i < #rounds.value
        //enter loop for j = 0... i
            //play button corresponding in sequence
            //start 400ms delay
        //
        //enter loop for k = 0... i
            //if i == 0 (its the first round)
                //update #status to say "(i-k) button presses left"
            //
            //get input from what button is pressed
            //if input == sequence[k] 
                //if i == rounds.value -1 (we know it's the last round)
                    //(new Audio ("sounds/win.mp3")).play()
                    //body backgroundColor = deepskyblue;
                    //update #status "Congrats! You Win"
                    // i + rounds.value
                //
                //else (its not the final round)
                    //update #status to "So far so good! (i-k) butten presses left!"
                //
            //
            //else (they guessed incorrectly)
                //(new Audio ("sounds/wrong.wav")).play();
                //body backgroundColor = hotpink
                //(new Audio ("sounds/lose.wav")).play();
                //i + rounds.value (to leave the loop)
            //
        //
        //(new Audio ("sounds/nextRound.wav")).play();
        //update #status "Good job! Prepare for the next round"
        //800ms delay
        //update #status "round i of rounds.value"
        //800ms delay
    //
})