
const Steps = {
    ORACLE: "oracle",
    DIFFUSION: "diffusion"
};

class GroverEngine{
    constructor(n = 3, targetInd = 1){
        this.init(n, targetInd);
    }

    init(n, targetInd){
        this.n = n;
        this.N = 1 << n;
        this.targetInd = targetInd;
        this.state = new Array(this.N).fill(1/Math.sqrt(this.N));
        this.step = 0;
        this.nextStep = Steps.ORACLE;
    }

    stepForward(){
        if(this.nextStep == Steps.ORACLE){
            this.#oracle();
            this.nextStep = Steps.DIFFUSION;
        }else if(this.nextStep == Steps.DIFFUSION){
            this.#diffusion(this.state, this.targetInd);
            this.nextStep = Steps.ORACLE;
        }
        
        this.step++;    
    }

    #diffusion(){
        let sum = 0;

        for(const element of this.state){
            sum += element;
        }

        let average = sum/state.length;
        for (let i = 0; i < state.length; i++) {
            state[i] = 2*average - state[i];
        }
    }

    #oracle(){
        this.state[this.targetInd] *= -1;
    }

    getCoordinates(){
        let y = this.state[this.targetInd];

        let sumOther = 0;
        for (let i = 0; i < this.state.length; i++) {
            if (i !== this.targetInd) sumOther += this.state[i];
        }
        
        const x = sumOther / Math.sqrt(this.state.length - 1);
        const angleRad = Math.atan2(y, x);
        
        return { x, y, angleRad };
    }

    getProbability(){
        return Math.pow(this.state[this.targetInd], 2);
    }


} 