var xoffset = 0, mouse_x = 0
var train = document.getElementById("train")
train.onmousedown = MouseDown;

function MouseDown(e) {
    e.preventDefault();
    mouse_x = e.clientX;
    document.onmouseup = Reset;
    document.onmousemove = Drag;
}

function Drag(e) {
    e.preventDefault();
    xoffset = mouse_x - e.clientX;
    mouse_x = e.clientX;
    train.style.left = (train.offsetLeft - xoffset) + "px";
    if(parseInt(train.style.left) <= 0) {
        train.style.left = 0 + "px"
    }
    if(parseInt(train.style.left) >= document.body.clientWidth - train.clientWidth) {
        train.style.left = (document.body.clientWidth - train.clientWidth) + "px"
    }
}

function Reset() {
    document.onmouseup = null;
    document.onmousemove = null;
}

//Position for spårledningsskarvar
let siv = document.getElementById("siv")
let svin = document.getElementById("sv-in")
let svout = document.getElementById("sv-out")
let siiv = document.getElementById("siiv")
console.log(siv.offsetLeft)
console.log(svin.offsetLeft)
console.log(svout.offsetLeft)
console.log(siiv.offsetLeft)