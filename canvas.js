

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
    let clearButton = document.querySelector("#clear")
    handsCanvas.width = globalThis.screen.availWidth * 0.8;
    handsCanvas.height = globalThis.screen.availHeight * 0.6;
    // console.log(handsCanvas.width, handsCanvas.height, canvasContext.canvas.getBoundingClientRect())
    const pincel = {
        moving: false,
        active: false,
        posBefore: null,
        posAfter: { x: 50, Y: 60 }
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
    }
    colors.redBox.onclick = () => {
        colors.currentColor = "red"
    }
    colors.greenBox.onclick = () => {
        colors.currentColor = "green"
    }
    colors.blueBox.onclick = () => {
        colors.currentColor = "blue"
    }
    colors.purpleBox.onclick = () => {
        colors.currentColor = "purple"
    }
    colors.yellowBox.onclick = () => {
        colors.currentColor = "yellow"
    }






    const ciclo = () => {
        if (pincel.active == true && pincel.moving && pincel.posBefore) {
            desenhar(pincel, colors.currentColor,data.lineWidth)
            pincel.moving = false;

        }
        pincel.posBefore = { x: pincel.posAfter.x, y: pincel.posAfter.y }
        setTimeout(ciclo, 1)
    }

    clearButton.onclick = () => {
        clear()

    }


    console.log(canvasContext.canvas)

    ciclo()


})