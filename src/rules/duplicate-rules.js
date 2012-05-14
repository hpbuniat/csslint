/*
 * Rule: Rules should be unique
 */
CSSLint.addRule({

    //rule information
    id: "duplicate-rules",
    name: "Duplicate Rules",
    desc: "Rules should be declared only once.",
    browsers: "All",

    //initialization
    init: function(parser, reporter){
        var rule = this,
            sorted, joined, i, len,
            ruleStack = {},
            selectorStack = {},
            current = [],
            selectors = [];

        parser.addListener("startrule", function(event){
            var selector;
            selectors = [];

            for (i=0, len = event.selectors.length; i < len; i++){
                selector = event.selectors[i];
                if (selector.specificity.toString() !== '0,0,0,1') {
                    selectors.push(selector.text.replace(/\s+/, ' '));
                }
            }
        });

        parser.addListener("endrule", function(event){
            if (current.length > 1 && selectors.length > 0) {
                joined = current.join("; ");
                sorted = current.sort().join("; ");
                if (typeof ruleStack[sorted] === 'undefined') {
                    ruleStack[sorted] = joined;
                    selectorStack[sorted] = [];
                }

                selectorStack[sorted].push({
                    "selector": selectors.join(', '),
                    "event": event
                });
            }

            current = [];
        });

        parser.addListener("property", function(event){
            var name = event.property,
                value = event.value;

            current.push(name + ': ' + value);
        });
        

        parser.addListener("endstylesheet", function() {
            var result = {};
            for (sorted in selectorStack) {
                if (selectorStack[sorted].length > 1) {
                    result[sorted] = selectorStack[sorted];
                }
            }

            for (sorted in result) {
                for (i=0, len = result[sorted].length; i < len; i++) {
                    reporter.report("Rule (" + sorted + ") was declared " + result[sorted].length + " times. (selector: " + result[sorted][i].selector + ")", result[sorted][i].event.line, result[sorted][i].event.col, rule);
                }
            }
        });
    }

});