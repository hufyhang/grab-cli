#!/usr/local/bin/node

var $ = require('jquerygo');

var buffer = "{ \"data\" : [";

var visitUrl = function(_args, callback) {
    $.visit(_args.url, function() {
        $(_args.dom).each(function(index, element, done) {
            if(_args.attr) {
                getAttr(this, _args.attr, done, callback);
            }
            else {
                getText(this, done, true, callback);
            }
        });
    },
    function() {
        buffer = buffer.slice(0, -2);
        buffer += "]}";
        $.close();
        callback(buffer);
    });
}

var getAttr = function(obj, attr, done, callback) {
        obj.attr(attr, function(text) {
            buffer += "{\"" + attr + "\" : \"" + text + "\", ";
            getText(obj, done, false, callback);
        });
}

var getText = function(obj, done, noAttrs, callback) {
    obj.text(function(text) {
        text = text.replace(/\"/g, "&quot;");
        if(noAttrs) {
            buffer += "{\"inner\" : \"" + text + "\"}, ";
        }
        else {
            buffer += "\"inner\" : \"" + text + "\"}, ";
        }
        try{
            done();
        }
        catch(e) { //if exception caught, all iterations are finished.
            buffer = buffer.slice(0, -2);
            buffer += "]}";
            $.close();
            callback(buffer);
        }
    });
}

module.exports.grab = function(argv, callback){
    if((argv.url || argv.u) && (argv.dom || argv.d)) {
        var url = argv.url || argv.u;
        var dom = argv.dom || argv.d;
        var attr = argv.attr || argv.a || false;

        visitUrl({url: url, dom: dom, attr: attr}, callback);
    }
}

