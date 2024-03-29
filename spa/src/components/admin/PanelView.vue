<!--
  - PhpMongoAdmin (www.phpmongoadmin.com) by Masterforms Mobile & Web (MFMAW)
  - @version      PanelView.vue 1001 6/8/20, 8:58 pm  Gilbert Rehling $
  - @package      PhpMongoAdmin\resources
  - @subpackage   PanelView.vue
  - @link         https://github.com/php-mongo/admin PHP MongoDB Admin
  - @copyright    Copyright (c) 2020. Gilbert Rehling of MMFAW. All rights reserved. (www.mfmaw.com)
  - @licence      PhpMongoAdmin is an Open Source Project released under the GNU GPLv3 license model.
  - @author       Gilbert Rehling:  gilbert@phpmongoadmin.com (www.gilbert-rehling.com)
  -  php-mongo-admin - License conditions:
  -  Contributions to our suggestion box are welcome: https://phpmongotools.com/suggestions
  -  This web application is available as Free Software and has no implied warranty or guarantee of usability.
  -  See licence.txt for the complete licensing outline.
  -  See https://www.gnu.org/licenses/license-list.html for information on GNU General Public License v3.0
  -  See COPYRIGHT.php for copyright notices and further details.
  -->

<style lang="scss">
    .pma-main-panel {
        height: 95vh;
        margin-left: 245px;
        overflow-x: auto;
        padding: 20px 0 20px 20px;
        width: calc(100vw - 262px);

        .pma-main-inner {
            margin: 0;
            width: calc(100vw - 262px);

            .doc-right-to-top {
                bottom: 5px;
                position: absolute;
                right: 10px;
            }
        }
    }

    /* Medium only - (min-width: 40em) and (max-width: 63.9375em) */
    @media (min-width: 768px) and (max-width: 992px) {
        .pma-main-panel {
            padding: 10px 0 10px 10px;
        }
    }
</style>
<template>
    <div ref="pmaMainPanel" class="pma-main-panel" @scroll.passive="handleScroll">
        <div ref="pmaInner" class="pma-main-inner">
            <servers-main></servers-main>
        </div>
    </div>
</template>

<script>
    /*
     *  Import the event bus
     */
    import { EventBus } from '../../event-bus';

    /*
     *   Import components for the Panel View
     */
    import ServersMain from "./servers/ServersMain";

    export default {
        /*
        *   Register the components to be used within the main panel views.
        */
        components: {

            ServersMain
        },

        /*
         *  Define the data used by the component.
         */
        data() {
            return {
                expanded: false,
                scrolled: false,
                collectionActive: false
            }
        },

        computed: {
            watchCollection() {
                return this.$store.getters.getActiveCollection
            }
        },

        /*
         *   Defined methods for the component
         */
        methods: {
            handleLeftNav() {
                this.expanded = !this.expanded;
                if (this.expanded === true) {
                    this.$jqf(this.$refs.pmaMainPanel).css('margin-left', '5px');
                    this.$jqf(this.$refs.pmaMainPanel).css('width', '99vw');
                    this.$jqf(this.$refs.pmaInner).css('width', '100vw')
                }
                if (this.expanded === false) {
                    this.$jqf(this.$refs.pmaMainPanel).css('margin-left', '245px');
                    this.$jqf(this.$refs.pmaMainPanel).css('width', 'calc(100vw - 262px)');
                    this.$jqf(this.$refs.pmaInner).css('width', 'calc(100vw - 262px)')
                }
            },

            /*
             *  We have scrolling on the main panel - we want to 'lock' the documents pagination bar
             */
            handleScroll(e) {
                let scrollPos = e.target.scrollTop;
                if (this.collectionActive === true) {
                    if (scrollPos >= 389 && this.scrolled === false) {
                        this.scrolled = true;
                        EventBus.$emit('lockCollectionPagination', true)
                    }
                    if (scrollPos <= 388 && this.scrolled === true) {
                        this.scrolled = false;
                        EventBus.$emit('lockCollectionPagination', false)
                    }
                }
            },

            /*
             *  We have a reference for the activeCollection status
             */
            setActiveCollection() {
                this.collectionActive = !this.collectionActive
            },

            /*
             *  Handle scrolling
             */
            scrollToTop() {
                let target = this.$refs.pmaMainPanel;
                let scrollPos = target.scrollTop;
                if (scrollPos > 1) {
                    target.scrollTo(0,0)
                }
            }
        },

        /*
         * get on ur bikes and ride !!
         */
        mounted() {
            EventBus.$on('collapse-left-nav', () => {
                this.handleLeftNav()
            });

            EventBus.$on('expand-left-nav', () => {
                this.handleLeftNav()
            });

            EventBus.$on('pma-main-panel-scroll', () => {
                this.scrollToTop()
            })
        },

        watch: {
            watchCollection() {
                this.setActiveCollection()
            }
        }
    }
</script>
