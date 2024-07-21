class MersenneTwister {
    constructor(seed) {
        this.mt = new Array(624);
        this.index = 0;
        this.init(seed);
    }

    init(seed) {
        this.mt[0] = seed >>> 0;
        for (let i = 1; i < 624; i++) {
            this.mt[i] = (1812433253 * (this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)) + i) >>> 0;
        }
    }

    next() {
        if (this.index === 0) {
            this.twist();
        }

        let y = this.mt[this.index++];
        y ^= (y >>> 11);
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= (y >>> 18);
        return y >>> 0;
    }

    twist() {
        for (let i = 0; i < 624; i++) {
            let y = (this.mt[i] & 0x80000000) | (this.mt[(i + 1) % 624] & 0x7fffffff);
            this.mt[i] = this.mt[(i + 397) % 624] ^ (y >>> 1);
            if (y % 2 !== 0) {
                this.mt[i] ^= 0x9908b0df;
            }
        }
        this.index = 0;
    }

    random() {
        return this.next() / 0xffffffff;
    }
}

function generateRandomSeed() {
    return Math.floor(Math.random() * 1_000_000_000);
}
