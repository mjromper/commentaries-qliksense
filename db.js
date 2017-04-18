define(["angular"], function(angular) {

	// Get a reference to the $http service
  	var $injector = angular.injector( ['ng'] );
  	var $http = $injector.get( "$http" );

  	var options = {
  		"apiURL": ""
  	};

  	function init( config ) {
  		options.apiURL = config.apiURL || options.apiURL;
  	}


  	function createNew( data ) {
  		// Simple GET request example:
		return $http({
		  method: 'POST',
		  url: options.apiURL+"/comments",
		  data: data
		});
  	}

  	function updateCreateComment( id, data ) {
  		return $http({
		  method: 'POST',
		  url: options.apiURL+"/comments/"+id,
		  data: data
		});
  	}

  	function getCommentsBySheet( sheetId, anchor ) {
  		return $http({
		  method: 'GET',
		  url: options.apiURL+"/comments",
		  params: {
		  	sheetId: sheetId,
		  	anchor: anchor
		  }
		});
  	}

  	function deleteComment( id ) {
  		return $http({
		  method: 'DELETE',
		  url: options.apiURL+"/comments/"+id
		});
  	}

	return {
		init: init,
		updateCreateComment: updateCreateComment,
		createNew: createNew,
		getCommentsBySheet: getCommentsBySheet,
		deleteComment: deleteComment

	}
});