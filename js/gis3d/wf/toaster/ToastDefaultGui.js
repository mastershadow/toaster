define([
    "dojo/_base/declare",
    'gis3d/wf/toaster/ToastConf',
    'gis3d/wf/toaster/ToastGui'
], function(declare, ToastConf, ToastGui){
    return declare("gis3d.wf.toaster.ToastDefaultGui", ToastGui, {
		width: 300,
		height: 100,
		constructor : function(args) {
			declare.safeMixin(this, args);
		},
		setCloseButtonCallback : function(closeCallback) {
		}
    });
});