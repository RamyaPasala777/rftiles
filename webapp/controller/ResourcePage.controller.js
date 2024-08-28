sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel",
    "sap/m/Popover",
    "sap/m/Button",
    "sap/m/library"
],
    function (Controller, Device, JSONModel, Popover, Button, library) {
        "use strict";

        return Controller.extend("com.app.rfscreens.controller.ResourcePage", {
            onInit: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.attachRoutePatternMatched(this.onResourceDetailsLoad, this);
                var
                    oModel = new JSONModel(); oModel.loadData(sap.ui.require.toUrl("com/app/rfscreens/model/data.json"));    // Set the model to the view only after loading the data
                oModel.attachRequestCompleted(function () { this.getView().setModel(oModel); }.bind(this)); this.
                    _setToggleButtonTooltip(!Device.system.desktop);
            },


            onResourceDetailsLoad: async function (oEvent) {
                const { id } = oEvent.getParameter("arguments");
                this.ID = id;
                console.log(this.ID)
                var oModel = this.getView().getModel();
            
                var oModel1 = this.getOwnerComponent().getModel();
                
                await oModel1.read("/RESOURCESSet('" + this.ID + "')", {
                    success: function (oData) {
                        var area = oData.Area;
                        var group = oData.Resourcegroup;
                        var resourceType = oData.Queue;


                        var aNavigationData = oModel.getProperty("/navigation");
                        console.log(aNavigationData)
                        // Define which process and item to show
                        // var sProcessToShow = "Inbound Process";
                        // var sItemToShow = "Unloading";

                        // // Loop through navigation data
                        // aNavigationData.forEach(function (oProcess) {
                        //     // Loop through items of each process
                        //     oProcess.items.forEach(function (oItem) {
                        //         // Set visibility based on the matching process and item
                        //         if (oProcess.title === sProcessToShow && oItem.title === sItemToShow) {
                        //             oItem.visible = true;  // Set to true for matching item
                        //         } else {
                        //             oItem.visible = false; // Ensure all others are set to false
                        //         }
                        //     });
                        // });

                        // // Update the model with modified visibility data
                        // oModel.setProperty("/navigation", aNavigationData);



                        // You can perform further actions here, like navigating to the next view
                    }.bind(this),
                    error: function () {
                        MessageToast.show("User does not exist");
                    }
                });
                //   const sToolPage = this. getView().byId("toolPage");
                //   sToolPage.bindElement(`/(${id})`);
            },

            onItemSelect: function (oEvent) {
                var oItem = oEvent.getParameter("item");
                this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
            },

            handleUserNamePress: function (event) {
                var oPopover = new Popover({
                    showHeader: false,
                    placement: PlacementType.Bottom,
                    content: [
                        new Button({
                            text: 'Feedback',
                            type: ButtonType.Transparent
                        }),
                        new Button({
                            text: 'Help',
                            type: ButtonType.Transparent
                        }),
                        new Button({
                            text: 'Logout',
                            type: ButtonType.Transparent
                        })
                    ]
                }).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

                oPopover.openBy(event.getSource());
            },

            onSideNavButtonPress: function () {
                var oToolPage = this.byId("toolPage");
                var bSideExpanded = oToolPage.getSideExpanded();

                this._setToggleButtonTooltip(bSideExpanded);

                oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
            },

            _setToggleButtonTooltip: function (bLarge) {
                var oToggleButton = this.byId('sideNavigationToggleButton');
                if (bLarge) {
                    oToggleButton.setTooltip('Large Size Navigation');
                } else {
                    oToggleButton.setTooltip('Small Size Navigation');
                }
            }
        });
    });


