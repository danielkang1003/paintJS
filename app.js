const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
//실제 pixel modifier에 사이즈를 주어야함
canvas.width = CANVAS_SIZE;   //css와 같이 width height 주기.
canvas.height = CANVAS_SIZE;

context.strokeStyle =INITIAL_COLOR; //default color
context.fillStyle = INITIAL_COLOR;
context.lineWidth = 2.5;        //default linewidth which is 굵기


let painting = false;
let filling = false;

function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true;
}

function onMouseMove(event){
  // console.log(event); //we need offsetX & offsetY
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    // console.log("creating path", x, y);
    context.beginPath();
    context.moveTo(x, y);
  } else{
    // console.log("creating line", x, y);
    context.lineTo(x, y);
    context.stroke();
  }
}

// function onMouseDown(event){
//   painting = true;
// }

function handleColorClick(event){
  // console.log(event.target.style);
  const color = event.target.style.backgroundColor;
  // console.log(color);
  //override strokeStyle
  context.strokeStyle = color;
  context.fillStyle = color;
}

function handleRangeChange(event){
  // console.log(event.target.value);
  const size = event.target.value;
  //override context of lineWidth
  context.lineWidth = size;
}

function handleModeClick(){
  if(filling == true){
    filling = false;
    mode.innerText = "Fill";
  } else{
    filling = true;
    mode.innerText = "Paint";
    // context.fillStyle = context.strokeStyle;
  }
}

function handleCanvasClick(){
  if(filling){
    context.fillRect(0,0, canvas.width, canvas.height);
  }
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
  range.addEventListener("input", handleRangeChange);
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}
