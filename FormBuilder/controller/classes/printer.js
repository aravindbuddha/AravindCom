FormBuilder.printer = FormBuilder.printer || (function () {
	return {
		/**
		 * Description
		 * @method _window_print
		 * @param {} uid
		 * @return
		 */
		_window_print: function (uid) {
			var that = FormBuilder;
			if (that.window_manager === null)
				that._window_manager();
	
			if (that.window_manager.isWindow(that.appName + "_print_" + uid)) {
				that.window_print[uid].show();
				that.window_print[uid].bringToTop();
				//that.window_print[ uid ].centerOnScreen();
				return;
			}
	
			that.window_print[uid] = that.window_manager.createWindow(that.appName + "_print_" + uid, that.model.conf_window.left + 10, that.model.conf_window.top + 10, that.model.conf_window_print.width, that.model.conf_window_print.height);
			that.window_print[uid].setText(that.model.conf_window_print.title);
			that.window_print[uid].setIcon(that.model.conf_window_print.icon, that.model.conf_window_print.icon_dis);
			//that.window_print[ uid ].centerOnScreen();
			that.window_print[uid].denyPark();
	
			that.window_print[uid].attachEvent("onClose", function (win) {
				win.hide();
				//that.close_window( uid );
			});
	
			that._toolbar_print(uid);
	
			that.window_print[uid].attachStatusBar();
	
		}		
			
	}; // end return
 
})();