let n;
let N;
let state;
let engine;
let graph = initGraph("probCanvas","Valószínűségi amplitudók eloszlása");


function initScene() {
    engine = new GroverEngine(3, 5);
    render();
}
initScene();

document.getElementById("stepBtn").addEventListener("click", ()=>{
    stepEngine();
});
document.getElementById("resetBtn").addEventListener("click", ()=>{
    initScene();
});


function render() {
    updateGraph(graph, engine.getFormattedState());
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

function stepEngine() {
    engine.stepForward();
    render();
}