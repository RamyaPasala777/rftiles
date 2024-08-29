sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    function (Controller, MessageBox,MessageToast) {
        "use strict";

        return Controller.extend("com.app.rfscreens.controller.Home", {
            onInit: function () {

            },
            /**Loading Signup Fragment */
            onPressSignupBtn: async function () {
                this.oSignupForm ??= await this.loadFragment({
                    name: "com.app.rfscreens.fragments.SignUpDetails"
                })
                this.oSignupForm.open();
            },
            /**Close Signup Form */
            onCloseRegisterSubmitDialog: function () {
                this.oSignupForm.close();
                this.onClearRegisterSubmitDialog();
            },
            /**Clearing Values in the form */
            onClearRegisterSubmitDialog: function () {
                var oView = this.getView();

                // Clear the value of each input field
                oView.byId("idPhoneNumberInput").setValue("");
                oView.byId("idCreatePasswordInput").setValue("");
                oView.byId("idInputuserType").setValue("");
                oView.byId("idInputuserType8").setValue("");

                // Clear the value of each ComboBox
                oView.byId("_IDGenComboBox1").setSelectedKey("");
                oView.byId("_IDGenComboBox2").setSelectedKey("");
                oView.byId("_IDGenComboBox3").setSelectedKey("");
            },
            /**Based on Selected key DropDown Should be visible */
            onSelect: function (oEvent) {
                var oArea = oEvent.getSource().getSelectedKey();
                if (oArea === 'Inbound Process') {
                    this.byId("_IDGenComboBox2").setVisible(true);
                    this.byId("_IDGenComboBox3").setVisible(false);
                    this.byId("_IDGenComboBox4").setVisible(false);
                    this.byId("_IDGenComboBox5").setVisible(false);

                } else if (oArea === 'Outbound Process') {
                    this.byId("_IDGenComboBox2").setVisible(false);
                    this.byId("_IDGenComboBox3").setVisible(true);
                    this.byId("_IDGenComboBox4").setVisible(false);
                    this.byId("_IDGenComboBox5").setVisible(false);

                } else if (oArea === 'Internal Process') {
                    this.byId("_IDGenComboBox2").setVisible(false);
                    this.byId("_IDGenComboBox3").setVisible(false);
                    this.byId("_IDGenComboBox4").setVisible(true);
                    this.byId("_IDGenComboBox5").setVisible(false);
                } else {
                    this.byId("_IDGenComboBox2").setVisible(false);
                    this.byId("_IDGenComboBox3").setVisible(false);
                    this.byId("_IDGenComboBox4").setVisible(false);
                    this.byId("_IDGenComboBox5").setVisible(true);
                }
            },
            /**Getting Signup form Details*/
            onSubmitPress: function () {

                var oArea = this.byId("_IDGenComboBox1").getSelectedKey();
                /**here OArea may be inbound,outbound or Internal based on OArea we get the values */
                var oItem;
                if (oArea === 'Inbound Process') {
                    oItem = this.byId("_IDGenComboBox2").getSelectedKey();
                } else if (oArea === 'Outbound Process') {
                    oItem = this.byId("_IDGenComboBox3").getSelectedKey();
                } else {
                    oItem = this.byId("_IDGenComboBox4").getSelectedKey();
                }

                var oResource = this.byId("idPhoneNumberInput").getValue();
                var oUsername = this.byId("idCreatePasswordInput").getValue();
                var oEmail = this.byId("idInputuserType").getValue();
                var oPhone = this.byId("idInputuserType8").getValue();
                /**generating Password */
                function generatePassword() {
                    const regex = /[A-Za-z@!#$%&]/;
                    const passwordLength = 8;
                    let password = "";

                    for (let i = 0; i < passwordLength; i++) {
                        let char = '';
                        while (!char.match(regex)) {
                            char = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
                        }
                        password += char;
                    }

                    return password;
                }
                var oPassword = generatePassword();

                var oModel = this.getView().getModel();
                var that = this;
                oModel.create("/RESOURCESSet", { Resourceid: oResource, Validity: false, Resourcename: oUsername, Area: oArea, Email: oEmail, Phonenumber: oPhone, Password: oPassword, Resourcegroup: oItem }, {
                    success: function (oData) {
                        sap.m.MessageToast.show("suceess");
                        that.onCloseRegisterSubmitDialog();
                    },
                    error: function (oError) {
                        MessageBox.error("Error");
                    }
                })

            },
            onLoginPress: async function () {
                debugger
                var oView = this.getView();
    
                // Retrieve values from input fields
                var sWarehouseNumber = oView.byId("idHUInput").getValue();
                var sResourceId = oView.byId("idUserIDInput").getValue();
                var sPassword = oView.byId("idPasswordInput").getValue();
    
                // Perform validation checks
               
                if (!sWarehouseNumber) {
                    MessageToast.show("Please enter the Warehouse Number.");
                    return;
                }
                if (!sResourceId) {
                    MessageToast.show("Please enter the Resource ID.");
                    return;
                }
                if (!sPassword) {
                    MessageToast.show("Please enter the Password.");
                    return;
                }
                if(!(sWarehouseNumber && sResourceId && sPassword)){
                    MessageToast.show("Please enter all the details");
                    return
                }
                // Get the model from the component
                var oModel = this.getOwnerComponent().getModel();
    
                // Make the API call to check if the resource exists
                try {
                    await oModel.read("/RESOURCESSet('" + sResourceId + "')", {
                        success: function (oData) {
                            var Id = oData.Resourceid;
                           this.getRouter().navTo("RouteResourcePage",{id:Id})
                            // You can perform further actions here, like navigating to the next view
                        }.bind(this),
                        error: function () {
                            MessageToast.show("User does not exist");
                        }
                    });
                } catch (error) {
                    MessageToast.show("An error occurred while checking the user.");
                }
            },
    
            onClearPress: function () {
                var oView = this.getView();
                oView.byId("idHUInput").setValue("");
                oView.byId("idUserIDInput").setValue("");
                oView.byId("idPasswordInput").setValue("");
            },
    
        });
    });
