let n;
let N;
let state;

let graph = initGraph("probCanvas","Valószínűségi amplitudók eloszlása");

var testData1 = [
    { key: "|000>", value: 0.35 },
    { key: "|001>", value: 0.35 },
    { key: "|010>", value: -0.35 },
    { key: "|011>", value: 0.35 },
    { key: "|100>", value: 0.35 },
    { key: "|101>", value: 0.35 },
    { key: "|110>", value: 0.35 },
    { key: "|111>", value: 0.35 }
];
var testData2 = [
    { key: "|000>", value: 0.35 },
    { key: "|001>", value: 0.4 },
    { key: "|010>", value: 0.5 },
    { key: "|011>", value: 0.4 },
    { key: "|100>", value: 0.35 },
    { key: "|101>", value: 0.35 },
    { key: "|110>", value: 0.35 },
    { key: "|111>", value: 0.35 }
];

updateGraph(graph, testData1);

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