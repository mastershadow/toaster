define([
    "dojo/_base/declare",
    'gis3d/wf/toaster/ToastConf',
    'dojo/dom-construct',
    'dojo/dom-style',
    'dojo/_base/window'
], function(declare, ToastConf, domConstruct, domStyle, win){
    return declare("gis3d.wf.toaster.ToastGui", null, {
		width : 0,
		height : 0,
		domNode : null,				
		message : null,
		icon : null,
		type : null,
		cssClasses: 'wfToast',
		closeButtonCallback : null,
		cssClassForType : function() {
			return 'wfToastType' + this.type.charAt(0) + this.type.slice(1).toLowerCase();
		},
		constructor : function(args) {
			declare.safeMixin(this, args);
			this.cssClasses = [this.cssClasses, this.cssClassForType()].join(" ");
			this.init();
		},
		setCloseButtonCallback : function(closeCallback) {
			this.closeButtonCallback = closeCallback;
		},
		init : function() {},
		addToDom : function(inPosition) {
			if (this.domNode == null) {
				throw new Error("ToastGui domNode is null");
				return null;
			}
			domConstruct.place(this.domNode, win.body());
			return this.domNode;
		},
    });
});