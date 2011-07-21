/**
 * Rule: Don't use :hover pseudo-selector to non-link elements
 */
CSSLint.addRule({

    //rule information
    id: "non-link-hover",
    name: "Non-Link Hover",
    desc: "Using :hover pseudo-selector to non-link elements is known to be slow.",
    browsers: "IE",

    //initialization
    init: function(parser, reporter){
        var rule = this;

        parser.addListener("startrule", function(event){
            var selectors = event.selectors,
                selector,
                part,
                modifier,
                i, j, k;

            for (i=0; i < selectors.length; i++){
                selector = selectors[i];

                part = selector.parts[selector.parts.length-1];
                if (part.modifiers[0].text === ":hover" && part.elementName.text !== "a"){
                    reporter.warn(rule.desc, part.line, part.col, rule);
                }
            }
        });
    }

});