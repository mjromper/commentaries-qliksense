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
        };

    var colorPropsHeader = {
            type: "items",
            label: "Main color",
            items: {
                apiUrl: {
                    type: "string",
                    ref: "props.color.hex",
                    label: "Color",
                    defaultValue: "#61a729"
                }
            }
        };

    var commentsBoxSection = {
            type: "items",
            component: "expandable-items",
            label: "Settings", items: {
                server: serverPropsHeader,
                sheet: sheetPropsHeader,
                color: colorPropsHeader
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
