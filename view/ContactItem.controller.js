sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'contact_app/model/formatter',
  'sap/m/MessageToast',
  'sap/m/MessageBox'
], function (Controller, formatter, MessageToast, MessageBox) {
  return Controller.extend("contact_app.view.ContactItem", {
    formatter : formatter,

    onInit : function () {
      var oComponent = this.getOwnerComponent();
      this._router = oComponent.getRouter();
      this._router.getRoute("contactItem").attachPatternMatched(this._routePatternMatched, this);
    },

    _routePatternMatched: function(oEvent) {
      var sId = oEvent.getParameter("arguments").index;
      var sContactPath = "/items/" +  oEvent.getParameter("arguments").index;
      console.log(sContactPath);
      this.getView().bindElement(sContactPath);


      // var data = this.getOwnerComponent().oModels.app.oData.items[sId];
      // this.getView().bindElement(data);
    },

  

    handleNavButtonPress : function () {
      this.getOwnerComponent().myNavBack();
    }

  });
});