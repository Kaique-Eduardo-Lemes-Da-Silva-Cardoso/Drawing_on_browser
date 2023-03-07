

const colors = {
    blueBox: document.querySelector("#color-blue"),
    greenBox: document.querySelector("#color-green"),
    redBox: document.querySelector("#color-red"),
    yellowBox: document.querySelector("#color-yellow"),
    purpleBox: document.querySelector("#color-purple"),
    blackBox: document.querySelector("#color-black"),
    currentColor: "red"
}





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

    const desenhar = ({ posBefore, posAfter}, color) => {
        // canvasContext.fillStyle = "green";
        canvasContext.strokeStyle = color;
        canvasContext.lineWidth = 8;
        canvasContext.lineJoin = "round";
        let ajuste = 0
        canvasContext.beginPath()
        canvasContext.moveTo(posBefore.x + ajuste, posBefore.y + ajuste)
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
            desenhar(pincel,colors.currentColor)
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