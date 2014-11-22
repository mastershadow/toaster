define([
    "dojo/_base/declare",
    'gis3d/wf/toaster/ToastConf',
    'gis3d/wf/toaster/ToastGui',
    'dojo/text!./template/defaultToast.html',
    'dojo/string',
    'dojo/dom-construct',
    'dojo/dom-style'
], function(declare, ToastConf, ToastGui, template, string, domConstruct, domStyle){
    return declare("gis3d.wf.toaster.ToastDefaultGui", ToastGui, {
		width: 300,
		height: 100,
		iconSize : 'fa-4x',
		init : function() {
			this.domNode = domConstruct.toDom(this.prepareTemplate());
			this.inherited(arguments);
		},
		prepareTemplate: function() {
			var t = string.substitute(template, {
				'cssClasses' : this.cssClasses,
				'iconClasses' : [this.icon, this.iconSize].join(" "),
				'message' : this.message
			});
			return t;
		}
    });
});