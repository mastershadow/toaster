define([
    "dojo/_base/declare"
], function(declare){
	var ToastConf = {};
	ToastConf.DURATION = 2000;
	ToastConf.POSITION = {
		'TL' : 'TL', 
		'TC' : 'TC', 
		'TR' : 'TR', 
		'CL' : 'CL', 
		'CC' : 'CC', 
		'CR' : 'CR', 
		'BL' : 'BL', 
		'BC' : 'BC', 
		'BR' : 'BR'
	};
	ToastConf.DIRECTION = {
		'X' : 'X',
		'Y' : 'Y'
	};
	ToastConf.TRANSITION = {
		'NONE' : 'NONE',
		'OPACITY' : 'OPACITY'
	};
	ToastConf.TYPE = {
		'INFO' : 'INFO',
		'SUCCESS' : 'SUCCESS',
		'WARNING' : 'WARNING',
		'ERROR' : 'ERROR'
	};
	return ToastConf;
});