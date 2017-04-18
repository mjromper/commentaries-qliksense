define([], function() {
    "use strict";

    var serverPropsHeader = {
            type: "items",
            label: "Server",
            items: {
                apiUrl: {
                    type: "string",
                    ref: "props.server.apiUrl",
                    label: "API URL",
                    defaultValue: "http://localhost:8200/api"
                }
            }
        },
        commentsBoxSection = {
            type: "items",
            component: "expandable-items",
            label: "Settings", items: {  
                server: serverPropsHeader
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
