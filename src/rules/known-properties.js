/*
 * Rule: Properties should be known (listed in CSS3 specification) or
 * be a vendor-prefixed property.
 */
/*global CSSLint*/
CSSLint.addRule({

    //rule information
    id: "known-properties",
    name: "Known Properties",
    desc: "Properties should be known (listed in CSS specification) or be a vendor-prefixed property.",
    browsers: "All",

    //initialization
    init: function(parser, reporter){
        var rule = this,
            properties = {

                "alignment-adjust": 1,
                "alignment-baseline": 1,
                "animation": 1,
                "animation-delay": 1,
                "animation-direction": 1,
                "animation-duration": 1,
                "animation-fill-mode": 1,
                "animation-iteration-count": 1,
                "animation-name": 1,
                "animation-play-state": 1,
                "animation-timing-function": 1,
                "appearance": 1,
                "azimuth": 1,
                "backface-visibility": 1,
                "background": 1,
                "background-attachment": 1,
                "background-break": 1,
                "background-clip": 1,
                "background-color": 1,
                "background-image": 1,
                "background-origin": 1,
                "background-position": 1,
                "background-repeat": 1,
                "background-size": 1,
                "baseline-shift": 1,
                "binding": 1,
                "bleed": 1,
                "bookmark-label": 1,
                "bookmark-level": 1,
                "bookmark-state": 1,
                "bookmark-target": 1,
                "border": 1,
                "border-bottom": 1,
                "border-bottom-color": 1,
                "border-bottom-left-radius": 1,
                "border-bottom-right-radius": 1,
                "border-bottom-style": 1,
                "border-bottom-width": 1,
                "border-collapse": 1,
                "border-color": 1,
                "border-image": 1,
                "border-image-outset": 1,
                "border-image-repeat": 1,
                "border-image-slice": 1,
                "border-image-source": 1,
                "border-image-width": 1,
                "border-left": 1,
                "border-left-color": 1,
                "border-left-style": 1,
                "border-left-width": 1,
                "border-radius": 1,
                "border-right": 1,
                "border-right-color": 1,
                "border-right-style": 1,
                "border-right-width": 1,
                "border-spacing": 1,
                "border-style": 1,
                "border-top": 1,
                "border-top-color": 1,
                "border-top-left-radius": 1,
                "border-top-right-radius": 1,
                "border-top-style": 1,
                "border-top-width": 1,
                "border-width": 1,
                "bottom": 1, 
                "box-align": 1,
                "box-decoration-break": 1,
                "box-direction": 1,
                "box-flex": 1,
                "box-flex-group": 1,
                "box-lines": 1,
                "box-ordinal-group": 1,
                "box-orient": 1,
                "box-pack": 1,
                "box-shadow": 1,
                "box-sizing": 1,
                "break-after": 1,
                "break-before": 1,
                "break-inside": 1,
                "caption-side": 1,
                "clear": 1,
                "clip": 1,
                "color": 1,
                "color-profile": 1,
                "column-count": 1,
                "column-fill": 1,
                "column-gap": 1,
                "column-rule": 1,
                "column-rule-color": 1,
                "column-rule-style": 1,
                "column-rule-width": 1,
                "column-span": 1,
                "column-width": 1,
                "columns": 1,
                "content": 1,
                "counter-increment": 1,
                "counter-reset": 1,
                "crop": 1,
                "cue": 1,
                "cue-after": 1,
                "cue-before": 1,
                "cursor": 1,
                "direction": 1,
                "display": 1,
                "dominant-baseline": 1,
                "drop-initial-after-adjust": 1,
                "drop-initial-after-align": 1,
                "drop-initial-before-adjust": 1,
                "drop-initial-before-align": 1,
                "drop-initial-size": 1,
                "drop-initial-value": 1,
                "elevation": 1,
                "empty-cells": 1,
                "fit": 1,
                "fit-position": 1,
                "float": 1,                
                "float-offset": 1,
                "font": 1,
                "font-family": 1,
                "font-size": 1,
                "font-size-adjust": 1,
                "font-stretch": 1,
                "font-style": 1,
                "font-variant": 1,
                "font-weight": 1,
                "grid-columns": 1,
                "grid-rows": 1,
                "hanging-punctuation": 1,
                "height": 1,
                "hyphenate-after": 1,
                "hyphenate-before": 1,
                "hyphenate-character": 1,
                "hyphenate-lines": 1,
                "hyphenate-resource": 1,
                "hyphens": 1,
                "icon": 1,
                "image-orientation": 1,
                "image-rendering": 1,
                "image-resolution": 1,
                "inline-box-align": 1,
                "left": 1,
                "letter-spacing": 1,
                "line-height": 1,
                "line-stacking": 1,
                "line-stacking-ruby": 1,
                "line-stacking-shift": 1,
                "line-stacking-strategy": 1,
                "list-style": 1,
                "list-style-image": 1,
                "list-style-position": 1,
                "list-style-type": 1,
                "margin": 1,
                "margin-bottom": 1,
                "margin-left": 1,
                "margin-right": 1,
                "margin-top": 1,
                "mark": 1,
                "mark-after": 1,
                "mark-before": 1,
                "marks": 1,
                "marquee-direction": 1,
                "marquee-play-count": 1,
                "marquee-speed": 1,
                "marquee-style": 1,
                "max-height": 1,
                "max-width": 1,
                "min-height": 1,
                "min-width": 1,
                "move-to": 1,
                "nav-down": 1,
                "nav-index": 1,
                "nav-left": 1,
                "nav-right": 1,
                "nav-up": 1,
                "opacity": 1,
                "orphans": 1,
                "outline": 1,
                "outline-color": 1,
                "outline-offset": 1,
                "outline-style": 1,
                "outline-width": 1,
                "overflow": 1,
                "overflow-style": 1,
                "overflow-x": 1,
                "overflow-y": 1,
                "padding": 1,
                "padding-bottom": 1,
                "padding-left": 1,
                "padding-right": 1,
                "padding-top": 1,
                "page": 1,
                "page-break-after": 1,
                "page-break-before": 1,
                "page-break-inside": 1,
                "page-policy": 1,
                "pause": 1,
                "pause-after": 1,
                "pause-before": 1,
                "perspective": 1,
                "perspective-origin": 1,
                "phonemes": 1,
                "pitch": 1,
                "pitch-range": 1,
                "play-during": 1,
                "position": 1,
                "presentation-level": 1,
                "punctuation-trim": 1,
                "quotes": 1,
                "rendering-intent": 1,
                "resize": 1,
                "rest": 1,
                "rest-after": 1,
                "rest-before": 1,
                "richness": 1,
                "right": 1,
                "rotation": 1,
                "rotation-point": 1,
                "ruby-align": 1,
                "ruby-overhang": 1,
                "ruby-position": 1,
                "ruby-span": 1,
                "size": 1,
                "speak": 1,
                "speak-header": 1,
                "speak-numeral": 1,
                "speak-punctuation": 1,
                "speech-rate": 1,
                "stress": 1,
                "string-set": 1,
                "table-layout": 1,
                "target": 1,
                "target-name": 1,
                "target-new": 1,
                "target-position": 1,
                "text-align": 1,
                "text-align-last": 1,
                "text-decoration": 1,
                "text-emphasis": 1,
                "text-height": 1,
                "text-indent": 1,
                "text-justify": 1,
                "text-outline": 1,
                "text-shadow": 1,
                "text-transform": 1,
                "text-wrap": 1,
                "top": 1,
                "transform": 1,
                "transform-origin": 1,
                "transform-style": 1,
                "transition": 1,
                "transition-delay": 1,
                "transition-duration": 1,
                "transition-property": 1,
                "transition-timing-function": 1,
                "unicode-bidi": 1,
                "user-modify": 1,
                "user-select": 1,
                "vertical-align": 1,
                "visibility": 1,
                "voice-balance": 1,
                "voice-duration": 1,
                "voice-family": 1,
                "voice-pitch": 1,
                "voice-pitch-range": 1,
                "voice-rate": 1,
                "voice-stress": 1,
                "voice-volume": 1,
                "volume": 1,
                "white-space": 1,
                "white-space-collapse": 1,
                "widows": 1,
                "width": 1,
                "word-break": 1,
                "word-spacing": 1,
                "word-wrap": 1,
                "z-index": 1,
                
                //IE
                "filter": 1,
                "zoom": 1,
                
                //@font-face
                "src": 1
            };

        parser.addListener("property", function(event){
            var name = event.property.text.toLowerCase();

            if (!properties[name] && name.charAt(0) != "-"){
                reporter.error("Unknown property '" + event.property + "'.", event.line, event.col, rule);
            }

        });
    }

});