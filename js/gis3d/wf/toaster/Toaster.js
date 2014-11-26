define([
    "dojo/_base/declare",
	"gis3d/wf/toaster/Queue",
	"dojo/topic",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-construct"
], function(declare, Queue, topic, lang, win, domConstruct){
	var Toaster = declare("gis3d.wf.toaster.Toaster", null, {
		queues : null,
		defaultQueue: null,
		messageEvent: 'wfToaster/postMessage',
		eventSubscription: true,
		constructor : function(args) {
			this.queues = {};
			declare.safeMixin(this, args);

			if (this.eventSubscription) {
				topic.subscribe(this.messageEvent, lang.hitch(this, this.onMessageEvent));
			}
		},
		/*
		*	options = {
		*		message : 'MESSAGGIO',
		*		type : Toaster.TYPE, 
	 	*		duration : 1000 (ms),
	 	*		sticky : false,
	 	*		modal : false,
	 	*		id : 'id', // if the same id is still shown ignore message	 	
	 	*		icon : 'fa-icon',
	 	*		queue : 'queue-id',
	 	*		onClose : function(id)
		*   }
		*/
		postMessage : function(msgOpts) {
			if (msgOpts == null) {
				throw new Error('Missing options');
			}
			if (msgOpts.queue == null && this.defaultQueue == null) {
				throw new Error('Missing default queue');
			}
			var qK = msgOpts.queue || this.defaultQueue;
			var q = this.queues[qK];
			if (q == null) {
				throw new Error('Queue "' + qK + '" not found');
			}
			
			return q.postMessage(msgOpts);
		},
		/**
		* {
		* 	position : ToastConf.POSITION,
		* 	direction : ToastConf.DIRECTION,
		* 	transition : ToastConf.TRANSITION
		* }
		*/
		addQueue : function(name, queueOpts, setAsDefault) {
			var q = new Queue(queueOpts);
			this.queues[name] = q;

			if (setAsDefault === true) {
				this.defaultQueue = name;
			}
		},
		onMessageEvent : function (msgOpts) {
			this.postMessage(msgOpts);
		}
    });
	return Toaster;
});