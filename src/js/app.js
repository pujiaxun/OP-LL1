(function(global, undefined) {

    // 算符优先分析
    let opParser = new OPParser();
    let opInput = document.getElementById("opInput");
    let opResult = document.getElementById("opResult");
    opInput.addEventListener('input', (event) => {
        let val = event.target.value;
        opResult.classList.remove("error");

        if (/#$/.test(val)) {
            try {
                let result = opParser.parse(val);
                opResult.innerHTML = '结果：' + result;
            } catch (e) {
                opResult.classList.add("error");
                opResult.innerHTML = e;
            }
        }
    });

    // LL1 分析过程
    let ll1Parser = new LL1Parser();
    let ll1Input = document.getElementById("ll1Input");
    ll1Input.addEventListener('input', (event) => {
        let val = event.target.value;
        if (/#$/.test(val)) {
            try {
                let results = ll1Parser.parse(val);
                renderLL1Result(results);
            } catch (e) {
                alert(e);
            }
        }
    });

    let renderLL1Result = (results) => {
        let ll1Results = document.getElementById("ll1Results");

        let tbody = results.map((res, i) => {
            return `
                <tr class="${res.isError ? 'error' : ''}">
                    <td>${i + 1}</td>
                    <td class="stack">${res.stack}</td>
                    <td class="string">${res.string}</td>
                    <td>${res.rule}</td>
                </tr>
            `;
        }).join("");

        let table = `
            <table>
                <thead>
                    <th width="20%">Step</th>
                    <th width="20%">Stack</th>
                    <th width="20%">String</th>
                    <th width="40%">Rule</th>
                <thead>
                <tbody>${tbody}</tbody>
            </table>
        `;

        ll1Results.innerHTML = table;
    };

})(typeof window !== 'undefined' ? window : this);
