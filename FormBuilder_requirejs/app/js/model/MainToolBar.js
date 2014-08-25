define(function () {
  return {
    "icon_path": 'asserts/icons/32px/',
    "items": [{
      "type": "button",
      "id": "new_form",
      "text": "create new form",
      "img": "add_form.png",
      "img_disabled": "add_form_dis.png",
      disabled: true
    }, {
      id: "new_s1",
      type: "separator"
    }, {
      "type": "button",
      "id": "delete_form",
      "text": "delete selected form",
      "img": "delete.png",
      "img_disabled": "delete_dis.png",
      disabled: true
    }, {
      id: "new_s2",
      type: "separator"
    }, {
      "type": "button",
      "id": "print_form_list",
      "text": "print list of form",
      "img": "print.png",
      "img_disabled": "print_dis.png",
      disabled: true
    }]
  }
});