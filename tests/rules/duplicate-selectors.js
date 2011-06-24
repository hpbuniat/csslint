(function(){

    /*global YUITest, CSSLint*/
    var Assert = YUITest.Assert;

    YUITest.TestRunner.add(new YUITest.TestCase({

        name: "Duplicate Selectors Errors",

        "Defining two rules for the same selector should result in one warning": function(){
            var result = CSSLint.verify("#id.class { color: red;} \n#id.class {color: blue;}", { "duplicate-selectors": 1 });
            Assert.areEqual(1, result.messages.length);
            
            var result = CSSLint.verify("#id { color: red;} \n#id {color: blue;}\n\n#id {color: blue;}", { "duplicate-selectors": 1 });
            Assert.areEqual(2, result.messages.length);
            Assert.areEqual("warning", result.messages[0].type);
            Assert.areEqual(2, result.messages[0].line);
            Assert.areEqual("Selector \"#id\" was already used at line 1.", result.messages[0].message);
        },

         "Defining one rule for a selector should not result in a warning": function(){
            var result = CSSLint.verify("#test { color: red;}", { "duplicate-selectors": 1 });
            Assert.areEqual(0, result.messages.length);

            var result = CSSLint.verify("h1, h2, h3 { font-family: Verdana; } h1 { font-size: 200% }", { "duplicate-selectors": 1 });
            Assert.areEqual(0, result.messages.length);
        }
    }));
})();
