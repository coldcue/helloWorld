(function (console, $global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
var _$UInt_UInt_$Impl_$ = {};
$hxClasses["_UInt.UInt_Impl_"] = _$UInt_UInt_$Impl_$;
_$UInt_UInt_$Impl_$.__name__ = ["_UInt","UInt_Impl_"];
_$UInt_UInt_$Impl_$.gt = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) return aNeg; else return a > b;
};
_$UInt_UInt_$Impl_$.toFloat = function(this1) {
	var $int = this1;
	if($int < 0) return 4294967296.0 + $int; else return $int + 0.0;
};
var Xml = function(nodeType) {
	this.nodeType = nodeType;
	this.children = [];
	this.attributeMap = new haxe_ds_StringMap();
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
Xml.parse = function(str) {
	return haxe_xml_Parser.parse(str);
};
Xml.createElement = function(name) {
	var xml = new Xml(Xml.Element);
	if(xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xml.nodeType);
	xml.nodeName = name;
	return xml;
};
Xml.createPCData = function(data) {
	var xml = new Xml(Xml.PCData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createCData = function(data) {
	var xml = new Xml(Xml.CData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createComment = function(data) {
	var xml = new Xml(Xml.Comment);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocType = function(data) {
	var xml = new Xml(Xml.DocType);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createProcessingInstruction = function(data) {
	var xml = new Xml(Xml.ProcessingInstruction);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocument = function() {
	return new Xml(Xml.Document);
};
Xml.prototype = {
	get: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.get(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		this.attributeMap.set(att,value);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.exists(att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.keys();
	}
	,elementsNamed: function(name) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var ret;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element && (function($this) {
				var $r;
				if(child.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + child.nodeType);
				$r = child.nodeName;
				return $r;
			}(this)) == name) _g.push(child);
		}
		ret = _g;
		return HxOverrides.iter(ret);
	}
	,addChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		if(x.parent != null) x.parent.removeChild(x);
		this.children.push(x);
		x.parent = this;
	}
	,removeChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		if(HxOverrides.remove(this.children,x)) {
			x.parent = null;
			return true;
		}
		return false;
	}
	,__class__: Xml
};
var com_tenderowls_xml176_Xml176Document = function(doc,rawData,ePosInfos,aPosInfos,path) {
	this.document = doc;
	this.ePosInfos = ePosInfos;
	this.aPosInfos = aPosInfos;
	this.path = path;
};
$hxClasses["com.tenderowls.xml176.Xml176Document"] = com_tenderowls_xml176_Xml176Document;
com_tenderowls_xml176_Xml176Document.__name__ = ["com","tenderowls","xml176","Xml176Document"];
com_tenderowls_xml176_Xml176Document.prototype = {
	getNodePosition: function(node) {
		return this.ePosInfos.h[node.__id__];
	}
	,getAttrPosition: function(node,attr) {
		var this1 = this.aPosInfos.h[node.__id__];
		return this1.get(attr);
	}
	,__class__: com_tenderowls_xml176_Xml176Document
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
haxe_IMap.prototype = {
	__class__: haxe_IMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var com_tenderowls_xml176_Xml176Parser = function() { };
$hxClasses["com.tenderowls.xml176.Xml176Parser"] = com_tenderowls_xml176_Xml176Parser;
com_tenderowls_xml176_Xml176Parser.__name__ = ["com","tenderowls","xml176","Xml176Parser"];
com_tenderowls_xml176_Xml176Parser.parse = function(str,path) {
	var xmlDoc = Xml.createDocument();
	var ePosInfos = new haxe_ds_ObjectMap();
	var aPosInfos = new haxe_ds_ObjectMap();
	com_tenderowls_xml176_Xml176Parser.doParse(str,0,ePosInfos,aPosInfos,xmlDoc);
	return new com_tenderowls_xml176_Xml176Document(xmlDoc,str,ePosInfos,aPosInfos,path);
};
com_tenderowls_xml176_Xml176Parser.doParse = function(str,p,ePosInfos,aPosInfos,parent) {
	if(p == null) p = 0;
	var xml = null;
	var xmlPos_from = 0;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start));
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				next = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw new js__$Boot_HaxeError("Expected <![CDATA[");
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw new js__$Boot_HaxeError("Expected <!DOCTYPE");
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw new js__$Boot_HaxeError("Expected <!--"); else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw new js__$Boot_HaxeError("Expected node name");
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw new js__$Boot_HaxeError("Expected node name");
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				ePosInfos.set(xml,{ from : start, to : p});
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw new js__$Boot_HaxeError("Expected attribute name");
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw new js__$Boot_HaxeError("Duplicate attribute");
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected =");
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected \"");
			}
			break;
		case 8:
			if(c == str.charCodeAt(start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				var pi = aPosInfos.h[xml.__id__];
				if(pi == null) {
					pi = new haxe_ds_StringMap();
					aPosInfos.set(xml,pi);
				}
				pi.set(aname,{ from : start - aname.length - 1, to : start - 1});
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = com_tenderowls_xml176_Xml176Parser.doParse(str,p,ePosInfos,aPosInfos,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw new js__$Boot_HaxeError("Expected node name");
				var v = HxOverrides.substr(str,start,p - start);
				if(v != (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + parent.nodeType);
					$r = parent.nodeName;
					return $r;
				}(this))) throw new js__$Boot_HaxeError("Expected </" + (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw "Bad node type, expected Element but found " + parent.nodeType;
					$r = parent.nodeName;
					return $r;
				}(this)) + ">");
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var i;
					if(s.charCodeAt(1) == 120) i = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else i = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.add(String.fromCharCode(i));
				} else if(!com_tenderowls_xml176_Xml176Parser.escapes.exists(s)) buf.b += Std.string("&" + s + ";"); else buf.add(com_tenderowls_xml176_Xml176Parser.escapes.get(s));
				start = p + 1;
				state = next;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw new js__$Boot_HaxeError("Unexpected end");
};
com_tenderowls_xml176_Xml176Parser.isValidChar = function(c) {
	return c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45;
};
var example_Main = function() {
	console.log("XmlCompiler starts compilation...");
	var applicationAssembler = new hex_ioc_assembler_ApplicationAssembler();
	var applicationContext = applicationAssembler.getApplicationContext("hello");
	applicationContext.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.CONTEXT_PARSED);
	var __applicationContextInjector = applicationContext.getInjector();
	var coreFactory = applicationContext.getCoreFactory();
	var __annotationProvider = applicationContext.getCoreFactory().getAnnotationProvider();
	applicationContext.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.STATE_TRANSITIONS_BUILT);
	applicationContext.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.ASSEMBLING_START);
	var message = "Hola Mundo";
	coreFactory.register("message",message);
	hex_domain_DomainExpert.getInstance().registerDomain(hex_domain_DomainUtil.getDomain("helloModule",hex_domain_Domain));
	var helloModule = new example_module_hello_HelloModule();
	coreFactory.register("helloModule",helloModule);
	applicationContext.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.OBJECTS_BUILT);
	applicationContext.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.DOMAIN_LISTENERS_ASSIGNED);
	helloModule.setMessage(message);
	applicationContext.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.METHODS_CALLED);
	helloModule.initialize();
	applicationContext.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.MODULES_INITIALIZED);
	applicationContext.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.ASSEMBLING_END);
	applicationAssembler;
};
$hxClasses["example.Main"] = example_Main;
example_Main.__name__ = ["example","Main"];
example_Main._initLogger = function() {
	var proxy = new hex_log_layout_LogProxyLayout();
	var controller = new hex_log_layout_LogLayoutHTMLView(proxy);
	proxy.addListener(new hex_log_layout_SimpleBrowserLayout(controller.consoleWrapperTaget));
	proxy.addListener(new hex_log_layout_JavaScriptConsoleLayout());
};
example_Main.main = function() {
	example_Main._initLogger();
	new example_Main();
};
example_Main.prototype = {
	__class__: example_Main
};
var hex_di_IContextOwner = function() { };
$hxClasses["hex.di.IContextOwner"] = hex_di_IContextOwner;
hex_di_IContextOwner.__name__ = ["hex","di","IContextOwner"];
hex_di_IContextOwner.prototype = {
	__class__: hex_di_IContextOwner
};
var hex_module_IModule = function() { };
$hxClasses["hex.module.IModule"] = hex_module_IModule;
hex_module_IModule.__name__ = ["hex","module","IModule"];
hex_module_IModule.__interfaces__ = [hex_di_IContextOwner];
hex_module_IModule.prototype = {
	__class__: hex_module_IModule
	,__properties__: {get_isReleased:"get_isReleased",get_isInitialized:"get_isInitialized"}
};
var hex_module_Module = function() {
	this._injector = new hex_di_Injector();
	this._injector.mapToValue(hex_di_IBasicInjector,this._injector);
	this._injector.mapToValue(hex_di_IDependencyInjector,this._injector);
	this._domainDispatcher = hex_domain_ApplicationDomainDispatcher.getInstance().getDomainDispatcher(this.getDomain());
	this._annotationProvider = hex_metadata_AnnotationProvider.getAnnotationProvider(this.getDomain());
	this._annotationProvider.registerInjector(this._injector);
	this._internalDispatcher = new hex_event_Dispatcher();
	this._injector.mapToValue(hex_control_IFrontController,new hex_control_FrontController(this._internalDispatcher,this._injector,this));
	this._injector.mapToValue(hex_event_IDispatcher,this._internalDispatcher);
	this._injector.mapToType(hex_control_macro_IMacroExecutor,hex_control_macro_MacroExecutor);
	this._injector.mapToValue(hex_module_IModule,this);
	this._logger = new hex_log_DomainLogger(this.getDomain());
};
$hxClasses["hex.module.Module"] = hex_module_Module;
hex_module_Module.__name__ = ["hex","module","Module"];
hex_module_Module.__interfaces__ = [hex_module_IModule];
hex_module_Module.prototype = {
	initialize: function() {
		if(!this.get_isInitialized()) {
			this._onInitialisation();
			this._checkRuntimeDependencies(this._getRuntimeDependencies());
			this.isInitialized = true;
			this._fireInitialisationEvent();
		} else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException(Std.string(this) + ".initialize can't be called more than once. Check your code.",{ fileName : "Module.hx", lineNumber : 78, className : "hex.module.Module", methodName : "initialize"}));
	}
	,get_isInitialized: function() {
		return this.isInitialized;
	}
	,get_isReleased: function() {
		return this.isReleased;
	}
	,getDomain: function() {
		return hex_domain_DomainExpert.getInstance().getDomainFor(this);
	}
	,dispatchPublicMessage: function(messageType,data) {
		if(this._domainDispatcher != null) this._domainDispatcher.dispatch(messageType,data); else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException("Domain dispatcher is null. Try to use 'Module.registerInternalDomain' before calling super constructor to fix the problem",{ fileName : "Module.hx", lineNumber : 125, className : "hex.module.Module", methodName : "dispatchPublicMessage"}));
	}
	,addHandler: function(messageType,scope,callback) {
		if(this._domainDispatcher != null) this._domainDispatcher.addHandler(messageType,scope,callback); else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException("Domain dispatcher is null. Try to use 'Module.registerInternalDomain' before calling super constructor to fix the problem",{ fileName : "Module.hx", lineNumber : 140, className : "hex.module.Module", methodName : "addHandler"}));
	}
	,removeHandler: function(messageType,scope,callback) {
		if(this._domainDispatcher != null) this._domainDispatcher.removeHandler(messageType,scope,callback); else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException("Domain dispatcher is null. Try to use 'Module.registerInternalDomain' before calling super constructor to fix the problem",{ fileName : "Module.hx", lineNumber : 155, className : "hex.module.Module", methodName : "removeHandler"}));
	}
	,_dispatchPrivateMessage: function(messageType,data) {
		this._internalDispatcher.dispatch(messageType,data);
	}
	,buildViewHelper: function(type,view) {
		return hex_view_viewhelper_ViewHelperManager.getInstance(this).buildViewHelper(this._injector,type,view);
	}
	,release: function() {
		if(!this.get_isReleased()) {
			this.isReleased = true;
			this._onRelease();
			this._fireReleaseEvent();
			hex_view_viewhelper_ViewHelperManager.release(this);
			if(this._domainDispatcher != null) this._domainDispatcher.removeAllListeners();
			this._internalDispatcher.removeAllListeners();
			hex_domain_DomainExpert.getInstance().releaseDomain(this);
			this._annotationProvider.unregisterInjector(this._injector);
			this._injector.destroyInstance(this);
			this._injector.teardown();
			this._logger = null;
		} else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException(Std.string(this) + ".release can't be called more than once. Check your code.",{ fileName : "Module.hx", lineNumber : 199, className : "hex.module.Module", methodName : "release"}));
	}
	,getInjector: function() {
		return this._injector;
	}
	,getLogger: function() {
		return this._logger;
	}
	,_fireInitialisationEvent: function() {
		if(this.get_isInitialized()) this.dispatchPublicMessage(hex_module_ModuleMessage.INITIALIZED,[this]); else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException(Std.string(this) + ".fireModuleInitialisationNote can't be called with previous initialize call.",{ fileName : "Module.hx", lineNumber : 225, className : "hex.module.Module", methodName : "_fireInitialisationEvent"}));
	}
	,_fireReleaseEvent: function() {
		if(this.get_isReleased()) this.dispatchPublicMessage(hex_module_ModuleMessage.RELEASED,[this]); else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException(Std.string(this) + ".fireModuleReleaseNote can't be called with previous release call.",{ fileName : "Module.hx", lineNumber : 241, className : "hex.module.Module", methodName : "_fireReleaseEvent"}));
	}
	,_onInitialisation: function() {
	}
	,_onRelease: function() {
	}
	,_getDependencyInjector: function() {
		return this._injector;
	}
	,_getRuntimeDependencies: function() {
		throw new js__$Boot_HaxeError(new hex_error_VirtualMethodException(hex_log_Stringifier.stringify(this) + ".checkDependencies is not implemented",{ fileName : "Module.hx", lineNumber : 277, className : "hex.module.Module", methodName : "_getRuntimeDependencies"}));
	}
	,_checkRuntimeDependencies: function(dependencies) {
		hex_module_dependency_RuntimeDependencyChecker.check(this,this._injector,dependencies);
	}
	,_addStatelessConfigClasses: function(configurations) {
		var _g = 0;
		while(_g < configurations.length) {
			var configurationClass = configurations[_g];
			++_g;
			var config = this._injector.instantiateUnmapped(configurationClass);
			config.configure();
		}
	}
	,_addStatefulConfigs: function(configurations) {
		var _g = 0;
		while(_g < configurations.length) {
			var configuration = configurations[_g];
			++_g;
			configuration.configure(this._injector,this._internalDispatcher,this);
		}
	}
	,__class__: hex_module_Module
	,__properties__: {get_isReleased:"get_isReleased",get_isInitialized:"get_isInitialized"}
};
var example_module_hello_IHelloModule = function() { };
$hxClasses["example.module.hello.IHelloModule"] = example_module_hello_IHelloModule;
example_module_hello_IHelloModule.__name__ = ["example","module","hello","IHelloModule"];
example_module_hello_IHelloModule.__interfaces__ = [hex_module_IModule];
var example_module_hello_HelloModule = function() {
	hex_module_Module.call(this);
	this._addStatelessConfigClasses([example_module_hello__$HelloModule_CommandConfig,example_module_hello__$HelloModule_ModelConfig]);
	this.buildView();
};
$hxClasses["example.module.hello.HelloModule"] = example_module_hello_HelloModule;
example_module_hello_HelloModule.__name__ = ["example","module","hello","HelloModule"];
example_module_hello_HelloModule.__interfaces__ = [example_module_hello_IHelloModule];
example_module_hello_HelloModule.__super__ = hex_module_Module;
example_module_hello_HelloModule.prototype = $extend(hex_module_Module.prototype,{
	buildView: function() {
		this.buildViewHelper(example_module_hello_view_HelloViewHelper,new example_module_hello_view_HelloViewJS());
	}
	,setMessage: function(message) {
		this._dispatchPrivateMessage(example_module_hello_message_HelloModuleMessage.SET_MESSAGE,[new hex_control_request_StringRequest(message)]);
	}
	,_getRuntimeDependencies: function() {
		var rd = new hex_module_dependency_RuntimeDependencies();
		return rd;
	}
	,__class__: example_module_hello_HelloModule
});
var hex_di_IInjectorContainer = function() { };
$hxClasses["hex.di.IInjectorContainer"] = hex_di_IInjectorContainer;
hex_di_IInjectorContainer.__name__ = ["hex","di","IInjectorContainer"];
var hex_config_stateless_IStatelessConfig = function() { };
$hxClasses["hex.config.stateless.IStatelessConfig"] = hex_config_stateless_IStatelessConfig;
hex_config_stateless_IStatelessConfig.__name__ = ["hex","config","stateless","IStatelessConfig"];
hex_config_stateless_IStatelessConfig.prototype = {
	__class__: hex_config_stateless_IStatelessConfig
};
var hex_config_stateless_StatelessCommandConfig = function() {
};
$hxClasses["hex.config.stateless.StatelessCommandConfig"] = hex_config_stateless_StatelessCommandConfig;
hex_config_stateless_StatelessCommandConfig.__name__ = ["hex","config","stateless","StatelessCommandConfig"];
hex_config_stateless_StatelessCommandConfig.__interfaces__ = [hex_config_stateless_IStatelessConfig];
hex_config_stateless_StatelessCommandConfig.prototype = {
	configure: function() {
		throw new js__$Boot_HaxeError(new hex_error_VirtualMethodException("'configure' is not implemented",{ fileName : "StatelessCommandConfig.hx", lineNumber : 30, className : "hex.config.stateless.StatelessCommandConfig", methodName : "configure"}));
	}
	,map: function(messageType,commandClass) {
		return this.frontController.map(messageType,commandClass);
	}
	,__class__: hex_config_stateless_StatelessCommandConfig
};
var example_module_hello__$HelloModule_CommandConfig = function() {
	hex_config_stateless_StatelessCommandConfig.call(this);
};
$hxClasses["example.module.hello._HelloModule.CommandConfig"] = example_module_hello__$HelloModule_CommandConfig;
example_module_hello__$HelloModule_CommandConfig.__name__ = ["example","module","hello","_HelloModule","CommandConfig"];
example_module_hello__$HelloModule_CommandConfig.__super__ = hex_config_stateless_StatelessCommandConfig;
example_module_hello__$HelloModule_CommandConfig.prototype = $extend(hex_config_stateless_StatelessCommandConfig.prototype,{
	configure: function() {
		this.map(example_module_hello_message_HelloModuleMessage.SET_MESSAGE,example_module_hello_controller_SetMessageCommand);
	}
	,__class__: example_module_hello__$HelloModule_CommandConfig
});
var hex_config_stateless_StatelessModelConfig = function() {
};
$hxClasses["hex.config.stateless.StatelessModelConfig"] = hex_config_stateless_StatelessModelConfig;
hex_config_stateless_StatelessModelConfig.__name__ = ["hex","config","stateless","StatelessModelConfig"];
hex_config_stateless_StatelessModelConfig.__interfaces__ = [hex_config_stateless_IStatelessConfig];
hex_config_stateless_StatelessModelConfig.prototype = {
	configure: function() {
		throw new js__$Boot_HaxeError(new hex_error_VirtualMethodException(Std.string(this) + ".configure must be overridden",{ fileName : "StatelessModelConfig.hx", lineNumber : 24, className : "hex.config.stateless.StatelessModelConfig", methodName : "configure"}));
	}
	,mapModel: function(modelInterface,modelClass,name) {
		if(name == null) name = "";
		var instance = this.injector.instantiateUnmapped(modelClass);
		this.injector.mapToValue(modelInterface,instance,name);
		this.injector.mapToValue(Type.resolveClass(Type.getClassName(modelInterface) + "RO"),instance);
	}
	,__class__: hex_config_stateless_StatelessModelConfig
};
var example_module_hello__$HelloModule_ModelConfig = function() {
	hex_config_stateless_StatelessModelConfig.call(this);
};
$hxClasses["example.module.hello._HelloModule.ModelConfig"] = example_module_hello__$HelloModule_ModelConfig;
example_module_hello__$HelloModule_ModelConfig.__name__ = ["example","module","hello","_HelloModule","ModelConfig"];
example_module_hello__$HelloModule_ModelConfig.__super__ = hex_config_stateless_StatelessModelConfig;
example_module_hello__$HelloModule_ModelConfig.prototype = $extend(hex_config_stateless_StatelessModelConfig.prototype,{
	configure: function() {
		this.mapModel(example_module_hello_model_IMessageModel,example_module_hello_model_MessageModel);
	}
	,__class__: example_module_hello__$HelloModule_ModelConfig
});
var hex_control_command_ICommand = function() { };
$hxClasses["hex.control.command.ICommand"] = hex_control_command_ICommand;
hex_control_command_ICommand.__name__ = ["hex","control","command","ICommand"];
hex_control_command_ICommand.prototype = {
	__class__: hex_control_command_ICommand
};
var hex_control_command_BasicCommand = function() {
	this.executeMethodName = "execute";
};
$hxClasses["hex.control.command.BasicCommand"] = hex_control_command_BasicCommand;
hex_control_command_BasicCommand.__name__ = ["hex","control","command","BasicCommand"];
hex_control_command_BasicCommand.__interfaces__ = [hex_control_command_ICommand];
hex_control_command_BasicCommand.prototype = {
	getResult: function() {
		return null;
	}
	,getReturnedExecutionPayload: function() {
		return null;
	}
	,getLogger: function() {
		return this._owner.getLogger();
	}
	,getOwner: function() {
		return this._owner;
	}
	,setOwner: function(owner) {
		this._owner = owner;
	}
	,__class__: hex_control_command_BasicCommand
};
var example_module_hello_controller_SetMessageCommand = function() {
	hex_control_command_BasicCommand.call(this);
};
$hxClasses["example.module.hello.controller.SetMessageCommand"] = example_module_hello_controller_SetMessageCommand;
example_module_hello_controller_SetMessageCommand.__name__ = ["example","module","hello","controller","SetMessageCommand"];
example_module_hello_controller_SetMessageCommand.__super__ = hex_control_command_BasicCommand;
example_module_hello_controller_SetMessageCommand.prototype = $extend(hex_control_command_BasicCommand.prototype,{
	execute: function(request) {
		this.getLogger().debug("SetMessageCommand execute message : " + request.value,{ fileName : "SetMessageCommand.hx", lineNumber : 19, className : "example.module.hello.controller.SetMessageCommand", methodName : "execute"});
		this.messageModel.setMessage(request.value);
	}
	,__class__: example_module_hello_controller_SetMessageCommand
});
var hex_event_MessageType = function(messageName) {
	if(messageName == null) messageName = "handleMessage";
	this.name = messageName;
};
$hxClasses["hex.event.MessageType"] = hex_event_MessageType;
hex_event_MessageType.__name__ = ["hex","event","MessageType"];
hex_event_MessageType.prototype = {
	__class__: hex_event_MessageType
};
var example_module_hello_message_HelloModuleMessage = function() { };
$hxClasses["example.module.hello.message.HelloModuleMessage"] = example_module_hello_message_HelloModuleMessage;
example_module_hello_message_HelloModuleMessage.__name__ = ["example","module","hello","message","HelloModuleMessage"];
var hex_model_IModelRO = function() { };
$hxClasses["hex.model.IModelRO"] = hex_model_IModelRO;
hex_model_IModelRO.__name__ = ["hex","model","IModelRO"];
hex_model_IModelRO.prototype = {
	__class__: hex_model_IModelRO
};
var example_module_hello_model_IMessageModelRO = function() { };
$hxClasses["example.module.hello.model.IMessageModelRO"] = example_module_hello_model_IMessageModelRO;
example_module_hello_model_IMessageModelRO.__name__ = ["example","module","hello","model","IMessageModelRO"];
example_module_hello_model_IMessageModelRO.__interfaces__ = [hex_model_IModelRO];
example_module_hello_model_IMessageModelRO.prototype = {
	__class__: example_module_hello_model_IMessageModelRO
};
var example_module_hello_model_IMessageModel = function() { };
$hxClasses["example.module.hello.model.IMessageModel"] = example_module_hello_model_IMessageModel;
example_module_hello_model_IMessageModel.__name__ = ["example","module","hello","model","IMessageModel"];
example_module_hello_model_IMessageModel.__interfaces__ = [example_module_hello_model_IMessageModelRO];
example_module_hello_model_IMessageModel.prototype = {
	__class__: example_module_hello_model_IMessageModel
};
var example_module_hello_model_IMessageModelListener = function() { };
$hxClasses["example.module.hello.model.IMessageModelListener"] = example_module_hello_model_IMessageModelListener;
example_module_hello_model_IMessageModelListener.__name__ = ["example","module","hello","model","IMessageModelListener"];
example_module_hello_model_IMessageModelListener.prototype = {
	__class__: example_module_hello_model_IMessageModelListener
};
var example_module_hello_model_MessageModel = function() {
	this._dispatcher = new example_module_hello_model_MessageModelDispatcher();
};
$hxClasses["example.module.hello.model.MessageModel"] = example_module_hello_model_MessageModel;
example_module_hello_model_MessageModel.__name__ = ["example","module","hello","model","MessageModel"];
example_module_hello_model_MessageModel.__interfaces__ = [example_module_hello_model_IMessageModel];
example_module_hello_model_MessageModel.prototype = {
	setMessage: function(message) {
		this._message = message;
		this._dispatcher.onMessageChange(message);
	}
	,getMessage: function() {
		return this._message;
	}
	,addListener: function(listener) {
		this._dispatcher.addListener(listener);
	}
	,removeListener: function(listener) {
		this._dispatcher.removeListener(listener);
	}
	,__class__: example_module_hello_model_MessageModel
};
var hex_model_ModelDispatcher = function() {
	this._listeners = [];
};
$hxClasses["hex.model.ModelDispatcher"] = hex_model_ModelDispatcher;
hex_model_ModelDispatcher.__name__ = ["hex","model","ModelDispatcher"];
hex_model_ModelDispatcher.prototype = {
	addListener: function(listener) {
		if(HxOverrides.indexOf(this._listeners,listener,0) == -1) {
			this._listeners.push(listener);
			return true;
		} else return false;
	}
	,removeListener: function(listener) {
		var index = HxOverrides.indexOf(this._listeners,listener,0);
		if(index > -1) {
			this._listeners.splice(index,1);
			return true;
		} else return false;
	}
	,__class__: hex_model_ModelDispatcher
};
var example_module_hello_model_MessageModelDispatcher = function() {
	hex_model_ModelDispatcher.call(this);
};
$hxClasses["example.module.hello.model.MessageModelDispatcher"] = example_module_hello_model_MessageModelDispatcher;
example_module_hello_model_MessageModelDispatcher.__name__ = ["example","module","hello","model","MessageModelDispatcher"];
example_module_hello_model_MessageModelDispatcher.__interfaces__ = [example_module_hello_model_IMessageModelListener];
example_module_hello_model_MessageModelDispatcher.__super__ = hex_model_ModelDispatcher;
example_module_hello_model_MessageModelDispatcher.prototype = $extend(hex_model_ModelDispatcher.prototype,{
	onMessageChange: function(message) {
		var _g = 0;
		var _g1 = this._listeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener.onMessageChange(message);
		}
	}
	,__class__: example_module_hello_model_MessageModelDispatcher
});
var hex_view_viewhelper_IViewHelper = function() { };
$hxClasses["hex.view.viewhelper.IViewHelper"] = hex_view_viewhelper_IViewHelper;
hex_view_viewhelper_IViewHelper.__name__ = ["hex","view","viewhelper","IViewHelper"];
hex_view_viewhelper_IViewHelper.prototype = {
	__class__: hex_view_viewhelper_IViewHelper
	,__properties__: {set_visible:"set_visible",get_visible:"get_visible",set_view:"set_view",get_view:"get_view"}
};
var hex_view_viewhelper_ViewHelper = function() {
	this._isPreInitialized = false;
	this._isVisible = hex_view_viewhelper_ViewHelper.DEFAULT_VISIBLE;
	this._dispatcher = new hex_event_Dispatcher();
};
$hxClasses["hex.view.viewhelper.ViewHelper"] = hex_view_viewhelper_ViewHelper;
hex_view_viewhelper_ViewHelper.__name__ = ["hex","view","viewhelper","ViewHelper"];
hex_view_viewhelper_ViewHelper.__interfaces__ = [hex_view_viewhelper_IViewHelper];
hex_view_viewhelper_ViewHelper.prototype = {
	_preInitialize: function() {
	}
	,_initialize: function() {
	}
	,_release: function() {
	}
	,get_view: function() {
		return this._view;
	}
	,set_view: function(view) {
		if(!this._isPreInitialized) this._preInitialize();
		if(this.get_view() != null || view == null) this._dispatcher.dispatch(hex_view_viewhelper_ViewHelperMessage.REMOVE_VIEW,[this,this._view]);
		this._view = view;
		if(view != null) {
			this._dispatcher.dispatch(hex_view_viewhelper_ViewHelperMessage.ATTACH_VIEW,[this,this._view]);
			if(view.get_visible()) {
				if(view.get_visible() != this._isVisible) view.set_visible(this._isVisible);
			} else this._isVisible = false;
			this._fireInitialisation();
		}
		return this._view;
	}
	,_fireInitialisation: function() {
		this._initialize();
		this._dispatcher.dispatch(hex_view_viewhelper_ViewHelperMessage.INIT,[this]);
	}
	,getOwner: function() {
		return this._owner;
	}
	,getLogger: function() {
		return this._owner.getLogger();
	}
	,setOwner: function(owner) {
		this._owner = owner;
	}
	,show: function() {
		if(!this._isVisible) {
			this._isVisible = true;
			if(this._view != null) this._view.set_visible(true);
		}
	}
	,hide: function() {
		if(this._isVisible) {
			this._isVisible = false;
			if(this._view != null) this._view.set_visible(false);
		}
	}
	,get_visible: function() {
		return this._isVisible;
	}
	,set_visible: function(visible) {
		if(visible) this.show(); else this.hide();
		return this._isVisible;
	}
	,release: function() {
		this._dispatcher.dispatch(hex_view_viewhelper_ViewHelperMessage.RELEASE,[this]);
		this._view = null;
		this._dispatcher.removeAllListeners();
	}
	,addHandler: function(messageType,scope,callback) {
		this._dispatcher.addHandler(messageType,scope,callback);
	}
	,removeHandler: function(messageType,scope,callback) {
		this._dispatcher.removeHandler(messageType,scope,callback);
	}
	,__class__: hex_view_viewhelper_ViewHelper
	,__properties__: {set_visible:"set_visible",get_visible:"get_visible",set_view:"set_view",get_view:"get_view"}
};
var example_module_hello_view_HelloViewHelper = function(view) {
	hex_view_viewhelper_ViewHelper.call(this);
};
$hxClasses["example.module.hello.view.HelloViewHelper"] = example_module_hello_view_HelloViewHelper;
example_module_hello_view_HelloViewHelper.__name__ = ["example","module","hello","view","HelloViewHelper"];
example_module_hello_view_HelloViewHelper.__interfaces__ = [example_module_hello_model_IMessageModelListener];
example_module_hello_view_HelloViewHelper.__super__ = hex_view_viewhelper_ViewHelper;
example_module_hello_view_HelloViewHelper.prototype = $extend(hex_view_viewhelper_ViewHelper.prototype,{
	_initialize: function() {
		hex_view_viewhelper_ViewHelper.prototype._initialize.call(this);
		this._helloView = this._view;
		this._model.addListener(this);
	}
	,onMessageChange: function(message) {
		this._helloView.showMessage(message);
	}
	,__class__: example_module_hello_view_HelloViewHelper
});
var hex_view_IView = function() { };
$hxClasses["hex.view.IView"] = hex_view_IView;
hex_view_IView.__name__ = ["hex","view","IView"];
hex_view_IView.prototype = {
	__class__: hex_view_IView
	,__properties__: {set_visible:"set_visible",get_visible:"get_visible"}
};
var example_module_hello_view_IHelloView = function() { };
$hxClasses["example.module.hello.view.IHelloView"] = example_module_hello_view_IHelloView;
example_module_hello_view_IHelloView.__name__ = ["example","module","hello","view","IHelloView"];
example_module_hello_view_IHelloView.__interfaces__ = [hex_view_IView];
example_module_hello_view_IHelloView.prototype = {
	__class__: example_module_hello_view_IHelloView
};
var example_module_hello_view_HelloViewJS = function() {
	this._content = window.document.getElementById("content");
};
$hxClasses["example.module.hello.view.HelloViewJS"] = example_module_hello_view_HelloViewJS;
example_module_hello_view_HelloViewJS.__name__ = ["example","module","hello","view","HelloViewJS"];
example_module_hello_view_HelloViewJS.__interfaces__ = [example_module_hello_view_IHelloView];
example_module_hello_view_HelloViewJS.prototype = {
	showMessage: function(message) {
		this._content.innerText = message;
	}
	,get_visible: function() {
		return this.visible;
	}
	,set_visible: function(value) {
		return this.visible = value;
	}
	,__class__: example_module_hello_view_HelloViewJS
	,__properties__: {set_visible:"set_visible",get_visible:"get_visible"}
};
var haxe_ds_ArraySort = function() { };
$hxClasses["haxe.ds.ArraySort"] = haxe_ds_ArraySort;
haxe_ds_ArraySort.__name__ = ["haxe","ds","ArraySort"];
haxe_ds_ArraySort.sort = function(a,cmp) {
	haxe_ds_ArraySort.rec(a,cmp,0,a.length);
};
haxe_ds_ArraySort.rec = function(a,cmp,from,to) {
	var middle = from + to >> 1;
	if(to - from < 12) {
		if(to <= from) return;
		var _g = from + 1;
		while(_g < to) {
			var i = _g++;
			var j = i;
			while(j > from) {
				if(cmp(a[j],a[j - 1]) < 0) haxe_ds_ArraySort.swap(a,j - 1,j); else break;
				j--;
			}
		}
		return;
	}
	haxe_ds_ArraySort.rec(a,cmp,from,middle);
	haxe_ds_ArraySort.rec(a,cmp,middle,to);
	haxe_ds_ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
};
haxe_ds_ArraySort.doMerge = function(a,cmp,from,pivot,to,len1,len2) {
	var first_cut;
	var second_cut;
	var len11;
	var len22;
	var new_mid;
	if(len1 == 0 || len2 == 0) return;
	if(len1 + len2 == 2) {
		if(cmp(a[pivot],a[from]) < 0) haxe_ds_ArraySort.swap(a,pivot,from);
		return;
	}
	if(len1 > len2) {
		len11 = len1 >> 1;
		first_cut = from + len11;
		second_cut = haxe_ds_ArraySort.lower(a,cmp,pivot,to,first_cut);
		len22 = second_cut - pivot;
	} else {
		len22 = len2 >> 1;
		second_cut = pivot + len22;
		first_cut = haxe_ds_ArraySort.upper(a,cmp,from,pivot,second_cut);
		len11 = first_cut - from;
	}
	haxe_ds_ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
	new_mid = first_cut + len22;
	haxe_ds_ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
	haxe_ds_ArraySort.doMerge(a,cmp,new_mid,second_cut,to,len1 - len11,len2 - len22);
};
haxe_ds_ArraySort.rotate = function(a,cmp,from,mid,to) {
	var n;
	if(from == mid || mid == to) return;
	n = haxe_ds_ArraySort.gcd(to - from,mid - from);
	while(n-- != 0) {
		var val = a[from + n];
		var shift = mid - from;
		var p1 = from + n;
		var p2 = from + n + shift;
		while(p2 != from + n) {
			a[p1] = a[p2];
			p1 = p2;
			if(to - p2 > shift) p2 += shift; else p2 = from + (shift - (to - p2));
		}
		a[p1] = val;
	}
};
haxe_ds_ArraySort.gcd = function(m,n) {
	while(n != 0) {
		var t = m % n;
		m = n;
		n = t;
	}
	return m;
};
haxe_ds_ArraySort.upper = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[val],a[mid]) < 0) len = half; else {
			from = mid + 1;
			len = len - half - 1;
		}
	}
	return from;
};
haxe_ds_ArraySort.lower = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[mid],a[val]) < 0) {
			from = mid + 1;
			len = len - half - 1;
		} else len = half;
	}
	return from;
};
haxe_ds_ArraySort.swap = function(a,i,j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	get: function(key) {
		return this.h[key];
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_macro_Constant = { __ename__ : true, __constructs__ : ["CInt","CFloat","CString","CIdent","CRegexp"] };
haxe_macro_Constant.CInt = function(v) { var $x = ["CInt",0,v]; $x.__enum__ = haxe_macro_Constant; $x.toString = $estr; return $x; };
haxe_macro_Constant.CFloat = function(f) { var $x = ["CFloat",1,f]; $x.__enum__ = haxe_macro_Constant; $x.toString = $estr; return $x; };
haxe_macro_Constant.CString = function(s) { var $x = ["CString",2,s]; $x.__enum__ = haxe_macro_Constant; $x.toString = $estr; return $x; };
haxe_macro_Constant.CIdent = function(s) { var $x = ["CIdent",3,s]; $x.__enum__ = haxe_macro_Constant; $x.toString = $estr; return $x; };
haxe_macro_Constant.CRegexp = function(r,opt) { var $x = ["CRegexp",4,r,opt]; $x.__enum__ = haxe_macro_Constant; $x.toString = $estr; return $x; };
var haxe_macro_Binop = { __ename__ : true, __constructs__ : ["OpAdd","OpMult","OpDiv","OpSub","OpAssign","OpEq","OpNotEq","OpGt","OpGte","OpLt","OpLte","OpAnd","OpOr","OpXor","OpBoolAnd","OpBoolOr","OpShl","OpShr","OpUShr","OpMod","OpAssignOp","OpInterval","OpArrow"] };
haxe_macro_Binop.OpAdd = ["OpAdd",0];
haxe_macro_Binop.OpAdd.toString = $estr;
haxe_macro_Binop.OpAdd.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpMult = ["OpMult",1];
haxe_macro_Binop.OpMult.toString = $estr;
haxe_macro_Binop.OpMult.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpDiv = ["OpDiv",2];
haxe_macro_Binop.OpDiv.toString = $estr;
haxe_macro_Binop.OpDiv.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpSub = ["OpSub",3];
haxe_macro_Binop.OpSub.toString = $estr;
haxe_macro_Binop.OpSub.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpAssign = ["OpAssign",4];
haxe_macro_Binop.OpAssign.toString = $estr;
haxe_macro_Binop.OpAssign.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpEq = ["OpEq",5];
haxe_macro_Binop.OpEq.toString = $estr;
haxe_macro_Binop.OpEq.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpNotEq = ["OpNotEq",6];
haxe_macro_Binop.OpNotEq.toString = $estr;
haxe_macro_Binop.OpNotEq.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpGt = ["OpGt",7];
haxe_macro_Binop.OpGt.toString = $estr;
haxe_macro_Binop.OpGt.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpGte = ["OpGte",8];
haxe_macro_Binop.OpGte.toString = $estr;
haxe_macro_Binop.OpGte.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpLt = ["OpLt",9];
haxe_macro_Binop.OpLt.toString = $estr;
haxe_macro_Binop.OpLt.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpLte = ["OpLte",10];
haxe_macro_Binop.OpLte.toString = $estr;
haxe_macro_Binop.OpLte.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpAnd = ["OpAnd",11];
haxe_macro_Binop.OpAnd.toString = $estr;
haxe_macro_Binop.OpAnd.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpOr = ["OpOr",12];
haxe_macro_Binop.OpOr.toString = $estr;
haxe_macro_Binop.OpOr.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpXor = ["OpXor",13];
haxe_macro_Binop.OpXor.toString = $estr;
haxe_macro_Binop.OpXor.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpBoolAnd = ["OpBoolAnd",14];
haxe_macro_Binop.OpBoolAnd.toString = $estr;
haxe_macro_Binop.OpBoolAnd.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpBoolOr = ["OpBoolOr",15];
haxe_macro_Binop.OpBoolOr.toString = $estr;
haxe_macro_Binop.OpBoolOr.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpShl = ["OpShl",16];
haxe_macro_Binop.OpShl.toString = $estr;
haxe_macro_Binop.OpShl.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpShr = ["OpShr",17];
haxe_macro_Binop.OpShr.toString = $estr;
haxe_macro_Binop.OpShr.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpUShr = ["OpUShr",18];
haxe_macro_Binop.OpUShr.toString = $estr;
haxe_macro_Binop.OpUShr.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpMod = ["OpMod",19];
haxe_macro_Binop.OpMod.toString = $estr;
haxe_macro_Binop.OpMod.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpAssignOp = function(op) { var $x = ["OpAssignOp",20,op]; $x.__enum__ = haxe_macro_Binop; $x.toString = $estr; return $x; };
haxe_macro_Binop.OpInterval = ["OpInterval",21];
haxe_macro_Binop.OpInterval.toString = $estr;
haxe_macro_Binop.OpInterval.__enum__ = haxe_macro_Binop;
haxe_macro_Binop.OpArrow = ["OpArrow",22];
haxe_macro_Binop.OpArrow.toString = $estr;
haxe_macro_Binop.OpArrow.__enum__ = haxe_macro_Binop;
var haxe_macro_Unop = { __ename__ : true, __constructs__ : ["OpIncrement","OpDecrement","OpNot","OpNeg","OpNegBits"] };
haxe_macro_Unop.OpIncrement = ["OpIncrement",0];
haxe_macro_Unop.OpIncrement.toString = $estr;
haxe_macro_Unop.OpIncrement.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.OpDecrement = ["OpDecrement",1];
haxe_macro_Unop.OpDecrement.toString = $estr;
haxe_macro_Unop.OpDecrement.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.OpNot = ["OpNot",2];
haxe_macro_Unop.OpNot.toString = $estr;
haxe_macro_Unop.OpNot.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.OpNeg = ["OpNeg",3];
haxe_macro_Unop.OpNeg.toString = $estr;
haxe_macro_Unop.OpNeg.__enum__ = haxe_macro_Unop;
haxe_macro_Unop.OpNegBits = ["OpNegBits",4];
haxe_macro_Unop.OpNegBits.toString = $estr;
haxe_macro_Unop.OpNegBits.__enum__ = haxe_macro_Unop;
var haxe_macro_ExprDef = { __ename__ : true, __constructs__ : ["EConst","EArray","EBinop","EField","EParenthesis","EObjectDecl","EArrayDecl","ECall","ENew","EUnop","EVars","EFunction","EBlock","EFor","EIn","EIf","EWhile","ESwitch","ETry","EReturn","EBreak","EContinue","EUntyped","EThrow","ECast","EDisplay","EDisplayNew","ETernary","ECheckType","EMeta"] };
haxe_macro_ExprDef.EConst = function(c) { var $x = ["EConst",0,c]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EArray = function(e1,e2) { var $x = ["EArray",1,e1,e2]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EBinop = function(op,e1,e2) { var $x = ["EBinop",2,op,e1,e2]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EField = function(e,field) { var $x = ["EField",3,e,field]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EParenthesis = function(e) { var $x = ["EParenthesis",4,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EObjectDecl = function(fields) { var $x = ["EObjectDecl",5,fields]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EArrayDecl = function(values) { var $x = ["EArrayDecl",6,values]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ECall = function(e,params) { var $x = ["ECall",7,e,params]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ENew = function(t,params) { var $x = ["ENew",8,t,params]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EUnop = function(op,postFix,e) { var $x = ["EUnop",9,op,postFix,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EVars = function(vars) { var $x = ["EVars",10,vars]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EFunction = function(name,f) { var $x = ["EFunction",11,name,f]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EBlock = function(exprs) { var $x = ["EBlock",12,exprs]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EFor = function(it,expr) { var $x = ["EFor",13,it,expr]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EIn = function(e1,e2) { var $x = ["EIn",14,e1,e2]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EIf = function(econd,eif,eelse) { var $x = ["EIf",15,econd,eif,eelse]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EWhile = function(econd,e,normalWhile) { var $x = ["EWhile",16,econd,e,normalWhile]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ESwitch = function(e,cases,edef) { var $x = ["ESwitch",17,e,cases,edef]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ETry = function(e,catches) { var $x = ["ETry",18,e,catches]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EReturn = function(e) { var $x = ["EReturn",19,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EBreak = ["EBreak",20];
haxe_macro_ExprDef.EBreak.toString = $estr;
haxe_macro_ExprDef.EBreak.__enum__ = haxe_macro_ExprDef;
haxe_macro_ExprDef.EContinue = ["EContinue",21];
haxe_macro_ExprDef.EContinue.toString = $estr;
haxe_macro_ExprDef.EContinue.__enum__ = haxe_macro_ExprDef;
haxe_macro_ExprDef.EUntyped = function(e) { var $x = ["EUntyped",22,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EThrow = function(e) { var $x = ["EThrow",23,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ECast = function(e,t) { var $x = ["ECast",24,e,t]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EDisplay = function(e,isCall) { var $x = ["EDisplay",25,e,isCall]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EDisplayNew = function(t) { var $x = ["EDisplayNew",26,t]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ETernary = function(econd,eif,eelse) { var $x = ["ETernary",27,econd,eif,eelse]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.ECheckType = function(e,t) { var $x = ["ECheckType",28,e,t]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
haxe_macro_ExprDef.EMeta = function(s,e) { var $x = ["EMeta",29,s,e]; $x.__enum__ = haxe_macro_ExprDef; $x.toString = $estr; return $x; };
var haxe_macro_ComplexType = { __ename__ : true, __constructs__ : ["TPath","TFunction","TAnonymous","TParent","TExtend","TOptional"] };
haxe_macro_ComplexType.TPath = function(p) { var $x = ["TPath",0,p]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TFunction = function(args,ret) { var $x = ["TFunction",1,args,ret]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TAnonymous = function(fields) { var $x = ["TAnonymous",2,fields]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TParent = function(t) { var $x = ["TParent",3,t]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TExtend = function(p,fields) { var $x = ["TExtend",4,p,fields]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TOptional = function(t) { var $x = ["TOptional",5,t]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
var haxe_rtti_Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe_rtti_Meta;
haxe_rtti_Meta.__name__ = ["haxe","rtti","Meta"];
haxe_rtti_Meta.getType = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.obj == null) return { }; else return meta.obj;
};
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
haxe_rtti_Meta.getFields = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.fields == null) return { }; else return meta.fields;
};
var haxe_xml_Parser = function() { };
$hxClasses["haxe.xml.Parser"] = haxe_xml_Parser;
haxe_xml_Parser.__name__ = ["haxe","xml","Parser"];
haxe_xml_Parser.parse = function(str,strict) {
	if(strict == null) strict = false;
	var doc = Xml.createDocument();
	haxe_xml_Parser.doParse(str,strict,0,doc);
	return doc;
};
haxe_xml_Parser.doParse = function(str,strict,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	var escapeNext = 1;
	var attrValQuote = -1;
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				buf.addSub(str,start,p - start);
				var child = Xml.createPCData(buf.b);
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw new js__$Boot_HaxeError("Expected <![CDATA[");
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw new js__$Boot_HaxeError("Expected <!DOCTYPE");
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw new js__$Boot_HaxeError("Expected <!--"); else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw new js__$Boot_HaxeError("Expected node name");
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw new js__$Boot_HaxeError("Expected node name");
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				nsubs++;
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				break;
			case 62:
				state = 9;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw new js__$Boot_HaxeError("Expected attribute name");
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw new js__$Boot_HaxeError("Duplicate attribute");
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected =");
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				buf = new StringBuf();
				state = 8;
				start = p + 1;
				attrValQuote = c;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected \"");
			}
			break;
		case 8:
			switch(c) {
			case 38:
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 8;
				start = p + 1;
				break;
			case 62:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val = buf.b;
					buf = new StringBuf();
					xml.set(aname,val);
					state = 0;
					next = 4;
				}
				break;
			case 60:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val1 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val1);
					state = 0;
					next = 4;
				}
				break;
			default:
				if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val2 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val2);
					state = 0;
					next = 4;
				}
			}
			break;
		case 9:
			p = haxe_xml_Parser.doParse(str,strict,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw new js__$Boot_HaxeError("Expected node name");
				var v = HxOverrides.substr(str,start,p - start);
				if(v != (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + parent.nodeType);
					$r = parent.nodeName;
					return $r;
				}(this))) throw new js__$Boot_HaxeError("Expected </" + (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw "Bad node type, expected Element but found " + parent.nodeType;
					$r = parent.nodeName;
					return $r;
				}(this)) + ">");
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				var xml1 = Xml.createComment(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				var xml2 = Xml.createDocType(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml2);
				nsubs++;
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				var xml3 = Xml.createProcessingInstruction(str1);
				parent.addChild(xml3);
				nsubs++;
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var c1;
					if(s.charCodeAt(1) == 120) c1 = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else c1 = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += String.fromCharCode(c1);
				} else if(!haxe_xml_Parser.escapes.exists(s)) {
					if(strict) throw new js__$Boot_HaxeError("Undefined entity: " + s);
					buf.b += Std.string("&" + s + ";");
				} else buf.add(haxe_xml_Parser.escapes.get(s));
				start = p + 1;
				state = escapeNext;
			} else if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45) && c != 35) {
				if(strict) throw new js__$Boot_HaxeError("Invalid character in entity: " + String.fromCharCode(c));
				buf.b += "&";
				buf.addSub(str,start,p - start);
				p--;
				start = p + 1;
				state = escapeNext;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) {
			buf.addSub(str,start,p - start);
			var xml4 = Xml.createPCData(buf.b);
			parent.addChild(xml4);
			nsubs++;
		}
		return p;
	}
	if(!strict && state == 18 && escapeNext == 13) {
		buf.b += "&";
		buf.addSub(str,start,p - start);
		var xml5 = Xml.createPCData(buf.b);
		parent.addChild(xml5);
		nsubs++;
		return p;
	}
	throw new js__$Boot_HaxeError("Unexpected end");
};
var hex_collection_IHashMap = function() { };
$hxClasses["hex.collection.IHashMap"] = hex_collection_IHashMap;
hex_collection_IHashMap.__name__ = ["hex","collection","IHashMap"];
hex_collection_IHashMap.prototype = {
	__class__: hex_collection_IHashMap
};
var hex_collection_HashMap = function() {
	this._init();
};
$hxClasses["hex.collection.HashMap"] = hex_collection_HashMap;
hex_collection_HashMap.__name__ = ["hex","collection","HashMap"];
hex_collection_HashMap.__interfaces__ = [hex_collection_IHashMap];
hex_collection_HashMap.prototype = {
	_init: function() {
		this._keys = new haxe_ds_StringMap();
		this._values = new haxe_ds_StringMap();
		this._size = 0;
	}
	,clear: function() {
		this._init();
	}
	,containsKey: function(key) {
		if(key != null) {
			var key1 = this._getName(key);
			return this._keys.exists(key1);
		} else throw new js__$Boot_HaxeError(new hex_error_NullPointerException(Std.string(this) + ".containsKey() failed. key can't be null",{ fileName : "HashMap.hx", lineNumber : 57, className : "hex.collection.HashMap", methodName : "containsKey"}));
	}
	,containsValue: function(value) {
		if(value != null) {
			var key = this._getName(value);
			return this._values.exists(key);
		} else throw new js__$Boot_HaxeError(new hex_error_NullPointerException(Std.string(this) + ".containsValue() failed. value can't be null",{ fileName : "HashMap.hx", lineNumber : 80, className : "hex.collection.HashMap", methodName : "containsValue"}));
	}
	,get: function(key) {
		if(key != null) {
			var key1 = this._getName(key);
			return this._keys.get(key1);
		} else throw new js__$Boot_HaxeError(new hex_error_NullPointerException(Std.string(this) + ".get() failed. key can't be null",{ fileName : "HashMap.hx", lineNumber : 112, className : "hex.collection.HashMap", methodName : "get"}));
	}
	,isEmpty: function() {
		return this._size == 0;
	}
	,put: function(key,value) {
		var oldValue = null;
		if(key == null) throw new js__$Boot_HaxeError(new hex_error_NullPointerException(Std.string(this) + ".put() failed. key can't be null",{ fileName : "HashMap.hx", lineNumber : 147, className : "hex.collection.HashMap", methodName : "put"})); else if(value == null) throw new js__$Boot_HaxeError(new hex_error_NullPointerException(Std.string(this) + ".put() failed. value can't be null",{ fileName : "HashMap.hx", lineNumber : 151, className : "hex.collection.HashMap", methodName : "put"})); else {
			if(this.containsKey(key)) oldValue = this.remove(key);
			this._size++;
			var key1 = this._getName(key);
			this._keys.set(key1,value);
			var key2 = this._getName(value);
			this._values.set(key2,key);
			return oldValue;
		}
	}
	,_getName: function(o) {
		var s;
		if(typeof(o) == "string") s = "_S" + Std.string(o); else if(typeof(o) == "boolean") s = "_B" + Std.string(o); else if(typeof(o) == "number" || ((o | 0) === o)) s = "_N" + Std.string(o); else s = "_O" + hex_core_HashCodeFactory.getKey(o);
		return s;
	}
	,remove: function(key) {
		if(key != null) {
			var sKID = this._getName(key);
			if(this._keys.exists(sKID)) {
				var sVID = this._getName(this._keys.get(sKID));
				var value = this._keys.get(sKID);
				this._values.remove(sVID);
				this._keys.remove(sKID);
				this._size--;
				return value;
			} else return null;
		} else throw new js__$Boot_HaxeError(new hex_error_NullPointerException(Std.string(this) + ".remove() failed. key can't be null",{ fileName : "HashMap.hx", lineNumber : 236, className : "hex.collection.HashMap", methodName : "remove"}));
	}
	,size: function() {
		return this._size;
	}
	,getKeys: function() {
		var a = [];
		var it = this._values.iterator();
		while(it.hasNext()) a.push(it.next());
		return a;
	}
	,getValues: function() {
		var a = [];
		var it = this._keys.iterator();
		while(it.hasNext()) a.push(it.next());
		return a;
	}
	,__class__: hex_collection_HashMap
};
var hex_collection_ILocator = function() { };
$hxClasses["hex.collection.ILocator"] = hex_collection_ILocator;
hex_collection_ILocator.__name__ = ["hex","collection","ILocator"];
hex_collection_ILocator.prototype = {
	__class__: hex_collection_ILocator
};
var hex_collection_ILocatorListener = function() { };
$hxClasses["hex.collection.ILocatorListener"] = hex_collection_ILocatorListener;
hex_collection_ILocatorListener.__name__ = ["hex","collection","ILocatorListener"];
hex_collection_ILocatorListener.prototype = {
	__class__: hex_collection_ILocatorListener
};
var hex_collection_Locator = function() {
	this._map = new hex_collection_HashMap();
	this._dispatcher = new hex_event_Dispatcher();
};
$hxClasses["hex.collection.Locator"] = hex_collection_Locator;
hex_collection_Locator.__name__ = ["hex","collection","Locator"];
hex_collection_Locator.__interfaces__ = [hex_collection_ILocator];
hex_collection_Locator.prototype = {
	clear: function() {
		this._map.clear();
	}
	,release: function() {
		this.clear();
		this._map = null;
		if(this._dispatcher != null) {
			this._dispatcher.removeAllListeners();
			this._dispatcher = null;
		}
	}
	,isEmpty: function() {
		return this._map.size() == 0;
	}
	,keys: function() {
		return this._map.getKeys();
	}
	,values: function() {
		return this._map.getValues();
	}
	,isRegisteredWithKey: function(key) {
		return this._map.containsKey(key);
	}
	,locate: function(key) {
		if(this.isRegisteredWithKey(key)) return this._map.get(key); else throw new js__$Boot_HaxeError(new hex_error_NoSuchElementException("Can't find item with '" + Std.string(key) + "' key in " + this.toString(),{ fileName : "Locator.hx", lineNumber : 69, className : "hex.collection.Locator", methodName : "locate"}));
	}
	,add: function(m) {
		var iterator = m.keys();
		while(iterator.hasNext()) {
			var key = iterator.next();
			this.register(key,m.h[key]);
		}
	}
	,register: function(key,element) {
		if(this._map.containsKey(key)) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("item is already registered with '" + Std.string(key) + "' key in " + this.toString(),{ fileName : "Locator.hx", lineNumber : 88, className : "hex.collection.Locator", methodName : "register"})); else {
			this._map.put(key,element);
			this._dispatchRegisterEvent(key,element);
			return true;
		}
	}
	,unregister: function(key) {
		if(this.isRegisteredWithKey(key)) {
			this._map.remove(key);
			this._dispatchUnregisterEvent(key);
			return true;
		} else return false;
	}
	,addListener: function(listener) {
		return this._dispatcher.addListener(listener);
	}
	,removeListener: function(listener) {
		return this._dispatcher.removeListener(listener);
	}
	,toString: function() {
		return hex_log_Stringifier.stringify(this);
	}
	,_dispatchRegisterEvent: function(key,element) {
	}
	,_dispatchUnregisterEvent: function(key) {
	}
	,__class__: hex_collection_Locator
};
var hex_collection_LocatorMessage = function() {
};
$hxClasses["hex.collection.LocatorMessage"] = hex_collection_LocatorMessage;
hex_collection_LocatorMessage.__name__ = ["hex","collection","LocatorMessage"];
hex_collection_LocatorMessage.prototype = {
	__class__: hex_collection_LocatorMessage
};
var hex_compiler_CompileTimeFastEval = function() {
};
$hxClasses["hex.compiler.CompileTimeFastEval"] = hex_compiler_CompileTimeFastEval;
hex_compiler_CompileTimeFastEval.__name__ = ["hex","compiler","CompileTimeFastEval"];
hex_compiler_CompileTimeFastEval.fromTarget = function(target,toEval,coreFactory) {
	var members = toEval.split(".");
	var result;
	while(members.length > 0) {
		var member = members.shift();
		result = Reflect.field(target,member);
		if(result == null) {
		}
		target = result;
	}
	return target;
};
hex_compiler_CompileTimeFastEval.prototype = {
	__class__: hex_compiler_CompileTimeFastEval
};
var hex_ioc_assembler_IApplicationAssembler = function() { };
$hxClasses["hex.ioc.assembler.IApplicationAssembler"] = hex_ioc_assembler_IApplicationAssembler;
hex_ioc_assembler_IApplicationAssembler.__name__ = ["hex","ioc","assembler","IApplicationAssembler"];
hex_ioc_assembler_IApplicationAssembler.prototype = {
	__class__: hex_ioc_assembler_IApplicationAssembler
};
var hex_compiler_assembler_CompileTimeApplicationAssembler = function() {
	this._strictMode = true;
	this._conditionalProperties = new haxe_ds_StringMap();
	this._mContextFactories = new haxe_ds_ObjectMap();
	this._mApplicationContext = new haxe_ds_StringMap();
};
$hxClasses["hex.compiler.assembler.CompileTimeApplicationAssembler"] = hex_compiler_assembler_CompileTimeApplicationAssembler;
hex_compiler_assembler_CompileTimeApplicationAssembler.__name__ = ["hex","compiler","assembler","CompileTimeApplicationAssembler"];
hex_compiler_assembler_CompileTimeApplicationAssembler.__interfaces__ = [hex_ioc_assembler_IApplicationAssembler];
hex_compiler_assembler_CompileTimeApplicationAssembler._deserializeArguments = function(ownerID,args) {
	var length = args.length;
	var index;
	var obj;
	var _g = 0;
	while(_g < length) {
		var index1 = _g++;
		args[index1] = hex_compiler_assembler_CompileTimeApplicationAssembler._getConstructorVO(ownerID,args[index1]);
	}
};
hex_compiler_assembler_CompileTimeApplicationAssembler._getConstructorVO = function(ownerID,obj) {
	if(obj.method != null) return new hex_ioc_vo_ConstructorVO(null,"Function",[obj.method]); else if(obj.ref != null) return new hex_ioc_vo_ConstructorVO(null,"Instance",null,null,null,false,obj.ref); else if(obj.staticRef != null) return new hex_ioc_vo_ConstructorVO(null,"Instance",null,null,null,false,null,null,obj.staticRef); else {
		var type;
		if(obj.type != null) type = obj.type; else type = "String";
		return new hex_ioc_vo_ConstructorVO(ownerID,type,[obj.value]);
	}
};
hex_compiler_assembler_CompileTimeApplicationAssembler.prototype = {
	addExpression: function(expr) {
		this._expressions.push(expr);
	}
	,getMainExpression: function() {
		return { expr : haxe_macro_ExprDef.EBlock(this._expressions), pos : { file : "/Users/andras/Development/docler-ui/helloWorld/.haxelib/hexioc/0,4,0/src/hex/compiler/assembler/CompileTimeApplicationAssembler.hx", min : 1392, max : 1413}};
	}
	,getContextFactory: function(applicationContext) {
		return this._mContextFactories.h[applicationContext.__id__];
	}
	,release: function() {
	}
	,buildProperty: function(applicationContext,ownerID,name,value,type,ref,method,staticRef,ifList,ifNotList) {
		if(this.allowsIfList(ifList) && this.allowsIfNotList(ifNotList)) this.getContextFactory(applicationContext).registerPropertyVO(ownerID,new hex_ioc_vo_PropertyVO(ownerID,name,value,type,ref,method,staticRef));
	}
	,buildObject: function(applicationContext,ownerID,type,args,factory,singleton,injectInto,mapType,staticRef,ifList,ifNotList) {
		if(injectInto == null) injectInto = false;
		if(this.allowsIfList(ifList) && this.allowsIfNotList(ifNotList)) {
			this._registerID(applicationContext,ownerID);
			var constructorVO = new hex_ioc_vo_ConstructorVO(ownerID,type,args,factory,singleton,injectInto,null,mapType,staticRef);
			this.getContextFactory(applicationContext).registerConstructorVO(ownerID,constructorVO);
		}
	}
	,buildMethodCall: function(applicationContext,ownerID,methodCallName,args,ifList,ifNotList) {
		if(this.allowsIfList(ifList) && this.allowsIfNotList(ifNotList)) this.getContextFactory(applicationContext).registerMethodCallVO(new hex_ioc_vo_MethodCallVO(ownerID,methodCallName,args));
	}
	,buildDomainListener: function(applicationContext,ownerID,listenedDomainName,args,ifList,ifNotList) {
		if(this.allowsIfList(ifList) && this.allowsIfNotList(ifNotList)) this.getContextFactory(applicationContext).registerDomainListenerVO(new hex_ioc_vo_DomainListenerVO(ownerID,listenedDomainName,args));
	}
	,configureStateTransition: function(applicationContext,ID,staticReference,instanceReference,enterList,exitList,ifList,ifNotList) {
		if(this.allowsIfList(ifList) && this.allowsIfNotList(ifNotList)) {
			this._registerID(applicationContext,ID);
			var stateTransition = new hex_ioc_vo_StateTransitionVO(ID,staticReference,instanceReference,enterList,exitList);
			this.getContextFactory(applicationContext).registerStateTransitionVO(ID,stateTransition);
		}
	}
	,buildEverything: function() {
		var itFactory = this._mContextFactories.iterator();
		var builderFactories = [];
		while(itFactory.hasNext()) builderFactories.push(itFactory.next());
		var itFactory1 = this._mContextFactories.iterator();
		while(itFactory1.hasNext()) itFactory1.next().buildAllStateTransitions();
		var applicationContexts = [];
		var itContext = this._mApplicationContext.iterator();
		while(itContext.hasNext()) applicationContexts.push(itContext.next());
		itFactory1 = this._mContextFactories.iterator();
		while(itFactory1.hasNext()) itFactory1.next().dispatchAssemblingStart();
		var len = builderFactories.length;
		var i;
		var _g = 0;
		while(_g < len) {
			var i1 = _g++;
			builderFactories[i1].buildAllObjects();
		}
		var _g1 = 0;
		while(_g1 < len) {
			var i2 = _g1++;
			builderFactories[i2].assignAllDomainListeners();
		}
		var _g2 = 0;
		while(_g2 < len) {
			var i3 = _g2++;
			builderFactories[i3].callAllMethods();
		}
		var _g3 = 0;
		while(_g3 < len) {
			var i4 = _g3++;
			builderFactories[i4].callModuleInitialisation();
		}
		itFactory1 = this._mContextFactories.iterator();
		while(itFactory1.hasNext()) itFactory1.next().dispatchAssemblingEnd();
	}
	,getApplicationContext: function(applicationContextName,applicationContextClass) {
		var applicationContext;
		if(this._mApplicationContext.exists(applicationContextName)) applicationContext = this._mApplicationContext.get(applicationContextName); else {
			var builderFactory = new hex_compiler_core_CompileTimeContextFactory(this._expressions,applicationContextName,applicationContextClass);
			applicationContext = builderFactory.getApplicationContext();
			this._mApplicationContext.set(applicationContextName,applicationContext);
			this._mContextFactories.set(applicationContext,builderFactory);
		}
		return applicationContext;
	}
	,setStrictMode: function(b) {
		this._strictMode = b;
	}
	,isInStrictMode: function() {
		return this._strictMode;
	}
	,addConditionalProperty: function(conditionalProperties) {
		var i = conditionalProperties.keys();
		var key;
		while(i.hasNext()) {
			key = i.next();
			if(!this._conditionalProperties.exists(key)) {
				var value;
				value = __map_reserved[key] != null?conditionalProperties.getReserved(key):conditionalProperties.h[key];
				this._conditionalProperties.set(key,value);
			} else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("addConditionalcontext fails with key'" + key + "', this key was already assigned",{ fileName : "CompileTimeApplicationAssembler.hx", lineNumber : 254, className : "hex.compiler.assembler.CompileTimeApplicationAssembler", methodName : "addConditionalProperty"}));
		}
	}
	,allowsIfList: function(ifList) {
		if(ifList != null) {
			var _g = 0;
			while(_g < ifList.length) {
				var ifItem = ifList[_g];
				++_g;
				if(this._conditionalProperties.exists(ifItem)) {
					if(this._conditionalProperties.get(ifItem)) return true;
				} else if(this._strictMode) throw new js__$Boot_HaxeError(new hex_ioc_error_BuildingException("'" + ifItem + "' was not found in application assembler",{ fileName : "CompileTimeApplicationAssembler.hx", lineNumber : 274, className : "hex.compiler.assembler.CompileTimeApplicationAssembler", methodName : "allowsIfList"}));
			}
		} else return true;
		return false;
	}
	,allowsIfNotList: function(ifNotList) {
		if(ifNotList != null) {
			var _g = 0;
			while(_g < ifNotList.length) {
				var ifNotItem = ifNotList[_g];
				++_g;
				if(this._conditionalProperties.exists(ifNotItem)) {
					if(this._conditionalProperties.get(ifNotItem)) return false;
				} else if(this._strictMode) throw new js__$Boot_HaxeError(new hex_ioc_error_BuildingException("'" + ifNotItem + "' was not found in application assembler",{ fileName : "CompileTimeApplicationAssembler.hx", lineNumber : 301, className : "hex.compiler.assembler.CompileTimeApplicationAssembler", methodName : "allowsIfNotList"}));
			}
		}
		return true;
	}
	,_registerID: function(applicationContext,ID) {
		return this.getContextFactory(applicationContext).registerID(ID);
	}
	,__class__: hex_compiler_assembler_CompileTimeApplicationAssembler
};
var hex_ioc_core_IContextFactory = function() { };
$hxClasses["hex.ioc.core.IContextFactory"] = hex_ioc_core_IContextFactory;
hex_ioc_core_IContextFactory.__name__ = ["hex","ioc","core","IContextFactory"];
hex_ioc_core_IContextFactory.prototype = {
	__class__: hex_ioc_core_IContextFactory
};
var hex_compiler_core_CompileTimeContextFactory = function(expressions,applicationContextName,applicationContextClass) {
	this._expressions = expressions;
	this._coreFactory = new hex_compiler_core_CompileTimeCoreFactory(this._expressions);
	if(applicationContextClass != null) this._applicationContext = new hex_ioc_assembler_AbstractApplicationContext(this._coreFactory,applicationContextName); else this._applicationContext = new hex_ioc_assembler_AbstractApplicationContext(this._coreFactory,applicationContextName);
	this._init();
};
$hxClasses["hex.compiler.core.CompileTimeContextFactory"] = hex_compiler_core_CompileTimeContextFactory;
hex_compiler_core_CompileTimeContextFactory.__name__ = ["hex","compiler","core","CompileTimeContextFactory"];
hex_compiler_core_CompileTimeContextFactory.__interfaces__ = [hex_collection_ILocatorListener,hex_ioc_core_IContextFactory];
hex_compiler_core_CompileTimeContextFactory.prototype = {
	dispatchAssemblingStart: function() {
	}
	,dispatchAssemblingEnd: function() {
	}
	,registerID: function(id) {
		return this._IDExpert.register(id);
	}
	,registerStateTransitionVO: function(id,stateTransitionVO) {
		this._stateTransitionVOLocator.register(id,stateTransitionVO);
	}
	,buildStateTransition: function(key) {
	}
	,buildAllStateTransitions: function() {
		var keys = this._stateTransitionVOLocator.keys();
		var _g = 0;
		while(_g < keys.length) {
			var key = keys[_g];
			++_g;
			this.buildStateTransition(key);
		}
	}
	,registerPropertyVO: function(id,propertyVO) {
		if(this._propertyVOLocator.isRegisteredWithKey(id)) this._propertyVOLocator.locate(id).push(propertyVO); else this._propertyVOLocator.register(id,[propertyVO]);
	}
	,_getPropertyValue: function(property,id) {
		var value = null;
		var propertyName = property.name;
		if(property.method != null) {
		} else if(property.ref != null) {
		} else if(property.staticRef != null) {
		} else {
		}
		return value;
	}
	,_setPropertyValue: function(property,target,id) {
		var propertyName = property.name;
		if(propertyName.indexOf(".") == -1) {
			var value = this._getPropertyValue(property,id);
			Reflect.setProperty(target,propertyName,value);
		} else {
			var props = propertyName.split(".");
			propertyName = props.pop();
			var target1 = this._coreFactory.fastEvalFromTarget(target,props.join("."));
			Reflect.setProperty(target1,propertyName,this._getPropertyValue(property,id));
		}
	}
	,onRegister: function(key,instance) {
		if(this._propertyVOLocator.isRegisteredWithKey(key)) {
			var properties = this._propertyVOLocator.locate(key);
			var _g = 0;
			while(_g < properties.length) {
				var p = properties[_g];
				++_g;
				this._setPropertyValue(p,instance,key);
			}
		}
	}
	,onUnregister: function(key) {
	}
	,handleEvent: function(e) {
	}
	,registerConstructorVO: function(id,constructorVO) {
		this._constructorVOLocator.register(id,constructorVO);
	}
	,buildObject: function(id) {
	}
	,buildAllObjects: function() {
		var keys = this._constructorVOLocator.keys();
		var _g = 0;
		while(_g < keys.length) {
			var key = keys[_g];
			++_g;
			this.buildObject(key);
		}
	}
	,registerDomainListenerVO: function(domainListenerVO) {
		this._domainListenerVOLocator.register("" + hex_core_HashCodeFactory.getKey(domainListenerVO),domainListenerVO);
	}
	,assignAllDomainListeners: function() {
		var listeners = this._domainListenerVOLocator.keys();
		var _g = 0;
		while(_g < listeners.length) {
			var key = listeners[_g];
			++_g;
			this.assignDomainListener(key);
		}
		this._domainListenerVOLocator.clear();
	}
	,assignDomainListener: function(id) {
		return false;
	}
	,registerMethodCallVO: function(methodCallVO) {
		var index = this._methodCallVOLocator.keys().length + 1;
		this._methodCallVOLocator.register("" + index,methodCallVO);
	}
	,callMethod: function(id) {
	}
	,callAllMethods: function() {
		var keyList = this._methodCallVOLocator.keys();
		var _g = 0;
		while(_g < keyList.length) {
			var key = keyList[_g];
			++_g;
			this.callMethod(key);
		}
		this._methodCallVOLocator.clear();
	}
	,callModuleInitialisation: function() {
		var modules = this._moduleLocator.values();
		var _g = 0;
		while(_g < modules.length) {
			var module = modules[_g];
			++_g;
			var module1 = { expr : haxe_macro_ExprDef.EConst(haxe_macro_Constant.CIdent(module.getDomain().getName())), pos : { file : "/Users/andras/Development/docler-ui/helloWorld/.haxelib/hexioc/0,4,0/src/hex/compiler/core/CompileTimeContextFactory.hx", min : 14007, max : 14039}};
			this._expressions.push({ expr : haxe_macro_ExprDef.EMeta({ name : ":mergeBlock", params : [], pos : { file : "/Users/andras/Development/docler-ui/helloWorld/.haxelib/hexioc/0,4,0/src/hex/compiler/core/CompileTimeContextFactory.hx", min : 14077, max : 14087}},{ expr : haxe_macro_ExprDef.EBlock([{ expr : haxe_macro_ExprDef.ECall({ expr : haxe_macro_ExprDef.EField(module1,"initialize"), pos : { file : "/Users/andras/Development/docler-ui/helloWorld/.haxelib/hexioc/0,4,0/src/hex/compiler/core/CompileTimeContextFactory.hx", min : 14090, max : 14108}},[]), pos : { file : "/Users/andras/Development/docler-ui/helloWorld/.haxelib/hexioc/0,4,0/src/hex/compiler/core/CompileTimeContextFactory.hx", min : 14090, max : 14110}}]), pos : { file : "/Users/andras/Development/docler-ui/helloWorld/.haxelib/hexioc/0,4,0/src/hex/compiler/core/CompileTimeContextFactory.hx", min : 14088, max : 14113}}), pos : { file : "/Users/andras/Development/docler-ui/helloWorld/.haxelib/hexioc/0,4,0/src/hex/compiler/core/CompileTimeContextFactory.hx", min : 14077, max : 14113}});
		}
		this._moduleLocator.clear();
	}
	,getApplicationContext: function() {
		return this._applicationContext;
	}
	,getCoreFactory: function() {
		return this._coreFactory;
	}
	,getAnnotationProvider: function() {
		return this._annotationProvider;
	}
	,getStateTransitionVOLocator: function() {
		return this._stateTransitionVOLocator;
	}
	,release: function() {
		this._coreFactory.removeListener(this);
		this._coreFactory.clear();
		this._constructorVOLocator.release();
		this._propertyVOLocator.release();
		this._methodCallVOLocator.release();
		this._domainListenerVOLocator.release();
		this._stateTransitionVOLocator.release();
		this._moduleLocator.release();
		this._factoryMap = new haxe_ds_StringMap();
		this._IDExpert.clear();
		this._observableLocator.release();
	}
	,_init: function() {
		this._factoryMap = new haxe_ds_StringMap();
		this._IDExpert = new hex_ioc_core_IDExpert();
		this._constructorVOLocator = new hex_ioc_locator_ConstructorVOLocator();
		this._propertyVOLocator = new hex_ioc_locator_PropertyVOLocator();
		this._methodCallVOLocator = new hex_ioc_locator_MethodCallVOLocator();
		this._domainListenerVOLocator = new hex_ioc_locator_DomainListenerVOLocator();
		this._stateTransitionVOLocator = new hex_ioc_locator_StateTransitionVOLocator(this);
		this._moduleLocator = new hex_ioc_locator_ModuleLocator(this);
		this._observableLocator = new hex_ioc_locator_ObservableLocator(this);
		this._coreFactory.addListener(this);
	}
	,__class__: hex_compiler_core_CompileTimeContextFactory
};
var hex_ioc_core_ICoreFactory = function() { };
$hxClasses["hex.ioc.core.ICoreFactory"] = hex_ioc_core_ICoreFactory;
hex_ioc_core_ICoreFactory.__name__ = ["hex","ioc","core","ICoreFactory"];
hex_ioc_core_ICoreFactory.__interfaces__ = [hex_collection_ILocator];
hex_ioc_core_ICoreFactory.prototype = {
	__class__: hex_ioc_core_ICoreFactory
};
var hex_compiler_core_CompileTimeCoreFactory = function(expressions) {
	this._expressions = expressions;
	this._dispatcher = new hex_event_Dispatcher();
	this._map = new haxe_ds_StringMap();
};
$hxClasses["hex.compiler.core.CompileTimeCoreFactory"] = hex_compiler_core_CompileTimeCoreFactory;
hex_compiler_core_CompileTimeCoreFactory.__name__ = ["hex","compiler","core","CompileTimeCoreFactory"];
hex_compiler_core_CompileTimeCoreFactory.__interfaces__ = [hex_ioc_core_ICoreFactory];
hex_compiler_core_CompileTimeCoreFactory.setFastEvalMethod = function(method) {
	hex_compiler_core_CompileTimeCoreFactory._fastEvalMethod = method;
};
hex_compiler_core_CompileTimeCoreFactory.prototype = {
	getInjector: function() {
		return null;
	}
	,getAnnotationProvider: function() {
		return null;
	}
	,clear: function() {
		this._map = new haxe_ds_StringMap();
	}
	,keys: function() {
		var a = [];
		var it = this._map.keys();
		while(it.hasNext()) a.push(it.next());
		return a;
	}
	,values: function() {
		var a = [];
		var it = this._map.iterator();
		while(it.hasNext()) a.push(it.next());
		return a;
	}
	,isRegisteredWithKey: function(key) {
		var key1 = key;
		return this._map.exists(key1);
	}
	,isInstanceRegistered: function(instance) {
		return (function($this) {
			var $r;
			var _this = $this.values();
			var x = instance;
			$r = HxOverrides.indexOf(_this,x,0);
			return $r;
		}(this)) != -1;
	}
	,locate: function(key) {
		if(this._map.exists(key)) return this._map.get(key); else if(key.indexOf(".") != -1) {
			var props = key.split(".");
			var baseKey = props.shift();
			if(this._map.exists(baseKey)) {
				var target = this._map.get(baseKey);
				return this.fastEvalFromTarget(target,props.join("."));
			}
		}
		throw new js__$Boot_HaxeError(new hex_error_NoSuchElementException("Can't find item with '" + key + "' key in " + hex_log_Stringifier.stringify(this),{ fileName : "CompileTimeCoreFactory.hx", lineNumber : 96, className : "hex.compiler.core.CompileTimeCoreFactory", methodName : "locate"}));
	}
	,register: function(key,element) {
		if(!this._map.exists(key)) {
			var value = element;
			this._map.set(key,value);
			this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
			return true;
		} else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("register(" + key + ", " + Std.string(element) + ") fails, key is already registered.",{ fileName : "CompileTimeCoreFactory.hx", lineNumber : 109, className : "hex.compiler.core.CompileTimeCoreFactory", methodName : "register"}));
	}
	,unregisterWithKey: function(key) {
		if(this._map.exists(key)) {
			var instance = this._map.get(key);
			this._map.remove(key);
			this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
			return true;
		} else return false;
	}
	,unregister: function(instance) {
		var key = this.getKeyOfInstance(instance);
		if(key != null) return this.unregisterWithKey(key); else return false;
	}
	,getKeyOfInstance: function(instance) {
		var iterator = this._map.keys();
		while(iterator.hasNext()) {
			var key = iterator.next();
			if(this._map.get(key) == instance) return key;
		}
		return null;
	}
	,add: function(map) {
		var iterator = map.keys();
		while(iterator.hasNext()) {
			var key = iterator.next();
			try {
				this.register(key,__map_reserved[key] != null?map.getReserved(key):map.h[key]);
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				if( js_Boot.__instanceof(e,hex_error_IllegalArgumentException) ) {
					e.message = Std.string(this) + ".add() fails. " + e.message;
					throw new js__$Boot_HaxeError(e);
				} else throw(e);
			}
		}
	}
	,addListener: function(listener) {
		return this._dispatcher.addListener(listener);
	}
	,removeListener: function(listener) {
		return this._dispatcher.removeListener(listener);
	}
	,buildInstance: function(qualifiedClassName,args,factoryMethod,singletonAccess,instantiateUnmapped) {
		if(instantiateUnmapped == null) instantiateUnmapped = false;
		var classReference;
		try {
			classReference = hex_util_ClassUtil.getClassReference(qualifiedClassName);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			if( js_Boot.__instanceof(e,hex_error_IllegalArgumentException) ) {
				throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("'" + qualifiedClassName + "' class is not available in current domain",{ fileName : "CompileTimeCoreFactory.hx", lineNumber : 188, className : "hex.compiler.core.CompileTimeCoreFactory", methodName : "buildInstance"}));
			} else throw(e);
		}
		var obj = null;
		if(instantiateUnmapped) {
		} else if(factoryMethod != null) {
			if(singletonAccess != null) {
				var inst = null;
				var singletonCall = Reflect.field(classReference,singletonAccess);
				if(singletonCall != null) inst = singletonCall(); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(qualifiedClassName + "." + singletonAccess + "()' singleton access failed.",{ fileName : "CompileTimeCoreFactory.hx", lineNumber : 210, className : "hex.compiler.core.CompileTimeCoreFactory", methodName : "buildInstance"}));
				var methodReference = Reflect.field(inst,factoryMethod);
				if(methodReference != null) obj = Reflect.callMethod(inst,methodReference,args); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(qualifiedClassName + "." + singletonAccess + "()." + factoryMethod + "()' factory method call failed.",{ fileName : "CompileTimeCoreFactory.hx", lineNumber : 220, className : "hex.compiler.core.CompileTimeCoreFactory", methodName : "buildInstance"}));
			} else {
				var methodReference1 = Reflect.field(classReference,factoryMethod);
				if(methodReference1 != null) obj = Reflect.callMethod(classReference,methodReference1,args); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(qualifiedClassName + "." + factoryMethod + "()' factory method call failed.",{ fileName : "CompileTimeCoreFactory.hx", lineNumber : 233, className : "hex.compiler.core.CompileTimeCoreFactory", methodName : "buildInstance"}));
			}
		} else if(singletonAccess != null) {
			var singletonCall1 = Reflect.field(classReference,singletonAccess);
			if(singletonCall1 != null) obj = singletonCall1(); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(qualifiedClassName + "." + singletonAccess + "()' singleton call failed.",{ fileName : "CompileTimeCoreFactory.hx", lineNumber : 246, className : "hex.compiler.core.CompileTimeCoreFactory", methodName : "buildInstance"}));
		} else {
			try {
				obj = Type.createInstance(classReference,args != null?args:[]);
			} catch( e1 ) {
				if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
				throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("Instantiation of class '" + qualifiedClassName + "' failed with arguments: " + Std.string(args) + " : " + Std.string(e1),{ fileName : "CompileTimeCoreFactory.hx", lineNumber : 257, className : "hex.compiler.core.CompileTimeCoreFactory", methodName : "buildInstance"}));
			}
			if(js_Boot.__instanceof(obj,hex_core_IAnnotationParsable)) {
			}
			if(js_Boot.__instanceof(obj,hex_service_IService)) obj.createConfiguration();
		}
		return obj;
	}
	,fastEvalFromTarget: function(target,toEval) {
		return hex_compiler_core_CompileTimeCoreFactory._fastEvalMethod(target,toEval,this);
	}
	,__class__: hex_compiler_core_CompileTimeCoreFactory
};
var hex_compiler_factory_ArrayFactory = function() {
};
$hxClasses["hex.compiler.factory.ArrayFactory"] = hex_compiler_factory_ArrayFactory;
hex_compiler_factory_ArrayFactory.__name__ = ["hex","compiler","factory","ArrayFactory"];
hex_compiler_factory_ArrayFactory.prototype = {
	__class__: hex_compiler_factory_ArrayFactory
};
var hex_compiler_factory_BoolFactory = function() {
};
$hxClasses["hex.compiler.factory.BoolFactory"] = hex_compiler_factory_BoolFactory;
hex_compiler_factory_BoolFactory.__name__ = ["hex","compiler","factory","BoolFactory"];
hex_compiler_factory_BoolFactory.prototype = {
	__class__: hex_compiler_factory_BoolFactory
};
var hex_compiler_factory_ClassFactory = function() {
};
$hxClasses["hex.compiler.factory.ClassFactory"] = hex_compiler_factory_ClassFactory;
hex_compiler_factory_ClassFactory.__name__ = ["hex","compiler","factory","ClassFactory"];
hex_compiler_factory_ClassFactory.prototype = {
	__class__: hex_compiler_factory_ClassFactory
};
var hex_compiler_factory_ClassInstanceFactory = function() {
};
$hxClasses["hex.compiler.factory.ClassInstanceFactory"] = hex_compiler_factory_ClassInstanceFactory;
hex_compiler_factory_ClassInstanceFactory.__name__ = ["hex","compiler","factory","ClassInstanceFactory"];
hex_compiler_factory_ClassInstanceFactory.prototype = {
	__class__: hex_compiler_factory_ClassInstanceFactory
};
var hex_compiler_factory__$ClassInstanceFactory_EmptyModule = function(domainName) {
	this._domainName = domainName;
};
$hxClasses["hex.compiler.factory._ClassInstanceFactory.EmptyModule"] = hex_compiler_factory__$ClassInstanceFactory_EmptyModule;
hex_compiler_factory__$ClassInstanceFactory_EmptyModule.__name__ = ["hex","compiler","factory","_ClassInstanceFactory","EmptyModule"];
hex_compiler_factory__$ClassInstanceFactory_EmptyModule.__interfaces__ = [hex_module_IModule];
hex_compiler_factory__$ClassInstanceFactory_EmptyModule.prototype = {
	initialize: function() {
	}
	,get_isInitialized: function() {
		return false;
	}
	,release: function() {
	}
	,get_isReleased: function() {
		return false;
	}
	,dispatchPublicMessage: function(messageType,data) {
	}
	,addHandler: function(messageType,scope,callback) {
	}
	,removeHandler: function(messageType,scope,callback) {
	}
	,getDomain: function() {
		return hex_domain_DomainUtil.getDomain(this._domainName,hex_domain_Domain);
	}
	,getLogger: function() {
		return null;
	}
	,getInjector: function() {
		return null;
	}
	,__class__: hex_compiler_factory__$ClassInstanceFactory_EmptyModule
	,__properties__: {get_isReleased:"get_isReleased",get_isInitialized:"get_isInitialized"}
};
var hex_compiler_factory_DomainListenerFactory = function() {
};
$hxClasses["hex.compiler.factory.DomainListenerFactory"] = hex_compiler_factory_DomainListenerFactory;
hex_compiler_factory_DomainListenerFactory.__name__ = ["hex","compiler","factory","DomainListenerFactory"];
hex_compiler_factory_DomainListenerFactory.prototype = {
	__class__: hex_compiler_factory_DomainListenerFactory
};
var hex_compiler_factory_DynamicObjectFactory = function() {
};
$hxClasses["hex.compiler.factory.DynamicObjectFactory"] = hex_compiler_factory_DynamicObjectFactory;
hex_compiler_factory_DynamicObjectFactory.__name__ = ["hex","compiler","factory","DynamicObjectFactory"];
hex_compiler_factory_DynamicObjectFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	factoryVO.constructorVO.result = { };
	return null;
};
hex_compiler_factory_DynamicObjectFactory.prototype = {
	__class__: hex_compiler_factory_DynamicObjectFactory
};
var hex_compiler_factory_FloatFactory = function() {
};
$hxClasses["hex.compiler.factory.FloatFactory"] = hex_compiler_factory_FloatFactory;
hex_compiler_factory_FloatFactory.__name__ = ["hex","compiler","factory","FloatFactory"];
hex_compiler_factory_FloatFactory.prototype = {
	__class__: hex_compiler_factory_FloatFactory
};
var hex_compiler_factory_FunctionFactory = function() {
};
$hxClasses["hex.compiler.factory.FunctionFactory"] = hex_compiler_factory_FunctionFactory;
hex_compiler_factory_FunctionFactory.__name__ = ["hex","compiler","factory","FunctionFactory"];
hex_compiler_factory_FunctionFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	var method;
	var msg;
	var args = constructorVO["arguments"][0].split(".");
	var targetID = args[0];
	var path = args.slice(1).join(".");
	if(!factoryVO.coreFactory.isRegisteredWithKey(targetID)) factoryVO.contextFactory.buildObject(targetID);
	var target = factoryVO.coreFactory.locate(targetID);
	try {
		method = factoryVO.coreFactory.fastEvalFromTarget(target,path);
	} catch( error ) {
		if (error instanceof js__$Boot_HaxeError) error = error.val;
		msg = "FunctionFactory.build() failed on " + Std.string(target) + " with id '" + targetID + "'. ";
		msg += path + " method can't be found.";
		throw new js__$Boot_HaxeError(new hex_error_Exception(msg,{ fileName : "FunctionFactory.hx", lineNumber : 44, className : "hex.compiler.factory.FunctionFactory", methodName : "build"}));
	}
	constructorVO.result = method;
	return null;
};
hex_compiler_factory_FunctionFactory.prototype = {
	__class__: hex_compiler_factory_FunctionFactory
};
var hex_compiler_factory_HashMapFactory = function() {
};
$hxClasses["hex.compiler.factory.HashMapFactory"] = hex_compiler_factory_HashMapFactory;
hex_compiler_factory_HashMapFactory.__name__ = ["hex","compiler","factory","HashMapFactory"];
hex_compiler_factory_HashMapFactory.prototype = {
	__class__: hex_compiler_factory_HashMapFactory
};
var hex_compiler_factory_IntFactory = function() {
};
$hxClasses["hex.compiler.factory.IntFactory"] = hex_compiler_factory_IntFactory;
hex_compiler_factory_IntFactory.__name__ = ["hex","compiler","factory","IntFactory"];
hex_compiler_factory_IntFactory.prototype = {
	__class__: hex_compiler_factory_IntFactory
};
var hex_compiler_factory_MappingConfigurationFactory = function() {
};
$hxClasses["hex.compiler.factory.MappingConfigurationFactory"] = hex_compiler_factory_MappingConfigurationFactory;
hex_compiler_factory_MappingConfigurationFactory.__name__ = ["hex","compiler","factory","MappingConfigurationFactory"];
hex_compiler_factory_MappingConfigurationFactory.prototype = {
	__class__: hex_compiler_factory_MappingConfigurationFactory
};
var hex_compiler_factory_NullFactory = function() {
};
$hxClasses["hex.compiler.factory.NullFactory"] = hex_compiler_factory_NullFactory;
hex_compiler_factory_NullFactory.__name__ = ["hex","compiler","factory","NullFactory"];
hex_compiler_factory_NullFactory.prototype = {
	__class__: hex_compiler_factory_NullFactory
};
var hex_compiler_factory_ServiceLocatorFactory = function() {
};
$hxClasses["hex.compiler.factory.ServiceLocatorFactory"] = hex_compiler_factory_ServiceLocatorFactory;
hex_compiler_factory_ServiceLocatorFactory.__name__ = ["hex","compiler","factory","ServiceLocatorFactory"];
hex_compiler_factory_ServiceLocatorFactory.prototype = {
	__class__: hex_compiler_factory_ServiceLocatorFactory
};
var hex_compiler_factory_StateTransitionFactory = function() {
};
$hxClasses["hex.compiler.factory.StateTransitionFactory"] = hex_compiler_factory_StateTransitionFactory;
hex_compiler_factory_StateTransitionFactory.__name__ = ["hex","compiler","factory","StateTransitionFactory"];
hex_compiler_factory_StateTransitionFactory.prototype = {
	__class__: hex_compiler_factory_StateTransitionFactory
};
var hex_compiler_factory_StaticVariableFactory = function() {
};
$hxClasses["hex.compiler.factory.StaticVariableFactory"] = hex_compiler_factory_StaticVariableFactory;
hex_compiler_factory_StaticVariableFactory.__name__ = ["hex","compiler","factory","StaticVariableFactory"];
hex_compiler_factory_StaticVariableFactory.prototype = {
	__class__: hex_compiler_factory_StaticVariableFactory
};
var hex_compiler_factory_StringFactory = function() {
};
$hxClasses["hex.compiler.factory.StringFactory"] = hex_compiler_factory_StringFactory;
hex_compiler_factory_StringFactory.__name__ = ["hex","compiler","factory","StringFactory"];
hex_compiler_factory_StringFactory.prototype = {
	__class__: hex_compiler_factory_StringFactory
};
var hex_compiler_factory_UIntFactory = function() {
};
$hxClasses["hex.compiler.factory.UIntFactory"] = hex_compiler_factory_UIntFactory;
hex_compiler_factory_UIntFactory.__name__ = ["hex","compiler","factory","UIntFactory"];
hex_compiler_factory_UIntFactory.prototype = {
	__class__: hex_compiler_factory_UIntFactory
};
var hex_compiler_factory_XmlFactory = function() {
};
$hxClasses["hex.compiler.factory.XmlFactory"] = hex_compiler_factory_XmlFactory;
hex_compiler_factory_XmlFactory.__name__ = ["hex","compiler","factory","XmlFactory"];
hex_compiler_factory_XmlFactory.prototype = {
	__class__: hex_compiler_factory_XmlFactory
};
var hex_compiler_parser_xml_ClassImportHelper = function() {
	this._compiledClass = [];
};
$hxClasses["hex.compiler.parser.xml.ClassImportHelper"] = hex_compiler_parser_xml_ClassImportHelper;
hex_compiler_parser_xml_ClassImportHelper.__name__ = ["hex","compiler","parser","xml","ClassImportHelper"];
hex_compiler_parser_xml_ClassImportHelper.prototype = {
	__class__: hex_compiler_parser_xml_ClassImportHelper
};
var hex_compiler_parser_xml_XmlCompiler = function() { };
$hxClasses["hex.compiler.parser.xml.XmlCompiler"] = hex_compiler_parser_xml_XmlCompiler;
hex_compiler_parser_xml_XmlCompiler.__name__ = ["hex","compiler","parser","xml","XmlCompiler"];
var hex_config_stateful_IStatefulConfig = function() { };
$hxClasses["hex.config.stateful.IStatefulConfig"] = hex_config_stateful_IStatefulConfig;
hex_config_stateful_IStatefulConfig.__name__ = ["hex","config","stateful","IStatefulConfig"];
hex_config_stateful_IStatefulConfig.prototype = {
	__class__: hex_config_stateful_IStatefulConfig
};
var hex_config_stateful_ServiceLocator = function() {
	this._mapping = new hex_collection_HashMap();
	hex_collection_Locator.call(this);
};
$hxClasses["hex.config.stateful.ServiceLocator"] = hex_config_stateful_ServiceLocator;
hex_config_stateful_ServiceLocator.__name__ = ["hex","config","stateful","ServiceLocator"];
hex_config_stateful_ServiceLocator.__interfaces__ = [hex_config_stateful_IStatefulConfig];
hex_config_stateful_ServiceLocator.__super__ = hex_collection_Locator;
hex_config_stateful_ServiceLocator.prototype = $extend(hex_collection_Locator.prototype,{
	getService: function(type,name) {
		if(name == null) name = "";
		var helper;
		if(name.length > 0) helper = this.locate(name + "#" + Type.getClassName(type)); else helper = this.locate(Type.getClassName(type));
		var service = helper.value;
		if(js_Boot.__instanceof(service,Class)) service = Type.createInstance(service,[]);
		if(js_Boot.__instanceof(service,hex_service_IService)) return service; else throw new js__$Boot_HaxeError(new hex_error_NoSuchElementException(Std.string(this) + ".getService failed to retrieve service with key '" + Std.string(type) + "'",{ fileName : "ServiceLocator.hx", lineNumber : 58, className : "hex.config.stateful.ServiceLocator", methodName : "getService"}));
	}
	,configure: function(injector,dispatcher,module) {
		var keys = this.keys();
		var _g = 0;
		while(_g < keys.length) {
			var className = keys[_g];
			++_g;
			var separatorIndex = className.indexOf("#");
			var serviceClassKey;
			if(separatorIndex != -1) serviceClassKey = Type.resolveClass(HxOverrides.substr(className,separatorIndex + 1,null)); else serviceClassKey = Type.resolveClass(className);
			var helper = this.locate(className);
			var service = helper.value;
			if(js_Boot.__instanceof(service,Class)) injector.mapToType(serviceClassKey,service,helper.mapName); else if(js_Boot.__instanceof(service,hex_service_stateful_IStatefulService)) {
				var serviceDispatcher = service.getDispatcher();
				if(serviceDispatcher != null) serviceDispatcher.add(dispatcher);
				injector.mapToValue(serviceClassKey,service,helper.mapName);
			} else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("Mapping failed on '" + Std.string(service) + "' This instance is not a stateful service nor a service class.",{ fileName : "ServiceLocator.hx", lineNumber : 98, className : "hex.config.stateful.ServiceLocator", methodName : "configure"}));
			this._mapping.put(serviceClassKey,service);
		}
	}
	,addService: function(service,value,mapName) {
		if(mapName == null) mapName = "";
		return this._registerService(service,new hex_config_stateful__$ServiceLocator_ServiceLocatorHelper(value,mapName),mapName);
	}
	,getMapping: function() {
		return this._mapping;
	}
	,_registerService: function(type,service,mapName) {
		if(mapName == null) mapName = "";
		var className;
		className = (mapName != ""?mapName + "#":"") + Type.getClassName(type);
		return this.register(className,service);
	}
	,_dispatchRegisterEvent: function(key,element) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
	}
	,_dispatchUnregisterEvent: function(key) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
	}
	,__class__: hex_config_stateful_ServiceLocator
});
var hex_config_stateful__$ServiceLocator_ServiceLocatorHelper = function(value,mapName) {
	this.value = value;
	this.mapName = mapName;
};
$hxClasses["hex.config.stateful._ServiceLocator.ServiceLocatorHelper"] = hex_config_stateful__$ServiceLocator_ServiceLocatorHelper;
hex_config_stateful__$ServiceLocator_ServiceLocatorHelper.__name__ = ["hex","config","stateful","_ServiceLocator","ServiceLocatorHelper"];
hex_config_stateful__$ServiceLocator_ServiceLocatorHelper.prototype = {
	toString: function() {
		return "ServiceLocatorHelper( value:" + Std.string(this.value) + ", mapName:" + this.mapName + " )";
	}
	,__class__: hex_config_stateful__$ServiceLocator_ServiceLocatorHelper
};
var hex_control_IFrontController = function() { };
$hxClasses["hex.control.IFrontController"] = hex_control_IFrontController;
hex_control_IFrontController.__name__ = ["hex","control","IFrontController"];
hex_control_IFrontController.prototype = {
	__class__: hex_control_IFrontController
};
var hex_control_FrontController = function(facadeDispatcher,injector,module) {
	hex_collection_Locator.call(this);
	this._facadeDispatcher = facadeDispatcher;
	this._injector = injector;
	this._module = module;
	this._facadeDispatcher.addListener(this);
};
$hxClasses["hex.control.FrontController"] = hex_control_FrontController;
hex_control_FrontController.__name__ = ["hex","control","FrontController"];
hex_control_FrontController.__interfaces__ = [hex_control_IFrontController];
hex_control_FrontController.__super__ = hex_collection_Locator;
hex_control_FrontController.prototype = $extend(hex_collection_Locator.prototype,{
	map: function(messageType,commandClass) {
		var commandMapping = new hex_control_command_CommandMapping(commandClass);
		this.register(messageType,commandMapping);
		return commandMapping;
	}
	,unmap: function(messageType) {
		var commandMapping = this.locate(messageType);
		this.unregister(messageType);
		return commandMapping;
	}
	,handleMessage: function(messageType,request) {
		if(this.isRegisteredWithKey(messageType)) {
			var commandMapping = this.locate(messageType);
			var commandExecutor = new hex_control_command_CommandExecutor(this._injector,this._module);
			var mappingRemoval = null;
			if(commandMapping.get_isFiredOnce()) mappingRemoval = (function(f,a1) {
				return function() {
					return f(a1);
				};
			})($bind(this,this.unmap),messageType);
			commandExecutor.executeCommand(commandMapping,request,mappingRemoval);
		}
	}
	,_dispatchRegisterEvent: function(key,element) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
	}
	,_dispatchUnregisterEvent: function(key) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
	}
	,__class__: hex_control_FrontController
});
var hex_control_Request = function(executionPayloads) {
	this._executionPayloads = executionPayloads;
};
$hxClasses["hex.control.Request"] = hex_control_Request;
hex_control_Request.__name__ = ["hex","control","Request"];
hex_control_Request.prototype = {
	getExecutionPayloads: function() {
		return this._executionPayloads;
	}
	,clone: function() {
		return new hex_control_Request(this._executionPayloads);
	}
	,__class__: hex_control_Request
};
var hex_control_async_IAsyncCommand = function() { };
$hxClasses["hex.control.async.IAsyncCommand"] = hex_control_async_IAsyncCommand;
hex_control_async_IAsyncCommand.__name__ = ["hex","control","async","IAsyncCommand"];
hex_control_async_IAsyncCommand.__interfaces__ = [hex_control_command_ICommand];
hex_control_async_IAsyncCommand.prototype = {
	__class__: hex_control_async_IAsyncCommand
	,__properties__: {get_isCancelled:"get_isCancelled",get_hasFailed:"get_hasFailed",get_hasCompleted:"get_hasCompleted",get_isRunning:"get_isRunning",get_wasUsed:"get_wasUsed"}
};
var hex_control_async_AsyncCommand = function() {
	this.executeMethodName = "execute";
	this._status = "WAS_NEVER_USED";
	this._dispatcher = new hex_event_Dispatcher();
};
$hxClasses["hex.control.async.AsyncCommand"] = hex_control_async_AsyncCommand;
hex_control_async_AsyncCommand.__name__ = ["hex","control","async","AsyncCommand"];
hex_control_async_AsyncCommand.__interfaces__ = [hex_control_async_IAsyncCommand];
hex_control_async_AsyncCommand.isDetained = function(aSynCommand) {
	return hex_control_async_AsyncCommand._POOL.h.__keys__[aSynCommand.__id__] != null;
};
hex_control_async_AsyncCommand.detain = function(aSynCommand) {
	hex_control_async_AsyncCommand._POOL.set(aSynCommand,true);
};
hex_control_async_AsyncCommand.release = function(aSynCommand) {
	if(hex_control_async_AsyncCommand._POOL.h.__keys__[aSynCommand.__id__] != null) hex_control_async_AsyncCommand._POOL.remove(aSynCommand);
};
hex_control_async_AsyncCommand.prototype = {
	getLogger: function() {
		return this._owner.getLogger();
	}
	,preExecute: function() {
		this.get_wasUsed() && this._throwExecutionIllegalStateError();
		this._status = "IS_RUNNING";
		hex_control_async_AsyncCommand.detain(this);
	}
	,cancel: function() {
		this._handleCancel();
	}
	,addAsyncCommandListener: function(listener) {
		this.addCompleteHandler(listener,$bind(listener,listener.onAsyncCommandComplete));
		this.addFailHandler(listener,$bind(listener,listener.onAsyncCommandFail));
		this.addCancelHandler(listener,$bind(listener,listener.onAsyncCommandCancel));
	}
	,removeAsyncCommandListener: function(listener) {
		this.removeCompleteHandler(listener,$bind(listener,listener.onAsyncCommandComplete));
		this.removeFailHandler(listener,$bind(listener,listener.onAsyncCommandFail));
		this.removeCancelHandler(listener,$bind(listener,listener.onAsyncCommandCancel));
	}
	,addCompleteHandler: function(scope,callback) {
		if(this.get_hasCompleted()) callback(this); else this._dispatcher.addHandler(hex_control_async_AsyncCommandMessage.COMPLETE,scope,callback);
	}
	,removeCompleteHandler: function(scope,callback) {
		this._dispatcher.removeHandler(hex_control_async_AsyncCommandMessage.COMPLETE,scope,callback);
	}
	,addFailHandler: function(scope,callback) {
		if(this.get_hasFailed()) callback(this); else this._dispatcher.addHandler(hex_control_async_AsyncCommandMessage.FAIL,scope,callback);
	}
	,removeFailHandler: function(scope,callback) {
		this._dispatcher.removeHandler(hex_control_async_AsyncCommandMessage.FAIL,scope,callback);
	}
	,addCancelHandler: function(scope,callback) {
		if(this.get_isCancelled()) callback(this); else this._dispatcher.addHandler(hex_control_async_AsyncCommandMessage.CANCEL,scope,callback);
	}
	,removeCancelHandler: function(scope,callback) {
		this._dispatcher.removeHandler(hex_control_async_AsyncCommandMessage.CANCEL,scope,callback);
	}
	,_handleComplete: function() {
		this.get_wasUsed() && this._status != "IS_RUNNING" && this._throwIllegalStateError("_handleComplete");
		this._status = "IS_COMPLETED";
		this._dispatcher.dispatch(hex_control_async_AsyncCommandMessage.COMPLETE,[this]);
		this._release();
	}
	,_handleFail: function() {
		this.get_wasUsed() && this._status != "IS_RUNNING" && this._throwIllegalStateError("_handleFail");
		this._status = "IS_FAILED";
		this._dispatcher.dispatch(hex_control_async_AsyncCommandMessage.FAIL,[this]);
		this._release();
	}
	,_handleCancel: function() {
		this.get_wasUsed() && this._status != "IS_RUNNING" && this._throwIllegalStateError("_handleCancel");
		this._status = "IS_CANCELLED";
		this._dispatcher.dispatch(hex_control_async_AsyncCommandMessage.CANCEL,[this]);
		this._release();
	}
	,get_wasUsed: function() {
		return this._status != "WAS_NEVER_USED";
	}
	,get_isRunning: function() {
		return this._status == "IS_RUNNING";
	}
	,get_hasCompleted: function() {
		return this._status == "IS_COMPLETED";
	}
	,get_hasFailed: function() {
		return this._status == "IS_FAILED";
	}
	,get_isCancelled: function() {
		return this._status == "IS_CANCELLED";
	}
	,getResult: function() {
		return null;
	}
	,getReturnedExecutionPayload: function() {
		return null;
	}
	,getOwner: function() {
		return this._owner;
	}
	,setOwner: function(owner) {
		if(this._owner == null) this._owner = owner;
	}
	,_removeAllListeners: function() {
		this._dispatcher.removeAllListeners();
	}
	,_throwExecutionIllegalStateError: function() {
		var msg = "";
		if(this.get_isRunning()) msg = "'execute' call failed. This command is already processing."; else if(this.get_isCancelled()) msg = "'execute' call failed. This command is cancelled."; else if(this.get_hasCompleted()) msg = "'execute' call failed. This command is completed and can't be executed twice."; else if(this.get_hasFailed()) msg = "'execute' call failed. This command has failed and can't be executed twice."; else if(!this.get_wasUsed()) msg = "'execute' call failed. 'preExecute' should be called before.";
		this._release();
		throw new js__$Boot_HaxeError(new hex_error_IllegalStateException(msg,{ fileName : "AsyncCommand.hx", lineNumber : 239, className : "hex.control.async.AsyncCommand", methodName : "_throwExecutionIllegalStateError"}));
	}
	,_throwIllegalStateError: function(process) {
		var msg = "";
		if(this.get_isCancelled()) msg = "'" + process + "' call failed in '" + hex_log_Stringifier.stringify(this) + "'. This command was already cancelled."; else if(this.get_hasCompleted()) msg = "'" + process + "' call failed in '" + hex_log_Stringifier.stringify(this) + "'. This command was already completed."; else if(this.get_hasFailed()) msg = "'" + process + "' call failed in '" + hex_log_Stringifier.stringify(this) + "'. This command has already failed.";
		this._release();
		throw new js__$Boot_HaxeError(new hex_error_IllegalStateException(msg,{ fileName : "AsyncCommand.hx", lineNumber : 260, className : "hex.control.async.AsyncCommand", methodName : "_throwIllegalStateError"}));
	}
	,_release: function() {
		this._removeAllListeners();
		hex_control_async_AsyncCommand.release(this);
	}
	,__class__: hex_control_async_AsyncCommand
	,__properties__: {get_isCancelled:"get_isCancelled",get_hasFailed:"get_hasFailed",get_hasCompleted:"get_hasCompleted",get_isRunning:"get_isRunning",get_wasUsed:"get_wasUsed"}
};
var hex_control_async_AsyncCommandMessage = function() {
};
$hxClasses["hex.control.async.AsyncCommandMessage"] = hex_control_async_AsyncCommandMessage;
hex_control_async_AsyncCommandMessage.__name__ = ["hex","control","async","AsyncCommandMessage"];
hex_control_async_AsyncCommandMessage.prototype = {
	__class__: hex_control_async_AsyncCommandMessage
};
var hex_control_async_AsyncCommandUtil = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'AsyncCommandUtil' class can't be instantiated.",{ fileName : "AsyncCommandUtil.hx", lineNumber : 14, className : "hex.control.async.AsyncCommandUtil", methodName : "new"}));
};
$hxClasses["hex.control.async.AsyncCommandUtil"] = hex_control_async_AsyncCommandUtil;
hex_control_async_AsyncCommandUtil.__name__ = ["hex","control","async","AsyncCommandUtil"];
hex_control_async_AsyncCommandUtil.addListenersToAsyncCommand = function(handlers,methodToAddListener) {
	var _g = 0;
	while(_g < handlers.length) {
		var handler = handlers[_g];
		++_g;
		methodToAddListener(handler.scope,handler.callback);
	}
};
hex_control_async_AsyncCommandUtil.prototype = {
	__class__: hex_control_async_AsyncCommandUtil
};
var hex_control_async_AsyncHandler = function(scope,callback) {
	this.scope = scope;
	this.callback = callback;
};
$hxClasses["hex.control.async.AsyncHandler"] = hex_control_async_AsyncHandler;
hex_control_async_AsyncHandler.__name__ = ["hex","control","async","AsyncHandler"];
hex_control_async_AsyncHandler.prototype = {
	__class__: hex_control_async_AsyncHandler
};
var hex_control_async_IAsyncCommandListener = function() { };
$hxClasses["hex.control.async.IAsyncCommandListener"] = hex_control_async_IAsyncCommandListener;
hex_control_async_IAsyncCommandListener.__name__ = ["hex","control","async","IAsyncCommandListener"];
hex_control_async_IAsyncCommandListener.prototype = {
	__class__: hex_control_async_IAsyncCommandListener
};
var hex_control_command_CommandExecutor = function(injector,module) {
	this._injector = injector;
	this._module = module;
};
$hxClasses["hex.control.command.CommandExecutor"] = hex_control_command_CommandExecutor;
hex_control_command_CommandExecutor.__name__ = ["hex","control","command","CommandExecutor"];
hex_control_command_CommandExecutor.prototype = {
	executeCommand: function(mapping,request,mappingRemoval) {
		var payloads = mapping.getPayloads();
		if(request != null) if(payloads != null) payloads = payloads.concat(request.getExecutionPayloads()); else payloads = request.getExecutionPayloads();
		if(mapping.get_hasMappingResult()) if(payloads != null) payloads = payloads.concat(mapping.getPayloadResult()); else payloads = mapping.getPayloadResult();
		if(payloads != null) hex_control_payload_PayloadUtil.mapPayload(payloads,this._injector);
		var command = null;
		if(!mapping.get_hasGuard() || hex_control_guard_GuardUtil.guardsApprove(mapping.getGuards(),this._injector)) {
			if(mappingRemoval != null) mappingRemoval();
			command = this._injector.getOrCreateNewInstance(mapping.getCommandClass());
			mapping.setLastCommandInstance(command);
		}
		if(payloads != null) hex_control_payload_PayloadUtil.unmapPayload(payloads,this._injector);
		if(command != null) {
			command.setOwner(this._module);
			var isAsync = js_Boot.__instanceof(command,hex_control_async_IAsyncCommand);
			if(isAsync) {
				var asynCommand;
				asynCommand = js_Boot.__cast(command , hex_control_async_IAsyncCommand);
				asynCommand.preExecute();
				if(mapping.get_hasCompleteHandler()) hex_control_async_AsyncCommandUtil.addListenersToAsyncCommand(mapping.getCompleteHandlers(),$bind(asynCommand,asynCommand.addCompleteHandler));
				if(mapping.get_hasFailHandler()) hex_control_async_AsyncCommandUtil.addListenersToAsyncCommand(mapping.getFailHandlers(),$bind(asynCommand,asynCommand.addFailHandler));
				if(mapping.get_hasCancelHandler()) hex_control_async_AsyncCommandUtil.addListenersToAsyncCommand(mapping.getCancelHandlers(),$bind(asynCommand,asynCommand.addCancelHandler));
			}
			Reflect.callMethod(command,Reflect.field(command,command.executeMethodName),[request]);
		}
	}
	,__class__: hex_control_command_CommandExecutor
};
var hex_control_command_ICommandMapping = function() { };
$hxClasses["hex.control.command.ICommandMapping"] = hex_control_command_ICommandMapping;
hex_control_command_ICommandMapping.__name__ = ["hex","control","command","ICommandMapping"];
hex_control_command_ICommandMapping.prototype = {
	__class__: hex_control_command_ICommandMapping
	,__properties__: {get_hasMappingResult:"get_hasMappingResult",get_hasCancelHandler:"get_hasCancelHandler",get_hasFailHandler:"get_hasFailHandler",get_hasCompleteHandler:"get_hasCompleteHandler",get_hasPayload:"get_hasPayload",get_isFiredOnce:"get_isFiredOnce",get_hasGuard:"get_hasGuard"}
};
var hex_control_command_CommandMapping = function(commandClass) {
	this._commandClass = commandClass;
	this.isFiredOnce = false;
};
$hxClasses["hex.control.command.CommandMapping"] = hex_control_command_CommandMapping;
hex_control_command_CommandMapping.__name__ = ["hex","control","command","CommandMapping"];
hex_control_command_CommandMapping.__interfaces__ = [hex_control_command_ICommandMapping];
hex_control_command_CommandMapping.prototype = {
	getCommandClass: function() {
		return this._commandClass;
	}
	,get_hasGuard: function() {
		return this._guards != null;
	}
	,getGuards: function() {
		return this._guards;
	}
	,withGuards: function(guards) {
		if(this._guards == null) this._guards = [];
		this._guards = this._guards.concat(guards);
		return this;
	}
	,get_isFiredOnce: function() {
		return this.isFiredOnce;
	}
	,once: function() {
		this.isFiredOnce = true;
		return this;
	}
	,get_hasPayload: function() {
		return this._payloads != null;
	}
	,getPayloads: function() {
		return this._payloads;
	}
	,withPayloads: function(payloads) {
		if(this._payloads == null) this._payloads = [];
		this._payloads = this._payloads.concat(payloads);
		return this;
	}
	,getCompleteHandlers: function() {
		return this._completeHandlers;
	}
	,get_hasCompleteHandler: function() {
		return this._completeHandlers != null;
	}
	,withCompleteHandlers: function(handler) {
		if(this._completeHandlers == null) this._completeHandlers = [];
		this._completeHandlers.push(handler);
		return this;
	}
	,getFailHandlers: function() {
		return this._failHandlers;
	}
	,get_hasFailHandler: function() {
		return this._failHandlers != null;
	}
	,withFailHandlers: function(handler) {
		if(this._failHandlers == null) this._failHandlers = [];
		this._failHandlers.push(handler);
		return this;
	}
	,getCancelHandlers: function() {
		return this._cancelHandlers;
	}
	,get_hasCancelHandler: function() {
		return this._cancelHandlers != null;
	}
	,withCancelHandlers: function(handler) {
		if(this._cancelHandlers == null) this._cancelHandlers = [];
		this._cancelHandlers.push(handler);
		return this;
	}
	,setContextOwner: function(contextOwner) {
		this._contextOwner = contextOwner;
	}
	,getContextOwner: function() {
		return this._contextOwner;
	}
	,get_hasMappingResult: function() {
		return this._mappingResults != null;
	}
	,withMappingResults: function(mappingResults) {
		if(this._mappingResults == null) this._mappingResults = [];
		this._mappingResults = this._mappingResults.concat(mappingResults);
		return this;
	}
	,setLastCommandInstance: function(command) {
		this._command = command;
	}
	,getPayloadResult: function() {
		var payload = [];
		if(this._mappingResults != null) {
			var _g = 0;
			var _g1 = this._mappingResults;
			while(_g < _g1.length) {
				var mapping = _g1[_g];
				++_g;
				var command;
				command = (js_Boot.__cast(mapping , hex_control_command_CommandMapping))._command;
				if(command != null) {
					var returnedExecutionPayload = command.getReturnedExecutionPayload();
					if(returnedExecutionPayload != null) payload = payload.concat(command.getReturnedExecutionPayload());
				}
			}
		}
		if(payload.length > 0) return payload; else return null;
	}
	,__class__: hex_control_command_CommandMapping
	,__properties__: {get_hasMappingResult:"get_hasMappingResult",get_hasCancelHandler:"get_hasCancelHandler",get_hasFailHandler:"get_hasFailHandler",get_hasCompleteHandler:"get_hasCompleteHandler",get_hasPayload:"get_hasPayload",get_isFiredOnce:"get_isFiredOnce",get_hasGuard:"get_hasGuard"}
};
var hex_control_guard_GuardUtil = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'GuardUtil' class can't be instantiated.",{ fileName : "GuardUtil.hx", lineNumber : 14, className : "hex.control.guard.GuardUtil", methodName : "new"}));
};
$hxClasses["hex.control.guard.GuardUtil"] = hex_control_guard_GuardUtil;
hex_control_guard_GuardUtil.__name__ = ["hex","control","guard","GuardUtil"];
hex_control_guard_GuardUtil.guardsApprove = function(guards,injector) {
	if(guards != null) {
		var _g = 0;
		while(_g < guards.length) {
			var guard = guards[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(guard,"approve")) guard = Reflect.field(guard,"approve"); else if(js_Boot.__instanceof(guard,Class)) {
				if(injector != null) guard = injector.instantiateUnmapped(guard); else guard = Type.createInstance(guard,[]);
				guard = guard.approve;
			}
			if(Reflect.isFunction(guard)) {
				var b = guard();
				if(!b) return false;
			}
		}
	}
	return true;
};
hex_control_guard_GuardUtil.prototype = {
	__class__: hex_control_guard_GuardUtil
};
var hex_control_macro_IMacroExecutor = function() { };
$hxClasses["hex.control.macro.IMacroExecutor"] = hex_control_macro_IMacroExecutor;
hex_control_macro_IMacroExecutor.__name__ = ["hex","control","macro","IMacroExecutor"];
hex_control_macro_IMacroExecutor.prototype = {
	__class__: hex_control_macro_IMacroExecutor
	,__properties__: {get_commandIndex:"get_commandIndex",get_hasRunEveryCommand:"get_hasRunEveryCommand",get_hasNextCommandMapping:"get_hasNextCommandMapping"}
};
var hex_control_macro_Macro = function() {
	this._isSequenceMode = true;
	this._isAtomic = true;
	hex_control_async_AsyncCommand.call(this);
	this.set_isAtomic(true);
	this.set_isInSequenceMode(true);
};
$hxClasses["hex.control.macro.Macro"] = hex_control_macro_Macro;
hex_control_macro_Macro.__name__ = ["hex","control","macro","Macro"];
hex_control_macro_Macro.__interfaces__ = [hex_control_async_IAsyncCommandListener];
hex_control_macro_Macro.__super__ = hex_control_async_AsyncCommand;
hex_control_macro_Macro.prototype = $extend(hex_control_async_AsyncCommand.prototype,{
	_prepare: function() {
		throw new js__$Boot_HaxeError(new hex_error_VirtualMethodException(Std.string(this) + ".execute must be overridden",{ fileName : "Macro.hx", lineNumber : 36, className : "hex.control.macro.Macro", methodName : "_prepare"}));
	}
	,preExecute: function() {
		if(this.macroExecutor != null) this.macroExecutor.setAsyncCommandListener(this); else throw new js__$Boot_HaxeError(new hex_error_NullPointerException("macroExecutor can't be null in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "Macro.hx", lineNumber : 47, className : "hex.control.macro.Macro", methodName : "preExecute"}));
		this._prepare();
		hex_control_async_AsyncCommand.prototype.preExecute.call(this);
	}
	,execute: function(request) {
		!this.get_isRunning() && this._throwExecutionIllegalStateError();
		this._request = request;
		this._executeNextCommand();
	}
	,add: function(commandClass) {
		return this.macroExecutor.add(commandClass);
	}
	,addMapping: function(mapping) {
		return this.macroExecutor.addMapping(mapping);
	}
	,_executeCommand: function() {
		var command = this.macroExecutor.executeNextCommand(this._request);
		if(command != null) {
			var isAsync = js_Boot.__instanceof(command,hex_control_async_IAsyncCommand);
			if(!isAsync || this.get_isInParallelMode()) this._executeNextCommand();
		}
	}
	,_executeNextCommand: function() {
		if(this.macroExecutor.get_hasNextCommandMapping()) this._executeCommand(); else if(this.macroExecutor.get_hasRunEveryCommand()) this._handleComplete();
	}
	,get_isAtomic: function() {
		return this.isAtomic;
	}
	,set_isAtomic: function(value) {
		this.isAtomic = value;
		return value;
	}
	,get_isInSequenceMode: function() {
		return this.isInSequenceMode;
	}
	,set_isInSequenceMode: function(value) {
		this.isInSequenceMode = value;
		return value;
	}
	,get_isInParallelMode: function() {
		return !this.get_isInSequenceMode();
	}
	,set_isInParallelMode: function(value) {
		this.set_isInSequenceMode(!value);
		return this.get_isInSequenceMode();
	}
	,onAsyncCommandComplete: function(cmd) {
		this.macroExecutor.asyncCommandCalled(cmd);
		this._executeNextCommand();
	}
	,onAsyncCommandFail: function(cmd) {
		if(cmd != null) this.macroExecutor.asyncCommandCalled(cmd);
		if(this.get_isAtomic()) {
			if(this.get_isRunning()) this._handleFail();
		} else this._executeNextCommand();
	}
	,onAsyncCommandCancel: function(cmd) {
		this.macroExecutor.asyncCommandCalled(cmd);
		if(this.get_isAtomic()) this.cancel(); else this._executeNextCommand();
	}
	,toString: function() {
		return hex_log_Stringifier.stringify(this);
	}
	,__class__: hex_control_macro_Macro
	,__properties__: $extend(hex_control_async_AsyncCommand.prototype.__properties__,{set_isInParallelMode:"set_isInParallelMode",get_isInParallelMode:"get_isInParallelMode",set_isInSequenceMode:"set_isInSequenceMode",get_isInSequenceMode:"get_isInSequenceMode",set_isAtomic:"set_isAtomic",get_isAtomic:"get_isAtomic"})
});
var hex_control_macro_MacroExecutor = function() {
	this._commandMappingCollection = [];
	this._runningAsyncCommandList = [];
	this._commandIndex = 0;
	this._commandCalledCount = 0;
};
$hxClasses["hex.control.macro.MacroExecutor"] = hex_control_macro_MacroExecutor;
hex_control_macro_MacroExecutor.__name__ = ["hex","control","macro","MacroExecutor"];
hex_control_macro_MacroExecutor.__interfaces__ = [hex_control_macro_IMacroExecutor];
hex_control_macro_MacroExecutor.prototype = {
	executeCommand: function(mapping,request) {
		var injector = null;
		var contextOwner = mapping.getContextOwner();
		if(contextOwner != null) injector = contextOwner.getInjector(); else injector = this.injector;
		var payloads = mapping.getPayloads();
		if(request != null) if(payloads != null) payloads = payloads.concat(request.getExecutionPayloads()); else payloads = request.getExecutionPayloads();
		if(mapping.get_hasMappingResult()) if(payloads != null) payloads = payloads.concat(mapping.getPayloadResult()); else payloads = mapping.getPayloadResult();
		if(payloads != null) hex_control_payload_PayloadUtil.mapPayload(payloads,injector);
		var command = null;
		if(!mapping.get_hasGuard() || hex_control_guard_GuardUtil.guardsApprove(mapping.getGuards(),injector)) {
			command = injector.getOrCreateNewInstance(mapping.getCommandClass());
			mapping.setLastCommandInstance(command);
		} else {
			this._commandCalledCount++;
			this._asyncCommandListener.onAsyncCommandFail(null);
			return null;
		}
		if(payloads != null) hex_control_payload_PayloadUtil.unmapPayload(payloads,injector);
		if(command != null) {
			if(injector.hasMapping(hex_module_IModule)) command.setOwner(injector.getInstance(hex_module_IModule));
			var isAsync = js_Boot.__instanceof(command,hex_control_async_IAsyncCommand);
			if(isAsync) {
				var aSyncCommand;
				aSyncCommand = js_Boot.__cast(command , hex_control_async_IAsyncCommand);
				aSyncCommand.preExecute();
				if(mapping.get_hasCompleteHandler()) hex_control_async_AsyncCommandUtil.addListenersToAsyncCommand(mapping.getCompleteHandlers(),$bind(aSyncCommand,aSyncCommand.addCompleteHandler));
				if(mapping.get_hasFailHandler()) hex_control_async_AsyncCommandUtil.addListenersToAsyncCommand(mapping.getFailHandlers(),$bind(aSyncCommand,aSyncCommand.addFailHandler));
				if(mapping.get_hasCancelHandler()) hex_control_async_AsyncCommandUtil.addListenersToAsyncCommand(mapping.getCancelHandlers(),$bind(aSyncCommand,aSyncCommand.addCancelHandler));
				aSyncCommand.addAsyncCommandListener(this._asyncCommandListener);
				this._runningAsyncCommandList.push(aSyncCommand);
			}
			Reflect.callMethod(command,Reflect.field(command,command.executeMethodName),[request]);
			if(!isAsync) this._commandCalledCount++;
		}
		return command;
	}
	,get_commandIndex: function() {
		return this._commandIndex;
	}
	,get_hasRunEveryCommand: function() {
		return this._commandCalledCount == this._commandMappingCollection.length;
	}
	,setAsyncCommandListener: function(listener) {
		this._asyncCommandListener = listener;
	}
	,get_hasNextCommandMapping: function() {
		return this._commandMappingCollection != null && this._commandIndex < this._commandMappingCollection.length;
	}
	,add: function(commandClass) {
		var mapping = new hex_control_command_CommandMapping(commandClass);
		this._commandMappingCollection.push(mapping);
		return mapping;
	}
	,addMapping: function(mapping) {
		this._commandMappingCollection.push(mapping);
		return mapping;
	}
	,executeNextCommand: function(request) {
		return this.executeCommand(this._commandMappingCollection[this._commandIndex++],request);
	}
	,asyncCommandCalled: function(asyncCommand) {
		var index = HxOverrides.indexOf(this._runningAsyncCommandList,asyncCommand,0);
		if(index > -1) {
			this._runningAsyncCommandList.splice(index,1);
			this._commandCalledCount++;
		} else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException("Following command was not running: " + Std.string(asyncCommand),{ fileName : "MacroExecutor.hx", lineNumber : 179, className : "hex.control.macro.MacroExecutor", methodName : "asyncCommandCalled"}));
	}
	,__class__: hex_control_macro_MacroExecutor
	,__properties__: {get_hasNextCommandMapping:"get_hasNextCommandMapping",get_hasRunEveryCommand:"get_hasRunEveryCommand",get_commandIndex:"get_commandIndex"}
};
var hex_control_payload_ExecutionPayload = function(data,type,name) {
	if(name == null) name = "";
	if(data == null) throw new js__$Boot_HaxeError(new hex_error_NullPointerException("ExecutionPayload data can't be null",{ fileName : "ExecutionPayload.hx", lineNumber : 21, className : "hex.control.payload.ExecutionPayload", methodName : "new"})); else if(!js_Boot.__instanceof(data,type)) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("ExecutionPayload data '" + Std.string(data) + "' should be an instance of type '" + Std.string(type) + "'",{ fileName : "ExecutionPayload.hx", lineNumber : 25, className : "hex.control.payload.ExecutionPayload", methodName : "new"}));
	this._data = data;
	this._type = type;
	this._name = name;
};
$hxClasses["hex.control.payload.ExecutionPayload"] = hex_control_payload_ExecutionPayload;
hex_control_payload_ExecutionPayload.__name__ = ["hex","control","payload","ExecutionPayload"];
hex_control_payload_ExecutionPayload.prototype = {
	getData: function() {
		return this._data;
	}
	,getType: function() {
		return this._type;
	}
	,getName: function() {
		return this._name;
	}
	,withClass: function(type) {
		this._type = type;
		return this;
	}
	,withName: function(name) {
		if(name != null) this._name = name; else this._name = "";
		return this;
	}
	,__class__: hex_control_payload_ExecutionPayload
};
var hex_control_payload_PayloadUtil = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'PayloadUtil' class can't be instantiated.",{ fileName : "PayloadUtil.hx", lineNumber : 14, className : "hex.control.payload.PayloadUtil", methodName : "new"}));
};
$hxClasses["hex.control.payload.PayloadUtil"] = hex_control_payload_PayloadUtil;
hex_control_payload_PayloadUtil.__name__ = ["hex","control","payload","PayloadUtil"];
hex_control_payload_PayloadUtil.mapPayload = function(payloads,injector) {
	var _g = 0;
	while(_g < payloads.length) {
		var payload = payloads[_g];
		++_g;
		injector.mapToValue(payload.getType(),payload.getData(),payload.getName());
	}
};
hex_control_payload_PayloadUtil.unmapPayload = function(payloads,injector) {
	var _g = 0;
	while(_g < payloads.length) {
		var payload = payloads[_g];
		++_g;
		injector.unmap(payload.getType(),payload.getName());
	}
};
hex_control_payload_PayloadUtil.prototype = {
	__class__: hex_control_payload_PayloadUtil
};
var hex_control_request_StringRequest = function(value,executionPayloads) {
	hex_control_Request.call(this,executionPayloads);
	this.value = value;
};
$hxClasses["hex.control.request.StringRequest"] = hex_control_request_StringRequest;
hex_control_request_StringRequest.__name__ = ["hex","control","request","StringRequest"];
hex_control_request_StringRequest.__super__ = hex_control_Request;
hex_control_request_StringRequest.prototype = $extend(hex_control_Request.prototype,{
	__class__: hex_control_request_StringRequest
});
var hex_core_HashCodeFactory = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'HashCodeFactory' class can't be instantiated.",{ fileName : "HashCodeFactory.hx", lineNumber : 15, className : "hex.core.HashCodeFactory", methodName : "new"}));
};
$hxClasses["hex.core.HashCodeFactory"] = hex_core_HashCodeFactory;
hex_core_HashCodeFactory.__name__ = ["hex","core","HashCodeFactory"];
hex_core_HashCodeFactory.getNextKEY = function() {
	return hex_core_HashCodeFactory._nKEY++;
};
hex_core_HashCodeFactory.getNextName = function() {
	return "" + hex_core_HashCodeFactory._nKEY;
};
hex_core_HashCodeFactory.getKey = function(o) {
	if(!(function($this) {
		var $r;
		var key = o;
		$r = hex_core_HashCodeFactory._M.h.__keys__[key.__id__] != null;
		return $r;
	}(this))) {
		var key1 = o;
		var value = hex_core_HashCodeFactory.getNextKEY();
		hex_core_HashCodeFactory._M.set(key1,value);
	}
	var key2 = o;
	return hex_core_HashCodeFactory._M.h[key2.__id__];
};
hex_core_HashCodeFactory.previewNextKey = function() {
	return hex_core_HashCodeFactory._nKEY;
};
hex_core_HashCodeFactory.prototype = {
	__class__: hex_core_HashCodeFactory
};
var hex_core_IAnnotationParsable = function() { };
$hxClasses["hex.core.IAnnotationParsable"] = hex_core_IAnnotationParsable;
hex_core_IAnnotationParsable.__name__ = ["hex","core","IAnnotationParsable"];
var hex_data_IParser = function() { };
$hxClasses["hex.data.IParser"] = hex_data_IParser;
hex_data_IParser.__name__ = ["hex","data","IParser"];
hex_data_IParser.prototype = {
	__class__: hex_data_IParser
};
var hex_di_IBasicInjector = function() { };
$hxClasses["hex.di.IBasicInjector"] = hex_di_IBasicInjector;
hex_di_IBasicInjector.__name__ = ["hex","di","IBasicInjector"];
hex_di_IBasicInjector.prototype = {
	__class__: hex_di_IBasicInjector
};
var hex_di_IDependencyInjector = function() { };
$hxClasses["hex.di.IDependencyInjector"] = hex_di_IDependencyInjector;
hex_di_IDependencyInjector.__name__ = ["hex","di","IDependencyInjector"];
hex_di_IDependencyInjector.__interfaces__ = [hex_di_IBasicInjector];
hex_di_IDependencyInjector.prototype = {
	__class__: hex_di_IDependencyInjector
};
var hex_di_IInjectable = function() { };
$hxClasses["hex.di.IInjectable"] = hex_di_IInjectable;
hex_di_IInjectable.__name__ = ["hex","di","IInjectable"];
hex_di_IInjectable.prototype = {
	__class__: hex_di_IInjectable
};
var hex_event_IEvent = function() { };
$hxClasses["hex.event.IEvent"] = hex_event_IEvent;
hex_event_IEvent.__name__ = ["hex","event","IEvent"];
hex_event_IEvent.prototype = {
	__class__: hex_event_IEvent
};
var hex_event_BasicEvent = function(type,target) {
	this.type = type;
	this.target = target;
};
$hxClasses["hex.event.BasicEvent"] = hex_event_BasicEvent;
hex_event_BasicEvent.__name__ = ["hex","event","BasicEvent"];
hex_event_BasicEvent.__interfaces__ = [hex_event_IEvent];
hex_event_BasicEvent.prototype = {
	clone: function() {
		return new hex_event_BasicEvent(this.type,this.target);
	}
	,toString: function() {
		return hex_log_Stringifier.stringify(this) + (":{ type:" + this.type + ", target:" + Std.string(this.target) + " }");
	}
	,__class__: hex_event_BasicEvent
};
var hex_di_InjectionEvent = function(type,target,instance,instanceType) {
	hex_event_BasicEvent.call(this,type,target);
	this.instance = instance;
	this.instanceType = instanceType;
};
$hxClasses["hex.di.InjectionEvent"] = hex_di_InjectionEvent;
hex_di_InjectionEvent.__name__ = ["hex","di","InjectionEvent"];
hex_di_InjectionEvent.__super__ = hex_event_BasicEvent;
hex_di_InjectionEvent.prototype = $extend(hex_event_BasicEvent.prototype,{
	clone: function() {
		return new hex_di_InjectionEvent(this.type,this.target,this.instance,this.instanceType);
	}
	,__class__: hex_di_InjectionEvent
});
var hex_di_Injector = function() {
	this._classDescriptor = new hex_di_reflect_ClassDescriptionProvider(new hex_di_annotation_AnnotationDataProvider(hex_di_IInjectorContainer));
	this._ed = new hex_event_LightweightClosureDispatcher();
	this._mapping = new haxe_ds_StringMap();
	this._processedMapping = new haxe_ds_StringMap();
	this._managedObjects = new haxe_ds_ObjectMap();
};
$hxClasses["hex.di.Injector"] = hex_di_Injector;
hex_di_Injector.__name__ = ["hex","di","Injector"];
hex_di_Injector.__interfaces__ = [hex_di_IDependencyInjector];
hex_di_Injector.prototype = {
	createChildInjector: function() {
		var injector = new hex_di_Injector();
		injector._parentInjector = this;
		return injector;
	}
	,addEventListener: function(eventType,callback) {
		return this._ed.addEventListener(eventType,callback);
	}
	,removeEventListener: function(eventType,callback) {
		return this._ed.removeEventListener(eventType,callback);
	}
	,mapToValue: function(clazz,value,name) {
		if(name == null) name = "";
		this.map(clazz,name).toValue(value);
	}
	,mapToType: function(clazz,type,name) {
		if(name == null) name = "";
		this.map(clazz,name).toType(type);
	}
	,mapToSingleton: function(clazz,type,name) {
		if(name == null) name = "";
		this.map(clazz,name).toSingleton(type);
	}
	,getInstance: function(type,name) {
		if(name == null) name = "";
		var mappingID = Type.getClassName(type) + "|" + name;
		var mapping = this._mapping.get(mappingID);
		if(this._mapping.get(mappingID) != null) return mapping.getResult(); else if(this._parentInjector != null) return this._parentInjector.getInstance(type,name); else throw new js__$Boot_HaxeError(new hex_di_error_MissingMappingException("'" + hex_log_Stringifier.stringify(this) + "' is missing a mapping to get instance with type '" + Type.getClassName(type) + "' inside instance of '" + hex_log_Stringifier.stringify(this) + "'. Target dependency: '" + mappingID + "'",{ fileName : "Injector.hx", lineNumber : 86, className : "hex.di.Injector", methodName : "getInstance"}));
	}
	,getProvider: function(type,name) {
		if(name == null) name = "";
		var mappingID = Type.getClassName(type) + "|" + name;
		var mapping = this._mapping.get(mappingID);
		if(this._mapping.get(mappingID) != null) return mapping.provider; else if(this._parentInjector != null) return this._parentInjector.getInstance(type,name); else return null;
	}
	,instantiateUnmapped: function(type) {
		var classDescription = this._classDescriptor.getClassDescription(type);
		var instance;
		if(classDescription != null && classDescription.constructorInjection != null) instance = classDescription.constructorInjection.createInstance(type,this); else instance = Type.createInstance(type,[]);
		this._ed.dispatchEvent(new hex_di_InjectionEvent("onPostInstantiate",this,instance,type));
		if(classDescription != null) this._applyInjection(instance,type,classDescription);
		return instance;
	}
	,getOrCreateNewInstance: function(type) {
		if(this.satisfies(type)) return this.getInstance(type); else return this.instantiateUnmapped(type);
	}
	,hasMapping: function(type,name) {
		if(name == null) name = "";
		var mappingID = Type.getClassName(type) + "|" + name;
		if(this._mapping.get(mappingID) != null) return true; else if(this._parentInjector != null) return this._parentInjector.hasMapping(type,name); else return false;
	}
	,unmap: function(type,name) {
		if(name == null) name = "";
		var mappingID = Type.getClassName(type) + "|" + name;
		var mapping = this._mapping.get(mappingID);
		if(mapping == null) throw new js__$Boot_HaxeError(new hex_di_error_InjectorException("unmap failed with mapping named '" + mappingID + "' @" + hex_log_Stringifier.stringify(this),{ fileName : "Injector.hx", lineNumber : 164, className : "hex.di.Injector", methodName : "unmap"}));
		mapping.provider.destroy();
		this._mapping.remove(mappingID);
	}
	,hasDirectMapping: function(type,name) {
		if(name == null) name = "";
		var mappingID = Type.getClassName(type) + "|" + name;
		return this._mapping.get(mappingID) != null;
	}
	,satisfies: function(type,name) {
		if(name == null) name = "";
		var mappingID = Type.getClassName(type) + "|" + name;
		var mapping = this._mapping.get(mappingID);
		if(this._mapping.get(mappingID) != null) return mapping.provider != null; else if(this._parentInjector != null) return this._parentInjector.satisfies(type,name); else return false;
	}
	,satisfiesDirectly: function(type,name) {
		if(name == null) name = "";
		var mappingID = Type.getClassName(type) + "|" + name;
		var mapping = this._mapping.get(mappingID);
		if(mapping != null) return mapping.provider != null; else return false;
	}
	,injectInto: function(target) {
		var targetType = Type.getClass(target);
		var classDescription = this._classDescriptor.getClassDescription(targetType);
		if(classDescription != null) this._applyInjection(target,targetType,classDescription);
	}
	,destroyInstance: function(instance) {
		var key = instance;
		this._managedObjects.remove(key);
		var classDescription = this._classDescriptor.getClassDescription(Type.getClass(instance));
		if(classDescription != null) {
			var _g = 0;
			var _g1 = classDescription.preDestroy;
			while(_g < _g1.length) {
				var preDestroy = _g1[_g];
				++_g;
				preDestroy.applyInjection(instance,this);
			}
		}
	}
	,map: function(type,name) {
		if(name == null) name = "";
		var mappingID = Type.getClassName(type) + "|" + name;
		if(this._mapping.get(mappingID) != null) return this._mapping.get(mappingID); else return this._createMapping(type,name,mappingID);
	}
	,teardown: function() {
		var $it0 = this._mapping.iterator();
		while( $it0.hasNext() ) {
			var mapping = $it0.next();
			mapping.provider.destroy();
		}
		var it = this._managedObjects.iterator();
		while(it.hasNext()) this.destroyInstance(it.next());
		this._mapping = new haxe_ds_StringMap();
		this._processedMapping = new haxe_ds_StringMap();
		this._managedObjects = new haxe_ds_ObjectMap();
		this._ed = new hex_event_LightweightClosureDispatcher();
	}
	,_createMapping: function(type,name,mappingID) {
		if(this._processedMapping.get(mappingID)) throw new js__$Boot_HaxeError(new hex_di_error_InjectorException("Mapping named '" + mappingID + "' is already processing @" + hex_log_Stringifier.stringify(this),{ fileName : "Injector.hx", lineNumber : 273, className : "hex.di.Injector", methodName : "_createMapping"}));
		{
			this._processedMapping.set(mappingID,true);
			true;
		}
		var mapping = new hex_di_mapping_InjectionMapping(this,type,name,mappingID);
		{
			this._mapping.set(mappingID,mapping);
			mapping;
		}
		this._processedMapping.remove(mappingID);
		return mapping;
	}
	,_applyInjection: function(target,targetType,classDescription) {
		this._ed.dispatchEvent(new hex_di_InjectionEvent("onPreConstruct",this,target,targetType));
		classDescription.applyInjection(target,this);
		if(classDescription.preDestroy.length > 0) {
			var key = target;
			var value = target;
			this._managedObjects.set(key,value);
		}
		this._ed.dispatchEvent(new hex_di_InjectionEvent("onPostConstruct",this,target,targetType));
	}
	,__class__: hex_di_Injector
};
var hex_di_annotation_IAnnotationDataProvider = function() { };
$hxClasses["hex.di.annotation.IAnnotationDataProvider"] = hex_di_annotation_IAnnotationDataProvider;
hex_di_annotation_IAnnotationDataProvider.__name__ = ["hex","di","annotation","IAnnotationDataProvider"];
hex_di_annotation_IAnnotationDataProvider.prototype = {
	__class__: hex_di_annotation_IAnnotationDataProvider
};
var hex_di_annotation_AnnotationDataProvider = function(type) {
	this._metadataName = Type.getClassName(type);
	this._annotatedClasses = new hex_collection_HashMap();
};
$hxClasses["hex.di.annotation.AnnotationDataProvider"] = hex_di_annotation_AnnotationDataProvider;
hex_di_annotation_AnnotationDataProvider.__name__ = ["hex","di","annotation","AnnotationDataProvider"];
hex_di_annotation_AnnotationDataProvider.__interfaces__ = [hex_di_annotation_IAnnotationDataProvider];
hex_di_annotation_AnnotationDataProvider.prototype = {
	getClassAnnotationData: function(type) {
		if(this._annotatedClasses.containsKey(type)) return this._annotatedClasses.get(type); else return this._getClassAnnotationData(type);
	}
	,_getClassAnnotationData: function(type) {
		var meta = Reflect.field(haxe_rtti_Meta.getType(type),this._metadataName);
		if(meta != null) {
			var jsonMeta = JSON.parse(meta);
			var classAnnotationData = jsonMeta;
			this._annotatedClasses.put(type,classAnnotationData);
			return jsonMeta;
		} else return null;
	}
	,__class__: hex_di_annotation_AnnotationDataProvider
};
var hex_error_Exception = function(message,posInfos) {
	this.message = message;
	this.posInfos = posInfos;
	this.name = hex_log_Stringifier.stringify(this);
	hex_log_Logger.ERROR(this.toString(),null,{ fileName : "Exception.hx", lineNumber : 24, className : "hex.error.Exception", methodName : "new"});
};
$hxClasses["hex.error.Exception"] = hex_error_Exception;
hex_error_Exception.__name__ = ["hex","error","Exception"];
hex_error_Exception.prototype = {
	toString: function() {
		return (this.posInfos != null?this.name + " at " + this.posInfos.className + "#" + this.posInfos.methodName + " line:" + this.posInfos.lineNumber + " in file '" + this.posInfos.fileName + "'":this.name) + " | " + this.message;
	}
	,__class__: hex_error_Exception
};
var hex_di_error_InjectorException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.di.error.InjectorException"] = hex_di_error_InjectorException;
hex_di_error_InjectorException.__name__ = ["hex","di","error","InjectorException"];
hex_di_error_InjectorException.__super__ = hex_error_Exception;
hex_di_error_InjectorException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_di_error_InjectorException
});
var hex_di_error_MissingMappingException = function(message,posInfos) {
	hex_di_error_InjectorException.call(this,message,posInfos);
};
$hxClasses["hex.di.error.MissingMappingException"] = hex_di_error_MissingMappingException;
hex_di_error_MissingMappingException.__name__ = ["hex","di","error","MissingMappingException"];
hex_di_error_MissingMappingException.__super__ = hex_di_error_InjectorException;
hex_di_error_MissingMappingException.prototype = $extend(hex_di_error_InjectorException.prototype,{
	__class__: hex_di_error_MissingMappingException
});
var hex_di_mapping_InjectionMapping = function(injector,type,name,mappingID) {
	this._injector = injector;
	this._type = type;
	this._name = name;
	this._mappingID = mappingID;
};
$hxClasses["hex.di.mapping.InjectionMapping"] = hex_di_mapping_InjectionMapping;
hex_di_mapping_InjectionMapping.__name__ = ["hex","di","mapping","InjectionMapping"];
hex_di_mapping_InjectionMapping.prototype = {
	getResult: function() {
		if(this.provider != null) return this.provider.getResult(this._injector);
		throw new js__$Boot_HaxeError(new hex_error_NullPointerException("can't retrieve result, mapping with id '" + this._mappingID + "' has no provider",{ fileName : "InjectionMapping.hx", lineNumber : 37, className : "hex.di.mapping.InjectionMapping", methodName : "getResult"}));
	}
	,asSingleton: function() {
		return this.toSingleton(this._type);
	}
	,toSingleton: function(type) {
		return this._toProvider(new hex_di_provider_SingletonProvider(type,this._injector));
	}
	,toType: function(type) {
		return this._toProvider(new hex_di_provider_ClassProvider(type));
	}
	,toValue: function(value) {
		return this._toProvider(new hex_di_provider_ValueProvider(value,this._injector));
	}
	,_toProvider: function(provider) {
		if(this.provider != null) console.log("Warning: Injector already has a mapping for " + this._mappingID + ".\n " + "If you have overridden this mapping intentionally you can use " + "\"injector.unmap()\" prior to your replacement mapping in order to " + "avoid seeing this message.");
		this.provider = provider;
		return this;
	}
	,__class__: hex_di_mapping_InjectionMapping
};
var hex_di_provider_IDependencyProvider = function() { };
$hxClasses["hex.di.provider.IDependencyProvider"] = hex_di_provider_IDependencyProvider;
hex_di_provider_IDependencyProvider.__name__ = ["hex","di","provider","IDependencyProvider"];
hex_di_provider_IDependencyProvider.prototype = {
	__class__: hex_di_provider_IDependencyProvider
};
var hex_di_provider_ClassProvider = function(type) {
	this._type = type;
};
$hxClasses["hex.di.provider.ClassProvider"] = hex_di_provider_ClassProvider;
hex_di_provider_ClassProvider.__name__ = ["hex","di","provider","ClassProvider"];
hex_di_provider_ClassProvider.__interfaces__ = [hex_di_provider_IDependencyProvider];
hex_di_provider_ClassProvider.prototype = {
	getResult: function(injector) {
		return injector.instantiateUnmapped(this._type);
	}
	,destroy: function() {
	}
	,__class__: hex_di_provider_ClassProvider
};
var hex_di_provider_SingletonProvider = function(type,injector) {
	this._isDestroyed = false;
	this._type = type;
	this._injector = injector;
};
$hxClasses["hex.di.provider.SingletonProvider"] = hex_di_provider_SingletonProvider;
hex_di_provider_SingletonProvider.__name__ = ["hex","di","provider","SingletonProvider"];
hex_di_provider_SingletonProvider.__interfaces__ = [hex_di_provider_IDependencyProvider];
hex_di_provider_SingletonProvider.prototype = {
	getResult: function(injector) {
		if(this._isDestroyed) throw new js__$Boot_HaxeError(new hex_di_error_InjectorException("Forbidden usage of unmapped singleton provider for type '" + Type.getClassName(this._value) + "'",{ fileName : "SingletonProvider.hx", lineNumber : 28, className : "hex.di.provider.SingletonProvider", methodName : "getResult"})); else if(this._value == null) this._value = this._injector.instantiateUnmapped(this._type);
		return this._value;
	}
	,destroy: function() {
		this._isDestroyed = true;
		if(this._value != null) this._injector.destroyInstance(this._value);
		this._injector = null;
		this._value = null;
	}
	,__class__: hex_di_provider_SingletonProvider
};
var hex_di_provider_ValueProvider = function(value,injector) {
	this._value = value;
	this._injector = injector;
};
$hxClasses["hex.di.provider.ValueProvider"] = hex_di_provider_ValueProvider;
hex_di_provider_ValueProvider.__name__ = ["hex","di","provider","ValueProvider"];
hex_di_provider_ValueProvider.__interfaces__ = [hex_di_provider_IDependencyProvider];
hex_di_provider_ValueProvider.prototype = {
	getResult: function(injector) {
		return this._value;
	}
	,destroy: function() {
		this._injector.destroyInstance(this._value);
		this._injector = null;
		this._value = null;
	}
	,__class__: hex_di_provider_ValueProvider
};
var hex_di_reflect_ArgumentInjectionVO = function(type,injectionName,isOptional) {
	if(isOptional == null) isOptional = false;
	this.isOptional = false;
	this.type = type;
	this.injectionName = injectionName;
	this.isOptional = isOptional;
};
$hxClasses["hex.di.reflect.ArgumentInjectionVO"] = hex_di_reflect_ArgumentInjectionVO;
hex_di_reflect_ArgumentInjectionVO.__name__ = ["hex","di","reflect","ArgumentInjectionVO"];
hex_di_reflect_ArgumentInjectionVO.prototype = {
	__class__: hex_di_reflect_ArgumentInjectionVO
};
var hex_di_reflect_ClassDescription = function(constructorInjection,injections,postConstruct,preDestroy) {
	this.constructorInjection = constructorInjection;
	this.injections = injections;
	this.postConstruct = postConstruct;
	this.preDestroy = preDestroy;
	if(this.postConstruct.length > 0) haxe_ds_ArraySort.sort(this.postConstruct,$bind(this,this._sort));
	if(this.preDestroy.length > 0) haxe_ds_ArraySort.sort(this.preDestroy,$bind(this,this._sort));
};
$hxClasses["hex.di.reflect.ClassDescription"] = hex_di_reflect_ClassDescription;
hex_di_reflect_ClassDescription.__name__ = ["hex","di","reflect","ClassDescription"];
hex_di_reflect_ClassDescription.__interfaces__ = [hex_di_IInjectable];
hex_di_reflect_ClassDescription.prototype = {
	_sort: function(a,b) {
		return a.order - b.order;
	}
	,applyInjection: function(target,injector) {
		var _g = 0;
		var _g1 = this.injections;
		while(_g < _g1.length) {
			var injection = _g1[_g];
			++_g;
			injection.applyInjection(target,injector);
		}
		var _g2 = 0;
		var _g11 = this.postConstruct;
		while(_g2 < _g11.length) {
			var injection1 = _g11[_g2];
			++_g2;
			injection1.applyInjection(target,injector);
		}
		return target;
	}
	,__class__: hex_di_reflect_ClassDescription
};
var hex_di_reflect_IClassDescriptionProvider = function() { };
$hxClasses["hex.di.reflect.IClassDescriptionProvider"] = hex_di_reflect_IClassDescriptionProvider;
hex_di_reflect_IClassDescriptionProvider.__name__ = ["hex","di","reflect","IClassDescriptionProvider"];
hex_di_reflect_IClassDescriptionProvider.prototype = {
	__class__: hex_di_reflect_IClassDescriptionProvider
};
var hex_di_reflect_ClassDescriptionProvider = function(classAnnotationDataProvider) {
	this._classAnnotationDataProvider = classAnnotationDataProvider;
	this._classDescription = new hex_collection_HashMap();
};
$hxClasses["hex.di.reflect.ClassDescriptionProvider"] = hex_di_reflect_ClassDescriptionProvider;
hex_di_reflect_ClassDescriptionProvider.__name__ = ["hex","di","reflect","ClassDescriptionProvider"];
hex_di_reflect_ClassDescriptionProvider.__interfaces__ = [hex_di_reflect_IClassDescriptionProvider];
hex_di_reflect_ClassDescriptionProvider.prototype = {
	getClassDescription: function(type) {
		if(this._classDescription.containsKey(type)) return this._classDescription.get(type); else return this._getClassDescription(type);
	}
	,_getClassDescription: function(type) {
		var classAnnotationData = this._classAnnotationDataProvider.getClassAnnotationData(type);
		if(classAnnotationData != null) {
			var injections = [];
			var postConstruct = [];
			var preDestroy = [];
			var _g = 0;
			var _g1 = classAnnotationData.props;
			while(_g < _g1.length) {
				var prop = _g1[_g];
				++_g;
				injections.push(new hex_di_reflect_PropertyInjection(prop.name,prop.type,prop.key,prop.isOpt));
			}
			var _g2 = 0;
			var _g11 = classAnnotationData.methods;
			while(_g2 < _g11.length) {
				var method = _g11[_g2];
				++_g2;
				var $arguments = [];
				var _g21 = 0;
				var _g3 = method.args;
				while(_g21 < _g3.length) {
					var arg = _g3[_g21];
					++_g21;
					$arguments.push(new hex_di_reflect_ArgumentInjectionVO(Type.resolveClass(arg.type),arg.key,arg.isOpt));
				}
				if(method.isPost) postConstruct.push(new hex_di_reflect_OrderedInjection(method.name,$arguments,method.order)); else if(method.isPre) preDestroy.push(new hex_di_reflect_OrderedInjection(method.name,$arguments,method.order)); else injections.push(new hex_di_reflect_MethodInjection(method.name,$arguments));
			}
			var ctor = classAnnotationData.ctor;
			var ctorArguments = [];
			var _g4 = 0;
			var _g12 = ctor.args;
			while(_g4 < _g12.length) {
				var arg1 = _g12[_g4];
				++_g4;
				ctorArguments.push(new hex_di_reflect_ArgumentInjectionVO(Type.resolveClass(arg1.type),arg1.key,arg1.isOpt));
			}
			var constructorInjection = new hex_di_reflect_ConstructorInjection(ctorArguments);
			var classDescription = new hex_di_reflect_ClassDescription(constructorInjection,injections,postConstruct,preDestroy);
			return classDescription;
		} else return null;
	}
	,__class__: hex_di_reflect_ClassDescriptionProvider
};
var hex_di_reflect_MethodInjection = function(methodName,args) {
	this.methodName = methodName;
	this.args = args;
};
$hxClasses["hex.di.reflect.MethodInjection"] = hex_di_reflect_MethodInjection;
hex_di_reflect_MethodInjection.__name__ = ["hex","di","reflect","MethodInjection"];
hex_di_reflect_MethodInjection.__interfaces__ = [hex_di_IInjectable];
hex_di_reflect_MethodInjection.prototype = {
	applyInjection: function(target,injector) {
		Reflect.callMethod(target,Reflect.field(target,this.methodName),this._gatherArgs(target,injector));
		return target;
	}
	,_gatherArgs: function(target,injector) {
		var args = [];
		var _g = 0;
		var _g1 = this.args;
		while(_g < _g1.length) {
			var arg = _g1[_g];
			++_g;
			var provider = injector.getProvider(arg.type,arg.injectionName);
			if(provider != null) args.push(provider.getResult(injector)); else if(!arg.isOptional) this._throwMissingMappingException(target,arg.type,arg.injectionName,injector);
		}
		return args;
	}
	,_throwMissingMappingException: function(target,type,injectionName,injector) {
		throw new js__$Boot_HaxeError(new hex_di_error_MissingMappingException("'" + hex_log_Stringifier.stringify(injector) + "' is missing a mapping to inject argument into method named '" + this.methodName + "' with type '" + Type.getClassName(type) + "' inside instance of '" + hex_log_Stringifier.stringify(target) + "'. Target dependency: '" + Type.getClassName(type) + "|" + injectionName + "'",{ fileName : "MethodInjection.hx", lineNumber : 52, className : "hex.di.reflect.MethodInjection", methodName : "_throwMissingMappingException"}));
	}
	,__class__: hex_di_reflect_MethodInjection
};
var hex_di_reflect_ConstructorInjection = function(args) {
	hex_di_reflect_MethodInjection.call(this,"new",args);
};
$hxClasses["hex.di.reflect.ConstructorInjection"] = hex_di_reflect_ConstructorInjection;
hex_di_reflect_ConstructorInjection.__name__ = ["hex","di","reflect","ConstructorInjection"];
hex_di_reflect_ConstructorInjection.__super__ = hex_di_reflect_MethodInjection;
hex_di_reflect_ConstructorInjection.prototype = $extend(hex_di_reflect_MethodInjection.prototype,{
	createInstance: function(type,injector) {
		return Type.createInstance(type,this._gatherArgs(type,injector));
	}
	,_throwMissingMappingException: function(target,type,injectionName,injector) {
		throw new js__$Boot_HaxeError(new hex_di_error_MissingMappingException("'" + hex_log_Stringifier.stringify(injector) + "' is missing a mapping to inject argument" + " with type '" + Type.getClassName(type) + "' into constructor of class '" + hex_log_Stringifier.stringify(target) + "'. Target dependency: '" + Type.getClassName(type) + "|" + injectionName + "'",{ fileName : "ConstructorInjection.hx", lineNumber : 26, className : "hex.di.reflect.ConstructorInjection", methodName : "_throwMissingMappingException"}));
	}
	,__class__: hex_di_reflect_ConstructorInjection
});
var hex_di_reflect_OrderedInjection = function(methodName,args,order) {
	if(order == null) order = 0;
	hex_di_reflect_MethodInjection.call(this,methodName,args);
	this.order = order;
};
$hxClasses["hex.di.reflect.OrderedInjection"] = hex_di_reflect_OrderedInjection;
hex_di_reflect_OrderedInjection.__name__ = ["hex","di","reflect","OrderedInjection"];
hex_di_reflect_OrderedInjection.__super__ = hex_di_reflect_MethodInjection;
hex_di_reflect_OrderedInjection.prototype = $extend(hex_di_reflect_MethodInjection.prototype,{
	__class__: hex_di_reflect_OrderedInjection
});
var hex_di_reflect_PropertyInjection = function(propertyName,propertyType,injectionName,isOptional) {
	if(isOptional == null) isOptional = false;
	if(injectionName == null) injectionName = "";
	this.propertyName = propertyName;
	this.propertyType = Type.resolveClass(propertyType);
	this.injectionName = injectionName;
	this.isOptional = isOptional;
};
$hxClasses["hex.di.reflect.PropertyInjection"] = hex_di_reflect_PropertyInjection;
hex_di_reflect_PropertyInjection.__name__ = ["hex","di","reflect","PropertyInjection"];
hex_di_reflect_PropertyInjection.__interfaces__ = [hex_di_IInjectable];
hex_di_reflect_PropertyInjection.prototype = {
	applyInjection: function(target,injector) {
		var provider = injector.getProvider(this.propertyType,this.injectionName);
		if(provider != null) Reflect.setProperty(target,this.propertyName,provider.getResult(injector)); else if(!this.isOptional) throw new js__$Boot_HaxeError(new hex_di_error_MissingMappingException("'" + hex_log_Stringifier.stringify(injector) + "' is missing a mapping to inject into property named '" + this.propertyName + "' with type '" + Type.getClassName(this.propertyType) + "' inside instance of '" + hex_log_Stringifier.stringify(target) + "'. Target dependency: '" + Type.getClassName(this.propertyType) + "|" + this.injectionName + "'",{ fileName : "PropertyInjection.hx", lineNumber : 37, className : "hex.di.reflect.PropertyInjection", methodName : "applyInjection"}));
		return target;
	}
	,__class__: hex_di_reflect_PropertyInjection
};
var hex_domain_IDomainDispatcher = function() { };
$hxClasses["hex.domain.IDomainDispatcher"] = hex_domain_IDomainDispatcher;
hex_domain_IDomainDispatcher.__name__ = ["hex","domain","IDomainDispatcher"];
hex_domain_IDomainDispatcher.prototype = {
	__class__: hex_domain_IDomainDispatcher
};
var hex_domain_DomainDispatcher = function(defaultDomain,dispatcherClass) {
	this.clear();
	this.setDefaultDomain(defaultDomain);
	this.setDispatcherClass(dispatcherClass);
};
$hxClasses["hex.domain.DomainDispatcher"] = hex_domain_DomainDispatcher;
hex_domain_DomainDispatcher.__name__ = ["hex","domain","DomainDispatcher"];
hex_domain_DomainDispatcher.__interfaces__ = [hex_domain_IDomainDispatcher];
hex_domain_DomainDispatcher.prototype = {
	setDispatcherClass: function(dispatcherClass) {
		if(dispatcherClass != null) this._dispatcherClass = dispatcherClass; else this._dispatcherClass = hex_event_Dispatcher;
	}
	,getDefaultDispatcher: function() {
		return this._domains.h[this._defaultDomain.__id__];
	}
	,getDefaultDomain: function() {
		return this._defaultDomain;
	}
	,setDefaultDomain: function(domain) {
		if(domain == null) this._defaultDomain = hex_domain_DefaultDomain.DOMAIN; else this._defaultDomain = domain;
		this.getDomainDispatcher(this.getDefaultDomain());
	}
	,clear: function() {
		this._domains = new haxe_ds_ObjectMap();
		var domain = this.getDefaultDomain();
		if(domain != null) this.getDomainDispatcher(domain);
	}
	,isRegistered: function(listener,messageType,domain) {
		if(this.hasChannelDispatcher(domain)) return this.getDomainDispatcher(domain).isRegistered(listener,messageType); else return false;
	}
	,hasChannelDispatcher: function(domain) {
		if(domain == null) return this._domains.h.__keys__[this._defaultDomain.__id__] != null; else return this._domains.h.__keys__[domain.__id__] != null;
	}
	,getDomainDispatcher: function(domain) {
		if(this.hasChannelDispatcher(domain)) if(domain == null) return this._domains.h[this._defaultDomain.__id__]; else return this._domains.h[domain.__id__]; else {
			var dispatcher = new hex_event_Dispatcher();
			this._domains.set(domain,dispatcher);
			return dispatcher;
		}
	}
	,releaseDomainDispatcher: function(domain) {
		if(this.hasChannelDispatcher(domain)) {
			this._domains.h[domain.__id__].removeAllListeners();
			this._domains.remove(domain);
			return true;
		} else return false;
	}
	,addListener: function(listener,domain) {
		return this.getDomainDispatcher(domain).addListener(listener);
	}
	,removeListener: function(listener,domain) {
		return this.getDomainDispatcher(domain).removeListener(listener);
	}
	,addHandler: function(messageType,scope,callback,domain) {
		return this.getDomainDispatcher(domain).addHandler(messageType,scope,callback);
	}
	,removeHandler: function(messageType,scope,callback,domain) {
		return this.getDomainDispatcher(domain).removeHandler(messageType,scope,callback);
	}
	,dispatch: function(messageType,domain,data) {
		this.getDomainDispatcher(domain).dispatch(messageType,data);
		if(domain != this._defaultDomain && domain != null) this.getDefaultDispatcher().dispatch(messageType,data);
	}
	,removeAllListeners: function() {
		var iterator = this._domains.keys();
		while(iterator.hasNext()) ((function($this) {
			var $r;
			var key = iterator.next();
			$r = $this._domains.h[key.__id__];
			return $r;
		}(this))).removeAllListeners();
		this.clear();
	}
	,__class__: hex_domain_DomainDispatcher
};
var hex_domain_IApplicationDomainDispatcher = function() { };
$hxClasses["hex.domain.IApplicationDomainDispatcher"] = hex_domain_IApplicationDomainDispatcher;
hex_domain_IApplicationDomainDispatcher.__name__ = ["hex","domain","IApplicationDomainDispatcher"];
hex_domain_IApplicationDomainDispatcher.__interfaces__ = [hex_domain_IDomainDispatcher];
var hex_domain_Domain = function(domainName) {
	if(domainName == null) throw new js__$Boot_HaxeError(new hex_error_NullPointerException("Domain's name can't be null",{ fileName : "Domain.hx", lineNumber : 20, className : "hex.domain.Domain", methodName : "new"})); else if(hex_domain_Domain._domainNames.exists(domainName)) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("Domain has already been registered with name '" + domainName + "'",{ fileName : "Domain.hx", lineNumber : 24, className : "hex.domain.Domain", methodName : "new"})); else {
		hex_domain_Domain._domainNames.set(domainName,this);
		this._domainName = domainName;
	}
};
$hxClasses["hex.domain.Domain"] = hex_domain_Domain;
hex_domain_Domain.__name__ = ["hex","domain","Domain"];
hex_domain_Domain.getDomain = function(domainName) {
	if(!hex_domain_Domain._domainNames.exists(domainName)) return null; else return hex_domain_Domain._domainNames.get(domainName);
};
hex_domain_Domain.prototype = {
	getName: function() {
		return this._domainName;
	}
	,toString: function() {
		return hex_log_Stringifier.stringify(this) + " with name '" + this.getName() + "'";
	}
	,__class__: hex_domain_Domain
};
var hex_domain_DomainUtil = function() {
};
$hxClasses["hex.domain.DomainUtil"] = hex_domain_DomainUtil;
hex_domain_DomainUtil.__name__ = ["hex","domain","DomainUtil"];
hex_domain_DomainUtil.getDomain = function(domainName,type) {
	var domain = null;
	if(hex_domain_DomainUtil._domain.exists(domainName)) domain = hex_domain_DomainUtil._domain.get(domainName); else {
		domain = Type.createInstance(type,[domainName]);
		hex_domain_DomainUtil._domain.set(domainName,domain);
	}
	return domain;
};
hex_domain_DomainUtil.prototype = {
	__class__: hex_domain_DomainUtil
};
var hex_domain_TopLevelDomain = function(domainName) {
	hex_domain_Domain.call(this,domainName);
};
$hxClasses["hex.domain.TopLevelDomain"] = hex_domain_TopLevelDomain;
hex_domain_TopLevelDomain.__name__ = ["hex","domain","TopLevelDomain"];
hex_domain_TopLevelDomain.__super__ = hex_domain_Domain;
hex_domain_TopLevelDomain.prototype = $extend(hex_domain_Domain.prototype,{
	__class__: hex_domain_TopLevelDomain
});
var hex_event_IObservable = function() { };
$hxClasses["hex.event.IObservable"] = hex_event_IObservable;
hex_event_IObservable.__name__ = ["hex","event","IObservable"];
hex_event_IObservable.prototype = {
	__class__: hex_event_IObservable
};
var hex_event_IDispatcher = function() { };
$hxClasses["hex.event.IDispatcher"] = hex_event_IDispatcher;
hex_event_IDispatcher.__name__ = ["hex","event","IDispatcher"];
hex_event_IDispatcher.__interfaces__ = [hex_event_IObservable];
hex_event_IDispatcher.prototype = {
	__class__: hex_event_IDispatcher
};
var hex_event_Dispatcher = function() {
	this._isSealed = false;
	this._cachedMethodCalls = [];
	this._listeners = new haxe_ds_ObjectMap();
};
$hxClasses["hex.event.Dispatcher"] = hex_event_Dispatcher;
hex_event_Dispatcher.__name__ = ["hex","event","Dispatcher"];
hex_event_Dispatcher.__interfaces__ = [hex_event_IDispatcher];
hex_event_Dispatcher.prototype = {
	dispatch: function(messageType,data) {
		this._seal(true);
		var parameters = null;
		var iterator = this._listeners.keys();
		while(iterator.hasNext()) {
			var listener = iterator.next();
			var m = this._listeners.h[listener.__id__];
			if(Lambda.count(m) > 0) {
				if(m.h.__keys__[messageType.__id__] != null) {
					var handler = m.h[messageType.__id__];
					handler.call(data);
				}
			} else {
				var messageName = messageType.name;
				var callback = Reflect.field(listener,messageName);
				if(callback != null && messageName != "handleMessage") callback.apply(listener,data); else {
					callback = Reflect.field(listener,"handleMessage");
					if(callback != null) {
						if(parameters == null) {
							parameters = [messageType];
							if(data != null) parameters = parameters.concat(data);
						}
						callback.apply(listener,parameters);
					} else {
						var msg = hex_log_Stringifier.stringify(this) + ".dispatch failed. " + " You must implement '" + messageType.name + "' or 'handleMessage' method in '" + hex_log_Stringifier.stringify(listener) + "' instance.";
						throw new js__$Boot_HaxeError(new hex_error_UnsupportedOperationException(msg,{ fileName : "Dispatcher.hx", lineNumber : 74, className : "hex.event.Dispatcher", methodName : "dispatch"}));
					}
				}
			}
		}
		this._seal(false);
	}
	,addHandler: function(messageType,scope,callback) {
		if(!this._isSealed) {
			if((function($this) {
				var $r;
				var key = scope;
				$r = $this._listeners.h.__keys__[key.__id__] != null;
				return $r;
			}(this))) {
				var m;
				var key1 = scope;
				m = this._listeners.h[key1.__id__];
				if(Lambda.count(m) == 0) {
					var msg = hex_log_Stringifier.stringify(this) + ".addHandler failed. " + hex_log_Stringifier.stringify(scope) + " is already registered for all message types.";
					throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(msg,{ fileName : "Dispatcher.hx", lineNumber : 95, className : "hex.event.Dispatcher", methodName : "addHandler"}));
				} else if(m.h.__keys__[messageType.__id__] != null) {
					var handler = m.h[messageType.__id__];
					return handler.add(callback);
				} else {
					var handler1 = new hex_event_CallbackHandler(scope,callback);
					m.set(messageType,handler1);
					return true;
				}
			} else {
				var m1 = new haxe_ds_ObjectMap();
				var handler2 = new hex_event_CallbackHandler(scope,callback);
				m1.set(messageType,handler2);
				var key2 = scope;
				this._listeners.set(key2,m1);
				return true;
			}
		} else {
			this._cachedMethodCalls.push((function(f,a1,a2,a3) {
				return function() {
					return f(a1,a2,a3);
				};
			})($bind(this,this.addHandler),messageType,scope,callback));
			return false;
		}
	}
	,removeHandler: function(messageType,scope,callback) {
		if(!this._isSealed) {
			if((function($this) {
				var $r;
				var key = scope;
				$r = $this._listeners.h.__keys__[key.__id__] != null;
				return $r;
			}(this))) {
				var m;
				var key1 = scope;
				m = this._listeners.h[key1.__id__];
				if(Lambda.count(m) == 0) {
					var msg = hex_log_Stringifier.stringify(this) + ".removeHandler failed. " + hex_log_Stringifier.stringify(scope) + " is registered for all message types." + " Use 'removeListener' to unsubscribe.";
					throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(msg,{ fileName : "Dispatcher.hx", lineNumber : 139, className : "hex.event.Dispatcher", methodName : "removeHandler"}));
				} else if(m.h.__keys__[messageType.__id__] != null) {
					var handler = m.h[messageType.__id__];
					var b = handler.remove(callback);
					if(handler.isEmpty()) {
						m.remove(messageType);
						if(Lambda.count(m) == 0) {
							var key2 = scope;
							this._listeners.remove(key2);
						}
					}
					return b;
				} else return false;
			} else return false;
		} else {
			this._cachedMethodCalls.push((function(f,a1,a2,a3) {
				return function() {
					return f(a1,a2,a3);
				};
			})($bind(this,this.removeHandler),messageType,scope,callback));
			return false;
		}
	}
	,addListener: function(listener) {
		if(!this._isSealed) {
			if(this._listeners.h.__keys__[listener.__id__] != null) {
				var m = this._listeners.h[listener.__id__];
				if(Lambda.count(m) > 0) {
					var msg = hex_log_Stringifier.stringify(this) + ".addListener failed. " + hex_log_Stringifier.stringify(listener) + " is already registered to ";
					var iterator = m.keys();
					while(iterator.hasNext()) msg += "'" + Std.string(iterator.next()) + "' ";
					msg += "message types.";
					throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(msg,{ fileName : "Dispatcher.hx", lineNumber : 192, className : "hex.event.Dispatcher", methodName : "addListener"}));
				} else return false;
			} else {
				var value = new haxe_ds_ObjectMap();
				this._listeners.set(listener,value);
				return true;
			}
		} else {
			this._cachedMethodCalls.push((function(f,a1) {
				return function() {
					return f(a1);
				};
			})($bind(this,this.addListener),listener));
			return false;
		}
	}
	,removeListener: function(listener) {
		if(!this._isSealed) {
			if(this._listeners.h.__keys__[listener.__id__] != null) {
				this._listeners.remove(listener);
				return true;
			} else return false;
		} else {
			this._cachedMethodCalls.push((function(f,a1) {
				return function() {
					return f(a1);
				};
			})($bind(this,this.removeListener),listener));
			return false;
		}
	}
	,removeAllListeners: function() {
		if(!this._isSealed) this._listeners = new haxe_ds_ObjectMap(); else this._cachedMethodCalls.push((function(f) {
			return function() {
				f();
			};
		})($bind(this,this.removeAllListeners)));
	}
	,isEmpty: function() {
		return Lambda.count(this._listeners) == 0;
	}
	,isRegistered: function(listener,messageType) {
		if(this._listeners.h.__keys__[listener.__id__] != null) {
			if(messageType == null) return true; else {
				var m = this._listeners.h[listener.__id__];
				return m.h.__keys__[messageType.__id__] != null;
			}
		} else return false;
	}
	,hasHandler: function(messageType,scope) {
		if(scope == null) {
			var iterator = this._listeners.keys();
			while(iterator.hasNext()) {
				var listener = iterator.next();
				var m = this._listeners.h[listener.__id__];
				if(Lambda.count(m) == 0) return true; else if(m.h.__keys__[messageType.__id__] != null) return true;
			}
			return false;
		} else if((function($this) {
			var $r;
			var key = scope;
			$r = $this._listeners.h.__keys__[key.__id__] != null;
			return $r;
		}(this))) {
			var m1;
			var key1 = scope;
			m1 = this._listeners.h[key1.__id__];
			if(Lambda.count(m1) == 0) return true; else if(m1.h.__keys__[messageType.__id__] != null) return true;
			return false;
		} else return false;
	}
	,_seal: function(isSealed) {
		if(isSealed != this._isSealed) {
			this._isSealed = isSealed;
			if(!this._isSealed && this._cachedMethodCalls.length > 0) {
				var _g = 0;
				var _g1 = this._cachedMethodCalls;
				while(_g < _g1.length) {
					var cachedMethodCall = _g1[_g];
					++_g;
					cachedMethodCall();
				}
				this._cachedMethodCalls = [];
			}
		}
	}
	,__class__: hex_event_Dispatcher
};
var hex_domain_ApplicationDomainDispatcher = function() {
	hex_domain_DomainDispatcher.call(this,hex_domain_TopLevelDomain.DOMAIN,hex_event_Dispatcher);
};
$hxClasses["hex.domain.ApplicationDomainDispatcher"] = hex_domain_ApplicationDomainDispatcher;
hex_domain_ApplicationDomainDispatcher.__name__ = ["hex","domain","ApplicationDomainDispatcher"];
hex_domain_ApplicationDomainDispatcher.__interfaces__ = [hex_domain_IApplicationDomainDispatcher];
hex_domain_ApplicationDomainDispatcher.getInstance = function() {
	return hex_domain_ApplicationDomainDispatcher._Instance;
};
hex_domain_ApplicationDomainDispatcher.__super__ = hex_domain_DomainDispatcher;
hex_domain_ApplicationDomainDispatcher.prototype = $extend(hex_domain_DomainDispatcher.prototype,{
	getDomainDispatcher: function(domain) {
		if(domain != hex_domain_NoDomain.DOMAIN) return hex_domain_DomainDispatcher.prototype.getDomainDispatcher.call(this,domain); else return null;
	}
	,__class__: hex_domain_ApplicationDomainDispatcher
});
var hex_domain_DefaultDomain = function(domainName) {
	hex_domain_Domain.call(this,domainName);
};
$hxClasses["hex.domain.DefaultDomain"] = hex_domain_DefaultDomain;
hex_domain_DefaultDomain.__name__ = ["hex","domain","DefaultDomain"];
hex_domain_DefaultDomain.__super__ = hex_domain_Domain;
hex_domain_DefaultDomain.prototype = $extend(hex_domain_Domain.prototype,{
	__class__: hex_domain_DefaultDomain
});
var hex_domain_DomainExpert = function() {
	this._registeredDomains = new haxe_ds_IntMap();
	this._subscribedModules = new haxe_ds_ObjectMap();
	this._removedModules = new haxe_ds_StringMap();
};
$hxClasses["hex.domain.DomainExpert"] = hex_domain_DomainExpert;
hex_domain_DomainExpert.__name__ = ["hex","domain","DomainExpert"];
hex_domain_DomainExpert.getInstance = function() {
	return hex_domain_DomainExpert._Instance;
};
hex_domain_DomainExpert.prototype = {
	getDomainFor: function(module) {
		if(!(this._subscribedModules.h.__keys__[module.__id__] != null)) {
			if(this._registeredDomains.h.hasOwnProperty(hex_domain_DomainExpert._DomainIndex)) {
				var moduleDomain = this._registeredDomains.h[hex_domain_DomainExpert._DomainIndex];
				this._registeredDomains.remove(hex_domain_DomainExpert._DomainIndex);
				hex_domain_DomainExpert._DomainIndex++;
				var key = moduleDomain.getName();
				this._removedModules.set(key,false);
				this._subscribedModules.set(module,moduleDomain);
				return moduleDomain;
			} else {
				var key1 = Type.getClassName(module == null?null:js_Boot.getClass(module)) + hex_core_HashCodeFactory.getKey(module);
				if(this._removedModules.exists(key1) && this._removedModules.get(key1)) return null; else {
					var domain = hex_domain_DomainUtil.getDomain(key1,hex_domain_Domain);
					this._removedModules.set(key1,false);
					this._subscribedModules.set(module,domain);
					return domain;
				}
			}
		} else return this._subscribedModules.h[module.__id__];
	}
	,registerDomain: function(domain) {
		this._registeredDomains.h[hex_domain_DomainExpert._DomainIndex] = domain;
	}
	,releaseDomain: function(module) {
		if(module.get_isReleased()) {
			var key = Type.getClassName(module == null?null:js_Boot.getClass(module)) + hex_core_HashCodeFactory.getKey(module);
			if(this._removedModules.exists(key)) this._removedModules.set(key,true); else {
				var key1 = module.getDomain().getName();
				this._removedModules.set(key1,true);
			}
			this._subscribedModules.remove(module);
		} else throw new js__$Boot_HaxeError(new hex_error_IllegalStateException("Illegal call, '" + Std.string(module) + "' is not released.",{ fileName : "DomainExpert.hx", lineNumber : 93, className : "hex.domain.DomainExpert", methodName : "releaseDomain"}));
	}
	,__class__: hex_domain_DomainExpert
};
var hex_domain_NoDomain = function(domainName) {
	hex_domain_Domain.call(this,domainName);
};
$hxClasses["hex.domain.NoDomain"] = hex_domain_NoDomain;
hex_domain_NoDomain.__name__ = ["hex","domain","NoDomain"];
hex_domain_NoDomain.__super__ = hex_domain_Domain;
hex_domain_NoDomain.prototype = $extend(hex_domain_Domain.prototype,{
	__class__: hex_domain_NoDomain
});
var hex_error_IllegalArgumentException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.error.IllegalArgumentException"] = hex_error_IllegalArgumentException;
hex_error_IllegalArgumentException.__name__ = ["hex","error","IllegalArgumentException"];
hex_error_IllegalArgumentException.__super__ = hex_error_Exception;
hex_error_IllegalArgumentException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_error_IllegalArgumentException
});
var hex_error_IllegalStateException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.error.IllegalStateException"] = hex_error_IllegalStateException;
hex_error_IllegalStateException.__name__ = ["hex","error","IllegalStateException"];
hex_error_IllegalStateException.__super__ = hex_error_Exception;
hex_error_IllegalStateException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_error_IllegalStateException
});
var hex_error_NoSuchElementException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.error.NoSuchElementException"] = hex_error_NoSuchElementException;
hex_error_NoSuchElementException.__name__ = ["hex","error","NoSuchElementException"];
hex_error_NoSuchElementException.__super__ = hex_error_Exception;
hex_error_NoSuchElementException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_error_NoSuchElementException
});
var hex_error_NullPointerException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.error.NullPointerException"] = hex_error_NullPointerException;
hex_error_NullPointerException.__name__ = ["hex","error","NullPointerException"];
hex_error_NullPointerException.__super__ = hex_error_Exception;
hex_error_NullPointerException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_error_NullPointerException
});
var hex_error_PrivateConstructorException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.error.PrivateConstructorException"] = hex_error_PrivateConstructorException;
hex_error_PrivateConstructorException.__name__ = ["hex","error","PrivateConstructorException"];
hex_error_PrivateConstructorException.__super__ = hex_error_Exception;
hex_error_PrivateConstructorException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_error_PrivateConstructorException
});
var hex_error_UnsupportedOperationException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.error.UnsupportedOperationException"] = hex_error_UnsupportedOperationException;
hex_error_UnsupportedOperationException.__name__ = ["hex","error","UnsupportedOperationException"];
hex_error_UnsupportedOperationException.__super__ = hex_error_Exception;
hex_error_UnsupportedOperationException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_error_UnsupportedOperationException
});
var hex_error_VirtualMethodException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.error.VirtualMethodException"] = hex_error_VirtualMethodException;
hex_error_VirtualMethodException.__name__ = ["hex","error","VirtualMethodException"];
hex_error_VirtualMethodException.__super__ = hex_error_Exception;
hex_error_VirtualMethodException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_error_VirtualMethodException
});
var hex_event_BasicHandler = function(scope,callback) {
	this.scope = scope;
	this.callback = callback;
};
$hxClasses["hex.event.BasicHandler"] = hex_event_BasicHandler;
hex_event_BasicHandler.__name__ = ["hex","event","BasicHandler"];
hex_event_BasicHandler.prototype = {
	__class__: hex_event_BasicHandler
};
var hex_event_CallbackHandler = function(scope,callback) {
	this.callbacks = [];
	this.scope = scope;
	this.callbacks.push(callback);
};
$hxClasses["hex.event.CallbackHandler"] = hex_event_CallbackHandler;
hex_event_CallbackHandler.__name__ = ["hex","event","CallbackHandler"];
hex_event_CallbackHandler.prototype = {
	call: function(data) {
		var _g = 0;
		var _g1 = this.callbacks;
		while(_g < _g1.length) {
			var callback = _g1[_g];
			++_g;
			Reflect.callMethod(this.scope,callback,data);
		}
	}
	,add: function(callback) {
		if((function($this) {
			var $r;
			var x = callback;
			$r = HxOverrides.indexOf($this.callbacks,x,0);
			return $r;
		}(this)) == -1) {
			this.callbacks.push(callback);
			return true;
		} else return false;
	}
	,remove: function(callback) {
		var index;
		var x = callback;
		index = HxOverrides.indexOf(this.callbacks,x,0);
		if(index != -1) {
			this.callbacks.splice(index,1);
			return true;
		} else return false;
	}
	,isEmpty: function() {
		return this.callbacks.length == 0;
	}
	,__class__: hex_event_CallbackHandler
};
var hex_event_ClassAdapter = function() {
};
$hxClasses["hex.event.ClassAdapter"] = hex_event_ClassAdapter;
hex_event_ClassAdapter.__name__ = ["hex","event","ClassAdapter"];
hex_event_ClassAdapter.prototype = {
	setCallBackMethod: function(callbackTarget,callbackMethod) {
		this._callbackTarget = callbackTarget;
		this._callbackMethod = callbackMethod;
	}
	,setAdapterClass: function(adapterClass,adapterMethodName) {
		if(adapterMethodName == null) adapterMethodName = "adapt";
		this._adapterClass = adapterClass;
		this._adapterMethodName = adapterMethodName;
	}
	,setFactoryMethod: function(factoryTarget,factoryMethod) {
		this._factoryTarget = factoryTarget;
		this._factoryMethod = factoryMethod;
	}
	,setAnnotationProvider: function(annotationProvider) {
		this._annotationProvider = annotationProvider;
	}
	,getCallbackAdapter: function() {
		var annotationProvider = this._annotationProvider;
		var callbackTarget = this._callbackTarget;
		var callbackMethod = this._callbackMethod;
		var adapterInstance = null;
		var adapterClass = null;
		var adapterMethodName = this._adapterMethodName;
		var factoryTarget = null;
		var factoryMethod = null;
		var isEventAdapterStrategyMacro = false;
		if(this._adapterClass != null) {
			adapterClass = this._adapterClass;
			factoryTarget = this._factoryTarget;
			factoryMethod = this._factoryMethod;
			isEventAdapterStrategyMacro = hex_util_ClassUtil.classExtendsOrImplements(this._adapterClass,hex_event_MacroAdapterStrategy);
			if(!isEventAdapterStrategyMacro) adapterInstance = this._factoryMethod != null?this._adapterInstance = this._factoryMethod(this._adapterClass):this._adapterInstance = Type.createInstance(this._adapterClass,[]);
		}
		var f = function(rest) {
			var result = null;
			if(isEventAdapterStrategyMacro) {
				var aSyncCommand;
				if(factoryTarget != null && factoryMethod != null) aSyncCommand = factoryMethod(adapterClass); else aSyncCommand = Type.createInstance(adapterClass,[]);
				if(!js_Boot.__instanceof(aSyncCommand,hex_event_IAdapterStrategy)) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("adapterInstance class should extend AdapterStrategy. Check if you passed the correct class",{ fileName : "ClassAdapter.hx", lineNumber : 108, className : "hex.event.ClassAdapter", methodName : "getCallbackAdapter"}));
				if(js_Boot.__instanceof(aSyncCommand,hex_core_IAnnotationParsable)) annotationProvider.parse(aSyncCommand);
				adapterInstance = aSyncCommand;
				$bind(aSyncCommand,aSyncCommand.adapt).apply(aSyncCommand,rest);
				aSyncCommand.preExecute();
				var handler = new hex_event__$ClassAdapter_MacroAdapterStrategyHandler(callbackTarget,callbackMethod);
				aSyncCommand.addCompleteHandler(handler,$bind(handler,handler.onAsyncCommandComplete));
				aSyncCommand.execute();
				return;
			} else if(adapterInstance != null) {
				if(js_Boot.__instanceof(adapterInstance,hex_core_IAnnotationParsable)) annotationProvider.parse(adapterInstance);
				if(adapterMethodName == "adapt") result = Reflect.callMethod(adapterInstance,adapterInstance.adapt,rest); else result = Reflect.callMethod(adapterInstance,Reflect.field(adapterInstance,adapterMethodName),rest);
			}
			Reflect.callMethod(callbackTarget,callbackMethod,(result instanceof Array) && result.__enum__ == null?result:[result]);
		};
		return Reflect.makeVarArgs(f);
	}
	,__class__: hex_event_ClassAdapter
};
var hex_event__$ClassAdapter_MacroAdapterStrategyHandler = function(scope,callback) {
	this.scope = scope;
	this.callback = callback;
};
$hxClasses["hex.event._ClassAdapter.MacroAdapterStrategyHandler"] = hex_event__$ClassAdapter_MacroAdapterStrategyHandler;
hex_event__$ClassAdapter_MacroAdapterStrategyHandler.__name__ = ["hex","event","_ClassAdapter","MacroAdapterStrategyHandler"];
hex_event__$ClassAdapter_MacroAdapterStrategyHandler.prototype = {
	onAsyncCommandComplete: function(command) {
		if(this.callback != null) Reflect.callMethod(this.scope,this.callback,[command.getResult()]);
	}
	,__class__: hex_event__$ClassAdapter_MacroAdapterStrategyHandler
};
var hex_event_CompositeDispatcher = function() {
	this._isSealed = false;
	this._cachedMethodCalls = [];
	this._dispatchers = [];
};
$hxClasses["hex.event.CompositeDispatcher"] = hex_event_CompositeDispatcher;
hex_event_CompositeDispatcher.__name__ = ["hex","event","CompositeDispatcher"];
hex_event_CompositeDispatcher.__interfaces__ = [hex_event_IDispatcher];
hex_event_CompositeDispatcher.prototype = {
	dispatch: function(messageType,data) {
		this._seal(true);
		var _g = 0;
		var _g1 = this._dispatchers;
		while(_g < _g1.length) {
			var dispatcher = _g1[_g];
			++_g;
			dispatcher.dispatch(messageType,data);
		}
		this._seal(false);
	}
	,addHandler: function(messageType,scope,callback) {
		if(!this._isSealed) {
			var b = false;
			var _g = 0;
			var _g1 = this._dispatchers;
			while(_g < _g1.length) {
				var dispatcher = _g1[_g];
				++_g;
				b = dispatcher.addHandler(messageType,scope,callback) || b;
			}
			return b;
		} else {
			this._cachedMethodCalls.push((function(f,a1,a2,a3) {
				return function() {
					return f(a1,a2,a3);
				};
			})($bind(this,this.addHandler),messageType,scope,callback));
			return false;
		}
	}
	,removeHandler: function(messageType,scope,callback) {
		if(!this._isSealed) {
			var b = false;
			var _g = 0;
			var _g1 = this._dispatchers;
			while(_g < _g1.length) {
				var dispatcher = _g1[_g];
				++_g;
				b = dispatcher.removeHandler(messageType,scope,callback) || b;
			}
			return b;
		} else {
			this._cachedMethodCalls.push((function(f,a1,a2,a3) {
				return function() {
					return f(a1,a2,a3);
				};
			})($bind(this,this.removeHandler),messageType,scope,callback));
			return false;
		}
	}
	,addListener: function(listener) {
		throw new js__$Boot_HaxeError(new hex_error_UnsupportedOperationException("'addListener' is not supported in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "CompositeDispatcher.hx", lineNumber : 75, className : "hex.event.CompositeDispatcher", methodName : "addListener"}));
	}
	,removeListener: function(listener) {
		throw new js__$Boot_HaxeError(new hex_error_UnsupportedOperationException("'removeListener' is not supported in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "CompositeDispatcher.hx", lineNumber : 80, className : "hex.event.CompositeDispatcher", methodName : "removeListener"}));
	}
	,removeAllListeners: function() {
		if(!this._isSealed) {
			var _g = 0;
			var _g1 = this._dispatchers;
			while(_g < _g1.length) {
				var dispatcher = _g1[_g];
				++_g;
				dispatcher.removeAllListeners();
			}
		} else this._cachedMethodCalls.push((function(f) {
			return function() {
				f();
			};
		})($bind(this,this.removeAllListeners)));
	}
	,isEmpty: function() {
		var _g = 0;
		var _g1 = this._dispatchers;
		while(_g < _g1.length) {
			var dispatcher = _g1[_g];
			++_g;
			if(!dispatcher.isEmpty()) return false;
		}
		return true;
	}
	,isRegistered: function(listener,messageType) {
		throw new js__$Boot_HaxeError(new hex_error_UnsupportedOperationException("'isRegistered' is not supported in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "CompositeDispatcher.hx", lineNumber : 112, className : "hex.event.CompositeDispatcher", methodName : "isRegistered"}));
	}
	,hasHandler: function(messageType,scope) {
		var b = false;
		var _g = 0;
		var _g1 = this._dispatchers;
		while(_g < _g1.length) {
			var dispatcher = _g1[_g];
			++_g;
			b = dispatcher.hasHandler(messageType,scope) || b;
		}
		return b;
	}
	,add: function(dispatcher) {
		if(!this._isSealed) {
			if(HxOverrides.indexOf(this._dispatchers,dispatcher,0) == -1) {
				this._dispatchers.push(dispatcher);
				return true;
			} else return false;
		} else {
			this._cachedMethodCalls.push((function(f,a1) {
				return function() {
					return f(a1);
				};
			})($bind(this,this.add),dispatcher));
			return false;
		}
	}
	,remove: function(dispatcher) {
		if(!this._isSealed) {
			var index = HxOverrides.indexOf(this._dispatchers,dispatcher,0);
			if(index != -1) {
				this._dispatchers.splice(index,1);
				return true;
			} else return false;
		} else {
			this._cachedMethodCalls.push((function(f,a1) {
				return function() {
					return f(a1);
				};
			})($bind(this,this.remove),dispatcher));
			return false;
		}
	}
	,_seal: function(isSealed) {
		if(isSealed != this._isSealed) {
			this._isSealed = isSealed;
			if(!this._isSealed && this._cachedMethodCalls.length > 0) {
				var _g = 0;
				var _g1 = this._cachedMethodCalls;
				while(_g < _g1.length) {
					var cachedMethodCall = _g1[_g];
					++_g;
					cachedMethodCall();
				}
				this._cachedMethodCalls = [];
			}
		}
	}
	,__class__: hex_event_CompositeDispatcher
};
var hex_event_EventProxy = function(scope,method) {
	this.scope = scope;
	this.callback = method;
};
$hxClasses["hex.event.EventProxy"] = hex_event_EventProxy;
hex_event_EventProxy.__name__ = ["hex","event","EventProxy"];
hex_event_EventProxy.prototype = {
	handleCallback: function(args) {
		if(this.scope != null && this.callback != null) Reflect.callMethod(this.scope,this.callback,args); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("handleCallback call failed with method '" + Std.string(this.callback) + " and scope '" + Std.string(this.scope) + "'",{ fileName : "EventProxy.hx", lineNumber : 28, className : "hex.event.EventProxy", methodName : "handleCallback"}));
	}
	,__class__: hex_event_EventProxy
};
var hex_event_IAdapterStrategy = function() { };
$hxClasses["hex.event.IAdapterStrategy"] = hex_event_IAdapterStrategy;
hex_event_IAdapterStrategy.__name__ = ["hex","event","IAdapterStrategy"];
hex_event_IAdapterStrategy.prototype = {
	__class__: hex_event_IAdapterStrategy
};
var hex_event_IEventDispatcher = function() { };
$hxClasses["hex.event.IEventDispatcher"] = hex_event_IEventDispatcher;
hex_event_IEventDispatcher.__name__ = ["hex","event","IEventDispatcher"];
hex_event_IEventDispatcher.prototype = {
	__class__: hex_event_IEventDispatcher
};
var hex_event_IEventListener = function() { };
$hxClasses["hex.event.IEventListener"] = hex_event_IEventListener;
hex_event_IEventListener.__name__ = ["hex","event","IEventListener"];
hex_event_IEventListener.prototype = {
	__class__: hex_event_IEventListener
};
var hex_event_LightweightClosureDispatcher = function() {
	this._callbacks = new haxe_ds_StringMap();
	this._callbackSize = 0;
};
$hxClasses["hex.event.LightweightClosureDispatcher"] = hex_event_LightweightClosureDispatcher;
hex_event_LightweightClosureDispatcher.__name__ = ["hex","event","LightweightClosureDispatcher"];
hex_event_LightweightClosureDispatcher.__interfaces__ = [hex_event_IEventDispatcher];
hex_event_LightweightClosureDispatcher.prototype = {
	dispatchEvent: function(e) {
		var eventType = e.type;
		if(this._callbacks.exists(eventType)) {
			var callbacks;
			var _this = this._callbacks.get(eventType);
			callbacks = _this.slice();
			var _g = 0;
			while(_g < callbacks.length) {
				var f = callbacks[_g];
				++_g;
				f(e);
			}
		}
	}
	,addEventListener: function(eventType,callback) {
		if(!this._callbacks.exists(eventType)) this._callbacks.set(eventType,[]);
		var callbacks = this._callbacks.get(eventType);
		var index = HxOverrides.indexOf(callbacks,callback,0);
		if(index == -1) {
			callbacks.push(callback);
			this._callbackSize++;
			return true;
		} else return false;
	}
	,removeEventListener: function(eventType,callback) {
		if(!this._callbacks.exists(eventType)) return false;
		var callbacks = this._callbacks.get(eventType);
		var index = HxOverrides.indexOf(callbacks,callback,0);
		if(index == -1) return false; else {
			callbacks.splice(index,1);
			this._callbackSize--;
			if(callbacks.length == 0) this._callbacks.remove(eventType);
			return true;
		}
	}
	,addListener: function(listener) {
		throw new js__$Boot_HaxeError(new hex_error_UnsupportedOperationException("'addListener' is not supported in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "LightweightClosureDispatcher.hx", lineNumber : 84, className : "hex.event.LightweightClosureDispatcher", methodName : "addListener"}));
	}
	,removeListener: function(listener) {
		throw new js__$Boot_HaxeError(new hex_error_UnsupportedOperationException("'removeListener' is not supported in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "LightweightClosureDispatcher.hx", lineNumber : 89, className : "hex.event.LightweightClosureDispatcher", methodName : "removeListener"}));
	}
	,removeAllListeners: function() {
		this._callbacks = new haxe_ds_StringMap();
		this._callbackSize = 0;
	}
	,isEmpty: function() {
		return this._callbackSize == 0;
	}
	,isRegistered: function(listener,eventType) {
		throw new js__$Boot_HaxeError(new hex_error_UnsupportedOperationException("'isRegistered' is not supported in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "LightweightClosureDispatcher.hx", lineNumber : 105, className : "hex.event.LightweightClosureDispatcher", methodName : "isRegistered"}));
	}
	,hasEventListener: function(eventType,callback) {
		if(!this._callbacks.exists(eventType)) return false;
		if(callback == null) return true; else return (function($this) {
			var $r;
			var _this = $this._callbacks.get(eventType);
			$r = HxOverrides.indexOf(_this,callback,0);
			return $r;
		}(this)) != -1;
	}
	,__class__: hex_event_LightweightClosureDispatcher
};
var hex_event_MacroAdapterStrategy = function(target,method) {
	this._target = target;
	this._method = method;
	hex_control_macro_Macro.call(this);
};
$hxClasses["hex.event.MacroAdapterStrategy"] = hex_event_MacroAdapterStrategy;
hex_event_MacroAdapterStrategy.__name__ = ["hex","event","MacroAdapterStrategy"];
hex_event_MacroAdapterStrategy.__interfaces__ = [hex_event_IAdapterStrategy];
hex_event_MacroAdapterStrategy.__super__ = hex_control_macro_Macro;
hex_event_MacroAdapterStrategy.prototype = $extend(hex_control_macro_Macro.prototype,{
	adapt: function(args) {
		return Reflect.callMethod(this._target,this._method,args);
	}
	,getResult: function() {
		return this._result;
	}
	,__class__: hex_event_MacroAdapterStrategy
});
var hex_ioc_assembler_AbstractApplicationContext = function(coreFactory,name) {
	this._coreFactory = coreFactory;
	this._name = name;
};
$hxClasses["hex.ioc.assembler.AbstractApplicationContext"] = hex_ioc_assembler_AbstractApplicationContext;
hex_ioc_assembler_AbstractApplicationContext.__name__ = ["hex","ioc","assembler","AbstractApplicationContext"];
hex_ioc_assembler_AbstractApplicationContext.__interfaces__ = [hex_di_IContextOwner];
hex_ioc_assembler_AbstractApplicationContext.prototype = {
	getName: function() {
		return this._name;
	}
	,resolve: function(field) {
		return this._coreFactory.locate(field);
	}
	,addChild: function(applicationContext) {
		try {
			return this._coreFactory.register(applicationContext.getName(),applicationContext);
		} catch( ex ) {
			if (ex instanceof js__$Boot_HaxeError) ex = ex.val;
			if( js_Boot.__instanceof(ex,hex_error_IllegalArgumentException) ) {
				hex_log_Logger.ERROR("addChild failed with applicationContext named '" + applicationContext.getName() + "'",null,{ fileName : "AbstractApplicationContext.hx", lineNumber : 45, className : "hex.ioc.assembler.AbstractApplicationContext", methodName : "addChild"});
				return false;
			} else throw(ex);
		}
	}
	,dispatch: function(messageType,data) {
		throw new js__$Boot_HaxeError(new hex_error_VirtualMethodException(hex_log_Stringifier.stringify(this) + "._dispatch is not implemented",{ fileName : "AbstractApplicationContext.hx", lineNumber : 53, className : "hex.ioc.assembler.AbstractApplicationContext", methodName : "dispatch"}));
	}
	,getCoreFactory: function() {
		return this._coreFactory;
	}
	,getInjector: function() {
		return this._coreFactory.getInjector();
	}
	,__class__: hex_ioc_assembler_AbstractApplicationContext
};
var hex_ioc_assembler_ApplicationAssembler = function() {
	this._strictMode = true;
	this._conditionalProperties = new haxe_ds_StringMap();
	this._mContextFactories = new haxe_ds_ObjectMap();
	this._mApplicationContext = new haxe_ds_StringMap();
};
$hxClasses["hex.ioc.assembler.ApplicationAssembler"] = hex_ioc_assembler_ApplicationAssembler;
hex_ioc_assembler_ApplicationAssembler.__name__ = ["hex","ioc","assembler","ApplicationAssembler"];
hex_ioc_assembler_ApplicationAssembler.__interfaces__ = [hex_ioc_assembler_IApplicationAssembler];
hex_ioc_assembler_ApplicationAssembler._deserializeArguments = function(ownerID,args) {
	var length = args.length;
	var index;
	var obj;
	var _g = 0;
	while(_g < length) {
		var index1 = _g++;
		args[index1] = hex_ioc_assembler_ApplicationAssembler._getConstructorVO(ownerID,args[index1]);
	}
};
hex_ioc_assembler_ApplicationAssembler._getConstructorVO = function(ownerID,obj) {
	if(obj.method != null) return new hex_ioc_vo_ConstructorVO(null,"Function",[obj.method]); else if(obj.ref != null) return new hex_ioc_vo_ConstructorVO(null,"Instance",null,null,null,false,obj.ref); else if(obj.staticRef != null) return new hex_ioc_vo_ConstructorVO(null,"Instance",null,null,null,false,null,null,obj.staticRef); else {
		var type;
		if(obj.type != null) type = obj.type; else type = "String";
		return new hex_ioc_vo_ConstructorVO(ownerID,type,[obj.value]);
	}
};
hex_ioc_assembler_ApplicationAssembler.prototype = {
	setStrictMode: function(b) {
		this._strictMode = b;
	}
	,isInStrictMode: function() {
		return this._strictMode;
	}
	,addConditionalProperty: function(conditionalProperties) {
		var i = conditionalProperties.keys();
		var key;
		while(i.hasNext()) {
			key = i.next();
			if(!this._conditionalProperties.exists(key)) {
				var value;
				value = __map_reserved[key] != null?conditionalProperties.getReserved(key):conditionalProperties.h[key];
				this._conditionalProperties.set(key,value);
			} else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("addConditionalcontext fails with key'" + key + "', this key was already assigned",{ fileName : "ApplicationAssembler.hx", lineNumber : 58, className : "hex.ioc.assembler.ApplicationAssembler", methodName : "addConditionalProperty"}));
		}
	}
	,allowsIfList: function(ifList) {
		if(ifList != null) {
			var _g = 0;
			while(_g < ifList.length) {
				var ifItem = ifList[_g];
				++_g;
				if(this._conditionalProperties.exists(ifItem)) {
					if(this._conditionalProperties.get(ifItem)) return true;
				} else if(this._strictMode) throw new js__$Boot_HaxeError(new hex_ioc_error_BuildingException("'" + ifItem + "' was not found in application assembler",{ fileName : "ApplicationAssembler.hx", lineNumber : 78, className : "hex.ioc.assembler.ApplicationAssembler", methodName : "allowsIfList"}));
			}
		} else return true;
		return false;
	}
	,allowsIfNotList: function(ifNotList) {
		if(ifNotList != null) {
			var _g = 0;
			while(_g < ifNotList.length) {
				var ifNotItem = ifNotList[_g];
				++_g;
				if(this._conditionalProperties.exists(ifNotItem)) {
					if(this._conditionalProperties.get(ifNotItem)) return false;
				} else if(this._strictMode) throw new js__$Boot_HaxeError(new hex_ioc_error_BuildingException("'" + ifNotItem + "' was not found in application assembler",{ fileName : "ApplicationAssembler.hx", lineNumber : 105, className : "hex.ioc.assembler.ApplicationAssembler", methodName : "allowsIfNotList"}));
			}
		}
		return true;
	}
	,getContextFactory: function(applicationContext) {
		return this._mContextFactories.h[applicationContext.__id__];
	}
	,release: function() {
		var itFactory = this._mContextFactories.iterator();
		while(itFactory.hasNext()) itFactory.next().release();
		this._mApplicationContext = new haxe_ds_StringMap();
		this._mContextFactories = new haxe_ds_ObjectMap();
	}
	,buildProperty: function(applicationContext,ownerID,name,value,type,ref,method,staticRef,ifList,ifNotList) {
		if(this.allowsIfList(ifList) && this.allowsIfNotList(ifNotList)) this.getContextFactory(applicationContext).registerPropertyVO(ownerID,new hex_ioc_vo_PropertyVO(ownerID,name,value,type,ref,method,staticRef));
	}
	,buildObject: function(applicationContext,ownerID,type,args,factory,singleton,injectInto,mapType,staticRef,ifList,ifNotList) {
		if(injectInto == null) injectInto = false;
		if(this.allowsIfList(ifList) && this.allowsIfNotList(ifNotList)) {
			this._registerID(applicationContext,ownerID);
			var constructorVO = new hex_ioc_vo_ConstructorVO(ownerID,type,args,factory,singleton,injectInto,null,mapType,staticRef);
			this.getContextFactory(applicationContext).registerConstructorVO(ownerID,constructorVO);
		}
	}
	,buildMethodCall: function(applicationContext,ownerID,methodCallName,args,ifList,ifNotList) {
		if(this.allowsIfList(ifList) && this.allowsIfNotList(ifNotList)) this.getContextFactory(applicationContext).registerMethodCallVO(new hex_ioc_vo_MethodCallVO(ownerID,methodCallName,args));
	}
	,buildDomainListener: function(applicationContext,ownerID,listenedDomainName,args,ifList,ifNotList) {
		if(this.allowsIfList(ifList) && this.allowsIfNotList(ifNotList)) this.getContextFactory(applicationContext).registerDomainListenerVO(new hex_ioc_vo_DomainListenerVO(ownerID,listenedDomainName,args));
	}
	,configureStateTransition: function(applicationContext,ownerID,staticReference,instanceReference,enterList,exitList,ifList,ifNotList) {
		if(this.allowsIfList(ifList) && this.allowsIfNotList(ifNotList)) {
			this._registerID(applicationContext,ownerID);
			var stateTransition = new hex_ioc_vo_StateTransitionVO(ownerID,staticReference,instanceReference,enterList,exitList);
			this.getContextFactory(applicationContext).registerStateTransitionVO(ownerID,stateTransition);
		}
	}
	,buildEverything: function() {
		var itFactory = this._mContextFactories.iterator();
		var builderFactories = [];
		while(itFactory.hasNext()) builderFactories.push(itFactory.next());
		var itFactory1 = this._mContextFactories.iterator();
		while(itFactory1.hasNext()) itFactory1.next().buildAllStateTransitions();
		var applicationContexts = [];
		var itContext = this._mApplicationContext.iterator();
		while(itContext.hasNext()) applicationContexts.push(itContext.next());
		itFactory1 = this._mContextFactories.iterator();
		while(itFactory1.hasNext()) itFactory1.next().dispatchAssemblingStart();
		var len = builderFactories.length;
		var i;
		var _g = 0;
		while(_g < len) {
			var i1 = _g++;
			builderFactories[i1].buildAllObjects();
		}
		var _g1 = 0;
		while(_g1 < len) {
			var i2 = _g1++;
			builderFactories[i2].assignAllDomainListeners();
		}
		var _g2 = 0;
		while(_g2 < len) {
			var i3 = _g2++;
			builderFactories[i3].callAllMethods();
		}
		var _g3 = 0;
		while(_g3 < len) {
			var i4 = _g3++;
			builderFactories[i4].callModuleInitialisation();
		}
		itFactory1 = this._mContextFactories.iterator();
		while(itFactory1.hasNext()) itFactory1.next().dispatchAssemblingEnd();
	}
	,getApplicationContext: function(applicationContextName,applicationContextClass) {
		var applicationContext;
		if(this._mApplicationContext.exists(applicationContextName)) applicationContext = this._mApplicationContext.get(applicationContextName); else {
			var builderFactory = new hex_ioc_core_ContextFactory(applicationContextName,applicationContextClass);
			applicationContext = builderFactory.getApplicationContext();
			this._mApplicationContext.set(applicationContextName,applicationContext);
			this._mContextFactories.set(applicationContext,builderFactory);
		}
		return applicationContext;
	}
	,_registerID: function(applicationContext,ID) {
		return this.getContextFactory(applicationContext).registerID(ID);
	}
	,__class__: hex_ioc_assembler_ApplicationAssembler
};
var hex_ioc_assembler_ApplicationAssemblerMessage = function() {
};
$hxClasses["hex.ioc.assembler.ApplicationAssemblerMessage"] = hex_ioc_assembler_ApplicationAssemblerMessage;
hex_ioc_assembler_ApplicationAssemblerMessage.__name__ = ["hex","ioc","assembler","ApplicationAssemblerMessage"];
hex_ioc_assembler_ApplicationAssemblerMessage.prototype = {
	__class__: hex_ioc_assembler_ApplicationAssemblerMessage
};
var hex_ioc_assembler_ApplicationContext = function(dispatcher,coreFactory,name) {
	hex_ioc_assembler_AbstractApplicationContext.call(this,coreFactory,name);
	this._dispatcher = dispatcher;
	this._initStateMachine();
};
$hxClasses["hex.ioc.assembler.ApplicationContext"] = hex_ioc_assembler_ApplicationContext;
hex_ioc_assembler_ApplicationContext.__name__ = ["hex","ioc","assembler","ApplicationContext"];
hex_ioc_assembler_ApplicationContext.__super__ = hex_ioc_assembler_AbstractApplicationContext;
hex_ioc_assembler_ApplicationContext.prototype = $extend(hex_ioc_assembler_AbstractApplicationContext.prototype,{
	_initStateList: function() {
		this.state = new hex_ioc_assembler_ApplicationContextStateList();
	}
	,_initStateMachine: function() {
		this._initStateList();
		this._stateMachine = new hex_state_StateMachine(this.state.CONTEXT_INITIALIZED);
		this._stateController = new hex_state_control_StateController(this.getInjector(),this._stateMachine);
		this._dispatcher.addListener(this._stateController);
	}
	,dispatch: function(messageType,data) {
		this._dispatcher.dispatch(messageType,data);
	}
	,getCurrentState: function() {
		return this._stateController.getCurrentState();
	}
	,__class__: hex_ioc_assembler_ApplicationContext
});
var hex_ioc_assembler_ApplicationContextStateList = function() {
	this.ASSEMBLING_END = new hex_state_State("onAssemblingEnd");
	this.MODULES_INITIALIZED = new hex_state_State("onModulesInitialized");
	this.METHODS_CALLED = new hex_state_State("onMethodsCalled");
	this.DOMAIN_LISTENERS_ASSIGNED = new hex_state_State("onDomainListenersAssigned");
	this.OBJECTS_BUILT = new hex_state_State("onObjectsBuilt");
	this.ASSEMBLING_START = new hex_state_State("onAssemblingStart");
	this.STATE_TRANSITIONS_BUILT = new hex_state_State("onStateTransitionsBuilt");
	this.CONTEXT_PARSED = new hex_state_State("onContextParsed");
	this.CONTEXT_INITIALIZED = new hex_state_State("onContextInitialized");
	this.CONTEXT_INITIALIZED.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.CONTEXT_PARSED,this.CONTEXT_PARSED);
	this.CONTEXT_PARSED.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.STATE_TRANSITIONS_BUILT,this.STATE_TRANSITIONS_BUILT);
	this.STATE_TRANSITIONS_BUILT.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.ASSEMBLING_START,this.ASSEMBLING_START);
	this.ASSEMBLING_START.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.OBJECTS_BUILT,this.OBJECTS_BUILT);
	this.OBJECTS_BUILT.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.DOMAIN_LISTENERS_ASSIGNED,this.DOMAIN_LISTENERS_ASSIGNED);
	this.DOMAIN_LISTENERS_ASSIGNED.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.METHODS_CALLED,this.METHODS_CALLED);
	this.METHODS_CALLED.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.MODULES_INITIALIZED,this.MODULES_INITIALIZED);
	this.MODULES_INITIALIZED.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.ASSEMBLING_END,this.ASSEMBLING_END);
	this.ASSEMBLING_END.addTransition(hex_ioc_assembler_ApplicationAssemblerMessage.STATE_TRANSITIONS_BUILT,this.STATE_TRANSITIONS_BUILT);
};
$hxClasses["hex.ioc.assembler.ApplicationContextStateList"] = hex_ioc_assembler_ApplicationContextStateList;
hex_ioc_assembler_ApplicationContextStateList.__name__ = ["hex","ioc","assembler","ApplicationContextStateList"];
hex_ioc_assembler_ApplicationContextStateList.prototype = {
	__class__: hex_ioc_assembler_ApplicationContextStateList
};
var hex_ioc_control_ArrayFactory = function() {
};
$hxClasses["hex.ioc.control.ArrayFactory"] = hex_ioc_control_ArrayFactory;
hex_ioc_control_ArrayFactory.__name__ = ["hex","ioc","control","ArrayFactory"];
hex_ioc_control_ArrayFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	var array = [];
	var args = constructorVO["arguments"];
	if(args != null) array = args.slice();
	constructorVO.result = array;
};
hex_ioc_control_ArrayFactory.prototype = {
	__class__: hex_ioc_control_ArrayFactory
};
var hex_ioc_control_BoolFactory = function() {
};
$hxClasses["hex.ioc.control.BoolFactory"] = hex_ioc_control_BoolFactory;
hex_ioc_control_BoolFactory.__name__ = ["hex","ioc","control","BoolFactory"];
hex_ioc_control_BoolFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	var value = "";
	var args = constructorVO["arguments"];
	if(args != null && args.length > 0) value = args[0];
	if(value == "true") constructorVO.result = true; else if(value == "false") constructorVO.result = false; else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("BoolFactory.build(" + value + ") failed.",{ fileName : "BoolFactory.hx", lineNumber : 40, className : "hex.ioc.control.BoolFactory", methodName : "build"}));
};
hex_ioc_control_BoolFactory.prototype = {
	__class__: hex_ioc_control_BoolFactory
};
var hex_ioc_control_ClassFactory = function() {
};
$hxClasses["hex.ioc.control.ClassFactory"] = hex_ioc_control_ClassFactory;
hex_ioc_control_ClassFactory.__name__ = ["hex","ioc","control","ClassFactory"];
hex_ioc_control_ClassFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	var clazz;
	var qualifiedClassName = "";
	var args = constructorVO["arguments"];
	if(args != null && args.length > 0) qualifiedClassName = "" + Std.string(args[0]);
	try {
		clazz = Type.resolveClass(qualifiedClassName);
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		clazz = null;
	}
	if(clazz == null) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("'" + qualifiedClassName + "' is not available",{ fileName : "ClassFactory.hx", lineNumber : 42, className : "hex.ioc.control.ClassFactory", methodName : "build"}));
	constructorVO.result = clazz;
};
hex_ioc_control_ClassFactory.prototype = {
	__class__: hex_ioc_control_ClassFactory
};
var hex_ioc_control_ClassInstanceFactory = function() {
};
$hxClasses["hex.ioc.control.ClassInstanceFactory"] = hex_ioc_control_ClassInstanceFactory;
hex_ioc_control_ClassInstanceFactory.__name__ = ["hex","ioc","control","ClassInstanceFactory"];
hex_ioc_control_ClassInstanceFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	if(constructorVO.ref != null) hex_ioc_control_ReferenceFactory.build(factoryVO); else {
		var classReference = hex_util_ClassUtil.getClassReference(constructorVO.type);
		var isModule = hex_util_ClassUtil.classExtendsOrImplements(classReference,hex_module_IModule);
		if(isModule && constructorVO.ID != null && constructorVO.ID.length > 0) {
			hex_domain_DomainExpert.getInstance().registerDomain(hex_domain_DomainUtil.getDomain(constructorVO.ID,hex_domain_Domain));
			hex_metadata_AnnotationProvider.registerToDomain(factoryVO.contextFactory.getAnnotationProvider(),hex_domain_DomainUtil.getDomain(constructorVO.ID,hex_domain_Domain));
		}
		constructorVO.result = factoryVO.coreFactory.buildInstance(constructorVO.type,constructorVO["arguments"],constructorVO.factory,constructorVO.singleton,constructorVO.injectInto);
		if(js_Boot.__instanceof(constructorVO.result,hex_module_IModule)) factoryVO.moduleLocator.register(constructorVO.ID,constructorVO.result);
		if(constructorVO.mapType != null) {
			var classToMap = Type.resolveClass(constructorVO.mapType);
			factoryVO.contextFactory.getApplicationContext().getInjector().mapToValue(classToMap,constructorVO.result,constructorVO.ID);
		}
	}
};
hex_ioc_control_ClassInstanceFactory.prototype = {
	__class__: hex_ioc_control_ClassInstanceFactory
};
var hex_ioc_control_DomainListenerFactory = function() {
};
$hxClasses["hex.ioc.control.DomainListenerFactory"] = hex_ioc_control_DomainListenerFactory;
hex_ioc_control_DomainListenerFactory.__name__ = ["hex","ioc","control","DomainListenerFactory"];
hex_ioc_control_DomainListenerFactory.build = function(id,domainListenerVOLocator,applicationContext,annotationProvider) {
	var coreFactory = applicationContext.getCoreFactory();
	var domainListener = domainListenerVOLocator.locate(id);
	var listener = coreFactory.locate(domainListener.ownerID);
	var args = domainListener["arguments"];
	var observable = null;
	if(coreFactory.isRegisteredWithKey(domainListener.listenedDomainName)) {
		var located = coreFactory.locate(domainListener.listenedDomainName);
		if(js_Boot.__instanceof(located,hex_event_IObservable)) observable = located;
	}
	if(args != null && args.length > 0) {
		var _g = 0;
		while(_g < args.length) {
			var domainListenerArgument = args[_g];
			++_g;
			var method;
			if(js_Boot.__instanceof(listener,hex_event_EventProxy)) method = "handleCallback"; else method = domainListenerArgument.method;
			var messageType = hex_util_ClassUtil.getStaticVariableReference(domainListenerArgument.staticRef);
			if(method != null && Reflect.isFunction(Reflect.field(listener,method)) || domainListenerArgument.strategy != null) {
				var callback;
				if(domainListenerArgument.strategy != null) callback = hex_ioc_control_DomainListenerFactory._getStrategyCallback(annotationProvider,applicationContext,listener,method,domainListenerArgument.strategy,domainListenerArgument.injectedInModule); else callback = Reflect.field(listener,method);
				if(observable == null) {
					var domain = hex_domain_DomainUtil.getDomain(domainListener.listenedDomainName,hex_domain_Domain);
					hex_domain_ApplicationDomainDispatcher.getInstance().addHandler(messageType,listener,callback,domain);
				} else observable.addHandler(messageType,listener,callback);
			} else if(method == null) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("DomainListenerFactory.build failed. Callback should be defined (use 'method' attribute) in instance of '" + hex_log_Stringifier.stringify(listener) + "' class with '" + domainListener.ownerID + "' id",{ fileName : "DomainListenerFactory.hx", lineNumber : 77, className : "hex.ioc.control.DomainListenerFactory", methodName : "build"})); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("DomainListenerFactory.build failed. Method named '" + method + "' can't be found in instance of '" + hex_log_Stringifier.stringify(listener) + "' class with '" + domainListener.ownerID + "' id",{ fileName : "DomainListenerFactory.hx", lineNumber : 82, className : "hex.ioc.control.DomainListenerFactory", methodName : "build"}));
		}
		return true;
	} else {
		var domain1 = hex_domain_DomainUtil.getDomain(domainListener.listenedDomainName,hex_domain_Domain);
		return hex_domain_ApplicationDomainDispatcher.getInstance().addListener(listener,domain1);
	}
};
hex_ioc_control_DomainListenerFactory._getStrategyCallback = function(annotationProvider,applicationContext,listener,method,strategyClassName,injectedInModule) {
	if(injectedInModule == null) injectedInModule = false;
	var callback = Reflect.field(listener,method);
	var strategyClass = hex_util_ClassUtil.getClassReference(strategyClassName);
	var adapter = new hex_event_ClassAdapter();
	adapter.setCallBackMethod(listener,callback);
	adapter.setAdapterClass(strategyClass);
	adapter.setAnnotationProvider(annotationProvider);
	if(injectedInModule && js_Boot.__instanceof(listener,hex_module_IModule)) {
		var basicInjector = listener.getInjector();
		adapter.setFactoryMethod(basicInjector,$bind(basicInjector,basicInjector.instantiateUnmapped));
	} else adapter.setFactoryMethod(applicationContext.getInjector(),($_=applicationContext.getInjector(),$bind($_,$_.instantiateUnmapped)));
	var f = function(rest) {
		(adapter.getCallbackAdapter())(rest);
	};
	return Reflect.makeVarArgs(f);
};
hex_ioc_control_DomainListenerFactory.prototype = {
	__class__: hex_ioc_control_DomainListenerFactory
};
var hex_ioc_control_DynamicObjectFactory = function() {
};
$hxClasses["hex.ioc.control.DynamicObjectFactory"] = hex_ioc_control_DynamicObjectFactory;
hex_ioc_control_DynamicObjectFactory.__name__ = ["hex","ioc","control","DynamicObjectFactory"];
hex_ioc_control_DynamicObjectFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	factoryVO.constructorVO.result = { };
};
hex_ioc_control_DynamicObjectFactory.prototype = {
	__class__: hex_ioc_control_DynamicObjectFactory
};
var hex_ioc_control_FloatFactory = function() {
};
$hxClasses["hex.ioc.control.FloatFactory"] = hex_ioc_control_FloatFactory;
hex_ioc_control_FloatFactory.__name__ = ["hex","ioc","control","FloatFactory"];
hex_ioc_control_FloatFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	var args = constructorVO["arguments"];
	var number = NaN;
	if(args != null && args.length > 0) number = Std.parseFloat(args[0]);
	if(!isNaN(number)) constructorVO.result = number; else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("FloatFactory.build(" + number + ") failed.",{ fileName : "FloatFactory.hx", lineNumber : 36, className : "hex.ioc.control.FloatFactory", methodName : "build"}));
};
hex_ioc_control_FloatFactory.prototype = {
	__class__: hex_ioc_control_FloatFactory
};
var hex_ioc_control_FunctionFactory = function() {
};
$hxClasses["hex.ioc.control.FunctionFactory"] = hex_ioc_control_FunctionFactory;
hex_ioc_control_FunctionFactory.__name__ = ["hex","ioc","control","FunctionFactory"];
hex_ioc_control_FunctionFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	var method;
	var msg;
	var args = constructorVO["arguments"][0].split(".");
	var targetID = args[0];
	var path = args.slice(1).join(".");
	if(!factoryVO.coreFactory.isRegisteredWithKey(targetID)) factoryVO.contextFactory.buildObject(targetID);
	var target = factoryVO.coreFactory.locate(targetID);
	try {
		method = factoryVO.coreFactory.fastEvalFromTarget(target,path);
	} catch( error ) {
		if (error instanceof js__$Boot_HaxeError) error = error.val;
		msg = "FunctionFactory.build() failed on " + Std.string(target) + " with id '" + targetID + "'. ";
		msg += path + " method can't be found.";
		throw new js__$Boot_HaxeError(new hex_error_Exception(msg,{ fileName : "FunctionFactory.hx", lineNumber : 44, className : "hex.ioc.control.FunctionFactory", methodName : "build"}));
	}
	constructorVO.result = method;
};
hex_ioc_control_FunctionFactory.prototype = {
	__class__: hex_ioc_control_FunctionFactory
};
var hex_ioc_control_HashMapFactory = function() {
};
$hxClasses["hex.ioc.control.HashMapFactory"] = hex_ioc_control_HashMapFactory;
hex_ioc_control_HashMapFactory.__name__ = ["hex","ioc","control","HashMapFactory"];
hex_ioc_control_HashMapFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	var map = new hex_collection_HashMap();
	var args = constructorVO["arguments"];
	if(args.length == 0) hex_log_Logger.WARN("HashMapFactory.build(" + Std.string(args) + ") returns an empty HashMap.",null,{ fileName : "HashMapFactory.hx", lineNumber : 30, className : "hex.ioc.control.HashMapFactory", methodName : "build"}); else {
		var _g = 0;
		while(_g < args.length) {
			var item = args[_g];
			++_g;
			if(item.key != null) map.put(item.key,item.value); else console.log("HashMapFactory.build() adds item with a 'null' key for '" + Std.string(item.value) + "' value.");
		}
	}
	constructorVO.result = map;
	if(constructorVO.mapType != null) factoryVO.contextFactory.getApplicationContext().getInjector().mapToValue(hex_collection_HashMap,constructorVO.result,constructorVO.ID);
};
hex_ioc_control_HashMapFactory.prototype = {
	__class__: hex_ioc_control_HashMapFactory
};
var hex_ioc_control_IntFactory = function() {
};
$hxClasses["hex.ioc.control.IntFactory"] = hex_ioc_control_IntFactory;
hex_ioc_control_IntFactory.__name__ = ["hex","ioc","control","IntFactory"];
hex_ioc_control_IntFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	var args = constructorVO["arguments"];
	var number = 0;
	if(args != null && args.length > 0) number = Std.parseInt(Std.string(args[0])); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("IntFactory.build(" + (args != null && args.length > 0?args[0]:"") + ") failed.",{ fileName : "IntFactory.hx", lineNumber : 30, className : "hex.ioc.control.IntFactory", methodName : "build"}));
	if(number == null) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("IntFactory.build(" + number + ") failed.",{ fileName : "IntFactory.hx", lineNumber : 39, className : "hex.ioc.control.IntFactory", methodName : "build"})); else constructorVO.result = number;
};
hex_ioc_control_IntFactory.prototype = {
	__class__: hex_ioc_control_IntFactory
};
var hex_ioc_control_MappingConfigurationFactory = function() {
};
$hxClasses["hex.ioc.control.MappingConfigurationFactory"] = hex_ioc_control_MappingConfigurationFactory;
hex_ioc_control_MappingConfigurationFactory.__name__ = ["hex","ioc","control","MappingConfigurationFactory"];
hex_ioc_control_MappingConfigurationFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	var config = new hex_ioc_di_MappingConfiguration();
	var args = constructorVO["arguments"];
	if(args.length <= 0) console.log("MappingConfigurationFactory.build(" + Std.string(args) + ") returns an empty congiuration."); else {
		var _g = 0;
		while(_g < args.length) {
			var item = args[_g];
			++_g;
			if(item.key != null) config.addMapping(item.key,item.value,item.mapName,item.asSingleton); else console.log("MappingConfigurationFactory.build() adds item with a 'null' key for '" + Std.string(item.value) + "' value.");
		}
	}
	constructorVO.result = config;
};
hex_ioc_control_MappingConfigurationFactory.prototype = {
	__class__: hex_ioc_control_MappingConfigurationFactory
};
var hex_ioc_control_NullFactory = function() {
};
$hxClasses["hex.ioc.control.NullFactory"] = hex_ioc_control_NullFactory;
hex_ioc_control_NullFactory.__name__ = ["hex","ioc","control","NullFactory"];
hex_ioc_control_NullFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	constructorVO.result = null;
};
hex_ioc_control_NullFactory.prototype = {
	__class__: hex_ioc_control_NullFactory
};
var hex_ioc_control_ReferenceFactory = function() {
};
$hxClasses["hex.ioc.control.ReferenceFactory"] = hex_ioc_control_ReferenceFactory;
hex_ioc_control_ReferenceFactory.__name__ = ["hex","ioc","control","ReferenceFactory"];
hex_ioc_control_ReferenceFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	var key = constructorVO.ref;
	if(key.indexOf(".") != -1) key = Std.string(key.split(".").shift());
	if(!factoryVO.coreFactory.isRegisteredWithKey(key)) factoryVO.contextFactory.buildObject(key);
	var result = factoryVO.coreFactory.locate(key);
	if(constructorVO.ref.indexOf(".") != -1) {
		var args = constructorVO.ref.split(".");
		args.shift();
		constructorVO.result = factoryVO.coreFactory.fastEvalFromTarget(result,args.join("."));
	} else constructorVO.result = result;
};
hex_ioc_control_ReferenceFactory.prototype = {
	__class__: hex_ioc_control_ReferenceFactory
};
var hex_ioc_control_ServiceLocatorFactory = function() {
};
$hxClasses["hex.ioc.control.ServiceLocatorFactory"] = hex_ioc_control_ServiceLocatorFactory;
hex_ioc_control_ServiceLocatorFactory.__name__ = ["hex","ioc","control","ServiceLocatorFactory"];
hex_ioc_control_ServiceLocatorFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	var serviceLocator = new hex_config_stateful_ServiceLocator();
	var args = constructorVO["arguments"];
	if(args.length <= 0) console.log("ServiceLocatorFactory.build(" + Std.string(args) + ") returns an empty ServiceConfig."); else {
		var _g = 0;
		while(_g < args.length) {
			var item = args[_g];
			++_g;
			if(item.key != null) serviceLocator.addService(item.key,item.value,item.mapName); else console.log("ServiceLocatorFactory.build() adds item with a 'null' key for '" + Std.string(item.value) + "' value.");
		}
	}
	constructorVO.result = serviceLocator;
};
hex_ioc_control_ServiceLocatorFactory.prototype = {
	__class__: hex_ioc_control_ServiceLocatorFactory
};
var hex_ioc_control_StateTransitionFactory = function() {
};
$hxClasses["hex.ioc.control.StateTransitionFactory"] = hex_ioc_control_StateTransitionFactory;
hex_ioc_control_StateTransitionFactory.__name__ = ["hex","ioc","control","StateTransitionFactory"];
hex_ioc_control_StateTransitionFactory.build = function(vo,contextFactory) {
	var coreFactory = contextFactory.getCoreFactory();
	var state = null;
	if(vo.staticReference != null) state = hex_util_ClassUtil.getStaticVariableReference(vo.staticReference); else if(vo.instanceReference != null) state = coreFactory.locate(vo.instanceReference); else throw new js__$Boot_HaxeError(new hex_ioc_error_BuildingException("StateTransitionFactory.build failed with value object '" + Std.string(vo) + "'",{ fileName : "StateTransitionFactory.hx", lineNumber : 43, className : "hex.ioc.control.StateTransitionFactory", methodName : "build"}));
	var stateUnmapper = hex_state_StateUnmapper.register(state);
	if(state == null) throw new js__$Boot_HaxeError(new hex_ioc_error_BuildingException("StateTransitionFactory.build failed with value object '" + Std.string(vo) + "'",{ fileName : "StateTransitionFactory.hx", lineNumber : 50, className : "hex.ioc.control.StateTransitionFactory", methodName : "build"}));
	var enterList = vo.enterList;
	var _g = 0;
	while(_g < enterList.length) {
		var enterVO = enterList[_g];
		++_g;
		var enterCommandClass = hex_util_ClassUtil.getClassReference(enterVO.commandClassName);
		var enterMapping = new hex_control_command_CommandMapping(enterCommandClass);
		var enterContextOwner = null;
		if(enterVO.contextOwner != null) enterContextOwner = new hex_ioc_di_ContextOwnerWrapper(coreFactory,enterVO.contextOwner);
		enterMapping.setContextOwner(enterContextOwner != null?enterContextOwner:contextFactory.getApplicationContext());
		if(enterVO.fireOnce) enterMapping.once();
		state.addEnterCommandMapping(enterMapping);
		stateUnmapper.addEnterMapping(enterMapping);
	}
	var exitList = vo.exitList;
	var _g1 = 0;
	while(_g1 < exitList.length) {
		var exitVO = exitList[_g1];
		++_g1;
		var exitCommandClass = hex_util_ClassUtil.getClassReference(exitVO.commandClassName);
		var exitMapping = new hex_control_command_CommandMapping(exitCommandClass);
		var exitContextOwner = null;
		if(exitVO.contextOwner != null) exitContextOwner = new hex_ioc_di_ContextOwnerWrapper(coreFactory,exitVO.contextOwner);
		exitMapping.setContextOwner(exitContextOwner != null?exitContextOwner:contextFactory.getApplicationContext());
		if(exitVO.fireOnce) exitMapping.once();
		state.addExitCommandMapping(exitMapping);
		stateUnmapper.addExitMapping(exitMapping);
	}
};
hex_ioc_control_StateTransitionFactory.prototype = {
	__class__: hex_ioc_control_StateTransitionFactory
};
var hex_ioc_control_StaticVariableFactory = function() {
};
$hxClasses["hex.ioc.control.StaticVariableFactory"] = hex_ioc_control_StaticVariableFactory;
hex_ioc_control_StaticVariableFactory.__name__ = ["hex","ioc","control","StaticVariableFactory"];
hex_ioc_control_StaticVariableFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	constructorVO.result = hex_util_ClassUtil.getStaticVariableReference(constructorVO.staticRef);
};
hex_ioc_control_StaticVariableFactory.prototype = {
	__class__: hex_ioc_control_StaticVariableFactory
};
var hex_ioc_control_StringFactory = function() {
};
$hxClasses["hex.ioc.control.StringFactory"] = hex_ioc_control_StringFactory;
hex_ioc_control_StringFactory.__name__ = ["hex","ioc","control","StringFactory"];
hex_ioc_control_StringFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	var value = null;
	var args = constructorVO["arguments"];
	if(args != null && args.length > 0 && args[0] != null) value = Std.string(args[0]); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("StringFactory.build(" + value + ") returns empty String.",{ fileName : "StringFactory.hx", lineNumber : 32, className : "hex.ioc.control.StringFactory", methodName : "build"}));
	if(value == null) {
		value = "";
		hex_log_Logger.WARN("StringFactory.build(" + value + ") returns empty String.",null,{ fileName : "StringFactory.hx", lineNumber : 39, className : "hex.ioc.control.StringFactory", methodName : "build"});
	}
	constructorVO.result = value;
};
hex_ioc_control_StringFactory.prototype = {
	__class__: hex_ioc_control_StringFactory
};
var hex_ioc_control_UIntFactory = function() {
};
$hxClasses["hex.ioc.control.UIntFactory"] = hex_ioc_control_UIntFactory;
hex_ioc_control_UIntFactory.__name__ = ["hex","ioc","control","UIntFactory"];
hex_ioc_control_UIntFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	var args = constructorVO["arguments"];
	var number = 0;
	if(args != null && args.length > 0) number = Std.parseInt(Std.string(args[0])); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("UIntFactory.build(" + (args != null && args.length > 0?args[0]:"") + ") failed.",{ fileName : "UIntFactory.hx", lineNumber : 31, className : "hex.ioc.control.UIntFactory", methodName : "build"}));
	if(number == null || _$UInt_UInt_$Impl_$.gt(0,number)) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("UIntFactory.build(" + Std.string(_$UInt_UInt_$Impl_$.toFloat(number)) + ") failed.",{ fileName : "UIntFactory.hx", lineNumber : 40, className : "hex.ioc.control.UIntFactory", methodName : "build"})); else constructorVO.result = number;
};
hex_ioc_control_UIntFactory.prototype = {
	__class__: hex_ioc_control_UIntFactory
};
var hex_ioc_control_XmlFactory = function() {
};
$hxClasses["hex.ioc.control.XmlFactory"] = hex_ioc_control_XmlFactory;
hex_ioc_control_XmlFactory.__name__ = ["hex","ioc","control","XmlFactory"];
hex_ioc_control_XmlFactory.build = function(factoryVO) {
	var constructorVO = factoryVO.constructorVO;
	var args = constructorVO["arguments"];
	var factory = constructorVO.factory;
	if(args != null || args.length > 0) {
		var source = args[0];
		if(source.length > 0) {
			if(factory == null) constructorVO.result = Xml.parse(source); else try {
				var parser = factoryVO.coreFactory.buildInstance(factory);
				constructorVO.result = parser.parse(Xml.parse(source));
			} catch( error ) {
				if (error instanceof js__$Boot_HaxeError) error = error.val;
				throw new js__$Boot_HaxeError(new hex_ioc_error_ParsingException("XmlFactory.build() failed to deserialize XML with '" + factory + "' deserializer class.",{ fileName : "XmlFactory.hx", lineNumber : 47, className : "hex.ioc.control.XmlFactory", methodName : "build"}));
			}
		} else {
			console.log("XmlFactory.build() returns an empty XML.");
			constructorVO.result = Xml.parse("");
		}
	} else {
		console.log("XmlFactory.build() returns an empty XML.");
		constructorVO.result = Xml.parse("");
	}
};
hex_ioc_control_XmlFactory.prototype = {
	__class__: hex_ioc_control_XmlFactory
};
var hex_ioc_core_ContextAttributeList = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'ContextAttributeList' class can't be instantiated.",{ fileName : "ContextAttributeList.hx", lineNumber : 36, className : "hex.ioc.core.ContextAttributeList", methodName : "new"}));
};
$hxClasses["hex.ioc.core.ContextAttributeList"] = hex_ioc_core_ContextAttributeList;
hex_ioc_core_ContextAttributeList.__name__ = ["hex","ioc","core","ContextAttributeList"];
hex_ioc_core_ContextAttributeList.prototype = {
	__class__: hex_ioc_core_ContextAttributeList
};
var hex_ioc_core_ContextFactory = function(applicationContextName,applicationContextClass) {
	var domain = hex_domain_DomainUtil.getDomain(applicationContextName,hex_domain_Domain);
	this._contextDispatcher = hex_domain_ApplicationDomainDispatcher.getInstance().getDomainDispatcher(domain);
	var injector = new hex_di_Injector();
	injector.mapToValue(hex_di_IBasicInjector,injector);
	injector.mapToValue(hex_di_IDependencyInjector,injector);
	injector.mapToType(hex_control_macro_IMacroExecutor,hex_control_macro_MacroExecutor);
	this._annotationProvider = new hex_metadata_AnnotationProvider();
	this._annotationProvider.registerInjector(injector);
	this._coreFactory = new hex_ioc_core_CoreFactory(injector,this._annotationProvider);
	if(applicationContextClass != null) this._applicationContext = Type.createInstance(applicationContextClass,[this._contextDispatcher,this._coreFactory,applicationContextName]); else this._applicationContext = new hex_ioc_assembler_ApplicationContext(this._contextDispatcher,this._coreFactory,applicationContextName);
	injector.mapToValue(hex_ioc_assembler_ApplicationContext,this._applicationContext);
	this._coreFactory.register(applicationContextName,this._applicationContext);
	this._contextDispatcher.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.CONTEXT_PARSED);
	this._init();
};
$hxClasses["hex.ioc.core.ContextFactory"] = hex_ioc_core_ContextFactory;
hex_ioc_core_ContextFactory.__name__ = ["hex","ioc","core","ContextFactory"];
hex_ioc_core_ContextFactory.__interfaces__ = [hex_collection_ILocatorListener,hex_ioc_core_IContextFactory];
hex_ioc_core_ContextFactory.prototype = {
	dispatchAssemblingStart: function() {
		this._contextDispatcher.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.ASSEMBLING_START);
	}
	,dispatchAssemblingEnd: function() {
		this._contextDispatcher.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.ASSEMBLING_END);
	}
	,registerID: function(id) {
		return this._IDExpert.register(id);
	}
	,registerStateTransitionVO: function(id,stateTransitionVO) {
		this._stateTransitionVOLocator.register(id,stateTransitionVO);
	}
	,buildStateTransition: function(key) {
		if(this._stateTransitionVOLocator.isRegisteredWithKey(key)) {
			hex_ioc_control_StateTransitionFactory.build(this._stateTransitionVOLocator.locate(key),this);
			this._stateTransitionVOLocator.unregister(key);
		}
	}
	,buildAllStateTransitions: function() {
		var keys = this._stateTransitionVOLocator.keys();
		var _g = 0;
		while(_g < keys.length) {
			var key = keys[_g];
			++_g;
			this.buildStateTransition(key);
		}
		this._contextDispatcher.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.STATE_TRANSITIONS_BUILT);
	}
	,registerPropertyVO: function(id,propertyVO) {
		if(this._propertyVOLocator.isRegisteredWithKey(id)) this._propertyVOLocator.locate(id).push(propertyVO); else this._propertyVOLocator.register(id,[propertyVO]);
	}
	,_getPropertyValue: function(property) {
		if(property.method != null) return this._build(new hex_ioc_vo_ConstructorVO(null,"Function",[property.method])); else if(property.ref != null) return this._build(new hex_ioc_vo_ConstructorVO(null,"Instance",null,null,null,false,property.ref)); else if(property.staticRef != null) return hex_util_ClassUtil.getStaticVariableReference(property.staticRef); else {
			var type;
			if(property.type != null) type = property.type; else type = "String";
			return this._build(new hex_ioc_vo_ConstructorVO(property.ownerID,type,[property.value]));
		}
	}
	,_setPropertyValue: function(property,target,id) {
		var propertyName = property.name;
		if(propertyName.indexOf(".") == -1) Reflect.setProperty(target,propertyName,this._getPropertyValue(property)); else {
			var props = propertyName.split(".");
			propertyName = props.pop();
			var target1 = this._coreFactory.fastEvalFromTarget(target,props.join("."));
			Reflect.setProperty(target1,propertyName,this._getPropertyValue(property));
		}
	}
	,onRegister: function(key,instance) {
		if(this._propertyVOLocator.isRegisteredWithKey(key)) {
			var properties = this._propertyVOLocator.locate(key);
			var _g = 0;
			while(_g < properties.length) {
				var p = properties[_g];
				++_g;
				this._setPropertyValue(p,instance,key);
			}
		}
	}
	,onUnregister: function(key) {
	}
	,handleEvent: function(e) {
	}
	,registerConstructorVO: function(id,constructorVO) {
		this._constructorVOLocator.register(id,constructorVO);
	}
	,buildObject: function(id) {
		if(this._constructorVOLocator.isRegisteredWithKey(id)) {
			var cons = this._constructorVOLocator.locate(id);
			var args = cons["arguments"];
			if(args != null) {
				if(cons.type == "hex.collection.HashMap" || cons.type == "hex.config.stateful.ServiceLocator" || cons.type == "hex.ioc.di.MappingConfiguration") {
					var result = [];
					var _g = 0;
					while(_g < args.length) {
						var obj = args[_g];
						++_g;
						var mapVO = obj;
						mapVO.key = this._build(mapVO.getPropertyKey());
						mapVO.value = this._build(mapVO.getPropertyValue());
						result.push(mapVO);
					}
					cons["arguments"] = result;
				} else {
					var $arguments = cons["arguments"];
					var l = $arguments.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						$arguments[i] = this._build($arguments[i]);
					}
				}
			}
			this._build(cons,id);
			this._constructorVOLocator.unregister(id);
		}
	}
	,buildAllObjects: function() {
		var keys = this._constructorVOLocator.keys();
		var _g = 0;
		while(_g < keys.length) {
			var key = keys[_g];
			++_g;
			this.buildObject(key);
		}
		this._contextDispatcher.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.OBJECTS_BUILT);
	}
	,registerDomainListenerVO: function(domainListenerVO) {
		this._domainListenerVOLocator.register("" + hex_core_HashCodeFactory.getKey(domainListenerVO),domainListenerVO);
	}
	,assignAllDomainListeners: function() {
		var listeners = this._domainListenerVOLocator.keys();
		var _g = 0;
		while(_g < listeners.length) {
			var key = listeners[_g];
			++_g;
			this.assignDomainListener(key);
		}
		this._domainListenerVOLocator.clear();
		this._contextDispatcher.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.DOMAIN_LISTENERS_ASSIGNED);
	}
	,assignDomainListener: function(id) {
		return hex_ioc_control_DomainListenerFactory.build(id,this._domainListenerVOLocator,this._applicationContext,this._annotationProvider);
	}
	,registerMethodCallVO: function(methodCallVO) {
		var index = this._methodCallVOLocator.keys().length + 1;
		this._methodCallVOLocator.register("" + index,methodCallVO);
	}
	,callMethod: function(id) {
		var method = this._methodCallVOLocator.locate(id);
		var cons = new hex_ioc_vo_ConstructorVO(null,"Function",[method.ownerID + "." + method.name]);
		var func = this._build(cons);
		var $arguments = method["arguments"];
		var l = $arguments.length;
		var _g = 0;
		while(_g < l) {
			var i = _g++;
			$arguments[i] = this._build($arguments[i]);
		}
		Reflect.callMethod(this._coreFactory.locate(method.ownerID),func,$arguments);
	}
	,callAllMethods: function() {
		var keyList = this._methodCallVOLocator.keys();
		var _g = 0;
		while(_g < keyList.length) {
			var key = keyList[_g];
			++_g;
			this.callMethod(key);
		}
		this._methodCallVOLocator.clear();
		this._contextDispatcher.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.METHODS_CALLED);
	}
	,callModuleInitialisation: function() {
		var modules = this._moduleLocator.values();
		var _g = 0;
		while(_g < modules.length) {
			var module = modules[_g];
			++_g;
			module.initialize();
		}
		this._moduleLocator.clear();
		this._contextDispatcher.dispatch(hex_ioc_assembler_ApplicationAssemblerMessage.MODULES_INITIALIZED);
	}
	,getApplicationContext: function() {
		return this._applicationContext;
	}
	,getCoreFactory: function() {
		return this._coreFactory;
	}
	,getAnnotationProvider: function() {
		return this._annotationProvider;
	}
	,getStateTransitionVOLocator: function() {
		return this._stateTransitionVOLocator;
	}
	,release: function() {
		this._coreFactory.removeListener(this);
		this._coreFactory.clear();
		this._constructorVOLocator.release();
		this._propertyVOLocator.release();
		this._methodCallVOLocator.release();
		this._domainListenerVOLocator.release();
		this._stateTransitionVOLocator.release();
		this._moduleLocator.release();
		this._factoryMap = new haxe_ds_StringMap();
		this._IDExpert.clear();
	}
	,_init: function() {
		this._factoryMap = new haxe_ds_StringMap();
		this._IDExpert = new hex_ioc_core_IDExpert();
		this._constructorVOLocator = new hex_ioc_locator_ConstructorVOLocator();
		this._propertyVOLocator = new hex_ioc_locator_PropertyVOLocator();
		this._methodCallVOLocator = new hex_ioc_locator_MethodCallVOLocator();
		this._domainListenerVOLocator = new hex_ioc_locator_DomainListenerVOLocator();
		this._stateTransitionVOLocator = new hex_ioc_locator_StateTransitionVOLocator(this);
		this._moduleLocator = new hex_ioc_locator_ModuleLocator(this);
		this._factoryMap.set("Array",hex_ioc_control_ArrayFactory.build);
		this._factoryMap.set("Bool",hex_ioc_control_BoolFactory.build);
		this._factoryMap.set("Int",hex_ioc_control_IntFactory.build);
		this._factoryMap.set("null",hex_ioc_control_NullFactory.build);
		this._factoryMap.set("Float",hex_ioc_control_FloatFactory.build);
		this._factoryMap.set("Object",hex_ioc_control_DynamicObjectFactory.build);
		this._factoryMap.set("String",hex_ioc_control_StringFactory.build);
		this._factoryMap.set("UInt",hex_ioc_control_UIntFactory.build);
		this._factoryMap.set("Default",hex_ioc_control_StringFactory.build);
		this._factoryMap.set("hex.collection.HashMap",hex_ioc_control_HashMapFactory.build);
		this._factoryMap.set("hex.config.stateful.ServiceLocator",hex_ioc_control_ServiceLocatorFactory.build);
		this._factoryMap.set("Class",hex_ioc_control_ClassFactory.build);
		this._factoryMap.set("XML",hex_ioc_control_XmlFactory.build);
		this._factoryMap.set("Function",hex_ioc_control_FunctionFactory.build);
		this._factoryMap.set("Instance",hex_ioc_control_ClassInstanceFactory.build);
		this._factoryMap.set("StaticVariable",hex_ioc_control_StaticVariableFactory.build);
		this._factoryMap.set("hex.ioc.di.MappingConfiguration",hex_ioc_control_MappingConfigurationFactory.build);
		this._coreFactory.addListener(this);
	}
	,_build: function(constructorVO,id) {
		var type = constructorVO.type;
		var buildMethod;
		if(this._factoryMap.exists(type)) buildMethod = this._factoryMap.get(type); else buildMethod = hex_ioc_control_ClassInstanceFactory.build;
		var builderHelperVO = new hex_ioc_vo_FactoryVO();
		builderHelperVO.type = type;
		builderHelperVO.contextFactory = this;
		builderHelperVO.coreFactory = this._coreFactory;
		builderHelperVO.constructorVO = constructorVO;
		builderHelperVO.moduleLocator = this._moduleLocator;
		buildMethod(builderHelperVO);
		if(id != null) this._coreFactory.register(id,constructorVO.result);
		return constructorVO.result;
	}
	,__class__: hex_ioc_core_ContextFactory
};
var hex_ioc_core_ContextNameList = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'ContextNameList' class can't be instantiated.",{ fileName : "ContextNameList.hx", lineNumber : 27, className : "hex.ioc.core.ContextNameList", methodName : "new"}));
};
$hxClasses["hex.ioc.core.ContextNameList"] = hex_ioc_core_ContextNameList;
hex_ioc_core_ContextNameList.__name__ = ["hex","ioc","core","ContextNameList"];
hex_ioc_core_ContextNameList.prototype = {
	__class__: hex_ioc_core_ContextNameList
};
var hex_ioc_core_ContextTypeList = function() { };
$hxClasses["hex.ioc.core.ContextTypeList"] = hex_ioc_core_ContextTypeList;
hex_ioc_core_ContextTypeList.__name__ = ["hex","ioc","core","ContextTypeList"];
var hex_util_FastEval = function() {
};
$hxClasses["hex.util.FastEval"] = hex_util_FastEval;
hex_util_FastEval.__name__ = ["hex","util","FastEval"];
hex_util_FastEval.fromTarget = function(target,toEval,coreFactory) {
	var members = toEval.split(".");
	var result;
	while(members.length > 0) {
		var member = members.shift();
		result = Reflect.field(target,member);
		if(result == null) {
			if(js_Boot.__instanceof(target,hex_ioc_assembler_ApplicationContext) && coreFactory.isRegisteredWithKey(member)) result = coreFactory.locate(member); else if(js_Boot.__instanceof(target,HTMLElement)) result = (js_Boot.__cast(target , HTMLElement)).getElementsByClassName(member)[0]; else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("ObjectUtil.fastEvalFromTarget(" + Std.string(target) + ", " + toEval + ", " + Std.string(coreFactory) + ") failed.",{ fileName : "FastEval.hx", lineNumber : 42, className : "hex.util.FastEval", methodName : "fromTarget"}));
		}
		target = result;
	}
	return target;
};
hex_util_FastEval.prototype = {
	__class__: hex_util_FastEval
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var hex_log_Stringifier = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("Stringifier class can't be instantiated.",{ fileName : "Stringifier.hx", lineNumber : 15, className : "hex.log.Stringifier", methodName : "new"}));
};
$hxClasses["hex.log.Stringifier"] = hex_log_Stringifier;
hex_log_Stringifier.__name__ = ["hex","log","Stringifier"];
hex_log_Stringifier.setStringifier = function(o) {
	hex_log_Stringifier._STRATEGY = o;
};
hex_log_Stringifier.getStringifier = function() {
	return hex_log_Stringifier._STRATEGY;
};
hex_log_Stringifier.stringify = function(target) {
	if(hex_log_Stringifier._STRATEGY == null) hex_log_Stringifier._STRATEGY = new hex_log_BasicStringifierStrategy();
	return hex_log_Stringifier._STRATEGY.stringify(target);
};
hex_log_Stringifier.getPosInfos = function(posInfos) {
	return posInfos;
};
hex_log_Stringifier.prototype = {
	__class__: hex_log_Stringifier
};
var hex_log_IStringifierStrategy = function() { };
$hxClasses["hex.log.IStringifierStrategy"] = hex_log_IStringifierStrategy;
hex_log_IStringifierStrategy.__name__ = ["hex","log","IStringifierStrategy"];
hex_log_IStringifierStrategy.prototype = {
	__class__: hex_log_IStringifierStrategy
};
var hex_log_BasicStringifierStrategy = function() {
};
$hxClasses["hex.log.BasicStringifierStrategy"] = hex_log_BasicStringifierStrategy;
hex_log_BasicStringifierStrategy.__name__ = ["hex","log","BasicStringifierStrategy"];
hex_log_BasicStringifierStrategy.__interfaces__ = [hex_log_IStringifierStrategy];
hex_log_BasicStringifierStrategy.prototype = {
	stringify: function(target) {
		var type = Type.getClass(target);
		if(type != null) return Type.getClassName(type); else return "Dynamic";
	}
	,toString: function() {
		return hex_log_Stringifier.stringify(this);
	}
	,__class__: hex_log_BasicStringifierStrategy
};
var hex_log_Logger = function() {
	this.setLevel(hex_log_LogLevel._ALL);
	this._dispatcher = new hex_domain_DomainDispatcher();
};
$hxClasses["hex.log.Logger"] = hex_log_Logger;
hex_log_Logger.__name__ = ["hex","log","Logger"];
hex_log_Logger.getInstance = function() {
	if(hex_log_Logger._Instance == null) hex_log_Logger._Instance = new hex_log_Logger();
	return hex_log_Logger._Instance;
};
hex_log_Logger.DEBUG = function(o,domain,posInfos) {
	hex_log_Logger.getInstance().log(o,hex_log_LogLevel._DEBUG,domain,posInfos);
};
hex_log_Logger.INFO = function(o,domain,posInfos) {
	hex_log_Logger.getInstance().log(o,hex_log_LogLevel._INFO,domain,posInfos);
};
hex_log_Logger.WARN = function(o,domain,posInfos) {
	hex_log_Logger.getInstance().log(o,hex_log_LogLevel._WARN,domain,posInfos);
};
hex_log_Logger.ERROR = function(o,domain,posInfos) {
	hex_log_Logger.getInstance().log(o,hex_log_LogLevel._ERROR,domain,posInfos);
};
hex_log_Logger.FATAL = function(o,domain,posInfos) {
	hex_log_Logger.getInstance().log(o,hex_log_LogLevel._FATAL,domain,posInfos);
};
hex_log_Logger.CLEAR = function(domain) {
	hex_log_Logger.getInstance().clear();
};
hex_log_Logger.prototype = {
	setLevel: function(level) {
		this._level = level;
	}
	,getLevel: function() {
		return this._level;
	}
	,clear: function() {
		this._dispatcher.dispatch(hex_log_LoggerMessage.CLEAR);
	}
	,log: function(o,level,domain,posInfos) {
		if(this._level.get_value() <= level.get_value()) this._dispatcher.dispatch(hex_log_LoggerMessage.LOG,domain,[new hex_log_LoggerMessage(o,level,domain == null?hex_domain_NoDomain.DOMAIN:domain,posInfos)]);
	}
	,addListener: function(listener,domain) {
		this._dispatcher.addHandler(hex_log_LoggerMessage.LOG,listener,$bind(listener,listener.onLog),domain);
		return this._dispatcher.addHandler(hex_log_LoggerMessage.CLEAR,listener,$bind(listener,listener.onClear),domain);
	}
	,removeListener: function(listener,domain) {
		this._dispatcher.removeHandler(hex_log_LoggerMessage.LOG,listener,$bind(listener,listener.onLog),domain);
		return this._dispatcher.removeHandler(hex_log_LoggerMessage.CLEAR,listener,$bind(listener,listener.onClear),domain);
	}
	,isRegistered: function(listener,domain) {
		return this._dispatcher.isRegistered(listener,hex_log_LoggerMessage.LOG,domain);
	}
	,removeAllListeners: function() {
		this._dispatcher.removeAllListeners();
	}
	,toString: function() {
		return hex_log_Stringifier.stringify(this);
	}
	,__class__: hex_log_Logger
};
var hex_log_LogLevel = function(value) {
	this.value = value;
};
$hxClasses["hex.log.LogLevel"] = hex_log_LogLevel;
hex_log_LogLevel.__name__ = ["hex","log","LogLevel"];
hex_log_LogLevel.__properties__ = {get_OFF:"get_OFF",get_FATAL:"get_FATAL",get_ERROR:"get_ERROR",get_WARN:"get_WARN",get_INFO:"get_INFO",get_DEBUG:"get_DEBUG",get_ALL:"get_ALL",get_LEVELS:"get_LEVELS"}
hex_log_LogLevel.get_LEVELS = function() {
	return [hex_log_LogLevel._ALL,hex_log_LogLevel._DEBUG,hex_log_LogLevel._INFO,hex_log_LogLevel._WARN,hex_log_LogLevel._ERROR,hex_log_LogLevel._FATAL,hex_log_LogLevel._OFF];
};
hex_log_LogLevel.get_ALL = function() {
	return hex_log_LogLevel._ALL;
};
hex_log_LogLevel.get_DEBUG = function() {
	return hex_log_LogLevel._DEBUG;
};
hex_log_LogLevel.get_INFO = function() {
	return hex_log_LogLevel._INFO;
};
hex_log_LogLevel.get_WARN = function() {
	return hex_log_LogLevel._WARN;
};
hex_log_LogLevel.get_ERROR = function() {
	return hex_log_LogLevel._ERROR;
};
hex_log_LogLevel.get_FATAL = function() {
	return hex_log_LogLevel._FATAL;
};
hex_log_LogLevel.get_OFF = function() {
	return hex_log_LogLevel._OFF;
};
hex_log_LogLevel.prototype = {
	get_value: function() {
		return this.value;
	}
	,toString: function() {
		var _g = this.get_value();
		switch(_g) {
		case 0:
			return "ALL";
		case 10000:
			return "DEBUG";
		case 20000:
			return "INFO";
		case 30000:
			return "WARN";
		case 40000:
			return "ERROR";
		case 50000:
			return "FATAL";
		case 60000:
			return "OFF";
		}
		return "";
	}
	,__class__: hex_log_LogLevel
	,__properties__: {get_value:"get_value"}
};
var hex_ioc_core_CoreFactory = function(injector,annotationProvider) {
	this._injector = injector;
	this._annotationProvider = annotationProvider;
	this._dispatcher = new hex_event_Dispatcher();
	this._map = new haxe_ds_StringMap();
};
$hxClasses["hex.ioc.core.CoreFactory"] = hex_ioc_core_CoreFactory;
hex_ioc_core_CoreFactory.__name__ = ["hex","ioc","core","CoreFactory"];
hex_ioc_core_CoreFactory.__interfaces__ = [hex_ioc_core_ICoreFactory];
hex_ioc_core_CoreFactory.setFastEvalMethod = function(method) {
	hex_ioc_core_CoreFactory._fastEvalMethod = method;
};
hex_ioc_core_CoreFactory.prototype = {
	getAnnotationProvider: function() {
		return this._annotationProvider;
	}
	,addListener: function(listener) {
		return this._dispatcher.addListener(listener);
	}
	,removeListener: function(listener) {
		return this._dispatcher.removeListener(listener);
	}
	,keys: function() {
		var a = [];
		var it = this._map.keys();
		while(it.hasNext()) a.push(it.next());
		return a;
	}
	,values: function() {
		var a = [];
		var it = this._map.iterator();
		while(it.hasNext()) a.push(it.next());
		return a;
	}
	,locate: function(key) {
		if(this._map.exists(key)) return this._map.get(key); else if(key.indexOf(".") != -1) {
			var props = key.split(".");
			var baseKey = props.shift();
			if(this._map.exists(baseKey)) {
				var target = this._map.get(baseKey);
				return this.fastEvalFromTarget(target,props.join("."));
			}
		}
		throw new js__$Boot_HaxeError(new hex_error_NoSuchElementException("Can't find item with '" + key + "' key in " + hex_log_Stringifier.stringify(this),{ fileName : "CoreFactory.hx", lineNumber : 87, className : "hex.ioc.core.CoreFactory", methodName : "locate"}));
	}
	,isRegisteredWithKey: function(key) {
		var key1 = key;
		return this._map.exists(key1);
	}
	,isInstanceRegistered: function(instance) {
		return (function($this) {
			var $r;
			var _this = $this.values();
			var x = instance;
			$r = HxOverrides.indexOf(_this,x,0);
			return $r;
		}(this)) != -1;
	}
	,register: function(key,element) {
		if(!this._map.exists(key)) {
			var value = element;
			this._map.set(key,value);
			this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
			return true;
		} else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("register(" + key + ", " + Std.string(element) + ") fails, key is already registered.",{ fileName : "CoreFactory.hx", lineNumber : 110, className : "hex.ioc.core.CoreFactory", methodName : "register"}));
	}
	,unregisterWithKey: function(key) {
		if(this._map.exists(key)) {
			var instance = this._map.get(key);
			this._map.remove(key);
			this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
			return true;
		} else return false;
	}
	,unregister: function(instance) {
		var key = this.getKeyOfInstance(instance);
		if(key != null) return this.unregisterWithKey(key); else return false;
	}
	,getKeyOfInstance: function(instance) {
		var iterator = this._map.keys();
		while(iterator.hasNext()) {
			var key = iterator.next();
			if(this._map.get(key) == instance) return key;
		}
		return null;
	}
	,add: function(map) {
		var iterator = map.keys();
		while(iterator.hasNext()) {
			var key = iterator.next();
			try {
				this.register(key,__map_reserved[key] != null?map.getReserved(key):map.h[key]);
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				if( js_Boot.__instanceof(e,hex_error_IllegalArgumentException) ) {
					e.message = Std.string(this) + ".add() fails. " + e.message;
					throw new js__$Boot_HaxeError(e);
				} else throw(e);
			}
		}
	}
	,buildInstance: function(qualifiedClassName,args,factoryMethod,singletonAccess,instantiateUnmapped) {
		if(instantiateUnmapped == null) instantiateUnmapped = false;
		var classReference;
		try {
			classReference = hex_util_ClassUtil.getClassReference(qualifiedClassName);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			if( js_Boot.__instanceof(e,hex_error_IllegalArgumentException) ) {
				throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("'" + qualifiedClassName + "' class is not available in current domain",{ fileName : "CoreFactory.hx", lineNumber : 179, className : "hex.ioc.core.CoreFactory", methodName : "buildInstance"}));
			} else throw(e);
		}
		var obj = null;
		if(instantiateUnmapped) obj = this._injector.instantiateUnmapped(classReference); else if(factoryMethod != null) {
			if(singletonAccess != null) {
				var inst = null;
				var singletonCall = Reflect.field(classReference,singletonAccess);
				if(singletonCall != null) inst = singletonCall(); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(qualifiedClassName + "." + singletonAccess + "()' singleton access failed.",{ fileName : "CoreFactory.hx", lineNumber : 201, className : "hex.ioc.core.CoreFactory", methodName : "buildInstance"}));
				var methodReference = Reflect.field(inst,factoryMethod);
				if(methodReference != null) obj = Reflect.callMethod(inst,methodReference,args); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(qualifiedClassName + "." + singletonAccess + "()." + factoryMethod + "()' factory method call failed.",{ fileName : "CoreFactory.hx", lineNumber : 211, className : "hex.ioc.core.CoreFactory", methodName : "buildInstance"}));
			} else {
				var methodReference1 = Reflect.field(classReference,factoryMethod);
				if(methodReference1 != null) obj = Reflect.callMethod(classReference,methodReference1,args); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(qualifiedClassName + "." + factoryMethod + "()' factory method call failed.",{ fileName : "CoreFactory.hx", lineNumber : 224, className : "hex.ioc.core.CoreFactory", methodName : "buildInstance"}));
			}
		} else if(singletonAccess != null) {
			var singletonCall1 = Reflect.field(classReference,singletonAccess);
			if(singletonCall1 != null) obj = singletonCall1(); else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(qualifiedClassName + "." + singletonAccess + "()' singleton call failed.",{ fileName : "CoreFactory.hx", lineNumber : 237, className : "hex.ioc.core.CoreFactory", methodName : "buildInstance"}));
		} else {
			try {
				obj = Type.createInstance(classReference,args != null?args:[]);
			} catch( e1 ) {
				if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
				throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("Instantiation of class '" + qualifiedClassName + "' failed with arguments: " + Std.string(args) + " : " + Std.string(e1),{ fileName : "CoreFactory.hx", lineNumber : 248, className : "hex.ioc.core.CoreFactory", methodName : "buildInstance"}));
			}
			if(js_Boot.__instanceof(obj,hex_core_IAnnotationParsable)) this._annotationProvider.parse(obj);
			if(js_Boot.__instanceof(obj,hex_service_IService)) obj.createConfiguration();
		}
		return obj;
	}
	,clear: function() {
		this._map = new haxe_ds_StringMap();
	}
	,getInjector: function() {
		return this._injector;
	}
	,fastEvalFromTarget: function(target,toEval) {
		return hex_ioc_core_CoreFactory._fastEvalMethod(target,toEval,this);
	}
	,__class__: hex_ioc_core_CoreFactory
};
var hex_ioc_core_IDExpert = function() {
	this._map = new haxe_ds_StringMap();
};
$hxClasses["hex.ioc.core.IDExpert"] = hex_ioc_core_IDExpert;
hex_ioc_core_IDExpert.__name__ = ["hex","ioc","core","IDExpert"];
hex_ioc_core_IDExpert.prototype = {
	isRegistered: function(id) {
		return this._map.exists(id);
	}
	,clear: function() {
		this._map = new haxe_ds_StringMap();
	}
	,register: function(id) {
		if(this._map.exists(id)) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(Std.string(this) + ".register(" + id + ") failed. This id was already registered, check conflicts in your config file.",{ fileName : "IDExpert.hx", lineNumber : 32, className : "hex.ioc.core.IDExpert", methodName : "register"})); else {
			this._map.set(id,true);
			return true;
		}
		return false;
	}
	,unregister: function(id) {
		if(this.isRegistered(id)) {
			this._map.remove(id);
			return true;
		} else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException(Std.string(this) + ".unregister(" + id + ") failed.",{ fileName : "IDExpert.hx", lineNumber : 52, className : "hex.ioc.core.IDExpert", methodName : "unregister"}));
		return false;
	}
	,__class__: hex_ioc_core_IDExpert
};
var hex_ioc_di_ContextOwnerWrapper = function(coreFactory,id) {
	this._coreFactory = coreFactory;
	this._id = id;
};
$hxClasses["hex.ioc.di.ContextOwnerWrapper"] = hex_ioc_di_ContextOwnerWrapper;
hex_ioc_di_ContextOwnerWrapper.__name__ = ["hex","ioc","di","ContextOwnerWrapper"];
hex_ioc_di_ContextOwnerWrapper.__interfaces__ = [hex_di_IContextOwner];
hex_ioc_di_ContextOwnerWrapper.prototype = {
	getInjector: function() {
		return this._coreFactory.locate(this._id).getInjector();
	}
	,__class__: hex_ioc_di_ContextOwnerWrapper
};
var hex_ioc_di_MappingConfiguration = function() {
	this._mapping = new hex_collection_HashMap();
	hex_collection_Locator.call(this);
};
$hxClasses["hex.ioc.di.MappingConfiguration"] = hex_ioc_di_MappingConfiguration;
hex_ioc_di_MappingConfiguration.__name__ = ["hex","ioc","di","MappingConfiguration"];
hex_ioc_di_MappingConfiguration.__interfaces__ = [hex_config_stateful_IStatefulConfig];
hex_ioc_di_MappingConfiguration.__super__ = hex_collection_Locator;
hex_ioc_di_MappingConfiguration.prototype = $extend(hex_collection_Locator.prototype,{
	configure: function(injector,dispatcher,module) {
		var keys = this.keys();
		var _g = 0;
		while(_g < keys.length) {
			var className = keys[_g];
			++_g;
			var separatorIndex = className.indexOf("#");
			var classKey;
			if(separatorIndex != -1) classKey = Type.resolveClass(HxOverrides.substr(className,separatorIndex + 1,null)); else classKey = Type.resolveClass(className);
			var helper = this.locate(className);
			var mapped = helper.value;
			if(js_Boot.__instanceof(mapped,Class)) {
				if(helper.isSingleton) injector.mapToSingleton(classKey,mapped,helper.mapName); else injector.mapToType(classKey,mapped,helper.mapName);
			} else {
				if(js_Boot.__instanceof(mapped,hex_service_stateful_IStatefulService)) {
					var serviceDispatcher = mapped.getDispatcher();
					if(serviceDispatcher != null) serviceDispatcher.add(dispatcher);
				}
				injector.mapToValue(classKey,mapped,helper.mapName);
			}
			this._mapping.put(classKey,mapped);
		}
	}
	,addMapping: function(type,value,mapName,asSingleton) {
		if(asSingleton == null) asSingleton = false;
		if(mapName == null) mapName = "";
		return this._registerMapping(type,new hex_ioc_di__$MappingConfiguration_Helper(value,mapName,asSingleton),mapName);
	}
	,getMapping: function() {
		return this._mapping;
	}
	,_registerMapping: function(type,helper,mapName) {
		if(mapName == null) mapName = "";
		var className;
		className = (mapName != ""?mapName + "#":"") + Type.getClassName(type);
		return this.register(className,helper);
	}
	,_dispatchRegisterEvent: function(key,element) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
	}
	,_dispatchUnregisterEvent: function(key) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
	}
	,__class__: hex_ioc_di_MappingConfiguration
});
var hex_ioc_di__$MappingConfiguration_Helper = function(value,mapName,isSingleton) {
	if(isSingleton == null) isSingleton = false;
	this.value = value;
	this.mapName = mapName;
	this.isSingleton = isSingleton;
};
$hxClasses["hex.ioc.di._MappingConfiguration.Helper"] = hex_ioc_di__$MappingConfiguration_Helper;
hex_ioc_di__$MappingConfiguration_Helper.__name__ = ["hex","ioc","di","_MappingConfiguration","Helper"];
hex_ioc_di__$MappingConfiguration_Helper.prototype = {
	toString: function() {
		return "Helper( value:" + Std.string(this.value) + ", mapName:" + this.mapName + ", isSingleton:" + Std.string(this.isSingleton) + " )";
	}
	,__class__: hex_ioc_di__$MappingConfiguration_Helper
};
var hex_ioc_error_BuildingException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.ioc.error.BuildingException"] = hex_ioc_error_BuildingException;
hex_ioc_error_BuildingException.__name__ = ["hex","ioc","error","BuildingException"];
hex_ioc_error_BuildingException.__super__ = hex_error_Exception;
hex_ioc_error_BuildingException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_ioc_error_BuildingException
});
var hex_ioc_error_ParsingException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.ioc.error.ParsingException"] = hex_ioc_error_ParsingException;
hex_ioc_error_ParsingException.__name__ = ["hex","ioc","error","ParsingException"];
hex_ioc_error_ParsingException.__super__ = hex_error_Exception;
hex_ioc_error_ParsingException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_ioc_error_ParsingException
});
var hex_ioc_locator_ConstructorVOLocator = function() {
	hex_collection_Locator.call(this);
};
$hxClasses["hex.ioc.locator.ConstructorVOLocator"] = hex_ioc_locator_ConstructorVOLocator;
hex_ioc_locator_ConstructorVOLocator.__name__ = ["hex","ioc","locator","ConstructorVOLocator"];
hex_ioc_locator_ConstructorVOLocator.__super__ = hex_collection_Locator;
hex_ioc_locator_ConstructorVOLocator.prototype = $extend(hex_collection_Locator.prototype,{
	_dispatchRegisterEvent: function(key,element) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
	}
	,_dispatchUnregisterEvent: function(key) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
	}
	,__class__: hex_ioc_locator_ConstructorVOLocator
});
var hex_ioc_locator_DomainListenerVOLocator = function() {
	hex_collection_Locator.call(this);
};
$hxClasses["hex.ioc.locator.DomainListenerVOLocator"] = hex_ioc_locator_DomainListenerVOLocator;
hex_ioc_locator_DomainListenerVOLocator.__name__ = ["hex","ioc","locator","DomainListenerVOLocator"];
hex_ioc_locator_DomainListenerVOLocator.__super__ = hex_collection_Locator;
hex_ioc_locator_DomainListenerVOLocator.prototype = $extend(hex_collection_Locator.prototype,{
	_dispatchRegisterEvent: function(key,element) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
	}
	,_dispatchUnregisterEvent: function(key) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
	}
	,__class__: hex_ioc_locator_DomainListenerVOLocator
});
var hex_ioc_locator_MethodCallVOLocator = function() {
	hex_collection_Locator.call(this);
};
$hxClasses["hex.ioc.locator.MethodCallVOLocator"] = hex_ioc_locator_MethodCallVOLocator;
hex_ioc_locator_MethodCallVOLocator.__name__ = ["hex","ioc","locator","MethodCallVOLocator"];
hex_ioc_locator_MethodCallVOLocator.__super__ = hex_collection_Locator;
hex_ioc_locator_MethodCallVOLocator.prototype = $extend(hex_collection_Locator.prototype,{
	_dispatchRegisterEvent: function(key,element) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
	}
	,_dispatchUnregisterEvent: function(key) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
	}
	,__class__: hex_ioc_locator_MethodCallVOLocator
});
var hex_ioc_locator_ModuleLocator = function(contextFactory) {
	hex_collection_Locator.call(this);
	this._contextFactory = contextFactory;
};
$hxClasses["hex.ioc.locator.ModuleLocator"] = hex_ioc_locator_ModuleLocator;
hex_ioc_locator_ModuleLocator.__name__ = ["hex","ioc","locator","ModuleLocator"];
hex_ioc_locator_ModuleLocator.__super__ = hex_collection_Locator;
hex_ioc_locator_ModuleLocator.prototype = $extend(hex_collection_Locator.prototype,{
	_dispatchRegisterEvent: function(key,element) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
	}
	,_dispatchUnregisterEvent: function(key) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
	}
	,__class__: hex_ioc_locator_ModuleLocator
});
var hex_ioc_locator_ObservableLocator = function(contextFactory) {
	hex_collection_Locator.call(this);
	this._contextFactory = contextFactory;
};
$hxClasses["hex.ioc.locator.ObservableLocator"] = hex_ioc_locator_ObservableLocator;
hex_ioc_locator_ObservableLocator.__name__ = ["hex","ioc","locator","ObservableLocator"];
hex_ioc_locator_ObservableLocator.__super__ = hex_collection_Locator;
hex_ioc_locator_ObservableLocator.prototype = $extend(hex_collection_Locator.prototype,{
	_dispatchRegisterEvent: function(key,element) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
	}
	,_dispatchUnregisterEvent: function(key) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
	}
	,__class__: hex_ioc_locator_ObservableLocator
});
var hex_ioc_locator_PropertyVOLocator = function() {
	hex_collection_Locator.call(this);
};
$hxClasses["hex.ioc.locator.PropertyVOLocator"] = hex_ioc_locator_PropertyVOLocator;
hex_ioc_locator_PropertyVOLocator.__name__ = ["hex","ioc","locator","PropertyVOLocator"];
hex_ioc_locator_PropertyVOLocator.__super__ = hex_collection_Locator;
hex_ioc_locator_PropertyVOLocator.prototype = $extend(hex_collection_Locator.prototype,{
	__class__: hex_ioc_locator_PropertyVOLocator
});
var hex_ioc_locator_StateTransitionVOLocator = function(contextFactory) {
	hex_collection_Locator.call(this);
	this._contextFactory = contextFactory;
};
$hxClasses["hex.ioc.locator.StateTransitionVOLocator"] = hex_ioc_locator_StateTransitionVOLocator;
hex_ioc_locator_StateTransitionVOLocator.__name__ = ["hex","ioc","locator","StateTransitionVOLocator"];
hex_ioc_locator_StateTransitionVOLocator.__super__ = hex_collection_Locator;
hex_ioc_locator_StateTransitionVOLocator.prototype = $extend(hex_collection_Locator.prototype,{
	release: function() {
		hex_state_StateUnmapper.release();
		hex_collection_Locator.prototype.release.call(this);
	}
	,_dispatchRegisterEvent: function(key,element) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.REGISTER,[key,element]);
	}
	,_dispatchUnregisterEvent: function(key) {
		this._dispatcher.dispatch(hex_collection_LocatorMessage.UNREGISTER,[key]);
	}
	,__class__: hex_ioc_locator_StateTransitionVOLocator
});
var hex_ioc_parser_xml_XMLAttributeUtil = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'XMLAttributeUtil' class can't be instantiated.",{ fileName : "XMLAttributeUtil.hx", lineNumber : 14, className : "hex.ioc.parser.xml.XMLAttributeUtil", methodName : "new"}));
};
$hxClasses["hex.ioc.parser.xml.XMLAttributeUtil"] = hex_ioc_parser_xml_XMLAttributeUtil;
hex_ioc_parser_xml_XMLAttributeUtil.__name__ = ["hex","ioc","parser","xml","XMLAttributeUtil"];
hex_ioc_parser_xml_XMLAttributeUtil.getID = function(xml) {
	return xml.get("id");
};
hex_ioc_parser_xml_XMLAttributeUtil.getType = function(xml) {
	return xml.get("type");
};
hex_ioc_parser_xml_XMLAttributeUtil.getName = function(xml) {
	return xml.get("name");
};
hex_ioc_parser_xml_XMLAttributeUtil.getRef = function(xml) {
	return xml.get("ref");
};
hex_ioc_parser_xml_XMLAttributeUtil.getValue = function(xml) {
	return xml.get("value");
};
hex_ioc_parser_xml_XMLAttributeUtil.getFactoryMethod = function(xml) {
	return xml.get("factory");
};
hex_ioc_parser_xml_XMLAttributeUtil.getSingletonAccess = function(xml) {
	return xml.get("singleton-access");
};
hex_ioc_parser_xml_XMLAttributeUtil.getInjectInto = function(xml) {
	return xml.get("inject-into") == "true";
};
hex_ioc_parser_xml_XMLAttributeUtil.getMethod = function(xml) {
	return xml.get("method");
};
hex_ioc_parser_xml_XMLAttributeUtil.getParserClass = function(xml) {
	return xml.get("parser-class");
};
hex_ioc_parser_xml_XMLAttributeUtil.getLocator = function(xml) {
	return xml.get("locator");
};
hex_ioc_parser_xml_XMLAttributeUtil.getAttribute = function(xml,attName) {
	return xml.get(attName);
};
hex_ioc_parser_xml_XMLAttributeUtil.getMapType = function(xml) {
	return xml.get("map-type");
};
hex_ioc_parser_xml_XMLAttributeUtil.getMapName = function(xml) {
	return xml.get("map-name");
};
hex_ioc_parser_xml_XMLAttributeUtil.getAsSingleton = function(xml) {
	return xml.get("as-singleton") == "true";
};
hex_ioc_parser_xml_XMLAttributeUtil.getStaticRef = function(xml) {
	return xml.get("static-ref");
};
hex_ioc_parser_xml_XMLAttributeUtil.getCommandClass = function(xml) {
	return xml.get("command-class");
};
hex_ioc_parser_xml_XMLAttributeUtil.getFireOnce = function(xml) {
	return xml.get("fire-once") == "true";
};
hex_ioc_parser_xml_XMLAttributeUtil.getContextOwner = function(xml) {
	return xml.get("context-owner");
};
hex_ioc_parser_xml_XMLAttributeUtil.getIf = function(xml) {
	return xml.get("if");
};
hex_ioc_parser_xml_XMLAttributeUtil.getIfNot = function(xml) {
	return xml.get("if-not");
};
hex_ioc_parser_xml_XMLAttributeUtil.prototype = {
	__class__: hex_ioc_parser_xml_XMLAttributeUtil
};
var hex_ioc_parser_xml_XMLParserUtil = function() {
};
$hxClasses["hex.ioc.parser.xml.XMLParserUtil"] = hex_ioc_parser_xml_XMLParserUtil;
hex_ioc_parser_xml_XMLParserUtil.__name__ = ["hex","ioc","parser","xml","XMLParserUtil"];
hex_ioc_parser_xml_XMLParserUtil.getArguments = function(ownerID,xml,type) {
	var args = [];
	var iterator = xml.elementsNamed("argument");
	if(iterator.hasNext()) while(iterator.hasNext()) args.push(hex_ioc_parser_xml_XMLParserUtil._getConstructorVOFromXML(ownerID,iterator.next())); else {
		var value = hex_ioc_parser_xml_XMLAttributeUtil.getValue(xml);
		if(value != null) args.push(new hex_ioc_vo_ConstructorVO(ownerID,"String",[xml.get("value")]));
	}
	return args;
};
hex_ioc_parser_xml_XMLParserUtil._getConstructorVOFromXML = function(ownerID,item) {
	var method = item.get("method");
	var ref = item.get("ref");
	var staticRef = item.get("static-ref");
	if(method != null) return new hex_ioc_vo_ConstructorVO(null,"Function",[method]); else if(ref != null) return new hex_ioc_vo_ConstructorVO(null,"Instance",null,null,null,false,item.get("ref")); else if(staticRef != null) return new hex_ioc_vo_ConstructorVO(null,"StaticVariable",null,null,null,false,null,null,item.get("static-ref")); else {
		var type = item.get("type");
		if(type == null) type = "String";
		return new hex_ioc_vo_ConstructorVO(ownerID,type,[item.get("value")]);
	}
};
hex_ioc_parser_xml_XMLParserUtil._getConstructorVO = function(ownerID,item) {
	var type = item.type;
	var method = item.method;
	var ref = item.ref;
	var staticRef = item.staticRef;
	var value = item.value;
	if(method != null) return new hex_ioc_vo_ConstructorVO(null,"Function",[method]); else if(ref != null) return new hex_ioc_vo_ConstructorVO(null,"Instance",null,null,null,false,ref); else if(staticRef != null) return new hex_ioc_vo_ConstructorVO(null,"Instance",null,null,null,false,null,null,staticRef); else {
		if(type == null) type = "String";
		return new hex_ioc_vo_ConstructorVO(ownerID,type,[value]);
	}
};
hex_ioc_parser_xml_XMLParserUtil.getMethodCallArguments = function(ownerID,xml) {
	var args = [];
	var iterator = xml.elementsNamed("argument");
	while(iterator.hasNext()) args.push(hex_ioc_parser_xml_XMLParserUtil._getConstructorVOFromXML(ownerID,iterator.next()));
	return args;
};
hex_ioc_parser_xml_XMLParserUtil.getEventArguments = function(xml) {
	var args = [];
	var iterator = xml.elementsNamed("event");
	while(iterator.hasNext()) {
		var item = iterator.next();
		var domainListenerVOArguments = new hex_ioc_vo_DomainListenerVOArguments();
		domainListenerVOArguments.staticRef = item.get("static-ref");
		domainListenerVOArguments.method = item.get("method");
		domainListenerVOArguments.strategy = item.get("strategy");
		domainListenerVOArguments.injectedInModule = item.get("injectedInModule") == "true";
		args.push(domainListenerVOArguments);
	}
	return args;
};
hex_ioc_parser_xml_XMLParserUtil.getMapArguments = function(ownerID,xml) {
	var args = [];
	var iterator = xml.elementsNamed("item");
	while(iterator.hasNext()) {
		var item = iterator.next();
		var keyList = item.elementsNamed("key");
		var valueList = item.elementsNamed("value");
		if(keyList.hasNext()) {
			var key = hex_ioc_parser_xml_XMLParserUtil._getAttributes(keyList.next());
			var value = hex_ioc_parser_xml_XMLParserUtil._getAttributes(valueList.next());
			args.push(new hex_ioc_vo_MapVO(hex_ioc_parser_xml_XMLParserUtil._getConstructorVO(ownerID,key),hex_ioc_parser_xml_XMLParserUtil._getConstructorVO(ownerID,value),hex_ioc_parser_xml_XMLAttributeUtil.getMapName(item),hex_ioc_parser_xml_XMLAttributeUtil.getAsSingleton(item)));
		}
	}
	return args;
};
hex_ioc_parser_xml_XMLParserUtil._getAttributes = function(xml) {
	var obj = { };
	var iterator = xml.attributes();
	while(iterator.hasNext()) {
		var attribute = iterator.next();
		Reflect.setField(obj,attribute,xml.get(attribute));
	}
	return obj;
};
hex_ioc_parser_xml_XMLParserUtil.getIfList = function(xml) {
	var s = hex_ioc_parser_xml_XMLAttributeUtil.getIf(xml);
	if(s != null) return s.split(","); else return null;
};
hex_ioc_parser_xml_XMLParserUtil.getIfNotList = function(xml) {
	var s = hex_ioc_parser_xml_XMLAttributeUtil.getIfNot(xml);
	if(s != null) return s.split(","); else return null;
};
hex_ioc_parser_xml_XMLParserUtil.prototype = {
	__class__: hex_ioc_parser_xml_XMLParserUtil
};
var hex_ioc_vo_CommandMappingVO = function(commandClassName,fireOnce,contextOwner) {
	if(fireOnce == null) fireOnce = false;
	this.commandClassName = commandClassName;
	this.fireOnce = fireOnce;
	this.contextOwner = contextOwner;
};
$hxClasses["hex.ioc.vo.CommandMappingVO"] = hex_ioc_vo_CommandMappingVO;
hex_ioc_vo_CommandMappingVO.__name__ = ["hex","ioc","vo","CommandMappingVO"];
hex_ioc_vo_CommandMappingVO.prototype = {
	__class__: hex_ioc_vo_CommandMappingVO
};
var hex_ioc_vo_ConstructorVO = function(id,type,args,factory,singleton,injectInto,ref,mapType,staticRef) {
	if(injectInto == null) injectInto = false;
	this.ID = id;
	this.type = type;
	this["arguments"] = args;
	this.factory = factory;
	this.singleton = singleton;
	this.injectInto = injectInto;
	this.ref = ref;
	this.mapType = mapType;
	this.staticRef = staticRef;
};
$hxClasses["hex.ioc.vo.ConstructorVO"] = hex_ioc_vo_ConstructorVO;
hex_ioc_vo_ConstructorVO.__name__ = ["hex","ioc","vo","ConstructorVO"];
hex_ioc_vo_ConstructorVO.prototype = {
	toString: function() {
		return "(" + "id:" + this.ID + ", " + "type:" + this.type + ", " + "arguments:[" + Std.string(this["arguments"]) + "], " + "factory:" + this.factory + ", " + "singleton:" + this.singleton + ", " + "injectInto:" + Std.string(this.injectInto) + ", " + "ref:" + this.ref + ", " + "mapType:" + this.mapType + ", " + "staticRef:" + this.staticRef + ")";
	}
	,__class__: hex_ioc_vo_ConstructorVO
};
var hex_ioc_vo_DomainListenerVO = function(ownerID,listenedDomainName,$arguments) {
	this.ownerID = ownerID;
	this.listenedDomainName = listenedDomainName;
	this["arguments"] = $arguments;
};
$hxClasses["hex.ioc.vo.DomainListenerVO"] = hex_ioc_vo_DomainListenerVO;
hex_ioc_vo_DomainListenerVO.__name__ = ["hex","ioc","vo","DomainListenerVO"];
hex_ioc_vo_DomainListenerVO.prototype = {
	__class__: hex_ioc_vo_DomainListenerVO
};
var hex_ioc_vo_DomainListenerVOArguments = function(staticRef,method,strategy,injectedInModule) {
	if(injectedInModule == null) injectedInModule = false;
	this.injectedInModule = false;
	this.staticRef = staticRef;
	this.method = method;
	this.strategy = strategy;
	this.injectedInModule = injectedInModule;
};
$hxClasses["hex.ioc.vo.DomainListenerVOArguments"] = hex_ioc_vo_DomainListenerVOArguments;
hex_ioc_vo_DomainListenerVOArguments.__name__ = ["hex","ioc","vo","DomainListenerVOArguments"];
hex_ioc_vo_DomainListenerVOArguments.prototype = {
	__class__: hex_ioc_vo_DomainListenerVOArguments
};
var hex_ioc_vo_FactoryVO = function() {
};
$hxClasses["hex.ioc.vo.FactoryVO"] = hex_ioc_vo_FactoryVO;
hex_ioc_vo_FactoryVO.__name__ = ["hex","ioc","vo","FactoryVO"];
hex_ioc_vo_FactoryVO.prototype = {
	__class__: hex_ioc_vo_FactoryVO
};
var hex_ioc_vo_MapVO = function(key,value,mapName,asSingleton) {
	if(asSingleton == null) asSingleton = false;
	this.asSingleton = false;
	this._key = key;
	this._value = value;
	this.mapName = mapName;
	this.asSingleton = asSingleton;
};
$hxClasses["hex.ioc.vo.MapVO"] = hex_ioc_vo_MapVO;
hex_ioc_vo_MapVO.__name__ = ["hex","ioc","vo","MapVO"];
hex_ioc_vo_MapVO.prototype = {
	getPropertyKey: function() {
		return this._key;
	}
	,getPropertyValue: function() {
		return this._value;
	}
	,__class__: hex_ioc_vo_MapVO
};
var hex_ioc_vo_MethodCallVO = function(ownerID,name,args) {
	this.ownerID = ownerID;
	this.name = name;
	this["arguments"] = args;
};
$hxClasses["hex.ioc.vo.MethodCallVO"] = hex_ioc_vo_MethodCallVO;
hex_ioc_vo_MethodCallVO.__name__ = ["hex","ioc","vo","MethodCallVO"];
hex_ioc_vo_MethodCallVO.prototype = {
	__class__: hex_ioc_vo_MethodCallVO
};
var hex_ioc_vo_PropertyVO = function(ownerID,name,value,type,ref,method,staticRef) {
	this.ownerID = ownerID;
	this.name = name;
	this.value = value;
	this.type = type;
	this.ref = ref;
	this.method = method;
	this.staticRef = staticRef;
};
$hxClasses["hex.ioc.vo.PropertyVO"] = hex_ioc_vo_PropertyVO;
hex_ioc_vo_PropertyVO.__name__ = ["hex","ioc","vo","PropertyVO"];
hex_ioc_vo_PropertyVO.prototype = {
	__class__: hex_ioc_vo_PropertyVO
};
var hex_ioc_vo_StateTransitionVO = function(ID,staticReference,instanceReference,enterList,exitList) {
	this.ID = ID;
	this.staticReference = staticReference;
	this.instanceReference = instanceReference;
	this.enterList = enterList;
	this.exitList = exitList;
};
$hxClasses["hex.ioc.vo.StateTransitionVO"] = hex_ioc_vo_StateTransitionVO;
hex_ioc_vo_StateTransitionVO.__name__ = ["hex","ioc","vo","StateTransitionVO"];
hex_ioc_vo_StateTransitionVO.prototype = {
	__class__: hex_ioc_vo_StateTransitionVO
};
var hex_log_ILogger = function() { };
$hxClasses["hex.log.ILogger"] = hex_log_ILogger;
hex_log_ILogger.__name__ = ["hex","log","ILogger"];
hex_log_ILogger.prototype = {
	__class__: hex_log_ILogger
};
var hex_log_DomainLogger = function(domain) {
	if(domain == null) throw new js__$Boot_HaxeError(new hex_error_NullPointerException("Domain should be specified for contructor call",{ fileName : "DomainLogger.hx", lineNumber : 21, className : "hex.log.DomainLogger", methodName : "new"}));
	this._domain = domain;
	this._logger = hex_log_Logger.getInstance();
};
$hxClasses["hex.log.DomainLogger"] = hex_log_DomainLogger;
hex_log_DomainLogger.__name__ = ["hex","log","DomainLogger"];
hex_log_DomainLogger.__interfaces__ = [hex_log_ILogger];
hex_log_DomainLogger.prototype = {
	clear: function() {
		this._logger.clear();
	}
	,debug: function(o,posInfos) {
		this._logger.log(o,hex_log_LogLevel._DEBUG,this._domain,posInfos);
	}
	,info: function(o,posInfos) {
		this._logger.log(o,hex_log_LogLevel._INFO,this._domain,posInfos);
	}
	,warn: function(o,posInfos) {
		this._logger.log(o,hex_log_LogLevel._WARN,this._domain,posInfos);
	}
	,error: function(o,posInfos) {
		this._logger.log(o,hex_log_LogLevel._ERROR,this._domain,posInfos);
	}
	,fatal: function(o,posInfos) {
		this._logger.log(o,hex_log_LogLevel._FATAL,this._domain,posInfos);
	}
	,getDomain: function() {
		return this._domain;
	}
	,__class__: hex_log_DomainLogger
};
var hex_log_ILogListener = function() { };
$hxClasses["hex.log.ILogListener"] = hex_log_ILogListener;
hex_log_ILogListener.__name__ = ["hex","log","ILogListener"];
hex_log_ILogListener.prototype = {
	__class__: hex_log_ILogListener
};
var hex_log_LoggerMessage = function(message,level,domain,posInfos) {
	this.message = message;
	this.level = level;
	this.domain = domain;
	this.posInfos = posInfos;
};
$hxClasses["hex.log.LoggerMessage"] = hex_log_LoggerMessage;
hex_log_LoggerMessage.__name__ = ["hex","log","LoggerMessage"];
hex_log_LoggerMessage.prototype = {
	__class__: hex_log_LoggerMessage
};
var hex_log_layout_JavaScriptConsoleLayout = function() {
};
$hxClasses["hex.log.layout.JavaScriptConsoleLayout"] = hex_log_layout_JavaScriptConsoleLayout;
hex_log_layout_JavaScriptConsoleLayout.__name__ = ["hex","log","layout","JavaScriptConsoleLayout"];
hex_log_layout_JavaScriptConsoleLayout.__interfaces__ = [hex_log_ILogListener];
hex_log_layout_JavaScriptConsoleLayout.prototype = {
	onLog: function(message) {
		var posInfos = message.posInfos;
		var info;
		if(posInfos != null) info = " at " + posInfos.className + "::" + posInfos.methodName + " line " + posInfos.lineNumber + " in file " + posInfos.fileName; else info = "";
		var m;
		if(message.level.get_value() == hex_log_LogLevel._DEBUG.get_value()) m = ($_=window.console,$bind($_,$_.debug)); else if(message.level.get_value() == hex_log_LogLevel._INFO.get_value()) m = ($_=window.console,$bind($_,$_.info)); else if(message.level.get_value() == hex_log_LogLevel._WARN.get_value()) m = ($_=window.console,$bind($_,$_.warn)); else if(message.level.get_value() == hex_log_LogLevel._FATAL.get_value() || message.level.get_value() == hex_log_LogLevel._ERROR.get_value()) m = ($_=window.console,$bind($_,$_.error)); else m = ($_=window.console,$bind($_,$_.log));
		m(message.message,"[" + message.domain.getName() + "]" + info);
	}
	,onClear: function() {
		window.console.clear();
	}
	,__class__: hex_log_layout_JavaScriptConsoleLayout
};
var hex_log_layout_LogLayoutHTMLView = function(proxy,wrapperSelector) {
	if(wrapperSelector == null) wrapperSelector = "body";
	this.consoleWrapperTaget = ".debug-console-list-wrapper";
	this._searchIndex = 0;
	this._searchLength = 0;
	this._levels = new haxe_ds_StringMap();
	this._swipeHorizontalVO = new hex_log_layout_SwipeHorizontalVO();
	this._changePosition = [0,0];
	this._transformPosition = [0,0];
	this._toggleStartPosition = [0,0];
	this._proxy = proxy;
	this._debugWrapperSelector = wrapperSelector;
	this._init();
};
$hxClasses["hex.log.layout.LogLayoutHTMLView"] = hex_log_layout_LogLayoutHTMLView;
hex_log_layout_LogLayoutHTMLView.__name__ = ["hex","log","layout","LogLayoutHTMLView"];
hex_log_layout_LogLayoutHTMLView.prototype = {
	_init: function() {
		this._buildView();
		this._leftArrowButton.addEventListener("click",$bind(this,this._onPreviousSearchButtonClick));
		this._rightArrowButton.addEventListener("click",$bind(this,this._onNextSearchButtonClick));
		this._toggleButton.addEventListener("click",$bind(this,this._toggleDebugConsole));
		this._toggleButton.addEventListener("touchstart",$bind(this,this._onToggleButtonTouchStart));
		this._toggleButton.addEventListener("touchmove",$bind(this,this._onToggleButtonTouchMove));
		this._toggleButton.addEventListener("touchend",$bind(this,this._onToggleButtonTouchEnd));
		this._wrapper.addEventListener("touchstart",$bind(this,this._onWrapperTouchStart));
		this._wrapper.addEventListener("touchmove",$bind(this,this._onWrapperTouchMove));
		this._wrapper.addEventListener("touchend",$bind(this,this._onWrapperTouchEnd));
		this._searchInput.addEventListener("input",$bind(this,this._onSearchStart));
		this._searchInput.addEventListener("keypress",$bind(this,this._onSearchKeyPress));
		this._domainInput.addEventListener("input",$bind(this,this._onSetDomain));
		this._levelSelector.addEventListener("change",$bind(this,this._onChangeLevel));
	}
	,_buildView: function() {
		var document = window.document;
		var container = document.querySelector(this._debugWrapperSelector);
		var debugWrapper = document.createElement("div");
		debugWrapper.style.position = "fixed";
		debugWrapper.innerHTML = hex_log_layout_ConsoleStyle.template;
		container.appendChild(debugWrapper);
		var debugStyle = document.createElement("style");
		debugStyle.innerHTML = hex_log_layout_ConsoleStyle.style;
		container.appendChild(debugStyle);
		this._debugConsole = document.querySelector(".debug-console");
		this._list = document.querySelector(".debug-console-list");
		this._wrapper = document.querySelector(".debug-console-list-wrapper");
		this._toggleButton = document.querySelector(".debug-console-toggle");
		this._leftArrowButton = document.querySelector(".debug-console-control-caret--left");
		this._rightArrowButton = document.querySelector(".debug-console-control-caret--right");
		this._searchInput = document.querySelector(".debug-console-control-item--search input");
		this._domainInput = document.querySelector(".debug-console-control-item--domain input");
		this._levelSelector = document.querySelector(".debug-console-control-item--level select");
		var _g = 0;
		var _g1 = hex_log_LogLevel.get_LEVELS();
		while(_g < _g1.length) {
			var level = _g1[_g];
			++_g;
			var option = document.createElement("option");
			option.innerHTML = level.toString();
			option.value = level.toString();
			var key = level.toString();
			this._levels.set(key,level);
			this._levelSelector.appendChild(option);
		}
		this._toggleButtonRect = this._toggleButton.getBoundingClientRect();
		this._toggleBtnCenter = [this._toggleButtonRect.width / 2,this._toggleButtonRect.height / 2];
	}
	,_buildBehavior: function() {
		this._leftArrowButton.addEventListener("click",$bind(this,this._onPreviousSearchButtonClick));
		this._rightArrowButton.addEventListener("click",$bind(this,this._onNextSearchButtonClick));
		this._toggleButton.addEventListener("click",$bind(this,this._toggleDebugConsole));
		this._toggleButton.addEventListener("touchstart",$bind(this,this._onToggleButtonTouchStart));
		this._toggleButton.addEventListener("touchmove",$bind(this,this._onToggleButtonTouchMove));
		this._toggleButton.addEventListener("touchend",$bind(this,this._onToggleButtonTouchEnd));
		this._wrapper.addEventListener("touchstart",$bind(this,this._onWrapperTouchStart));
		this._wrapper.addEventListener("touchmove",$bind(this,this._onWrapperTouchMove));
		this._wrapper.addEventListener("touchend",$bind(this,this._onWrapperTouchEnd));
		this._searchInput.addEventListener("input",$bind(this,this._onSearchStart));
		this._searchInput.addEventListener("keypress",$bind(this,this._onSearchKeyPress));
		this._domainInput.addEventListener("input",$bind(this,this._onSetDomain));
		this._levelSelector.addEventListener("change",$bind(this,this._onChangeLevel));
	}
	,_onSearchStart: function(e) {
		this._searchIndex = 0;
		this._searchLength = 0;
		if(this._searchInput.value.length < 2) return;
		this._searchLength = this._proxy.searchFor(this._searchInput.value,"<span class=\"highlight-word\">","</span>");
		if(this._searchLength > 0) window.document.getElementById("searchedWord" + this._searchIndex).scrollIntoView();
	}
	,_onSearchKeyPress: function(e) {
		if(e.shiftKey && e.keyCode == 13) this._onPreviousSearchButtonClick(e); else if(e.keyCode == 13) this._onNextSearchButtonClick(e);
	}
	,_onSetDomain: function(e) {
		if(this._levelSelector.value.length < 2) return;
		this._proxy.filter(this._levels.get(this._levelSelector.value),hex_domain_Domain.getDomain(this._domainInput.value));
	}
	,_onChangeLevel: function(e) {
		this._proxy.filter(this._levels.get(this._levelSelector.value),hex_domain_Domain.getDomain(this._domainInput.value));
	}
	,_onToggleButtonTouchStart: function(e) {
		e.preventDefault();
		this._toggleStartPosition = [e.touches[0].pageX,e.touches[0].pageY];
		this._changePosition = this._transformPosition;
		this._tapStartTime = new Date().getTime();
	}
	,_onToggleButtonTouchMove: function(e) {
		e.stopPropagation();
		e.preventDefault();
		var touchList = e.touches[0];
		this._changePosition = [this._transformPosition[0] + touchList.pageX - this._toggleStartPosition[0],this._transformPosition[1] + touchList.pageY - this._toggleStartPosition[1]];
		this._toggleButton.style.transform = "translate(" + this._changePosition[0] + "px, " + this._changePosition[1] + "px)";
	}
	,_onToggleButtonTouchEnd: function(e) {
		this._transformPosition[0] = this._changePosition[0];
		this._transformPosition[1] = this._changePosition[1];
		if((function($this) {
			var $r;
			var a = new Date().getTime() - $this._tapStartTime;
			$r = a < _$UInt_UInt_$Impl_$.toFloat(hex_log_layout_LogLayoutHTMLView.TAP_THRESHOLD);
			return $r;
		}(this))) this._toggleDebugConsole();
	}
	,_onWrapperTouchStart: function(e) {
		var t = e.touches.item(0);
		this._swipeHorizontalVO.startX = t.screenX;
		this._swipeHorizontalVO.startY = t.screenY;
	}
	,_onWrapperTouchMove: function(e) {
		var t = e.touches.item(0);
		this._swipeHorizontalVO.endX = t.screenX;
		this._swipeHorizontalVO.endY = t.screenY;
	}
	,_onWrapperTouchEnd: function(e) {
		if((this._swipeHorizontalVO.endX - hex_log_layout_SwipeHorizontalVO.MIN_X > this._swipeHorizontalVO.startX || this._swipeHorizontalVO.endX + hex_log_layout_SwipeHorizontalVO.MIN_X < this._swipeHorizontalVO.startX) && (this._swipeHorizontalVO.endY < this._swipeHorizontalVO.startY + hex_log_layout_SwipeHorizontalVO.MAX_Y && this._swipeHorizontalVO.startY > this._swipeHorizontalVO.endY - hex_log_layout_SwipeHorizontalVO.MAX_Y && this._swipeHorizontalVO.endX > 0)) {
			if(this._swipeHorizontalVO.endX > this._swipeHorizontalVO.startX) this._onNextSearchButtonClick(e); else this._onPreviousSearchButtonClick(e);
		}
		this._swipeHorizontalVO.startX = this._swipeHorizontalVO.startY = this._swipeHorizontalVO.endX = this._swipeHorizontalVO.endY = 0;
	}
	,_toggleDebugConsole: function() {
		this._debugConsole.classList.toggle("hidden");
	}
	,_onPreviousSearchButtonClick: function(e) {
		e.stopPropagation();
		e.preventDefault();
		if(this._searchLength > 0) {
			this._removeSelectedClass();
			if(this._searchIndex > 0) this._searchIndex = this._searchIndex - 1; else this._searchIndex = this._searchLength - 1;
			this._refreshSelectedItem();
		}
	}
	,_onNextSearchButtonClick: function(e) {
		e.stopPropagation();
		e.preventDefault();
		if(this._searchLength > 0) {
			this._removeSelectedClass();
			if(this._searchIndex < this._searchLength - 1) this._searchIndex = this._searchIndex + 1; else this._searchIndex = 0;
			this._refreshSelectedItem();
		}
	}
	,_removeSelectedClass: function() {
		var item = window.document.getElementById("searchedWord" + this._searchIndex);
		item.parentElement.parentElement.classList.remove("selected");
	}
	,_refreshSelectedItem: function() {
		var item = window.document.getElementById("searchedWord" + this._searchIndex);
		item.scrollIntoView();
		item.parentElement.parentElement.classList.add("selected");
	}
	,__class__: hex_log_layout_LogLayoutHTMLView
};
var hex_log_layout_SwipeHorizontalVO = function() {
	this.endY = 0;
	this.endX = 0;
	this.startY = 0;
	this.startX = 0;
};
$hxClasses["hex.log.layout.SwipeHorizontalVO"] = hex_log_layout_SwipeHorizontalVO;
hex_log_layout_SwipeHorizontalVO.__name__ = ["hex","log","layout","SwipeHorizontalVO"];
hex_log_layout_SwipeHorizontalVO.prototype = {
	__class__: hex_log_layout_SwipeHorizontalVO
};
var hex_log_layout_ConsoleStyle = function() { };
$hxClasses["hex.log.layout.ConsoleStyle"] = hex_log_layout_ConsoleStyle;
hex_log_layout_ConsoleStyle.__name__ = ["hex","log","layout","ConsoleStyle"];
var hex_log_layout_LogProxyLayout = function() {
	this._searchedWord = "";
	this._dispatcher = new hex_log_layout_LogProxyLayoutDispatcher();
	this._messages = [];
	this._filteredLevel = hex_log_LogLevel._ALL;
	this._filteredDomain = hex_log_layout_AllDomain.DOMAIN;
	hex_log_Logger.getInstance().addListener(this);
};
$hxClasses["hex.log.layout.LogProxyLayout"] = hex_log_layout_LogProxyLayout;
hex_log_layout_LogProxyLayout.__name__ = ["hex","log","layout","LogProxyLayout"];
hex_log_layout_LogProxyLayout.__interfaces__ = [hex_log_ILogListener];
hex_log_layout_LogProxyLayout.prototype = {
	onClear: function() {
		this._dispatcher.onClear();
	}
	,onLog: function(message) {
		this._messages.push(message);
		if((this._filteredDomain == hex_log_layout_AllDomain.DOMAIN || this._filteredDomain == message.domain) && (this._filteredLevel == hex_log_LogLevel._ALL || this._filteredLevel == message.level)) this._dispatcher.onLog(message);
	}
	,addListener: function(listener) {
		return this._dispatcher.addListener(listener);
	}
	,removeListener: function(listener) {
		return this._dispatcher.removeListener(listener);
	}
	,filter: function(level,domain) {
		if(level == null) this._filteredLevel = hex_log_LogLevel._ALL; else this._filteredLevel = level;
		if(domain == null) this._filteredDomain = hex_log_layout_AllDomain.DOMAIN; else this._filteredDomain = domain;
		this._dispatcher.onClear();
		this._render();
	}
	,searchFor: function(word,leftSearchSeparator,rightSearchSeparator) {
		if(word == null) word = "";
		this._searchedWord = word;
		this._leftSearchSeparator = leftSearchSeparator;
		this._rightSearchSeparator = rightSearchSeparator;
		this._dispatcher.onClear();
		return this._render();
	}
	,_render: function() {
		var searchLength = 0;
		var _g = 0;
		var _g1 = this._messages;
		while(_g < _g1.length) {
			var message = _g1[_g];
			++_g;
			if((this._filteredDomain == hex_log_layout_AllDomain.DOMAIN || this._filteredDomain == message.domain) && (this._filteredLevel == hex_log_LogLevel._ALL || this._filteredLevel == message.level)) {
				var messageContent = "" + Std.string(message.message);
				if(this._searchedWord.length > 0 && messageContent.indexOf(this._searchedWord) != -1) {
					messageContent = messageContent.split(this._searchedWord).join(this._getLeftSeparator(searchLength,this._leftSearchSeparator) + this._searchedWord + this._rightSearchSeparator);
					searchLength++;
				}
				this._dispatcher.onLog(new hex_log_LoggerMessage(messageContent,message.level,message.domain,message.posInfos));
			}
		}
		return searchLength;
	}
	,_getLeftSeparator: function(index,separator) {
		return separator.split(">").join(" id='searchedWord" + index) + "'>";
	}
	,__class__: hex_log_layout_LogProxyLayout
};
var hex_log_layout_AllDomain = function(domainName) {
	hex_domain_Domain.call(this,domainName);
};
$hxClasses["hex.log.layout.AllDomain"] = hex_log_layout_AllDomain;
hex_log_layout_AllDomain.__name__ = ["hex","log","layout","AllDomain"];
hex_log_layout_AllDomain.__super__ = hex_domain_Domain;
hex_log_layout_AllDomain.prototype = $extend(hex_domain_Domain.prototype,{
	__class__: hex_log_layout_AllDomain
});
var hex_log_layout_LogProxyLayoutDispatcher = function() {
	hex_model_ModelDispatcher.call(this);
};
$hxClasses["hex.log.layout.LogProxyLayoutDispatcher"] = hex_log_layout_LogProxyLayoutDispatcher;
hex_log_layout_LogProxyLayoutDispatcher.__name__ = ["hex","log","layout","LogProxyLayoutDispatcher"];
hex_log_layout_LogProxyLayoutDispatcher.__interfaces__ = [hex_log_ILogListener];
hex_log_layout_LogProxyLayoutDispatcher.__super__ = hex_model_ModelDispatcher;
hex_log_layout_LogProxyLayoutDispatcher.prototype = $extend(hex_model_ModelDispatcher.prototype,{
	onClear: function() {
		var _g = 0;
		var _g1 = this._listeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener.onClear();
		}
	}
	,onLog: function(message) {
		var _g = 0;
		var _g1 = this._listeners;
		while(_g < _g1.length) {
			var listener = _g1[_g];
			++_g;
			listener.onLog(message);
		}
	}
	,__class__: hex_log_layout_LogProxyLayoutDispatcher
});
var hex_log_layout_SimpleBrowserLayout = function(targetID,leveldisplay,domainDisplay,timeDisplay) {
	if(timeDisplay == null) timeDisplay = true;
	if(domainDisplay == null) domainDisplay = true;
	if(leveldisplay == null) leveldisplay = true;
	if(targetID == null) targetID = "console";
	this._timeDisplay = true;
	this._domainDisplay = true;
	this._levelDisplay = true;
	this._setConsole(targetID);
	this.setDomainDisplay(domainDisplay);
	this.setLevelDisplay(leveldisplay);
	this.setDisplayTime(timeDisplay);
	this._createLevelStyle();
};
$hxClasses["hex.log.layout.SimpleBrowserLayout"] = hex_log_layout_SimpleBrowserLayout;
hex_log_layout_SimpleBrowserLayout.__name__ = ["hex","log","layout","SimpleBrowserLayout"];
hex_log_layout_SimpleBrowserLayout.__interfaces__ = [hex_log_ILogListener];
hex_log_layout_SimpleBrowserLayout.prototype = {
	setLevelDisplay: function(b) {
		this._levelDisplay = b;
	}
	,setDomainDisplay: function(b) {
		this._domainDisplay = b;
	}
	,setDisplayTime: function(b) {
		this._timeDisplay = b;
	}
	,_createLevelStyle: function() {
		this._levelStyle = new haxe_ds_ObjectMap();
		this._levelStyle.set(hex_log_LogLevel._DEBUG,"lightgrey");
		this._levelStyle.set(hex_log_LogLevel._INFO,"green");
		this._levelStyle.set(hex_log_LogLevel._WARN,"yellow");
		this._levelStyle.set(hex_log_LogLevel._ERROR,"orange");
		this._levelStyle.set(hex_log_LogLevel._FATAL,"red");
	}
	,_setConsole: function(targetId) {
		this._console = window.document.querySelector(targetId);
		if(this._console == null) throw new js__$Boot_HaxeError(new hex_error_NullPointerException("Div named '" + targetId + "' was not found in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "SimpleBrowserLayout.hx", lineNumber : 67, className : "hex.log.layout.SimpleBrowserLayout", methodName : "_setConsole"}));
		this._console.style.whiteSpace = "pre";
		this._console.style.fontFamily = "Lucida Console";
		this._console.style.fontSize = "11px";
	}
	,onLog: function(loggerMessage) {
		var message = loggerMessage.message;
		var level = loggerMessage.level;
		var domain = loggerMessage.domain;
		var posInfos = loggerMessage.posInfos;
		var leftBracket = this._createElement("[",this._getStyle(level));
		var rightBracket = this._createElement("]",this._getStyle(level));
		var time = this._createElement(this._getTime(),this._getStyle(level));
		var levelName = this._createElement(level.toString(),this._getStyle(level) + "+bold");
		var domainName;
		if(domain != null && domain.getName() != null) domainName = "@" + domain.getName(); else domainName = "";
		var domain1 = this._createElement(domainName,this._getStyle(level));
		var message1 = this._createElement("\t\t" + Std.string(message),this._getStyle(level));
		var info = this._createElement(posInfos != null?" at " + posInfos.className + "::" + posInfos.methodName + " line " + posInfos.lineNumber + " in file " + posInfos.fileName:"",this._getStyle(level));
		this._log(this._getEncapsulateElements([leftBracket,levelName,domain1,rightBracket,message1,info]));
	}
	,onClear: function() {
		this._console.innerHTML = "";
	}
	,_getTime: function() {
		return "" + new Date().getTime();
	}
	,_getStyle: function(level) {
		return this._levelStyle.h[level.__id__];
	}
	,_log: function(element) {
		element.style.marginLeft = "10px";
		element.appendChild(window.document.createTextNode("\n"));
		this._console.appendChild(element);
		this._console.scrollTop = this._console.scrollHeight;
	}
	,_createElement: function(message,color) {
		var span;
		var _this = window.document;
		span = _this.createElement("span");
		span.innerHTML = message;
		if(color != null) this._setAttributes(span,color);
		return span;
	}
	,_getEncapsulateElements: function(elementList) {
		var container;
		var _this = window.document;
		container = _this.createElement("span");
		var _g = 0;
		while(_g < elementList.length) {
			var element = elementList[_g];
			++_g;
			container.appendChild(element);
		}
		return container;
	}
	,_setAttributes: function(element,color) {
		var colorAttributes = color.split("+");
		var _g = 0;
		while(_g < colorAttributes.length) {
			var attr = colorAttributes[_g];
			++_g;
			this._setAttribute(element,attr);
		}
	}
	,_setAttribute: function(element,attr) {
		switch(attr) {
		case "bold":
			element.style.fontWeight = "bold";
			break;
		case "red":
			element.style.color = "#e62323";
			break;
		case "orange":
			element.style.color = "#FF8000";
			break;
		case "yellow":
			element.style.color = "#ffcf18";
			break;
		case "lightgrey":
			element.style.color = "#d9d9d9";
			break;
		case "green":
			element.style.color = "#27fe11";
			break;
		}
	}
	,__class__: hex_log_layout_SimpleBrowserLayout
};
var hex_metadata_IAnnotationProvider = function() { };
$hxClasses["hex.metadata.IAnnotationProvider"] = hex_metadata_IAnnotationProvider;
hex_metadata_IAnnotationProvider.__name__ = ["hex","metadata","IAnnotationProvider"];
hex_metadata_IAnnotationProvider.prototype = {
	__class__: hex_metadata_IAnnotationProvider
};
var hex_metadata_AnnotationProvider = function() {
	this._metadata = new haxe_ds_StringMap();
	this._instances = new haxe_ds_StringMap();
};
$hxClasses["hex.metadata.AnnotationProvider"] = hex_metadata_AnnotationProvider;
hex_metadata_AnnotationProvider.__name__ = ["hex","metadata","AnnotationProvider"];
hex_metadata_AnnotationProvider.__interfaces__ = [hex_metadata_IAnnotationProvider];
hex_metadata_AnnotationProvider.registerToDomain = function(annotationProvider,domain) {
	if(hex_metadata_AnnotationProvider._Domains.h.__keys__[domain.__id__] != null) return false; else {
		hex_metadata_AnnotationProvider._Domains.set(domain,annotationProvider);
		return true;
	}
};
hex_metadata_AnnotationProvider.getAnnotationProvider = function(domain) {
	if(hex_metadata_AnnotationProvider._Domains.h.__keys__[domain.__id__] != null) return hex_metadata_AnnotationProvider._Domains.h[domain.__id__]; else return hex_metadata_AnnotationProvider._Instance;
};
hex_metadata_AnnotationProvider.prototype = {
	registerMetaData: function(metaDataName,scope,providerMethod) {
		if(!this._metadata.exists(metaDataName)) {
			var providerHandler = new hex_metadata__$AnnotationProvider_ProviderHandler(scope,providerMethod);
			this._metadata.set(metaDataName,providerHandler);
			var voCollection = this._instances.get(metaDataName);
			if(voCollection != null) {
				var _g = 0;
				while(_g < voCollection.length) {
					var vo = voCollection[_g];
					++_g;
					if(vo.metaDataName == metaDataName) Reflect.setProperty(vo.owner,vo.propertyName,providerHandler.call(vo.metaDataValue));
				}
			}
		} else throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("registerMetaData failed. '" + metaDataName + "' is already registered in '" + hex_log_Stringifier.stringify(this) + "'",{ fileName : "AnnotationProvider.hx", lineNumber : 72, className : "hex.metadata.AnnotationProvider", methodName : "registerMetaData"}));
	}
	,clear: function() {
		this._metadata = new haxe_ds_StringMap();
		this._instances = new haxe_ds_StringMap();
	}
	,parse: function(instance) {
		var classMetaDataVO = this._parse(instance);
		if(classMetaDataVO != null) {
			var properties = classMetaDataVO.properties;
			var _g = 0;
			while(_g < properties.length) {
				var property = properties[_g];
				++_g;
				var metaDataName = property.metaDataName;
				if(this._metadata.exists(metaDataName)) {
					var providerHandler = this._metadata.get(metaDataName);
					Reflect.setProperty(instance,property.propertyName,providerHandler.call(property.metaDataValue));
				} else {
					var instanceVO = new hex_metadata__$AnnotationProvider_InstanceVO(instance,property.propertyName,property.metaDataName,property.metaDataValue);
					if(this._instances.exists(metaDataName)) this._instances.get(metaDataName).push(instanceVO); else this._instances.set(metaDataName,[instanceVO]);
				}
			}
		}
	}
	,_parse: function(object) {
		var classMetaDataVO = null;
		var classReference;
		if(object == null) classReference = null; else classReference = js_Boot.getClass(object);
		if(classReference != null) {
			if(hex_metadata_AnnotationProvider._META_DATA.containsKey(classReference)) classMetaDataVO = hex_metadata_AnnotationProvider._META_DATA.get(classReference); else {
				classMetaDataVO = new hex_metadata__$AnnotationProvider_ClassMetaDataVO();
				var properties = classMetaDataVO.properties;
				var metadata = haxe_rtti_Meta.getFields(classReference);
				var fields = Reflect.fields(metadata);
				var _g = 0;
				while(_g < fields.length) {
					var propertyName = fields[_g];
					++_g;
					var o = Reflect.field(metadata,propertyName);
					var f = Reflect.fields(o);
					if(f != null) {
						var metaDataName = f[0];
						if(metaDataName != null) {
							var field = Reflect.field(o,metaDataName);
							if(field != null) {
								var metaDataValue = field[0];
								properties.push(new hex_metadata__$AnnotationProvider_PropertyMetaDataVO(propertyName,metaDataName,metaDataValue));
							}
						}
					}
				}
				hex_metadata_AnnotationProvider._META_DATA.put(classReference,classMetaDataVO);
			}
		}
		return classMetaDataVO;
	}
	,registerInjector: function(injector) {
		injector.addEventListener("onPreConstruct",$bind(this,this._onPostconstruct));
	}
	,unregisterInjector: function(injector) {
		injector.removeEventListener("onPreConstruct",$bind(this,this._onPostconstruct));
	}
	,_onPostconstruct: function(event) {
		if(js_Boot.__instanceof(event.instance,hex_core_IAnnotationParsable)) this.parse(event.instance);
	}
	,__class__: hex_metadata_AnnotationProvider
};
var hex_metadata__$AnnotationProvider_ProviderHandler = function(scope,callback) {
	this.scope = scope;
	this.callback = callback;
};
$hxClasses["hex.metadata._AnnotationProvider.ProviderHandler"] = hex_metadata__$AnnotationProvider_ProviderHandler;
hex_metadata__$AnnotationProvider_ProviderHandler.__name__ = ["hex","metadata","_AnnotationProvider","ProviderHandler"];
hex_metadata__$AnnotationProvider_ProviderHandler.prototype = {
	call: function(metaDataValue) {
		return this.callback.apply(this.scope,[metaDataValue]);
	}
	,__class__: hex_metadata__$AnnotationProvider_ProviderHandler
};
var hex_metadata__$AnnotationProvider_ClassMetaDataVO = function() {
	this.properties = [];
};
$hxClasses["hex.metadata._AnnotationProvider.ClassMetaDataVO"] = hex_metadata__$AnnotationProvider_ClassMetaDataVO;
hex_metadata__$AnnotationProvider_ClassMetaDataVO.__name__ = ["hex","metadata","_AnnotationProvider","ClassMetaDataVO"];
hex_metadata__$AnnotationProvider_ClassMetaDataVO.prototype = {
	__class__: hex_metadata__$AnnotationProvider_ClassMetaDataVO
};
var hex_metadata__$AnnotationProvider_PropertyMetaDataVO = function(propertyName,metaDataName,metaDataValue) {
	this.propertyName = propertyName;
	this.metaDataName = metaDataName;
	this.metaDataValue = metaDataValue;
};
$hxClasses["hex.metadata._AnnotationProvider.PropertyMetaDataVO"] = hex_metadata__$AnnotationProvider_PropertyMetaDataVO;
hex_metadata__$AnnotationProvider_PropertyMetaDataVO.__name__ = ["hex","metadata","_AnnotationProvider","PropertyMetaDataVO"];
hex_metadata__$AnnotationProvider_PropertyMetaDataVO.prototype = {
	__class__: hex_metadata__$AnnotationProvider_PropertyMetaDataVO
};
var hex_metadata__$AnnotationProvider_InstanceVO = function(owner,propertyName,metaDataName,metaDataValue) {
	this.owner = owner;
	this.propertyName = propertyName;
	this.metaDataName = metaDataName;
	this.metaDataValue = metaDataValue;
};
$hxClasses["hex.metadata._AnnotationProvider.InstanceVO"] = hex_metadata__$AnnotationProvider_InstanceVO;
hex_metadata__$AnnotationProvider_InstanceVO.__name__ = ["hex","metadata","_AnnotationProvider","InstanceVO"];
hex_metadata__$AnnotationProvider_InstanceVO.prototype = {
	__class__: hex_metadata__$AnnotationProvider_InstanceVO
};
var hex_module_ModuleMessage = function() {
};
$hxClasses["hex.module.ModuleMessage"] = hex_module_ModuleMessage;
hex_module_ModuleMessage.__name__ = ["hex","module","ModuleMessage"];
hex_module_ModuleMessage.prototype = {
	__class__: hex_module_ModuleMessage
};
var hex_module_dependency_IRuntimeDependencies = function() { };
$hxClasses["hex.module.dependency.IRuntimeDependencies"] = hex_module_dependency_IRuntimeDependencies;
hex_module_dependency_IRuntimeDependencies.__name__ = ["hex","module","dependency","IRuntimeDependencies"];
hex_module_dependency_IRuntimeDependencies.prototype = {
	__class__: hex_module_dependency_IRuntimeDependencies
};
var hex_module_dependency_RuntimeDependencies = function() {
};
$hxClasses["hex.module.dependency.RuntimeDependencies"] = hex_module_dependency_RuntimeDependencies;
hex_module_dependency_RuntimeDependencies.__name__ = ["hex","module","dependency","RuntimeDependencies"];
hex_module_dependency_RuntimeDependencies.__interfaces__ = [hex_module_dependency_IRuntimeDependencies];
hex_module_dependency_RuntimeDependencies.prototype = {
	addMappedDependencies: function(serviceDependencies) {
		if(this._mappedDependencies == null) this._mappedDependencies = [];
		this._mappedDependencies = this._mappedDependencies.concat(serviceDependencies);
	}
	,getMappedDependencies: function() {
		return this._mappedDependencies;
	}
	,hasMappedDependencies: function() {
		return this._mappedDependencies != null;
	}
	,__class__: hex_module_dependency_RuntimeDependencies
};
var hex_module_dependency_RuntimeDependencyChecker = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'RuntimeDependecyChecker' class can't be instantiated.",{ fileName : "RuntimeDependencyChecker.hx", lineNumber : 17, className : "hex.module.dependency.RuntimeDependencyChecker", methodName : "new"}));
};
$hxClasses["hex.module.dependency.RuntimeDependencyChecker"] = hex_module_dependency_RuntimeDependencyChecker;
hex_module_dependency_RuntimeDependencyChecker.__name__ = ["hex","module","dependency","RuntimeDependencyChecker"];
hex_module_dependency_RuntimeDependencyChecker.check = function(module,injector,dependencies) {
	if(dependencies.hasMappedDependencies()) {
		var mappedDependencies = dependencies.getMappedDependencies();
		var _g = 0;
		while(_g < mappedDependencies.length) {
			var dependency = mappedDependencies[_g];
			++_g;
			if(!injector.hasMapping(dependency)) throw new js__$Boot_HaxeError(new hex_module_dependency_RuntimeDependencyException("'" + Std.string(dependency) + "' class dependency is not available during '" + hex_log_Stringifier.stringify(module) + "' initialisation.",{ fileName : "RuntimeDependencyChecker.hx", lineNumber : 30, className : "hex.module.dependency.RuntimeDependencyChecker", methodName : "check"}));
		}
	}
};
hex_module_dependency_RuntimeDependencyChecker.prototype = {
	__class__: hex_module_dependency_RuntimeDependencyChecker
};
var hex_module_dependency_RuntimeDependencyException = function(message,posInfos) {
	hex_error_Exception.call(this,message,posInfos);
};
$hxClasses["hex.module.dependency.RuntimeDependencyException"] = hex_module_dependency_RuntimeDependencyException;
hex_module_dependency_RuntimeDependencyException.__name__ = ["hex","module","dependency","RuntimeDependencyException"];
hex_module_dependency_RuntimeDependencyException.__super__ = hex_error_Exception;
hex_module_dependency_RuntimeDependencyException.prototype = $extend(hex_error_Exception.prototype,{
	__class__: hex_module_dependency_RuntimeDependencyException
});
var hex_service_IService = function() { };
$hxClasses["hex.service.IService"] = hex_service_IService;
hex_service_IService.__name__ = ["hex","service","IService"];
hex_service_IService.__interfaces__ = [hex_event_IObservable];
hex_service_IService.prototype = {
	__class__: hex_service_IService
};
var hex_service_ServiceConfiguration = function(timeout) {
	if(timeout == null) timeout = 5000;
	this.serviceTimeout = timeout;
};
$hxClasses["hex.service.ServiceConfiguration"] = hex_service_ServiceConfiguration;
hex_service_ServiceConfiguration.__name__ = ["hex","service","ServiceConfiguration"];
hex_service_ServiceConfiguration.prototype = {
	__class__: hex_service_ServiceConfiguration
};
var hex_service_stateful_IStatefulService = function() { };
$hxClasses["hex.service.stateful.IStatefulService"] = hex_service_stateful_IStatefulService;
hex_service_stateful_IStatefulService.__name__ = ["hex","service","stateful","IStatefulService"];
hex_service_stateful_IStatefulService.__interfaces__ = [hex_service_IService];
hex_service_stateful_IStatefulService.prototype = {
	__class__: hex_service_stateful_IStatefulService
};
var hex_state_State = function(stateName) {
	this._exitHandlers = [];
	this._enterHandlers = [];
	this._exitCommandMappings = [];
	this._enterCommandMappings = [];
	this._transitions = new hex_collection_HashMap();
	this._stateName = stateName;
};
$hxClasses["hex.state.State"] = hex_state_State;
hex_state_State.__name__ = ["hex","state","State"];
hex_state_State.prototype = {
	clearEnterHandler: function() {
		this._enterHandlers = [];
	}
	,clearExitHandler: function() {
		this._exitHandlers = [];
	}
	,getEnterHandlerList: function() {
		return this._enterHandlers;
	}
	,getExitHandlerList: function() {
		return this._exitHandlers;
	}
	,addEnterHandler: function(scope,callback) {
		return this._addHandler(this._enterHandlers,new hex_event_BasicHandler(scope,callback));
	}
	,addExitHandler: function(scope,callback) {
		return this._addHandler(this._exitHandlers,new hex_event_BasicHandler(scope,callback));
	}
	,removeEnterHandler: function(handler) {
		return this._removeHandler(this._enterHandlers,handler);
	}
	,removeExitHandler: function(handler) {
		return this._removeHandler(this._exitHandlers,handler);
	}
	,addEnterCommandMapping: function(mapping) {
		if(HxOverrides.indexOf(this._enterCommandMappings,mapping,0) == -1) this._enterCommandMappings.push(mapping);
	}
	,addExitCommandMapping: function(mapping) {
		if(HxOverrides.indexOf(this._exitCommandMappings,mapping,0) == -1) this._exitCommandMappings.push(mapping);
	}
	,removeEnterCommandMapping: function(mapping) {
		var i = HxOverrides.indexOf(this._enterCommandMappings,mapping,0);
		if(i != -1) this._enterCommandMappings.splice(i,1);
	}
	,removeExitCommandMapping: function(mapping) {
		var i = HxOverrides.indexOf(this._exitCommandMappings,mapping,0);
		if(i != -1) this._exitCommandMappings.splice(i,1);
	}
	,addEnterCommand: function(commandClass,contextOwner) {
		var mapping = new hex_control_command_CommandMapping(commandClass);
		mapping.setContextOwner(contextOwner);
		this._enterCommandMappings.push(mapping);
		return mapping;
	}
	,addExitCommand: function(commandClass,contextOwner) {
		var mapping = new hex_control_command_CommandMapping(commandClass);
		mapping.setContextOwner(contextOwner);
		this._exitCommandMappings.push(mapping);
		return mapping;
	}
	,addTransition: function(messageType,targetState) {
		this._transitions.put(messageType,new hex_state_Transition(this,messageType,targetState));
	}
	,getMachine: function() {
		return this._stateMachine;
	}
	,getEvents: function() {
		var transitions = this._transitions.getValues();
		var result = [];
		var _g = 0;
		while(_g < transitions.length) {
			var transition = transitions[_g];
			++_g;
			result[result.length] = transition.getMessageType();
		}
		return result;
	}
	,getAllTargets: function() {
		var transitions = this._transitions.getValues();
		var result = [];
		var _g = 0;
		while(_g < transitions.length) {
			var transition = transitions[_g];
			++_g;
			result.push(transition.getTarget());
		}
		return result;
	}
	,getTransitions: function() {
		return this._transitions.getValues();
	}
	,hasTransition: function(messageType) {
		return this._transitions.containsKey(messageType);
	}
	,targetState: function(messageType) {
		return this._transitions.get(messageType).getTarget();
	}
	,getEnterCommandMapping: function() {
		return this._enterCommandMappings;
	}
	,getExitCommandMapping: function() {
		return this._exitCommandMappings;
	}
	,toString: function() {
		return hex_log_Stringifier.stringify(this) + "::" + this._stateName;
	}
	,_addHandler: function(handlers,handler) {
		if(HxOverrides.indexOf(handlers,handler,0) == -1) {
			handlers.push(handler);
			return true;
		} else return false;
	}
	,_removeHandler: function(handlers,handler) {
		var id = HxOverrides.indexOf(handlers,handler,0);
		if(id != -1) {
			handlers.splice(id,1);
			return true;
		} else return false;
	}
	,__class__: hex_state_State
};
var hex_state_StateMachine = function(start) {
	this._start = start;
};
$hxClasses["hex.state.StateMachine"] = hex_state_StateMachine;
hex_state_StateMachine.__name__ = ["hex","state","StateMachine"];
hex_state_StateMachine.prototype = {
	addResetMessageType: function(messageTypes) {
		var _g = 0;
		while(_g < messageTypes.length) {
			var messageType = messageTypes[_g];
			++_g;
			if(messageType != null) this._addResetMessageType_byAddingTransition(messageType);
		}
	}
	,_addResetMessageType_byAddingTransition: function(messageType) {
		var states = this.getStates();
		var _g = 0;
		while(_g < states.length) {
			var state = states[_g];
			++_g;
			if(state.hasTransition(messageType)) state.addTransition(messageType,this._start);
		}
	}
	,getStates: function() {
		var result = [];
		this._collectStates(result,this._start);
		return result;
	}
	,_collectStates: function(result,state) {
		if(this._start == null || HxOverrides.indexOf(result,state,0) != -1) return; else {
			result.push(state);
			var targets = state.getAllTargets();
			var _g = 0;
			while(_g < targets.length) {
				var target = targets[_g];
				++_g;
				this._collectStates(result,target);
			}
		}
	}
	,getStart: function() {
		return this._start;
	}
	,isResetMessageType: function(messageType) {
		var states = this.getStates();
		var _g = 0;
		while(_g < states.length) {
			var state = states[_g];
			++_g;
			if(state.hasTransition(messageType) && state.targetState(messageType) == this._start) return true;
		}
		return false;
	}
	,__class__: hex_state_StateMachine
};
var hex_state_StateUnmapper = function(state) {
	this._exitMappings = [];
	this._enterMappings = [];
	this._state = state;
};
$hxClasses["hex.state.StateUnmapper"] = hex_state_StateUnmapper;
hex_state_StateUnmapper.__name__ = ["hex","state","StateUnmapper"];
hex_state_StateUnmapper.register = function(state) {
	var stateUnmapper = null;
	if(!hex_state_StateUnmapper._stateUnmapper.containsKey(state)) {
		stateUnmapper = new hex_state_StateUnmapper(state);
		hex_state_StateUnmapper._stateUnmapper.put(state,stateUnmapper);
	} else stateUnmapper = hex_state_StateUnmapper._stateUnmapper.get(state);
	return stateUnmapper;
};
hex_state_StateUnmapper.release = function() {
	var stateUnmappers = hex_state_StateUnmapper._stateUnmapper.getValues();
	var _g = 0;
	while(_g < stateUnmappers.length) {
		var unmapper = stateUnmappers[_g];
		++_g;
		unmapper.unmap();
	}
	hex_state_StateUnmapper._stateUnmapper = new hex_collection_HashMap();
};
hex_state_StateUnmapper.prototype = {
	unmap: function() {
		var _g = 0;
		var _g1 = this._enterMappings;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			this._state.removeEnterCommandMapping(m);
		}
		var _g2 = 0;
		var _g11 = this._exitMappings;
		while(_g2 < _g11.length) {
			var m1 = _g11[_g2];
			++_g2;
			this._state.removeExitCommandMapping(m1);
		}
		this._state = null;
		this._enterMappings = null;
		this._exitMappings = null;
	}
	,addEnterMapping: function(mapping) {
		this._enterMappings.push(mapping);
	}
	,addExitMapping: function(mapping) {
		this._exitMappings.push(mapping);
	}
	,__class__: hex_state_StateUnmapper
};
var hex_state_Transition = function(source,messageType,target) {
	this._source = source;
	this._target = target;
	this._messageType = messageType;
};
$hxClasses["hex.state.Transition"] = hex_state_Transition;
hex_state_Transition.__name__ = ["hex","state","Transition"];
hex_state_Transition.prototype = {
	getSource: function() {
		return this._source;
	}
	,getTarget: function() {
		return this._target;
	}
	,getMessageType: function() {
		return this._messageType;
	}
	,__class__: hex_state_Transition
};
var hex_state_control_StateChangeMacro = function() {
	hex_control_macro_Macro.call(this);
};
$hxClasses["hex.state.control.StateChangeMacro"] = hex_state_control_StateChangeMacro;
hex_state_control_StateChangeMacro.__name__ = ["hex","state","control","StateChangeMacro"];
hex_state_control_StateChangeMacro.__super__ = hex_control_macro_Macro;
hex_state_control_StateChangeMacro.prototype = $extend(hex_control_macro_Macro.prototype,{
	_prepare: function() {
	}
	,__class__: hex_state_control_StateChangeMacro
});
var hex_state_control_StateController = function(injector,stateMachine) {
	this._injector = injector;
	this._stateMachine = stateMachine;
	this._currentState = this._stateMachine.getStart();
	this._isInTransition = false;
};
$hxClasses["hex.state.control.StateController"] = hex_state_control_StateController;
hex_state_control_StateController.__name__ = ["hex","state","control","StateController"];
hex_state_control_StateController.prototype = {
	transitionTo: function(target,request) {
		if(this._isInTransition) {
		} else {
			this._isInTransition = true;
			if(request != null) this._request = request;
			this._targetedState = target;
			this._dispatchStateChange(this._currentState,this._currentState.getExitHandlerList());
			this._triggerCommand(this._currentState.getExitCommandMapping(),$bind(this,this._onExitCurrentState));
		}
	}
	,_triggerCommand: function(mappings,callback) {
		if(mappings.length > 0) {
			var sm = this._injector.instantiateUnmapped(hex_state_control_StateChangeMacro);
			var mappingToRemove = [];
			var _g = 0;
			while(_g < mappings.length) {
				var mapping = mappings[_g];
				++_g;
				if(mapping.get_isFiredOnce()) mappingToRemove.push(mapping);
				sm.addMapping(mapping);
			}
			var _g1 = 0;
			while(_g1 < mappingToRemove.length) {
				var mapping1 = mappingToRemove[_g1];
				++_g1;
				mappings.splice(HxOverrides.indexOf(mappings,mapping1,0),1);
			}
			sm.addCompleteHandler(this,callback);
			sm.addFailHandler(this,callback);
			sm.addCancelHandler(this,callback);
			sm.preExecute();
			sm.execute(this._request);
		} else callback(null);
	}
	,handleMessage: function(messageType,request) {
		if(this._currentState.hasTransition(messageType)) this.transitionTo(this._currentState.targetState(messageType),request); else if(this._stateMachine.isResetMessageType(messageType)) this.transitionTo(this._stateMachine.getStart(),request);
	}
	,getCurrentState: function() {
		return this._currentState;
	}
	,getTargetedState: function() {
		return this._targetedState;
	}
	,_onExitCurrentState: function(cmd) {
		this._triggerCommand(this._targetedState.getEnterCommandMapping(),$bind(this,this._onEnterTargetState));
	}
	,_onEnterTargetState: function(cmd) {
		if(this._request != null) this._request = null;
		this._currentState = this._targetedState;
		this._isInTransition = false;
		this._dispatchStateChange(this._currentState,this._currentState.getEnterHandlerList());
	}
	,_dispatchStateChange: function(state,handlers) {
		var _g = 0;
		while(_g < handlers.length) {
			var handler = handlers[_g];
			++_g;
			Reflect.callMethod(handler.scope,handler.callback,[state]);
		}
	}
	,__class__: hex_state_control_StateController
};
var hex_util_ClassUtil = function() {
	throw new js__$Boot_HaxeError(new hex_error_PrivateConstructorException("'" + hex_log_Stringifier.stringify(this) + "' class can't be instantiated.",{ fileName : "ClassUtil.hx", lineNumber : 15, className : "hex.util.ClassUtil", methodName : "new"}));
};
$hxClasses["hex.util.ClassUtil"] = hex_util_ClassUtil;
hex_util_ClassUtil.__name__ = ["hex","util","ClassUtil"];
hex_util_ClassUtil.getInheritanceChain = function(clazz) {
	var inherintanceChain = [clazz];
	while((clazz = Type.getSuperClass(clazz)) != null) inherintanceChain.push(clazz);
	return inherintanceChain;
};
hex_util_ClassUtil.getInheritanceChainFrom = function(instance) {
	var type = Type.getClass(instance);
	if(type != null) return hex_util_ClassUtil.getInheritanceChain(type); else return [];
};
hex_util_ClassUtil.classExtendsOrImplements = function(classOrClassName,superClass) {
	var actualClass = null;
	if(js_Boot.__instanceof(classOrClassName,Class)) actualClass = js_Boot.__cast(classOrClassName , Class); else if(typeof(classOrClassName) == "string") try {
		actualClass = Type.resolveClass(js_Boot.__cast(classOrClassName , String));
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		throw new js__$Boot_HaxeError("The class name " + Std.string(classOrClassName) + " is not valid because of " + Std.string(e) + "\n" + Std.string(e.getStackTrace()));
	}
	if(actualClass == null) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("The parameter classOrClassName must be a Class or fully qualified class name.",{ fileName : "ClassUtil.hx", lineNumber : 56, className : "hex.util.ClassUtil", methodName : "classExtendsOrImplements"}));
	var classInstance = Type.createEmptyInstance(actualClass);
	return js_Boot.__instanceof(classInstance,superClass);
};
hex_util_ClassUtil.getStaticVariableReference = function(qualifiedClassName) {
	var a = qualifiedClassName.split(".");
	var type = a[a.length - 1];
	a.splice(a.length - 1,1);
	var classReference = hex_util_ClassUtil.getClassReference(a.join("."));
	var staticRef = Reflect.field(classReference,type);
	if(staticRef == null) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("ClassUtil.getStaticReference fails with '" + qualifiedClassName + "'",{ fileName : "ClassUtil.hx", lineNumber : 73, className : "hex.util.ClassUtil", methodName : "getStaticVariableReference"}));
	return staticRef;
};
hex_util_ClassUtil.getClassNameFromStaticReference = function(qualifiedClassName) {
	var a = qualifiedClassName.split(".");
	var type = a[a.length - 1];
	a.splice(a.length - 1,1);
	return a.join(".");
};
hex_util_ClassUtil.getStaticVariableNameFromStaticReference = function(qualifiedClassName) {
	var a = qualifiedClassName.split(".");
	return a[a.length - 1];
};
hex_util_ClassUtil.getClassReference = function(qualifiedClassName) {
	var classReference = Type.resolveClass(qualifiedClassName);
	if(classReference == null) throw new js__$Boot_HaxeError(new hex_error_IllegalArgumentException("ClassUtil.getClassReference fails with class named '" + qualifiedClassName + "'",{ fileName : "ClassUtil.hx", lineNumber : 99, className : "hex.util.ClassUtil", methodName : "getClassReference"}));
	return classReference;
};
hex_util_ClassUtil.prototype = {
	__class__: hex_util_ClassUtil
};
var hex_util_MacroUtil = function() {
};
$hxClasses["hex.util.MacroUtil"] = hex_util_MacroUtil;
hex_util_MacroUtil.__name__ = ["hex","util","MacroUtil"];
hex_util_MacroUtil.prototype = {
	__class__: hex_util_MacroUtil
};
var hex_view_viewhelper_IMainViewHelperManagerListener = function() { };
$hxClasses["hex.view.viewhelper.IMainViewHelperManagerListener"] = hex_view_viewhelper_IMainViewHelperManagerListener;
hex_view_viewhelper_IMainViewHelperManagerListener.__name__ = ["hex","view","viewhelper","IMainViewHelperManagerListener"];
hex_view_viewhelper_IMainViewHelperManagerListener.prototype = {
	__class__: hex_view_viewhelper_IMainViewHelperManagerListener
};
var hex_view_viewhelper_IViewHelperManagerListener = function() { };
$hxClasses["hex.view.viewhelper.IViewHelperManagerListener"] = hex_view_viewhelper_IViewHelperManagerListener;
hex_view_viewhelper_IViewHelperManagerListener.__name__ = ["hex","view","viewhelper","IViewHelperManagerListener"];
hex_view_viewhelper_IViewHelperManagerListener.prototype = {
	__class__: hex_view_viewhelper_IViewHelperManagerListener
};
var hex_view_viewhelper_MainViewHelperManagerMessage = function() {
};
$hxClasses["hex.view.viewhelper.MainViewHelperManagerMessage"] = hex_view_viewhelper_MainViewHelperManagerMessage;
hex_view_viewhelper_MainViewHelperManagerMessage.__name__ = ["hex","view","viewhelper","MainViewHelperManagerMessage"];
hex_view_viewhelper_MainViewHelperManagerMessage.prototype = {
	__class__: hex_view_viewhelper_MainViewHelperManagerMessage
};
var hex_view_viewhelper_ViewHelperManager = function(owner) {
	this._owner = owner;
	this._dispatcher = new hex_event_Dispatcher();
	this._viewHelpers = [];
};
$hxClasses["hex.view.viewhelper.ViewHelperManager"] = hex_view_viewhelper_ViewHelperManager;
hex_view_viewhelper_ViewHelperManager.__name__ = ["hex","view","viewhelper","ViewHelperManager"];
hex_view_viewhelper_ViewHelperManager.getInstance = function(owner) {
	var viewHelperManager = hex_view_viewhelper_ViewHelperManager._mInstances.h[owner.__id__];
	if(viewHelperManager == null) {
		viewHelperManager = new hex_view_viewhelper_ViewHelperManager(owner);
		hex_view_viewhelper_ViewHelperManager._mInstances.set(owner,viewHelperManager);
		hex_view_viewhelper_ViewHelperManager.notifyViewHelperManagerCreation(viewHelperManager);
	}
	return viewHelperManager;
};
hex_view_viewhelper_ViewHelperManager.release = function(owner) {
	var viewHelperManager = hex_view_viewhelper_ViewHelperManager._mInstances.h[owner.__id__];
	if(viewHelperManager != null) {
		hex_view_viewhelper_ViewHelperManager.notifyViewHelperManagerRelease(viewHelperManager);
		viewHelperManager.releaseAllViewHelpers();
		hex_view_viewhelper_ViewHelperManager._mInstances.remove(owner);
	}
};
hex_view_viewhelper_ViewHelperManager.addGlobalListener = function(listener) {
	hex_view_viewhelper_ViewHelperManager._DISPATCHER.addHandler(hex_view_viewhelper_MainViewHelperManagerMessage.VIEW_HELPER_MANAGER_CREATION,listener,$bind(listener,listener.onViewHelperManagerCreation));
	hex_view_viewhelper_ViewHelperManager._DISPATCHER.addHandler(hex_view_viewhelper_MainViewHelperManagerMessage.VIEW_HELPER_MANAGER_RELEASE,listener,$bind(listener,listener.onViewHelperManagerRelease));
};
hex_view_viewhelper_ViewHelperManager.removeGlobalListener = function(listener) {
	hex_view_viewhelper_ViewHelperManager._DISPATCHER.removeHandler(hex_view_viewhelper_MainViewHelperManagerMessage.VIEW_HELPER_MANAGER_CREATION,listener,$bind(listener,listener.onViewHelperManagerCreation));
	hex_view_viewhelper_ViewHelperManager._DISPATCHER.removeHandler(hex_view_viewhelper_MainViewHelperManagerMessage.VIEW_HELPER_MANAGER_RELEASE,listener,$bind(listener,listener.onViewHelperManagerRelease));
};
hex_view_viewhelper_ViewHelperManager.notifyViewHelperManagerCreation = function(viewHelperManager) {
	hex_view_viewhelper_ViewHelperManager._DISPATCHER.dispatch(hex_view_viewhelper_MainViewHelperManagerMessage.VIEW_HELPER_MANAGER_CREATION,[viewHelperManager]);
};
hex_view_viewhelper_ViewHelperManager.notifyViewHelperManagerRelease = function(viewHelperManager) {
	hex_view_viewhelper_ViewHelperManager._DISPATCHER.dispatch(hex_view_viewhelper_MainViewHelperManagerMessage.VIEW_HELPER_MANAGER_RELEASE,[viewHelperManager]);
};
hex_view_viewhelper_ViewHelperManager.prototype = {
	getOwner: function() {
		return this._owner;
	}
	,releaseAllViewHelpers: function() {
		var len = this._viewHelpers.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var viewHelper = this._viewHelpers[len - i - 1];
			this._viewHelpers.splice(len - i - 1,1);
			viewHelper.removeHandler(hex_view_viewhelper_ViewHelperMessage.RELEASE,this,$bind(this,this._onViewHelperRelease));
			viewHelper.release();
			this._notifyViewHelperRelease(viewHelper);
		}
	}
	,buildViewHelper: function(injector,clazz,view) {
		var viewHelper = injector.instantiateUnmapped(clazz);
		if(viewHelper != null) {
			this._notifyViewHelperCreation(viewHelper);
			injector.mapToValue(clazz,viewHelper);
			viewHelper.setOwner(this._owner);
			viewHelper.set_view(view);
			viewHelper.addHandler(hex_view_viewhelper_ViewHelperMessage.RELEASE,this,$bind(this,this._onViewHelperRelease));
			this._viewHelpers.push(viewHelper);
		}
		return viewHelper;
	}
	,size: function() {
		return this._viewHelpers.length;
	}
	,_onViewHelperRelease: function(viewHelper) {
		this._notifyViewHelperRelease(viewHelper);
		var index = HxOverrides.indexOf(this._viewHelpers,viewHelper,0);
		if(index != -1) this._viewHelpers.splice(index,1);
	}
	,addListener: function(listener) {
		this._dispatcher.addHandler(hex_view_viewhelper_ViewHelperManagerMessage.VIEW_HELPER_CREATION,listener,$bind(listener,listener.onViewHelperCreation));
		this._dispatcher.addHandler(hex_view_viewhelper_ViewHelperManagerMessage.VIEW_HELPER_RELEASE,listener,$bind(listener,listener.onViewHelperRelease));
	}
	,removeListener: function(listener) {
		this._dispatcher.removeHandler(hex_view_viewhelper_ViewHelperManagerMessage.VIEW_HELPER_CREATION,listener,$bind(listener,listener.onViewHelperCreation));
		this._dispatcher.removeHandler(hex_view_viewhelper_ViewHelperManagerMessage.VIEW_HELPER_RELEASE,listener,$bind(listener,listener.onViewHelperRelease));
	}
	,_notifyViewHelperCreation: function(viewHelper) {
		this._dispatcher.dispatch(hex_view_viewhelper_ViewHelperManagerMessage.VIEW_HELPER_CREATION,[viewHelper]);
	}
	,_notifyViewHelperRelease: function(viewHelper) {
		this._dispatcher.dispatch(hex_view_viewhelper_ViewHelperManagerMessage.VIEW_HELPER_RELEASE,[viewHelper]);
	}
	,__class__: hex_view_viewhelper_ViewHelperManager
};
var hex_view_viewhelper_ViewHelperManagerMessage = function() {
};
$hxClasses["hex.view.viewhelper.ViewHelperManagerMessage"] = hex_view_viewhelper_ViewHelperManagerMessage;
hex_view_viewhelper_ViewHelperManagerMessage.__name__ = ["hex","view","viewhelper","ViewHelperManagerMessage"];
hex_view_viewhelper_ViewHelperManagerMessage.prototype = {
	__class__: hex_view_viewhelper_ViewHelperManagerMessage
};
var hex_view_viewhelper_ViewHelperMessage = function() {
};
$hxClasses["hex.view.viewhelper.ViewHelperMessage"] = hex_view_viewhelper_ViewHelperMessage;
hex_view_viewhelper_ViewHelperMessage.__name__ = ["hex","view","viewhelper","ViewHelperMessage"];
hex_view_viewhelper_ViewHelperMessage.prototype = {
	__class__: hex_view_viewhelper_ViewHelperMessage
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
Xml.Element = 0;
Xml.PCData = 1;
Xml.CData = 2;
Xml.Comment = 3;
Xml.DocType = 4;
Xml.ProcessingInstruction = 5;
Xml.Document = 6;
com_tenderowls_xml176_Xml176Parser.escapes = (function($this) {
	var $r;
	var h = new haxe_ds_StringMap();
	if(__map_reserved.lt != null) h.setReserved("lt","<"); else h.h["lt"] = "<";
	if(__map_reserved.gt != null) h.setReserved("gt",">"); else h.h["gt"] = ">";
	if(__map_reserved.amp != null) h.setReserved("amp","&"); else h.h["amp"] = "&";
	if(__map_reserved.quot != null) h.setReserved("quot","\""); else h.h["quot"] = "\"";
	if(__map_reserved.apos != null) h.setReserved("apos","'"); else h.h["apos"] = "'";
	h.set("nbsp",String.fromCharCode(160));
	$r = h;
	return $r;
}(this));
hex_config_stateless_StatelessCommandConfig.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"frontController\",\"type\":\"hex.control.IFrontController\",\"key\":\"\"}],\"name\":\"hex.config.stateless.StatelessCommandConfig\",\"methods\":[]}"]}};
example_module_hello__$HelloModule_CommandConfig.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"frontController\",\"type\":\"hex.control.IFrontController\",\"key\":\"\"}],\"name\":\"example.module.hello.HelloModule\",\"methods\":[]}"]}};
hex_config_stateless_StatelessModelConfig.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"injector\",\"type\":\"hex.di.IDependencyInjector\",\"key\":\"\"}],\"name\":\"hex.config.stateless.StatelessModelConfig\",\"methods\":[]}"]}};
example_module_hello__$HelloModule_ModelConfig.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"injector\",\"type\":\"hex.di.IDependencyInjector\",\"key\":\"\"}],\"name\":\"example.module.hello.HelloModule\",\"methods\":[]}"]}};
example_module_hello_controller_SetMessageCommand.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"messageModel\",\"type\":\"example.module.hello.model.IMessageModel\",\"key\":\"\"}],\"name\":\"example.module.hello.controller.SetMessageCommand\",\"methods\":[]}"]}};
example_module_hello_message_HelloModuleMessage.SET_MESSAGE = new hex_event_MessageType("setMessage");
hex_view_viewhelper_ViewHelper.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"dispatcher\",\"type\":\"hex.event.IDispatcher\",\"key\":\"\"}],\"name\":\"hex.view.viewhelper.ViewHelper\",\"methods\":[]}"]}};
hex_view_viewhelper_ViewHelper.DEFAULT_VISIBLE = true;
example_module_hello_view_HelloViewHelper.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"dispatcher\",\"type\":\"hex.event.IDispatcher\",\"key\":\"\"},{\"isOpt\":false,\"name\":\"_model\",\"type\":\"example.module.hello.model.IMessageModelRO\",\"key\":\"\"}],\"name\":\"example.module.hello.view.HelloViewHelper\",\"methods\":[]}"]}};
haxe_ds_ObjectMap.count = 0;
haxe_xml_Parser.escapes = (function($this) {
	var $r;
	var h = new haxe_ds_StringMap();
	if(__map_reserved.lt != null) h.setReserved("lt","<"); else h.h["lt"] = "<";
	if(__map_reserved.gt != null) h.setReserved("gt",">"); else h.h["gt"] = ">";
	if(__map_reserved.amp != null) h.setReserved("amp","&"); else h.h["amp"] = "&";
	if(__map_reserved.quot != null) h.setReserved("quot","\""); else h.h["quot"] = "\"";
	if(__map_reserved.apos != null) h.setReserved("apos","'"); else h.h["apos"] = "'";
	$r = h;
	return $r;
}(this));
hex_collection_LocatorMessage.REGISTER = new hex_event_MessageType("onRegister");
hex_collection_LocatorMessage.UNREGISTER = new hex_event_MessageType("onUnregister");
hex_compiler_core_CompileTimeCoreFactory._fastEvalMethod = hex_compiler_CompileTimeFastEval.fromTarget;
hex_compiler_parser_xml_ClassImportHelper._primType = ["String","Int","UInt","Float","Bool","null","Object","XML","Class","Function","Array"];
hex_control_async_AsyncCommand.WAS_NEVER_USED = "WAS_NEVER_USED";
hex_control_async_AsyncCommand.IS_RUNNING = "IS_RUNNING";
hex_control_async_AsyncCommand.IS_COMPLETED = "IS_COMPLETED";
hex_control_async_AsyncCommand.IS_FAILED = "IS_FAILED";
hex_control_async_AsyncCommand.IS_CANCELLED = "IS_CANCELLED";
hex_control_async_AsyncCommand._POOL = new haxe_ds_ObjectMap();
hex_control_async_AsyncCommandMessage.COMPLETE = new hex_event_MessageType("onAsyncCommandComplete");
hex_control_async_AsyncCommandMessage.FAIL = new hex_event_MessageType("onAsyncCommandFail");
hex_control_async_AsyncCommandMessage.CANCEL = new hex_event_MessageType("onAsyncCommandCancel");
hex_control_macro_Macro.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"macroExecutor\",\"type\":\"hex.control.macro.IMacroExecutor\",\"key\":\"\"}],\"name\":\"hex.control.macro.Macro\",\"methods\":[]}"]}};
hex_control_macro_MacroExecutor.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"injector\",\"type\":\"hex.di.IBasicInjector\",\"key\":\"\"}],\"name\":\"hex.control.macro.MacroExecutor\",\"methods\":[]}"]}};
hex_core_HashCodeFactory._nKEY = 0;
hex_core_HashCodeFactory._M = new haxe_ds_ObjectMap();
hex_di_InjectionEvent.POST_INSTANTIATE = "onPostInstantiate";
hex_di_InjectionEvent.PRE_CONSTRUCT = "onPreConstruct";
hex_di_InjectionEvent.POST_CONSTRUCT = "onPostConstruct";
hex_domain_Domain._domainNames = new haxe_ds_StringMap();
hex_domain_DomainUtil._domain = new haxe_ds_StringMap();
hex_domain_TopLevelDomain.DOMAIN = hex_domain_DomainUtil.getDomain("TopLevelDomain",hex_domain_TopLevelDomain);
hex_domain_ApplicationDomainDispatcher._Instance = new hex_domain_ApplicationDomainDispatcher();
hex_domain_DefaultDomain.DOMAIN = hex_domain_DomainUtil.getDomain("DefaultDomain",hex_domain_DefaultDomain);
hex_domain_DomainExpert._Instance = new hex_domain_DomainExpert();
hex_domain_DomainExpert._DomainIndex = 0;
hex_domain_NoDomain.DOMAIN = hex_domain_DomainUtil.getDomain("NoDomain",hex_domain_NoDomain);
hex_event_MacroAdapterStrategy.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"macroExecutor\",\"type\":\"hex.control.macro.IMacroExecutor\",\"key\":\"\"}],\"name\":\"hex.event.MacroAdapterStrategy\",\"methods\":[]}"]}};
hex_ioc_assembler_ApplicationAssemblerMessage.CONTEXT_PARSED = new hex_event_MessageType("onContextParsed");
hex_ioc_assembler_ApplicationAssemblerMessage.ASSEMBLING_START = new hex_event_MessageType("onAssemblingStart");
hex_ioc_assembler_ApplicationAssemblerMessage.STATE_TRANSITIONS_BUILT = new hex_event_MessageType("onStateTransitionsBuilt");
hex_ioc_assembler_ApplicationAssemblerMessage.OBJECTS_BUILT = new hex_event_MessageType("onObjectsBuilt");
hex_ioc_assembler_ApplicationAssemblerMessage.METHODS_CALLED = new hex_event_MessageType("onMethodsCalled");
hex_ioc_assembler_ApplicationAssemblerMessage.DOMAIN_LISTENERS_ASSIGNED = new hex_event_MessageType("onDomainListenersAssigned");
hex_ioc_assembler_ApplicationAssemblerMessage.MODULES_INITIALIZED = new hex_event_MessageType("onModulesInitialized");
hex_ioc_assembler_ApplicationAssemblerMessage.ASSEMBLING_END = new hex_event_MessageType("onAssemblingEnd");
hex_ioc_core_ContextAttributeList.ID = "id";
hex_ioc_core_ContextAttributeList.TYPE = "type";
hex_ioc_core_ContextAttributeList.NAME = "name";
hex_ioc_core_ContextAttributeList.REF = "ref";
hex_ioc_core_ContextAttributeList.VALUE = "value";
hex_ioc_core_ContextAttributeList.FACTORY = "factory";
hex_ioc_core_ContextAttributeList.SINGLETON_ACCESS = "singleton-access";
hex_ioc_core_ContextAttributeList.INJECT_INTO = "inject-into";
hex_ioc_core_ContextAttributeList.METHOD = "method";
hex_ioc_core_ContextAttributeList.PARSER_CLASS = "parser-class";
hex_ioc_core_ContextAttributeList.LOCATOR = "locator";
hex_ioc_core_ContextAttributeList.MAP_TYPE = "map-type";
hex_ioc_core_ContextAttributeList.MAP_NAME = "map-name";
hex_ioc_core_ContextAttributeList.AS_SINGLETON = "as-singleton";
hex_ioc_core_ContextAttributeList.STRATEGY = "strategy";
hex_ioc_core_ContextAttributeList.INJECTED_IN_MODULE = "injectedInModule";
hex_ioc_core_ContextAttributeList.STATIC_REF = "static-ref";
hex_ioc_core_ContextAttributeList.COMMAND_CLASS = "command-class";
hex_ioc_core_ContextAttributeList.FIRE_ONCE = "fire-once";
hex_ioc_core_ContextAttributeList.CONTEXT_OWNER = "context-owner";
hex_ioc_core_ContextAttributeList.IF = "if";
hex_ioc_core_ContextAttributeList.IF_NOT = "if-not";
hex_ioc_core_ContextNameList.PROPERTY = "property";
hex_ioc_core_ContextNameList.ARGUMENT = "argument";
hex_ioc_core_ContextNameList.METHOD_CALL = "method-call";
hex_ioc_core_ContextNameList.LISTEN = "listen";
hex_ioc_core_ContextNameList.ITEM = "item";
hex_ioc_core_ContextNameList.KEY = "key";
hex_ioc_core_ContextNameList.VALUE = "value";
hex_ioc_core_ContextNameList.MAP_NAME = "map-name";
hex_ioc_core_ContextNameList.EVENT = "event";
hex_ioc_core_ContextNameList.ENTER = "enter";
hex_ioc_core_ContextNameList.EXIT = "exit";
hex_ioc_core_ContextNameList.ROOT = "root";
hex_ioc_core_ContextTypeList.ARRAY = "Array";
hex_ioc_core_ContextTypeList.BOOLEAN = "Bool";
hex_ioc_core_ContextTypeList.INSTANCE = "Instance";
hex_ioc_core_ContextTypeList.STATIC_VARIABLE = "StaticVariable";
hex_ioc_core_ContextTypeList.MAPPING_CONFIG = "hex.ioc.di.MappingConfiguration";
hex_ioc_core_ContextTypeList.INT = "Int";
hex_ioc_core_ContextTypeList.NULL = "null";
hex_ioc_core_ContextTypeList.FLOAT = "Float";
hex_ioc_core_ContextTypeList.OBJECT = "Object";
hex_ioc_core_ContextTypeList.STRING = "String";
hex_ioc_core_ContextTypeList.UINT = "UInt";
hex_ioc_core_ContextTypeList.DEFAULT = "Default";
hex_ioc_core_ContextTypeList.HASHMAP = "hex.collection.HashMap";
hex_ioc_core_ContextTypeList.SERVICE_LOCATOR = "hex.config.stateful.ServiceLocator";
hex_ioc_core_ContextTypeList.CLASS = "Class";
hex_ioc_core_ContextTypeList.XML = "XML";
hex_ioc_core_ContextTypeList.FUNCTION = "Function";
js_Boot.__toStr = {}.toString;
hex_log_LogLevel._ALL = new hex_log_LogLevel(0);
hex_log_LogLevel._DEBUG = new hex_log_LogLevel(10000);
hex_log_LogLevel._INFO = new hex_log_LogLevel(20000);
hex_log_LogLevel._WARN = new hex_log_LogLevel(30000);
hex_log_LogLevel._ERROR = new hex_log_LogLevel(40000);
hex_log_LogLevel._FATAL = new hex_log_LogLevel(50000);
hex_log_LogLevel._OFF = new hex_log_LogLevel(60000);
hex_ioc_core_CoreFactory._fastEvalMethod = hex_util_FastEval.fromTarget;
hex_log_LoggerMessage.LOG = new hex_event_MessageType("onLog");
hex_log_LoggerMessage.CLEAR = new hex_event_MessageType("onClear");
hex_log_layout_LogLayoutHTMLView.TAP_THRESHOLD = 250;
hex_log_layout_SwipeHorizontalVO.MIN_X = 30;
hex_log_layout_SwipeHorizontalVO.MAX_X = 30;
hex_log_layout_SwipeHorizontalVO.MIN_Y = 50;
hex_log_layout_SwipeHorizontalVO.MAX_Y = 60;
hex_log_layout_ConsoleStyle.template = "<div id=\"console\" width=\"100%\" style=\"background:#fff; height:100vh; overflow-y:scroll; padding: 15px; display:none\"></div>\r\n<button class=\"debug-console-toggle\">Console</button>\r\n<div class=\"debug-console hidden\">\r\n\t<div class=\"debug-console-list-wrapper\"></div>\r\n\t<div class=\"debug-console-control\">\r\n\t\t<div class=\"debug-console-control-item debug-console-control-item--search\">\r\n\t\t\t<button class=\"debug-console-control-caret debug-console-control-caret--left\"><</button>\r\n\t\t\t<input type=\"text\" placeholder=\"Search\" autocorrect=\"off\" autocapitalize=\"off\" class=\"debug-console-control-item-input\">\r\n\t\t\t<button class=\"debug-console-control-caret debug-console-control-caret--right\">></button>\r\n\t\t</div>\r\n\t\t<div class=\"debug-console-control-item debug-console-control-item--domain\">\r\n\t\t\t<input type=\"text\" placeholder=\"Domain\" autocorrect=\"off\" autocapitalize=\"off\" class=\"debug-console-control-item-input\">\r\n\t\t</div>\r\n\t\t<div class=\"debug-console-control-item debug-console-control-item--level\">\r\n\t\t\t<select class=\"debug-console-control-item-input\">\r\n\t\t\t</select>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n";
hex_log_layout_ConsoleStyle.style = "\r\nhtml,\r\nbody,\r\n.debug-console {\r\n\tmargin: 0;\r\n\theight: 100%;\r\n\twidth: 100%;\r\n}\r\n\r\n.debug-console-toggle {\r\n\tposition: fixed;\r\n\tz-index: 1001;\r\n\tleft: 10px;\r\n\ttop: 10px;\r\n}\r\n\r\n.debug-console {\r\n\tposition: fixed;\r\n\tz-index: 1000;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\tleft: 0;\r\n\tbackground: rgba(0, 0, 0, 0.8);\r\n}\r\n\r\n.debug-console.hidden {\r\n\tdisplay: none;\r\n}\r\n\r\n.debug-console,\r\n.debug-console-list-wrapper,\r\n.debug-console-control {\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n.debug-console-list-wrapper,\r\n.debug-console-control {\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\tright: 0;\r\n}\r\n\r\n.debug-console-list-wrapper {\r\n\ttop: 0;\r\n\theight: calc(100% - 24px);\r\n\t-webkit-overflow-scrolling: touch;\r\n\toverflow-x: hidden;\r\n\toverflow-y: scroll;\r\n}\r\n\r\n.debug-console-list {\r\n\tpadding: 0;\r\n\tmargin: 10px;\r\n\tlist-style: none;\r\n}\r\n\r\n.debug-console-list li {\r\n\tmargin: 0 0 2px 0;\r\n\tcolor: lime;\r\n}\r\n\r\n.debug-console-control {\r\n\tbottom: 0;\r\n\theight: 30px;\r\n\tletter-spacing: -0.3125em;\r\n\tpadding: 5px 0% 5px 5px;\r\n}\r\n\r\n.debug-console-control-item,\r\n.debug-console-control-item--search .debug-console-control-item-input,\r\n.debug-console-control-caret {\r\n\tdisplay: inline-block;\r\n\tvertical-align: top;\r\n\tletter-spacing: normal;\r\n\tword-spacing: normal;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n.debug-console-control-item {\r\n\tpadding-right: 1%;\r\n}\r\n\r\n.debug-console-control-item-input {\r\n\tbox-sizing: border-box;\r\n\theight: 20px;\r\n\tline-height: 20px;\r\n\twidth: 100%;\r\n}\r\n\r\n.debug-console-control-item--search {\r\n\tletter-spacing: -0.3125em;\r\n}\r\n\r\n.debug-console-control-caret--left {\r\n\twidth: 24px;\r\n\tmargin-right: 4px;\r\n}\r\n.debug-console-control-caret--right {\r\n\twidth: 24px;\r\n\tmargin-left: 4px;\r\n}\r\n\r\n.debug-console-control-item--search {\r\n\twidth: 50%;\r\n\tpadding: 0 8px 0 0;\r\n}\r\n\r\n.debug-console-control-item--search .debug-console-control-item-input {\r\n\twidth: calc(100% - 56px);\r\n}\r\n\r\n.debug-console-control-item--domain,\r\n.debug-console-control-item--level {\r\n\twidth: 25%;\r\n}\r\n\r\n.highlight-word { background-color:#FFFF00; }\r\n\r\n.selected { background-color:#999900 }\r\n";
hex_log_layout_AllDomain.DOMAIN = hex_domain_DomainUtil.getDomain("AllDomain",hex_log_layout_AllDomain);
hex_metadata_AnnotationProvider._Instance = new hex_metadata_AnnotationProvider();
hex_metadata_AnnotationProvider._Domains = new haxe_ds_ObjectMap();
hex_metadata_AnnotationProvider._META_DATA = new hex_collection_HashMap();
hex_module_ModuleMessage.INITIALIZED = new hex_event_MessageType("onModuleInitialisation");
hex_module_ModuleMessage.RELEASED = new hex_event_MessageType("onModuleRelease");
hex_state_StateUnmapper._stateUnmapper = new hex_collection_HashMap();
hex_state_control_StateChangeMacro.__meta__ = { obj : { 'hex.di.IInjectorContainer' : ["{\"ctor\":{\"args\":[],\"isPre\":false,\"name\":\"new\",\"isPost\":false,\"order\":0},\"props\":[{\"isOpt\":false,\"name\":\"macroExecutor\",\"type\":\"hex.control.macro.IMacroExecutor\",\"key\":\"\"}],\"name\":\"hex.state.control.StateChangeMacro\",\"methods\":[]}"]}};
hex_view_viewhelper_MainViewHelperManagerMessage.VIEW_HELPER_MANAGER_CREATION = new hex_event_MessageType("onViewHelperManagerCreation");
hex_view_viewhelper_MainViewHelperManagerMessage.VIEW_HELPER_MANAGER_RELEASE = new hex_event_MessageType("onViewHelperManagerRelease");
hex_view_viewhelper_ViewHelperManager._mInstances = new haxe_ds_ObjectMap();
hex_view_viewhelper_ViewHelperManager._DISPATCHER = new hex_event_Dispatcher();
hex_view_viewhelper_ViewHelperManagerMessage.VIEW_HELPER_CREATION = new hex_event_MessageType("onViewHelperCreation");
hex_view_viewhelper_ViewHelperManagerMessage.VIEW_HELPER_RELEASE = new hex_event_MessageType("onViewHelperRelease");
hex_view_viewhelper_ViewHelperMessage.INIT = new hex_event_MessageType("onInit");
hex_view_viewhelper_ViewHelperMessage.RELEASE = new hex_event_MessageType("onRelease");
hex_view_viewhelper_ViewHelperMessage.ATTACH_VIEW = new hex_event_MessageType("onAttachView");
hex_view_viewhelper_ViewHelperMessage.REMOVE_VIEW = new hex_event_MessageType("onRemoveView");
example_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=test.js.map