define([
    "dojo/_base/declare"
], function(declare){
    return declare("gis3d.wf.toaster.position.ManagerBase", null, {
        startPosition: function(opts) {
        },
        endPosition: function(opts) {
        },
        um : function(d) {
            return d + 'px';
        }
    });
});