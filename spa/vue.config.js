/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      vue.config.js 1001 15/9/21, 12:16 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   vue.config.js
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

const path = require('path');

module.exports = {
    css: {
      loaderOptions: {
          sass: {
              prependData: `@import "./src/sass/abstracts/_variables.scss";`
          }
      }
    },
    chainWebpack: config => {
        const types = ['style-loader', 'css-loader', 'sass-loader'];
        types.forEach(
            type => addStyleResource(config.module.rule('sass').oneOf(type))
        )
    },
    runtimeCompiler: true,
};

function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resource-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/sass/*.scss')
            ],
        })
}