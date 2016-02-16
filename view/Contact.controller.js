sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'contact_app/model/formatter',
  'sap/ui/Device',
  'sap/ui/model/json/JSONModel'
], function (Controller,
       formatter,
       Device,
       Filter,
       FilterOperator) {
  "use strict";

  return Controller.extend("contact_app.view.Contact", {
    formatter : formatter,
    onInit : function () {

      var oComponent = this.getOwnerComponent();
      this._router = oComponent.getRouter();
    },

    _loadContact : function(oEvent) {
    },

    _changeNoDataTextToIndicateLoading: function (oList) {
      var sOldNoDataText = oList.getNoDataText();
      oList.setNoDataText("Loading...");
      oList.attachEventOnce("updateFinished", function() {oList.setNoDataText(sOldNoDataText);});
    },
    handleContactListSelect : function (oEvent) {
      this._showContact(oEvent);
    },

    handleContactListItemPress : function (oEvent) {
      this._showContact(oEvent);
    },

    _showContact: function (oEvent) {
      var oBindContext;
      if (sap.ui.Device.system.phone) {
        oBindContext = oEvent.getSource().getBindingContext();
      } else {
        oBindContext = oEvent.getSource().getSelectedItem().getBindingContext();
      }
      var index = oBindContext.getObject().index
      this._router.navTo("contactItem", {index: index}, !Device.system.phone);
    },

  });
});
