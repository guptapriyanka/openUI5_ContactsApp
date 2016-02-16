/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Bar','./Dialog','./ComboBoxTextField','./SelectList','./Popover','./library','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool'],function(q,B,D,C,S,P,l,E,I){"use strict";var a=C.extend("sap.m.ComboBoxBase",{metadata:{library:"sap.m",defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable"},picker:{type:"sap.ui.core.PopupInterface",multiple:false,visibility:"hidden"}}}});a.prototype.updateItems=function(r){this.bDataUpdated=false;this.destroyItems();this.updateAggregation("items");this.bDataUpdated=true;};a.prototype.refreshItems=function(){this.bDataUpdated=false;this.refreshAggregation("items");};a.prototype.getList=function(){if(this.bIsDestroyed){return null;}return this._oList;};a.prototype.init=function(){C.prototype.init.apply(this,arguments);this.setPickerType("Popover");this.createPicker(this.getPickerType());this.bDataUpdated=false;};a.prototype.exit=function(){C.prototype.exit.apply(this,arguments);if(this.getList()){this.getList().destroy();this._oList=null;}};a.prototype.ontouchstart=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();if(this.isOpenArea(e.target)){this.addStyleClass(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Pressed");}};a.prototype.ontouchend=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();if((!this.isOpen()||!this.hasContent())&&this.isOpenArea(e.target)){this.removeStyleClass(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Pressed");}};a.prototype.ontap=function(e){C.prototype.ontap.apply(this,arguments);var b=this.getRenderer().CSS_CLASS_COMBOBOXBASE;if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();if(this.isOpenArea(e.target)){if(this.isOpen()){this.close();this.removeStyleClass(b+"Pressed");return;}if(this.hasContent()){this.open();}}if(this.isOpen()){this.addStyleClass(b+"Pressed");}};a.prototype.onsapshow=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();if(e.keyCode===q.sap.KeyCodes.F4){e.preventDefault();}if(this.isOpen()){this.close();return;}this.selectText(0,this.getValue().length);if(this.hasContent()){this.open();}};a.prototype.onsapescape=function(e){if(this.getEnabled()&&this.getEditable()&&this.isOpen()){e.setMarked();e.preventDefault();this.close();}else{C.prototype.onsapescape.apply(this,arguments);}};a.prototype.onsaphide=a.prototype.onsapshow;a.prototype.onsapfocusleave=function(e){if(!e.relatedControlId){C.prototype.onsapfocusleave.apply(this,arguments);return;}var c=sap.ui.getCore().byId(e.relatedControlId);if(c===this){return;}var p=this.getAggregation("picker"),f=c&&c.getFocusDomRef();if(p&&q.sap.containsOrEquals(p.getFocusDomRef(),f)){return;}C.prototype.onsapfocusleave.apply(this,arguments);};a.prototype.bShowLabelAsPlaceholder=sap.ui.Device.browser.msie;a.prototype.getPopupAnchorDomRef=function(){return this.getDomRef();};a.prototype.getDomRefForValueStateMessage=function(){return this.getDomRef();};a.prototype.addContent=function(p){};a.prototype.setPickerType=function(p){this._sPickerType=p;};a.prototype.getPickerType=function(){return this._sPickerType;};a.prototype.createPicker=function(){};a.prototype.getPicker=function(){if(this.bIsDestroyed){return null;}return this.createPicker(this.getPickerType());};a.prototype.hasContent=function(){return!!this.getItems().length;};a.prototype.findFirstEnabledItem=function(i){var L=this.getList();return L?L.findFirstEnabledItem(i):null;};a.prototype.findLastEnabledItem=function(i){var L=this.getList();return L?L.findLastEnabledItem(i):null;};a.prototype.open=function(){var p=this.getPicker();if(p){p.open();}return this;};a.prototype.getVisibleItems=function(){var L=this.getList();return L?L.getVisibleItems():[];};a.prototype.isItemSelected=function(){};a.prototype.getKeys=function(b){b=b||this.getItems();for(var i=0,k=[];i<b.length;i++){k[i]=b[i].getKey();}return k;};a.prototype.getSelectableItems=function(){var L=this.getList();return L?L.getSelectableItems():[];};a.prototype.getOpenArea=function(){return this.getDomRef("arrow");};a.prototype.isOpenArea=function(d){var o=this.getOpenArea();return o&&o.contains(d);};a.prototype.findItem=function(p,v){var L=this.getList();return L?L.findItem(p,v):null;};a.prototype.getItemByText=function(t){return this.findItem("text",t);};a.prototype.scrollToItem=function(i){var p=this.getPicker(),o=p.getDomRef("cont"),b=i&&i.getDomRef();if(!p||!o||!b){return;}var c=o.scrollTop,d=b.offsetTop,e=o.clientHeight,f=b.offsetHeight;if(c>d){o.scrollTop=d;}else if((d+f)>(c+e)){o.scrollTop=Math.ceil(d+f-e);}};a.prototype.clearFilter=function(){for(var i=0,b=this.getItems();i<b.length;i++){b[i].bVisible=true;}};a.prototype.onItemChange=function(){};a.prototype.clearSelection=function(){};a.prototype.getValue=function(){var d=this.getFocusDomRef();if(d){return d.value;}return this.getProperty("value");};a.prototype.addItem=function(i){this.addAggregation("items",i);if(i){i.attachEvent("_change",this.onItemChange,this);}return this;};a.prototype.insertItem=function(i,b){this.insertAggregation("items",i,b,true);if(i){i.attachEvent("_change",this.onItemChange,this);}return this;};a.prototype.getItemAt=function(i){return this.getItems()[+i]||null;};a.prototype.getFirstItem=function(){return this.getItems()[0]||null;};a.prototype.getLastItem=function(){var i=this.getItems();return i[i.length-1]||null;};a.prototype.getEnabledItems=function(i){var L=this.getList();return L?L.getEnabledItems(i):[];};a.prototype.getItemByKey=function(k){var L=this.getList();return L?L.getItemByKey(k):null;};a.prototype.isOpen=function(){var p=this.getAggregation("picker");return!!(p&&p.isOpen());};a.prototype.close=function(){var p=this.getAggregation("picker");if(p){p.close();}return this;};a.prototype.removeItem=function(i){var L=this.getList();i=L?L.removeItem(i):null;if(i){i.detachEvent("_change",this.onItemChange,this);}return i;};a.prototype.removeAllItems=function(){var L=this.getList(),b=L?L.removeAllItems():[];this.clearSelection();for(var i=0;i<b.length;i++){b[i].detachEvent("_change",this.onItemChange,this);}return b;};a.prototype.destroyItems=function(){var L=this.getList();if(L){L.destroyItems();}return this;};return a;},true);
