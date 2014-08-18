Address.Data = Address.Data || (function() {
  var
    data_store = {},
    config = {},
    spouse_contact_id=null;
  return {
    "end_point": {
      "address_get": "processors/address.php?act=get",
      "address_del": "processors/address.php?act=del",
      "address_save": "processors/address.php?act=save",
      "address_by_zip":"processors/get_data.php?get=address_by_zip",
      "spouse_contact_id": "processors/get_data.php?act=spouse_contact",
      "address_type": "processors/get_data.php?get=address_type",
      "address_province": "processors/get_data.php?get=address_province",
      "address_state": "processors/get_data.php?get=address_state",
      "address_county": "processors/get_data.php?get=address_county",
      "address_country": "processors/get_data.php?get=address_country"

    },
    init: function(_config) {
      var self = this;
      config = _config;
      console.log("Init Data Store >>>>>>>>>>>>>>>>>");
      for (var path in self.end_point) {
        self.end_point[path] = config.application_path + self.end_point[path]+"&data_base="+config.data_base;
      }
      
      self._address_data_store("address_get", self.end_point.address_get + "&contact_id=" + config.contact_id);
      self._address_type_data_store("address_type", self.end_point.address_type);
      self._address_province_data_store("address_province", self.end_point.address_province);
      self._address_state_data_store("address_state", self.end_point.address_state);
      self._address_county_data_store("address_county", self.end_point.address_county);
      self._address_country_data_store("address_country", self.end_point.address_country);
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
    _address_data_store: function(_name, _path) {
      var
        self = this,
        cols = [];
        is_mailing_flag=false;
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.select=0;
          obj.address_id = obj.id;
          obj.address_type_id = obj.AddressTypeID;
          obj.address_type = obj.AddressType;
          obj.address_1 = obj.Address1;
          obj.address_2 = obj.Address2;
          obj.city = obj.city;
          obj.state_id = obj.stateId;
          obj.sate_text = obj.StateName;
          obj.zip = (obj.zip == " ")?"":obj.zip;
          obj.county_id = obj.countyId;
          obj.county_text = obj.countyText;
          obj.country_id = obj.countryId;
          obj.country_text = obj.CountryText;
          obj.province_id = obj.AddressProvinceID;
          obj.province_text = obj.AddressProvenceText;
          obj.start_date=(function(){
            if(obj.addstartdate == null || obj.addstartdate=="Jan 1 1900 12:00AM" || obj.addstartdate == "Jan  1 1900 12:00:00:000AM"){
              return "";
            }else{
              return new Date(obj.addstartdate.split(" ").slice(0, 3).join(" "));
            }

          }());
          obj.leave_date=(function(){
            if(obj.addleavedate == null || obj.addleavedate=="Jan 1 1900 12:00AM" || obj.addleavedate == "Jan  1 1900 12:00:00:000AM"){
              return "";
            }else{
              return new Date(obj.addleavedate.split(" ").slice(0, 3).join(" "));
            }

          }());
          obj.is_mailing_address = obj.MailingAddress ? "Yes" : "No";

          
          
        },
        $update:function(obj){
          obj.state_text=(obj.state_text == "Pick a State")?"":obj.state_text;
          obj.county_text=(obj.county_text== "Pick a County")?"":obj.county_text;
          obj.province_text=(obj.province_text == "Pick a Province")?"":obj.province_text;
          console.log(obj);
        }
      });
    },
    _address_type_data_store: function(_name, _path) {
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.value = obj.id;
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
    _spouse_address_data_store:function(_contact_id){
      var self=this;
      this._address_data_store("spouse_contacts", self.end_point.address_get + "&contact_id=" + _contact_id);
    },
    _get_spouse_contact_id:function(_contact_id,_callback){
      var 
        self=this,
        data = {
          contact_id: _contact_id
        };
      if(spouse_contact_id === null){
        dhtmlxAjax.post(self.Data.end_point.spouse_contact_id,"data=" +JSON.stringify(data), function(loader) {
          var json = JSON.parse(loader.xmlDoc.responseText);
          if (json.spouse_contact_id) {
            spouse_contact_id=json.spouse_contact_id;
            self.Data._address_data_store('spouse_contacts',json.spouse_contact_id);
            if(_callback) _callback(spouse_contact_id);
          }
        });
      }else{
         if(_callback) _callback(spouse_contact_id);
      }
    }
  }
}());