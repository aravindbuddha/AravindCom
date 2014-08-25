emailcomponent.Data = emailcomponent.Data || (function() {
  var
    data_store = {},
    config = {};
  return {
    "end_point": {
      "email_get": "processors/email.php?act=get",
      "email_del": "processors/email.php?act=del",
      "email_save": "processors/email.php?act=save",
      "email_type": "processors/get_data.php?get=email_type",

    },
    init: function(_config) {
      var self = this;
      config = _config;
      console.log("Init Data Store >>>>>>>>>>>>>>>>>");
      for (var path in self.end_point) {
        self.end_point[path] = config.application_path + self.end_point[path]+"&data_base="+config.data_base;
      }
      
      self._email_data_store("email_get", self.end_point.email_get + "&contact_id=" + config.contact_id);
      self._email_type_data_store("email_type", self.end_point.email_type);
      //self._get_spouse_contact_id(config.contact_id);
    },
    store: function(name, url, callback) {
      if (data_store[name] == undefined) {
        this.create_data_store(name, url, callback)
      } else {
        callback ? callback(data_store[name]) : "";
        return data_store[name];
      }
    },
    create_data_store: function(_name, _url, _callback) {
      data_store[_name] = new dhtmlXDataStore({
        url: _url,
        datatype: "json",
        ready: function(data) {
          if (_callback) _callback(this);
        }
      });

    },
    create_schema: function(_name, _cols) {
      data_store[_name].data.scheme({
        $init: function(obj) {
          var i = 0;
          for (var cols in obj) {
            obj[[_cols[i]]] = obj[cols];
            i++;
          }
        }
      });
    },
    _email_data_store: function(_name, _path) {
      var
        self = this,
        cols = [];
        is_mailing_flag=false;
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.select=0;
          //obj.email_id = obj.id;
          obj.contact_id_email = obj.id;
          //obj.contact_id = obj.ContactID;
          obj.email_type_id = obj.EMailTypeID;
          obj.email_type = obj.EMailType;
          obj.contact_email = obj.ContactEMail;
          obj.primary_email = obj.PrimaryEMail ? "Yes" : "No";   
          
        },
        $update:function(obj){

          obj.email_mailing = "No";
          
        }
      });
    },
    _email_type_data_store: function(_name, _path) {
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.value = obj.id;
          obj.text = obj.EmailType;
        }
      });
    }
  }
}());


