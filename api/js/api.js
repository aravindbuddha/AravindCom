var MAP = (function() {
  var
    appId = "",
    appName = "MAP API Javascript client",
    version = 'v1.0',
    apiURL = "https://perltest.myadoptionportal.com/",
    token = "-",
    database = "",
    agency_id = 0,
    date_expiration = 0,
    user = "nobody",
    auth_status = "disconnected",
    request = null,
    isXDR = false,
    url = window.location.href,
    arr = url.split("/"),
    origin = arr[0] + "//" + arr[2],
    xhr = null;
  return {
    init: function(conf) {
      appId = conf.appId;
      version = conf.version;
    },
    /*

     //Calling api via get type of method
    	MAP.api({
       resource:"agency",
       method:"get",//enum{get,post,put,delete} Default:get
       component:"grid",enum{Grid,Tree,TreeGrid,DataView,Chart,form}
       payload: "columns=agency_id,agency_name&order=" + JSON.stringify({
          direction: 'ASC',
          orderby: 'agency_name'
        }),      
       callback:function(response){
          
      });
     */
    api: function(c) {
      var
        url = c.resouce,
        method = c.method ? c.method.toLowerCase() : "get",
        params = c.payload ? c.payload : null;

      if (method === "get") {
        this.get(url, c.callback);
      } else if (method === "post") {
        this.post(url, method, params, callback);
      } else if (method === "put") {
        this.put(url, method, params, callback);
      } else if (method === "delete") {
        this.del(url, method, params, callback);
      } else {
        this.log("Invalid method only enum{'get','post','put','delete'} allowed");
      }
    },
    get: function(url, callback) {
      var params = {
        "action": "fetch"
      };
      this.ajax(url, "get", params, callback);
    },
    post: function(url, method, params, callback) {
      params.action = "insert";
      this.ajax(url, "post", params, callback);
    },
    put: function(url, method, params, callback) {
      params.action = "update";
      this.ajax(url, "post", params, callback);
    },
    del: function(url, method, params, callback) {
      params.action = "delete";
      this.ajax(url, "post", params, callback);
    },
    ajax: function(url, method, params, callback) {
      var self = this,
        xhr = this.createXHR();
      params = this.json2Qs(params);
      if (method === "get") {
        url = url + "?" + qs;
        params = null;
      }
      xhr.open(method, url, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          if (xhr.status === 200) {
            if (callback) {
              callback(xhr.responseText);
            }
          } else if (xhr.status === 404) {
            if (callback) {
              self.log("404 Page not found");
              callback({
                "error": 404
              });
            }
          }
        }
      }
      xhr.send(params);
    },
    //Return Cross browser XHR object
    createXHR: function() {
      var
        self = this,
        xhr = false,
        XMLHttpFactories = [

          function() {
            return new XMLHttpRequest()
          },
          function() {
            return new ActiveXObject("Msxml2.XMLHTTP")
          },
          function() {
            return new ActiveXObject("Msxml3.XMLHTTP")
          },
          function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
          }
        ];
      for (var i = 0; i < self.XMLHttpFactories.length; i++) {
        try {
          xhr = self.XMLHttpFactories[i]();
        } catch (e) {
          continue;
        }
        break;
      }
      //check if xhr create or not
      if (!xhr) {
        console.log("Ooops! Unable to create ajax object!!!!");
      } else {
        return xhr;
      }
    },
    log: function(msg) {
      console.log(">>>>>>>>>>>>>> " + msg);
    },
    json2Qs: function(params) {
      qs = '';
      for (key in params) {
        qs += key + '=' + params[key] + '&';
      }
      return qs = qs.slice(0, qs.length - 1);
    }
  }
});