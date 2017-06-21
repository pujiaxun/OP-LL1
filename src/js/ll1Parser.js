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
            ['(', 'B', '(S)'],
        ];
    }

    parse(sentence) {
        if (!/#$/.test(sentence)) {
            throw "SyntaxError: Expected # at the end of input";
        }

        this.logs = [];
        this.string = sentence.split('');
        this.stack = ['#', 'S'];
        while (this.stack.length > 0) {
            let last = this.stack.slice(-1).pop();
            let first = this.string[0];
            if (last === first) {
                this.log(first === '#' ? '接受' : `${first} 匹配`);
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
                    this.log(e, true);
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
            // 其实这里可以再细分为“不能识别输入的字符”和”找不到对应产生式的语法错误“。
            throw "SyntaxError: Invalid or unexpected token";
        }
    }

    log(rule, isError) {
        this.logs.push({
            stack: this.stack.join(''),
            string: this.string.join(''),
            rule,
            isError,
        });
    }
}
