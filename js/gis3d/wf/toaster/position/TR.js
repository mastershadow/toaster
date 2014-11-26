define([
    "dojo/_base/declare",
    'gis3d/wf/toaster/ToastConf',
	"gis3d/wf/toaster/position/ManagerBase"
], function(declare, ToastConf, ManagerBase){
    return declare("gis3d.wf.toaster.position.BR", ManagerBase, {
        startPosition: function(opts) {
        	if (opts.direction == ToastConf.SLIDEDIRECTION.Y) {
				opts.obj.right = opts.boxMargin;
				opts.obj.top = (opts.item.gui.height + opts.itemMargin) * (opts.number - 1) + opts.boxMargin;
				if (opts.addUm === true) {
					opts.obj.right = this.um(opts.obj.right);
					opts.obj.top = this.um(opts.obj.top);
				}
			} else if (opts.direction == ToastConf.SLIDEDIRECTION.X) {
				opts.obj.right = (opts.item.gui.width + opts.itemMargin) * (opts.number - 1) + opts.boxMargin;
				opts.obj.top = opts.boxMargin;
				if (opts.addUm === true) {
					opts.obj.right = this.um(opts.obj.right);
					opts.obj.top = this.um(opts.obj.top);
				}
			}
			return opts.obj;      	
        },
        endPosition: function(opts) {
        	if (opts.direction == ToastConf.SLIDEDIRECTION.Y) {
				opts.obj.right = opts.boxMargin;
				opts.obj.top = (opts.item.gui.height + opts.itemMargin) * (opts.number) + opts.boxMargin;
				if (opts.addUm === true) {
					opts.obj.right = this.um(opts.obj.right);
					opts.obj.top = this.um(opts.obj.top);
				}
			} else if (opts.direction == ToastConf.SLIDEDIRECTION.X) {
				opts.obj.right = (opts.item.gui.width + opts.itemMargin) * (opts.number) + opts.boxMargin;
				opts.obj.top = opts.boxMargin;
				if (opts.addUm === true) {
					opts.obj.right = this.um(opts.obj.right);
					opts.obj.top = this.um(opts.obj.top);
				}
			}
			return opts.obj;		
        }
    });
});