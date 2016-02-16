/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var D=function(){throw new Error();};D.prototype.getName=function(){return undefined;};D.prototype.getBaseType=function(){return undefined;};D.prototype.getPrimitiveType=function(){var t=this;while(t.getBaseType()){t=t.getBaseType();}return t;};D.prototype.getComponentType=function(){return undefined;};D.prototype.getDefaultValue=function(){return undefined;};D.prototype.isArrayType=function(){return undefined;};D.prototype.parseValue=function(v){var t=this.getName();if(t=="string"){return v;}else if(t=="boolean"){return v=="true";}else if(t=="int"){return parseInt(v,10);}else if(t=="float"){return parseFloat(v);}else if(t=="object"){return v?q.parseJSON(v):null;}else{return v;}};D.prototype.isValid=undefined;D.prototype.setNormalizer=function(n){this._fnNormalizer=n;};D.prototype.normalize=function(v){if(typeof this._fnNormalizer==="function"){return this._fnNormalizer(v);}else{return v;}};(function(){function c(n,s,B){s=s||{};var o=B||D.prototype;var T=q.sap.newObject(o);T.getName=function(){return n;};if(s.hasOwnProperty("defaultValue")){var d=s.defaultValue;T.getDefaultValue=function(){return d;};}if(s.hasOwnProperty("isValid")){var i=s.isValid;T.isValid=o.isValid?function(v){if(!o.isValid(v)){return false;}return i(v);}:i;}T.isArrayType=function(){return false;};T.getBaseType=function(){return B;};return T;}function a(d){var T=q.sap.newObject(D.prototype);T.getName=function(){return d.getName()+"[]";};T.getComponentType=function(){return d;};T.isValid=function(v){if(v===null){return true;}if(q.isArray(v)){for(var i=0;i<v.length;i++){if(!d.isValid(v[i])){return false;}}return true;}return false;};T.parseValue=function(v){var V=v.split(",");for(var i=0;i<V.length;i++){V[i]=d.parseValue(V[i]);}return V;};T.isArrayType=function(){return true;};T.getBaseType=function(){return h.array;};return T;}function b(T,e){var V={},d;for(var n in e){var s=e[n];if(!d){d=s;}if(typeof s!=="string"){throw new Error("Value "+s+" for enum type "+T+" is not a string");}if(!V.hasOwnProperty(s)||n==s){V[s]=n;}}var o=q.sap.newObject(D.prototype);o.getName=function(){return T;};o.isValid=function(v){return typeof v==="string"&&V.hasOwnProperty(v);};o.parseValue=function(s){return e[s];};o.getDefaultValue=function(){return d;};o.getBaseType=function(){return t.string;};return o;}var t={"any":c("any",{defaultValue:null,isValid:function(v){return true;}}),"boolean":c("boolean",{defaultValue:false,isValid:function(v){return typeof v==="boolean";}}),"int":c("int",{defaultValue:0,isValid:function(v){return typeof v==="number"&&Math.floor(v)==v;}}),"float":c("float",{defaultValue:0.0,isValid:function(v){return typeof v==="number";}}),"string":c("string",{defaultValue:"",isValid:function(v){return typeof v==="string"||v instanceof String;}}),"object":c("object",{defaultValue:null,isValid:function(v){return typeof v==="object"||typeof v==="function";}})};var h={"array":c("array",{defaultValue:[],isValid:function(v){return q.isArray(v);}})};D.getType=function(T){var o=t[T];if(!o){if(T.indexOf("[]")>0){var C=T.slice(0,-2),d=this.getType(C);o=d&&a(d);if(o){t[T]=o;}return o;}else{o=q.sap.getObject(T);if(o instanceof D){t[T]=o;}else if(q.isPlainObject(o)){o=t[T]=b(T,o);}}}return o;};D.createType=c;var I={};D.registerInterfaceTypes=function(T){for(var i=0;i<T.length;i++){q.sap.setObject(T[i],I[T[i]]=new String(T[i]));}};D.isInterfaceType=function(T){return I.hasOwnProperty(T)&&q.sap.getObject(T)===I[T];};}());return D;},true);
