Relation.Data = Relation.Data || (function() {
  var
    data_store = {},
    config = {},
    spouse_contact_id=null;
  return {
    "end_point": {
      "relation_get": "processors/relation.php?act=get",
      "relation_del": "processors/relation.php?act=del",
      "relation_save": "processors/relation.php?act=save",
      "relation_by_zip":"processors/get_data.php?get=relation_by_zip",
      "spouse_contact_id": "processors/get_data.php?act=spouse_contact",
      "relation_type": "processors/get_data.php?get=relation_type",
      "relation_province": "processors/get_data.php?get=relation_province",
      "relation_state": "processors/get_data.php?get=relation_state",
      "relation_county": "processors/get_data.php?get=relation_county",
      "relation_country": "processors/get_data.php?get=relation_country"

    },
    init: function(_config) {
      var self = this;
      config = _config;
      console.log("Init Data Store >>>>>>>>>>>>>>>>>");
      for (var path in self.end_point) {
        self.end_point[path] = config.application_path + self.end_point[path]+"&data_base="+config.data_base;
      }
      
      self._relation_data_store("relation_get", self.end_point.relation_get + "&contact_id=" + config.contact_id);
      // self._relation_type_data_store("relation_type", self.end_point.relation_type);
      // self._relation_province_data_store("relation_province", self.end_point.relation_province);
      // self._relation_state_data_store("relation_state", self.end_point.relation_state);
      // self._relation_county_data_store("relation_county", self.end_point.relation_county);
      // self._relation_country_data_store("relation_country", self.end_point.relation_country);
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
    _relation_data_store: function(_name, _path) {
      var
        self = this,
        cols = [];
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.select=0;
          obj.relation_id = obj.id;
          obj.relation_type_id = obj.RelationTypeID;
          obj.relation_type = obj.RelationType;
          obj.relation_1 = obj.Relation1;
          obj.relation_2 = obj.Relation2;
          obj.city = obj.city;
          obj.state_id = obj.stateId;
          obj.sate_text = obj.StateName;
          obj.zip = (obj.zip == " ")?"":obj.zip;
          obj.county_id = obj.countyId;
          obj.county_text = obj.countyText;
          obj.country_id = obj.countryId;
          obj.country_text = obj.CountryText;
          obj.province_id = obj.RelationProvinceID;
          obj.province_text = obj.RelationProvenceText;
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
          obj.is_mailing_relation = obj.MailingRelation ? "Yes" : "No";
          
        },
        $update:function(obj){
          obj.state_text=(obj.state_text == "Pick a State")?"":obj.state_text;
          obj.county_text=(obj.county_text== "Pick a County")?"":obj.county_text;
          obj.province_text=(obj.province_text == "Pick a Province")?"":obj.province_text;
        }
      });
    },
    _relation_type_data_store: function(_name, _path) {
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.value = obj.id;
          obj.text = obj.RelationType;
        }
      });
    },
    _relation_province_data_store: function(_name, _path) {
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.value = obj.id;
          obj.text = obj.RelationProvinceText;
        }
      });
    },
    _relation_state_data_store: function(_name, _path) {
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.value = obj.id;
          obj.text = obj.StateName;
        }
      });
    },
    _relation_county_data_store: function(_name, _path) {
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.value = obj.id;
          obj.text = obj.CountyText;
        }
      });
    },
    _relation_country_data_store: function(_name, _path) {
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
    _spouse_relation_data_store:function(_contact_id){
      var self=this;
      this._relation_data_store("spouse_contacts", self.end_point.relation_get + "&contact_id=" + _contact_id);
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
            self.Data._relation_data_store('spouse_contacts',json.spouse_contact_id);
            if(_callback) _callback(spouse_contact_id);
          }
        });
      }else{
         if(_callback) _callback(spouse_contact_id);
      }
    }
  }
}());