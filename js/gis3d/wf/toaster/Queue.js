define([
    "dojo/_base/declare",
    'gis3d/wf/toaster/ToastConf',
    'gis3d/wf/toaster/Toast',
    'gis3d/wf/toaster/ToastDefaultGui',
    'gis3d/wf/toaster/position/Registry',
    'dojo/_base/lang',
    'dojo/_base/fx',
    'dojo/dom-style',
    'dojo/dom-geometry',
    'dojo/_base/window'
], function(declare, ToastConf, Toast, ToastDefaultGui, PositionRegistry,
			lang, fx, domStyle, domGeometry, win){
    return declare("gis3d.wf.toaster.Queue", null, {
		position : null,
		direction : null,
		messages : null,
		messagesCount: 0,
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

			this.messages[toast.id] = toast;
			this.messagesCount++;

			// add to addToDom (offscreen)
			toast.addToDom();			

			// set initial position	
			domStyle.set(toast.gui.domNode, this.getInitialPosition(this.position, toast, this.messagesCount - 1, true, this.direction));
			if (this.position == ToastConf.POSITION.CC) {
				domStyle.set(toast.gui.domNode, 'zIndex', 10000 + this.messagesCount);
			} else {
				domStyle.set(toast.gui.domNode, 'zIndex', 10000 - this.messagesCount);
			}
			

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
				var props = this.getFinalPosition(this.position, item, n, false, this.direction);
				fx.animateProperty({
					node : item.gui.domNode,
					properties : props,
				}).play();
				//domStyle.set(item.gui.domNode, this.getFinalPosition(this.position, item, n));
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
			if (t.timerHandler != null) {
				clearTimeout(t.timerHandler);
				t.timerHandler = null;
			}

			if (this.messages[t.id]) {
				delete this.messages[t.id];
			}

			this.messagesCount--;

			if (t.onClose != null) {
				t.onClose(t.id);
			}

			fx.animateProperty({
				node : t.gui.domNode,
				properties : {
					opacity : 0
				},
				onEnd : function (){
					t.hide();
				}
			}).play();

			this.layout();			
		},
		getInitialPosition : function(pos, item, n, um, dir) {
			var manager = PositionRegistry.get(pos);
			return manager.startPosition({
				obj : {
					left: 'auto',
					right: 'auto',
					top: 'auto',
					bottom: 'auto'
				},
				boxMargin: this.boxMargin,
				itemMargin: this.itemMargin,
				position: pos,
				direction: dir,
				item: item,
				number: n,
				addUm: um
			});
		},
		getFinalPosition : function(pos, item, n, um, dir) {
			var manager = PositionRegistry.get(pos);
			return manager.endPosition({
				obj : {
					left: 'auto',
					right: 'auto',
					top: 'auto',
					bottom: 'auto'
				},
				boxMargin: this.boxMargin,
				itemMargin: this.itemMargin,
				position: pos,
				direction: dir,
				item: item,
				number: n,
				addUm: um
			});
		}
    });
});