class Qbit {
    
    constructor(alpha, beta) {
        this.alpha = alpha;
        this.beta = beta;
    }

    getAlpha() {
        return this.alpha;
    }

    getBeta() {
        return this.beta;
    }

    get(){
        return{alpha: this.alpha, beta: this.beta}
    }
}