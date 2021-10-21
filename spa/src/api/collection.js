/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      collection.js 1001 15/9/21, 12:17 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Spa
 * @subpackage   collection.js
 * @link         https://github.com/node-mongo/admin  Node MongoDB Admin
 * @copyright    Copyright (c) 2021. Gilbert Rehling of MMFAW. All rights reserved. (www.mfmaw.com)
 * @licence      NodeMongoAdmin is an Open Source Project released under the GNU GPLv3 license model.
 * @author       Gilbert Rehling:  gilbert@phpmongoadmin.com (www.gilbert-rehling.com)
 *  node-mongo-admin - License conditions:
 *  Contributions to our suggestion box are welcome: https://phpmongotools.com/suggestions
 *  This web application is available as Free Software and has no implied warranty or guarantee of usability.
 *  See licence.txt for the complete licensing outline.
 *  See https://www.gnu.org/licenses/license-list.html for information on GNU General Public License v3.0
 *  See COPYRIGHT.js for copyright notices and further details.
 */

/*
*  Imports the PHP Mongo Admin URL from the config.
*/
import { MONGO_CONFIG } from "../config";
import {EventBus} from "../event-bus";

import Vue from 'vue';
const axios = Vue.prototype.$http;

export default {
    /*
    *   Get a single collection
    *   GET /api/vi/collection/{name}
    */
    getCollection: ( data ) => {
        return axios.get( MONGO_CONFIG.API_URL + '/collection/' + data.database + '/' + data.collection );
    },

    /*
    *   Create a new collection
    *   POST  /api/v1/collection/create
    */
    createCollection: ( data ) => {
        return axios.post( MONGO_CONFIG.API_URL + '/collection/create',
            {
                name: data.name,
                capped: data.capped,
                count: parseInt(data.count, 10),
                size: parseInt(data.size, 10),
                database: data.db,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   Delete one or more collection(s)
    *   POST  /api/v1/collection/delete
    */
    deleteCollection: ( data ) => {
        return axios.post( MONGO_CONFIG.API_URL + '/collection/delete',
            {
                database: data.database,
                collection: data.collection,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   Clear all documents from a collection
    *   POST  /api/v1/collection/clear
    */
    clearCollection: ( data ) => {
        return axios.post( MONGO_CONFIG.API_URL + '/collection/clear',
            {
                database: data.database,
                collection: data.collection,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   Export one or more collections (download version)
    *   POST  /api/v1/collection/export
    */
    exportCollectionDownload: ( data ) => {
        return axios({
            url: MONGO_CONFIG.API_URL + '/collection/export',
            method: 'POST',
            responseType: 'blob',
            data:
                {
                    database: data.database,
                    params: data.params,
                    _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
                }
        });
    },

    /*
    *   Export one or more collections (download version)
    *   POST  /api/v1/collection/exports
    */
    exportCollectionView: (data) => {
        return axios.post( MONGO_CONFIG.API_URL + '/collection/export',
            {
                database: data.database,
                params: data.params,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *  Import one or more collections (download version)
    *  POST  /api/v1/collection/import
    */
    importCollection: ( data ) => {
        let formData = new FormData;
        formData.append('database', data.database);
        formData.append('collection', data.collection);
        formData.append('file', data.params.file);
        formData.append('type', data.params.selected);
        formData.append('gzip', data.params.gzip);
        formData.append('useCurrentCollection', data.params.useCurrentCollection);
        formData.append('_token',  window.axios.defaults.headers.common['X-CSRF-TOKEN']);
        return axios.post(MONGO_CONFIG.API_URL + '/collection/import',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function( progressEvent ) {
                    let monitor = 0;
                    let uploadPercentage = parseInt( Math.round(( progressEvent.loaded / progressEvent.total ) * 100 ));
                    if (uploadPercentage !== monitor) {
                        EventBus.$emit("upload-progress", uploadPercentage);
                        monitor = uploadPercentage;
                    }

                }.bind(this)
            }
        );
    },

    /*
    *   Save one collection properties
    *   POST  /api/v1/collection/properties
    */
    saveProperties: (data) => {
        return axios.post( MONGO_CONFIG.API_URL + '/collection/properties',
            {
                database: data.database,
                collection: data.collection,
                params: data.params,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   Save one collection index
    *   POST  /api/v1/collection/index
    */
    saveIndex: (data) => {
        return axios.post( MONGO_CONFIG.API_URL + '/collection/index',
            {
                database: data.database,
                collection: data.collection,
                params: data.params,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   Rename one collection index
    *   POST  /api/v1/collection/rename
    */
    renameCollection: (data) => {
        return axios.post( MONGO_CONFIG.API_URL + '/collection/rename',
            {
                database: data.database,
                collection: data.collection,
                params: data.params,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   Duplicate one collection
    *   POST  /api/v1/collection/duplicate
    */
    duplicateCollection: (data) => {
        return axios.post( MONGO_CONFIG.API_URL + '/collection/duplicate',
            {
                database: data.database,
                collection: data.collection,
                params: data.params,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   Validation one collection
    *   POST  /api/v1/collection/validate
    */
    validateCollection: (data) => {
        return axios.get( MONGO_CONFIG.API_URL + '/collection/validate/' + data.database + '/' + data.collection);
    },

    /*
    *   Query a collection
    *   POST /api/v1/collection/query
    */
    queryCollection: ( data ) => {
        return axios.post( MONGO_CONFIG.API_URL + '/collection/query',
            {
                params: data.params,
                format: data.format,
                collection: data.collection,
                database: data.database,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   Fetch query logs for a database.collection
    *   GET  /api/v1/collection/query/logs/{database}/{collection}
    */
    getQueryLogs: ( data ) => {
        return axios.get( MONGO_CONFIG.API_URL + '/collection/query/logs/' + data.database + '/' + data.collection );
    },

    /*
    *   Fetch query explain for a database.collection.query
    *   GET  /api/v1/collection/query/explain
    */
    getQueryExplain: ( data ) => {
        return axios.post( MONGO_CONFIG.API_URL + '/collection/query/explain',
            {
                database: data.database,
                collection: data.collection,
                format: data.format,
                query: data.query,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   Create one document
    *   POST /api/v1/document/create
    */
    createDocument: ( data ) => {
        return axios.post( MONGO_CONFIG.API_URL + '/document/create',
            {
                document: data.document,
                format: data.format,
                collection: data.collection,
                database: data.database,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   Duplicate one document
    *   POST /api/v1/document/duplicate
    */
    duplicateDocument: ( data ) => {
        return axios.post( MONGO_CONFIG.API_URL + '/document/duplicate',
            {
                document: data.document,
                format: data.format,
                collection: data.collection,
                database: data.database,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   Update one document
    *   POST /api/v1/document/update
    */
    updateDocument: ( data ) => {
        return axios.put( MONGO_CONFIG.API_URL + '/document/update/' + data._id,
            {
                _id: data._id,
                index: parseInt(data.index, 10),
                document: data.document,
                field: data.field,
                value: data.value,
                type: data.type,
                collection: data.collection,
                database: data.database,
                _token: window.axios.defaults.headers.common['X-CSRF-TOKEN']
            });
    },

    /*
    *   Delete one document
    *   POST /api/v1/document/update
    */
    deleteDocument: ( data ) => {
        return axios.delete( MONGO_CONFIG.API_URL + '/document/' + data.db + '/' + data.collection + '/' + data._id );
    }
}
