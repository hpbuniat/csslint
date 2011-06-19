/**
 * The Formatter is used to transform the messages to suit for different use-cases.
 * @class Formatter
 * @constructor
 */
function Formatter(){

    /**
     * List of messages being reported.
     * @property messages
     * @type String[]
     */
    this.messages = [];

    /**
     * The current file
     * @property filename
     * @type String
     */
    this.filename = '';

    /**
     * The Formatter-Content Output
     * @property content
     * @type String{}
     */
    this.content = {};

    /**
     * Registered formatters
     * @property content
     * @type String[]
     */
    this.formatters = [];
}

Formatter.prototype = {
    constructor: Formatter,

    /**
     * Init the formatter
     *
     * @param  {Object} messages
     * @param  {string} filename
     *
     * @returns {Formatter}
     */
    setup: function(messages, filename) {
        this.messages = messages;
        this.filename = filename;
        return this;
    },

    /**
     * Register a formatter
     *
     * @param  {string} | {Array} Formatter(s) to register
     *
     * @returns {Formatter}
     */
    register: function(formatters) {
        var i, sFunc,
            formatters = typeof formatters === 'string' ? [formatters] : formatters;

        for (i in formatters) {
            var sFunc = '_' + formatters[i];
            if (typeof this[sFunc] == 'function') {
                this.formatters[formatters[i]] = sFunc;
                this.content[formatters[i]] = '';
            }
            else {
                throw 'Unknown Formatter';
            }
        }

        return this;
    },

    /**
     * Execute all registered formatters on the current messages
     *
     * @returns {Formatter}
     */
    format: function() {
        var i;
        for (sType in this.formatters) {
            this[this.formatters[sType]](sType);
        }

        return this;
    },

    /**
     * Create human-readable text-output
     *
     * @returns {Formatter}
     */
    _text: function(sType) {
        var _this = this;
        this.messages.forEach(function(message,i){
            _this.content[sType] += "\n" + _this.filename + ":\n";
            if (message.rollup){
                _this.content[sType] += (i+1) + ": " + message.type + "\n";
                _this.content[sType] += message.message + "\n";
            }
            else {
                _this.content[sType] += (i+1) + ": " + message.type + " at line " + message.line + ", col " + message.col + "\n";
                _this.content[sType] += message.message + "\n";
                _this.content[sType] += message.evidence + "\n";
            }
        });

        return this;
    },

    /**
     * Create a checkstyle compatible xml
     *
     * @returns {Formatter}
     */
    _checkstyle: function(sType) {
        var _this = this;
        _this.content[sType] += "\n" + '<file name="' + this.filename + '">';
        this.messages.forEach(function(message,i) {
            _this.content[sType] += "\n" + '<error source="css-lint" severity="' + message.type + '" message="' + message.message;
            if (!message.rollup){
                _this.content[sType] += ' (' + message.evidence + ')" line="' + message.line + '" column="' + message.col;
            }

            _this.content[sType] += '">';
        });

        _this.content[sType] += "\n" + '</file>';

        return this;
    },

    /**
     * Get the formatted output
     *
     * @returns String[]
     */
    get: function() {
        if (typeof this.content['checkstyle'] == 'string') {
            this.content['checkstyle'] = '<?xml version="1.0" encoding="UTF-8"?><checkstyle version="css-lint">' + this.content['checkstyle'] + '</checkstyle>';
        }

        return this.content;
    }
};