//let n;
//let N;
//let state;
let engine;
let currentTick;
let graph = initGraph("probCanvas","Valószínűségi amplitudók eloszlása");

function initScene() {
    let n = parseInt(document.getElementById("qbitinput").value);
    let desiredIndex = parseInt(document.getElementById("indexInput").value);
    
    if (n < 1) {
        alert("A qbitek száma nem lehet 1 alatti!");
        return;
    }
    if (desiredIndex >= 1 << n || desiredIndex < 0) {
        alert("A keresett index nincs a megadott határokon belül!");
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
    return 
}

initScene();

document.getElementById("stepBtn").addEventListener("click", ()=>{
    stepEngine(true);
});
document.getElementById("resetBtn").addEventListener("click", ()=>{
    initScene();
});
document.getElementById("startBtn").addEventListener("click", ()=>{
    currentTick = startTick(2, 1500, true);

});
document.getElementById("forwardBtn").addEventListener("click", ()=>{
    currentTick = startTick(5, 300, false);
});


function render(isAnimated) {
    updateGraph(graph, engine.getFormattedState(), isAnimated);
    drawVectorView('vectorCanvas', engine);
    updatePhaseText("phase", engine);
}

function init(size) {
    n = size;
    N = 1 << n;
    state = new Array(N).fill(1/Math.sqrt(N));
}

function getCoordinates(state, targetInd){
    let y = state[targetInd];

    let sumOther = 0;
    for (let i = 0; i < state.length; i++) {
        if (i !== targetInd) sumOther += state[i];
    }
    
    const x = sumOther / Math.sqrt(state.length - 1);
    const angleRad = Math.atan2(y, x);
    
    return { x, y, angleRad };
}

function getProbability(state, targetInd){
    return Math.pow(state[targetInd], 2);
}

function stepEngine(isAnimated) {
    engine.stepForward();
    render(isAnimated);
}