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
}

function Reset() {
    document.onmouseup = null;
    document.onmousemove = null;
}