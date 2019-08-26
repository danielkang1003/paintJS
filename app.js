const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");

//실제 pixel modifier에 사이즈를 주어야함
canvas.width = 700;   //css와 같이 width height 주기.
canvas.height = 700;

context.strokeStyle ="#2c2c2c";
context.lineWidth = 2.5;

let painting = false;

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
    console.log("creating path", x, y);
    context.beginPath();
    context.moveTo(x, y);
  } else{
    console.log("creating line", x, y);
    context.lineTo(x, y);
    context.stroke();
  }
}

function onMouseDown(event){
  painting = true;
}


if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
