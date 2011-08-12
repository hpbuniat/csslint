/**
 * Main CSSLint object.
 * @class CSSLint
 * @static
 * @extends parserlib.util.EventTarget
 */
var CSSLint = (function(){

    var rules      = [],
        formatters = [],
        api        = new parserlib.util.EventTarget();
        
    api.version = "@VERSION@";

    //-------------------------------------------------------------------------
    // Rule Management
    //-------------------------------------------------------------------------

    /**
     * Adds a new rule to the engine.
     * @param {Object} rule The rule to add.
     * @method addRule
     */
    api.addRule = function(rule){
        rules.push(rule);
        rules[rule.id] = rule;
    };

    /**
     * Clears all rule from the engine.
     * @method clearRules
     */
    api.clearRules = function(){
        rules = [];
    };
    
    /**
     * Returns the rule objects.
     * @return An array of rule objects.
     * @method getRules
     */
    api.getRules = function(){
        return [].concat(rules);
    };

    //-------------------------------------------------------------------------
    // Formatters
    //-------------------------------------------------------------------------

    /**
     * Adds a new formatter to the engine.
     * @param {Object} formatter The formatter to add.
     * @method addFormatter
     */
    api.addFormatter = function(formatter) {
        // formatters.push(formatter);
        formatters[formatter.id] = formatter;
    };
    
    /**
     * Retrieves a formatter for use.
     * @param {String} formatId The name of the format to retrieve.
     * @return {Object} The formatter or undefined.
     * @method getFormatter
     */
    api.getFormatter = function(formatId){
        return formatters[formatId];
    };
    
    /**
     * Formats the results in a particular format for a single file.
     * @param {Object} result The results returned from CSSLint.verify().
     * @param {String} filename The filename for which the results apply.
     * @param {String} formatId The name of the formatter to use.
     * @return {String} A formatted string for the results.
     * @method format
     */
    api.format = function(results, filename, formatId) {
        var formatter = this.getFormatter(formatId),
            result = null;
            
        if (formatter){
            result = formatter.startFormat();
            result += formatter.formatResults(results, filename);
            result += formatter.endFormat();
        }
        
        return result;
    }    
    
    /**
     * Indicates if the given format is supported.
     * @param {String} formatId The ID of the format to check.
     * @return {Boolean} True if the format exists, false if not.
     * @method hasFormat
     */
    api.hasFormat = function(formatId){
        return formatters.hasOwnProperty(formatId);
    };

    //-------------------------------------------------------------------------
    // Verification
    //-------------------------------------------------------------------------

    /**
     * Starts the verification process for the given CSS text.
     * @param {String} text The CSS text to verify.
     * @param {Object} ruleset (Optional) List of rules to apply. If null, then
     *      all rules are used.
     * @return {Object} Results of the verification.
     * @method verify
     */
    api.verify = function(text, ruleset){

        var i       = 0,
            len     = rules.length,
            reporter,
            lines,
            report,
            parser = new parserlib.css.Parser({ starHack: true, ieFilters: true,
                                                underscoreHack: true, strict: false });

        lines = text.split(/\n\r?/g);
        reporter = new Reporter(lines);

        if (!ruleset){
            while (i < len){
                rules[i++].init(parser, reporter);
            }
        } else {
            ruleset.errors = 1;       //always report parsing errors
            for (i in ruleset){
                if(ruleset.hasOwnProperty(i)){
                    if (rules[i]){
                        rules[i].init(parser, reporter);
                    }
                }
            }
        }

        //capture most horrible error type
        try {
            parser.parse(text);
        } catch (ex) {
            reporter.error("Fatal error, cannot continue: " + ex.message, ex.line, ex.col);
        }

        report = {
            messages    : reporter.messages,
            stats       : reporter.stats
        };
        
        //sort by line numbers, rollups at the bottom
        report.messages.sort(function (a, b){
            if (a.rollup && !b.rollup){
                return 1;
            } else if (!a.rollup && b.rollup){
                return -1;
            } else {
                return a.line - b.line;
            }
        });        
        
        return report;
    };

    //-------------------------------------------------------------------------
    // Publish the API
    //-------------------------------------------------------------------------

    return api;

})();
