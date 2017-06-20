(function(global, undefined) {
    // LL1 分析过程
    let ll1Parser = new LL1Parser();
    let ll1Input = document.getElementById("ll1Input");
    ll1Input.addEventListener('input', (event) => {
        let val = event.target.value;
        if (/#$/.test(val)) {
            try {
                let results = ll1Parser.parse(val);
                console.log(results);
            } catch (e) {
                console.log(e);
            }
        }
    });

    // 算符优先分析
    let opParser = new OPParser();
    let opInput = document.getElementById("opInput");
    let opResult = document.getElementById("opResult");
    opInput.addEventListener('input', (event) => {
        let val = event.target.value;
        if (/#$/.test(val)) {
            try {
                let result = opParser.parse(val);
                opResult.innerHTML = '结果：' + result;
            } catch (e) {
                opResult.innerHTML = '结果：' + e;
            }
        }
    });



})(typeof window !== 'undefined' ? window : this);
