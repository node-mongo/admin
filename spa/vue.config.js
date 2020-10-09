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