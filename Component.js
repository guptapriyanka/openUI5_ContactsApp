sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/m/routing/Router',
	'sap/ui/model/resource/ResourceModel',
	'sap/ui/model/odata/ODataModel',
	'sap/ui/model/json/JSONModel'
], function (UIComponent,
			Router,
			ResourceModel,
			ODataModel,
			JSONModel) {

	return UIComponent.extend("contact_app.Component", {

		metadata: {
			includes : ["css/style.css"],
			routing: {
				config: {
					routerClass: Router,
					viewType: "XML",
					viewPath: "contact_app.view",
					controlId: "splitApp",
					transition: "slide",
					bypassed: {
						target: ["home"]
					}
				},
				routes: [
					{
						pattern: "",
						name: "home",
						target: "contact"
					},
					{
						pattern: "contact/{index}",
						name: "contactItem",
						target: ["contact","contactItem"]
					},
				],
				targets: {
					contact: {
						viewName: "Contact",
						viewLevel: 1,
						controlAggregation: "masterPages"
					},
					contactItem: {
						viewName: "ContactItem",
						viewLevel: 1,
						controlAggregation: "detailPages"
					},
				}
			}
		},

		init: function () {
			// call overwritten init (calls createContent)
			UIComponent.prototype.init.apply(this, arguments);
			var oAppsModel = new sap.ui.model.json.JSONModel("Contact.json");
      this.setModel(oAppsModel);
			// set device model
			var oDeviceModel = new JSONModel({
				isTouch: sap.ui.Device.support.touch,
				isNoTouch: !sap.ui.Device.support.touch,
				isPhone: sap.ui.Device.system.phone,
				isNoPhone: !sap.ui.Device.system.phone,
				listMode: (sap.ui.Device.system.phone) ? "None" : "SingleSelectMaster",
				listItemType: (sap.ui.Device.system.phone) ? "Active" : "Inactive"
			});
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");

			this._router = this.getRouter();

			// initialize the router
			this._router.initialize();

		},

		myNavBack : function () {
			var oHistory = sap.ui.core.routing.History.getInstance();
			var oPrevHash = oHistory.getPreviousHash();
			if (oPrevHash !== undefined) {
				window.history.go(-1);
			} else {
				this._router.navTo("home", {}, true);
			}
		},

		createContent: function () {
			// create root view
			return sap.ui.view({
				viewName: "contact_app.view.App",
				type: "XML"
			});
		}
	});

});
