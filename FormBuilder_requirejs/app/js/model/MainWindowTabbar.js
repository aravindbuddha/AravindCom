define(function () {
  return {
    conf_tabs: {
      tabs: [{
          id: "form_properties",
          text: "Form properties",
          width: "200px",
          active: true
        }, {
          id: "form_layout",
          text: "Form layout",
          width: "200px",
        }, {
          id: "form_preview",
          text: "Preview",
          width: "200px",
        } // tab w/o close button
      ]
    },
    conf_grid_pages: {
      "headers": "Page name,Layout,Tab width,Order",
      "ids": "pagename,page_layout,tab_width,index",
      "widths": "300,120,90,90",
      "colaligns": "left,right,right,right",
      "coltypes": "ed,coro,ro,ro",
      "colsorting": "str,str,int,int",
      "bind_library_field": "false,false,false,false"
    },

    conf_layout_form_layout: {
      "pattern": "2U"
    },

    conf_layout_form_layout_left: {
      "pattern": "2E"
    },

    conf_layout_form_layout_right: {
      "pattern": "1C"
    },


  }
});