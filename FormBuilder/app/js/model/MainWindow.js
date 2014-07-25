define(function () {
  return {
    "conf_window": {
      "image_path": "asserts/icons/",
      "viewport": "body",
      "left": 100,
      "top": 5,
      "width": 1100,
      "height": 550,
      "icon": "form.png",
      "icon_dis": "form.png",
      "css": "fadeIn animated"
    },
    "conf_window_form": {
      title: "Add new form",
      "image_path": "asserts/icons/",
      "viewport": "body",
      "left": 20,
      "top": 5,
      "width": 1300,
      "height": 630,
      "enableAutoViewport": true,
      "icon": "form.png",
      "icon_dis": "form.png"
    },
    "conf_grid_form": {
      "headers": "ID",
      "ids": "id",
      "widths": "90",
      "colaligns": "right",
      "coltypes": "ro",
      "colsorting": "int",
      "bind_library_field": "false"
    },
    "conf_toolbar_form": {
      "icon_path": "asserts/icons/32px/",
      "items": [{
        "type": "button",
        "id": "save_form",
        "text": "save and sync form",
        "img": "save_and_sync.png",
        "img_disabled": "save_and_sync_dis.png",
        disabled: false
      }]
    },
    "conf_toolbar_form_preview": {
      "icon_path": "asserts/icons/32px/",
      "items": [{
        "type": "button",
        "id": "save_form",
        "text": "save form",
        "img": "save.png",
        "img_disabled": "save_dis.png",
        disabled: false
      }, {
        "type": "button",
        "id": "print_form",
        "text": "print form",
        "img": "print.png",
        "img_disabled": "print_dis.png",
        disabled: false
      }]
    },

  }
});