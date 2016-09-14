/*
 * binder - Simple binding data
 * https://github.com/maxistahl/binder
 */

function obs (o, bind){
	var _subscribe = {};
	var _oldValue = null;
	var _value = o;
	var _bind = bind;

	var subscribe = function(a,e){
		_subscribe[a] = e;
	};

	var unsubscribe = function(a){
		try{
			delete _subscribe[a];
		}
		catch(err){console.log(err);}
	};

	var fireSubscribes = function(){
		var els = document.querySelectorAll('[data-' + _bind + ']'),
			i = 0;
		for (i = 0; i < els.length; i++) {
			if(els[i].nodeName != 'INPUT'){
				els[i].innerHTML = value();
			}
		}

		for(var i in _subscribe){
			if( typeof _subscribe[i] == 'function') _subscribe[i](_value, _oldvalue); 
		}
	};

	var value = function(o){
		if( o == null || o == undefined ){
			return _value;
		}else{
			_oldvalue = _value;
			_value = o;
			fireSubscribes();
		}
	};

	if(_bind){
		var els = document.querySelectorAll('[data-' + _bind + ']'), // or '*' for all types of element
			i = 0;
		for (i = 0; i < els.length; i++) {
			if(els[i].nodeName == 'INPUT'){
				els[i].value = value();
				els[i].addEventListener('keyup',function (tag) {
					value(tag.srcElement.value);
				});
			}else{
				els[i].innerHTML = value();
			}
		}
	}

	return {
		value: value,
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
};