/*
* --------------------------------------------
* VUEX store.js
* --------------------------------------------
* Builds the data store from all of the modules fro the application
*/

/*
*   Adds the promise polyfill for IE 11
*/
require( "es6-promise" ).polyfill();

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

/*
*   Imports all of the modules used in the application  to build the data store
*/
import { application } from "../modules/application";

import { display } from "../modules/display";

import { filters } from "../modules/filters";

import { database } from "../modules/database";

import { collection } from "../modules/collection"

import { server } from "../modules/server";

import { users } from "../modules/users";

export default new Vuex.Store({
  modules: {
    application,
    display,
    filters,
    database,
    collection,
    server,
    users
  }
})
