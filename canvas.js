

const colors = {
    blueBox: document.querySelector("#color-blue"),
    greenBox: document.querySelector("#color-green"),
    redBox: document.querySelector("#color-red"),
    yellowBox: document.querySelector("#color-yellow"),
    purpleBox: document.querySelector("#color-purple"),
    blackBox: document.querySelector("#color-black"),
    currentColor: "red"
}
const elementsOn = {
    inputStroke: document.querySelector("#lineWidth"),
    buttomDownload: document.querySelector("#download"),
    clearButton:document.querySelector("#clear"),
    imageDL:document.querySelector("#imageDL"),
    imgContainer:document.querySelector("#img-container"),
    eraserButton: document.querySelector("#eraser")
}
const data = {
    lineWidth:5
}
elementsOn.inputStroke.addEventListener("input",(e)=>{
data.lineWidth = e.target.value;

})



document.addEventListener("DOMContentLoaded", () => {

    let handsCanvas = document.querySelector("#hands");
    const canvasContext = handsCanvas.getContext("2d");
    
    handsCanvas.width = globalThis.screen.availWidth * 0.8;
    handsCanvas.height = globalThis.screen.availHeight * 0.6;
    // console.log(handsCanvas.width, handsCanvas.height, canvasContext.canvas.getBoundingClientRect())
    const pincel = {
        moving: false,
        active: false,
        posBefore: null,
        posAfter: { x: 50, Y: 60 },
        isEraser:false,
        eraserSize: 30
    }

    const desenhar = ({ posBefore, posAfter }, color,lineWidth) => {
        // canvasContext.fillStyle = "green";
        canvasContext.strokeStyle = color;
        canvasContext.lineWidth = lineWidth;
        canvasContext.lineJoin = "round";
      
        canvasContext.beginPath()
        canvasContext.moveTo(posBefore.x , posBefore.y )
        canvasContext.lineTo(posAfter.x, posAfter.y)
        // desenha rodinhas
        // canvasContext.arc(posAfter.x, posAfter.y, 2 * Math.PI, posBefore.x, posBefore.y)
        canvasContext.stroke()
    }
    const eraser = ({posBefore,posAfter,eraserSize}) =>{
        canvasContext.clearRect(posAfter.x, posAfter.y,  eraserSize , eraserSize )
    

    }
    function clear() {
        canvasContext.clearRect(0, 0, 1366, 768)
    }
    canvasContext.canvas.onmousedown = () => {
        pincel.active = true;
    }
    canvasContext.canvas.onmouseup = () => {
        pincel.active = false;
    }
    canvasContext.canvas.onmousemove = (e) => {


        pincel.posAfter = { x: e.clientX, y: e.clientY }


        pincel.moving = true;
    }
    colors.blackBox.onclick = () => {
        colors.currentColor = "black"
        pincel.isEraser = false;
    }
    colors.redBox.onclick = () => {
        colors.currentColor = "red"
        pincel.isEraser = false;
    }
    colors.greenBox.onclick = () => {
        colors.currentColor = "green"
        pincel.isEraser = false;
    }
    colors.blueBox.onclick = () => {
        colors.currentColor = "blue"
        pincel.isEraser = false;
    }
    colors.purpleBox.onclick = () => {
        colors.currentColor = "purple"
        pincel.isEraser = false;
    }
    colors.yellowBox.onclick = () => {
        colors.currentColor = "yellow"
        pincel.isEraser = false;
    }
    
    elementsOn.buttomDownload.onclick = () =>{
        let image = handsCanvas.toDataURL("image/png");
       
        elementsOn.imgContainer.innerHTML = `<img id="imageDL" src="${image}" alt="">`;
    }
    elementsOn.imgContainer.onclick = () =>{
        elementsOn.imgContainer.innerHTML = ``;
    }

    elementsOn.clearButton.onclick = () => {
        clear()

    }
    elementsOn.eraserButton.onclick = () =>{
        pincel.isEraser = true;
    }



    const ciclo = () => {

        if (pincel.active == true && pincel.moving && pincel.posBefore && pincel.isEraser == false) {
            desenhar(pincel, colors.currentColor,data.lineWidth)
            pincel.moving = false;

        }else  if (pincel.isEraser == true && pincel.moving&& pincel.posBefore && pincel.active == true) {

            eraser(pincel)
            pincel.moving = false;
         }
        pincel.posBefore = { x: pincel.posAfter.x, y: pincel.posAfter.y }
        setTimeout(ciclo, 1)
    }

   


    console.log(canvasContext.canvas)

    ciclo()


})