define([
    "dojo/_base/declare",
    'gis3d/wf/toaster/ToastConf',
    'gis3d/wf/toaster/Toast',
    'gis3d/wf/toaster/ToastDefaultGui',
    'dojo/_base/lang',
    'dojo/_base/fx',
    'dojo/dom-style',
    'dojo/dom-geometry',
    'dojo/_base/window'
], function(declare, ToastConf, Toast, ToastDefaultGui, lang, fx, domStyle, domGeometry, win){
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
			var posObj = {
				left: 'auto',
				right: 'auto',
				top: 'auto',
				bottom: 'auto'
			};

			if (pos == ToastConf.POSITION.TL) {
				if (dir == ToastConf.SLIDEDIRECTION.Y) {
					posObj.left = this.boxMargin;
					posObj.top = (item.gui.height + this.itemMargin) * (n - 1) + this.boxMargin;
					if (um === true) {
						posObj.left = this.um(posObj.left);
						posObj.top = this.um(posObj.top);
					}
				} else if (dir == ToastConf.SLIDEDIRECTION.X) {
					posObj.left = (item.gui.width + this.itemMargin) * (n - 1) + this.boxMargin;
					posObj.top = this.boxMargin;
					if (um === true) {
						posObj.left = this.um(posObj.left);
						posObj.top = this.um(posObj.top);
					}
				}
			} else if (pos == ToastConf.POSITION.BL) {
				if (dir == ToastConf.SLIDEDIRECTION.Y) {
					posObj.left = this.boxMargin;
					posObj.bottom = (item.gui.height + this.itemMargin) * (n - 1) + this.boxMargin;
					if (um === true) {
						posObj.left = this.um(posObj.left);
						posObj.bottom = this.um(posObj.bottom);
					}
				} else if (dir == ToastConf.SLIDEDIRECTION.X) {
					posObj.left = (item.gui.width + this.itemMargin) * (n - 1) + this.boxMargin;
					posObj.bottom = this.boxMargin;
					if (um === true) {
						posObj.left = this.um(posObj.left);
						posObj.bottom = this.um(posObj.bottom);
					}
				}
			} else if (pos == ToastConf.POSITION.TR) {
				if (dir == ToastConf.SLIDEDIRECTION.Y) {
					posObj.right = this.boxMargin;
					posObj.top = (item.gui.height + this.itemMargin) * (n - 1) + this.boxMargin;
					if (um === true) {
						posObj.right = this.um(posObj.right);
						posObj.top = this.um(posObj.top);
					}
				} else if (dir == ToastConf.SLIDEDIRECTION.X) {
					posObj.right = (item.gui.width + this.itemMargin) * (n - 1) + this.boxMargin;
					posObj.top = this.boxMargin;
					if (um === true) {
						posObj.right = this.um(posObj.right);
						posObj.top = this.um(posObj.top);
					}
				}
			} else if (pos == ToastConf.POSITION.BR) {
				if (dir == ToastConf.SLIDEDIRECTION.Y) {
					posObj.right = this.boxMargin;
					posObj.bottom = (item.gui.height + this.itemMargin) * (n - 1) + this.boxMargin;
					if (um === true) {
						posObj.right = this.um(posObj.right);
						posObj.bottom = this.um(posObj.bottom);
					}
				} else if (dir == ToastConf.SLIDEDIRECTION.X) {
					posObj.right = (item.gui.width + this.itemMargin) * (n - 1) + this.boxMargin;
					posObj.bottom = this.boxMargin;
					if (um === true) {
						posObj.right = this.um(posObj.right);
						posObj.bottom = this.um(posObj.bottom);
					}
				}
			} else if (pos == ToastConf.POSITION.CC) {
				var bBox = domGeometry.getMarginBox(win.body());
				if (dir == ToastConf.SLIDEDIRECTION.Y) {
					posObj.left = bBox.w / 2 - item.gui.width / 2;
					posObj.bottom = -item.gui.height;
					if (um === true) {
						posObj.left = this.um(posObj.left);
						posObj.bottom = this.um(posObj.bottom);
					}
				} else if (dir == ToastConf.SLIDEDIRECTION.X) {
					posObj.bottom = bBox.h / 2 - item.gui.height / 2 - n * this.itemMargin;
					posObj.right = -item.gui.width;
					if (um === true) {
						posObj.right = this.um(posObj.right);
						posObj.bottom = this.um(posObj.bottom);
					}
				}
			}

			return posObj;
		},
		getFinalPosition : function(pos, item, n, um, dir) {
			var posObj = {
				left: 'auto',
				right: 'auto',
				top: 'auto',
				bottom: 'auto'
			};

			if (pos == ToastConf.POSITION.TL) {
				if (dir == ToastConf.SLIDEDIRECTION.Y) {
					posObj.left = this.boxMargin;
					posObj.top = (item.gui.height + this.itemMargin) * n + this.boxMargin;
					if (um === true) {
						posObj.left = this.um(posObj.left);
						posObj.top = this.um(posObj.top);
					}
				} else if (dir == ToastConf.SLIDEDIRECTION.X) {
					posObj.left = (item.gui.width + this.itemMargin) * n + this.boxMargin;
					posObj.top = this.boxMargin;
					if (um === true) {
						posObj.left = this.um(posObj.left);
						posObj.top = this.um(posObj.top);
					}
				}
			} else if (pos == ToastConf.POSITION.BL) {
				if (dir == ToastConf.SLIDEDIRECTION.Y) {
					posObj.left = this.boxMargin;
					posObj.bottom = (item.gui.height + this.itemMargin) * n + this.boxMargin;
					if (um === true) {
						posObj.left = this.um(posObj.left);
						posObj.bottom = this.um(posObj.bottom);
					}
				} else if (dir == ToastConf.SLIDEDIRECTION.X) {
					posObj.left = (item.gui.width + this.itemMargin) * n + this.boxMargin;
					posObj.bottom = this.boxMargin;
					if (um === true) {
						posObj.left = this.um(posObj.left);
						posObj.bottom = this.um(posObj.bottom);
					}
				}
			} else if (pos == ToastConf.POSITION.TR) {
				if (dir == ToastConf.SLIDEDIRECTION.Y) {
					posObj.right = this.boxMargin;
					posObj.top = (item.gui.height + this.itemMargin) * n + this.boxMargin;
					if (um === true) {
						posObj.right = this.um(posObj.right);
						posObj.top = this.um(posObj.bottom);
					}
				} else if (dir == ToastConf.SLIDEDIRECTION.X) {
					posObj.right = (item.gui.width + this.itemMargin) * n + this.boxMargin;
					posObj.top = this.boxMargin;
					if (um === true) {
						posObj.right = this.um(posObj.right);
						posObj.top = this.um(posObj.bottom);
					}
				}
			} else if (pos == ToastConf.POSITION.BR) {
				if (dir == ToastConf.SLIDEDIRECTION.Y) {
					posObj.right = this.boxMargin;
					posObj.bottom = (item.gui.height + this.itemMargin) * n + this.boxMargin;
					if (um === true) {
						posObj.right = this.um(posObj.right);
						posObj.bottom = this.um(posObj.bottom);
					}
				} else if (dir == ToastConf.SLIDEDIRECTION.X) {
					posObj.right = (item.gui.width + this.itemMargin) * n + this.boxMargin;
					posObj.bottom = this.boxMargin;
					if (um === true) {
						posObj.right = this.um(posObj.right);
						posObj.bottom = this.um(posObj.bottom);
					}					
				}
			} else if (pos == ToastConf.POSITION.CC) {
				var bBox = domGeometry.getMarginBox(win.body());
				if (dir == ToastConf.SLIDEDIRECTION.Y) {
					posObj.left = bBox.w / 2 - item.gui.width / 2 + n * this.itemMargin;
					posObj.bottom = bBox.h / 2 - item.gui.height / 2 - n * this.itemMargin;
				} else if (dir == ToastConf.SLIDEDIRECTION.X) {
					posObj.bottom = bBox.h / 2 - item.gui.height / 2 - n * this.itemMargin;
					posObj.right = bBox.w / 2 - item.gui.width / 2 - n * this.itemMargin;
					if (um === true) {
						posObj.right = this.um(posObj.right);
						posObj.bottom = this.um(posObj.bottom);
					}
				}
				console.log(bBox,posObj);
			}

			return posObj;
		},
		um : function(d) {
			return d + 'px';
		}
    });
});