<!--
  - NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
  - @version      Admin.vue 1001 15/9/21, 12:17 pm  Gilbert Rehling $
  - @package      NodeMongoAdmin\Spa
  - @subpackage   Admin.vue
  - @link         https://github.com/node-mongo/admin  Node MongoDB Admin
  - @copyright    Copyright (c) 2021. Gilbert Rehling of MMFAW. All rights reserved. (www.mfmaw.com)
  - @licence      NodeMongoAdmin is an Open Source Project released under the GNU GPLv3 license model.
  - @author       Gilbert Rehling:  gilbert@phpmongoadmin.com (www.gilbert-rehling.com)
  -  node-mongo-admin - License conditions:
  -  Contributions to our suggestion box are welcome: https://phpmongotools.com/suggestions
  -  This web application is available as Free Software and has no implied warranty or guarantee of usability.
  -  See licence.txt for the complete licensing outline.
  -  See https://www.gnu.org/licenses/license-list.html for information on GNU General Public License v3.0
  -  See COPYRIGHT.js for copyright notices and further details.
  --> -->

<style lang="scss">
    .main-content {
        height: 100vh;
        margin: 0;
        overflow: hidden;
        padding: 0;

        /*.header {
            font-weight: 800;
            font-size: 1.1rem;
        }*/

        nav {
            ul {
                li {
                    &:hover {
                        background-color: $lighterGrey;
                        color: $bodyFontColor;
                    }
                }
            }
        }

        table {
            td {
                input[type="submit"], input[type="button"] {
                    &:hover {
                        background-color: $lightGrey;
                        color: $bodyFontColor;
                    }
                }
            }
        }
    }
</style>

<template>
    <div id="main-page-content" class="off-canvas-content main-content" v-show="show">
        <dbs-view></dbs-view>
        <top-view></top-view>
        <panel-view></panel-view>
        <div style="clear: both;"></div>
    </div>
</template>

<script>
    /*
    *   Imports components
    */
    import DbsView from '../components/admin/dbs/DbsView';
    import TopView from '../components/admin/top/TopView';
    import PanelView from "../components/admin/PanelView";

    export default {
        /*
        *   Register the components to be used by the home page.
        */
        components: {
            DbsView,
            TopView,
            PanelView
        },

        data() {
            return {
                errorMessage: null,
                show: true
            }
        },

        /*
        *   This component triggers the Ads download from the API
        */
        mounted() {
          setTimeout(() => {
            this.$store.dispatch( 'loadDatabases' );
          }, 250)
        }
    }
</script>
