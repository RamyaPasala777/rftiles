sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    function (Controller, MessageBox, MessageToast) {
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
                //this.onClearRegisterSubmitDialog();
            },
            /**Clearing Values in the form */
            onClearRegisterSubmitDialog: function () {
                var oView = this.getView();

                // Clear the value of each input field
                oView.byId("idResourceIdInput").setValue("");
                oView.byId("idUserNameInput").setValue("");
                oView.byId("idInputEmail").setValue("");
                oView.byId("idInputPhoneNumber").setValue("");

                // Clear the value of each ComboBox
                oView.byId("idResouceType").setSelectedKey("");

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
            // onSubmitPress: function () {

            //     var oArea = this.byId("_IDGenComboBox1").getSelectedKey();
            //     /**here OArea may be inbound,outbound or Internal based on OArea we get the values */
            //     var oItem;
            //     if (oArea === 'Inbound Process') {
            //         oItem = this.byId("_IDGenComboBox2").getSelectedKey();
            //     } else if (oArea === 'Outbound Process') {
            //         oItem = this.byId("_IDGenComboBox3").getSelectedKey();
            //     } else {
            //         oItem = this.byId("_IDGenComboBox4").getSelectedKey();
            //     }

            //     var oResource = this.byId("idPhoneNumberInput").getValue();
            //     var oUsername = this.byId("idCreatePasswordInput").getValue();
            //     var oEmail = this.byId("idInputuserType").getValue();
            //     var oPhone = this.byId("idInputuserType8").getValue();
            //     /**generating Password */
            //     function generatePassword() {
            //         const regex = /[A-Za-z@!#$%&]/;
            //         const passwordLength = 8;
            //         let password = "";

            //         for (let i = 0; i < passwordLength; i++) {
            //             let char = '';
            //             while (!char.match(regex)) {
            //                 char = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
            //             }
            //             password += char;
            //         }

            //         return password;
            //     }
            //     var oPassword = generatePassword();

            //     var oModel = this.getView().getModel();
            //     var that = this;
            //     oModel.create("/RESOURCESSet", { Resourceid: oResource, Validity: false, Resourcename: oUsername, Area: oArea, Email: oEmail, Phonenumber: oPhone, Password: oPassword, Resourcegroup: oItem }, {
            //         success: function (oData) {
            //             sap.m.MessageToast.show("suceess");
            //             that.onCloseRegisterSubmitDialog();
            //         },
            //         error: function (oError) {
            //             MessageBox.error("Error");
            //         }
            //     })

            // },
            onSubmitPress: function () {
                var oUserView = this.getView();
                var oProcessType = this.byId("idResouceType").getSelectedKey();
                var bValid = true;
                var bAllFieldsFilled = true; // Flag to track if all required fields are filled

                // Fetch values from input fields
                var oResourceId = oUserView.byId("idResourceIdInput").getValue();
                var oUsername = oUserView.byId("idUserNameInput").getValue();
                var oEmail = oUserView.byId("idInputEmail").getValue();
                var oPhone = oUserView.byId("idInputPhoneNumber").getValue();

                // Check if resource is selected
                if (!oProcessType) {
                    oUserView.byId("idResouceType").setValueState("Error");
                    oUserView.byId("idResouceType").setValueStateText("Select a valid Area");
                    bValid = false;
                    bAllFieldsFilled = false;

                } else {
                    oUserView.byId("idResouceType").setValueState("None");
                }


                // Validate Resource ID
                if (!oResourceId) {
                    oUserView.byId("idResourceIdInput").setValueState("Error");
                    oUserView.byId("idResourceIdInput").setValueStateText("Resource ID is mandatory");
                    bValid = false;
                    bAllFieldsFilled = false;
                } else if (!/^\d{6}$/.test(oResourceId)) {
                    oUserView.byId("idResourceIdInput").setValueState("Error");
                    oUserView.byId("idResourceIdInput").setValueStateText("Resource ID must be a 6-digit numeric value");
                    bValid = false;
                } else {
                    oUserView.byId("idResourceIdInput").setValueState("None");
                }

                // Validate Username
                if (!oUsername) {
                    oUserView.byId("idUserNameInput").setValueState("Error");
                    oUserView.byId("idUserNameInput").setValueStateText("Username is mandatory");
                    bValid = false;
                    bAllFieldsFilled = false;
                } else {
                    oUserView.byId("idUserNameInput").setValueState("None");
                }

                // Validate Email
                // if (!oEmail) {
                //     oUserView.byId("idInputEmail").setValueState("Error");
                //     oUserView.byId("idInputEmail").setValueStateText("Email is mandatory");
                //     bValid = false;
                //     bAllFieldsFilled = false;
                // } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(oEmail)) {
                //     oUserView.byId("idInputEmail").setValueState("Error");
                //     oUserView.byId("idInputEmail").setValueStateText("Please enter a valid email address");
                //     bValid = false;
                // } else {
                //     oUserView.byId("idInputEmail").setValueState("None");
                // }
                if(!(oUserView.byId("idInputEmail").getValue())){
                    
                }
              else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(oEmail)) {
                    oUserView.byId("idInputEmail").setValueState("Error");
                    oUserView.byId("idInputEmail").setValueStateText("Please enter a valid email address");
                    bValid = false;
                }

                // Validate Phone Number
                if (!oPhone) {
                    oUserView.byId("idInputPhoneNumber").setValueState("Error");
                    oUserView.byId("idInputPhoneNumber").setValueStateText("Phone number is mandatory");
                    bValid = false;
                    bAllFieldsFilled = false;
                } else if (oPhone.length !== 10 || !/^\d+$/.test(oPhone)) {
                    oUserView.byId("idInputPhoneNumber").setValueState("Error");
                    oUserView.byId("idInputPhoneNumber").setValueStateText("Mobile number must be a 10-digit numeric value");
                    bValid = false;
                } else {
                    oUserView.byId("idInputPhoneNumber").setValueState("None");
                }

                // Display appropriate message
                if (!bAllFieldsFilled) {
                    sap.m.MessageToast.show("Please fill all mandatory details");
                    return;
                }

                if (!bValid) {
                    sap.m.MessageToast.show("Please enter correct data");
                    return;
                }

                // Create the resource
                var oModel = this.getView().getModel();
                var that = this;
                oModel.read("/RESOURCESSet('" + oResourceId + "')", {
                    success: function (oData) {
                        MessageToast.show("Resource exist");
                        
                    }.bind(this),
                    error: function () {
                        oModel.create("/RESOURCESSet", {
                            Resourceid: oResourceId,
                            Resourcetype: oProcessType,
                            Validity: false,
                            Resourcename: oUsername,
                            Email: oEmail,
                            Phonenumber: oPhone,

                        }, {
                            success: function () {
                                sap.m.MessageToast.show("Success");
                                that.onCloseRegisterSubmitDialog();
                            },
                            error: function (oError) {
                                var oResponse = JSON.parse(oError.responseText);
                                MessageBox.error(oResponse.error.message.value || "Error occurred while creating resource");
                            }
                        });
                    }
                });
                // oModel.create("/RESOURCESSet", {
                //     Resourceid: oResourceId,
                //     Resourcetype:oProcessType,
                //     Validity: false,
                //     Resourcename: oUsername,
                //     Email: oEmail,
                //     Phonenumber: oPhone,

                // }, {
                //     success: function () {
                //         sap.m.MessageToast.show("Success");
                //         that.onCloseRegisterSubmitDialog();
                //     },
                //     error: function (oError) {
                //         var oResponse = JSON.parse(oError.responseText);
                //         MessageBox.error(oResponse.error.message.value || "Error occurred while creating resource");
                //     }
                // });
            },


            // onLoginPress: async function () {
            //     debugger
            //     var oView = this.getView();

            //     // Retrieve values from input fields
            //     var sWarehouseNumber = oView.byId("idHUInput").getValue();
            //     var sResourceId = oView.byId("idUserIDInput").getValue();
            //     var sPassword = oView.byId("idPasswordInput").getValue();

            //     // Perform validation checks

            //     if (!sWarehouseNumber) {
            //         MessageToast.show("Please enter the Warehouse Number.");
            //         return;
            //     }
            //     if (!sResourceId) {
            //         MessageToast.show("Please enter the Resource ID.");
            //         return;
            //     }
            //     if (!sPassword) {
            //         MessageToast.show("Please enter the Password.");
            //         return;
            //     }
            //     if(!(sWarehouseNumber && sResourceId && sPassword)){
            //         MessageToast.show("Please enter all the details");
            //         return
            //     }
            //     // Get the model from the component
            //     var oModel = this.getOwnerComponent().getModel();

            //     // Make the API call to check if the resource exists
            //     try {
            //         await oModel.read("/RESOURCESSet('" + sResourceId + "')", {
            //             success: function (oData) {
            //                 var Id = oData.Resourceid;
            //                this.getRouter().navTo("RouteResourcePage",{id:Id})
            //                 // You can perform further actions here, like navigating to the next view
            //             }.bind(this),
            //             error: function () {
            //                 MessageToast.show("User does not exist");
            //             }
            //         });
            //     } catch (error) {
            //         MessageToast.show("An error occurred while checking the user.");
            //     }
            // },
            onLoginPress: async function () {
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

                // Special case for Resource ID 111010 and Password ARTIHCUS
                if (sResourceId === "111010" && sPassword === "ARTIHCUS") {
                    this.getRouter().navTo("Supervisor");
                    return;
                }

                // Get the model from the component
                var oModel = this.getOwnerComponent().getModel();

                // Make the API call to check if the resource exists
                try {
                    await oModel.read("/RESOURCESSet('" + sResourceId + "')", {
                        success: function (oData) {
                            // Validate the returned Resource ID and Password
                            if (oData.Resourceid === sResourceId && oData.Password === sPassword) {
                                // Navigate to the ResourcePage with the correct ID
                                this.getRouter().navTo("RouteResourcePage", { id: sResourceId });
                            } else {
                                MessageToast.show("Invalid Resource ID or Password.");
                            }
                        }.bind(this),
                        error: function () {
                            MessageToast.show("User does not exist.");
                        }
                    });
                } catch (error) {
                    MessageToast.show("An error occurred while checking the user.");
                }
            },


            onClearPress: function () {
                var oView = this.getView();
                oView.byId("idUserIDInput").setValue("");
                oView.byId("idPasswordInput").setValue("");
            },

        });
    });
