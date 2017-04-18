define( [
	"angular",
	"qlik",
	"text!./template.html",
	"./properties",
	"./db",
	"./libs/moment",
	"./libs/md5.min",
	"css!./commentaries-writeback.css",
],
function ( angular, qlik, template, props, DB, moment, md5 ) {

	return {
		definition: props,
		template: template,
		support: {
			snapshot: true,
			export: true,
			exportData: false
		},
		initialProperties: {
            version: 1.0,
            showTitles: false
        },
		paint: function ( $element, layout ) {

			this.$scope.updateHeight();

			DB.init({
				apiURL: layout.props.server.apiUrl
			});

			var state = qlik.currApp(this).selectionState(),
				dimensions = layout.qHyperCube.qDimensionInfo.map(function(dim){
					return dim.qGroupFieldDefs[0];
				}),
				selectionFields = [],
				selectionValues = [];

			state.selections.forEach( function(s) {
				if ( dimensions.indexOf(s.fieldName) !== -1 ) {
					selectionFields.push(s.fieldName);
					selectionValues.push(s.qSelected);
				}
			});

			var newAnchor = md5(selectionValues.toString());

			var updateComments = !this.$scope.lastAnchor
				|| !angular.equals(this.$scope.lastAnchor, newAnchor)
					|| this.$scope.apiUrl !== layout.props.server.apiUrl 
						|| this.$scope.sheetId !== layout.props.sheet.id;

			this.$scope.lastAnchor = newAnchor;
			this.$scope.sheetId = layout.props.sheet.id;
			this.$scope.apiUrl = layout.props.server.apiUrl;

			if ( updateComments ) {
				this.$scope.getComments();
			}

			return qlik.Promise.resolve();

		},
		controller: ['$scope', '$element', '$timeout',function ( $scope, $element, $timeout ) {

			var currentUser;

			$scope.disabled = true;
			$scope.edit = false;
			$scope.comment = {};
			$scope.lastAnchor = null;
			$scope.apiUrl = null;
			$scope.sheetId = null;

			qlik.getGlobal().getAuthenticatedUser( function(res){
				currentUser = res.qReturn;
				if ( currentUser.indexOf("UserId") !== -1 ) {
					currentUser = currentUser.split("=")[2];
				}
			} );

			var currentAppId = qlik.currApp(this).id;

			$scope.updateHeight = function() {
				$scope.commentsHeight = $element[0].clientHeight - 70;
			};

			function _getComments(){
				if ( !$scope.lastAnchor || !$scope.sheetId ) {
					return;
				}

				DB.getCommentsBySheet( $scope.sheetId, $scope.lastAnchor ).then(function(res){
					$timeout(function(){
						$scope.comments = res.data.map(function(c){
							c.date = moment(c.created).format("DD/MM/YY, h:mma");
							return c;
						});
					});
					$scope.error = false;
				}, function(err){
					$scope.error = err;
				});
			}

			$scope.$watch('comment.text', function(text){
				$scope.disabled = !text || text.trim() === "";
			});

			$scope.getComments = _getComments;


			$scope.updateCreateComment = function() {
				if ( $scope.comment.text.trim() !== "" ) {

					if ( $scope.comment._id ) {
						DB.updateCreateComment( $scope.comment._id, $scope.comment ).then( function(res) {
							$scope.comment = {};
							$scope.edit = false;
							$scope.error = false;
							_getComments();
						}, function(err){
							$scope.error = err;
						});
					} else {
						var comment = {
							created: new Date(),
							text: $scope.comment.text,
							user: currentUser,
							sheetId: $scope.sheetId,
							anchor: $scope.lastAnchor,
							appId: currentAppId
						};

						DB.createNew( comment ).then( function(res) {
							$scope.comment = {};
							$scope.edit = false;
							_getComments();
						}, function(err){
							$scope.error = err;
						});
					}
				}
			};

			$scope.deleteComment = function( comment ) {
				DB.deleteComment(comment._id).then(function(){
					_getComments();
				});
			};

			$scope.editComment = function( comment ) {
				$scope.comment = angular.copy(comment);
				$scope.edit = true;
			};

			$scope.cancelEdit = function(){
				$scope.comment = {};
				$scope.edit = false;
			}

			_getComments();
			$scope.updateHeight();
		}]

	};

} );

