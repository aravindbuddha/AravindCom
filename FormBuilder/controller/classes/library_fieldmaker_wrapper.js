FormBuilder.library_fieldmaker_wrapper = FormBuilder.library_fieldmaker_wrapper || (function () {
	return {
		start: function ( uid, username, agency_id, ConnID, ConnectionId, database )
		{
					var LibraryFieldMaker_application_path = self.LibraryFieldMaker_application_url;
					var dhtmlx_codebase_path = self.dhtmlx_codebase_path ;
					var LibraryFieldMaker_filesToLoad = [
						LibraryFieldMaker_application_path + "css/LibraryFieldMaker.css"
						,LibraryFieldMaker_application_path + "model/LibraryFieldMaker_Model.js"
						,LibraryFieldMaker_application_path + "controller/LibraryFieldMaker.js"
						,LibraryFieldMaker_application_path + "model/GroupFieldMaker_Model.js"
						,LibraryFieldMaker_application_path + "model/TagFieldMaker_Model.js"
					];
					// check if parent application already has jquery, if not, lets load it
					if( typeof jQuery === 'undefined' )
					{
						LibraryFieldMaker_filesToLoad.push( "http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js" );
					}
					
					LibraryFieldMaker_filesToLoad.push( LibraryFieldMaker_application_path + "js/jquery.price_format.1.7.min.js" );
					CAIRS.onDemand.load(LibraryFieldMaker_filesToLoad , function()
					{
						LibraryFieldMaker.start( {  
							uid : uid
							,application_path : LibraryFieldMaker_application_path // mandatory 
							,dhtmlx_codebase_path : dhtmlx_codebase_path // mandatory 
							,username : username // mandatory for authenticating via MAP API
							,agency_id : agency_id // mandatory 
							,ConnID : ConnID
							,ConnectionId : ConnectionId
							,agency_database : database
						} );
					});
		}
			
			
	}; // end return
 
})();