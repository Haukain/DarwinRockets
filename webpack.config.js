const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    index:'./src/index.js',
    testDisplayer:'./src/testDisplayer.js',
    testDisplayerChart:'./src/testDisplayerChart.js',
    testPhysics:'./src/testPhysics.js',
    testWorker:'./src/testWorker.js',
    start:'./src/redirect.js',
    edit:'./src/redirect.js',
    gen:'./src/redirect.js',
    chart:'./src/redirect.js',
    rocket:'./src/redirect.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
	new CopyWebpackPlugin([
    { from: 'assets', to: 'assets' },
    { from: 'libs', to: 'libs' },
    { from: 'src/displayer/style.css', to: 'style.css' }
  ], {})
  ],
  mode: 'development'
};
module.exports.plugins=module.exports.plugins.concat(Object.keys(module.exports.entry).map(id=>{
  return new HtmlWebpackPlugin({
      template: "./src/template.html",
      chunks:[id],
      filename: id+".html"
    });
}));
