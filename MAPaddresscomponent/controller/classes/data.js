Address.Data = Address.Data || (function() {
  var
    data_store = {},
    config = {};
  return {
    "end_point": {
      "address_get": "processors/address.php?act=get",
      "address_del": "processors/address.php?act=del",
      "address_save": "processors/address.php?act=save",

      "spouse_contact_id": "processors/get_data.php?act=spouse_contact",
      "address_type": "processors/get_data.php?get=address_type",
      "address_provice": "processors/get_data.php?get=address_province",
      "address_state": "processors/get_data.php?get=address_state",
      "address_county": "processors/get_data.php?get=address_county",
      "address_country": "processors/get_data.php?get=address_country"

    },
    init: function(_config) {
      var self = this;
      config = _config;
      console.log("Init Data Store >>>>>>>>>>>>>>>>>");
      for (var path in self.end_point) {
        self.end_point[path] = config.application_path + self.end_point[path];
      }
      self._address_data_store("address_get", self.end_point.address_get + "&contact_id=" + config.contact_id);
      self._address_type_data_store("address_type", self.end_point.address_type);
      self._address_province_data_store("address_province", self.end_point.address_province);
      self._address_state_data_store("address_state", self.end_point.address_state);
      self._address_county_data_store("address_county", self.end_point.address_county);
      self._address_country_data_store("address_country", self.end_point.address_country);
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
        ready: function() {
          if (_callback) _callback(this);
        }
      });
      data_store[_name].attachEvent("onXLE", function() {
        console.log();
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
    _address_data_store: function(_name, _path) {
      var
        self = this,
        cols = [];
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.address_id = obj.id;
          obj.address_type_id = obj.AddressTypeID;
          obj.address_type = obj.AddressType;
          obj.address_1 = obj.Address1;
          obj.address_2 = obj.Address2;
          obj.city = obj.city;
          obj.state_id = obj.stateId;
          obj.sate_text = obj.StateName;
          obj.zip = obj.zip;
          obj.county_id = obj.countyId;
          obj.county_text = obj.countyText;
          obj.country_id = obj.countryId;
          obj.country_text = obj.CountryText;
          obj.province_id = obj.AddressProvinceID;
          obj.province_text = obj.AddressProvenceText;
          obj.start_date = new Date(obj.addstartdate.split(" ").slice(0, 3).join(" "));
          obj.leave_date = new Date(obj.addleavedate.split(" ").slice(0, 3).join(" "));
          obj.is_mailing_address = obj.MailingAddress ? "Yes" : "No";
        }
      });
    },

    _address_type_data_store: function(_name, _path) {
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.value = obj.AddressSequence;
          obj.text = obj.AddressType;
        }
      });
    },
    _address_province_data_store: function(_name, _path) {
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.value = obj.id;
          obj.text = obj.AddressProvinceText;
        }
      });
    },
    _address_state_data_store: function(_name, _path) {
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.value = obj.id;
          obj.text = obj.StateName;
        }
      });
    },
    _address_county_data_store: function(_name, _path) {
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.value = obj.id;
          obj.text = obj.CountyText;
        }
      });
    },
    _address_country_data_store: function(_name, _path) {
      var
        us_id = 0,
        junk_ids = [];
      this.create_data_store(_name, _path, function(obj) {
        junk_ids.forEach(function(_id) {
          data_store[_name].remove(_id);
        });
        data_store[_name].add({
          id: us_id,
          CountryText: "USA",
          value: us_id,
          text: "USA"
        }, 0);
      });
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.value = obj.id;
          obj.text = obj.CountryText;
          if (obj.CountryText == "USA") {
            us_id = obj.id;
            junk_ids.push(obj.id);
          }
          if (obj.CountryText == "-" || obj.CountryText == "" || obj.CountryText == "United States" || obj.CountryText == " ") {
            junk_ids.push(obj.id);
          }
        }
      });
    },

  }
}());