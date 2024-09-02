sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/Device",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageToast"
    ],
    function(BaseController, Device, JSONModel,MessageToast) {
      "use strict";

      return BaseController.extend("com.app.rfscreens.controller.Supervisor", {
        onInit: function() {
            var oModel = new JSONModel(sap.ui.require.toUrl("com/app/rfscreens/model/data1.json"));
            this.getView().setModel(oModel);
            var oModelV2 = this.getOwnerComponent().getModel();
            this.getView().byId("pageContainer").setModel(oModelV2);
            //this._updateComboBoxItems();
        },
        onItemSelect: function (oEvent) {
            var oItem = oEvent.getParameter("item");
            this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
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
        },
        /**Based on Selected key DropDown Should be visible */
        onSelect: function (oEvent) {
            var oArea = oEvent.getSource().getSelectedKey();
            if (oArea === 'Inbound') {
                this.byId("_IDGenComboBox2").setVisible(true);
                this.byId("_IDGenComboBox3").setVisible(false);
                this.byId("_IDGenComboBox4").setVisible(false);
                this.byId("_IDGenComboBox5").setVisible(false);

            } else if (oArea === 'Outbound') {
                this.byId("_IDGenComboBox2").setVisible(false);
                this.byId("_IDGenComboBox3").setVisible(true);
                this.byId("_IDGenComboBox4").setVisible(false);
                this.byId("_IDGenComboBox5").setVisible(false);

            } else if (oArea === 'Internal') {
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
        onSelectQueue : function (oEvent) {
            var oArea = oEvent.getSource().getSelectedKey();
            if (oArea === 'Unloading') {
                this.byId("_IDGenComboBox11").setVisible(true);
                this.byId("_IDGenComboBox10").setVisible(false);
                this.byId("_IDGenComboBox12").setVisible(false);
                this.byId("_IDGenComboBox13").setVisible(false);
                this.byId("_IDGenComboBox14").setVisible(false);
                this.byId("_IDGenComboBox15").setVisible(false);
                this.byId("_IDGenComboBox16").setVisible(false);
                this.byId("_IDGenComboBox17").setVisible(false);
                this.byId("_IDGenComboBox18").setVisible(false);
                this.byId("_IDGenComboBox19").setVisible(false);
                this.byId("_IDGenComboBox20").setVisible(false);
                this.byId("_IDGenComboBox21").setVisible(false);
                this.byId("_IDGenComboBox22").setVisible(false);
                this.byId("_IDGenComboBox23").setVisible(false);
                this.byId("_IDGenComboBox24").setVisible(false);
                this.byId("_IDGenComboBox25").setVisible(false);
                this.byId("_IDGenComboBox26").setVisible(false);

            } else if (oArea === 'Deconsolidation') {
                    this.byId("_IDGenComboBox10").setVisible(false);
                    this.byId("_IDGenComboBox11").setVisible(false);
                    this.byId("_IDGenComboBox12").setVisible(true);
                    this.byId("_IDGenComboBox13").setVisible(false);
                    this.byId("_IDGenComboBox14").setVisible(false);
                    this.byId("_IDGenComboBox15").setVisible(false);
                    this.byId("_IDGenComboBox16").setVisible(false);
                    this.byId("_IDGenComboBox17").setVisible(false);
                    this.byId("_IDGenComboBox18").setVisible(false);
                    this.byId("_IDGenComboBox19").setVisible(false);
                    this.byId("_IDGenComboBox20").setVisible(false);
                    this.byId("_IDGenComboBox21").setVisible(false);
                    this.byId("_IDGenComboBox22").setVisible(false);
                    this.byId("_IDGenComboBox23").setVisible(false);
                    this.byId("_IDGenComboBox24").setVisible(false);
                    this.byId("_IDGenComboBox25").setVisible(false);
                    this.byId("_IDGenComboBox26").setVisible(false);

                  } else if (oArea === 'Putaway') {
                    this.byId("_IDGenComboBox10").setVisible(false);
                    this.byId("_IDGenComboBox11").setVisible(false);
                    this.byId("_IDGenComboBox12").setVisible(false);
                    this.byId("_IDGenComboBox13").setVisible(true);
                    this.byId("_IDGenComboBox14").setVisible(false);
                    this.byId("_IDGenComboBox15").setVisible(false);
                    this.byId("_IDGenComboBox16").setVisible(false);
                    this.byId("_IDGenComboBox17").setVisible(false);
                    this.byId("_IDGenComboBox18").setVisible(false);
                    this.byId("_IDGenComboBox19").setVisible(false);
                    this.byId("_IDGenComboBox20").setVisible(false);
                    this.byId("_IDGenComboBox21").setVisible(false);
                    this.byId("_IDGenComboBox22").setVisible(false);
                    this.byId("_IDGenComboBox23").setVisible(false);
                    this.byId("_IDGenComboBox24").setVisible(false);
                    this.byId("_IDGenComboBox25").setVisible(false);
                    this.byId("_IDGenComboBox26").setVisible(false);
                    
                } else if (oArea === 'Receiving Of Handling Units') {
                    this.byId("_IDGenComboBox10").setVisible(false);
                    this.byId("_IDGenComboBox11").setVisible(false);
                    this.byId("_IDGenComboBox12").setVisible(false);
                    this.byId("_IDGenComboBox13").setVisible(false);
                    this.byId("_IDGenComboBox14").setVisible(true);
                    this.byId("_IDGenComboBox15").setVisible(false);
                    this.byId("_IDGenComboBox16").setVisible(false);
                    this.byId("_IDGenComboBox17").setVisible(false);
                    this.byId("_IDGenComboBox18").setVisible(false);
                    this.byId("_IDGenComboBox19").setVisible(false);
                    this.byId("_IDGenComboBox20").setVisible(false);
                    this.byId("_IDGenComboBox21").setVisible(false);
                    this.byId("_IDGenComboBox22").setVisible(false);
                    this.byId("_IDGenComboBox23").setVisible(false);
                    this.byId("_IDGenComboBox24").setVisible(false);
                    this.byId("_IDGenComboBox25").setVisible(false);
                    this.byId("_IDGenComboBox26").setVisible(false);

                } else if (oArea === 'Set Ready for warehouse processing') {
                    this.byId("_IDGenComboBox10").setVisible(false);
                    this.byId("_IDGenComboBox11").setVisible(false);
                    this.byId("_IDGenComboBox12").setVisible(false);
                    this.byId("_IDGenComboBox13").setVisible(false);
                    this.byId("_IDGenComboBox14").setVisible(false);
                    this.byId("_IDGenComboBox15").setVisible(true);
                    this.byId("_IDGenComboBox16").setVisible(false);
                    this.byId("_IDGenComboBox17").setVisible(false);
                    this.byId("_IDGenComboBox18").setVisible(false);
                    this.byId("_IDGenComboBox19").setVisible(false);
                    this.byId("_IDGenComboBox20").setVisible(false);
                    this.byId("_IDGenComboBox21").setVisible(false);
                    this.byId("_IDGenComboBox22").setVisible(false);
                    this.byId("_IDGenComboBox23").setVisible(false);
                    this.byId("_IDGenComboBox24").setVisible(false);
                    this.byId("_IDGenComboBox25").setVisible(false);
                    this.byId("_IDGenComboBox26").setVisible(false);

                } else if (oArea === 'Picking') {
                    this.byId("_IDGenComboBox10").setVisible(false);
                    this.byId("_IDGenComboBox11").setVisible(false);
                    this.byId("_IDGenComboBox12").setVisible(false);
                    this.byId("_IDGenComboBox13").setVisible(false);
                    this.byId("_IDGenComboBox14").setVisible(false);
                    this.byId("_IDGenComboBox15").setVisible(false);
                    this.byId("_IDGenComboBox16").setVisible(true);
                    this.byId("_IDGenComboBox17").setVisible(false);
                    this.byId("_IDGenComboBox18").setVisible(false);
                    this.byId("_IDGenComboBox19").setVisible(false);
                    this.byId("_IDGenComboBox20").setVisible(false);
                    this.byId("_IDGenComboBox21").setVisible(false);
                    this.byId("_IDGenComboBox22").setVisible(false);
                    this.byId("_IDGenComboBox23").setVisible(false);
                    this.byId("_IDGenComboBox24").setVisible(false);
                    this.byId("_IDGenComboBox25").setVisible(false);
                    this.byId("_IDGenComboBox26").setVisible(false);

                } else if (oArea === 'Packing') {
                    this.byId("_IDGenComboBox10").setVisible(false);
                    this.byId("_IDGenComboBox11").setVisible(false);
                    this.byId("_IDGenComboBox12").setVisible(false);
                    this.byId("_IDGenComboBox13").setVisible(false);
                    this.byId("_IDGenComboBox14").setVisible(false);
                    this.byId("_IDGenComboBox15").setVisible(false);
                    this.byId("_IDGenComboBox16").setVisible(false);
                    this.byId("_IDGenComboBox17").setVisible(true);
                    this.byId("_IDGenComboBox18").setVisible(false);
                    this.byId("_IDGenComboBox19").setVisible(false);
                    this.byId("_IDGenComboBox20").setVisible(false);
                    this.byId("_IDGenComboBox21").setVisible(false);
                    this.byId("_IDGenComboBox22").setVisible(false);
                    this.byId("_IDGenComboBox23").setVisible(false);
                    this.byId("_IDGenComboBox24").setVisible(false);
                    this.byId("_IDGenComboBox25").setVisible(false);
                    this.byId("_IDGenComboBox26").setVisible(false);
                } else if (oArea === 'Loading') {
                    this.byId("_IDGenComboBox10").setVisible(false);
                    this.byId("_IDGenComboBox11").setVisible(false);
                    this.byId("_IDGenComboBox12").setVisible(false);
                    this.byId("_IDGenComboBox13").setVisible(false);
                    this.byId("_IDGenComboBox14").setVisible(false);
                    this.byId("_IDGenComboBox15").setVisible(false);
                    this.byId("_IDGenComboBox16").setVisible(false);
                    this.byId("_IDGenComboBox17").setVisible(false);
                    this.byId("_IDGenComboBox18").setVisible(true);
                    this.byId("_IDGenComboBox19").setVisible(false);
                    this.byId("_IDGenComboBox20").setVisible(false);
                    this.byId("_IDGenComboBox21").setVisible(false);
                    this.byId("_IDGenComboBox22").setVisible(false);
                    this.byId("_IDGenComboBox23").setVisible(false);
                    this.byId("_IDGenComboBox24").setVisible(false);
                    this.byId("_IDGenComboBox25").setVisible(false);
                    this.byId("_IDGenComboBox26").setVisible(false);
                } else if (oArea === 'Pick Point') {
                    this.byId("_IDGenComboBox10").setVisible(false);
                    this.byId("_IDGenComboBox11").setVisible(false);
                    this.byId("_IDGenComboBox12").setVisible(false);
                    this.byId("_IDGenComboBox13").setVisible(false);
                    this.byId("_IDGenComboBox14").setVisible(false);
                    this.byId("_IDGenComboBox15").setVisible(false);
                    this.byId("_IDGenComboBox16").setVisible(false);
                    this.byId("_IDGenComboBox17").setVisible(false);
                    this.byId("_IDGenComboBox18").setVisible(false);
                    this.byId("_IDGenComboBox19").setVisible(true);
                    this.byId("_IDGenComboBox20").setVisible(false);
                    this.byId("_IDGenComboBox21").setVisible(false);
                    this.byId("_IDGenComboBox22").setVisible(false);
                    this.byId("_IDGenComboBox23").setVisible(false);
                    this.byId("_IDGenComboBox24").setVisible(false);
                    this.byId("_IDGenComboBox25").setVisible(false);
                    this.byId("_IDGenComboBox26").setVisible(false);
                } else if (oArea === 'Consumption') {
                    this.byId("_IDGenComboBox10").setVisible(false);
                    this.byId("_IDGenComboBox11").setVisible(false);
                    this.byId("_IDGenComboBox12").setVisible(false);
                    this.byId("_IDGenComboBox13").setVisible(false);
                    this.byId("_IDGenComboBox14").setVisible(false);
                    this.byId("_IDGenComboBox15").setVisible(false);
                    this.byId("_IDGenComboBox16").setVisible(false);
                    this.byId("_IDGenComboBox17").setVisible(false);
                    this.byId("_IDGenComboBox18").setVisible(false);
                    this.byId("_IDGenComboBox19").setVisible(false);
                    this.byId("_IDGenComboBox20").setVisible(true);
                    this.byId("_IDGenComboBox21").setVisible(false);
                    this.byId("_IDGenComboBox22").setVisible(false);
                    this.byId("_IDGenComboBox23").setVisible(false);
                    this.byId("_IDGenComboBox24").setVisible(false);
                    this.byId("_IDGenComboBox25").setVisible(false);
                    this.byId("_IDGenComboBox26").setVisible(false);
                } else if (oArea === 'Distribution Equipment') {
                    this.byId("_IDGenComboBox10").setVisible(false);
                    this.byId("_IDGenComboBox11").setVisible(false);
                    this.byId("_IDGenComboBox12").setVisible(false);
                    this.byId("_IDGenComboBox13").setVisible(false);
                    this.byId("_IDGenComboBox14").setVisible(false);
                    this.byId("_IDGenComboBox15").setVisible(false);
                    this.byId("_IDGenComboBox16").setVisible(false);
                    this.byId("_IDGenComboBox17").setVisible(false);
                    this.byId("_IDGenComboBox18").setVisible(false);
                    this.byId("_IDGenComboBox19").setVisible(false);
                    this.byId("_IDGenComboBox20").setVisible(false);
                    this.byId("_IDGenComboBox21").setVisible(true);
                    this.byId("_IDGenComboBox22").setVisible(false);
                    this.byId("_IDGenComboBox23").setVisible(false);
                    this.byId("_IDGenComboBox24").setVisible(false);
                    this.byId("_IDGenComboBox25").setVisible(false);
                    this.byId("_IDGenComboBox26").setVisible(false);

                } else if (oArea === 'Inventory Counting') {
                    this.byId("_IDGenComboBox10").setVisible(false);
                    this.byId("_IDGenComboBox11").setVisible(false);
                    this.byId("_IDGenComboBox12").setVisible(false);
                    this.byId("_IDGenComboBox13").setVisible(false);
                    this.byId("_IDGenComboBox14").setVisible(false);
                    this.byId("_IDGenComboBox15").setVisible(false);
                    this.byId("_IDGenComboBox16").setVisible(false);
                    this.byId("_IDGenComboBox17").setVisible(false);
                    this.byId("_IDGenComboBox18").setVisible(false);
                    this.byId("_IDGenComboBox19").setVisible(false);
                    this.byId("_IDGenComboBox20").setVisible(false);
                    this.byId("_IDGenComboBox21").setVisible(false);
                    this.byId("_IDGenComboBox22").setVisible(true);
                    this.byId("_IDGenComboBox23").setVisible(false);
                    this.byId("_IDGenComboBox24").setVisible(false);
                    this.byId("_IDGenComboBox25").setVisible(false);
                    this.byId("_IDGenComboBox26").setVisible(false);

                } else if (oArea === 'Adhoc WT creations') {
                    this.byId("_IDGenComboBox10").setVisible(false);
                    this.byId("_IDGenComboBox11").setVisible(false);
                    this.byId("_IDGenComboBox12").setVisible(false);
                    this.byId("_IDGenComboBox13").setVisible(false);
                    this.byId("_IDGenComboBox14").setVisible(false);
                    this.byId("_IDGenComboBox15").setVisible(false);
                    this.byId("_IDGenComboBox16").setVisible(false);
                    this.byId("_IDGenComboBox17").setVisible(false);
                    this.byId("_IDGenComboBox18").setVisible(false);
                    this.byId("_IDGenComboBox19").setVisible(false);
                    this.byId("_IDGenComboBox20").setVisible(false);
                    this.byId("_IDGenComboBox21").setVisible(false);
                    this.byId("_IDGenComboBox22").setVisible(false);
                    this.byId("_IDGenComboBox23").setVisible(true);
                    this.byId("_IDGenComboBox24").setVisible(false);
                    this.byId("_IDGenComboBox25").setVisible(false);
                    this.byId("_IDGenComboBox26").setVisible(false);

                } else if (oArea === 'Queries') {
                    this.byId("_IDGenComboBox10").setVisible(false);
                    this.byId("_IDGenComboBox11").setVisible(false);
                    this.byId("_IDGenComboBox12").setVisible(false);
                    this.byId("_IDGenComboBox13").setVisible(false);
                    this.byId("_IDGenComboBox14").setVisible(false);
                    this.byId("_IDGenComboBox15").setVisible(false);
                    this.byId("_IDGenComboBox16").setVisible(false);
                    this.byId("_IDGenComboBox17").setVisible(false);
                    this.byId("_IDGenComboBox18").setVisible(false);
                    this.byId("_IDGenComboBox19").setVisible(false);
                    this.byId("_IDGenComboBox20").setVisible(false);
                    this.byId("_IDGenComboBox21").setVisible(false);
                    this.byId("_IDGenComboBox22").setVisible(false);
                    this.byId("_IDGenComboBox23").setVisible(false);
                    this.byId("_IDGenComboBox24").setVisible(true);
                    this.byId("_IDGenComboBox25").setVisible(false);
                    this.byId("_IDGenComboBox26").setVisible(false);
                    
                } else if (oArea === 'Quality Management') {
                    this.byId("_IDGenComboBox10").setVisible(false);
                    this.byId("_IDGenComboBox11").setVisible(false);
                    this.byId("_IDGenComboBox12").setVisible(false);
                    this.byId("_IDGenComboBox13").setVisible(false);
                    this.byId("_IDGenComboBox14").setVisible(false);
                    this.byId("_IDGenComboBox15").setVisible(false);
                    this.byId("_IDGenComboBox16").setVisible(false);
                    this.byId("_IDGenComboBox17").setVisible(false);
                    this.byId("_IDGenComboBox18").setVisible(false);
                    this.byId("_IDGenComboBox19").setVisible(false);
                    this.byId("_IDGenComboBox20").setVisible(false);
                    this.byId("_IDGenComboBox21").setVisible(false);
                    this.byId("_IDGenComboBox22").setVisible(false);
                    this.byId("_IDGenComboBox23").setVisible(false);
                    this.byId("_IDGenComboBox24").setVisible(false);
                    this.byId("_IDGenComboBox25").setVisible(true);
                    this.byId("_IDGenComboBox26").setVisible(false);
                     
                } else if (oArea === 'Resource Management') {
                    this.byId("_IDGenComboBox10").setVisible(false);
                    this.byId("_IDGenComboBox11").setVisible(false);
                    this.byId("_IDGenComboBox12").setVisible(false);
                    this.byId("_IDGenComboBox13").setVisible(false);
                    this.byId("_IDGenComboBox14").setVisible(false);
                    this.byId("_IDGenComboBox15").setVisible(false);
                    this.byId("_IDGenComboBox16").setVisible(false);
                    this.byId("_IDGenComboBox17").setVisible(false);
                    this.byId("_IDGenComboBox18").setVisible(false);
                    this.byId("_IDGenComboBox19").setVisible(false);
                    this.byId("_IDGenComboBox20").setVisible(false);
                    this.byId("_IDGenComboBox21").setVisible(false);
                    this.byId("_IDGenComboBox22").setVisible(false);
                    this.byId("_IDGenComboBox23").setVisible(false);
                    this.byId("_IDGenComboBox24").setVisible(false);
                    this.byId("_IDGenComboBox25").setVisible(false);
                    this.byId("_IDGenComboBox26").setVisible(true);

            } else {
                this.byId("_IDGenComboBox11").setVisible(false);
                this.byId("_IDGenComboBox12").setVisible(false);
                this.byId("_IDGenComboBox13").setVisible(false);
                this.byId("_IDGenComboBox14").setVisible(false);
                this.byId("_IDGenComboBox15").setVisible(false);
                this.byId("_IDGenComboBox16").setVisible(false);
                this.byId("_IDGenComboBox17").setVisible(false);
                this.byId("_IDGenComboBox18").setVisible(false);
                this.byId("_IDGenComboBox19").setVisible(false);
                this.byId("_IDGenComboBox20").setVisible(false);
                this.byId("_IDGenComboBox21").setVisible(false);
                this.byId("_IDGenComboBox22").setVisible(false);
                this.byId("_IDGenComboBox23").setVisible(false);
                this.byId("_IDGenComboBox24").setVisible(false);
                this.byId("_IDGenComboBox25").setVisible(false);
                this.byId("_IDGenComboBox26").setVisible(false);
                this.byId("_IDGenComboBox10").setVisible(true);
            }
        },
        onCreateUserBtnPress:async function(){
            var oView=this.getView();
            if (this.byId("idRequestedData").getSelectedItems().length < 1) {
                MessageToast.show("Please Select atleast one Resource");
                return
            }
            else if(this.byId("idRequestedData").getSelectedItems().length > 1){
                MessageToast.show("Please Select only one Resource");
                return
            }
            var oSelectedResource = this.byId("idRequestedData").getSelectedItem().getBindingContext().getObject();
            console.log(oSelectedResource)
           
            this.oApproveForm ??= await this.loadFragment({
                name: "com.app.rfscreens.fragments.ApproveDetails"
            })
            this.oApproveForm.open();
            if(oSelectedResource.Email){
                oView.byId("idNameInputF").setText(oSelectedResource.Resourcename)
            }
            else{
                oView.byId("idNameInputF").setVisible(false)
                oView.byId("idEmployeeEmailLabelF").setVisible(false)
            }
            oView.byId("idEmployeeIDInputF").setText(oSelectedResource.Resourceid)
           
            oView.byId("idEmailInputF").setText(oSelectedResource.Email)
            oView.byId("idPhoneInputF").setText(oSelectedResource.Phonenumber)
            // oView.byId("idEmployeeIDInputF").setEditable(false)
            // oView.byId("idNameInputF").setEditable(false)
            // oView.byId("idEmailInputF").setEditable(false)
            // oView.byId("idPhoneInputF").setEditable(false)
           
        },
        onClose:function(){
            this.oApproveForm.close();
        },
        onApprove:function(){
            var oView=this.getView();
            
        },
        _updateComboBoxItems: function () {
            var oComboBox = this.byId("_IDGenComboBox1");
            var oModel = this.getView().getModel();
            var aItems = oModel.getProperty("/ProcessAreaSet");

            // Create a set to track unique keys
            var aUniqueItems = [];
            var aKeys = new Set();

            // Filter out duplicates
            aItems.forEach(function (oItem) {
                if (!aKeys.has(oItem.Processarea)) {
                    aKeys.add(oItem.Processarea);
                    aUniqueItems.push(oItem);
                }
            });

            // Create a new model with unique items
            var oUniqueModel = new sap.ui.model.json.JSONModel({
                ProcessAreaSet: aUniqueItems
            });

            // Set the filtered model to the ComboBox
            oComboBox.setModel(oUniqueModel);
        },


      });
    }
  );
  