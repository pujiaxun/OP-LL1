class LL1Parser {
    constructor() {
        this.predictionTable = [
            ['m', 'S', 'AT'],
            ['(', 'S', 'AT'],
            ['+', 'T', '+AT'],
            [')', 'T', '$'],
            ['#', 'T', '$'],
            ['m', 'A', 'BU'],
            ['(', 'A', 'BU'],
            ['+', 'U', '$'],
            ['*', 'U', '*BU'],
            [')', 'U', '$'],
            ['#', 'U', '$'],
            ['m', 'B', 'm'],
            ['(', 'B', '(S)']
        ];
    }

    parse(sentence) {
        if (!/#$/.test(sentence)) {
            throw "SyntaxError: A sentence should be end with the #.";
        }

        this.logs = [];
        this.string = sentence.split('');
        this.stack = ['#', 'S'];
        while (this.stack.length > 1) {
            let last = this.stack.slice(-1).pop();
            let first = this.string[0];
            if (last === first) {
                this.log(`${first} 匹配`);
                this.stack.pop();
                this.string.shift();
            } else {
                try {
                    let production = this.readProduction(first, last);
                    this.log(`${last} -> ${production}`);
                    this.stack.pop();

                    if (production !== '$') {
                        production.split('').reverse().forEach((p) => {
                            this.stack.push(p);
                        });
                    }
                } catch (e) {
                    this.log(e);
                    break;
                }
            }
        }
        return this.logs;
    }

    readProduction(input, nonTernimal) {
        let prod = this.predictionTable.find((ele) => {
            return ele[0] === input && ele[1] === nonTernimal;
        });
        if (prod) {
            return prod[2];
        } else {
            throw "SyntaxError: Unexpected symbol or it is not a sentence.";
        }
    }

    log(rule) {
        this.logs.push({
            stack: this.stack.join(''),
            string: this.string.join(''),
            rule,
        });
    }
}
