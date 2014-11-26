define([
    "dojo/_base/declare",
    'gis3d/wf/toaster/ToastConf',
	"gis3d/wf/toaster/position/ManagerBase",
	"dojo/dom-geometry",
	"dojo/dom-style",
    'dojo/_base/window'
], function(declare, ToastConf, ManagerBase, domGeometry, domStyle, win){
    return declare("gis3d.wf.toaster.position.BR", ManagerBase, {
        startPosition: function(opts) {
			var bBox = domGeometry.getMarginBox(win.body());
			if (opts.direction == ToastConf.SLIDEDIRECTION.Y) {
				opts.obj.left = bBox.w / 2 - opts.item.gui.width / 2;
				opts.obj.bottom = -opts.item.gui.height;
				if (opts.addUm === true) {
					opts.obj.left = this.um(opts.obj.left);
					opts.obj.bottom = this.um(opts.obj.bottom);
				}
			} else if (opts.direction == ToastConf.SLIDEDIRECTION.X) {
				opts.obj.bottom = bBox.h / 2 - opts.item.gui.height / 2 - opts.number * opts.itemMargin;
				opts.obj.right = -opts.item.gui.width;
				if (opts.addUm === true) {
					opts.obj.right = this.um(opts.obj.right);
					opts.obj.bottom = this.um(opts.obj.bottom);
				}
			}
			return opts.obj;     	
        },
        endPosition: function(opts) {
			var bBox = domGeometry.getMarginBox(win.body());
			if (opts.direction == ToastConf.SLIDEDIRECTION.Y) {
				opts.obj.left = bBox.w / 2 - opts.item.gui.width / 2 + opts.number * opts.itemMargin;
				opts.obj.bottom = bBox.h / 2 - opts.item.gui.height / 2 - opts.number * opts.itemMargin;
			} else if (opts.direction == ToastConf.SLIDEDIRECTION.X) {
				opts.obj.bottom = bBox.h / 2 - opts.item.gui.height / 2 - opts.number * opts.itemMargin;
				opts.obj.right = bBox.w / 2 - opts.item.gui.width / 2 - opts.number * opts.itemMargin;
				if (opts.addUm === true) {
					opts.obj.right = this.um(opts.obj.right);
					opts.obj.bottom = this.um(opts.obj.bottom);
				}
			}
			return opts.obj;
        },
    });
});