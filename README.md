# Commentaries Extension for Qlik Sense

This is an extension for Qlik Sense that enables adding a commentary box to a sheet for users to add commentaries and collaborate in a sort of chat.

IMPORTANT:

This extension needs a server side module that exposes an REST API in order to persist commentaries (https://github.com/mjromper/commentaries-qliksense-server). Please install this module along this this extension.

![](https://github.com/mjromper/commentaries-qliksense/raw/master/img/image1.png)

### Extension configuration

* ***Dimensions***

The set of dimensions to attached the commentaries to (actually the commentaries are linked to the selection values for those dimensions)
* ***Settings***
	* ***Server***: server API URL where the server side is running (usually set this value to ***https://SERVER:8200/api/comments***)
	* ***Sheet***: the sheet Id the commentary box displays in.

### Specification

* Commentaries are linked to the sheet the 'commentaries box' displays in
* Commentaries are also linked to a set of selections for the defined dimensions.
* Commentary box can also be displayed in a story and exported to PDF and PPT
* Any user can update (edit) or delete any commentary of any user.


## Installation of this extension

Download the ZIP file here https://github.com/mjromper/commentaries-qliksense/archive/master.zip

and add the extension via the Qlik Management Console (QMC).

DON'T FORGET TO INSTALL the server side needed for this extension (https://github.com/mjromper/commentaries-qliksense-server).