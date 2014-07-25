define([
  'Common',
  'Data',
  'model/MainToolBar',
  'model/MainGrid',
  'controller/MainWindow'
], function(Common, Data, MainToolBar, MainGrid, MainWindow) {
  var
    $layout = {},
    $menu = {},
    $grid = {},
    $form = {},
    $toolbar = {},
    $statusbar = {},
    $config = {};
  return {
    init: function(conf) {
      Config = conf;
      $config = conf;
      CAIRS.init();
      this.buildLayout();
      Common.init($config);
      $layout['mainLayout'].cells('a').progressOn();
      this.callMapApi();
    },
    buildLayout: function() {
      var statusBarHtml = "<div class='main_status_bar'>" +
        "<div id='status_info'>Initializing Form Maker</div>" +
        "<div id='expiration_info' title='time remaining for token expiration' class='expiration_info'></div>" +
        "<div id='user_info'>" +
        "	<img id='user_info_status' src='" + $config.icons_path + "offline.png' />" +
        "	<span>Not authorized yet</span>" +
        "</div>" +
        "<div id='data_transfer_info'> no data transferred</div>" +
        "<div id='socket_info' class='data_transfer_info'>socket: disconnected</div>" +
        "<div id='errors_info'>no errors</div>" +
        "</div>";
      $layout['mainLayout'] = new dhtmlXLayoutObject(document.body, "1C");
      $layout['mainLayout'].cells("a").setText("Form Builder");
      $statusbar['mainStatusBar'] = $layout['mainLayout'].attachStatusBar();
      $statusbar['mainStatusBar'].setText(statusBarHtml);
      $statusbar['pagingStatusBar'] = $layout['mainLayout'].cells("a").attachStatusBar();
      $statusbar['pagingStatusBar'].setText("<div id='recinfoArea'></div>");
      $toolbar['mainToolBar'] = $layout['mainLayout'].cells('a').attachToolbar(MainToolBar);
      $toolbar['mainToolBar'].setIconSize(32);
    },
    mainToolBarEvents: function() {
      var self = this;
      $toolbar['mainToolBar'].attachEvent("onClick", function(id) {
        if (id == "new_form") {
          MainWindow.init($config);
        }
      });
      $toolbar['mainToolBar'].attachEvent("onClick", function(id) {
        if (id == "delete_form") {
          self.deleteForm();
        }
      });
      $toolbar['mainToolBar'].attachEvent("onClick", function(id) {
        if (id == "print_form_list") {
          $grid['mainGrid'].toPDF('processors/dhx_pdf/generate.php');
        }
      });
    },
    callMapApi: function() {
      var self = this;
      CAIRS.MAP.API.authorize({
        username: $config.username,
        database: $config.database,
        agency_id: $config.agency_id,
        onSuccess: function(request) {
          Common._setStatus(
            "Form Maker user is authorized."
          );
          Common._setStatusDataTransfer(
            "credential received");
          Common._setStatusUser(
            "Logged as " + CAIRS.MAP.API.user, true
          );
          CAIRS.MAP.API.showCountDown("expiration_info");
          Data.init($config.uid, $config.agency_id, function() {
            $layout['mainLayout'].cells('a').progressOff();
            self.enableToolBar();
            self.buildMainGrid();
            self.feedGrid();
          });
        }
      });
    },
    enableToolBar: function() {
      $toolbar['mainToolBar'].enableItem('new_form');
      $toolbar['mainToolBar'].enableItem('print_form_list');
    },
    buildMainGrid: function() {
      $grid['mainGrid'] = $layout['mainLayout'].cells("a").attachGrid(MainGrid);
      $grid['mainGrid'].setHeader(MainGrid.headers); //sets the headers of columns
      $grid['mainGrid'].setColumnIds(MainGrid.ids); //sets the columns' ids
      $grid['mainGrid'].setInitWidths(MainGrid.widths); //sets the initial widths of columns
      $grid['mainGrid'].setColAlign(MainGrid.colaligns); //sets the alignment of columns
      $grid['mainGrid'].setColTypes(MainGrid.coltypes); //sets the types of columns
      $grid['mainGrid'].setColSorting(MainGrid.colsorting); //sets the sorting types of columns
      $grid['mainGrid'].selMultiRows = true;
      $grid['mainGrid'].setDateFormat("%m-%d-%Y");
      $grid['mainGrid'].init();
      $grid['mainGrid'].enableHeaderMenu();

      var agencies_combo = $grid['mainGrid'].getCombo($grid['mainGrid'].getColIndexById("form_agency_id"));

      Data.data_store["agencies"].forEach(function(agency, index, array_) {
        agencies_combo.put(agency.agency_id, agency.agency_name);
      });
      $grid['mainGrid'].attachHeader("#rspan,<input id='input_search_formlabel' type='text' style='width: 99%; border:1px solid gray;' onClick='(arguments[0]||window.event).cancelBubble=true;' onKeyUp='FormBuilder._feedGrid()'>,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan,#cspan");
      this.mainGridEvents();
      this.mainToolBarEvents();

      // $grid['mainGrid'].load("data/contacts.php");
      // var mydp = new dataProcessor("data/update.php"); //inits dataProcessor
      // mydp.init($grid['mainGrid']);
    },
    mainGridEvents: function() {
      $grid['mainGrid'].attachEvent("onXLS", function() {
        $toolbar['mainToolBar'].disableItem("print_form_list");
        $layout['mainLayout'].progressOn();
      });
      $grid['mainGrid'].attachEvent("onXLE", function() {
        $toolbar['mainToolBar'].enableItem("print_form_list");
        $layout['mainLayout'].progressOff();
      });

      $grid['mainGrid'].attachEvent("onRowSelect", function(id, ind) {
        $toolbar['mainToolBar'].enableItem("delete_form");
      });


      $grid['mainGrid'].attachEvent("onRowDblClicked", function(id, ind) {
        //self._mountFormBuilderScreen(uid, id);
        MainWindow.init($config, id);
      });

      $grid['mainGrid'].attachEvent("onKeyPress", function(code, cFlag, sFlag) {
        if (code == 46) {
          self._deleteForm();
        }
        return true;
      });

      $grid['mainGrid'].attachEvent("onEnter", function(id, ind) {
        MainWindow.init($config, id);
        //self._mountFormBuilderScreen(uid, id);
        return true;
      });
    },
    feedGrid: function(objOrder) {
      var self = this,
        objFilter = {},
        objOrder = objOrder || {};

      $grid['mainGrid'].clearAll();
      $toolbar['mainToolBar'].disableItem("new_form");
      $toolbar['mainToolBar'].disableItem("delete_form");

      if (document.querySelector("#input_search_formlabel").value != "")
        objFilter["formlabel"] = document.querySelector("#input_search_formlabel").value;


      var gridURL = CAIRS.MAP.API.getMappedURL({
        resource: "/dhtmlx/grid/feed", // mandatory
        responseType: "json", // not mandatory, default json
        params: "table_name=formmaker_properties&primary_key=form_id&columns=" + MainGrid.ids + "&filter=" + JSON.stringify(objFilter) + "&order=" + JSON.stringify(objOrder) // mandatory for this API End Point ( /dhtmlx/grid/feed.json )
      });

      Common._setStatusDataTransfer("requesting forms data", true);
      $grid['mainGrid'].load(gridURL, function() {
        Common._setStatusDataTransfer("forms available");
        //Common.progressOff();
        $toolbar['mainToolBar'].enableItem("new_form");
      }, "json");
    },
    _deleteForm: function() {
      var self = this;
      dhtmlx.message({
        title: "Warning",
        type: "confirm",
        text: "Do you want to delete the selected form?",
        ok: "Delete",
        cancel: "Cancel",
        /**
         * Description
         * @method callback
         * @param {} ok
         * @return
         */
        callback: function(ok) {
          if (ok) {
            CAIRS.MAP.API.del({
              resource: "/forms/" + $grid['mainGrid'].getSelectedRowId() // mandatory
              ,
              format: "json" // json, yaml, xml. Default: json. Not mandatory
              ,
              payload: "agency_id=" + $grid['mainGrid'].getSelectedRowId().agency_id + "" // mandatory for PUT and POST
              ,
              /**
               * Description
               * @method onSuccess
               * @param {} request
               * @return
               */
              onSuccess: function(request) {
                var json = eval('(' + request.response + ')');
                dhtmlx.message({
                  type: "error",
                  text: json.response
                });
                self.feedGrid();
              },
              /**
               * Description
               * @method onFail
               * @param {} request
               * @return
               */
              onFail: function(request) { // not mandatory
                var json = eval('(' + request.response + ')');
                dhtmlx.message({
                  type: "error",
                  text: json.response
                });
              }
            });
          }
        }
      });
    },

  }
});