define([
    "dojo/_base/declare",
    'gis3d/wf/toaster/ToastConf'
], function(declare, ToastConf){
    return declare("gis3d.wf.toaster.ToastGui", null, {
		width: 0,
		height: 0,
		constructor : function(args) {
			declare.safeMixin(this, args);
		},
		setCloseButtonCallback : function(closeCallback) {
		}
    });
});