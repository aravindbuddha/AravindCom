define(['Common', 'models/AddressFormModel'], function(Common, AddressFormModel) {
  var
    $window_manager = new dhtmlXWindows(),
    $win = {},
    $grid = {},
    $layout = {},
    $toolbar = {};
  return {
    init: function(d) {
      // d = d || d.title = "Addform";
      this.formWindow(d);
      this.formLayout();
    },
    formWindow: function() {
      $win['address_form'] = $window_manager.createWindow(AddressFormModel.window);
      //$win['address_form'].setTitle("Add Address");
    },
    formLayout: function() {
      $layout['address_layout'] = $win['address_form'].attachLayout(AddressFormModel.layout);
      $layout['address_layout'].cells("a").hideHeader();
      this.formForm($layout['address_layout'].cells("a"));
    },
    formForm: function(cell) {
      cell.attachToolbar(AddressFormModel.toolbar);
      cell.attachForm(AddressFormModel.form.template);
    }
  }
});