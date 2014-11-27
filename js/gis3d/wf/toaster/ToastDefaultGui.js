define([
    "dojo/_base/declare",
    'gis3d/wf/toaster/ToastConf',
    'gis3d/wf/toaster/ToastGui',
    'dojo/text!./template/defaultToast.html',
    'dojo/string',
    'dojo/dom-construct',
    'dojo/dom-style',
    'dojo/query',
    'dojo/_base/lang',
    'dojo/dom-geometry'
], function(declare, ToastConf, ToastGui, template, string, 
			domConstruct, domStyle, query, lang, domGeometry){
    return declare("gis3d.wf.toaster.ToastDefaultGui", ToastGui, {
		width: 320,
		height: 'auto',
		iconSize : 'fa-4x',
		closeClasses : 'fa fa-close',
		init : function() {
			this.domNode = domConstruct.toDom(this.prepareTemplate());
			query('.wfToastClose', this.domNode).on('click', lang.hitch(this, this.onCloseClick));
			this.inherited(arguments);
		},
		prepareTemplate: function() {
			var m = lang.isArray(this.message) ? this.message[0] : this.message;
			var t = string.substitute(template, {
				'cssClasses' : this.cssClasses,
				'iconClasses' : [this.icon, this.iconSize].join(" "),
				'closeClasses' : this.closeClasses,
				'message' : m
			});
			return t;
		},
		onCloseClick : function() {
			if (this.closeButtonCallback != null) {
				this.closeButtonCallback();
			}
		},
		addToDom : function(inPosition) {
			this.inherited(arguments);
		}
    });
});