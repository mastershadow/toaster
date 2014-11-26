define([
    "dojo/_base/declare",
    'gis3d/wf/toaster/ToastConf',
	"gis3d/wf/toaster/position/BR",
	"gis3d/wf/toaster/position/TR",
	"gis3d/wf/toaster/position/BL",
	"gis3d/wf/toaster/position/TL",
	"gis3d/wf/toaster/position/CC"
], function(declare, ToastConf, BR, TR, BL, TL, CC){
	var Registry = {};
	Registry.registry = {};
	Registry.register = function(k, v) {
		Registry.registry[k] = v;
	}
	Registry.get = function(k) {
		return Registry.registry[k];
	}

	Registry.register(ToastConf.POSITION.BR, new BR());
	Registry.register(ToastConf.POSITION.TR, new TR());
	Registry.register(ToastConf.POSITION.TL, new TL());
	Registry.register(ToastConf.POSITION.BL, new BL());
	Registry.register(ToastConf.POSITION.CC, new CC());
	return Registry;
});