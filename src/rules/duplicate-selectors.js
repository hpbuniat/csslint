/*
 * Rule: Selectors should be unique
 */
CSSLint.addRule({

    //rule information
    id: "duplicate-selectors",
    name: "Duplicate Selectors",
    desc: "Selectors should be used only once.",
    browsers: "All",

    //initialization
    init: function(parser, reporter){
        var rule = this,
            selectorStack = [];

        parser.addListener("startrule", function(event){
            var selectors = event.selectors,
                selector,
                i;

            for (i=0; i < selectors.length; i++){
                selector = selectors[i];
                if (typeof selectorStack[selector.text] === 'undefined') {
                    if (rule.isTagSelector(selector) !== true) {
                        selectorStack[selector.text] = selector.line;
                    }
                }
                else {
                    reporter.warn("Selector \"" + selector.text + "\" was already used at line " + selectorStack[selector.text] + ".", selector.line, selector.col, rule);
                }
            }
        });

        delete selectorStack;
    },

    // helper to check for plain tag-selectors
    isTagSelector: function(selector) {
        return (selector.parts.length === 1 && selector.text.match(/^\w+$/g)) ? true : false;
    }

});