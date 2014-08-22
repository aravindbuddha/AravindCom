Relation.Data = Relation.Data || (function() {
  var
    data_store = {},
    config = {},
    spouse_contact_id = null;
  return {
    "end_point": {
      "relation_get": "processors/relation.php?act=get",
      "relation_del": "processors/relation.php?act=del",
      "relation_save": "processors/relation.php?act=save",
      "get_coup_name": "processors/get_data.php?act=get_coup_name",
      "relation_primary": "processors/get_data.php?act=relation_primary",
      "relation_sub": "processors/get_data.php?act=relation_sub",
    },
    init: function(_config) {
      var self = this;
      config = _config;
      console.log("Init Data Store >>>>>>>>>>>>>>>>>");
      for (var path in self.end_point) {
        self.end_point[path] = config.application_path + self.end_point[path] + "&data_base=" + config.data_base;
      }

      self._relation_data_store("relation_get", self.end_point.relation_get + "&conn_id=" + config.conn_id + "&rel_comp_id=" + config.rel_comp_id);
      self._relation_data_store("relation_primary", self.end_point.relation_primary);
      self._relation_data_store("relation_sub", self.end_point.relation_sub);
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
          obj.relation_id = obj.id;
          obj.rel_contact = obj.RelName;
          obj.primary_relationship_id = obj.RelNameRelationshipSubTypeId;
          obj.primary_relationship = obj.RelationshipSubTypeText;
          obj.relationship_id = obj.RelTypeid1;
          obj.relationship = obj.RelTypeText1;
          obj.contact = obj.PrimaryName;
        },
        $update: function(obj) {

        }
      });
    },
    _relation_primary_data_store: function(_name, _path) {
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.value = obj.id;
          obj.text = obj.RelationshipSubTypeText;
        }
      });
    },
    _relation_sub_data_store: function(_name, _path) {
      this.create_data_store(_name, _path);
      data_store[_name].data.scheme({
        $init: function(obj) {
          obj.value = obj.id;
          obj.text = obj.RelationshipSubTypeText;
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
    _spouse_relation_data_store: function(_contact_id) {
      var self = this;
      this._relation_data_store("spouse_contacts", self.end_point.relation_get + "&contact_id=" + _contact_id);
    },
    _get_spouse_contact_id: function(_contact_id, _callback) {
      var
        self = this,
        data = {
          contact_id: _contact_id
        };
      if (spouse_contact_id === null) {
        dhtmlxAjax.post(self.Data.end_point.spouse_contact_id, "data=" + JSON.stringify(data), function(loader) {
          var json = JSON.parse(loader.xmlDoc.responseText);
          if (json.spouse_contact_id) {
            spouse_contact_id = json.spouse_contact_id;
            self.Data._relation_data_store('spouse_contacts', json.spouse_contact_id);
            if (_callback) _callback(spouse_contact_id);
          }
        });
      } else {
        if (_callback) _callback(spouse_contact_id);
      }
    }
  }
}());