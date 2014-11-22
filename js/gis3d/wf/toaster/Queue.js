define([
    "dojo/_base/declare",
    'gis3d/wf/toaster/ToastConf',
    'gis3d/wf/toaster/Toast',
    'gis3d/wf/toaster/ToastDefaultGui',
    'dojo/_base/lang'
], function(declare, ToastConf, Toast, ToastDefaultGui, lang){
    return declare("gis3d.wf.toaster.Queue", null, {
		position : null,
		direction : null,
		transition : null,
		messages : null,
		guiClass : null,
		constructor : function(args) {
			this.position = ToastConf.POSITION.BR;
			this.direction = ToastConf.DIRECTION.Y;
			this.transition = ToastConf.TRANSITION.NONE;
			this.messages = {};
			declare.safeMixin(this, args);

			this.guiClass = this.guiClass || ToastDefaultGui;
		},
		postMessage : function(msgOpts) {
			console.log(msgOpts);
			// collapse if same id
			if (this.messages[msgOpts.id] != null) {
				return;
			}

			var toast = new Toast(msgOpts, this.guiClass);
			toast.onCloseClick = lang.hitch(this, this.onToastCloseButton);
			
			// add to addToDom
			toast.addToDom();

			this.messages[toast.id] = toast;
			if (msgOpts.sticky === true) {
				// sticky!
			} else {
				// timeout handler
				var duration = msgOpts.duration || ToastConf.DURATION;
				toast.timerHandler = setTimeout(lang.hitch(this, this.onToastTimeout, toast), duration);
			}

			return toast.id;
		},
		onToastTimeout : function(t) {
			this.clearToast(t);
		},
		onToastCloseButton : function(t) {
			this.clearToast(t);
		},
		clearToast : function(t) {
			console.log(t);

			if (t.timerHandler != null) {
				clearTimeout(t.timerHandler);
				t.timerHandler = null;
			}

			if (this.messages[t.id]) {
				delete this.messages[t.id];
			}

			if (t.onClose != null) {
				t.onClose(t.id);
			}
		}
    });
});