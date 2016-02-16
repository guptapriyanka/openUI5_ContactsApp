sap.ui.define(["sap/ui/core/format/NumberFormat"], function (NumberFormat) {
	"use strict";

	var formatter = {
		address: function(value) {
			var MAX_LENGTH = 26;
			if(value.length >= MAX_LENGTH) {
				value = value.substring(0, MAX_LENGTH) + "...";
			}
			return value;
		},
		status: function(value) {
			return value === true ? "Active" : "Inactive"
		},
	};

	return formatter;
});
