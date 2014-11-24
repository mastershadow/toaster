require([
    'dojo/dom',
    'gis3d/wf/toaster/Toaster',
    'gis3d/wf/toaster/ToastConf',
    'dojo/topic',
    'dijit/form/Button',
    'dojo/dom-construct',
    'dojo/domReady!'
], function (dom, Toaster, ToastConf, topic, Button, domConstruct) {
	var toaster = new Toaster();
	toaster.addQueue('default', {
	}, true);
	app.toaster = toaster;

	var bInfo = new Button({
		label: 'Info'
	}, 'button-info').on('click', function() {
		notifyViaMethod(ToastConf.TYPE.INFO, true);
	});

	var prepareMsgOpts = function(type, sticky, id, queue) {
		var s = sticky || false;
		return {
			queue : queue, 
			id : id, 
			duration: 3000, 
			type: type,
			sticky : s,
			message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
		};
	}

	var notifyViaMethod = function(t, s, i, q) {
		toaster.postMessage(prepareMsgOpts(t, s, i, q));
	}


	notifyViaMethod(ToastConf.TYPE.INFO, true);
});
