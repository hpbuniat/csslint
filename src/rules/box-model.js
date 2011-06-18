/*
 * Rule: Don't use width or height when using padding or border. 
 */
CSSLint.addRule({

    //rule information
    id: "box-model",
    name: "Box Model",
    desc: "Don't use width or height when using padding or border.",
    browsers: "All",
    
    //initialization
    init: function(parser, reporter){
        var rule = this,
            widthProperties = {
                border: 1,
                "border-left": 1,
                "border-right": 1,              
                padding: 1,
                "padding-left": 1,
                "padding-right": 1           
            },
            heightProperties = {
                border: 1,
                "border-bottom": 1,
                "border-top": 1,                
                padding: 1,
                "padding-bottom": 1,
                "padding-top": 1               
            },
            properties;
            
        parser.addListener("startrule", function(event){
            properties = {                
            };
        });
    
        parser.addListener("property", function(event){
            var name = event.property.text.toLowerCase();
            
            if (heightProperties[name] || widthProperties){
                if (event.value != "0"){
                    properties[name] = { line: name.line, col: name.col };
                }
            } else {
                if (name == "width" || name == "height"){
                    properties[name] = 1;
                }
            }
            
        });
        
        parser.addListener("endrule", function(event){
            var prop;
            if (properties["height"]){
                for (prop in heightProperties){
                    if (heightProperties.hasOwnProperty(prop) && properties[prop]){
                        reporter.warn("Broken box model: using height with " + prop + ".", properties[prop].line, properties[prop].col, rule);
                    }
                }            
            }
            
            if (properties["width"]){
                for (prop in widthProperties){
                    if (widthProperties.hasOwnProperty(prop) && properties[prop]){
                        reporter.warn("Broken box model: using width with " + prop + ".", properties[prop].line, properties[prop].col, rule);
                    }
                }    
            }

        });
    }

});