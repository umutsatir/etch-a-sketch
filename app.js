// all the variables amd default values
const container = document.querySelector(".canvas");
const sizeButtons = document.querySelectorAll("button");
const sizeSlider = document.querySelector("#sizeSlider");
const gridSize = document.querySelector("#gridSize");
const colorPicker = document.querySelector("#colorpicker");
const colorMode = document.querySelector("#colorMode");
const eraserButton = document.querySelector("#eraserButton");
const clearButton = document.querySelector("#clearButton");
const rgbMode = document.querySelector("#rgbMode");
let size = 16;
let currentColor = "black";
let currentMode = "color";

// initialize functions
window.onload = () => {
    createGrid(size);
}

// create a variable that keeps track of the mouse state
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// add all event listeners
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);
colorPicker.oninput = (e) => currentColor = e.target.value;
colorMode.onclick = () => currentMode = 'color';
rgbMode.onclick = () => currentMode = 'rainbow';
eraserButton.onclick = () => currentMode = 'eraser';
clearButton.onclick = () => changeSize(size);

// create a function that changes the color of the divs
function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
        e.target.style.backgroundColor = rgbColor();
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = 'white';
    }
}

// create a function that returns a random rgb color
function rgbColor(){
    return "rgb("+Math.floor(Math.random() * 255)+","+Math.floor(Math.random() * 255)+","+Math.floor(Math.random() * 255)+")";
}

// update the size value in the p element
function updateSizeValue(value) {
    gridSize.textContent = value + "x" + value;
    size = value;
}

// create a function that recreates the grid with the new size
function changeSize(value) {
    container.innerHTML = "";
    createGrid(value);
}

// create a function that creates a grid of size x size divs
function createGrid(size){
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)` // very useful for creating a grid
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        container.appendChild(gridElement)
    }
}