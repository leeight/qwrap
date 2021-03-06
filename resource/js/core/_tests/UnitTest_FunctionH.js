
(function(){
var FunctionH=QW.FunctionH,ObjectH=QW.ObjectH;
//JK begin-----
describe('FunctionH', {
	'FunctionH Members': function() {
		value_of('测试FunctionH拥有的属性').log();
	},

	'bind': function() {
		var test=function(){
			return this.length;
		};
		value_of(FunctionH.bind(test,'hello')()).should_be(5);
	},	
	'methodize': function() {
		var setName=function(el,name){
			el.name=name;
		};
		var el={};
		el.setName=FunctionH.methodize(setName);
		el.setName('JK');
		value_of(el.name).should_be('JK');
	},	
	/*'unmethodize': function(){
		var setName=FunctionH.unmethodize(
			function(name){
				this.name=name;
			}
		);
		var el={};
		setName(el,'JK');
		value_of(el.name).should_be('JK');
	},*/
	'mul': function(){
		var setName=function(el,name){
			el.name=name;
		};
		var setElsName=FunctionH.mul(setName);
		var els=[{},{}];
		setElsName(els,'JK');
		value_of(els[0].name).should_be('JK');
		value_of(els[1].name).should_be('JK');
		var numbers=[[1,2],[3,4],5,6,7,[[8]]];
		var inc = function(x){
		    return x+1;
		}
		var incAll = FunctionH.mul(inc,true);
		numbers = incAll(numbers);
		value_of(numbers[1][0]).should_be(4);
		value_of(numbers[1][1]).should_be(5);

		var incFirst = FunctionH.mul(inc, true, true);
		var n = incFirst([[]].concat(numbers));
		value_of(n).should_be(3);
	},
	/*'rwrap': function(){
		function Wrap(core){this.core=core};
		var setName = function(el,name){
			el.name=name;
		}
		var setNameRWrap=FunctionH.rwrap(setName,Wrap,0);
		var el={};
		var elw=setNameRWrap(el,'JK');
		value_of(elw.core).should_be(el);	
		value_of(el.name).should_be('JK');	
	},*/


	/*'defer': function(){
		var a = FunctionH.defer(function(x,y){
			//alert(x+y);
		});

		var id = a(1000,10,20);
		value_of(id).log();
	},
	*/

	'currying': function(){
		String.prototype.splitBySpace = FunctionH.curry(String.prototype.split,[' ']);

		value_of("a b c".splitBySpace()).log();

		var f = FunctionH.curry(function(a,b,c,d){
			return [a,b,c,d];
		},[1,,3]);

		value_of(f(2,4)).log();
	},

	'overload': function(){
		var f = FunctionH.overload(
			function(){return "..."},
			{
				"number" : function(a){
					return "number";
				},
				"string,..." : function(a){
					return "string,...";
				},
				"string" : function(a){
					return "string";
				},
				"*,string" : function(a,b){
					return ",string";
				},
				"...,string" : function(a,b){
					return "...,string";
				},
				"number,number,?...": function(a,b){
					return "number, number, ?...";
				}
			}
		);
		value_of(f(10)).log();
		value_of(f("a")).log();
		value_of(f(10,"a")).log();
		value_of(f(10,10,"a")).log();
		value_of(f("a",10)).log();
		value_of(f(10,10)).log();
		value_of(f(10,10,"string",10)).log();
		
		var g = FunctionH.overload(
			function(){
				return "...";
			},
			{
				"b is number" : function(a,b,c){
					return "b is number";
				},
				"b is string" : function(a,b,c){
					return "b is string";
				}
			},			
			function(args){ //dispatcher
				return "b is " + typeof(args[1]);
			}
		);
		value_of(g(1,2,3)).log();
		value_of(g(1,"2",3)).log();

	}
});

})();