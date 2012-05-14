/*
 * Rule: A rule should not only combine simple rules
 */
CSSLint.addRule({

    //rule information
    id: "combined-basic-rules",
    name: "Combined basic rules",
    desc: "A rule should not only combine simple rule",
    browsers: "All",

    //initialization
    init: function(parser, reporter){
        var rule = this,
            simple = [],
            simpleRules = [],
            rules = [],
            current = [],
            selectors, i, len,
            checkSimple = function(rule) {
                "use strict";
                var len = rule.rule.length,
                    j, stack = [],
                    pos = -1;
                if (len > 1) {
                    for (j=0; j < len; j++) {
                        pos = simpleRules.indexOf(rule.rule[j]);
                        if (pos !== -1) {
                            stack.push(simple[pos]);
                        }
                    }
                }

                return stack;
            };

        parser.addListener("startrule", function(event){
            var selector;
                selectors = [];

            for (i=0, len = event.selectors.length; i < len; i++) {
                selectors.push(event.selectors[i].text.replace(/\s+/, ' '));
            }
        });

        parser.addListener("endrule", function(event) {
            if (current.length === 1) {
                simple.push({
                    "selectors": selectors.join(', '),
                    "rule": current[0],
                    toString: function() {
                        "use strict";
                        return this.selectors + ' (' + this.rule + ')';
                    }
                });
                simpleRules.push(current[0]);
            }

            rules.push({
                "selectors": selectors,
                "rule": current,
                "event": event
            });

            current = [];
        });

        parser.addListener("property", function(event){
            var name = event.property,
                value = event.value;

            current.push(name + ': ' + value);
        });
        

        parser.addListener("endstylesheet", function() {
            var result = [], t;
            for (i=0, len = rules.length; i < len; i++) {
                t = checkSimple(rules[i]);
                if (t.length && t.length === rules[i].rule.length) {
                    rules[i].simple = t;
                    result.push(rules[i]);
                }
            }

            for (i=0, len = result.length; i < len; i++) {
                var selectorString = result[i].selectors.join(", "),
                    text = "Rule (" + result[i].rule.join("; ") + ") does only consist of simple rules, which are already declared.";

                text += "\n\tSelector: " + selectorString;
                text += "\n\tSimple: " + result[i].simple.join(", ");
                reporter.report(text, result[i].event.line, result[i].event.col, rule);
            }
        });
    }

});