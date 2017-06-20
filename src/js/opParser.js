class OPParser {
    constructor() {
        this.symbols = ['+', '-', '*', '/', '(', ')', 'i', '#'];

        /**
         * 优先关系表：
         * 1 : >
         * 0 : =
         * -1: <
         * null: 空
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
            throw "SyntaxError: An expression should be end with the #.";
        }

        this.optr = ['#']; // 存放运算符的 OPTR 栈
        this.opnd = []; // 存放操作数或运算结果的 OPND 栈
        let digitRegex = /^\d$/;
        let opRegex = /^[\*\/\+\-#]$/;
        
        expression.split('').forEach((ele, index) => {
            if(digitRegex.test(ele)) {
                console.log(ele);
            } else if (opRegex.test(ele)) {
                console.log(ele);
            } else {
                throw `SyntaxError: Invalid character at col: ${index}.`;
            }
        });

        return eval(expression.slice(0, -1));
    }
}
