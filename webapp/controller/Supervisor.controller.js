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
            this._fetchUniqueProcessAreas();
            this.byId("idEmppInput").attachLiveChange(this.onEmployeeIdLiveChange, this);
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
        onSideNavButtonPress1: function () {
            var oToolPage = this.byId("toolPagee");
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
        // onSelect: function (oEvent) {
        //     var oArea = oEvent.getSource().getSelectedKey();
        //     if (oArea === 'Inbound') {
        //         this.byId("_IDGenComboBox2").setVisible(true);
        //         this.byId("_IDGenComboBox3").setVisible(false);
        //         this.byId("_IDGenComboBox4").setVisible(false);
        //         this.byId("_IDGenComboBox5").setVisible(false);

        //     } else if (oArea === 'Outbound') {
        //         this.byId("_IDGenComboBox2").setVisible(false);
        //         this.byId("_IDGenComboBox3").setVisible(true);
        //         this.byId("_IDGenComboBox4").setVisible(false);
        //         this.byId("_IDGenComboBox5").setVisible(false);

        //     } else if (oArea === 'Internal') {
        //         this.byId("_IDGenComboBox2").setVisible(false);
        //         this.byId("_IDGenComboBox3").setVisible(false);
        //         this.byId("_IDGenComboBox4").setVisible(true);
        //         this.byId("_IDGenComboBox5").setVisible(false);
        //     } else {
        //         this.byId("_IDGenComboBox2").setVisible(false);
        //         this.byId("_IDGenComboBox3").setVisible(false);
        //         this.byId("_IDGenComboBox4").setVisible(false);
        //         this.byId("_IDGenComboBox5").setVisible(true);
        //     }
        // },
        // onSelectQueue : function (oEvent) {
        //     var oArea = oEvent.getSource().getSelectedKey();
        //     if (oArea === 'Unloading') {
        //         this.byId("_IDGenComboBox11").setVisible(true);
        //         this.byId("_IDGenComboBox10").setVisible(false);
        //         this.byId("_IDGenComboBox12").setVisible(false);
        //         this.byId("_IDGenComboBox13").setVisible(false);
        //         this.byId("_IDGenComboBox14").setVisible(false);
        //         this.byId("_IDGenComboBox15").setVisible(false);
        //         this.byId("_IDGenComboBox16").setVisible(false);
        //         this.byId("_IDGenComboBox17").setVisible(false);
        //         this.byId("_IDGenComboBox18").setVisible(false);
        //         this.byId("_IDGenComboBox19").setVisible(false);
        //         this.byId("_IDGenComboBox20").setVisible(false);
        //         this.byId("_IDGenComboBox21").setVisible(false);
        //         this.byId("_IDGenComboBox22").setVisible(false);
        //         this.byId("_IDGenComboBox23").setVisible(false);
        //         this.byId("_IDGenComboBox24").setVisible(false);
        //         this.byId("_IDGenComboBox25").setVisible(false);
        //         this.byId("_IDGenComboBox26").setVisible(false);

        //     } else if (oArea === 'Deconsolidation') {
        //             this.byId("_IDGenComboBox10").setVisible(false);
        //             this.byId("_IDGenComboBox11").setVisible(false);
        //             this.byId("_IDGenComboBox12").setVisible(true);
        //             this.byId("_IDGenComboBox13").setVisible(false);
        //             this.byId("_IDGenComboBox14").setVisible(false);
        //             this.byId("_IDGenComboBox15").setVisible(false);
        //             this.byId("_IDGenComboBox16").setVisible(false);
        //             this.byId("_IDGenComboBox17").setVisible(false);
        //             this.byId("_IDGenComboBox18").setVisible(false);
        //             this.byId("_IDGenComboBox19").setVisible(false);
        //             this.byId("_IDGenComboBox20").setVisible(false);
        //             this.byId("_IDGenComboBox21").setVisible(false);
        //             this.byId("_IDGenComboBox22").setVisible(false);
        //             this.byId("_IDGenComboBox23").setVisible(false);
        //             this.byId("_IDGenComboBox24").setVisible(false);
        //             this.byId("_IDGenComboBox25").setVisible(false);
        //             this.byId("_IDGenComboBox26").setVisible(false);

        //           } else if (oArea === 'Putaway') {
        //             this.byId("_IDGenComboBox10").setVisible(false);
        //             this.byId("_IDGenComboBox11").setVisible(false);
        //             this.byId("_IDGenComboBox12").setVisible(false);
        //             this.byId("_IDGenComboBox13").setVisible(true);
        //             this.byId("_IDGenComboBox14").setVisible(false);
        //             this.byId("_IDGenComboBox15").setVisible(false);
        //             this.byId("_IDGenComboBox16").setVisible(false);
        //             this.byId("_IDGenComboBox17").setVisible(false);
        //             this.byId("_IDGenComboBox18").setVisible(false);
        //             this.byId("_IDGenComboBox19").setVisible(false);
        //             this.byId("_IDGenComboBox20").setVisible(false);
        //             this.byId("_IDGenComboBox21").setVisible(false);
        //             this.byId("_IDGenComboBox22").setVisible(false);
        //             this.byId("_IDGenComboBox23").setVisible(false);
        //             this.byId("_IDGenComboBox24").setVisible(false);
        //             this.byId("_IDGenComboBox25").setVisible(false);
        //             this.byId("_IDGenComboBox26").setVisible(false);
                    
        //         } else if (oArea === 'Receiving Of Handling Units') {
        //             this.byId("_IDGenComboBox10").setVisible(false);
        //             this.byId("_IDGenComboBox11").setVisible(false);
        //             this.byId("_IDGenComboBox12").setVisible(false);
        //             this.byId("_IDGenComboBox13").setVisible(false);
        //             this.byId("_IDGenComboBox14").setVisible(true);
        //             this.byId("_IDGenComboBox15").setVisible(false);
        //             this.byId("_IDGenComboBox16").setVisible(false);
        //             this.byId("_IDGenComboBox17").setVisible(false);
        //             this.byId("_IDGenComboBox18").setVisible(false);
        //             this.byId("_IDGenComboBox19").setVisible(false);
        //             this.byId("_IDGenComboBox20").setVisible(false);
        //             this.byId("_IDGenComboBox21").setVisible(false);
        //             this.byId("_IDGenComboBox22").setVisible(false);
        //             this.byId("_IDGenComboBox23").setVisible(false);
        //             this.byId("_IDGenComboBox24").setVisible(false);
        //             this.byId("_IDGenComboBox25").setVisible(false);
        //             this.byId("_IDGenComboBox26").setVisible(false);

        //         } else if (oArea === 'Set Ready for warehouse processing') {
        //             this.byId("_IDGenComboBox10").setVisible(false);
        //             this.byId("_IDGenComboBox11").setVisible(false);
        //             this.byId("_IDGenComboBox12").setVisible(false);
        //             this.byId("_IDGenComboBox13").setVisible(false);
        //             this.byId("_IDGenComboBox14").setVisible(false);
        //             this.byId("_IDGenComboBox15").setVisible(true);
        //             this.byId("_IDGenComboBox16").setVisible(false);
        //             this.byId("_IDGenComboBox17").setVisible(false);
        //             this.byId("_IDGenComboBox18").setVisible(false);
        //             this.byId("_IDGenComboBox19").setVisible(false);
        //             this.byId("_IDGenComboBox20").setVisible(false);
        //             this.byId("_IDGenComboBox21").setVisible(false);
        //             this.byId("_IDGenComboBox22").setVisible(false);
        //             this.byId("_IDGenComboBox23").setVisible(false);
        //             this.byId("_IDGenComboBox24").setVisible(false);
        //             this.byId("_IDGenComboBox25").setVisible(false);
        //             this.byId("_IDGenComboBox26").setVisible(false);

        //         } else if (oArea === 'Picking') {
        //             this.byId("_IDGenComboBox10").setVisible(false);
        //             this.byId("_IDGenComboBox11").setVisible(false);
        //             this.byId("_IDGenComboBox12").setVisible(false);
        //             this.byId("_IDGenComboBox13").setVisible(false);
        //             this.byId("_IDGenComboBox14").setVisible(false);
        //             this.byId("_IDGenComboBox15").setVisible(false);
        //             this.byId("_IDGenComboBox16").setVisible(true);
        //             this.byId("_IDGenComboBox17").setVisible(false);
        //             this.byId("_IDGenComboBox18").setVisible(false);
        //             this.byId("_IDGenComboBox19").setVisible(false);
        //             this.byId("_IDGenComboBox20").setVisible(false);
        //             this.byId("_IDGenComboBox21").setVisible(false);
        //             this.byId("_IDGenComboBox22").setVisible(false);
        //             this.byId("_IDGenComboBox23").setVisible(false);
        //             this.byId("_IDGenComboBox24").setVisible(false);
        //             this.byId("_IDGenComboBox25").setVisible(false);
        //             this.byId("_IDGenComboBox26").setVisible(false);

        //         } else if (oArea === 'Packing') {
        //             this.byId("_IDGenComboBox10").setVisible(false);
        //             this.byId("_IDGenComboBox11").setVisible(false);
        //             this.byId("_IDGenComboBox12").setVisible(false);
        //             this.byId("_IDGenComboBox13").setVisible(false);
        //             this.byId("_IDGenComboBox14").setVisible(false);
        //             this.byId("_IDGenComboBox15").setVisible(false);
        //             this.byId("_IDGenComboBox16").setVisible(false);
        //             this.byId("_IDGenComboBox17").setVisible(true);
        //             this.byId("_IDGenComboBox18").setVisible(false);
        //             this.byId("_IDGenComboBox19").setVisible(false);
        //             this.byId("_IDGenComboBox20").setVisible(false);
        //             this.byId("_IDGenComboBox21").setVisible(false);
        //             this.byId("_IDGenComboBox22").setVisible(false);
        //             this.byId("_IDGenComboBox23").setVisible(false);
        //             this.byId("_IDGenComboBox24").setVisible(false);
        //             this.byId("_IDGenComboBox25").setVisible(false);
        //             this.byId("_IDGenComboBox26").setVisible(false);
        //         } else if (oArea === 'Loading') {
        //             this.byId("_IDGenComboBox10").setVisible(false);
        //             this.byId("_IDGenComboBox11").setVisible(false);
        //             this.byId("_IDGenComboBox12").setVisible(false);
        //             this.byId("_IDGenComboBox13").setVisible(false);
        //             this.byId("_IDGenComboBox14").setVisible(false);
        //             this.byId("_IDGenComboBox15").setVisible(false);
        //             this.byId("_IDGenComboBox16").setVisible(false);
        //             this.byId("_IDGenComboBox17").setVisible(false);
        //             this.byId("_IDGenComboBox18").setVisible(true);
        //             this.byId("_IDGenComboBox19").setVisible(false);
        //             this.byId("_IDGenComboBox20").setVisible(false);
        //             this.byId("_IDGenComboBox21").setVisible(false);
        //             this.byId("_IDGenComboBox22").setVisible(false);
        //             this.byId("_IDGenComboBox23").setVisible(false);
        //             this.byId("_IDGenComboBox24").setVisible(false);
        //             this.byId("_IDGenComboBox25").setVisible(false);
        //             this.byId("_IDGenComboBox26").setVisible(false);
        //         } else if (oArea === 'Pick Point') {
        //             this.byId("_IDGenComboBox10").setVisible(false);
        //             this.byId("_IDGenComboBox11").setVisible(false);
        //             this.byId("_IDGenComboBox12").setVisible(false);
        //             this.byId("_IDGenComboBox13").setVisible(false);
        //             this.byId("_IDGenComboBox14").setVisible(false);
        //             this.byId("_IDGenComboBox15").setVisible(false);
        //             this.byId("_IDGenComboBox16").setVisible(false);
        //             this.byId("_IDGenComboBox17").setVisible(false);
        //             this.byId("_IDGenComboBox18").setVisible(false);
        //             this.byId("_IDGenComboBox19").setVisible(true);
        //             this.byId("_IDGenComboBox20").setVisible(false);
        //             this.byId("_IDGenComboBox21").setVisible(false);
        //             this.byId("_IDGenComboBox22").setVisible(false);
        //             this.byId("_IDGenComboBox23").setVisible(false);
        //             this.byId("_IDGenComboBox24").setVisible(false);
        //             this.byId("_IDGenComboBox25").setVisible(false);
        //             this.byId("_IDGenComboBox26").setVisible(false);
        //         } else if (oArea === 'Consumption') {
        //             this.byId("_IDGenComboBox10").setVisible(false);
        //             this.byId("_IDGenComboBox11").setVisible(false);
        //             this.byId("_IDGenComboBox12").setVisible(false);
        //             this.byId("_IDGenComboBox13").setVisible(false);
        //             this.byId("_IDGenComboBox14").setVisible(false);
        //             this.byId("_IDGenComboBox15").setVisible(false);
        //             this.byId("_IDGenComboBox16").setVisible(false);
        //             this.byId("_IDGenComboBox17").setVisible(false);
        //             this.byId("_IDGenComboBox18").setVisible(false);
        //             this.byId("_IDGenComboBox19").setVisible(false);
        //             this.byId("_IDGenComboBox20").setVisible(true);
        //             this.byId("_IDGenComboBox21").setVisible(false);
        //             this.byId("_IDGenComboBox22").setVisible(false);
        //             this.byId("_IDGenComboBox23").setVisible(false);
        //             this.byId("_IDGenComboBox24").setVisible(false);
        //             this.byId("_IDGenComboBox25").setVisible(false);
        //             this.byId("_IDGenComboBox26").setVisible(false);
        //         } else if (oArea === 'Distribution Equipment') {
        //             this.byId("_IDGenComboBox10").setVisible(false);
        //             this.byId("_IDGenComboBox11").setVisible(false);
        //             this.byId("_IDGenComboBox12").setVisible(false);
        //             this.byId("_IDGenComboBox13").setVisible(false);
        //             this.byId("_IDGenComboBox14").setVisible(false);
        //             this.byId("_IDGenComboBox15").setVisible(false);
        //             this.byId("_IDGenComboBox16").setVisible(false);
        //             this.byId("_IDGenComboBox17").setVisible(false);
        //             this.byId("_IDGenComboBox18").setVisible(false);
        //             this.byId("_IDGenComboBox19").setVisible(false);
        //             this.byId("_IDGenComboBox20").setVisible(false);
        //             this.byId("_IDGenComboBox21").setVisible(true);
        //             this.byId("_IDGenComboBox22").setVisible(false);
        //             this.byId("_IDGenComboBox23").setVisible(false);
        //             this.byId("_IDGenComboBox24").setVisible(false);
        //             this.byId("_IDGenComboBox25").setVisible(false);
        //             this.byId("_IDGenComboBox26").setVisible(false);

        //         } else if (oArea === 'Inventory Counting') {
        //             this.byId("_IDGenComboBox10").setVisible(false);
        //             this.byId("_IDGenComboBox11").setVisible(false);
        //             this.byId("_IDGenComboBox12").setVisible(false);
        //             this.byId("_IDGenComboBox13").setVisible(false);
        //             this.byId("_IDGenComboBox14").setVisible(false);
        //             this.byId("_IDGenComboBox15").setVisible(false);
        //             this.byId("_IDGenComboBox16").setVisible(false);
        //             this.byId("_IDGenComboBox17").setVisible(false);
        //             this.byId("_IDGenComboBox18").setVisible(false);
        //             this.byId("_IDGenComboBox19").setVisible(false);
        //             this.byId("_IDGenComboBox20").setVisible(false);
        //             this.byId("_IDGenComboBox21").setVisible(false);
        //             this.byId("_IDGenComboBox22").setVisible(true);
        //             this.byId("_IDGenComboBox23").setVisible(false);
        //             this.byId("_IDGenComboBox24").setVisible(false);
        //             this.byId("_IDGenComboBox25").setVisible(false);
        //             this.byId("_IDGenComboBox26").setVisible(false);

        //         } else if (oArea === 'Adhoc WT creations') {
        //             this.byId("_IDGenComboBox10").setVisible(false);
        //             this.byId("_IDGenComboBox11").setVisible(false);
        //             this.byId("_IDGenComboBox12").setVisible(false);
        //             this.byId("_IDGenComboBox13").setVisible(false);
        //             this.byId("_IDGenComboBox14").setVisible(false);
        //             this.byId("_IDGenComboBox15").setVisible(false);
        //             this.byId("_IDGenComboBox16").setVisible(false);
        //             this.byId("_IDGenComboBox17").setVisible(false);
        //             this.byId("_IDGenComboBox18").setVisible(false);
        //             this.byId("_IDGenComboBox19").setVisible(false);
        //             this.byId("_IDGenComboBox20").setVisible(false);
        //             this.byId("_IDGenComboBox21").setVisible(false);
        //             this.byId("_IDGenComboBox22").setVisible(false);
        //             this.byId("_IDGenComboBox23").setVisible(true);
        //             this.byId("_IDGenComboBox24").setVisible(false);
        //             this.byId("_IDGenComboBox25").setVisible(false);
        //             this.byId("_IDGenComboBox26").setVisible(false);

        //         } else if (oArea === 'Queries') {
        //             this.byId("_IDGenComboBox10").setVisible(false);
        //             this.byId("_IDGenComboBox11").setVisible(false);
        //             this.byId("_IDGenComboBox12").setVisible(false);
        //             this.byId("_IDGenComboBox13").setVisible(false);
        //             this.byId("_IDGenComboBox14").setVisible(false);
        //             this.byId("_IDGenComboBox15").setVisible(false);
        //             this.byId("_IDGenComboBox16").setVisible(false);
        //             this.byId("_IDGenComboBox17").setVisible(false);
        //             this.byId("_IDGenComboBox18").setVisible(false);
        //             this.byId("_IDGenComboBox19").setVisible(false);
        //             this.byId("_IDGenComboBox20").setVisible(false);
        //             this.byId("_IDGenComboBox21").setVisible(false);
        //             this.byId("_IDGenComboBox22").setVisible(false);
        //             this.byId("_IDGenComboBox23").setVisible(false);
        //             this.byId("_IDGenComboBox24").setVisible(true);
        //             this.byId("_IDGenComboBox25").setVisible(false);
        //             this.byId("_IDGenComboBox26").setVisible(false);
                    
        //         } else if (oArea === 'Quality Management') {
        //             this.byId("_IDGenComboBox10").setVisible(false);
        //             this.byId("_IDGenComboBox11").setVisible(false);
        //             this.byId("_IDGenComboBox12").setVisible(false);
        //             this.byId("_IDGenComboBox13").setVisible(false);
        //             this.byId("_IDGenComboBox14").setVisible(false);
        //             this.byId("_IDGenComboBox15").setVisible(false);
        //             this.byId("_IDGenComboBox16").setVisible(false);
        //             this.byId("_IDGenComboBox17").setVisible(false);
        //             this.byId("_IDGenComboBox18").setVisible(false);
        //             this.byId("_IDGenComboBox19").setVisible(false);
        //             this.byId("_IDGenComboBox20").setVisible(false);
        //             this.byId("_IDGenComboBox21").setVisible(false);
        //             this.byId("_IDGenComboBox22").setVisible(false);
        //             this.byId("_IDGenComboBox23").setVisible(false);
        //             this.byId("_IDGenComboBox24").setVisible(false);
        //             this.byId("_IDGenComboBox25").setVisible(true);
        //             this.byId("_IDGenComboBox26").setVisible(false);
                     
        //         } else if (oArea === 'Resource Management') {
        //             this.byId("_IDGenComboBox10").setVisible(false);
        //             this.byId("_IDGenComboBox11").setVisible(false);
        //             this.byId("_IDGenComboBox12").setVisible(false);
        //             this.byId("_IDGenComboBox13").setVisible(false);
        //             this.byId("_IDGenComboBox14").setVisible(false);
        //             this.byId("_IDGenComboBox15").setVisible(false);
        //             this.byId("_IDGenComboBox16").setVisible(false);
        //             this.byId("_IDGenComboBox17").setVisible(false);
        //             this.byId("_IDGenComboBox18").setVisible(false);
        //             this.byId("_IDGenComboBox19").setVisible(false);
        //             this.byId("_IDGenComboBox20").setVisible(false);
        //             this.byId("_IDGenComboBox21").setVisible(false);
        //             this.byId("_IDGenComboBox22").setVisible(false);
        //             this.byId("_IDGenComboBox23").setVisible(false);
        //             this.byId("_IDGenComboBox24").setVisible(false);
        //             this.byId("_IDGenComboBox25").setVisible(false);
        //             this.byId("_IDGenComboBox26").setVisible(true);

        //     } else {
        //         this.byId("_IDGenComboBox11").setVisible(false);
        //         this.byId("_IDGenComboBox12").setVisible(false);
        //         this.byId("_IDGenComboBox13").setVisible(false);
        //         this.byId("_IDGenComboBox14").setVisible(false);
        //         this.byId("_IDGenComboBox15").setVisible(false);
        //         this.byId("_IDGenComboBox16").setVisible(false);
        //         this.byId("_IDGenComboBox17").setVisible(false);
        //         this.byId("_IDGenComboBox18").setVisible(false);
        //         this.byId("_IDGenComboBox19").setVisible(false);
        //         this.byId("_IDGenComboBox20").setVisible(false);
        //         this.byId("_IDGenComboBox21").setVisible(false);
        //         this.byId("_IDGenComboBox22").setVisible(false);
        //         this.byId("_IDGenComboBox23").setVisible(false);
        //         this.byId("_IDGenComboBox24").setVisible(false);
        //         this.byId("_IDGenComboBox25").setVisible(false);
        //         this.byId("_IDGenComboBox26").setVisible(false);
        //         this.byId("_IDGenComboBox10").setVisible(true);
        //     }
        // },
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
        // _fetchUniqueProcessAreas: function (){
        //     var oModel = this.getOwnerComponent().getModel();
        //     oModel.read("/ProcessAreaSet", {
        //         success: function (oData) {
        //             var aProcessAreas = oData.results;
        //             var uniqueProcessAreasSet = new Set();
       
        //             // Add unique Processarea values to the Set
        //             aProcessAreas.forEach(function (item) {
        //                 uniqueProcessAreasSet.add(item.Processarea);
        //             });
       
        //             // Convert the Set back to an array for the JSON model
        //             var aUniqueProcessAreas = Array.from(uniqueProcessAreasSet).map(function (area) {
        //                 return { Processarea: area };
        //             });
       
        //             var oUniqueModel = new sap.ui.model.json.JSONModel({
        //                 ProcessAreas: aUniqueProcessAreas
        //             });
       
        //            var oMultiComboBox = this.byId("_IDGenComboBox1");
        //             // if (!oMultiComboBox) {
        //             //     // If it's inside a fragment, use Fragment.byId
        //             //     oMultiComboBox = sap.ui.core.Fragment.byId("fragmentId", "AreaSelect");
        //             // }
        //             if (oMultiComboBox) {
        //                 oMultiComboBox.setModel(oUniqueModel);
        //                 oMultiComboBox.bindItems({
        //                     path: "/ProcessAreas",
        //                     template: new sap.ui.core.Item({
        //                         key: "{Processarea}",
        //                         text: "{Processarea}"
        //                     })
        //                 });
        //             } else {
        //                 console.error("MultiComboBox with id 'AreaSelect' not found.");
        //             }
        //         }.bind(this),
        //         error: function (oError) {
        //             console.error("Error reading AreaSet:", oError);
        //         }
        //     });
        // },
        _fetchUniqueProcessAreas: function (){
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("/ProcessAreaSet", {
                success: function (oData) {
                    var aProcessAreas = oData.results;
                    var uniqueProcessAreasSet = new Set();
       
                    // Add unique Processarea values to the Set
                    aProcessAreas.forEach(function (item) {
                        uniqueProcessAreasSet.add(item.Processarea);
                    });
       
                    // Convert the Set back to an array for the JSON model
                    var aUniqueProcessAreas = Array.from(uniqueProcessAreasSet).map(function (area) {
                        return { Processarea: area };
                    });
       
                    var oUniqueModel = new sap.ui.model.json.JSONModel({
                        ProcessAreas: aUniqueProcessAreas
                    });
       
                   var oMultiComboBox = this.byId("AreaSelect");
                    if (!oMultiComboBox) {
                        // If it's inside a fragment, use Fragment.byId
                        oMultiComboBox = sap.ui.core.Fragment.byId("fragmentId", "AreaSelect");
                    }
                    if (oMultiComboBox) {
                        oMultiComboBox.setModel(oUniqueModel);
                        oMultiComboBox.bindItems({
                            path: "/ProcessAreas",
                            template: new sap.ui.core.Item({
                                key: "{Processarea}",
                                text: "{Processarea}"
                            })
                        });
                    } else {
                        console.error("MultiComboBox with id 'AreaSelect' not found.");
                    }
                }.bind(this),
                error: function (oError) {
                    console.error("Error reading AreaSet:", oError);
                }
            });
        },
        // onCheckBoxSelect: function () {
        //     var that =this;
        //     // Get the MultiComboBox instance for the Process Area
        //     var oMultiComboBox = this.byId("_IDGenComboBox1");

        //     // Retrieve the selected items
        //     var aSelectedItems = oMultiComboBox.getSelectedItem();

        //     // Initialize an array to hold the filters
        //     var aFilters = [];

        //     // // Iterate over the selected items to add corresponding filters
        //     // aSelectedItems.forEach(function (oItem) {
        //     //     var sKey = oItem.getText(); // Get the key (e.g., "Inbound", "Outbound", "Internal")

        //     //     // Add filter for the selected process area
        //     //     aFilters.push(new sap.ui.model.Filter("Processarea", sap.ui.model.FilterOperator.EQ, sKey));
        //     // });

        //     // // Combine the filters with an OR condition
        //     var sKey = aSelectedItems.getText(); // Get the key (e.g., "Inbound", "Outbound", "Internal")

        //        // Add filter for the selected process area
        //       aFilters.push(new sap.ui.model.Filter("Processarea", sap.ui.model.FilterOperator.EQ, sKey));
        //     var oCombinedFilter = new sap.ui.model.Filter({
        //         filters: aFilters,
        //         and: false // This specifies the OR condition
        //     });

        //     // Get the Group MultiComboBox and apply the filters
        //     var oGroupMultiComboBox = this.byId("_IDGenComboBox2");
        //     // Fetch data from the model with applied filters
        //     var oModel = this.getOwnerComponent().getModel();
        //     oModel.read("/ProcessAreaSet", {
        //          filters: [oCombinedFilter],
        //         success: function (oData) {
        //             // Process data to remove duplicates
        //             var aUniqueItems = new Set();
        //             var oProcessGroups = {};

        //             oData.results.forEach(function(items){
        //                 if(sKey ===items.Processarea){
        //                     aUniqueItems.add(items.Processgroup)
        //                 }
        //             })
                   
        //             console.log(aUniqueItems)
        //             var aUniqueItemsArray = Array.from(aUniqueItems).map(function (group) {
        //                 return { Processgroup: group };
        //             });
        //             console.log(aUniqueItemsArray)
        //             var oUniqueModel = new sap.ui.model.json.JSONModel({
        //                 ProcessGroups: aUniqueItemsArray
        //             });
        //             console.log(oUniqueModel.ProcessGroups)
       
        //            var oMultiComboBox = that.getView().byId("_IDGenComboBox2");
        //             // if (!oMultiComboBox) {
        //             //     // If it's inside a fragment, use Fragment.byId
        //             //     oMultiComboBox = sap.ui.core.Fragment.byId("fragmentId", "AreaSelect");
        //             // }
        //             if (oMultiComboBox) {
        //                 oMultiComboBox.setModel(oUniqueModel);
        //                 oMultiComboBox.bindItems({
        //                     path: "/ProcessGroups",
        //                     template: new sap.ui.core.Item({
        //                         key: "{Processgroup}",
        //                         text: "{Processgroup}"
        //                     })
        //                 });
        //             } else {
        //                 console.error("MultiComboBox with id 'AreaSelect' not found.");
        //             }

        //             // Iterate over fetched data
        //             // oData.results.forEach(function (oItem) {
        //             //     var sGroup = oItem.Processgroup;

        //             //     // Add to unique items if not already present
        //             //     if (!oProcessGroups[sGroup]) {
        //             //         oProcessGroups[sGroup] = true;
        //             //         aUniqueItems.push({
        //             //             key: sGroup,
        //             //             text: sGroup
        //             //         });
        //             //     }
        //             // });

        //             // // Clear existing items in the MultiComboBox
        //             // oGroupMultiComboBox.removeAllItems();

        //             // // Add the unique items to the MultiComboBox
        //             // aUniqueItems.forEach(function (oItem) {
        //             //     oGroupMultiComboBox.addItem(new sap.ui.core.Item({
        //             //         key: oItem.key,
        //             //         text: oItem.text
        //             //     }));
        //             // });

        //             // // Make sure the Group MultiComboBox is visible
        //             // oGroupMultiComboBox.setVisible(true);
        //         },
        //         error: function (oError) {
        //             // Handle error if necessary
        //             sap.m.MessageToast.show("Failed to fetch data.");
        //         }
        //     });
        // },
        onCheckBoxSelect: function () {
            debugger
            // Get the MultiComboBox instance for the Process Area
            var oMultiComboBox = this.byId("AreaSelect");

            // Retrieve the selected items
            var aSelectedItems = oMultiComboBox.getSelectedItems();

            // Initialize an array to hold the filters
            var aFilters = [];

            // Iterate over the selected items to add corresponding filters
            aSelectedItems.forEach(function (oItem) {
                var sKey = oItem.getText(); // Get the key (e.g., "Inbound", "Outbound", "Internal")

                // Add filter for the selected process area
                aFilters.push(new sap.ui.model.Filter("Processarea", sap.ui.model.FilterOperator.EQ, sKey));
            });

            // Combine the filters with an OR condition
            var oCombinedFilter = new sap.ui.model.Filter({
                filters: aFilters,
                and: false // This specifies the OR condition
            });

            // Get the Group MultiComboBox and apply the filters
            var oGroupMultiComboBox = this.byId("GroupSelect");
            // Fetch data from the model with applied filters
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("/ProcessAreaSet", {
                filters: [oCombinedFilter],
                success: function (oData) {
                    // Process data to remove duplicates
                    var aUniqueItems = [];
                    var oProcessGroups = {};

                    // Iterate over fetched data
                    oData.results.forEach(function (oItem) {
                        var sGroup = oItem.Processgroup;

                        // Add to unique items if not already present
                        if (!oProcessGroups[sGroup]) {
                            oProcessGroups[sGroup] = true;
                            aUniqueItems.push({
                                key: sGroup,
                                text: sGroup
                            });
                        }
                    });
                

                    // Clear existing items in the MultiComboBox
                    oGroupMultiComboBox.removeAllItems();

                    // Add the unique items to the MultiComboBox
                    aUniqueItems.forEach(function (oItem) {
                        oGroupMultiComboBox.addItem(new sap.ui.core.Item({
                            key: oItem.key,
                            text: oItem.text
                        }));
                    });

                    // Make sure the Group MultiComboBox is visible
                    oGroupMultiComboBox.setVisible(true);
                },
                error: function (oError) {
                    // Handle error if necessary
                    sap.m.MessageToast.show("Failed to fetch data.");
                }
            });
        },
        onPressCreateArea : function() {
            this.getView().byId("page1").setVisible(false);
            this.getView().byId("_IDGenTswfd_able1").setVisible(true);
        },
        onCheckBoxSelectGroup: function () {
            debugger;
        
            // Get the MultiComboBox instances for Area and Group
            var oAreaMultiComboBox = this.byId("AreaSelect");
            var oGroupMultiComboBox = this.byId("GroupSelect");
            var oQueueMultiComboBox = this.byId("_IDGenComboBox10");
        
            // Retrieve the selected items
            var aSelectedAreas = oAreaMultiComboBox.getSelectedItems();
            var aSelectedGroups = oGroupMultiComboBox.getSelectedItems();
        
            // Initialize an array to hold the filters
            var aFilters = [];
        
            // Iterate over the selected groups to add corresponding filters
            aSelectedGroups.forEach(function (oItem) {
                var sGroupKey = oItem.getText(); // Get the key (e.g., "Inbound", "Outbound", "Internal")
        
                // Add filter for the selected process group
                aFilters.push(new sap.ui.model.Filter("Processgroup", sap.ui.model.FilterOperator.EQ, sGroupKey));
            });
        
            // Combine the filters with an OR condition
            var oCombinedFilter = new sap.ui.model.Filter({
                filters: aFilters,
                and: false // This specifies the OR condition
            });
        
            // Fetch data from the model with applied filters
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("/ProcessAreaSet", {
                filters: [oCombinedFilter],
                success: function (oData) {
                    // Process data to remove duplicates and ensure matching with selected areas
                    var aUniqueItems = [];
                    var oQueues = {};
                    var oAreaGroupMap = {};
        
                    // Iterate over fetched data
                    oData.results.forEach(function (oItem) {
                        var sQueue = oItem.Queue;
                        var sArea = oItem.Processarea;
                        var sGroup = oItem.Processgroup;
        
                        // Build a map of area-group-queue relations
                        if (!oAreaGroupMap[sArea]) {
                            oAreaGroupMap[sArea] = {};
                        }
                        if (!oAreaGroupMap[sArea][sGroup]) {
                            oAreaGroupMap[sArea][sGroup] = [];
                        }
                        oAreaGroupMap[sArea][sGroup].push(sQueue);
        
                        // Add to unique items if not already present
                        if (!oQueues[sQueue]) {
                            oQueues[sQueue] = true;
                            aUniqueItems.push({
                                key: sQueue,
                                text: sQueue
                            });
                        }
                    });
        
                    // Validate that the Group selection matches the Area selections
                    var isValid = true;
                    aSelectedAreas.forEach(function (oAreaItem) {
                        var sAreaKey = oAreaItem.getText();
                        var bGroupMatched = aSelectedGroups.some(function (oGroupItem) {
                            var sGroupKey = oGroupItem.getText();
                            return oAreaGroupMap[sAreaKey] && oAreaGroupMap[sAreaKey][sGroupKey];
                        });
        
                        if (!bGroupMatched) {
                            isValid = false;
        
                            // Set the value state to Error for Group MultiComboBox
                            oGroupMultiComboBox.setValueState("Error");
                            oGroupMultiComboBox.setValueStateText("Please select at least one group related to the selected areas.");
        
                            // Show error message
                            sap.m.MessageToast.show("Please select at least one group related to the selected areas.");
                        }
                    });
        
                    if (!isValid) {
                        oQueueMultiComboBox.removeAllItems(); // Clear Queue items if validation fails
                        return;
                    }
        
                    // Reset value state to None if validation is successful
                    oGroupMultiComboBox.setValueState("None");
        
                    // Clear existing items in the Queue MultiComboBox
                    oQueueMultiComboBox.removeAllItems();
        
                    // Add the unique items to the Queue MultiComboBox
                    aUniqueItems.forEach(function (oItem) {
                        oQueueMultiComboBox.addItem(new sap.ui.core.Item({
                            key: oItem.key,
                            text: oItem.text
                        }));
                    });
        
                    // Make sure the Queue MultiComboBox is visible
                    oQueueMultiComboBox.setVisible(true);
                },
                error: function (oError) {
                    // Handle error if necessary
                    sap.m.MessageToast.show("Failed to fetch data.");
                }
            });
        },
        onCheckBoxSelectQueue: function () {
            debugger;
        
            // Get the MultiComboBox instances for Group and Queue
            var oGroupMultiComboBox = this.byId("GroupSelect");
            var oQueueMultiComboBox = this.byId("_IDGenComboBox10");
        
            // Retrieve the selected items
            var aSelectedGroups = oGroupMultiComboBox.getSelectedItems();
            var aSelectedQueues = oQueueMultiComboBox.getSelectedItems();
        
            // Initialize an array to hold the filters
            var aFilters = [];
        
            // Iterate over the selected queues to add corresponding filters
            aSelectedQueues.forEach(function (oItem) {
                var sQueueKey = oItem.getText(); // Get the key (e.g., "Queue1", "Queue2", etc.)
        
                // Add filter for the selected process queue
                aFilters.push(new sap.ui.model.Filter("Queue", sap.ui.model.FilterOperator.EQ, sQueueKey));
            });
        
            // Combine the filters with an OR condition
            var oCombinedFilter = new sap.ui.model.Filter({
                filters: aFilters,
                and: false // This specifies the OR condition
            });
        
            // Fetch data from the model with applied filters
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("/ProcessAreaSet", {
                filters: [oCombinedFilter],
                success: function (oData) {
                    // Process data to ensure matching with selected groups
                    var oGroupQueueMap = {};
                    var isValid = true;
        
                    // Build a map of group-queue relations
                    oData.results.forEach(function (oItem) {
                        var sGroup = oItem.Processgroup;
                        var sQueue = oItem.Queue;
        
                        if (!oGroupQueueMap[sGroup]) {
                            oGroupQueueMap[sGroup] = [];
                        }
                        oGroupQueueMap[sGroup].push(sQueue);
                    });
        
                    // Validate that the Queue selection matches the Group selections
                    aSelectedGroups.forEach(function (oGroupItem) {
                        var sGroupKey = oGroupItem.getText();
                        var bQueueMatched = aSelectedQueues.some(function (oQueueItem) {
                            var sQueueKey = oQueueItem.getText();
                            return oGroupQueueMap[sGroupKey] && oGroupQueueMap[sGroupKey].includes(sQueueKey);
                        });
        
                        if (!bQueueMatched) {
                            isValid = false;
        
                            // Set the value state to Error for Queue MultiComboBox
                            oQueueMultiComboBox.setValueState("Error");
                            oQueueMultiComboBox.setValueStateText("Please select at least one queue related to the selected groups.");
        
                            // Show error message
                            sap.m.MessageToast.show("Please select at least one queue related to the selected groups.");
                        }
                    });
        
                    if (!isValid) {
                        return;
                    }
        
                    // Reset value state to None if validation is successful
                    oQueueMultiComboBox.setValueState("None");

                },
                error: function (oError) {
                    // Handle error if necessary
                    sap.m.MessageToast.show("Failed to fetch data.");
                }
            });
        },
        
                
        onApprovePress: function () {
            debugger
        var Empid = this.byId("idEmppInput").getValue();
        
            var oNameInput = this.byId("idNameInput");
            var oEmailInput = this.byId("idEmailInput");
            var oPhoneInput = this.byId("idPhoneInput");
            var oResourcetypeInput = this.byId("idRoesurcetypeInput");
            var oAreaSelect = this.byId("AreaSelect");
            var oGroupSelect = this.byId("GroupSelect");
            var oQueueSelect = this.byId("_IDGenComboBox10");
        
            var Name = oNameInput.getValue();
            var email = oEmailInput.getValue();
            var phone = oPhoneInput.getValue();
            var Resourcetype = oResourcetypeInput.getValue();
            var Area = oAreaSelect.getSelectedKeys().join(",");
            var Group = oGroupSelect.getSelectedKeys().join(",");
            var Queue = oQueueSelect.getSelectedKeys().join(",");
        
            var isValid = true;
        
            // Validate Name
            if (!Name) {
                oNameInput.setValueState(sap.ui.core.ValueState.Error);
                oNameInput.setValueStateText("Name is required.");
                isValid = false;
            } else {
                oNameInput.setValueState(sap.ui.core.ValueState.None);
                oNameInput.setValueStateText("");
            }
        
            // Validate Email (optional)
            if (email) {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    oEmailInput.setValueState(sap.ui.core.ValueState.Error);
                    oEmailInput.setValueStateText("Invalid email format.");
                    isValid = false;
                } else {
                    oEmailInput.setValueState(sap.ui.core.ValueState.None);
                    oEmailInput.setValueStateText("");
                }
            } else {
                oEmailInput.setValueState(sap.ui.core.ValueState.None);
                oEmailInput.setValueStateText("");
            }
        
            // Validate Phone
            if (!phone) {
                oPhoneInput.setValueState(sap.ui.core.ValueState.Error);
                oPhoneInput.setValueStateText("Phone number is required.");
                isValid = false;
            } else {
                oPhoneInput.setValueState(sap.ui.core.ValueState.None);
                oPhoneInput.setValueStateText("");
            }
        
            // Validate Resourcetype
            if (!Resourcetype) {
                oResourcetypeInput.setValueState(sap.ui.core.ValueState.Error);
                oResourcetypeInput.setValueStateText("Resource type is required.");
                isValid = false;
            } else {
                oResourcetypeInput.setValueState(sap.ui.core.ValueState.None);
                oResourcetypeInput.setValueStateText("");
            }
        
            // Validate Area
            if (Area.length === 0) {
                oAreaSelect.setValueState(sap.ui.core.ValueState.Error);
                oAreaSelect.setValueStateText("At least one area must be selected.");
                isValid = false;
            } else {
                oAreaSelect.setValueState(sap.ui.core.ValueState.None);
                oAreaSelect.setValueStateText("");
            }
        
            // Validate Group
            if (Group.length === 0) {
                oGroupSelect.setValueState(sap.ui.core.ValueState.Error);
                oGroupSelect.setValueStateText("At least one group must be selected.");
                isValid = false;
            } else {
                oGroupSelect.setValueState(sap.ui.core.ValueState.None);
                oGroupSelect.setValueStateText("");
            }
        
            // Validate Queue
            if (Queue.length === 0) {
                oQueueSelect.setValueState(sap.ui.core.ValueState.Error);
                oQueueSelect.setValueStateText("At least one queue must be selected.");
                isValid = false;
            } else {
                oQueueSelect.setValueState(sap.ui.core.ValueState.None);
                oQueueSelect.setValueStateText("");
            }
        
            // Final check
            if (!isValid) {
                sap.m.MessageToast.show("Please correct the errors before proceeding.");
                return;
            }

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
        
             var oExpiryDate = new Date();
                       // Set the expiry date based on the resource type
                    if (Resourcetype === "PermanentEmployee") {
                        oExpiryDate.setFullYear(oExpiryDate.getFullYear() + 1); // 1 year for permanent employees
                    } else if (Resourcetype === "temporaryemployee") {
                        oExpiryDate.setMonth(oExpiryDate.getMonth() + 2); // 2 months for temporary employees
                    }
 
                    var oCurrentDateTime = new Date();
                    var sFormattedCurrentDateTime = this.formatDate(oCurrentDateTime);
                    var sFormattedExpiryDate = this.formatDate(oExpiryDate);
           
                    var oData = {
                        Area : Area,
                        Email : email,
                        Notification : "your request has been Approved",
                        Phonenumber : phone,
                        Queue : Queue,
                        Resourcegroup : Group,
                        Resourceid : Empid,
                        Resourcename : Name,
                        Resourcetype :  Resourcetype,
                        Approveddate: sFormattedCurrentDateTime,
                        Expirydate: sFormattedExpiryDate,
                        Password: oPassword,
                        Status: "true",
                        Loginfirst: true
                    };
                    var oModel = this.getOwnerComponent().getModel(); 
                    oModel.update(`/RESOURCESSet('${Empid}')`, oData, {
                        success: function () {
                            sap.m.MessageToast.show("Password updated successfully!");
                            this.resetForm();
           
                            // Navigate to the user menu after successful password update
                            
                        }.bind(this),
                        error: function () {
                            sap.m.MessageToast.show("Error updating user login status.");
                        }
                    });
        
        },
        formatDate: function (oDate) {
            var sYear = oDate.getFullYear();
            var sMonth = ("0" + (oDate.getMonth() + 1)).slice(-2);
            var sDay = ("0" + oDate.getDate()).slice(-2);
       
            return `${sYear}-${sMonth}-${sDay}`;
        },resetForm: function () {
            // Reset input fields
            this.byId("idEmppInput").setValue("");
            this.byId("idNameInput").setValue("");
            this.byId("idEmailInput").setValue("");
            this.byId("idPhoneInput").setValue("");
            this.byId("idRoesurcetypeInput").setValue("");
            
            // Reset select fields
            this.byId("AreaSelect").setSelectedKeys([]);
            this.byId("GroupSelect").setSelectedKeys([]);
            this.byId("_IDGenComboBox10").setSelectedKeys([]);
            
            // Clear error states
            this.byId("idNameInput").setValueState(sap.ui.core.ValueState.None);
            this.byId("idEmailInput").setValueState(sap.ui.core.ValueState.None);
            this.byId("idPhoneInput").setValueState(sap.ui.core.ValueState.None);
            this.byId("idRoesurcetypeInput").setValueState(sap.ui.core.ValueState.None);
            this.byId("AreaSelect").setValueState(sap.ui.core.ValueState.None);
            this.byId("GroupSelect").setValueState(sap.ui.core.ValueState.None);
            this.byId("_IDGenComboBox10").setValueState(sap.ui.core.ValueState.None);
        
            // Clear any stored errors
            this._queueSelectError = null;
            this._groupSelectError = null;
        },
        

        onEmployeeIdLiveChange: function (oEvent) {
            debugger
            var oInput = oEvent.getSource();
            var Empid = oInput.getValue();
            var oModel = this.getOwnerComponent().getModel();  // Assumes you have set the model to your view
        
            // Check if the Employee ID is exactly 6 characters long
            if (Empid.length !== 6) {
                oInput.setValueState(sap.ui.core.ValueState.Error);
                oInput.setValueStateText("Employee ID must be exactly 6 characters long.");
                this.byId("idNameInput").setEditable(true).setValue("");
                           this.byId("idEmailInput").setEditable(true).setValue("");
                           this.byId("idPhoneInput").setEditable(true).setValue("");
                           this.byId("idRoesurcetypeInput").setEditable(true).setValue("");
                return;  // Exit early if validation fails
            } else {
                oInput.setValueState(sap.ui.core.ValueState.None);  // Clear any previous value state
                oInput.setValueStateText("");
            }
        
            // Create a filter to check if Employee ID exists
            var oFilter = new sap.ui.model.Filter("Resourceid", sap.ui.model.FilterOperator.EQ, Empid);
             var This = this;
            // Read from the OData service
            oModel.read("/RESOURCESSet", {
                filters: [oFilter],
                success: function (oData) {
                    if (oData.results.length > 0) {
                        // Check if the Area property has a value
                        if (oData.results[0].Area) {
                            oInput.setValueState(sap.ui.core.ValueState.Error);
                            oInput.setValueStateText("Employee ID is already approved.");
                        } else {
                            // Employee ID exists but is not approved
                            oInput.setValueState(sap.ui.core.ValueState.Success);
                            oInput.setValueStateText("Employee ID already exists.");
                           var email = oData.results[0].Email;
                           var name  =  oData.results[0].Resourcename;
                           var Phonenumber = oData.results[0].Phonenumber;
                           var RT = oData.results[0].Resourcetype;

                           This.byId("idNameInput").setEditable(false).setValue(name);
                           This.byId("idEmailInput").setEditable(false).setValue(email);
                           This.byId("idPhoneInput").setEditable(false).setValue(Phonenumber);
                           This.byId("idRoesurcetypeInput").setEditable(false).setValue(RT);
                           

                           
                        }
                    } else {
                        // Employee ID does not exist
                        oInput.setValueState(sap.ui.core.ValueState.Success);
                        oInput.setValueStateText("Employee ID is available.");
                    }
                },
                error: function (oError) {
                    oInput.setValueState(sap.ui.core.ValueState.None);
                    sap.m.MessageToast.show("Error fetching data.");
                    console.error("Error: ", oError);
                }
            });
        },
        onAddTilesBtnPress:async function(){
            this.oAddTiles ??= await this.loadFragment({
                name: "com.app.rfscreens.fragments.AddTiles"
            })
            this.oAddTiles.open();
            var oModel = new JSONModel(sap.ui.require.toUrl("com/app/rfscreens/model/datadt.json"));
            this.getView().byId("toolPagee").setModel(oModel);
        },
        onAddTilesClose:async function(){
            this.oAddTiles.close();
        }

        // onPressBackbtn:  function() {
        //     this.getView().byId("page1").setVisible(true);
        //     this.getView().byId("NewProcessAreaPage").setVisible(false);
        // }
      });
    }
  );
  