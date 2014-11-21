require([
    'dojo/dom',
    'gis3d/wf/toaster/Toaster',
    'dojo/domReady!'
], function (dom, Toaster) {
	var toaster = new Toaster();
	toaster.addQueue('default', {

	}, true);
	app.toaster = toaster;
});