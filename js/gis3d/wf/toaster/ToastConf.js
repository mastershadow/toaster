define([
    "dojo/_base/declare"
], function(declare){
	var ToastConf = {};
	ToastConf.DURATION = 2000;
	ToastConf.POSITION = {
		'TL' : 'TL', 
		'TR' : 'TR', 
		'CC' : 'CC', 
		'BL' : 'BL', 
		'BR' : 'BR'
	};
	ToastConf.SLIDEDIRECTION = {
		'X' : 'X',
		'Y' : 'Y'
	};
	ToastConf.TYPE = {
		'INFO' : 'INFO',
		'SUCCESS' : 'SUCCESS',
		'WARNING' : 'WARNING',
		'ERROR' : 'ERROR'
	};
	return ToastConf;
});