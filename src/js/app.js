(function(global, undefined) {
    // LL1 分析过程
    let ll1parser = new LL1Parser();
    try {
        let ll1Results = ll1parser.parse('m+m*m#')
    } catch (e) {
        console.log(e);
    }

    // 算符优先分析


})(typeof window !== 'undefined' ? window : this);
