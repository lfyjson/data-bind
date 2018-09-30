var DB = function (id, data) {
	this.listeners = {};
	this.data = data;
	this.copy = JSON.parse(JSON.stringify(data));
	this.modelAttr = 'model-' + id;
	this.bindAttr = 'bind-' + id;
	this.type = id + ':change';

	this.init();
}

DB.prototype = {
	constructor: DB,
	init: function () {
		this.SubModel();
		this.SubView();
		this.PubModel();
		this.PubView();
	},
	sub: function (type, fn) {
		this.listeners[type] = this.listeners[type] || [];
		this.listeners[type].push(fn);
	},
	pub: function (type) {
		this.listeners[type] = this.listeners[type] || [];
		for(var i = 0; i < this.listeners[type].length; i++) {
            this.listeners[type][i].apply(this, [].slice.call(arguments, 1));
		}
	},
	PubModel: function () {
		var accessor = {},
		    self = this;

	    factory();

		function factory() {
			for(var key in self.data) {
                accessorHandler(key);
			}
			Object.defineProperties(self.data, propertiesHandler());
		}

		function accessorHandler(key) {
			accessor[key] = function (newVal) {
				var oldVal = self.copy[key];
				if(arguments.length) {
                   if(oldVal !== newVal) {
                   	   self.copy[key] = newVal;
                       self.pub(self.type, key, newVal, this);
                   }
				} else {
					return oldVal;
				}
			}
			self.pub(self.type, key, self.data[key], self.data);
		}

		function propertiesHandler() {
			var map = {};
			for(var key in accessor) {
               map[key] = {
                   set: accessor[key],
                   get: accessor[key],
                   enumerable: true,
                   configurable: true
               }
			}
			return map;
		}

	},
	PubView: function () {
		document.addEventListener('click', handler.bind(this), false);
		document.addEventListener('change', handler.bind(this), false);
		document.addEventListener('input', handler.bind(this), false);

		function handler(ev) {
			var target = ev.target,
			    key = target.getAttribute(this.modelAttr);
			if(key && key !== '') {
                this.pub(this.type, key, target.value, target);
			}
		}
	},
	SubModel: function () {
		this.sub(this.type, function (key, newVal, target) {
			if(target !== this.data) {
                this.data[key] = newVal;
			}
		});
	},
	SubView: function () {
		this.sub(this.type, function (key, newVal, target) {
			if(target.nodeType === 1 && window.Node && target instanceof Node) {
                 return;
			}
            
			var binds = document.querySelectorAll('[' + this.bindAttr + '="' + key + '"]'),
			    models = document.querySelectorAll('[' + this.modelAttr + '="' + key + '"]'),
			    elements = [].slice.call(binds).concat([].slice.call(models));

			for (var i = 0; i < elements.length; i++) {
                var nodeName = elements[i].nodeName.toLowerCase();
                
                if(nodeName === 'input' || nodeName === 'textarea' || nodeName === 'select') {
                    if(elements[i].value !== newVal) {
                         elements[i].value = newVal
                    }
                } else {
                	if(elements[i].innerHTML !== newVal) {
                	     elements[i].innerHTML = newVal
                	}
                }
			}
		});
	}
}

module.exports = DB;