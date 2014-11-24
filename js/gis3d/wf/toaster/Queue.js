define([
    "dojo/_base/declare",
    'gis3d/wf/toaster/ToastConf',
    'gis3d/wf/toaster/Toast',
    'gis3d/wf/toaster/ToastDefaultGui',
    'dojo/_base/lang',
    'dojo/fx',
    'dojo/dom-style'
], function(declare, ToastConf, Toast, ToastDefaultGui, lang, coreFx, domStyle){
    return declare("gis3d.wf.toaster.Queue", null, {
		position : null,
		direction : null,
		messages : null,
		guiClass : null,
		boxMargin: 10,
		itemMargin : 10,
		constructor : function(args) {
			this.position = ToastConf.POSITION.BR;
			this.direction = ToastConf.SLIDEDIRECTION.Y;
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

			// add to addToDom (offscreen)
			toast.addToDom();

			this.messages[toast.id] = toast;
			if (msgOpts.sticky === true) {
				// sticky!
			} else {
				// timeout handler
				var duration = msgOpts.duration || ToastConf.DURATION;
				toast.timerHandler = setTimeout(lang.hitch(this, this.onToastTimeout, toast), duration);
			}

			this.layout();

			return toast.id;
		},
		layout : function() {
			var n = 0;
			for (var k in this.messages) {
				var item = this.messages[k];
				domStyle.set(item.gui.domNode, this.getFinalPosition(this.position, item, n));
				n++;
			}
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

			t.hide();

			if (t.onClose != null) {
				t.onClose(t.id);
			}

			this.layout();			
		},
		getFinalPosition : function(pos, item, n) {
			var posObj = {
				left: 'auto',
				right: 'auto',
				top: 'auto',
				bottom: 'auto'
			};

			if (pos == ToastConf.POSITION.TL) {

			} else if (pos == ToastConf.POSITION.BL) {
			} else if (pos == ToastConf.POSITION.TR) {

			} else if (pos == ToastConf.POSITION.BR) {
				posObj.right = this.um(this.boxMargin);
				posObj.bottom = this.um((item.gui.height + this.itemMargin) * n + this.boxMargin);
			} else if (pos == ToastConf.POSITION.CC) {

			}
			console.log(pos, posObj);

			return posObj;
		},
		um : function(d) {
			return d + 'px';
		}
    });
});