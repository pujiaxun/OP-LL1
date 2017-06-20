(function(global, undefined) {
    // LL1 分析过程
    let ll1Parser = new LL1Parser();
    try {
        let ll1Results = ll1Parser.parse('((m+m*m)*m)*m#')
        console.log(ll1Results);
    } catch (e) {
        console.log(e);
    }

    // 算符优先分析


})(typeof window !== 'undefined' ? window : this);
