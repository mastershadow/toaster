define([
    "dojo/_base/declare",
    'gis3d/wf/toaster/ToastConf',
	"gis3d/wf/toaster/position/ManagerBase"
], function(declare, ToastConf, ManagerBase){
    return declare("gis3d.wf.toaster.position.BR", ManagerBase, {
        startPosition: function(opts) {
			if (opts.direction == ToastConf.SLIDEDIRECTION.Y) {
				opts.obj.left = opts.boxMargin;
				opts.obj.bottom = (opts.item.gui.height + opts.itemMargin) * (opts.number - 1) + opts.boxMargin;
				if (opts.addUm === true) {
					opts.obj.left = this.um(opts.obj.left);
					opts.obj.bottom = this.um(opts.obj.bottom);
				}
			} else if (opts.direction == ToastConf.SLIDEDIRECTION.X) {
				opts.obj.left = (opts.item.gui.width + opts.itemMargin) * (opts.number - 1) + opts.boxMargin;
				opts.obj.bottom = opts.boxMargin;
				if (opts.addUm === true) {
					opts.obj.left = this.um(opts.obj.left);
					opts.obj.bottom = this.um(opts.obj.bottom);
				}
			}
			return opts.obj;
        },
        endPosition: function(opts) {
        	if (opts.direction == ToastConf.SLIDEDIRECTION.Y) {
				opts.obj.left = opts.boxMargin;
				opts.obj.bottom = (opts.item.gui.height + opts.itemMargin) * (opts.number) + opts.boxMargin;
				if (opts.addUm === true) {
					opts.obj.left = this.um(opts.obj.left);
					opts.obj.bottom = this.um(opts.obj.bottom);
				}
			} else if (opts.direction == ToastConf.SLIDEDIRECTION.X) {
				opts.obj.left = (opts.item.gui.width + opts.itemMargin) * (opts.number) + opts.boxMargin;
				opts.obj.bottom = opts.boxMargin;
				if (opts.addUm === true) {
					opts.obj.left = this.um(opts.obj.left);
					opts.obj.bottom = this.um(opts.obj.bottom);
				}
			}
			return opts.obj;
        }
    });
});