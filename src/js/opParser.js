class OPParser {
    constructor() {
        this.symbols = ['+', '-', '*', '/', '(', ')', 'i', '#'];

        /**
         * 优先关系表：
         * 1 : >
         * 0 : =
         * -1: <
         * null: 不存在的
         */
        this.precedenceTable = [
            [1, 1, -1, -1, -1, 1, -1, 1],
            [1, 1, -1, -1, -1, 1, -1, 1],
            [1, 1, 1, 1, -1, 1, -1, 1],
            [1, 1, 1, 1, -1, 1, -1, 1],
            [-1, -1, -1, -1, -1, 0, -1, null],
            [1, 1, 1, 1, null, 1, null, 1],
            [1, 1, 1, 1, null, 1, null, 1],
            [-1, -1, -1, -1, -1, null, -1, 0],
        ];
    }

    parse(expression) {
        if (!/#$/.test(expression)) {
            throw "SyntaxError: Expected # at the end of input";
        }

        this.optr = ['#']; // 存放运算符的 OPTR 栈
        this.opnd = []; // 存放操作数或运算结果的 OPND 栈
        let digitRegex = /^\d$/;
        let opRegex = /^[\*\/\+\-\(\)#]$/;

        let exp = expression.split('');

        // TODO: 按词读入数字，而不是按字符
        while (exp.length > 0) {
            let ele = exp[0];
            let index = expression.length - exp.length + 1;

            console.log("输入：", ele);
            if (digitRegex.test(ele)) {
                let num = parseInt(ele, 10);
                this.opnd.push(num);
                exp.shift();
            } else if (opRegex.test(ele)) {
                let compareResult = this.compareLevel(ele);
                console.log('比较结果', compareResult);
                if (compareResult === -1) {
                    this.optr.push(ele);
                    exp.shift();
                } else if (compareResult === 0) {
                    if (ele !== '#') {
                        this.optr.pop();
                    }
                    exp.shift();
                } else if (compareResult === 1) {
                    let b = this.opnd.pop();
                    let a = this.opnd.pop();
                    let t = this.optr.pop();
                    let r = this.calculate(a, t, b);
                    this.opnd.push(r);
                } else {
                    throw `SyntaxError: Unexpected token at col: ${index}`;
                }
            } else {
                throw `SyntaxError: Invalid token at col: ${index}`;
            }
        }

        if (this.opnd.length > 1) {
            throw `SyntaxError: Unexpected token`;
        } else if (this.optr.length > 1) {
            throw `SyntaxError: Unexpected token`;
        }

        return this.opnd.pop();
    }

    compareLevel(input) {
        let theta1 = this.symbols.indexOf(this.optr.slice(-1).pop());
        let theta2 = this.symbols.indexOf(input);
        return this.precedenceTable[theta1][theta2];
    }

    calculate(a, t, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw `SyntaxError: Unexpected operation symbol: ${t}`;
        }

        switch (t) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return a / b;
            default:
                throw `SyntaxError: Invalid operation symbol: ${t}`;
        }
    }
}
