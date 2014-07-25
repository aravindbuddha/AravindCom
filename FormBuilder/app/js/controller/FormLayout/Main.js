define([
    'Common',
    'model/MainWindowFormLayout',
    'controller/FormLayout/Pages',
    'controller/FormLayout/FieldsOfPage',
    'controller/FormLayout/LibraryFields'
  ],
  function (Common, FormLayout, Pages, FieldsOfPage, LibraryFields) {
    var
    $layout = {},
      $tabbar = {},
      $toolbar = {},
      $statusBar = {},
      $grid = {};
    return {
      init: function (uid, maintabbar, form_id) {
        $tabbar[uid] = maintabbar;
        this.layoutFormLayout(uid);
        this.layoutFormLayoutLeft(uid);
        this.layoutFormLayoutRight(uid);
        Pages.init(uid, form_id, $layout['layout_form_layout_left'].cells("a"));
        FieldsOfPage.init(uid, form_id, $layout['layout_form_layout_left'].cells("b"));
        LibraryFields.init(uid, form_id, $layout['layout_form_layout_right'].cells("a"));
      },
      layoutFormLayout: function (uid) {
        $layout['layout_form_layout'] = $tabbar[uid].cells("form_layout").attachLayout(FormLayout.conf_layout_form_layout.pattern);
        $layout['layout_form_layout'].cells("a").setWidth(660);
      },
      layoutFormLayoutLeft: function (uid) {
        $layout['layout_form_layout_left'] = $layout['layout_form_layout'].cells("a").attachLayout(FormLayout.conf_layout_form_layout_left.pattern);
        $layout['layout_form_layout_left'].cells("a").setText("Pages of the form");
        $layout['layout_form_layout_left'].cells("b").setText("Fields of the page");
        $layout['layout_form_layout_left'].cells("b").setHeight(330);
        $statusBar['layout_form_layout_left_a'] = $layout['layout_form_layout_left'].cells("a").attachStatusBar();
        $statusBar['layout_form_layout_left_a'].setText("<div class='red_warning'> <img src ='" + FormLayout.icon_path + "warning4.png'> 1 - Select a page on the above grid first before adding fields.</div><div class='normal_warning' id='page_info_" + uid + "'></div>");
        $statusBar['layout_form_layout_left_b'] = $layout['layout_form_layout_left'].cells("b").attachStatusBar();
        $statusBar['layout_form_layout_left_b'].setText("<div class='red_warning'> <img src ='" + FormLayout.icon_path + "warning4.png'> 2 - Drop pre defined fields, library fields, group of fields, or create a custom field on the above grid.</div>");
      },
      layoutFormLayoutRight: function (uid) {
        var self = this;
        $layout['layout_form_layout_right'] = $layout['layout_form_layout'].cells("b").attachLayout(FormLayout.conf_layout_form_layout_right.pattern);
        $layout['layout_form_layout_right'].cells("a").setText("Library fields");
        //self.layout_form_layout_right[ uid ].cells("b").setText("Group of fields");   
      },

    }
  }
);