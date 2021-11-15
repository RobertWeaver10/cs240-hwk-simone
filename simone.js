let blue = document.querySelector(".blue");
let red = document.querySelector(".red");
let yellow = document.querySelector(".yellow");
let green = document.querySelector(".green");

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