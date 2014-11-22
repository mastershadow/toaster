define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    'gis3d/wf/toaster/ToastConf'
], function(declare, lang, ToastConf){
	var lastToastNumber = 0;
	var Toast = declare("gis3d.wf.toaster.Toast", null, {
		id : null,
		message : null,
		type : null,
		sticky : false,
		icon : null,
		onClose : null,
		onCloseClick : null,
		// private
		defaultIcons : null,
		timerHandler : null,
		constructor : function(args, guiClass) {
			this.defaultIcons = {};
			this.defaultIcons[ToastConf.TYPE.INFO] = 'fa fa-info-circle';
			this.defaultIcons[ToastConf.TYPE.SUCCESS] = 'fa fa-check-circle';
			this.defaultIcons[ToastConf.TYPE.WARNING] = 'fa fa-warning';
			this.defaultIcons[ToastConf.TYPE.ERROR] = 'fa fa-minus-circle';

			declare.safeMixin(this, args);

			// default fallback
			this.type = this.type || ToastConf.TYPE.INFO;
			this.icon = this.icon || this.defaultIcons[this.type];

			this.gui = new guiClass({
				message : this.message,
				icon : this.icon,
				type : this.type
			});

			this.gui.setCloseButtonCallback(lang.hitch(this, function() {
				this.onCloseClick(this);
			}));
			// if ID is not defined
			if (this.id == null || this.id == '') {
				this.id = "wfToast_" + lastToastNumber++;
			}
		},
		addToDom : function(inPosition) {
			return this.gui.addToDom(inPosition);
		},
		hide : function() {
			this.gui.hide();
		}
    });
	return Toast;
});