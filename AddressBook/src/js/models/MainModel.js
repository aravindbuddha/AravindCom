define(["Common"], function(Common) {
  return {
    window: {
      id: "MainWindow",
      width: window.innerWidth / 1.5,
      height: window.innerHeight / 1.2,
      center: true,
      caption: "Address Book",
      modal: true
    },
    layout: {
      pattern: "1C",
      cells: []
    },
    toolbar: {
      "icon_path": "asserts/icons/",
      "items": [{
        "type": "button",
        "id": "add_address",
        "text": "Add Address",
        "img": "address-book-add.png",
        "img_disabled": "address-book-add.png"
      }, {
        "type": "button",
        "id": "edit_address",
        "text": "Edit Address",
        "img": "edit.png",
        "img_disabled": "edit.png"
      }, {
        "type": "button",
        "id": "delete_address",
        "text": "Delete Address",
        "img": "recycle_full-16.png",
        "img_disabled": "recycle_full-16.png"
      }]
    },
    grid: {
      headers: "Type,Address1,Address2,City,State,Zip,Country,County,Province,Mailing Address,Start Date,End Date",
      ids: "AddressType,Address1,Address2,city,StateName,zip,CountyText,CountyText,AddressProvinceText,MailingAddress,addstartdate,addleavedate",
    }
  }
});