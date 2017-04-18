define(["qlik"], function( qlik ) {
    
    "use strict";

    var sheetPropsHeader = {
            type: "items",
            label: "Sheet",
            items: {
                apiUrl: {
                    type: "string",
                    ref: "props.sheet.id",
                    label: "Sheet Id",
                    defaultValue: function() {
                        return qlik.navigation.getCurrentSheetId().sheetId
                    }
                }
            }
        };
    var serverPropsHeader = {
            type: "items",
            label: "Server",
            items: {
                apiUrl: {
                    type: "string",
                    ref: "props.server.apiUrl",
                    label: "API URL",
                    defaultValue: "https://localhost:8200/api/comments"
                }
            }
        },
        commentsBoxSection = {
            type: "items",
            component: "expandable-items",
            label: "Settings", items: {  
                server: serverPropsHeader,
                sheet: sheetPropsHeader
            }
        };


    return {
        type: "items",
        component: "accordion",
        items: {        
            dimensions: {
                uses: "dimensions",
                min: 0,
                max: 5
            },
            commentsBoxSection: commentsBoxSection,
            appearance: {
                uses: "settings",
            }
        }
    };



});
