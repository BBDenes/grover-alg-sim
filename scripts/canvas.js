function initGraph(id, title) {
    var chrt = document.getElementById(id);
    var graph = new Chart(chrt, {
        type: 'line',
        backgroundColor: 'rgba(29, 78, 216, 0.2)',
        data: {
            labels: [],
            datasets: [{
                tension: 0.4,
                cubicInterpolationMode: 'monotone',
                fill: true
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
               title: {
                  display: false,
                  text: title,
                  color: 'navy',
                  position: 'bottom',
                  align: 'center',
                  font: {
                     weight: 'bold'
                  },
                  padding: 8,
                  fullSize: true,
               }
            },
            scales: {
                y: {
                    suggestedMin: -1,
                    suggestedMax: 1
                }
            }
            
        },
    });

    return graph;
}


function updateGraph(chart, data){
    var dataset = chart.data.datasets[0];
    chart.data.labels = [];
    dataset.data = [];
    data.forEach((newData) =>{
        chart.data.labels.push(newData.key);
        dataset.data.push(newData.value);
    });
    dataset.cubicInterpolationMode = 'monotone',
    dataset.tension = 0.4
    dataset.label = "Valószínűségi amplitudó"
    

    chart.update();

}

function drawVectorView(canvasId, engine) {
    const canvas = document.getElementById(canvasId);
    const wrapper = canvas.parentElement;

    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.38;

    const toPixelX = (x) => cx + x * radius;
    const toPixelY = (y) => cy - y * radius;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - radius - 20, cy);
    ctx.lineTo(cx + radius + 20, cy);
    ctx.moveTo(cx, cy + radius + 20);
    ctx.lineTo(cx, cy - radius - 20);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 13px monospace';
    ctx.fillText('|w⊥⟩', cx + radius + 8, cy - 8);
    ctx.fillText('|w⟩', cx + 8, cy - radius - 10);


    const initY = 1 / Math.sqrt(engine.N);
    const initX = Math.sqrt(1 - initY * initY);
    drawArrow(ctx, cx, cy, toPixelX(initX), toPixelY(initY), '#64748b', '|s⟩', true);

    const { x, y } = engine.getCoordinates();
    drawArrow(ctx, cx, cy, toPixelX(x), toPixelY(y), '#1d4ed8', '|ψ⟩', false);
}

function drawArrow(ctx, fromX, fromY, toX, toY, color, label = '', isDashed = false) {
    const headLen = 12; // nyílhegy hossza pixelben
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = isDashed ? 1.5 : 3;

    if (isDashed) {
        ctx.setLineDash([5, 5]);
    }

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - headLen * Math.cos(angle - Math.PI / 6),
        toY - headLen * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
        toX - headLen * Math.cos(angle + Math.PI / 6),
        toY - headLen * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();

    if (label) {
        ctx.font = 'bold 14px monospace';
        ctx.fillText(label, toX + 12 * Math.cos(angle), toY + 12 * Math.sin(angle));
    }

    ctx.restore();
}

function updatePhaseText(id, engine) {
    let elem = document.getElementById(id);

    elem.textContent = `Következő lépés: ${engine.nextStep}`;
}


