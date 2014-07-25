define(function () {
  var $uid = 0,
    $agency_id;
  return {
    data_store: {},
    init: function (uid, agency_id, callBack) {
      this.loadData(uid, agency_id, callBack);
    },
    loadData: function (uid, agency_id, callBack) {
      var self = this;
      $uid = uid;
      $agency_id = agency_id;
      var self = this,
        dataStores = [

          function (callBack) {
            CAIRS.MAP.API.get({
              resource: "/agency/" + $agency_id + "" // mandatory
              ,
              format: "json" // json, yaml, xml. Default: json. Not mandatory
              ,
              payload: "columns=agency_id,user_id,agency_name,address_line_1,address_line_2,city,state,zip,country,website,phone,fax,email_id,logo&order=" + JSON.stringify({
                direction: 'ASC',
                orderby: 'agency_name'
              }),
              onSuccess: function (request) { // not mandatory
                self.success(request, "agency_data", callBack);
              },
              onFail: function (request) {
                alert("hi");
                self.fail(request);
              }
            });
          },
          function (callBack) {
            CAIRS.MAP.API.get({
              resource: "/agencies" // mandatory
              ,
              format: "json" // json, yaml, xml. Default: json. Not mandatory
              ,
              payload: "columns=agency_id,agency_name&order=" + JSON.stringify({
                direction: 'ASC',
                orderby: 'agency_name'
              }),
              onSuccess: function (request) { // not mandatory
                self.success(request, "agencies", callBack);
              },
              onFail: function (request) {
                self.fail(request);
              }
            });
          },
          function (callBack) {
            CAIRS.MAP.API.get({
              resource: "/agency/" + $agency_id + "/caseworkers" // mandatory
              ,
              format: "json" // json, yaml, xml. Default: json. Not mandatory
              ,
              payload: "columns=user_id,first_name,last_name&order=" + JSON.stringify({
                direction: 'ASC',
                orderby: 'first_name'
              }),
              /**
               * Description
               * @method onSuccess
               * @param {} request
               * @return
               */
              onSuccess: function (request) { // not mandatory
                var json = eval('(' + request.response + ')');
                if (json.status == "success") {
                  self.data_store["caseworkers_names"] = [];
                  json.caseworkers.forEach(function (caseworker, index, array_) {
                    self.data_store["caseworkers_names"].push({
                      value: caseworker.user_id,
                      text: caseworker.first_name + " " + caseworker.last_name
                    });
                  });

                  //self.data_store[ uid ][ "caseworkers_names" ] = json.caseworkers;

                  if (callBack) callBack();
                } else {
                  dhtmlx.message({
                    type: "error",
                    text: json.response
                  });
                }
              },
              onFail: function (request) { // not mandatory
                self.fail(request);
              }
            });
          }
        ];
      this.store(dataStores, callBack);
    },
    store: function (dataStores, callBack) {
      var self = this;
      if (dataStores.length > 0) {
        var dataStore = dataStores[0];
        dataStores.splice(0, 1);
        dataStore(function () {
          self.store(dataStores, callBack);
        });
      } else {
        if (callBack) {
          callBack();
        }
      }
    },
    success: function (request, type, callBack) {
      var json = eval('(' + request.response + ')');
      if (json.status == "success") {
        this.data_store[type] = json.hash || json.agencies;
        if (callBack) callBack();
      } else {
        dhtmlx.message({
          type: "error",
          text: json.response
        });
      }
    },
    fail: function (request) {
      var json = eval('(' + request.response + ')');
      dhtmlx.message({
        type: "error",
        text: json.response
      });
    },
    //Pages Codes
    page: {
      create: function (data) {

      }
    }
  }
});