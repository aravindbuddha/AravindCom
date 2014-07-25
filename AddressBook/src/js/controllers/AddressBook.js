define(["Common", "models/MainModel"], function(Common, MainModel) {
  var
    $window_manager = new dhtmlXWindows(),
    $win = {},
    $grid = {},
    $layout = {},
    $toolbar = {};
  return {
    init: function(c) {
      Common.uid = c.uid;
      Common.app_path = c.app_path;
      Common.dhx_path = c.dhx_path;
      Common.icons_path = c.icons_path;
      Common.images_path = c.images_path;
      Common.database = c.database;
      this.mainWindow();
      this.mainLayout();
    },
    mainWindow: function() {
      $win['main'] = $window_manager.createWindow(MainModel.window); //using mainwindow model from Models folder
    },
    mainLayout: function() {
      console.log(Common);
      $layout['main'] = $win['main'].attachLayout(MainModel.layout);
      $layout['main'].cells("a").hideHeader();
      this.mainToolbar($layout['main'].cells("a"));
      this.mainGrid($layout['main'].cells("a"));
    },
    mainToolbar: function(cell) {
      $toolbar['main'] = cell.attachToolbar(MainModel.toolbar);
      $toolbar['main'].setIconsPath(Common.icons_path);
      this.mainToolbarEvents();
    },
    mainGrid: function(cell) {
      $grid['main'] = cell.attachGrid(MainModel.grid);
      $grid['main'].setHeader(MainModel.grid.headers);
      $grid['main'].setColumnIds(MainModel.grid.ids);
      $grid['main'].init();


      var data = new dhtmlXDataStore({
        url: "processors/addressList.php?action11=list11",
        datatype: "json"
      });

      myDP = new dataProcessor("processors/addressList.php");
      myDP.init(data);

      $grid['main'].sync(data);
    },
    mainToolbarEvents: function() {
      var self = this;
      $toolbar['main'].attachEvent('onClick', function(id) {
        if (id === "add_address") {
          self.callAddressForm();
        }
      });
    },
    callAddressForm: function() {
      require(["controllers/AddressForm"], function(AddressForm) {
        AddressForm.init();
      });
    }
  }
});