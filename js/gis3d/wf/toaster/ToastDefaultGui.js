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
		init : function() {
			this.domNode = domConstruct.toDom(this.prepareTemplate());
			domStyle.set(this.domNode, {
				width: this.width+"px",
				height: this.height+"px"
			});
			console.log(this.domNode);
		},
		prepareTemplate: function() {
			var t = string.substitute(template, {
				'cssClasses' : this.cssClasses
			});
			return t;
		}
    });
});