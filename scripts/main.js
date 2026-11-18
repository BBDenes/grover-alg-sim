//let n;
//let N;
//let state;
let engine;
let currentTick;
let graph = initGraph("probCanvas","Valószínűségi amplitudók eloszlása");
let steps = 5;

function initScene() {
    let n = parseInt(document.getElementById("qbitinput").value);
    let desiredIndex = parseInt(document.getElementById("indexInput").value);
    
    if (n < 1) {
        alert("A qbitek száma nem lehet 1 alatti!");
        return;
    }
    if (desiredIndex >= 1 << n || desiredIndex < 0) {
        alert("A keresett index nincs a megadott határokon belül!");
        return;
    }

    engine = new GroverEngine(n, desiredIndex);
    render();
}

function startTick(steps, millis, isAnimated) {
    let i = 0;
    let current = setInterval(()=>{
        stepEngine(isAnimated);
        i++;
        if (i == steps) {
            clearInterval(current);
        }
    },millis);
    return current;
}

initScene();

document.getElementById("stepBtn").addEventListener("click", ()=>{
    clearInterval(currentTick);
    stepEngine(true);
});
document.getElementById("resetBtn").addEventListener("click", ()=>{
    clearInterval(currentTick);
    initScene();
});
document.getElementById("startBtn").addEventListener("click", ()=>{
    clearInterval(currentTick);
    steps = parseInt(document.getElementById("stepInput").value);
    currentTick = startTick(steps, 1500, true);
    
});
document.getElementById("forwardBtn").addEventListener("click", ()=>{
    clearInterval(currentTick);
    steps = parseInt(document.getElementById("stepInput").value);
    currentTick = startTick(steps, 300, false);
});


function render(isAnimated) {
    updateGraph(graph, engine.getFormattedState(), isAnimated);
    drawVectorView('vectorCanvas', engine);
    updatePhaseText("phase", engine);
    document.getElementById("prob").textContent = `Találati valószínűség: ${engine.getProbability()}`
}

function init(size) {
    n = size;
    N = 1 << n;
    state = new Array(N).fill(1/Math.sqrt(N));
}

function stepEngine(isAnimated) {
    engine.stepForward();
    render(isAnimated);

}