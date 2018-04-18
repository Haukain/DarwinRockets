const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index:'./src/index.js',
    testDisplayer:'./src/testDisplayer.js',
    testDisplayerChart:'./src/testDisplayerChart.js',
    testPhysics:'./src/testPhysics.js',
    testWorker:'./src/testWorker.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [],
  mode: 'development'
};
module.exports.plugins=module.exports.plugins.concat(Object.keys(module.exports.entry).map(id=>{
  return new HtmlWebpackPlugin({
      template: "./src/template.html",
      chunks:[id],
      filename: id+".html"
    });
}));