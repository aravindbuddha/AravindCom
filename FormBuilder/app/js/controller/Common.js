define(function () {
  var
  $icons_path,
    $mainWindow = "";
  return {
    init: function (conf) {
      $icons_path = conf.icons_path;
    },
    setMainWindow: function (mainwindow) {
      $mainWindow = mainwindow;
    },
    progressOn: function () {
      $mainWindow.progressOn();
    },
    progressOff: function () {
      $mainWindow.progressOff();
    },

    _setStatus: function (m) {
      self = this;
      document.getElementById("status_info").innerHTML = m;
    },
    _setStatusForm: function (uid, m) {
      self = this;
      document.getElementById("formbuilder_status_info_" + uid).innerHTML = m;
    },
    _setStatusError: function (m) {
      self = this;
      document.getElementById("errors_info").innerHTML = m;
    },
    _setStatusErrorForm: function (uid, m) {
      self = this;
      document.getElementById("formbuilder_errors_info_" + uid).innerHTML = m;
    },
    _setStatusDataTransfer: function (m, isActive) {
      self = this;
      dhtmlx.message({
        text: m
      });
      if (isActive) {
        document.getElementById("data_transfer_info").innerHTML = m;
        document.getElementById("data_transfer_info").style.backgroundImage = "url(" + $icons_path + "network.gif)";
      } else {
        document.getElementById("data_transfer_info").innerHTML = m;
        document.getElementById("data_transfer_info").style.backgroundImage = "url(" + $icons_path + "network-accept.png)";
      }
    },
    _setStatusSocket: function (m, isOffline) {
      self = this;
      dhtmlx.message({
        text: m
      });
      document.getElementById("socket_info").innerHTML = "socket: " + m;
      document.getElementById("socket_info").style.backgroundImage = "url(" + $icons_path + "socket.gif)";
      if (isOffline)
        document.getElementById("socket_info").style.backgroundImage = "url(" + $icons_path + "socket_disconnected.png)";
    },
    _setStatusDataTransferForm: function (uid, m, isActive) {
      self = this;
      dhtmlx.message({
        text: m
      });
      if (isActive) {
        document.getElementById("formbuilder_data_transfer_info_" + uid).innerHTML = m;
        document.getElementById("formbuilder_data_transfer_info_" + uid).style.backgroundImage = "url(" + $icons_path + "network.gif)";
      } else {
        document.getElementById("formbuilder_data_transfer_info_" + uid).innerHTML = m;
        document.getElementById("formbuilder_data_transfer_info_" + uid).style.backgroundImage = "url(" + $icons_path + "network-accept.png)";
      }
    },
    _setStatusUser: function (m, ok) {
      self = this;
      if (typeof ok === 'undefined') {
        ok = true;
      }
      document.getElementById("user_info").getElementsByTagName("span")[0].innerHTML = m;
      if (ok) {
        document.getElementById("user_info_status").src = "" + $icons_path + "online.png";
        dhtmlx.message({
          text: m
        });
      } else {
        document.getElementById("user_info_status").src = "" + $icons_path + "offline.png";
        dhtmlx.message({
          type: "error",
          text: m
        });
      }
    },
    _setStatusUserForm: function (uid, m, ok) {
      self = this;
      if (typeof ok === 'undefined') {
        ok = true;
      }
      document.getElementById("formbuilder_user_info_" + uid).getElementsByTagName("span")[0].innerHTML = m;
      if (ok) {
        document.getElementById("formbuilder_user_info_status_" + uid).src = "" + $icons_path + "online.png";
        dhtmlx.message({
          text: m
        });
      } else {
        document.getElementById("formbuilder_user_info_status_" + uid).src = "" + $icons_path + "offline.png";
        dhtmlx.message({
          type: "error",
          text: m
        });
      }
    },
    handleFormName: function (uid, name, form_id) {
      var self = this,
        form_id = form_id || "";
      try {
        name = name.replace(/ /gi, "_");
        name = name.replace(/[^a-z0-9\_]/gi, '');
        name = name.toLowerCase();

      } catch (e) {
        //console.log(e.stack)
      };
      return "form_" + name;
    }
  }
});