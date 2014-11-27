define([
    "dojo/_base/declare",
    'gis3d/wf/toaster/ToastConf',
    'dojo/dom-construct',
    'dojo/dom-style',
    'dojo/_base/window',
    'dojo/dom-geometry'
], function(declare, ToastConf, domConstruct, domStyle, win, domGeometry){
    return declare("gis3d.wf.toaster.ToastGui", null, {
		width : 0,
		height : 0,
		domNode : null,				
		message : null,
		icon : null,
		type : null,
		modal : false,
		overlayNode : null,
		offScreenPosition : {
			top: 'auto',
			left: 'auto',
			bottom : '-1000px',
			right : '-1000px'
		},
		cssClasses: 'wfToast',
		closeButtonCallback : null,
		cssClassForType : function() {
			return 'wfToastType' + this.type.charAt(0) + this.type.slice(1).toLowerCase();
		},
		constructor : function(args) {
			declare.safeMixin(this, args);
			this.cssClasses = [this.cssClasses, this.cssClassForType()].join(" ");
			console.log(this);
			this.init();
		},
		setCloseButtonCallback : function(closeCallback) {
			this.closeButtonCallback = closeCallback;
		},
		init : function() {
			domStyle.set(this.domNode, {
				width: this.width + "px",
				height: this.height + (this.height !== 'auto' ? "px" : '')
			});
		},
		addToDom : function(inPosition) {
			if (this.modal) {
				// add modal overlay
				this.overlayNode = domConstruct.create("div", {
					'class' : 'wfToastOverlay'
				}, win.body());
			}

			if (this.domNode == null) {
				throw new Error("ToastGui domNode is null");
				return null;
			}
			var position = inPosition || this.offScreenPosition;
			domStyle.set(this.domNode, position);
			domConstruct.place(this.domNode, win.body());

			var mb = domGeometry.getMarginBox(this.domNode);
			this.height = mb.h;
			this.width = mb.w;
			return this.domNode;
		},
		hide : function() {
			if (this.domNode == null) {
				throw new Error("ToastGui domNode is null");
				return null;
			}
			if (this.overlayNode != null) {
				domConstruct.destroy(this.overlayNode);
			}
			domConstruct.destroy(this.domNode);
		}
    });
});